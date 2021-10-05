import * as icons from '../../internal/icons'
import type { AttachCellStyle, CellContext, CellStyle, ColumnIconOption, DrawColumnCallback, GridCanvasHelperAPI, ListGridAPI, MaybePromise } from '../../ts-types'
import type { SimpleColumnIconOption } from '../../ts-types-internal'
import { cellInRange, isDefString, isPromise, obj } from '../../internal/utils'
import { Rect } from '../../internal/Rect'
import { Styles } from '../style/Styles'

export function loadIcons(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon: MaybePromise<ColumnIconOption<any> | ColumnIconOption<any>[]> | null,
		context: CellContext,
		helper: GridCanvasHelperAPI,
		callback: (icons: SimpleColumnIconOption[] | undefined, context: CellContext) => void
): void {
	let argIcon = undefined
	if (icon) {
		if (isPromise(icon)) {
			icon.then((i) => {
				loadIcons(i, context.toCurrentContext(), helper, callback)
			})
		} else {
			const iconList = icons.toNormarizeArray(icon)
			iconList.forEach((i) => {
				if (i.font && i.content) {
					helper.testFontLoad(i.font, i.content, context)
				}
			})
			argIcon = iconList
		}
	}
	callback(argIcon, context)
}


export function getActionTextPadding(
		context: CellContext,
		helper: GridCanvasHelperAPI,
		style: Styles
) {
	const {font} = style
	const {padding} = style
	const {appearance} = style

	const basePadding = helper.toBoxPixelArray(padding || 0, context, font)
	const textPadding = basePadding.slice(0)
	if (appearance !== 'none' && isDefString(appearance)) {
		textPadding[1] += 26 // 文字距离有边框位置，右侧图标
	}
	return textPadding
}
export function drawActionButton<T>(
		grid: ListGridAPI<T>,
		context: CellContext,
		stateId: any,
		helper: GridCanvasHelperAPI,
		style: Styles
) {
	const {textBaseline} = style
	const {font} = style
	const {padding} = style
	const {appearance} = style
	const {color} = style

	let active = false
	const state = (grid as any)[stateId]
	if (state) {
		if (
			state.mouseActiveCell &&
			cellInRange(context.range, state.mouseActiveCell.col, state.mouseActiveCell.row)
		) {
			if (state.mouseRelativePos) {
				let rect = context.getRect()
				const btnWidth = 32
				rect = new Rect(
						rect.left + rect.width - btnWidth,
						rect.top,
						btnWidth,
						rect.height
				)
				active =
					rect.left <= state.mouseRelativePos.x &&
					rect.right >= state.mouseRelativePos.x &&
					rect.top <= state.mouseRelativePos.y &&
					rect.bottom >= state.mouseRelativePos.y
				state.mouseActive = active
			}
		}
	}
	if (appearance !== 'none' && isDefString(appearance)) {
		const basePadding = helper.toBoxPixelArray(padding || 0, context, font)
		const iconPadding = basePadding.slice(0)
		iconPadding[1] += 8 // 图标距离右边框位置
		let icon
		if (appearance === 'menulist-button') {
			// draw dropdown arrow icon
			icon = {
				color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
				path: 'M0 2 5 7 10 2z',
				width: 10,
			}
		} else if (appearance === 'lookup-button') {
			// draw lookup icon
			icon = {
				color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
				// tslint:disable-next-line:max-line-length
				path:
					'M4.7997924,9.6 C2.15326327,9.6 0,7.44655046 0,4.79937714 C0,2.15261906 2.15326327,0 4.7997924,0 C7.44673673,0 9.6,2.15261906 9.6,4.79937714 C9.6,7.44655046 7.44673673,9.6 4.7997924,9.6 Z M4.79959481,0.9 C2.64922597,0.9 0.9,2.64900249 0.9,4.79918953 C0.9,6.95018703 2.64922597,8.7 4.79959481,8.7 C6.95036883,8.7 8.7,6.95018703 8.7,4.79918953 C8.7,2.64940773 6.95036883,0.9 4.79959481,0.9 Z M11.579002,12 C11.4749824,12 11.3709629,11.9593028 11.289322,11.8774707 L7.93168591,8.56830498 C7.76260228,8.39851441 7.75555713,8.11713467 7.91510908,7.93902961 C8.07631871,7.76136216 8.34237677,7.75261007 8.51104597,7.92065022 L11.8686821,11.2315664 C12.0373513,11.4004817 12.0443964,11.6822991 11.8848445,11.8608417 C11.8019603,11.9527387 11.6904812,12 11.579002,12 Z',
				width: 12,
			}
		} else if (appearance === 'clear-button') {
			// draw clear icon
			icon = {
				color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
				// tslint:disable-next-line:max-line-length
				path:
					'M5.26896659,6.00000686 L0.152356675,11.1166168 C-0.048420546,11.317394 -0.0501211184,11.6463861 0.151753253,11.8482467 C0.355026465,12.05152 0.681179729,12.0498468 0.883383238,11.8476433 L5.99999314,6.73103342 L11.1166168,11.8476433 C11.317394,12.0484205 11.6463861,12.0501211 11.8482467,11.8482467 C12.05152,11.6449735 12.0498468,11.3188203 11.8476433,11.1166168 L6.73103341,6.00000686 L11.8476433,0.883383238 C12.0484205,0.682606017 12.0501074,0.3536139 11.8482467,0.151753253 C11.6449598,-0.0515199596 11.3188065,-0.0498468209 11.1166168,0.152356675 L6.00000686,5.2689803 L0.883383238,0.152356688 C0.682606017,-0.0484205326 0.3536139,-0.0501073814 0.151753253,0.151753266 C-0.0515199596,0.355040202 -0.0498468209,0.681193466 0.152356675,0.883383252 L5.26896659,6.00000686 Z',
				width: 12,
			}
		} else if (appearance === 'date-button') {
			// draw date icon
			icon = {
				color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
				// tslint:disable-next-line:max-line-length
				path:
					'M5.6,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C6.8,6.2,6.7,6,6.4,6c0,0,0,0,0,0H5.6C5.3,6,5.1,6.2,5.1,6.4c0,0,0,0,0,0C5.1,6.7,5.3,6.8,5.6,6.8L5.6,6.8z M5.6,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H5.6c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C5.1,8.4,5.3,8.6,5.6,8.6L5.6,8.6z M10.3,0.9H8.6V0.4C8.6,0.2,8.4,0,8.1,0c0,0,0,0,0,0C7.9,0,7.7,0.2,7.7,0.4c0,0,0,0,0,0v0.4H4.3V0.4C4.3,0.2,4.1,0,3.9,0c0,0,0,0,0,0C3.6,0,3.4,0.2,3.4,0.4c0,0,0,0,0,0v0.4H1.7C0.8,0.9,0,1.6,0,2.6v6.8c0,0.9,0.8,1.7,1.7,1.7h8.6c0.9,0,1.7-0.8,1.7-1.7V2.6C12,1.6,11.2,0.9,10.3,0.9L10.3,0.9z M11.1,9.4c0,0.5-0.4,0.9-0.9,0.9H1.7c-0.5,0-0.9-0.4-0.9-0.9V4.3h10.3V9.4z M11.1,3.4H0.9V2.6c0-0.5,0.4-0.9,0.9-0.9h1.7v0.4c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4V1.7h3.4v0.4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V1.7h1.7c0.5,0,0.9,0.4,0.9,0.9L11.1,3.4L11.1,3.4z M3,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H3c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C2.6,8.4,2.8,8.6,3,8.6z M8.1,6.8H9c0.2,0,0.4-0.2,0.4-0.4C9.4,6.2,9.2,6,9,6c0,0,0,0,0,0H8.1C7.9,6,7.7,6.2,7.7,6.4c0,0,0,0,0,0C7.7,6.7,7.9,6.8,8.1,6.8L8.1,6.8z M3,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C4.3,6.2,4.1,6,3.9,6c0,0,0,0,0,0H3C2.8,6,2.6,6.2,2.6,6.4c0,0,0,0,0,0C2.6,6.7,2.8,6.8,3,6.8z M8.1,8.6H9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H8.1c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C7.7,8.4,7.9,8.6,8.1,8.6z',
				width: 12,
			}
		} else if (typeof appearance === 'function') {
			icon = appearance(active)
		} else if (obj.isObject(appearance)) {
			icon = appearance
		} else {
			window.console.warn(`unsupported appearance:${appearance}`)
		}
		if (icon) {
			// 绘制按钮图标时，不应影响到 overflowText
			const cellOverflowText =
				grid.getCellOverflowText(context.col, context.row) || ''
			helper.text('', context, {
				color,
				font,
				icons: [icon],
				padding: iconPadding,
				textAlign: 'right',
				textBaseline,
			})
			grid.setCellOverflowText(context.col, context.row, cellOverflowText)
		}
	}
}
export function customDraw<T>(
		helper: GridCanvasHelperAPI,
		draw: DrawColumnCallback | undefined,
		value: any,
		context: CellContext,
		grid: ListGridAPI<T>,
		record: unknown
) {
	let b = false
	if (draw) {
		const rect = context.getRect()
		const {row} = context
		const {col} = context
		const selection = context.getSelection()
		const opt = {
			grid,
			record,
			rect,
			row,
			col,
			selection,
		}
		helper.drawWithClip(context, (ctx) => {
			b = draw(value, ctx, opt) === false
		})
	}
	return b
}
export function isAttachArea<T>(record: T, cellStyle?: CellStyle) {
	let s: AttachCellStyle | undefined
	if (typeof cellStyle === 'function') {
		s = cellStyle(record)
	} else {
		s = cellStyle
	}
	let b = false
	if (s && s.innerBox === 'dashed') {
		b = true
	}
	return b
}

