import * as styleContents from '../style'
import type {
  BaseColumnOption,
  CellAddress,
  CellContext,
  ColumnTypeAPI,
  EventListenerId,
  GridCanvasHelperAPI,
  LayoutObjectId,
  ListGridAPI,
  MaybePromise,
  Message,
  TransformRecord
} from '../../ts-types'
import type { ColumnFadeinState, DrawCellInfo, GridInternal } from '../../ts-types-internal'
import { getOrApply, isDef, isPromise, obj } from '../../internal/utils'
import { BaseStyle } from '../style/BaseStyle'
import { animate } from '../../internal/animate'
import { getColumnFadeinStateId } from '../../internal/symbolManager'
import { Rect } from '../../internal/Rect'
import { getInlineEditingState } from '../utils'

const { setReadonly } = obj
const COLUMN_FADEIN_STATE_ID = getColumnFadeinStateId()

function isFadeinWhenCallbackInPromise<T>(column: BaseColumn<T, unknown>, grid: ListGridAPI<T>): boolean {
  if (column.fadeinWhenCallbackInPromise != null) {
    return column.fadeinWhenCallbackInPromise
  }
  return !!grid.configure('fadeinWhenCallbackInPromise')
}

function getFadeinState<T>(grid: GridInternal<T>): ColumnFadeinState {
  let state = grid[COLUMN_FADEIN_STATE_ID]
  if (!state) {
    state = { cells: {} }
    setReadonly(grid, COLUMN_FADEIN_STATE_ID, state)
  }
  return state
}

function _generateFadeinPointAction<T>(
  grid: ListGridAPI<T>,
  col: number,
  row: number,
  context: CellContext,
  drawInternal: () => void,
  drawCellBase: () => void
): (point: number) => void {
  return (point: number): void => {
    const state = getFadeinState(grid)
    const stateKey = `${ row }:${ col }`
    if (point === 1) {
      delete state.cells[stateKey]
    } else {
      state.cells[stateKey] = {
        opacity: point
      }
    }
    drawCellBase()

    drawInternal()

    const cellState = state.cells[stateKey]
    if (cellState) {
      //透過するため背景を透過で上書き
      const ctx = context.getContext()
      ctx.globalAlpha = 1 - cellState.opacity
      try {
        drawCellBase()
      } finally {
        ctx.globalAlpha = 1
      }
    }
  }
}

const fadeinMgr = {
  animate<T>(grid: ListGridAPI<T>, col: number, row: number, context: CellContext, drawInternal: () => void, drawCellBase: () => void): void {
    // fadein animation
    const state = getFadeinState(grid)

    const activeFadeins = [ _generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase) ]
    state.activeFadeins = activeFadeins

    animate(500, (point: number) => {
      activeFadeins.forEach((f) => f(point))
      if (point === 1) {
        delete state.activeFadeins
      }
    })
  },
  margeAnimate<T>(grid: ListGridAPI<T>, col: number, row: number, context: CellContext, drawInternal: () => void, drawCellBase: () => void): void {
    const state = getFadeinState(grid)
    if (state.activeFadeins) {
      state.activeFadeins.push(_generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase))
    } else {
      drawInternal()
    }
  }
}

/**
 * 所有columnType基类
 */
export abstract class BaseColumn<T, V> implements ColumnTypeAPI {
  private _fadeinWhenCallbackInPromise: boolean | null

  private _transformRecord?: TransformRecord
  private _transformCopy?: TransformRecord

  private _hidden?: boolean | ((record: T) => boolean)

  constructor(option: BaseColumnOption = {}) {
    this.onDrawCell = this.onDrawCell.bind(this) //スコープを固定させる
    /**
     * 单元格数据转换
     */
    this._transformRecord = option.transformRecord
    /**
     * 复制数据转换
     */
    this._transformCopy = option.transformCopy || option.transformRecord

    this._hidden = option.hidden

    //Promiseのcallbackでフェードイン表示する
    this._fadeinWhenCallbackInPromise = option.fadeinWhenCallbackInPromise || false
  }

  get transformCopy(): TransformRecord {
    return this._transformCopy
  }

  public get transformRecord(): TransformRecord {
    return this._transformRecord
  }

  get fadeinWhenCallbackInPromise(): boolean | undefined | null {
    return this._fadeinWhenCallbackInPromise
  }

  get StyleClass(): typeof BaseStyle {
    return BaseStyle
  }

  get hidden(): boolean | ((record: T) => boolean) {
    return this._hidden
  }

  set hidden(value: boolean | ((record: T) => boolean)) {
    this._hidden = value
  }

  public reviseAttachCellsArea(
    _rect: Rect,
    _row: number,
    _grid: ListGridAPI<T>
  ) {
    // nothing
  }

  public reviseAttachCellsPadding(
    padding: [ number, number, number, number ],
    row: number,
    grid: ListGridAPI<T>
  ) {
    const state = getInlineEditingState(grid)
    if (state.inputPadding) {
      padding[0] += state.inputPadding[0]
      padding[1] += state.inputPadding[1]
      padding[2] += state.inputPadding[2]
      padding[3] += state.inputPadding[3]
    }
  }

  public reviseFocusRect(_rect: Rect, _row: number, _grid: ListGridAPI<T>) {
    // nothing
  }

