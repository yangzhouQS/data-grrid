import { IconDefine } from './ts-types'
import { columns, columns as _columns } from './columns'
import { core, core as _core } from './core'
import { tools, tools as _tools } from './tools'
import { ListGrid, ListGrid as _ListGrid } from './ListGrid'
import { data, data as _data } from './data'
import { headers, headers as _headers } from './headers'
import { themes, themes as _themes } from './themes'
import { GridCanvasHelper as _GridCanvasHelper } from './GridCanvasHelper'
import { register, register as _register } from './register'
import { svgIcons } from './icons'

export {
	core,
	tools,
	ListGrid,
	columns,
	data,
	headers,
	themes,
	_GridCanvasHelper,
	svgIcons,
	register,
	IconDefine
}
export const _dataGrid = {
	version: '1.0.1',
	core: _core,
	tools: _tools,

	// impl Grids
	ListGrid: _ListGrid,

	// objects
	columns: _columns,
	data: _data,
	headers: _headers,
	themes: _themes,

	// helper
	GridCanvasHelper: _GridCanvasHelper,
	get icons() {
		return svgIcons.get()
	},

	// plugin registers
	register: _register
}

export default {
	version: '1.0.1',
	core: _core,
	tools: _tools,

	// impl Grids
	ListGrid: _ListGrid,

	// objects
	columns: _columns,
	data: _data,
	headers: _headers,
	themes: _themes,

	// helper
	GridCanvasHelper: _GridCanvasHelper,
	get icons() {
		return svgIcons.get()
	},

	// plugin registers
	register: _register
}
