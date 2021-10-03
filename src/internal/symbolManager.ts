// /*/!* eslint-disable @typescript-eslint/no-explicit-any *!/
// import { isNode } from './utils'
//
// type SymbolType = (description?: string | number) => symbol;
//
// const Symbol: SymbolType = isNode
// 	? (global.Symbol as SymbolType)
// 	: (window.Symbol as SymbolType)
// 		? (window.Symbol as SymbolType)
// 		: ((): SymbolType => {
// 			function random(): string {
// 				const c = 'abcdefghijklmnopqrstuvwxyz0123456789'
// 				const cl = c.length
// 				let r = ''
// 				for (let i = 0; i < 10; i++) {
// 					r += c[Math.floor(Math.random() * cl)]
// 				}
// 				return r
// 			}
//
// 			return (name?: string | number): symbol => {
// 				if (name) {
// 					return `#${ name }_${ random() }` as any
// 				} else {
// 					return `#_${ random() }` as any
// 				}
// 			}
// 		})()
// const mem: { [key: string]: symbol } = {}*/

export function get(name?: string): '$$$$private symbol$$$$' {
	return (name || '_') as any
}

export function getThemeSymbol(): '$$$$theme_symbol$$$$' {
	return get('protected.theme') as any
}

export function getDrawGridSymbol(): '$$$$draw_grid_symbol$$$$' {
	return get('protected.draw_grid') as any
}

export function getProtectedSymbol(): '$$$$protected symbol$$$$' {
	return get('protected.list_grid') as any
}

export function getCheckColumnStateId(): '$$$$chkcol.stateID symbol$$$$' {
	return get('chkcol.stateID') as any
}

export function getRadioColumnStateId(): '$$$$rdcol.stateID symbol$$$$' {
	return get('rdcol.stateID') as any
}

export function getButtonColumnStateId(): '$$$$btncol.stateID symbol$$$$' {
	return get('btncol.stateID') as any
}

export function getColumnFadeinStateId(): '$$$$col.fadein_stateID symbol$$$$' {
	return get('col.fadein_stateID') as any
}

export function getBranchGraphColumnStateId(): '$$$$branch_graph_col.stateID symbol$$$$' {
	return get('branch_graph_col.stateID') as any
}

export function getSmallDialogInputEditorStateId(): '$$$$small_dialog_input_editor.stateID symbol$$$$' {
	return get('small_dialog_input_editor.stateID') as any
}

export function getInlineInputEditorStateId(): '$$$$inline_input_editor.stateID symbol$$$$' {
	return get('inline_input_editor.stateID') as any
}

export function getInlineMenuEditorStateId(): '$$$$inline_menu_editor.stateID symbol$$$$' {
	return get('inline_menu_editor.stateID') as any
}

export function getCheckHeaderStateId(): '$$$$check_header.stateID symbol$$$$' {
	return get('check_header.stateID') as any
}
