/*// import type * as TYPES from './ts-types'
import { IconDefine } from './ts-types'
import * as columns from './columns'
import * as core from './core'
import * as data from './data'
import * as headers from './headers'
import * as icons from './icons'
import * as register from './register'
import * as themes from './themes'
import * as tools from './tools'
import {
    ColumnDefine,
    GroupHeaderDefine,
    HeaderDefine,
    HeadersDefine,
    ListGrid,
    ListGridConstructorOptions
} from './ListGrid'
import { GridCanvasHelper } from './GridCanvasHelper'
import type { Theme } from './themes/theme'

export { getInternal as _getInternal } from './get-internal'*/

import { IconDefine } from './ts-types';
import { columns as _columns } from './columns';
import { core as _core } from './core';
import { tools as _tools } from './tools';
import { ListGrid as _ListGrid } from './ListGrid';
import { data as _data } from './data';
import { headers as _headers } from './headers';
import { themes as _themes } from './themes';
import { GridCanvasHelper as _GridCanvasHelper } from './GridCanvasHelper';
import { register as _register } from './register';
import { svgIcons } from './icons';

const kakaGrid = {
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
    return svgIcons.get();
  },

  // plugin registers
  register: _register
};
export default kakaGrid;
/*

export {
    core,
    tools,
    // impl Grids
    ListGrid,
    // ListGrid types
    ListGridConstructorOptions,
    HeadersDefine,
    ColumnDefine,
    HeaderDefine,
    GroupHeaderDefine,
    // objects
    columns,
    headers,
    themes,
    data,
    // helper
    GridCanvasHelper,
    readonly icons:{
  [key: string]:IconDefine
},
    // getIcons,
    register
}

/!*function getIcons(): { [key: string]: TYPES.IconDefine } {
    return icons.get()
}*!/

export default {
    core,
    tools,
    // impl Grids
    ListGrid,
    // objects
    columns,
    headers,
    themes,
    data,
    // helper
    GridCanvasHelper,
    //plugin registers
    register,
    get icons(): { [key: string]: TYPES.IconDefine } {
        return getIcons()
    }
}
*/
