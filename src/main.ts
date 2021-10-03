import { IconDefine } from './ts-types'
import { columns as _columns } from './columns'
import { core as _core } from './core'
import { tools as _tools } from './tools'
import { ListGrid as _ListGrid } from './ListGrid'
import { data as _data } from './data'
import { headers as _headers } from './headers'
import { themes as _themes } from './themes'
import { GridCanvasHelper as _GridCanvasHelper } from './GridCanvasHelper'
import { register as _register } from './register'
import { svgIcons } from './icons'

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

