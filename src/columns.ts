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
	Styles,
	NumberStyle,
	CheckStyle,
	RadioStyle,
	ButtonStyle,
	ImageStyle,
	IconStyle,
	PercentCompleteBarStyle,
	MultilineTextStyle,
	MenuStyle,
	TreeStyle,
	of as styleOf
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
	TreeColumn,
	of as typeOf
} from './columns/type'

const style = {
	EVENT_TYPE,
	BaseStyle,
	Style: Styles,
	NumberStyle,
	CheckStyle,
	RadioStyle,
	ButtonStyle,
	ImageStyle,
	IconStyle,
	PercentCompleteBarStyle,
	MultilineTextStyle,
	MenuStyle,
	TreeStyle,
	styleOf
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
	TreeColumn,
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
