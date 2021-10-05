import type { ButtonStyleOption, ColorDef } from '../../ts-types'
import { Styles } from './Styles'
import { defaults } from '../../internal/utils'

let defaultStyle: ButtonStyle

export class ButtonStyle extends Styles {
    private _buttonBgColor?: ColorDef

    static get DEFAULT(): ButtonStyle {
    	return defaultStyle ? defaultStyle : (defaultStyle = new ButtonStyle())
    }

    constructor(style: ButtonStyleOption = {}) {
    	super(defaults(style, { textAlign: 'center' }))
    	const { buttonBgColor } = style
    	this._buttonBgColor = buttonBgColor
    }

    get buttonBgColor(): ColorDef | undefined {
    	return this._buttonBgColor
    }

    set buttonBgColor(buttonBgColor: ColorDef | undefined) {
    	this._buttonBgColor = buttonBgColor
    	this.doChangeStyle()
    }

    clone(): ButtonStyle {
    	return new ButtonStyle(this)
    }
}
