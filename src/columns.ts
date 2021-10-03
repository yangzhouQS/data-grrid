// import * as action from './columns/action'
// import * as style from './columns/style'
// import * as type from './columns/type'
import {
	ACTIONS,
	BaseAction,
	Editor,
	CheckEditor,
	RadioEditor,
	InlineInputEditor,
	InlineMenuEditor,
	ButtonAction,
	ImmutableCheckEditor,
	ImmutableInputEditor,
	ImmutableRadioEditor,
	of as actionOf
} from './columns/action'


import {
	EVENT_TYPE,
	BaseStyle,
	Style,
	of as headerStyleOf
} from './columns/style'

import {
	TYPES,
	ButtonColumn,
	NumberColumn,
	CheckColumn,
	MenuColumn,
	ImageColumn,
	PercentCompleteBarColumn,
	IconColumn,
	MultilineTextColumn,
	BranchGraphColumn,
	RadioColumn,
	of as typeOf
} from './columns/type'

const style = {
	EVENT_TYPE
}
const type = {
	TYPES,
	ButtonColumn,
	NumberColumn,
	CheckColumn,
	MenuColumn,
	ImageColumn,
	PercentCompleteBarColumn,
	IconColumn,
	MultilineTextColumn,
	BranchGraphColumn,
	RadioColumn,
	of: typeOf
}
const action = {
	ACTIONS: ACTIONS,
	BaseAction,
	ButtonAction,
	ImmutableCheckEditor,
	ImmutableInputEditor,
	ImmutableRadioEditor,
	of: actionOf
}
/**
 * columns
 */
// @ts-ignore
export const columns = { action, type, style }
