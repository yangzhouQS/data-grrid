import type { MenuStyleOption } from '../../ts-types'
import { Styles } from './Styles'

let defaultStyle: MenuStyle

export class MenuStyle extends Styles {
    static get DEFAULT(): MenuStyle {
        return defaultStyle ? defaultStyle : (defaultStyle = new MenuStyle())
    }

    constructor(style: MenuStyleOption = {}) {
        super(style)
    }

    clone(): MenuStyle {
        return new MenuStyle(this as MenuStyleOption)
    }
}
