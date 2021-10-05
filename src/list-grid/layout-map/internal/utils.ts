import { columns } from '../../../columns'
import { headers } from '../../../headers'
import type { ColumnData, HeaderData } from '../api'

let seqId = -1

export function newEmptyHeaderData(): HeaderData<any> {
    return {
        id: seqId--,
        define: {},
        headerType: headers.type.of(null) // default
    }
}

export function newEmptyColumnData(): ColumnData<any> {
    return {
        id: seqId--,
        define: {},
        columnType: columns.type.of(null), // default
        style: null
    }
}

export class EmptyDataCache<T> {
    private headers: HeaderData<T>[][] = []

    private columns: ColumnData<T>[][] = []

    getHeader(col: number, row: number): HeaderData<T> {
        const rows = this.headers[row] || (this.headers[row] = [])
        return rows[col] || (rows[col] = newEmptyHeaderData())
    }

    getBody(col: number, row: number): ColumnData<T> {
        const rows = this.columns[row] || (this.columns[row] = [])
        return rows[col] || (rows[col] = newEmptyColumnData())
    }
}
