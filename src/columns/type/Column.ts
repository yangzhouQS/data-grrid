import * as utils from './columnUtils'
import type { BaseColumnOption, CellContext, GridCanvasHelperAPI, ListGridAPI } from '../../ts-types'
import { BaseColumn } from './BaseColumn'
import type { DrawCellInfo } from '../../ts-types-internal'
import { Style } from '../style/Style'

export class Column<T> extends BaseColumn<T, string> {

	constructor(options: BaseColumnOption = {}) {
		super(options)
	}

	get StyleClass(): typeof Style {
		return Style
	}

	public clone(): Column<T> {
		return new Column(this as BaseColumnOption)
	}

	drawInternal(
			value: string,
			context: CellContext,
			style: Style,
			helper: GridCanvasHelperAPI,
			_grid: ListGridAPI<T>,
			{ drawCellBase, getIcon }: DrawCellInfo<T>
	): void {
		const { textAlign, textBaseline, color, font, bgColor, padding, textOverflow } = style
		if (bgColor) {
			drawCellBase({
				bgColor
			})
		}
		helper.testFontLoad(font, value, context)
		utils.loadIcons(getIcon(), context, helper, (icons, context) => {
			helper.text(value, context, {
				textAlign,
				textBaseline,
				color,
				font,
				padding,
				textOverflow,
				icons
			})
		})
	}
}
