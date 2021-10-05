import type {
	BaseColumnOption,
	BranchGraphColumnOption,
	ButtonColumnOption,
	ColumnTypeOption,
	IconColumnOption,
	MenuColumnOption,
	NumberColumnOption,
	PercentCompleteBarColumnOption
} from '../ts-types'
import type { BaseColumn } from './type/BaseColumn'
import { BranchGraphColumn } from './type/BranchGraphColumn'
import { ButtonColumn } from './type/ButtonColumn'
import { CheckColumn } from './type/CheckColumn'
import { Column } from './type/Column'
import { IconColumn } from './type/IconColumn'
import { ImageColumn } from './type/ImageColumn'
import { MenuColumn } from './type/MenuColumn'
import { MultilineTextColumn } from './type/MultilineTextColumn'
import { NumberColumn } from './type/NumberColumn'
import { PercentCompleteBarColumn } from './type/PercentCompleteBarColumn'
import { RadioColumn } from './type/RadioColumn'
import {TreeColumn } from './type/TreeColumn'

export const TYPES = {
	DEFAULT: new Column<any>(),
	NUMBER: new NumberColumn<any>(),
	CHECK: new CheckColumn<any>(),
	RADIO: new RadioColumn<any>(),
	BUTTON: new ButtonColumn<any>(),
	IMAGE: new ImageColumn<any>(),
	MULTILINETEXT: new MultilineTextColumn<any>(),
	TREE: new TreeColumn<any>()
}

/**
 * column types
 */
export {
	Column,
	NumberColumn,
	CheckColumn,
	RadioColumn,
	ButtonColumn,
	ImageColumn,
	PercentCompleteBarColumn,
	IconColumn,
	BranchGraphColumn,
	MenuColumn,
	MultilineTextColumn,
	TreeColumn,
	// types
	BaseColumnOption,
	BranchGraphColumnOption,
	ButtonColumnOption,
	IconColumnOption,
	MenuColumnOption,
	NumberColumnOption,
	PercentCompleteBarColumnOption
}

export function of<T>(
		columnType: ColumnTypeOption | BaseColumn<T, any> | null | undefined
): BaseColumn<T, any> {
	if (!columnType) {
		return TYPES.DEFAULT
	} else if (typeof columnType === 'string') {
		const key = columnType.toUpperCase() as keyof typeof TYPES
		return TYPES[key] || of(null)
	} else {
		return columnType
	}
}
