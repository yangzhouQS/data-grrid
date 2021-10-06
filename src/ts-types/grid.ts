import { MaybePromiseOrUndef } from './base'

export interface CellAddress {
    col: number;
    row: number;
}

export interface CellRange {
    start: CellAddress;
    end: CellAddress;
}

export type FieldGetter<T> = (record: T) => any;
export type FieldSetter<T> = (record: T, value: any) => void;

export interface FieldAssessor<T> {
    get: FieldGetter<T>;
    set: FieldSetter<T>;
}

export type FieldDef<T> = keyof T | FieldGetter<T> | FieldAssessor<T>;
export type FieldData = MaybePromiseOrUndef<any>;
export type BorderMode = 'none' | 'content-border' | 'grid-border'
