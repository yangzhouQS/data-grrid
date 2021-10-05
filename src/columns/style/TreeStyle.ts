import { Styles } from './Styles'
import { ColorDef, LineClamp, TreeStyleOption } from '../../ts-types'

let defaultTreeStyle: TreeStyle

export class TreeStyle extends Styles {
    private _lineColor?: ColorDef

    private _buttonColor?: ColorDef

    private _buttonBgColor?: ColorDef

    private _buttonBorderColor?: ColorDef

    private _linkColor?: ColorDef

    private _lineHeight?: string | number

    private _autoWrapText?: boolean

    private _lineClamp?: LineClamp

    constructor(style: TreeStyleOption = {}) {
        style.textAlign = style.textAlign || 'left'
        super(style)
        this._lineColor = style.lineColor
        this._buttonColor = style.buttonColor
        this._buttonBgColor = style.buttonBgColor
        this._buttonBorderColor = style.buttonBorderColor
        this._lineHeight = style.lineHeight
        this._linkColor = style.buttonBgColor
        this._autoWrapText = style.autoWrapText
        this._lineClamp = style.lineClamp
    }

    static get DEFAULT(): TreeStyle {
        return defaultTreeStyle ? defaultTreeStyle : (defaultTreeStyle = new TreeStyle())
    }

    clone(): TreeStyle {
        return new TreeStyle(this)
    }

    get lineColor(): ColorDef {
        return this._lineColor
    }

    set lineColor(value: ColorDef) {
        this._lineColor = value
        this.doChangeStyle()
    }

    get buttonColor(): ColorDef {
        return this._buttonColor
    }

    set buttonColor(value: ColorDef) {
        this._buttonColor = value
        this.doChangeStyle()
    }

    get buttonBgColor(): ColorDef {
        return this._buttonBgColor
    }

    set buttonBgColor(value: ColorDef) {
        this._buttonBgColor = value
        this.doChangeStyle()
    }

    get buttonBorderColor(): ColorDef {
        return this._buttonBorderColor
    }

    set buttonBorderColor(value: ColorDef) {
        this._buttonBorderColor = value
        this.doChangeStyle()
    }

    get linkColor(): ColorDef {
        return this._linkColor
    }

    set linkColor(value: ColorDef) {
        this._linkColor = value
        this.doChangeStyle()
    }

    get lineHeight(): string | number {
        return this._lineHeight
    }

    set lineHeight(value: string | number) {
        this._lineHeight = value
        this.doChangeStyle()
    }

    get autoWrapText(): boolean {
        return this._autoWrapText
    }

    set autoWrapText(value: boolean) {
        this._autoWrapText = value
        this.doChangeStyle()
    }

    get lineClamp(): LineClamp {
        return this._lineClamp
    }

    set lineClamp(value: LineClamp) {
        this._lineClamp = value
        this.doChangeStyle()
    }
}
