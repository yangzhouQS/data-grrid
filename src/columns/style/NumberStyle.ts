import type { NumberStyleOption } from '../../ts-types'
import { Styles } from './Styles'
import { defaults } from '../../internal/utils'

let defaultStyle: NumberStyle

export class NumberStyle extends Styles {
	static get DEFAULT(): NumberStyle {
		return defaultStyle ? defaultStyle : (defaultStyle = new NumberStyle())
	}

	constructor(style: NumberStyleOption = {}) {
		super(defaults(style, { textAlign: 'right' }))
	}

	clone(): NumberStyle {
		return new NumberStyle(this)
	}
}
