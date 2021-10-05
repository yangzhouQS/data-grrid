import { GridInternal, InlineEditingState } from '../../ts-types-internal'
import { obj } from '../../internal/utils'
import { getInlineEditingStateId } from '../../internal/symbolManager'
const INLINE_EDITING_STATE_ID = getInlineEditingStateId()

export function toBoolean(val: unknown): boolean {
	if (typeof val === 'string') {
		if (val === 'false') {
			return false
		} else if (val === 'off') {
			return false
		} else if (/^0+$/.exec(val)) {
			return false
		}
	}
	return Boolean(val)
}


export function getInlineEditingState<T>(
		grid: GridInternal<T>
): InlineEditingState {
	let state = grid[INLINE_EDITING_STATE_ID]
	if (!state) {
		state = {}
		obj.setReadonly(grid, INLINE_EDITING_STATE_ID, state)
	}
	return state
}