export function reviseAttachCellsArea<T>(
		rect: Rect,
		row: number,
		grid: ListGridAPI<T>,
		cellStyle?: CellStyle
) {
	const record = grid.getRowRecord(row)
	if (isAttachArea(record, cellStyle)) {
		rect.left += 4
		rect.top += 4
		rect.right -= 4
		rect.bottom -= 4
	}
}
export function reviseAttachCellsPadding<T>(
		padding: [number, number, number, number],
		row: number,
		grid: ListGridAPI<T>,
		cellStyle?: CellStyle
) {
	const record = grid.getRowRecord(row)
	if (isAttachArea(record, cellStyle)) {
		padding[3] -= 4
		if (padding[3] < 0) {
			padding[3] = 0
		}
		padding[1] -= 4
		if (padding[1] < 0) {
			padding[1] = 0
		}
	}
}
export function drawAttachArea<T>(
		grid: ListGridAPI<T>,
		record: unknown,
		context: CellContext,
		helper: GridCanvasHelperAPI,
		cellStyle?: CellStyle
) {
	if (isAttachArea(record, cellStyle)) {
		const rect = context.getRect()
		rect.top += 4
		rect.right -= 4
		rect.bottom -= 4
		rect.left += 4
		helper.attachArea(rect, context)
	}
}
