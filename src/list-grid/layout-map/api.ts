import { BaseAction as HeaderBaseAction } from '../../header/action'
import { BaseHeader } from '../../header/type'
import type {
    CellAddress,
    CellRange,
    ColumnActionOption,
    ColumnIconOption,
    ColumnStyleOption,
    ColumnTypeOption,
    FieldDef,
    HeaderActionOption,
    HeaderStyleOption,
    HeaderTypeOption,
    LayoutObjectId,
    ListGridAPI,
    Message
} from '../../ts-types'
import type { BaseAction } from '../../columns/action'
import type { BaseColumn } from '../../columns/type/BaseColumn'
import type { BaseStyle as HeaderBaseStyle } from '../../header/style'

type TooltipOption<T> = string | ((rec: T) => string)
type HeaderTooltip<T> =
    | string
    | ((header: { cell: CellAddress; field: FieldDef<T> }) => string)
export type OldSortOption<T> = boolean | ((order: 'asc' | 'desc', col: number, grid: ListGridAPI<T>) => void);

export interface BaseHeaderDefine<T> {
    caption?: string | (() => string);
    headerField?: string;
    headerStyle?: HeaderStyleOption | HeaderBaseStyle | null;
    headerType?: HeaderTypeOption | BaseHeader<T> | null;
    headerAction?: HeaderActionOption | HeaderBaseAction<T> | null;

    headerIcon?: ColumnIconOption<T> | ColumnIconOption<T>[]
    headerTooltip?: HeaderTooltip<T>
    headerTooltipType?: HeaderTooltip<T>
    headerIconTooltip?: HeaderTooltip<T>

    sort?: OldSortOption<T>;

    // 头部单元格合并
    colSpan?: number;
    rowSpan?: number;
}

export interface HeaderDefine<T> extends BaseHeaderDefine<T> {
}

export interface ColumnDefine<T> extends BaseHeaderDefine<T> {
    field?: FieldDef<T>;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    icon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    message?: Message | ((record: T) => Message) | keyof T | (Message | ((record: T) => Message) | keyof T)[];
    columnType?: ColumnTypeOption | BaseColumn<T, any> | null;
    action?: ColumnActionOption | BaseAction<T> | null;
    style?: ColumnStyleOption | null;
    contentHidden?: boolean | ((record: T) => boolean);
    disableResize?: boolean;
    tooltip?: TooltipOption<T>;
    tooltipType?: TooltipOption<T>;
}

/**
 * 表格列配置约束
 */
export interface HeaderData<T> {
    id: LayoutObjectId;
    caption?: string | (() => string);
    field?: any;
    style?: HeaderStyleOption | HeaderBaseStyle | null;
    headerType: BaseHeader<T>;
    action?: HeaderBaseAction<T>;
    define: HeaderDefine<T>;
    icon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    tooltip?: HeaderTooltip<T>;
    tooltipType?: HeaderTooltip<T>;
    iconTooltip?: HeaderTooltip<T>
}

export interface WidthData {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    disableResize?: boolean
}

/**
 * 单元格数据展示约束
 */
export interface ColumnData<T> extends WidthData {
    id: LayoutObjectId;
    field?: FieldDef<T>;
    icon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    message?: Message | ((record: T) => Message) | keyof T | (Message | ((record: T) => Message) | keyof T)[];
    columnType: BaseColumn<T, any>;
    action?: BaseAction<T>;
    style: ColumnStyleOption | null | undefined;
    define: ColumnDefine<T>;
    contentHidden?: boolean | ((record: T) => boolean)
    tooltip?: TooltipOption<T>
    tooltipType?: TooltipOption<T>
}

// Simple header
export interface GroupHeaderDefine<T> extends HeaderDefine<T> {
    columns: HeadersDefine<T>;
}

export type HeadersDefine<T> = (GroupHeaderDefine<T> | ColumnDefine<T>)[];

// Advanced layout
export interface HeaderCellDefine<T> extends HeaderDefine<T> {
    colSpan?: number;
    rowSpan?: number;
}

export interface CellDefine<T> extends ColumnDefine<T> {
    colSpan?: number;
    rowSpan?: number;
}

export type HeaderBodyLayoutDefine<T> = {
    header: HeaderCellDefine<T>[][];
    body: CellDefine<T>[][];
};

export type ArrayLayoutDefine<T> = CellDefine<T>[][];
export type LayoutDefine<T> = HeaderBodyLayoutDefine<T> | ArrayLayoutDefine<T>;

interface LayoutMapAPI<T> {
    readonly headerRowCount: number;
    readonly bodyRowCount: number;
    readonly colCount: number;

    readonly columnWidths: WidthData[];
    readonly headerObjects: HeaderData<T>[];
    readonly columnObjects: ColumnData<T>[];

    getHeader(col: number, row: number): HeaderData<T>;

    getBody(col: number, row: number): ColumnData<T>;

    getCellId(col: number, row: number): LayoutObjectId;

    getCellRange(col: number, row: number): CellRange;

    getBodyLayoutRangeById(id: LayoutObjectId): CellRange;

    getRecordIndexByRow(row: number): number;

    getRecordStartRowByRecordIndex(index: number): number;
}

export type { LayoutMapAPI }
