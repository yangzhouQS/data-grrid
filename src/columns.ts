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
	Column,
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
	EVENT_TYPE,
	BaseStyle,
	Style,
	headerStyleOf
}
const type = {
	TYPES,
	Column,
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
	Editor,
	CheckEditor,
	RadioEditor,
	InlineInputEditor,
	InlineMenuEditor,
	ImmutableCheckEditor,
	ImmutableInputEditor,
	ImmutableRadioEditor,
	of: actionOf
}
/**
 * columns
 */
export const columns = { action, type, style }