  /**
   * 数据格式转换
   * @param value
   * @param cell
   * @param grid
   * @protected
   */
  protected transformRecordBefore(value: unknown, cell: CellAddress, grid: ListGridAPI<T>): any {
    let displayValue = this.convertInternal(value)
    if (this.transformCopy) {
      const transformCopy = this.transformCopy as TransformRecord
      displayValue = transformCopy({ value, displayValue, cell, grid }) as any
    }
    return displayValue
  }

  /**
   * 单元格绘制内容
   * @param cellValue
   * @param info
   * @param context
   * @param grid
   */
  onDrawCell(cellValue: MaybePromise<unknown>, info: DrawCellInfo<T>, context: CellContext, grid: ListGridAPI<T>): void | Promise<void> {
    // 单元格绘制相关信息
    const { style, getRecord, drawCellBase, getCell, getContentHidden } = info
    const helper = grid.getGridCanvasHelper()
    drawCellBase()
    // clearCellBase()
    const record = getRecord()
    let promise
    if (isPromise(record)) {
      promise = record
    } else if (isPromise(cellValue)) {
      promise = cellValue
    } else {
      const msg = info.getMessage()
      if (isPromise(msg)) {
        promise = msg
      }
    }
    //文字描画
    if (promise) {
      const start = Date.now()
      return Promise.all(
        [ record, cellValue, promise.then(() => cellValue).then(() => info.getMessage()) ]
      ).then(({ 0: record, 1: val, 2: message }) => {
        const currentContext = context.toCurrentContext()
        const drawRect = currentContext.getDrawRect()
        if (!drawRect) {
          return
        }
        const time = Date.now() - start

        const drawInternal = (): void => {
          const currentContext = context.toCurrentContext()
          const drawRect = currentContext.getDrawRect()
          if (!drawRect) {
            return
          }
          const _record = getRecord() as T
          if (isPromise(_record)) {
            return
          }
          const actStyle = styleContents.of(style, record, this.StyleClass)

          if (this.isContentHidden(_record, getContentHidden)) {
            return
          }

          // 绘制内容
          // this.drawInternal(this.convertInternal(val), currentContext, actStyle, helper, grid, info)
          this.drawInternal(
            this.transformRecordBefore(cellValue, getCell(), grid),
            currentContext,
            actStyle,
            helper,
            grid,
            info
          )
          this.drawMessageInternal(message, currentContext, actStyle, helper, grid, info)
        }

        if (!isFadeinWhenCallbackInPromise(this, grid)) {
          drawInternal() //単純な描画
        } else {
          const { col, row } = context
          if (time < 80) {
            //80ms以内のPromiseCallbackは前アニメーションに統合
            fadeinMgr.margeAnimate(grid, col, row, context, drawInternal, drawCellBase)
          } else {
            //アニメーション
            fadeinMgr.animate(grid, col, row, context, drawInternal, drawCellBase)
          }
        }
      })
    } else {
      const actStyle = styleContents.of(style, record, this.StyleClass)
      // this.drawInternal(this.convertInternal(cellValue), context, actStyle, helper, grid, info)
      this.drawInternal(
        this.transformRecordBefore(cellValue, getCell(), grid),
        context,
        actStyle,
        helper,
        grid,
        info
      )
      this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info)
      //フェードインの場合透過するため背景を透過で上書き
      const { col, row } = context
      const stateKey = `${ col }:${ row }`
      const cellState = (grid as GridInternal<T>)[COLUMN_FADEIN_STATE_ID]?.cells[stateKey]
      if (cellState) {
        const ctx = context.getContext()
        ctx.globalAlpha = 1 - cellState.opacity
        try {
          drawCellBase()
        } finally {
          ctx.globalAlpha = 1
        }
      }
      return undefined
    }
  }

  abstract clone(): BaseColumn<T, V>;

  convertInternal(value: unknown): V {
    return (value != null ? value : '') as V
  }

  abstract drawInternal(value: V, context: CellContext, style: BaseStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;

  drawMessageInternal(message: Message, context: CellContext, style: BaseStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void {
    info.messageHandler.drawCellMessage(message, context, style, helper, grid, info)
  }

  bindGridEvent(_grid: ListGridAPI<T>, _cellId: LayoutObjectId): EventListenerId[] {
    return []
  }

  getCopyCellValue(value: V, _grid: ListGridAPI<T>, _cell: CellAddress): string {
    return value as any
  }

  /**
   * 粘贴单元格默认值,使用transformCopy转换,或者transformRecord转换
   * @param value
   * @param cell
   * @param grid
   */
  getTransCopyValue(value: unknown, cell: CellAddress, grid: ListGridAPI<T>): unknown {
    // 单元格真实值
    let displayValue = this.convertInternal(value)
    if (this.transformRecord) {
      const transformCopy = this.transformCopy as TransformRecord
      displayValue = transformCopy({ value, displayValue, cell, grid }) as any
    } else if (this.transformRecord) {
      const transformRecord = this.transformRecord as TransformRecord
      displayValue = transformRecord({ value, displayValue, cell, grid }) as any
    }
    return displayValue
  }

  protected drawEditingInternal(
    _context: CellContext,
    _style: BaseStyle,
    _helper: GridCanvasHelperAPI,
    _grid: ListGridAPI<T>,
    _info: DrawCellInfo<T>
  ): void {
    // nothing
  }

  private isContentHidden(record: T, getContentHidden: () => boolean) {
    let contentHidden = getOrApply(this.hidden, record)
    if (!isDef(contentHidden)) {
      contentHidden = getContentHidden()
    }
    return contentHidden
  }
}
