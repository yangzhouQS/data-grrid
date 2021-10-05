import { Appearance, ColorDef, StyleOption, TextOverflow } from '../../ts-types'
import { StdBaseStyle } from './StdBaseStyle'

let defaultStyle: Styles

export class Styles extends StdBaseStyle {
    private _color?: ColorDef
    private _font?: string
    private _padding: number | string | (number | string)[] | undefined
    private _inputPadding?: number | string | (number | string)[]
    private _textOverflow: TextOverflow
    private _appearance: Appearance

    static get DEFAULT(): Styles {
        return defaultStyle ? defaultStyle : (defaultStyle = new Styles())
    }

    constructor(style: StyleOption = {}) {
        super(style)
        this._color = style.color
        this._font = style.font
        this._padding = style.padding
        this._inputPadding = style.inputPadding
        this._textOverflow = style.textOverflow || 'clip'
        this._appearance = style.appearance || 'none'
    }

    get appearance(): Appearance {
        return this._appearance
    }

    set appearance(value: Appearance) {
        this._appearance = value
    }

    get inputPadding(): number | string | (number | string)[] {
        return this._inputPadding
    }

    set inputPadding(value: number | string | (number | string)[]) {
        this._inputPadding = value
    }


    get color(): ColorDef | undefined {
        return this._color
    }

    set color(color: ColorDef | undefined) {
        this._color = color
        this.doChangeStyle()
    }

    get font(): string | undefined {
        return this._font
    }

    set font(font: string | undefined) {
        this._font = font
        this.doChangeStyle()
    }

    get padding(): number | string | (number | string)[] | undefined {
        return this._padding
    }

    set padding(padding: number | string | (number | string)[] | undefined) {
        this._padding = padding
        this.doChangeStyle()
    }

    get textOverflow(): TextOverflow {
        return this._textOverflow
    }

    set textOverflow(textOverflow: TextOverflow) {
        this._textOverflow = textOverflow
        this.doChangeStyle()
    }

    clone(): Styles {
        return new Styles(this)
    }
}
