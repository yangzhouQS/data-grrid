import type {
    ColorPropertyDefine, ColorsPropertyDefine, PartialThemeDefine,
    RequiredThemeDefine, StylePropertyFunctionArg, ThemeDefine
} from '../ts-types'
import { getChainSafe } from '../internal/utils'
import { getThemeSymbol } from '../internal/symbolManager'
//private symbol
const _ = getThemeSymbol()

function getProp<T extends ColorPropertyDefine | ColorsPropertyDefine>(
    obj: PartialThemeDefine, superObj: ThemeDefine, names: string[], defNames?: string[]
): T {
    return getChainSafe(obj, ...names) || getChainSafe(superObj, ...names) || (defNames && getChainSafe(obj, ...defNames)) || (defNames && getChainSafe(superObj, ...defNames))
}

export class Theme implements RequiredThemeDefine {
    private [_]: {
        obj: PartialThemeDefine;
        superTheme: ThemeDefine;
    }

    private _checkbox: RequiredThemeDefine['checkbox'] | null = null

    private _radioButton: RequiredThemeDefine['radioButton'] | null = null

    private _button: RequiredThemeDefine['button'] | null = null

    private _header: RequiredThemeDefine['header'] | null = null

    private _messages: RequiredThemeDefine['messages'] | null = null

    private _tree: RequiredThemeDefine['tree'] | null = null

    constructor(obj: ThemeDefine);

    constructor(obj: PartialThemeDefine, superTheme: ThemeDefine);

    constructor(obj: PartialThemeDefine | ThemeDefine, superTheme?: ThemeDefine) {
        this[_] = {
            obj,
            superTheme: superTheme as ThemeDefine
        }
    }

    // font
    get font(): string {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'font' ])
    }

    public get frozenRowsFont(): string {
        const obj = this[_].obj
        const superTheme = this[_].superTheme
        return getProp(obj, superTheme, [ 'frozenRowsFont' ])
    }

    get underlayBackgroundColor(): string {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'underlayBackgroundColor' ])
    }

    // color
    get color(): ColorPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'color' ])
    }

    get frozenRowsColor(): ColorPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'frozenRowsColor' ], [ 'color' ])
    }

    // background
    get defaultBgColor(): ColorPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'defaultBgColor' ])
    }

    get frozenRowsBgColor(): ColorPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'frozenRowsBgColor' ], [ 'defaultBgColor' ])
    }

    get selectionBgColor(): ColorPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'selectionBgColor' ], [ 'defaultBgColor' ])
    }

    get highlightBgColor(): ColorPropertyDefine {
        if (this.hasProperty([ 'highlightBgColor' ])) {
            const { obj, superTheme } = this[_]
            return getProp(obj, superTheme, [ 'highlightBgColor' ])
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (args: StylePropertyFunctionArg): any => {
            const color = args.row < args.grid.frozenRowCount ? this.frozenRowsBgColor : this.defaultBgColor
            if (typeof color === 'function') {
                return color(args)
            }
            return color
        }
    }

    // border, 表格线颜色
    get borderColor(): ColorsPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'borderColor' ])
    }

    get frozenRowsBorderColor(): ColorsPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'frozenRowsBorderColor' ], [ 'borderColor' ])
    }

    get highlightBorderColor(): ColorsPropertyDefine {
        const { obj, superTheme } = this[_]
        return getProp(obj, superTheme, [ 'highlightBorderColor' ], [ 'borderColor' ])
    }

    // grid border
    public get gridBorderColor(): string {
        const obj = this[_].obj
        const superTheme = this[_].superTheme
        return getProp(obj, superTheme, [ 'gridBorderColor' ])
    }

    public get gridBorderWidth(): number {
        const obj = this[_].obj
        const superTheme = this[_].superTheme
        return getProp(obj, superTheme, [ 'gridBorderWidth' ]) as unknown as number
    }

    get checkbox(): RequiredThemeDefine['checkbox'] {
        const { obj, superTheme } = this[_]
        return (
            this._checkbox ||
            (this._checkbox = {
                get uncheckBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'checkbox', 'uncheckBgColor' ], [ 'defaultBgColor' ])
                },
                get checkBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'checkbox', 'checkBgColor' ], [ 'borderColor' ])
                },
                get borderColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'checkbox', 'borderColor' ], [ 'borderColor' ])
                }
            })
        )
    }

    get radioButton(): RequiredThemeDefine['radioButton'] {
        const { obj, superTheme } = this[_]
        return (
            this._radioButton ||
            (this._radioButton = {
                get checkColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'radioButton', 'checkColor' ], [ 'color' ])
                },
                get uncheckBorderColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'radioButton', 'uncheckBorderColor' ], [ 'borderColor' ])
                },
                get checkBorderColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'radioButton', 'checkBorderColor' ], [ 'borderColor' ])
                },
                get uncheckBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'radioButton', 'uncheckBgColor' ], [ 'defaultBgColor' ])
                },
                get checkBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'radioButton', 'checkBgColor' ], [ 'defaultBgColor' ])
                }
            })
        )
    }

    get button(): RequiredThemeDefine['button'] {
        const { obj, superTheme } = this[_]
        return (
            this._button ||
            (this._button = {
                get color(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'button', 'color' ], [ 'color' ])
                },
                get bgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'button', 'bgColor' ], [ 'defaultBgColor' ])
                }
            })
        )
    }

    get header(): RequiredThemeDefine['header'] {
        const { obj, superTheme } = this[_]
        console.log(superTheme)
        return (
            this._header ||
            (this._header = {
                get sortArrowColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'header', 'sortArrowColor' ], [ 'color' ])
                }
            })
        )
    }

    get messages(): RequiredThemeDefine['messages'] {
        const { obj, superTheme } = this[_]
        return (
            this._messages ||
            (this._messages = {
                get infoBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'messages', 'infoBgColor' ])
                },
                get errorBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'messages', 'errorBgColor' ])
                },
                get warnBgColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'messages', 'warnBgColor' ])
                }
            })
        )
    }

    public get tree(): RequiredThemeDefine['tree'] {
        const obj = this[_].obj
        const superTheme = this[_].superTheme
        return (
            this._tree ||
            (this._tree = {
                get lineColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'tree', 'lineColor' ])
                },
                get buttonColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'tree', 'buttonColor' ], [ 'color' ])
                },
                get buttonBgColor(): ColorPropertyDefine {
                    return getProp(
                        obj,
                        superTheme,
                        [ 'tree', 'buttonBgColor' ],
                        [ 'defaultBgColor' ]
                    )
                },
                get buttonBorderColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'tree', 'buttonBorderColor' ])
                },
                get linkColor(): ColorPropertyDefine {
                    return getProp(obj, superTheme, [ 'tree', 'linkColor' ])
                }
            })
        )
    }

    hasProperty(names: string[]): boolean {
        const { obj, superTheme } = this[_]
        return hasThemeProperty(obj, names) || hasThemeProperty(superTheme, names)
    }

    extends(obj: PartialThemeDefine): Theme {
        return new Theme(obj, this)
    }
}

function hasThemeProperty(obj: PartialThemeDefine, names: string[]): boolean {
    if (obj instanceof Theme) {
        return obj.hasProperty(names)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let o: any = obj
        if (!o) {
            return false
        }
        for (let index = 0; index < names.length; index++) {
            const name = names[index]
            o = o[name]
            if (!o) {
                return false
            }
        }
        return !!o
    }
}
