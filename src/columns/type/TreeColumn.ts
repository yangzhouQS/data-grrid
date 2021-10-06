import { BaseColumn } from './BaseColumn'
import { CanToggle, CellAddress, CellContext, CellStyle, DrawColumnCallback, GridCanvasHelperAPI, LayoutObjectId, ListGridAPI, MultilineText, Toggled, ToggledType, TreeColumnOption, TreeInfo } from '../../ts-types'
import { DrawCellInfo } from '../../ts-types-internal'
import { getButtonColumnStateId, getColumnActionStateId, getInlineInputEditorStateId } from '../../internal/symbolManager'
import { TreeDataSource } from '../../data/TreeDataSource'
import { Rect } from '../../internal/Rect'
import * as columnUtils from './columnUtils'
import { TreeStyle } from '../style/TreeStyle'
import { cellInRange, getOrApply, isPromise, event } from '../../internal/utils'
import { DG_EVENT_TYPE } from '../../core/DG_EVENT_TYPE'
import { KEY_DOWN, KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP } from '../../core/internal/KEY_CODE'

const INLINE_INPUT_EDITOR_STATE_ID = getInlineInputEditorStateId()
const BUTTON_COLUMN_STATE_ID = getButtonColumnStateId()
const COLUMN_ACTION_STATE_ID = getColumnActionStateId()
const TREE_NODE_SPACE = 16

function _getTreeInfo<T>(
    grid: ListGridAPI<T>,
    row: number
): TreeInfo | undefined {
    let treeInfo: TreeInfo | undefined = undefined
    if (grid.dataSource instanceof TreeDataSource) {
        const recordIndex = grid.getRecordIndexByRow(row)
        if (recordIndex >= 0) {
            treeInfo = grid.dataSource.getTreeInfo(recordIndex)
        }
    }
    return treeInfo
}

function _getTreeNodeSpaceWidth(treeInfo?: TreeInfo) {
    let width = 0
    if (treeInfo) {
        width += treeInfo.level * TREE_NODE_SPACE + TREE_NODE_SPACE * 2
    }
    return width
}

function _isTreeNodeSpace<T>(
    grid: ListGridAPI<T>,
    col: number,
    row: number,
    event: MouseEvent
) {
    let bool = false
    if (!event){
        return false
    }
    const relativePos = grid._getMouseRelativePoint(event)
    if (relativePos) {
        const rect = grid.getCellRelativeRect(col, row)
        const treeInfo = _getTreeInfo(grid, row)
        if (treeInfo && !treeInfo.isLeaf) {
            const treeNodeSpaceWidth = _getTreeNodeSpaceWidth(treeInfo)
            if (
                treeNodeSpaceWidth &&
                relativePos.x - rect.left < treeNodeSpaceWidth
            ) {
                bool = true
            }
        }
    }
    return bool
}

export class TreeColumn<T> extends BaseColumn<T, string> {
    private _canToggle?: CanToggle

    private _toggled?: Toggled

    private _draw?: DrawColumnCallback

    private _cellStyle?: CellStyle

    private _multilineText?: MultilineText

    constructor(options: TreeColumnOption<T> = {}) {
        super(options)
        this._canToggle = options.canToggle
        this._toggled = options.toggled
        this._draw = options.draw
        this._cellStyle = options.cellStyle
        this._multilineText = options.multilineText
    }

    public reviseAttachCellsArea(rect: Rect, row: number, grid: ListGridAPI<T>) {
        columnUtils.reviseAttachCellsArea(rect, row, grid, this._cellStyle)
    }

    public reviseAttachCellsPadding(
        padding: [ number, number, number, number ],
        row: number,
        grid: ListGridAPI<T>
    ) {
        super.reviseAttachCellsPadding(padding, row, grid)
        const treeInfo = _getTreeInfo(grid, row)
        padding[3] += _getTreeNodeSpaceWidth(treeInfo)
        columnUtils.reviseAttachCellsPadding(padding, row, grid, this._cellStyle)
    }

    public reviseFocusRect(rect: Rect, row: number, grid: ListGridAPI<T>) {
        const treeInfo = _getTreeInfo(grid, row)
        rect.left += _getTreeNodeSpaceWidth(treeInfo)
    }

