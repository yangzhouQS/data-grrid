import { LayoutObjectId } from '../../ts-types'
import { LayoutMapAPI } from './api'

export class LayoutMap<T> implements LayoutMapAPI<T> {
  private _layoutMap: LayoutMapAPI<T>
  public hiddenHeader: boolean

  constructor(layoutMap: LayoutMapAPI<T>) {
    this._layoutMap = layoutMap
  }

  public get headerRowCount() {
    return this.hiddenHeader ? 0 : this._layoutMap.headerRowCount
  }

  public get bodyRowCount() {
    return this._layoutMap.bodyRowCount
  }

  public get colCount() {
    return this._layoutMap.colCount
  }

  public get columnWidths() {
    return this._layoutMap.columnWidths
  }

  public get headerObjects() {
    return this._layoutMap.headerObjects
  }

  public get columnObjects() {
    return this._layoutMap.columnObjects
  }

  public getHeader(col: number, row: number) {
    if (this.hiddenHeader) {
      row += this._layoutMap.headerRowCount
    }
    return this._layoutMap.getHeader(col, row)
  }

  public getBody(col: number, row: number) {
    if (this.hiddenHeader) {
      row += this._layoutMap.headerRowCount
    }
    return this._layoutMap.getBody(col, row)
  }

  public getCellId(col: number, row: number) {
    if (this.hiddenHeader) {
      row += this._layoutMap.headerRowCount
    }
    return this._layoutMap.getCellId(col, row)
  }

  public getCellRange(col: number, row: number) {
    if (this.hiddenHeader) {
      row += this._layoutMap.headerRowCount
    }
    const range = this._layoutMap.getCellRange(col, row)
    if (this.hiddenHeader) {
      range.start.row -= this._layoutMap.headerRowCount
      range.end.row -= this._layoutMap.headerRowCount
    }
    return range
  }

  public getBodyLayoutRangeById(id: LayoutObjectId) {
    const range = this._layoutMap.getBodyLayoutRangeById(id)
    return range
  }

  public getRecordIndexByRow(row: number) {
    if (this.hiddenHeader) {
      row += this._layoutMap.headerRowCount
    }
    return this._layoutMap.getRecordIndexByRow(row)
  }

  public getRecordStartRowByRecordIndex(index: number) {
    let row = this._layoutMap.getRecordStartRowByRecordIndex(index)
    if (this.hiddenHeader) {
      row -= this._layoutMap.headerRowCount
    }
    return row
  }
}
