import type { ColorPropertyDefine, ColorsPropertyDefine } from './define'

// ****** Plugin Icons *******
export interface IconDefine {
    d: string;
    width: number;
    height: number;
}

// ****** Custom Theme *******
export type PartialThemeDefine = Partial<ThemeDefine>;

export interface ThemeDefine {
    font?: string;
    frozenRowsFont?: string
    underlayBackgroundColor: string; // 未绘制区域背景
    // color
    color: ColorPropertyDefine;
    frozenRowsColor?: ColorPropertyDefine;
    // background
    defaultBgColor?: ColorPropertyDefine;
    frozenRowsBgColor?: ColorPropertyDefine;
    selectionBgColor: ColorPropertyDefine; // 拖拽选中背景
    highlightBgColor?: ColorPropertyDefine; // 高亮单元格
    // border
    borderColor: ColorsPropertyDefine;
    frozenRowsBorderColor: ColorsPropertyDefine;
    highlightBorderColor: ColorsPropertyDefine; // 高亮边框
    // grid border
    gridBorderColor?: string
    gridBorderWidth?: number
    checkbox: {
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
    };
    radioButton: {
        checkColor?: ColorPropertyDefine;
        uncheckBorderColor?: ColorPropertyDefine;
        checkBorderColor?: ColorPropertyDefine;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
    };
    button: {
        color?: ColorPropertyDefine;
        bgColor?: ColorPropertyDefine;
    };
    header: {
        sortArrowColor?: ColorPropertyDefine;
    };
    messages: {
        infoBgColor?: ColorPropertyDefine;
        errorBgColor?: ColorPropertyDefine;
        warnBgColor?: ColorPropertyDefine;
    };

    tree: {
        lineColor?: ColorPropertyDefine
        buttonColor?: ColorPropertyDefine
        buttonBgColor?: ColorPropertyDefine
        buttonBorderColor?: ColorPropertyDefine
        linkColor?: ColorPropertyDefine
    };
}

export type RequiredThemeDefine = Required<ThemeDefine> & {
    checkbox: Required<ThemeDefine['checkbox']>;
    radioButton: Required<ThemeDefine['radioButton']>;
    button: Required<ThemeDefine['button']>;
    header: Required<ThemeDefine['header']>;
    messages: Required<ThemeDefine['messages']>;
    tree: Required<ThemeDefine['tree']>
};