    public drawInternal<T>(
        value: any,
        context: CellContext,
        style: TreeStyle,
        helper: GridCanvasHelperAPI,
        grid: ListGridAPI<T>,
        info: DrawCellInfo<T>
    ): void {
        const { getIcon } = info
        const { getRecord } = info

        const {
            textAlign,
            textBaseline,
            color,
            font,
            textOverflow,
            lineColor,
            buttonColor,
            buttonBgColor,
            buttonBorderColor,
            linkColor,
            autoWrapText,
            lineHeight,
            lineClamp
        } = style

        helper.testFontLoad(font, value, context)

        const treeInfo = _getTreeInfo(grid, context.row)

        let active = false
        const state = (grid as any)[BUTTON_COLUMN_STATE_ID]
        if (state) {
            const range = grid.getCellRange(context.col, context.row)
            if (
                state.mouseActiveCell &&
                cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)
            ) {
                active = true
            }
        }

        columnUtils.loadIcons(
            getIcon(),
            context,
            helper,
            (icons: any, ctx: CellContext) => {
                const isCustomDraw = columnUtils.customDraw(
                    helper,
                    this.draw,
                    value,
                    context,
                    grid,
                    getRecord()
                )
                if (!isCustomDraw) {
                    const padding = columnUtils.getActionTextPadding(
                        context,
                        helper,
                        style
                    )
                    if (active && state && state.mouseRelativePos) {
                        const rect = helper.getTextRect(value, ctx, {
                            font,
                            icons,
                            padding,
                            textAlign,
                            textBaseline,
                            textOverflow
                        })
                        const offset = _getTreeNodeSpaceWidth(treeInfo)
                        rect.left = Math.max(
                            context.getRect().left + offset,
                            rect.left + offset
                        )
                        rect.right += offset
                        active =
                            rect.left <= state.mouseRelativePos.x &&
                            rect.right >= state.mouseRelativePos.x &&
                            rect.top <= state.mouseRelativePos.y &&
                            rect.bottom >= state.mouseRelativePos.y
                        state.mouseActive = active
                    }
                    const record = info.getRecord()
                    const isMultilineText = getOrApply(this.multilineText, record)
                    helper.tree(value, ctx, {
                        color: active ? linkColor || helper.theme.tree.linkColor : color,
                        lineColor,
                        buttonColor,
                        buttonBgColor,
                        buttonBorderColor,
                        icons,
                        padding,
                        textAlign,
                        textBaseline,
                        textOverflow,
                        treeInfo,
                        treeNodeSpace: TREE_NODE_SPACE,
                        isMultilineText,
                        autoWrapText,
                        lineHeight,
                        lineClamp
                    })
                }
                columnUtils.drawActionButton(
                    grid,
                    context,
                    INLINE_INPUT_EDITOR_STATE_ID,
                    helper,
                    style
                )
                columnUtils.drawAttachArea(
                    grid,
                    getRecord(),
                    context,
                    helper,
                    this._cellStyle
                )
            }
        )
    }

    public bindGridEvent<T>(grid: ListGridAPI<T>, cellId: LayoutObjectId): any[] {
        const expand = (cell: CellAddress, all: boolean) => {
            if (grid.dataSource instanceof TreeDataSource) {
                const recordIndex = grid.getRecordIndexByRow(cell.row)
                grid.dataSource.expand(recordIndex, all)
            }
        }

        const collapse = (cell: CellAddress, all: boolean) => {
            if (grid.dataSource instanceof TreeDataSource) {
                const recordIndex = grid.getRecordIndexByRow(cell.row)
                grid.dataSource.collapse(recordIndex, all)
            }
        }

        const toggle = (cell: CellAddress, all: boolean) => {
            if (grid.dataSource instanceof TreeDataSource) {
                const recordIndex = grid.getRecordIndexByRow(cell.row)
                grid.dataSource.toggle(recordIndex, all)
            }
        }

        function isTarget(col: number, row: number): boolean {
            return grid.getLayoutCellId(col, row) === cellId
        }

        const doMouseMove = (e: any) => {
            if (!isTarget(e.col, e.row)) {
                return
            }
            if (isPromise(grid.getRowRecord(e.row))) {
                return
            }
            if (this._canToggle) {
                const treeInfo = _getTreeInfo(grid, e.row)
                if (
                    treeInfo &&
                    this._canToggle({
                        col: e.col,
                        event: e.event,
                        row: e.row,
                        treeInfo,
                        type: 'over'
                    }) === false
                ) {
                    return
                }
            }
            const state = (grid as any)[BUTTON_COLUMN_STATE_ID]
            const actionState = (grid as any)[COLUMN_ACTION_STATE_ID]

            grid.getElement().style.cursor =
                _isTreeNodeSpace(grid, e.col, e.row, e.event) ||
                (state && state.mouseActive) ||
                (actionState && actionState.mouseActive)
                    ? 'pointer'
                    : ''
        }

        const doMouseLeave = (e: any) => {
            if (!isTarget(e.col, e.row)) {
                return
            }
            grid.getElement().style.cursor = ''
        }

        return [
            // click
            grid.listen(DG_EVENT_TYPE.CLICK_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return
                }
                if (isPromise(grid.getRowRecord(e.row))) {
                    return
                }
                if (!_isTreeNodeSpace(grid, e.col, e.row, e.event)) {
                    return
                }
                const treeInfo = _getTreeInfo(grid, e.row)
                if (!treeInfo) {
                    return
                }
                const isAll = e.event.shiftKey
                const type: ToggledType = treeInfo.expanded
                    ? isAll
                        ? 'collapseAll'
                        : 'collapse'
                    : isAll
                        ? 'expandAll'
                        : 'expand'
                const params = {
                    col: e.col,
                    event: e.event,
                    row: e.row,
                    treeInfo,
                    type
                }

                if (this._canToggle && this._canToggle(params) === false) {
                    return
                }
                grid.selectCellRange(e.col, e.row, e.col, e.row)
                toggle(
                    {
                        col: e.col,
                        row: e.row
                    },
                    isAll
                )
                if (this._toggled) {
                    this._toggled(params)
                }
                event.cancel(e.event)
                return false
            }),
            // mouse move
            grid.listen(DG_EVENT_TYPE.MOUSEENTER_CELL, doMouseMove),
            grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, doMouseMove),
            grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, doMouseMove),
            grid.listen(DG_EVENT_TYPE.MOUSELEAVE_CELL, doMouseLeave),
            grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, doMouseLeave),
            // key down
            grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
                const keys = [ KEY_DOWN, KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP ]
                if (
                    keys.indexOf(e.keyCode) === -1 ||
                    (!e.event.ctrlKey && !e.event.metaKey)
                ) {
                    return
                }
                const sel = grid.selection.select
                const cell = {
                    col: sel.col,
                    row: sel.row
                }
                if (!isTarget(cell.col, cell.row)) {
                    return
                }
                if (isPromise(grid.getRowRecord(cell.row))) {
                    return
                }
                const treeInfo = _getTreeInfo(grid, cell.row)
                if (!treeInfo) {
                    return
                }
                let type: ToggledType
                if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
                    type = e.keyCode === KEY_DOWN ? 'expandAll' : 'expand'
                } else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
                    type = e.keyCode === KEY_UP ? 'collapseAll' : 'collapse'
                } else {
                    type = treeInfo.expanded
                        ? e.event.shiftKey
                            ? 'collapseAll'
                            : 'collapse'
                        : e.event.shiftKey
                            ? 'expandAll'
                            : 'expand'
                }
                const params = {
                    col: cell.col,
                    event: e.event,
                    row: cell.row,
                    treeInfo,
                    type
                }

                if (this._canToggle && this._canToggle(params) === false) {
                    return
                }
                if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
                    expand(cell, e.keyCode === KEY_DOWN)
                } else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
                    collapse(cell, e.keyCode === KEY_UP)
                } else {
                    toggle(cell, e.event.shiftKey)
                }
                if (this._toggled) {
                    this._toggled(params)
                }
                event.cancel(e.event)
                return treeInfo.isLeaf // 只有叶子节点允许不阻止后续事件执行
            })
        ]
    }

    protected drawEditingInternal(
        context: CellContext,
        style: TreeStyle,
        helper: GridCanvasHelperAPI,
        grid: ListGridAPI<T>,
        info: DrawCellInfo<T>
    ): void {
        super.drawEditingInternal(context, style, helper, grid, info)
        const { textAlign } = style
        const { textBaseline } = style
        const { color } = style
        const treeInfo = _getTreeInfo(grid, context.row)
        const { textOverflow } = style
        const { autoWrapText } = style
        const { lineHeight } = style
        const { lineClamp } = style
        const record = info.getRecord()
        const isMultilineText = getOrApply(this.multilineText, record)
        helper.tree('', context, {
            color,
            padding: columnUtils.getActionTextPadding(context, helper, style),
            textAlign,
            textBaseline,
            textOverflow,
            treeInfo,
            treeNodeSpace: TREE_NODE_SPACE,
            isMultilineText,
            autoWrapText,
            lineHeight,
            lineClamp
        })
    }

    clone(): BaseColumn<T, string> {
        return undefined
    }

    get canToggle(): CanToggle | undefined {
        return this._canToggle
    }

    get toggled(): Toggled | undefined {
        return this._toggled
    }

    get draw(): DrawColumnCallback | undefined {
        return this._draw
    }

    get cellStyle(): CellStyle | undefined {
        return this._cellStyle
    }

    get multilineText(): MultilineText | undefined {
        return this._multilineText
    }
}
