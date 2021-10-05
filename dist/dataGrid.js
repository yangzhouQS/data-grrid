(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dataGrid"] = factory();
	else
		root["dataGrid"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/columns/action/internal/InlineInputElement.css":
/*!************************************************************!*\
  !*** ./src/columns/action/internal/InlineInputElement.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/columns/action/internal/InlineMenuElement.css":
/*!***********************************************************!*\
  !*** ./src/columns/action/internal/InlineMenuElement.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/columns/action/internal/SmallDialogInputElement.css":
/*!*****************************************************************!*\
  !*** ./src/columns/action/internal/SmallDialogInputElement.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/columns/message/internal/ErrorMessageElement.css":
/*!**************************************************************!*\
  !*** ./src/columns/message/internal/ErrorMessageElement.css ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/columns/message/internal/MessageElement.css":
/*!*********************************************************!*\
  !*** ./src/columns/message/internal/MessageElement.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/columns/message/internal/WarningMessageElement.css":
/*!****************************************************************!*\
  !*** ./src/columns/message/internal/WarningMessageElement.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/internal/style.css":
/*!********************************!*\
  !*** ./src/internal/style.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/tooltip/internal/TooltipElement.css":
/*!*************************************************!*\
  !*** ./src/tooltip/internal/TooltipElement.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/GridCanvasHelper.ts":
/*!*********************************!*\
  !*** ./src/GridCanvasHelper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridCanvasHelper": () => (/* binding */ GridCanvasHelper)
/* harmony export */ });
/* harmony import */ var _internal_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/calc */ "./src/internal/calc.ts");
/* harmony import */ var _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/canvashelper */ "./src/tools/canvashelper.ts");
/* harmony import */ var _internal_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/fonts */ "./src/internal/fonts.ts");
/* harmony import */ var _element_inlines__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./element/inlines */ "./src/element/inlines.ts");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./themes */ "./src/themes.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/canvases */ "./src/internal/canvases.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _element_InlineDrawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./element/InlineDrawer */ "./src/element/InlineDrawer.ts");
/* harmony import */ var _internal_Rect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./internal/Rect */ "./src/internal/Rect.ts");
/* harmony import */ var _internal_color__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./internal/color */ "./src/internal/color.ts");










const { toBoxArray } = _internal_utils__WEBPACK_IMPORTED_MODULE_6__.style;
const INLINE_ELLIPSIS = _element_inlines__WEBPACK_IMPORTED_MODULE_3__.of('\u2026');
function invalidateCell(context, grid) {
    const { col, row } = context;
    grid.invalidateCell(col, row);
}
function getColor(color, col, row, grid, context) {
    return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getOrApply)(color, {
        col,
        row,
        grid,
        context
    });
}
function getFont(font, col, row, grid, context) {
    if (font == null) {
        return undefined;
    }
    return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getOrApply)(font, {
        col,
        row,
        grid,
        context
    });
}
function getThemeColor(grid, ...names) {
    const gridThemeColor = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getChainSafe)(grid.theme, ...names);
    if (gridThemeColor == null) {
        // use default theme
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getChainSafe)(_themes__WEBPACK_IMPORTED_MODULE_4__.getDefault(), ...names);
    }
    if (typeof gridThemeColor !== 'function') {
        return gridThemeColor;
    }
    let defaultThemeColor;
    return ((args) => {
        const color = gridThemeColor(args);
        if (color != null) {
            // use grid theme
            return color;
        }
        // use default theme
        defaultThemeColor = defaultThemeColor || (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getChainSafe)(_themes__WEBPACK_IMPORTED_MODULE_4__.getDefault(), ...names);
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.getOrApply)(defaultThemeColor, args);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
}
function testFontLoad(font, value, context, grid) {
    if (font) {
        if (!_internal_fonts__WEBPACK_IMPORTED_MODULE_2__.check(font, value)) {
            _internal_fonts__WEBPACK_IMPORTED_MODULE_2__.load(font, value, () => invalidateCell(context, grid));
            return false;
        }
    }
    return true;
}
function drawInlines(ctx, inlines, rect, offset, offsetTop, offsetBottom, col, row, grid) {
    function drawInline(inline, offsetLeft, offsetRight) {
        if (inline.canDraw()) {
            ctx.save();
            try {
                ctx.fillStyle = getColor(inline.color() || ctx.fillStyle, col, row, grid, ctx);
                ctx.font = inline.font() || ctx.font;
                inline.draw({
                    ctx,
                    canvashelper: _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__,
                    rect,
                    offset,
                    offsetLeft,
                    offsetRight,
                    offsetTop,
                    offsetBottom
                });
            }
            finally {
                ctx.restore();
            }
        }
        else {
            inline.onReady(() => grid.invalidateCell(col, row));
            //noop
        }
    }
    if (inlines.length === 1) {
        //1件の場合は幅計算が不要なため分岐
        const inline = inlines[0];
        drawInline(inline, 0, 0);
    }
    else {
        const inlineWidths = inlines.map((inline) => (inline.width({ ctx }) || 0) - 0);
        let offsetRight = inlineWidths.reduce((a, b) => a + b);
        let offsetLeft = 0;
        inlines.forEach((inline, index) => {
            const inlineWidth = inlineWidths[index];
            offsetRight -= inlineWidth;
            drawInline(inline, offsetLeft, offsetRight);
            offsetLeft += inlineWidth;
        });
    }
}
function buildInlines(icons, inline) {
    return _element_inlines__WEBPACK_IMPORTED_MODULE_3__.buildInlines(icons, inline || '');
}
function inlineToString(inline) {
    return _element_inlines__WEBPACK_IMPORTED_MODULE_3__.string(inline);
}
function getOverflowInline(textOverflow) {
    if (!isAllowOverflow(textOverflow) || textOverflow === 'ellipsis') {
        return INLINE_ELLIPSIS;
    }
    textOverflow = textOverflow.trim();
    if (textOverflow.length === 1) {
        return _element_inlines__WEBPACK_IMPORTED_MODULE_3__.of(textOverflow[0]);
    }
    return INLINE_ELLIPSIS;
}
function isAllowOverflow(textOverflow) {
    return Boolean(textOverflow && textOverflow !== 'clip' && typeof textOverflow === 'string');
}
function getOverflowInlinesIndex(ctx, inlines, width) {
    const maxWidth = width - 3; /*buffer*/
    let lineWidth = 0;
    for (let i = 0; i < inlines.length; i++) {
        const inline = inlines[i];
        const inlineWidth = (inline.width({ ctx }) || 0) - 0;
        if (lineWidth + inlineWidth > maxWidth) {
            return {
                index: i,
                lineWidth,
                remWidth: maxWidth - lineWidth
            };
        }
        lineWidth += inlineWidth;
    }
    return null;
}
function isOverflowInlines(ctx, inlines, width) {
    return !!getOverflowInlinesIndex(ctx, inlines, width);
}
function breakWidthInlines(ctx, inlines, width) {
    const indexData = getOverflowInlinesIndex(ctx, inlines, width);
    if (!indexData) {
        return {
            beforeInlines: inlines,
            overflow: false,
            afterInlines: []
        };
    }
    const { index, remWidth } = indexData;
    const inline = inlines[index];
    const beforeInlines = inlines.slice(0, index);
    const afterInlines = [];
    if (inline.canBreak()) {
        let { before, after } = inline.breakWord(ctx, remWidth);
        if (!before && !beforeInlines.length) {
            ({ before, after } = inline.breakAll(ctx, remWidth));
        }
        if (!before && !beforeInlines.length) {
            // Always return one char
            ({ before, after } = inline.splitIndex(1));
        }
        if (before) {
            beforeInlines.push(before);
        }
        if (after) {
            afterInlines.push(after);
        }
        afterInlines.push(...inlines.slice(index + 1));
    }
    else {
        if (!beforeInlines.length) {
            // Always return one char
            beforeInlines.push(inline);
        }
        afterInlines.push(...inlines.slice(beforeInlines.length));
    }
    return {
        beforeInlines,
        overflow: true,
        afterInlines
    };
}
function truncateInlines(ctx, inlines, width, option) {
    const indexData = getOverflowInlinesIndex(ctx, inlines, width);
    if (!indexData) {
        return {
            inlines,
            overflow: false
        };
    }
    const { index, lineWidth } = indexData;
    const inline = inlines[index];
    const overflowInline = getOverflowInline(option);
    const ellipsisWidth = overflowInline.width({ ctx });
    const remWidth = width - lineWidth - ellipsisWidth;
    const result = inlines.slice(0, index);
    if (inline.canBreak()) {
        const { before } = inline.breakAll(ctx, remWidth);
        if (before) {
            result.push(before);
        }
    }
    result.push(overflowInline);
    return {
        inlines: result,
        overflow: true
    };
}
function _inlineRect(grid, ctx, inline, rect, col, row, { offset, color, textAlign, textBaseline, font, textOverflow, icons }) {
    //文字style
    ctx.fillStyle = getColor(color || ctx.fillStyle, col, row, grid, ctx);
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font || ctx.font;
    let inlines = buildInlines(icons, inline);
    if (isAllowOverflow(textOverflow) && isOverflowInlines(ctx, inlines, rect.width)) {
        const { inlines: truncInlines, overflow } = truncateInlines(ctx, inlines, rect.width, textOverflow);
        inlines = truncInlines;
        grid.setCellOverflowText(col, row, overflow && inlineToString(inline));
    }
    else {
        grid.setCellOverflowText(col, row, false);
    }
    drawInlines(ctx, inlines, rect, offset, 0, 0, col, row, grid);
}
// eslint-disable-next-line complexity
function _multiInlineRect(grid, ctx, multiInlines, rect, col, row, { offset, color, textAlign, textBaseline, font, lineHeight, autoWrapText, lineClamp, textOverflow, icons }) {
    //文字style
    ctx.fillStyle = getColor(color || ctx.fillStyle, col, row, grid, ctx);
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font || ctx.font;
    if (lineClamp === 'auto') {
        const rectHeight = rect.height - offset * 2 - 2; /*offset added by Inline#draw*/
        lineClamp = Math.max(Math.floor(rectHeight / lineHeight), 1);
    }
    let buildedMultiInlines;
    if (autoWrapText || lineClamp > 0 || isAllowOverflow(textOverflow)) {
        const { width } = rect;
        buildedMultiInlines = [];
        const procLineClamp = lineClamp > 0
            ? (inlines, hasNext) => {
                if (buildedMultiInlines.length + 1 >= lineClamp) {
                    if (inlines.length === 0 && hasNext) {
                        buildedMultiInlines.push([getOverflowInline(textOverflow)]);
                        grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                    }
                    else {
                        const { inlines: truncInlines, overflow } = truncateInlines(ctx, inlines, width, textOverflow);
                        buildedMultiInlines.push(hasNext && !overflow ? truncInlines.concat([getOverflowInline(textOverflow)]) : truncInlines);
                        if (overflow || hasNext) {
                            grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                        }
                    }
                    return false;
                }
                return true;
            }
            : () => true;
        const procLine = autoWrapText
            ? (inlines, hasNext) => {
                if (!procLineClamp(inlines, hasNext)) {
                    return false;
                }
                while (inlines.length) {
                    if (!procLineClamp(inlines, hasNext)) {
                        return false;
                    }
                    const { beforeInlines, afterInlines } = breakWidthInlines(ctx, inlines, width);
                    buildedMultiInlines.push(beforeInlines);
                    inlines = afterInlines;
                }
                return true;
            }
            : isAllowOverflow(textOverflow)
                ? (inlines, hasNext) => {
                    if (!procLineClamp(inlines, hasNext)) {
                        return false;
                    }
                    const { inlines: truncInlines, overflow } = truncateInlines(ctx, inlines, width, textOverflow);
                    buildedMultiInlines.push(truncInlines);
                    if (overflow) {
                        grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                    }
                    return true;
                }
                : (inlines, hasNext) => {
                    if (!procLineClamp(inlines, hasNext)) {
                        return false;
                    }
                    buildedMultiInlines.push(inlines);
                    return true;
                };
        grid.setCellOverflowText(col, row, false);
        for (let lineRow = 0; lineRow < multiInlines.length; lineRow++) {
            const inline = multiInlines[lineRow];
            const buildedInline = buildInlines(lineRow === 0 ? icons : undefined, inline);
            if (!procLine(buildedInline, lineRow + 1 < multiInlines.length)) {
                break;
            }
        }
    }
    else {
        grid.setCellOverflowText(col, row, false);
        buildedMultiInlines = multiInlines.map((inline, lineRow) => buildInlines(lineRow === 0 ? icons : undefined, inline));
    }
    let paddingTop = 0;
    let paddingBottom = lineHeight * (buildedMultiInlines.length - 1);
    if (ctx.textBaseline === 'top' || ctx.textBaseline === 'hanging') {
        const em = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.getFontSize)(ctx, ctx.font).height;
        const pad = (lineHeight - em) / 2;
        paddingTop += pad;
        paddingBottom -= pad;
    }
    else if (ctx.textBaseline === 'bottom' || ctx.textBaseline === 'alphabetic' || ctx.textBaseline === 'ideographic') {
        const em = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.getFontSize)(ctx, ctx.font).height;
        const pad = (lineHeight - em) / 2;
        paddingTop -= pad;
        paddingBottom += pad;
    }
    buildedMultiInlines.forEach((buildedInline) => {
        drawInlines(ctx, buildedInline, rect, offset, paddingTop, paddingBottom, col, row, grid);
        paddingTop += lineHeight;
        paddingBottom -= lineHeight;
    });
}
function calcElapsedColor(startColor, endColor, elapsedTime) {
    const startColorRGB = (0,_internal_color__WEBPACK_IMPORTED_MODULE_9__.colorToRGB)(startColor);
    const endColorRGB = (0,_internal_color__WEBPACK_IMPORTED_MODULE_9__.colorToRGB)(endColor);
    const getRGB = (colorName) => {
        const start = startColorRGB[colorName];
        const end = endColorRGB[colorName];
        if (elapsedTime >= 1) {
            return end;
        }
        if (elapsedTime <= 0) {
            return start;
        }
        const diff = start - end;
        return Math.ceil(start - diff * elapsedTime);
    };
    return `rgb(${getRGB('r')}, ${getRGB('g')}, ${getRGB('b')})`;
}
function drawCheckbox(ctx, rect, col, row, check, helper, { animElapsedTime = 1, uncheckBgColor = helper.theme.checkbox.uncheckBgColor, checkBgColor = helper.theme.checkbox.checkBgColor, borderColor = helper.theme.checkbox.borderColor, textAlign = 'center', textBaseline = 'middle' }, positionOpt = {}) {
    const boxWidth = _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.measureCheckbox(ctx).width;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.calcStartPosition)(ctx, rect, boxWidth + 1 /*罫線分+1*/, boxWidth + 1 /*罫線分+1*/, positionOpt);
    uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
    checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
    borderColor = helper.getColor(borderColor, col, row, ctx);
    if (0 < animElapsedTime && animElapsedTime < 1) {
        uncheckBgColor = check ? uncheckBgColor : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
        checkBgColor = check ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime) : checkBgColor;
    }
    _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.drawCheckbox(ctx, pos.x, pos.y, check ? animElapsedTime : false, {
        uncheckBgColor,
        checkBgColor,
        borderColor
    });
}
function drawRadioButton(ctx, rect, col, row, check, helper, { animElapsedTime = 1, checkColor = helper.theme.radioButton.checkColor, uncheckBorderColor = helper.theme.radioButton.uncheckBorderColor, checkBorderColor = helper.theme.radioButton.checkBorderColor, uncheckBgColor = helper.theme.radioButton.uncheckBgColor, checkBgColor = helper.theme.radioButton.checkBgColor, textAlign = 'center', textBaseline = 'middle' }, positionOpt = {}) {
    const boxWidth = _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.measureRadioButton(ctx).width;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.calcStartPosition)(ctx, rect, boxWidth + 1 /*罫線分+1*/, boxWidth + 1 /*罫線分+1*/, positionOpt);
    checkColor = helper.getColor(checkColor, col, row, ctx);
    uncheckBorderColor = helper.getColor(uncheckBorderColor, col, row, ctx);
    checkBorderColor = helper.getColor(checkBorderColor, col, row, ctx);
    uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
    checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
    let borderColor = check ? checkBorderColor : uncheckBorderColor;
    let bgColor = check ? checkBgColor : uncheckBgColor;
    if (0 < animElapsedTime && animElapsedTime < 1) {
        borderColor = check
            ? calcElapsedColor(uncheckBorderColor, checkBorderColor, animElapsedTime)
            : calcElapsedColor(checkBorderColor, uncheckBorderColor, animElapsedTime);
        bgColor = check ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime) : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
    }
    _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.drawRadioButton(ctx, pos.x, pos.y, check ? animElapsedTime : 1 - animElapsedTime, {
        checkColor,
        borderColor,
        bgColor
    });
}
class ThemeResolver {
    _grid;
    _checkbox = null;
    _radioButton = null;
    _button = null;
    _header = null;
    _messages = null;
    constructor(grid) {
        this._grid = grid;
    }
    getThemeColor(...name) {
        return getThemeColor(this._grid, ...name);
    }
    get font() {
        return getThemeColor(this._grid, 'font');
    }
    get underlayBackgroundColor() {
        return getThemeColor(this._grid, 'underlayBackgroundColor');
    }
    // color
    get color() {
        return getThemeColor(this._grid, 'color');
    }
    get frozenRowsColor() {
        return getThemeColor(this._grid, 'frozenRowsColor');
    }
    // background
    get defaultBgColor() {
        return getThemeColor(this._grid, 'defaultBgColor');
    }
    get frozenRowsBgColor() {
        return getThemeColor(this._grid, 'frozenRowsBgColor');
    }
    get selectionBgColor() {
        return getThemeColor(this._grid, 'selectionBgColor');
    }
    get highlightBgColor() {
        return getThemeColor(this._grid, 'highlightBgColor');
    }
    // border
    get borderColor() {
        return getThemeColor(this._grid, 'borderColor');
    }
    get frozenRowsBorderColor() {
        return getThemeColor(this._grid, 'frozenRowsBorderColor');
    }
    get highlightBorderColor() {
        return getThemeColor(this._grid, 'highlightBorderColor');
    }
    get checkbox() {
        const grid = this._grid;
        return (this._checkbox ||
            (this._checkbox = {
                get uncheckBgColor() {
                    return getThemeColor(grid, 'checkbox', 'uncheckBgColor');
                },
                get checkBgColor() {
                    return getThemeColor(grid, 'checkbox', 'checkBgColor');
                },
                get borderColor() {
                    return getThemeColor(grid, 'checkbox', 'borderColor');
                }
            }));
    }
    get radioButton() {
        const grid = this._grid;
        return (this._radioButton ||
            (this._radioButton = {
                get checkColor() {
                    return getThemeColor(grid, 'radioButton', 'checkColor');
                },
                get uncheckBorderColor() {
                    return getThemeColor(grid, 'radioButton', 'uncheckBorderColor');
                },
                get checkBorderColor() {
                    return getThemeColor(grid, 'radioButton', 'checkBorderColor');
                },
                get uncheckBgColor() {
                    return getThemeColor(grid, 'radioButton', 'uncheckBgColor');
                },
                get checkBgColor() {
                    return getThemeColor(grid, 'radioButton', 'checkBgColor');
                }
            }));
    }
    get button() {
        const grid = this._grid;
        return (this._button ||
            (this._button = {
                get color() {
                    return getThemeColor(grid, 'button', 'color');
                },
                get bgColor() {
                    return getThemeColor(grid, 'button', 'bgColor');
                }
            }));
    }
    get header() {
        const grid = this._grid;
        return (this._header ||
            (this._header = {
                get sortArrowColor() {
                    return getThemeColor(grid, 'header', 'sortArrowColor');
                }
            }));
    }
    get messages() {
        const grid = this._grid;
        return (this._messages ||
            (this._messages = {
                get infoBgColor() {
                    return getThemeColor(grid, 'messages', 'infoBgColor');
                },
                get errorBgColor() {
                    return getThemeColor(grid, 'messages', 'errorBgColor');
                },
                get warnBgColor() {
                    return getThemeColor(grid, 'messages', 'warnBgColor');
                }
            }));
    }
}
function strokeRect(ctx, color, left, top, width, height) {
    if (!Array.isArray(color)) {
        if (color) {
            ctx.strokeStyle = color;
            ctx.strokeRect(left, top, width, height);
        }
    }
    else {
        const borderColors = toBoxArray(color);
        _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.strokeColorsRect(ctx, borderColors, left, top, width, height);
    }
}
class GridCanvasHelper {
    _grid;
    _theme;
    constructor(grid) {
        this._grid = grid;
        this._theme = new ThemeResolver(grid);
    }
    createCalculator(context, font) {
        return {
            calcWidth(width) {
                return _internal_calc__WEBPACK_IMPORTED_MODULE_0__.toPx(width, {
                    get full() {
                        const rect = context.getRect();
                        return rect.width;
                    },
                    get em() {
                        return (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.getFontSize)(context.getContext(), font).width;
                    }
                });
            },
            calcHeight(height) {
                return _internal_calc__WEBPACK_IMPORTED_MODULE_0__.toPx(height, {
                    get full() {
                        const rect = context.getRect();
                        return rect.height;
                    },
                    get em() {
                        return (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_5__.getFontSize)(context.getContext(), font).height;
                    }
                });
            }
        };
    }
    getColor(color, col, row, ctx) {
        return getColor(color, col, row, this._grid, ctx);
    }
    toBoxArray(obj) {
        return toBoxArray(obj);
    }
    toBoxPixelArray(value, context, font) {
        if (typeof value === 'string' || Array.isArray(value)) {
            const calculator = this.createCalculator(context, font);
            const box = toBoxArray(value);
            return [calculator.calcHeight(box[0]), calculator.calcWidth(box[1]), calculator.calcHeight(box[2]), calculator.calcWidth(box[3])];
        }
        return toBoxArray(value);
    }
    get theme() {
        return this._theme;
    }
    drawWithClip(context, draw) {
        const drawRect = context.getDrawRect();
        if (!drawRect) {
            return;
        }
        const ctx = context.getContext();
        ctx.save();
        try {
            ctx.beginPath();
            ctx.rect(drawRect.left, drawRect.top, drawRect.width, drawRect.height);
            //clip
            ctx.clip();
            draw(ctx);
        }
        finally {
            ctx.restore();
        }
    }
    drawBorderWithClip(context, draw) {
        const drawRect = context.getDrawRect();
        if (!drawRect) {
            return;
        }
        const rect = context.getRect();
        const ctx = context.getContext();
        ctx.save();
        try {
            //罫線用clip
            ctx.beginPath();
            let clipLeft = drawRect.left;
            let clipWidth = drawRect.width;
            if (drawRect.left === rect.left) {
                clipLeft += -1;
                clipWidth += 1;
            }
            let clipTop = drawRect.top;
            let clipHeight = drawRect.height;
            if (drawRect.top === rect.top) {
                clipTop += -1;
                clipHeight += 1;
            }
            ctx.rect(clipLeft, clipTop, clipWidth, clipHeight);
            ctx.clip();
            draw(ctx);
        }
        finally {
            ctx.restore();
        }
    }
    text(text, context, { padding, offset = 2, color, textAlign = 'left', textBaseline = 'middle', font, textOverflow = 'clip', icons } = {}) {
        let rect = context.getRect();
        const { col, row } = context;
        if (!color) {
            ({ color } = this.theme);
            // header color
            const isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                color = this.theme.frozenRowsColor;
            }
        }
        this.drawWithClip(context, (ctx) => {
            font = getFont(font, context.col, context.row, this._grid, ctx);
            if (padding) {
                const paddingNums = this.toBoxPixelArray(padding, context, font);
                const left = rect.left + paddingNums[3];
                const top = rect.top + paddingNums[0];
                const width = rect.width - paddingNums[1] - paddingNums[3];
                const height = rect.height - paddingNums[0] - paddingNums[2];
                rect = new _internal_Rect__WEBPACK_IMPORTED_MODULE_8__.Rect(left, top, width, height);
            }
            _inlineRect(this._grid, ctx, text, rect, col, row, {
                offset,
                color,
                textAlign,
                textBaseline,
                font,
                textOverflow,
                icons
            });
        });
    }
    multilineText(multilines, context, { padding, offset = 2, color, textAlign = 'left', textBaseline = 'middle', font, lineHeight = '1em', autoWrapText = false, lineClamp = 0, textOverflow = 'clip', icons } = {}) {
        let rect = context.getRect();
        const { col, row } = context;
        if (!color) {
            ({ color } = this.theme);
            // header color
            const isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                color = this.theme.frozenRowsColor;
            }
        }
        this.drawWithClip(context, (ctx) => {
            font = getFont(font, context.col, context.row, this._grid, ctx);
            if (padding) {
                const paddingNums = this.toBoxPixelArray(padding, context, font);
                const left = rect.left + paddingNums[3];
                const top = rect.top + paddingNums[0];
                const width = rect.width - paddingNums[1] - paddingNums[3];
                const height = rect.height - paddingNums[0] - paddingNums[2];
                rect = new _internal_Rect__WEBPACK_IMPORTED_MODULE_8__.Rect(left, top, width, height);
            }
            const calculator = this.createCalculator(context, font);
            lineHeight = calculator.calcHeight(lineHeight);
            _multiInlineRect(this._grid, ctx, multilines, rect, col, row, {
                offset,
                color,
                textAlign,
                textBaseline,
                font,
                lineHeight,
                autoWrapText,
                lineClamp,
                textOverflow,
                icons
            });
        });
    }
    fillText(text, x, y, context, { color, textAlign = 'left', textBaseline = 'top', font } = {}) {
        const { col, row } = context;
        if (!color) {
            ({ color } = this.theme);
            // header color
            const isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                color = this.theme.frozenRowsColor;
            }
        }
        const ctx = context.getContext();
        ctx.save();
        try {
            font = getFont(font, context.col, context.row, this._grid, ctx);
            ctx.fillStyle = getColor(color, col, row, this._grid, ctx);
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            ctx.font = font || ctx.font;
            ctx.fillText(text, x, y);
        }
        finally {
            ctx.restore();
        }
    }
    fillCell(context, { fillColor = this.theme.defaultBgColor } = {}) {
        const rect = context.getRect();
        this.drawWithClip(context, (ctx) => {
            const { col, row } = context;
            ctx.fillStyle = getColor(fillColor, col, row, this._grid, ctx);
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            ctx.fill();
        });
    }
    fillCellWithState(context, option = {}) {
        option.fillColor = this.getFillColorState(context, option);
        this.fillCell(context, option);
    }
    fillRect(rect, context, { fillColor = this.theme.defaultBgColor } = {}) {
        const ctx = context.getContext();
        ctx.save();
        try {
            const { col, row } = context;
            ctx.fillStyle = getColor(fillColor, col, row, this._grid, ctx);
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            ctx.fill();
        }
        finally {
            ctx.restore();
        }
    }
    fillRectWithState(rect, context, option = {}) {
        option.fillColor = this.getFillColorState(context, option);
        this.fillRect(rect, context, option);
    }
    getFillColorState(context, option = {}) {
        const sel = context.getSelection();
        const { col, row } = context;
        if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.cellEquals)(sel.select, context) && (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.cellInRange)(sel.range, col, row)) {
            return this.theme.selectionBgColor;
        }
        if (option.fillColor) {
            return option.fillColor;
        }
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.cellEquals)(sel.select, context)) {
            return this.theme.highlightBgColor;
        }
        const isFrozenCell = this._grid.isFrozenCell(col, row);
        if (isFrozenCell && isFrozenCell.row) {
            return this.theme.frozenRowsBgColor;
        }
        return this.theme.defaultBgColor;
    }
    border(context, { borderColor = this.theme.borderColor, lineWidth = 1 } = {}) {
        const rect = context.getRect();
        this.drawBorderWithClip(context, (ctx) => {
            const { col, row } = context;
            const borderColors = getColor(borderColor, col, row, this._grid, ctx);
            if (lineWidth === 1) {
                ctx.lineWidth = 1;
                strokeRect(ctx, borderColors, rect.left - 0.5, rect.top - 0.5, rect.width, rect.height);
            }
            else if (lineWidth === 2) {
                ctx.lineWidth = 2;
                strokeRect(ctx, borderColors, rect.left, rect.top, rect.width - 1, rect.height - 1);
            }
            else {
                ctx.lineWidth = lineWidth;
                const startOffset = lineWidth / 2 - 1;
                strokeRect(ctx, borderColors, rect.left + startOffset, rect.top + startOffset, rect.width - lineWidth + 1, rect.height - lineWidth + 1);
            }
        });
    }
    // Unused in main
    borderWithState(context, option = {}) {
        const rect = context.getRect();
        const sel = context.getSelection();
        const { col, row } = context;
        //罫線
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.cellEquals)(sel.select, context)) {
            option.borderColor = this.theme.highlightBorderColor;
            option.lineWidth = 2;
            this.border(context, option);
        }
        else {
            // header color
            const isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell?.row) {
                option.borderColor = this.theme.frozenRowsBorderColor;
            }
            option.lineWidth = 1;
            this.border(context, option);
            //追加処理
            const sel = this._grid.selection.select;
            if (sel.col + 1 === col && sel.row === row) {
                //右が選択されている
                this.drawBorderWithClip(context, (ctx) => {
                    const borderColors = toBoxArray(getColor(this.theme.highlightBorderColor, sel.col, sel.row, this._grid, ctx));
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(rect.left - 0.5, rect.top);
                    ctx.lineTo(rect.left - 0.5, rect.bottom);
                    ctx.stroke();
                });
            }
            else if (sel.col === col && sel.row + 1 === row) {
                //上が選択されている
                this.drawBorderWithClip(context, (ctx) => {
                    const borderColors = toBoxArray(getColor(this.theme.highlightBorderColor, sel.col, sel.row, this._grid, ctx));
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(rect.left, rect.top - 0.5);
                    ctx.lineTo(rect.right, rect.top - 0.5);
                    ctx.stroke();
                });
            }
        }
    }
    buildCheckBoxInline(check, context, option = {}) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const ctx = context.getContext();
        const boxWidth = _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.measureCheckbox(ctx).width;
        return new _element_InlineDrawer__WEBPACK_IMPORTED_MODULE_7__.InlineDrawer({
            draw,
            width: boxWidth + 3,
            height: boxWidth + 1,
            color: undefined
        });
        function draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
            const { col, row } = context;
            drawCheckbox(ctx, rect, col, row, check, self, option, {
                offset: offset + 1,
                padding: {
                    left: offsetLeft + 1,
                    right: offsetRight,
                    top: offsetTop,
                    bottom: offsetBottom
                }
            });
        }
    }
    checkbox(check, context, option = {}) {
        this.drawWithClip(context, (ctx) => {
            const { col, row } = context;
            drawCheckbox(ctx, context.getRect(), col, row, check, this, option);
        });
    }
    radioButton(check, context, option = {}) {
        this.drawWithClip(context, (ctx) => {
            const { col, row } = context;
            drawRadioButton(ctx, context.getRect(), col, row, check, this, option);
        });
    }
    button(caption, context, { bgColor = this.theme.button.bgColor, padding, offset = 2, color = this.theme.button.color, textAlign = 'center', textBaseline = 'middle', shadow, font, textOverflow = 'clip', icons } = {}) {
        const rect = context.getRect();
        this.drawWithClip(context, (ctx) => {
            font = getFont(font, context.col, context.row, this._grid, ctx);
            const { col, row } = context;
            const paddingNums = this.toBoxPixelArray(padding || rect.height / 8, context, font);
            const left = rect.left + paddingNums[3];
            const top = rect.top + paddingNums[0];
            const width = rect.width - paddingNums[1] - paddingNums[3];
            const height = rect.height - paddingNums[0] - paddingNums[2];
            bgColor = getColor(bgColor, context.col, context.row, this._grid, ctx);
            _tools_canvashelper__WEBPACK_IMPORTED_MODULE_1__.drawButton(ctx, left, top, width, height, {
                bgColor,
                radius: rect.height / 8,
                // offset,
                shadow
            });
            _inlineRect(this._grid, ctx, caption, new _internal_Rect__WEBPACK_IMPORTED_MODULE_8__.Rect(left, top, width, height), col, row, {
                offset,
                color,
                textAlign,
                textBaseline,
                font,
                textOverflow,
                icons
            });
        });
    }
    testFontLoad(font, value, context) {
        return testFontLoad(font, value, context, this._grid);
    }
}


/***/ }),

/***/ "./src/ListGrid.ts":
/*!*************************!*\
  !*** ./src/ListGrid.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListGrid": () => (/* binding */ ListGrid)
/* harmony export */ });
/* harmony import */ var _internal_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/icons */ "./src/internal/icons.ts");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes */ "./src/themes.ts");
/* harmony import */ var _data_CachedDataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/CachedDataSource */ "./src/data/CachedDataSource.ts");
/* harmony import */ var _data_DataSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/DataSource */ "./src/data/DataSource.ts");
/* harmony import */ var _list_grid_layout_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list-grid/layout-map */ "./src/list-grid/layout-map/index.ts");
/* harmony import */ var _columns_message_MessageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./columns/message/MessageHandler */ "./src/columns/message/MessageHandler.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _columns_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./columns/style */ "./src/columns/style.ts");
/* harmony import */ var _core_DrawGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/DrawGrid */ "./src/core/DrawGrid.ts");
/* harmony import */ var _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GridCanvasHelper */ "./src/GridCanvasHelper.ts");
/* harmony import */ var _header_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./header/style */ "./src/header/style.ts");
/* harmony import */ var _list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./list-grid/LG_EVENT_TYPE */ "./src/list-grid/LG_EVENT_TYPE.ts");
/* harmony import */ var _internal_Rect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./internal/Rect */ "./src/internal/Rect.ts");
/* harmony import */ var _tooltip_TooltipHandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tooltip/TooltipHandler */ "./src/tooltip/TooltipHandler.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_paste_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./internal/paste-utils */ "./src/internal/paste-utils.ts");
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./internal/EventHandler */ "./src/internal/EventHandler.ts");


// import { CachedDataSource, DataSource } from './data'












//protected symbol



const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_14__.getProtectedSymbol)();
function _getCellRange(grid, col, row) {
    return grid[_].layoutMap.getCellRange(col, row);
}
function _updateRect(grid, col, row, context) {
    context.setRectFilter((rect) => {
        let { left, right, top, bottom } = rect;
        const { start: { col: startCol, row: startRow }, end: { col: endCol, row: endRow } } = _getCellRange(grid, col, row);
        for (let c = col - 1; c >= startCol; c--) {
            left -= grid.getColWidth(c);
        }
        for (let c = col + 1; c <= endCol; c++) {
            right += grid.getColWidth(c);
        }
        for (let r = row - 1; r >= startRow; r--) {
            top -= grid.getRowHeight(r);
        }
        for (let r = row + 1; r <= endRow; r++) {
            bottom += grid.getRowHeight(r);
        }
        return _internal_Rect__WEBPACK_IMPORTED_MODULE_12__.Rect.bounds(left, top, right, bottom);
    });
}
function _getCellValue(grid, col, row) {
    if (row < grid[_].layoutMap.headerRowCount) {
        const { caption } = grid[_].layoutMap.getHeader(col, row);
        return typeof caption === 'function' ? caption() : caption;
    }
    else {
        const { field } = grid[_].layoutMap.getBody(col, row);
        return _getField(grid, field, row);
    }
}
function _setCellValue(grid, col, row, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
value) {
    if (row < grid[_].layoutMap.headerRowCount) {
        // nop
        return false;
    }
    else {
        const { field } = grid[_].layoutMap.getBody(col, row);
        if (field == null) {
            return false;
        }
        const index = _getRecordIndexByRow(grid, row);
        return grid[_].dataSource.setField(index, field, value);
    }
}
function _getCellMessage(grid, col, row) {
    if (row < grid[_].layoutMap.headerRowCount) {
        return null;
    }
    else {
        const { message } = grid[_].layoutMap.getBody(col, row);
        if (!message) {
            return null;
        }
        if (!Array.isArray(message)) {
            return _getField(grid, message, row);
        }
        const promises = [];
        for (let index = 0; index < message.length; index++) {
            const msg = _getField(grid, message[index], row);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.isPromise)(msg)) {
                promises.push(msg);
            }
            else if ((0,_columns_message_MessageHandler__WEBPACK_IMPORTED_MODULE_5__.hasMessage)(msg)) {
                return msg;
            }
        }
        if (!promises.length) {
            return null;
        }
        return new Promise((resolve, reject) => {
            promises.forEach((p) => {
                p.then((msg) => {
                    if ((0,_columns_message_MessageHandler__WEBPACK_IMPORTED_MODULE_5__.hasMessage)(msg)) {
                        resolve(msg);
                    }
                }, reject);
            });
        });
    }
}
function _getCellIcon0(grid, icon, row) {
    if (Array.isArray(icon)) {
        return icon.map((i) => _getCellIcon0(grid, i, row));
    }
    if (!_internal_utils__WEBPACK_IMPORTED_MODULE_6__.obj.isObject(icon) || typeof icon === 'function') {
        return _getField(grid, icon, row);
    }
    const retIcon = {};
    const iconOpt = icon;
    _internal_icons__WEBPACK_IMPORTED_MODULE_0__.iconPropKeys.forEach((k) => {
        if (iconOpt[k]) {
            const f = _getField(grid, iconOpt[k], row);
            if (f != null) {
                retIcon[k] = f;
            }
            else {
                if (!_hasField(grid, iconOpt[k], row)) {
                    retIcon[k] = iconOpt[k];
                }
            }
        }
    });
    return retIcon;
}
function _getCellIcon(grid, col, row) {
    const { icon } = grid[_].layoutMap.getBody(col, row);
    if (icon == null) {
        return null;
    }
    return _getCellIcon0(grid, icon, row);
}
function _getField(grid, field, row) {
    if (field == null) {
        return null;
    }
    if (row < grid[_].layoutMap.headerRowCount) {
        return null;
    }
    else {
        const index = _getRecordIndexByRow(grid, row);
        return grid[_].dataSource.getField(index, field);
    }
}
function _hasField(grid, field, row) {
    if (field == null) {
        return false;
    }
    if (row < grid[_].layoutMap.headerRowCount) {
        return false;
    }
    else {
        const index = _getRecordIndexByRow(grid, row);
        return grid[_].dataSource.hasField(index, field);
    }
}
function _onDrawValue(grid, cellValue, context, { col, row }, style, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
draw) {
    const helper = grid[_].gridCanvasHelper;
    const drawCellBg = ({ bgColor } = {}) => {
        const fillOpt = {
            fillColor: bgColor
        };
        //cell全体を描画
        helper.fillCellWithState(context, fillOpt);
    };
    const drawCellBorder = () => {
        if (context.col === grid.frozenColCount - 1) {
            //固定列罫線
            const rect = context.getRect();
            helper.drawWithClip(context, (ctx) => {
                const borderColor = context.row >= grid.frozenRowCount ? helper.theme.borderColor : helper.theme.frozenRowsBorderColor;
                const borderColors = helper.toBoxArray(helper.getColor(borderColor, context.col, context.row, ctx));
                if (borderColors[1]) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[1];
                    ctx.beginPath();
                    ctx.moveTo(rect.right - 2.5, rect.top);
                    ctx.lineTo(rect.right - 2.5, rect.bottom);
                    ctx.stroke();
                }
            });
        }
        _borderWithState(grid, helper, context);
    };
    const drawCellBase = ({ bgColor } = {}) => {
        drawCellBg({ bgColor });
        drawCellBorder();
    };
    const info = {
        getRecord: () => grid.getRowRecord(row),
        getIcon: () => _getCellIcon(grid, col, row),
        getMessage: () => _getCellMessage(grid, col, row),
        messageHandler: grid[_].messageHandler,
        style,
        drawCellBase,
        drawCellBg,
        drawCellBorder,
        getCell() {
            return {
                col,
                row
            };
        }
    };
    return draw(cellValue, info, context, grid);
}
function _borderWithState(grid, helper, context) {
    const { col, row } = context;
    const sel = grid.selection.select;
    const { layoutMap } = grid[_];
    const rect = context.getRect();
    const option = {};
    const selRecordIndex = layoutMap.getRecordIndexByRow(sel.row);
    const selId = layoutMap.getCellId(sel.col, sel.row);
    function isSelectCell(col, row) {
        if (col === sel.col && row === sel.row) {
            return true;
        }
        return selId != null && layoutMap.getCellId(col, row) === selId && layoutMap.getRecordIndexByRow(row) === selRecordIndex;
    }
    // line
    // 选择单个单元格
    if (isSelectCell(col, row)) {
        option.borderColor = helper.theme.highlightBorderColor;
        option.lineWidth = 2;
        helper.border(context, option);
    }
    else {
        // 平台单元格
        option.lineWidth = 1;
        // header color
        const isFrozenCell = grid.isFrozenCell(col, row);
        if (isFrozenCell?.row) {
            option.borderColor = helper.theme.frozenRowsBorderColor;
        }
        helper.border(context, option);
        // 追加处理
        if (col > 0 && isSelectCell(col - 1, row)) {
            // 单元格右侧
            helper.drawBorderWithClip(context, (ctx) => {
                const borderColors = helper.toBoxArray(helper.getColor(helper.theme.highlightBorderColor, sel.col, sel.row, ctx));
                if (borderColors[1]) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[1];
                    ctx.beginPath();
                    ctx.moveTo(rect.left - 0.5, rect.top);
                    ctx.lineTo(rect.left - 0.5, rect.bottom);
                    ctx.stroke();
                }
            });
        }
        else if (row > 0 && isSelectCell(col, row - 1)) {
            //单元格下面
            helper.drawBorderWithClip(context, (ctx) => {
                const borderColors = helper.toBoxArray(helper.getColor(helper.theme.highlightBorderColor, sel.col, sel.row, ctx));
                if (borderColors[0]) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[0];
                    ctx.beginPath();
                    ctx.moveTo(rect.left, rect.top - 0.5);
                    ctx.lineTo(rect.right, rect.top - 0.5);
                    ctx.stroke();
                }
            });
        }
    }
}
/**
 * 刷新表格头部
 * @param grid
 */
function _refreshHeader(grid) {
    const protectedSpace = grid[_];
    if (protectedSpace.headerEvents) {
        protectedSpace.headerEvents.forEach((id) => grid.unlisten(id));
    }
    const headerEvents = (grid[_].headerEvents = []);
    headerEvents.forEach((id) => grid.unlisten(id));
    let layoutMap;
    if (protectedSpace.layout && (!Array.isArray(protectedSpace.layout) || protectedSpace.layout.length > 0)) {
        layoutMap = protectedSpace.layoutMap = new _list_grid_layout_map__WEBPACK_IMPORTED_MODULE_4__.MultiLayoutMap(protectedSpace.layout);
    }
    else {
        layoutMap = protectedSpace.layoutMap = new _list_grid_layout_map__WEBPACK_IMPORTED_MODULE_4__.SimpleHeaderLayoutMap(protectedSpace.header ?? []);
    }
    layoutMap.headerObjects.forEach((cell) => {
        const ids = cell.headerType.bindGridEvent(grid, cell.id);
        headerEvents.push(...ids);
        if (cell.style) {
            if (cell.style instanceof _header_style__WEBPACK_IMPORTED_MODULE_10__.BaseStyle) {
                const id = cell.style.listen(_header_style__WEBPACK_IMPORTED_MODULE_10__.BaseStyle.EVENT_TYPE.CHANGE_STYLE, () => {
                    grid.invalidate();
                });
                headerEvents.push(id);
            }
        }
        if (cell.action) {
            const ids = cell.action.bindGridEvent(grid, cell.id);
            headerEvents.push(...ids);
        }
    });
    layoutMap.columnObjects.forEach((col) => {
        if (col.action) {
            const ids = col.action.bindGridEvent(grid, col.id);
            headerEvents.push(...ids);
        }
        if (col.columnType) {
            const ids = col.columnType.bindGridEvent(grid, col.id);
            headerEvents.push(...ids);
        }
        if (col.style) {
            if (col.style instanceof _columns_style__WEBPACK_IMPORTED_MODULE_7__.BaseStyle) {
                const id = col.style.listen(_columns_style__WEBPACK_IMPORTED_MODULE_7__.BaseStyle.EVENT_TYPE.CHANGE_STYLE, () => {
                    grid.invalidate();
                });
                headerEvents.push(id);
            }
        }
    });
    for (let col = 0; col < layoutMap.columnWidths.length; col++) {
        const column = layoutMap.columnWidths[col];
        const { width, minWidth, maxWidth } = column;
        if (width && (width > 0 || typeof width === 'string')) {
            grid.setColWidth(col, width);
        }
        if (minWidth && (minWidth > 0 || typeof minWidth === 'string')) {
            grid.setMinColWidth(col, minWidth);
        }
        if (maxWidth && (maxWidth > 0 || typeof maxWidth === 'string')) {
            grid.setMaxColWidth(col, maxWidth);
        }
    }
    const { headerRowHeight } = grid[_];
    for (let row = 0; row < layoutMap.headerRowCount; row++) {
        const height = Array.isArray(headerRowHeight) ? headerRowHeight[row] : headerRowHeight;
        if (height && height > 0) {
            grid.setRowHeight(row, height);
        }
    }
    grid.colCount = layoutMap.colCount;
    _refreshRowCount(grid);
    grid.frozenRowCount = layoutMap.headerRowCount;
}
function _refreshRowCount(grid) {
    const { layoutMap } = grid[_];
    grid.rowCount = grid[_].dataSource.length * layoutMap.bodyRowCount + layoutMap.headerRowCount;
}
function _tryWithUpdateDataSource(grid, fn) {
    const { dataSourceEventIds } = grid[_];
    if (dataSourceEventIds) {
        dataSourceEventIds.forEach((id) => grid[_].handler.off(id));
    }
    fn(grid);
    grid[_].dataSourceEventIds = [
        grid[_].handler.on(grid[_].dataSource, _data_DataSource__WEBPACK_IMPORTED_MODULE_3__.DataSource.EVENT_TYPE.UPDATED_LENGTH, () => {
            _refreshRowCount(grid);
            grid.invalidate();
        }),
        grid[_].handler.on(grid[_].dataSource, _data_DataSource__WEBPACK_IMPORTED_MODULE_3__.DataSource.EVENT_TYPE.UPDATED_ORDER, () => {
            grid.invalidate();
        })
    ];
}
function _setRecords(grid, records = []) {
    _tryWithUpdateDataSource(grid, () => {
        grid[_].records = records;
        const newDataSource = (grid[_].dataSource = _data_CachedDataSource__WEBPACK_IMPORTED_MODULE_2__.CachedDataSource.ofArray(records));
        grid.addDisposable(newDataSource);
    });
}
function _setDataSource(grid, dataSource) {
    _tryWithUpdateDataSource(grid, () => {
        if (dataSource) {
            if (dataSource instanceof _data_DataSource__WEBPACK_IMPORTED_MODULE_3__.DataSource) {
                grid[_].dataSource = dataSource;
            }
            else {
                const newDataSource = (grid[_].dataSource = new _data_CachedDataSource__WEBPACK_IMPORTED_MODULE_2__.CachedDataSource(dataSource));
                grid.addDisposable(newDataSource);
            }
        }
        else {
            grid[_].dataSource = _data_DataSource__WEBPACK_IMPORTED_MODULE_3__.DataSource.EMPTY;
        }
        grid[_].records = null;
    });
}
function _getRecordIndexByRow(grid, row) {
    const { layoutMap } = grid[_];
    return layoutMap.getRecordIndexByRow(row);
}
function _onRangePaste(text, test = () => true) {
    const { layoutMap } = this[_];
    const selectionRange = this.selection.range;
    const { start } = this.getCellRange(selectionRange.start.col, selectionRange.start.row);
    const { end } = this.getCellRange(selectionRange.end.col, selectionRange.end.row);
    const values = (0,_internal_paste_utils__WEBPACK_IMPORTED_MODULE_15__.parsePasteRangeBoxValues)(text);
    const pasteRowCount = Math.min(Math.max(end.row - start.row + 1, values.rowCount), this.rowCount - start.row);
    const pasteColCount = Math.min(Math.max(end.col - start.col + 1, values.colCount), this.colCount - start.col);
    let hasEditable = false;
    const actionColumnsBox = [];
    for (let bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
        const actionColumnsRow = [];
        actionColumnsBox.push(actionColumnsRow);
        for (let offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
            const body = layoutMap.getBody(start.col + offsetCol, bodyRow + layoutMap.headerRowCount);
            actionColumnsRow[offsetCol] = body;
            if (!hasEditable && body.action?.editable) {
                hasEditable = true;
            }
        }
    }
    if (!hasEditable) {
        return;
    }
    const startRow = layoutMap.getRecordStartRowByRecordIndex(layoutMap.getRecordIndexByRow(start.row));
    const startRowOffset = start.row - startRow;
    let duplicate = {};
    let actionRow = startRowOffset;
    let valuesRow = 0;
    for (let offsetRow = 0; offsetRow < pasteRowCount; offsetRow++) {
        let valuesCol = 0;
        for (let offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
            const { action, id } = actionColumnsBox[actionRow][offsetCol];
            if (!duplicate[id] && action?.editable) {
                duplicate[id] = true;
                const col = start.col + offsetCol;
                const row = start.row + offsetRow;
                const cellValue = values.getCellValue(valuesCol, valuesRow);
                (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.then)(this.getRowRecord(row), (record) => {
                    (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.then)(_getCellValue(this, col, row), (oldValue) => {
                        if (test({
                            grid: this,
                            record: record,
                            col,
                            row,
                            value: cellValue,
                            oldValue
                        })) {
                            action.onPasteCellRangeBox(this, { col, row }, cellValue);
                        }
                    });
                });
            }
            valuesCol++;
            if (valuesCol >= values.colCount) {
                valuesCol = 0;
            }
        }
        actionRow++;
        if (actionRow >= layoutMap.bodyRowCount) {
            actionRow = 0;
            duplicate = {};
        }
        valuesRow++;
        if (valuesRow >= values.rowCount) {
            valuesRow = 0;
        }
    }
    const newEnd = {
        col: start.col + pasteColCount - 1,
        row: start.row + pasteRowCount - 1
    };
    this.selection.range = {
        start,
        end: newEnd
    };
    this.invalidateCellRange(this.selection.range);
}
function _onRangeDelete() {
    const { layoutMap } = this[_];
    const selectionRange = this.selection.range;
    const { start } = this.getCellRange(selectionRange.start.col, selectionRange.start.row);
    const { end } = this.getCellRange(selectionRange.end.col, selectionRange.end.row);
    const deleteRowCount = Math.min(end.row - start.row + 1, this.rowCount - start.row);
    const deleteColCount = Math.min(end.col - start.col + 1, this.colCount - start.col);
    let hasEditable = false;
    const actionColumnsBox = [];
    for (let bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
        const actionColumnsRow = [];
        actionColumnsBox.push(actionColumnsRow);
        for (let offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
            const body = layoutMap.getBody(start.col + offsetCol, bodyRow + layoutMap.headerRowCount);
            actionColumnsRow[offsetCol] = body;
            if (!hasEditable && body.action?.editable) {
                hasEditable = true;
            }
        }
    }
    if (!hasEditable) {
        return;
    }
    const startRow = layoutMap.getRecordStartRowByRecordIndex(layoutMap.getRecordIndexByRow(start.row));
    const startRowOffset = start.row - startRow;
    let duplicate = {};
    let actionRow = startRowOffset;
    for (let offsetRow = 0; offsetRow < deleteRowCount; offsetRow++) {
        for (let offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
            const { action, id } = actionColumnsBox[actionRow][offsetCol];
            if (!duplicate[id] && action?.editable) {
                duplicate[id] = true;
                const col = start.col + offsetCol;
                const row = start.row + offsetRow;
                (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.then)(this.getRowRecord(row), (_record) => {
                    (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.then)(_getCellValue(this, col, row), (_oldValue) => {
                        action.onDeleteCellRangeBox(this, { col, row });
                    });
                });
            }
        }
        actionRow++;
        if (actionRow >= layoutMap.bodyRowCount) {
            actionRow = 0;
            duplicate = {};
        }
    }
    this.invalidateCellRange(selectionRange);
}
// export { HeadersDefine, ColumnDefine, HeaderDefine, GroupHeaderDefine }
/**
 * ListGrid
 */
class ListGrid extends _core_DrawGrid__WEBPACK_IMPORTED_MODULE_8__.DrawGrid {
    [_];
    disabled = false;
    readOnly = false;
    static get EVENT_TYPE() {
        return _list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE;
    }
    constructor(options = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.omit)(options, ['colCount', 'rowCount', 'frozenRowCount']));
        this[_] = {};
        const protectedSpace = this[_];
        protectedSpace.disabled = options.disabled || false;
        protectedSpace.readonly = options.readonly || false;
        protectedSpace.header = options.header || [];
        protectedSpace.layout = options.layout || [];
        protectedSpace.headerRowHeight = options.headerRowHeight || [];
        protectedSpace.hiddenHeader = !!options.hiddenHeader;
        protectedSpace.handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_16__.EventHandler();
        protectedSpace.sortState = {
            col: -1,
            row: -1,
            order: undefined
        };
        protectedSpace.gridCanvasHelper = new _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_9__.GridCanvasHelper(this);
        protectedSpace.theme = _themes__WEBPACK_IMPORTED_MODULE_1__.of(options.theme);
        protectedSpace.messageHandler = new _columns_message_MessageHandler__WEBPACK_IMPORTED_MODULE_5__.MessageHandler(this, (col, row) => _getCellMessage(this, col, row));
        protectedSpace.tooltipHandler = new _tooltip_TooltipHandler__WEBPACK_IMPORTED_MODULE_13__.TooltipHandler(this);
        if (options.dataSource) {
            _setDataSource(this, options.dataSource);
        }
        else {
            _setRecords(this, options.records);
        }
        protectedSpace.allowRangePaste = options.allowRangePaste ?? false;
        _refreshHeader(this);
        this.invalidate();
        protectedSpace.handler.on(window, 'resize', () => this.resize());
    }
    /**
     * Dispose the grid instance.
     * @returns {void}
     */
    dispose() {
        const protectedSpace = this[_];
        protectedSpace.messageHandler.dispose();
        protectedSpace.tooltipHandler.dispose();
        super.dispose();
    }
    /**
     * Gets the define of the header.
     */
    get header() {
        return this[_].header;
    }
    /**
     * Sets the define of the header with the given data.
     * <pre>
     * column options
     * -----
     * caption: header caption
     * field: field name
     * width: column width
     * minWidth: column min width
     * maxWidth: column max width
     * icon: icon name
     * message: message key name
     * columnType: column type
     * action: column action
     * style: column style
     * headerType: header type
     * headerStyle: header style
     * headerAction: header action
     * headerField: header field name
     * sort: define sort setting
     * -----
     *
     * multiline header
     * -----
     * caption: header caption
     * columns: columns define
     * -----
     * </pre>
     */
    set header(header) {
        this[_].header = header;
        _refreshHeader(this);
    }
    /**
     * Gets the define of the layout.
     */
    get layout() {
        return this[_].layout;
    }
    /**
     * Sets the define of the layout with the given data.
     */
    set layout(layout) {
        this[_].layout = layout;
        _refreshHeader(this);
    }
    /**
     * Get the row count per record
     */
    get recordRowCount() {
        return this[_].layoutMap.bodyRowCount;
    }
    /**
     * Get the records.
     */
    get records() {
        return this[_].records || null;
    }
    /**
     * Set the records from given
     */
    set records(records) {
        if (records == null) {
            return;
        }
        _setRecords(this, records);
        _refreshRowCount(this);
        this.invalidate();
    }
    /**
     * Get the data source.
     */
    get dataSource() {
        return this[_].dataSource;
    }
    /**
     * Set the data source from given
     */
    set dataSource(dataSource) {
        _setDataSource(this, dataSource);
        _refreshRowCount(this);
        this.invalidate();
    }
    /**
     * Get the theme.
     */
    get theme() {
        return this[_].theme;
    }
    /**
     * Set the theme from given
     */
    set theme(theme) {
        this[_].theme = _themes__WEBPACK_IMPORTED_MODULE_1__.of(theme);
        this.invalidate();
    }
    /**
     * If set to true to allow pasting of ranges.
     */
    get allowRangePaste() {
        return this[_].allowRangePaste;
    }
    set allowRangePaste(allowRangePaste) {
        this[_].allowRangePaste = allowRangePaste;
    }
    /**
     * Get the font definition as a string.
     * @override
     */
    get font() {
        // return super.font || this[_].gridCanvasHelper.theme.font
        return '';
    }
    /**
     * Set the font definition with the given string.
     * @override
     */
    set font(font) {
        // super.font = font
    }
    /**
     * Get the background color of the underlay.
     * @override
     */
    get underlayBackgroundColor() {
        return 'transparent';
        // return (
        //       super.underlayBackgroundColor ||
        //       this[_].gridCanvasHelper.theme.underlayBackgroundColor
        //   )
    }
    /**
     * Set the background color of the underlay.
     * @override
     */
    set underlayBackgroundColor(underlayBackgroundColor) {
        // super.underlayBackgroundColor = underlayBackgroundColor
    }
    /**
     * Get the sort state.
     */
    get sortState() {
        return this[_].sortState;
    }
    /**
     * Sets the sort state.
     * If `null` to set, the sort state is initialized.
     */
    set sortState(sortState) {
        const oldState = this.sortState;
        let oldField;
        if (oldState.col >= 0 && oldState.row >= 0) {
            oldField = this.getHeaderField(oldState.col, oldState.row);
        }
        const newState = (this[_].sortState =
            sortState != null
                ? sortState
                : {
                    col: -1,
                    row: -1,
                    order: undefined
                });
        let newField;
        if (newState.col >= 0 && newState.row >= 0) {
            newField = this.getHeaderField(newState.col, newState.row);
        }
        // bind header value
        if (oldField != null && oldField !== newField) {
            this.setHeaderValue(oldState.col, oldState.row, undefined);
        }
        if (newField != null) {
            this.setHeaderValue(newState.col, newState.row, newState.order);
        }
    }
    /**
     * Get the header values.
     */
    get headerValues() {
        return this[_].headerValues || (this[_].headerValues = new Map());
    }
    /**
     * Sets the header values.
     */
    set headerValues(headerValues) {
        this[_].headerValues = headerValues || new Map();
    }
    /**
     * Get the field of the given column index.
     * @param  {number} col The column index.
     * @param  {number} row The row index.
     * @return {*} The field object.
     */
    getField(col, row) {
        return this[_].layoutMap.getBody(col, row ?? this[_].layoutMap.headerRowCount).field;
    }
    /**
     * Get the column define of the given column index.
     * @param  {number} col The column index.
     * @param  {number} row The row index.
     * @return {*} The column define object.
     */
    getColumnDefine(col, row) {
        return this[_].layoutMap.getBody(col, row ?? this[_].layoutMap.headerRowCount).define;
    }
    getColumnType(col, row) {
        return this[_].layoutMap.getBody(col, row).columnType;
    }
    /**
     * Get the header field of the given header cell.
     * @param  {number} col The column index.
     * @param  {number} row The header row index.
     * @return {*} The field object.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getHeaderField(col, row) {
        const hd = this[_].layoutMap.getHeader(col, row);
        return hd.field;
    }
    /**
     * Get the header define of the given header cell.
     * @param  {number} col The column index.
     * @param  {number} row The header row index.
     * @return {*} The header define object.
     */
    getHeaderDefine(col, row) {
        const hd = this[_].layoutMap.getHeader(col, row);
        return hd.define;
    }
    /**
     * Get the record of the given row index.
     * @param  {number} row The row index.
     * @return {object} The record.
     */
    getRowRecord(row) {
        if (row < this[_].layoutMap.headerRowCount) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return undefined;
        }
        else {
            return this[_].dataSource.get(_getRecordIndexByRow(this, row));
        }
    }
    /**
     * Get the record index of the given row index.
     * @param  {number} row The row index.
     */
    getRecordIndexByRow(row) {
        return _getRecordIndexByRow(this, row);
    }
    /**
     * Gets the row index starting at the given record index.
     * @param  {number} index The record index.
     */
    getRecordStartRowByRecordIndex(index) {
        return this[_].layoutMap.getRecordStartRowByRecordIndex(index);
    }
    /**
     * Get the column index of the given field.
     * @param  {*} field The field.
     * @return {number} The column index.
     * @deprecated use `getCellRangeByField` instead
     */
    getColumnIndexByField(field) {
        const range = this.getCellRangeByField(field, 0);
        return range?.start.col ?? null;
    }
    /**
     * Get the column index of the given field.
     * @param  {*} field The field.
     * @param  {number} index The record index
     * @return {number} The column index.
     */
    getCellRangeByField(field, index) {
        const { layoutMap } = this[_];
        const colObj = layoutMap.columnObjects.find((col) => col.field === field);
        if (colObj) {
            const layoutRange = layoutMap.getBodyLayoutRangeById(colObj.id);
            const startRow = layoutMap.getRecordStartRowByRecordIndex(index);
            return {
                start: {
                    col: layoutRange.start.col,
                    row: startRow + layoutRange.start.row
                },
                end: {
                    col: layoutRange.end.col,
                    row: startRow + layoutRange.end.row
                }
            };
        }
        return null;
    }
    /**
     * Focus the cell.
     * @param  {*} field The field.
     * @param  {number} index The record index
     * @return {void}
     */
    focusGridCell(field, index) {
        const { start: { col: startCol, row: startRow }, end: { col: endCol, row: endRow } } = this.selection.range;
        const newFocus = this.getCellRangeByField(field, index)?.start;
        if (newFocus == null) {
            return;
        }
        this.focusCell(newFocus.col, newFocus.row);
        this.selection.select = newFocus;
        this.invalidateGridRect(startCol, startRow, endCol, endRow);
        this.invalidateCell(newFocus.col, newFocus.row);
    }
    /**
     * Scroll to where cell is visible.
     * @param  {*} field The field.
     * @param  {number} index The record index
     * @return {void}
     */
    makeVisibleGridCell(field, index) {
        const cell = this.getCellRangeByField(field, index)?.start;
        this.makeVisibleCell(cell?.col ?? 0, cell?.row ?? this[_].layoutMap.headerRowCount);
    }
    getGridCanvasHelper() {
        return this[_].gridCanvasHelper;
    }
    /**
     * Get cell range information for a given cell.
     * @param {number} col column index of the cell
     * @param {number} row row index of the cell
     * @returns {object} cell range info
     */
    getCellRange(col, row) {
        return _getCellRange(this, col, row);
    }
    /**
     * Get header range information for a given cell.
     * @param {number} col column index of the cell
     * @param {number} row row index of the cell
     * @returns {object} cell range info
     * @deprecated use `getCellRange` instead
     */
    getHeaderCellRange(col, row) {
        return this.getCellRange(col, row);
    }
    getCopyCellValue(col, row, range) {
        const cellRange = _getCellRange(this, col, row);
        const startCol = range ? Math.max(range.start.col, cellRange.start.col) : cellRange.start.col;
        const startRow = range ? Math.max(range.start.row, cellRange.start.row) : cellRange.start.row;
        if (startCol !== col || startRow !== row) {
            return '';
        }
        const value = _getCellValue(this, col, row);
        if (row < this[_].layoutMap.headerRowCount) {
            return value;
        }
        const columnData = this[_].layoutMap.getBody(col, row);
        return columnData.columnType.getCopyCellValue(value, this, { col, row }) ?? value;
    }
    onDrawCell(col, row, context) {
        const { layoutMap } = this[_];
        let draw;
        let style;
        if (row < layoutMap.headerRowCount) {
            const hd = layoutMap.getHeader(col, row);
            draw = hd.headerType.onDrawCell;
            ({ style } = hd);
            _updateRect(this, col, row, context);
        }
        else {
            const column = layoutMap.getBody(col, row);
            draw = column.columnType.onDrawCell;
            ({ style } = column);
            _updateRect(this, col, row, context);
        }
        const cellValue = _getCellValue(this, col, row);
        if (this.rowCount <= row) {
            // Depending on the FilterDataSource, the rowCount may be reduced.
            return undefined;
        }
        return _onDrawValue(this, cellValue, context, { col, row }, style, draw);
    }
    doGetCellValue(col, row, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueCallback) {
        if (row < this[_].layoutMap.headerRowCount) {
            // nop
            return false;
        }
        else {
            const value = _getCellValue(this, col, row);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.isPromise)(value)) {
                //遅延中は無視
                return false;
            }
            valueCallback(value);
        }
        return true;
    }
    doChangeValue(col, row, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changeValueCallback) {
        if (row < this[_].layoutMap.headerRowCount) {
            // nop
            return false;
        }
        else {
            const record = this.getRowRecord(row);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.isPromise)(record)) {
                //遅延中は無視
                return false;
            }
            const before = _getCellValue(this, col, row);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.isPromise)(before)) {
                //遅延中は無視
                return false;
            }
            const after = changeValueCallback(before);
            if (after === undefined) {
                return false;
            }
            return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.then)(_setCellValue(this, col, row, after), (ret) => {
                if (ret) {
                    const { field } = this[_].layoutMap.getBody(col, row);
                    this.fireListeners(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE.CHANGED_VALUE, {
                        col,
                        row,
                        record: record,
                        field: field,
                        value: after,
                        oldValue: before
                    });
                }
                return ret;
            });
        }
    }
    doSetPasteValue(text, test) {
        // _onRangePaste.call<ListGrid<T>, [ string, (data: SetPasteValueTestData<T>) => boolean ], void>(this, text, test as (data: SetPasteValueTestData<T>) => boolean)
        _onRangePaste.call(this, text, test);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getHeaderValue(col, row) {
        const field = this.getHeaderField(col, row);
        return this.headerValues.get(field);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setHeaderValue(col, row, newValue) {
        const field = this.getHeaderField(col, row);
        const oldValue = this.headerValues.get(field);
        this.headerValues.set(field, newValue);
        this.fireListeners(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE.CHANGED_HEADER_VALUE, {
            col,
            row,
            field,
            value: newValue,
            oldValue
        });
    }
    getLayoutCellId(col, row) {
        return this[_].layoutMap.getCellId(col, row);
    }
    bindEventsInternal() {
        const grid = this;
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE.SELECTED_CELL, (e) => {
            const range = _getCellRange(this, e.col, e.row);
            const { start: { col: startCol, row: startRow }, end: { col: endCol, row: endRow } } = range;
            if (startCol !== endCol || startRow !== endRow) {
                this.invalidateCellRange(range);
            }
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE.PASTE_CELL, (e) => {
            if (!this[_].allowRangePaste) {
                return;
            }
            const { start, end } = this.selection.range;
            if (!e.multi && (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__.cellEquals)(start, end)) {
                return;
            }
            const { layoutMap } = this[_];
            if (start.row < layoutMap.headerRowCount) {
                return;
            }
            _internal_utils__WEBPACK_IMPORTED_MODULE_6__.event.cancel(e.event);
            _onRangePaste.call(this, e.normalizeValue);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_11__.LG_EVENT_TYPE.DELETE_CELL, (e) => {
            const { start } = this.selection.range;
            const { layoutMap } = this[_];
            if (start.row < layoutMap.headerRowCount) {
                return;
            }
            _internal_utils__WEBPACK_IMPORTED_MODULE_6__.event.cancel(e.event);
            _onRangeDelete.call(this);
        });
    }
    getMoveLeftColByKeyDownInternal({ col, row }) {
        const { start: { col: startCol } } = _getCellRange(this, col, row);
        col = startCol;
        return super.getMoveLeftColByKeyDownInternal({ col, row });
    }
    getMoveRightColByKeyDownInternal({ col, row }) {
        const { end: { col: endCol } } = _getCellRange(this, col, row);
        col = endCol;
        return super.getMoveRightColByKeyDownInternal({ col, row });
    }
    getMoveUpRowByKeyDownInternal({ col, row }) {
        const { start: { row: startRow } } = _getCellRange(this, col, row);
        row = startRow;
        return super.getMoveUpRowByKeyDownInternal({ col, row });
    }
    getMoveDownRowByKeyDownInternal({ col, row }) {
        const { end: { row: endRow } } = _getCellRange(this, col, row);
        row = endRow;
        return super.getMoveDownRowByKeyDownInternal({ col, row });
    }
    getOffsetInvalidateCells() {
        return 1;
    }
    getCopyRangeInternal(range) {
        const { start } = this.getCellRange(range.start.col, range.start.row);
        const { end } = this.getCellRange(range.end.col, range.end.row);
        return { start, end };
    }
    fireListeners(type, ...event) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return super.fireListeners(type, ...event);
    }
}


/***/ }),

/***/ "./src/columns.ts":
/*!************************!*\
  !*** ./src/columns.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "columns": () => (/* binding */ columns)
/* harmony export */ });
/* harmony import */ var _columns_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns/action */ "./src/columns/action.ts");
/* harmony import */ var _columns_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./columns/style */ "./src/columns/style.ts");
/* harmony import */ var _columns_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./columns/type */ "./src/columns/type.ts");



const style = {
    EVENT_TYPE: _columns_style__WEBPACK_IMPORTED_MODULE_1__.EVENT_TYPE,
    BaseStyle: _columns_style__WEBPACK_IMPORTED_MODULE_1__.BaseStyle,
    Style: _columns_style__WEBPACK_IMPORTED_MODULE_1__.Style,
    headerStyleOf: _columns_style__WEBPACK_IMPORTED_MODULE_1__.of
};
const type = {
    TYPES: _columns_type__WEBPACK_IMPORTED_MODULE_2__.TYPES,
    Column: _columns_type__WEBPACK_IMPORTED_MODULE_2__.Column,
    ButtonColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.ButtonColumn,
    NumberColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.NumberColumn,
    CheckColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.CheckColumn,
    MenuColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.MenuColumn,
    ImageColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.ImageColumn,
    PercentCompleteBarColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.PercentCompleteBarColumn,
    IconColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.IconColumn,
    MultilineTextColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.MultilineTextColumn,
    BranchGraphColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.BranchGraphColumn,
    RadioColumn: _columns_type__WEBPACK_IMPORTED_MODULE_2__.RadioColumn,
    of: _columns_type__WEBPACK_IMPORTED_MODULE_2__.of
};
const action = {
    ACTIONS: _columns_action__WEBPACK_IMPORTED_MODULE_0__.ACTIONS,
    BaseAction: _columns_action__WEBPACK_IMPORTED_MODULE_0__.BaseAction,
    ButtonAction: _columns_action__WEBPACK_IMPORTED_MODULE_0__.ButtonAction,
    Editor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.Editor,
    CheckEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.CheckEditor,
    RadioEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.RadioEditor,
    InlineInputEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.InlineInputEditor,
    InlineMenuEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.InlineMenuEditor,
    ImmutableCheckEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.ImmutableCheckEditor,
    ImmutableInputEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.ImmutableInputEditor,
    ImmutableRadioEditor: _columns_action__WEBPACK_IMPORTED_MODULE_0__.ImmutableRadioEditor,
    of: _columns_action__WEBPACK_IMPORTED_MODULE_0__.of
};
/**
 * columns
 */
const columns = { action, type, style };


/***/ }),

/***/ "./src/columns/action.ts":
/*!*******************************!*\
  !*** ./src/columns/action.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImmutableCheckEditor": () => (/* binding */ ImmutableCheckEditor),
/* harmony export */   "ImmutableRadioEditor": () => (/* binding */ ImmutableRadioEditor),
/* harmony export */   "ImmutableInputEditor": () => (/* binding */ ImmutableInputEditor),
/* harmony export */   "ACTIONS": () => (/* binding */ ACTIONS),
/* harmony export */   "BaseAction": () => (/* reexport safe */ _action_BaseAction__WEBPACK_IMPORTED_MODULE_1__.BaseAction),
/* harmony export */   "Editor": () => (/* reexport safe */ _action_Editor__WEBPACK_IMPORTED_MODULE_4__.Editor),
/* harmony export */   "Action": () => (/* reexport safe */ _action_Action__WEBPACK_IMPORTED_MODULE_0__.Action),
/* harmony export */   "CheckEditor": () => (/* reexport safe */ _action_CheckEditor__WEBPACK_IMPORTED_MODULE_3__.CheckEditor),
/* harmony export */   "RadioEditor": () => (/* reexport safe */ _action_RadioEditor__WEBPACK_IMPORTED_MODULE_7__.RadioEditor),
/* harmony export */   "ButtonAction": () => (/* reexport safe */ _action_ButtonAction__WEBPACK_IMPORTED_MODULE_2__.ButtonAction),
/* harmony export */   "SmallDialogInputEditor": () => (/* reexport safe */ _action_SmallDialogInputEditor__WEBPACK_IMPORTED_MODULE_8__.SmallDialogInputEditor),
/* harmony export */   "InlineInputEditor": () => (/* reexport safe */ _action_InlineInputEditor__WEBPACK_IMPORTED_MODULE_5__.InlineInputEditor),
/* harmony export */   "InlineMenuEditor": () => (/* reexport safe */ _action_InlineMenuEditor__WEBPACK_IMPORTED_MODULE_6__.InlineMenuEditor),
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _action_Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action/Action */ "./src/columns/action/Action.ts");
/* harmony import */ var _action_BaseAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action/BaseAction */ "./src/columns/action/BaseAction.ts");
/* harmony import */ var _action_ButtonAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action/ButtonAction */ "./src/columns/action/ButtonAction.ts");
/* harmony import */ var _action_CheckEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action/CheckEditor */ "./src/columns/action/CheckEditor.ts");
/* harmony import */ var _action_Editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./action/Editor */ "./src/columns/action/Editor.ts");
/* harmony import */ var _action_InlineInputEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./action/InlineInputEditor */ "./src/columns/action/InlineInputEditor.ts");
/* harmony import */ var _action_InlineMenuEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./action/InlineMenuEditor */ "./src/columns/action/InlineMenuEditor.ts");
/* harmony import */ var _action_RadioEditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./action/RadioEditor */ "./src/columns/action/RadioEditor.ts");
/* harmony import */ var _action_SmallDialogInputEditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./action/SmallDialogInputEditor */ "./src/columns/action/SmallDialogInputEditor.ts");









// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ImmutableCheckEditor extends _action_CheckEditor__WEBPACK_IMPORTED_MODULE_3__.CheckEditor {
    get disabled() {
        return this._disabled;
    }
    get readOnly() {
        return this._readOnly;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ImmutableRadioEditor extends _action_RadioEditor__WEBPACK_IMPORTED_MODULE_7__.RadioEditor {
    get disabled() {
        return this._disabled;
    }
    get readOnly() {
        return this._readOnly;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ImmutableInputEditor extends _action_SmallDialogInputEditor__WEBPACK_IMPORTED_MODULE_8__.SmallDialogInputEditor {
    get disabled() {
        return this._disabled;
    }
    get readOnly() {
        return this._readOnly;
    }
}
const ACTIONS = {
    CHECK: new ImmutableCheckEditor(),
    INPUT: new ImmutableInputEditor(),
    RADIO: new ImmutableRadioEditor()
};
/**
 * column actions
 * @namespace cheetahGrid.columns.action
 * @memberof cheetahGrid.columns
 */

function of(columnAction) {
    if (!columnAction) {
        return undefined;
    }
    else if (typeof columnAction === 'string') {
        const key = columnAction.toUpperCase();
        return ACTIONS[key] || of(null);
    }
    else {
        return columnAction;
    }
}


/***/ }),

/***/ "./src/columns/action/Action.ts":
/*!**************************************!*\
  !*** ./src/columns/action/Action.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var _actionBind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionBind */ "./src/columns/action/actionBind.ts");
/* harmony import */ var _BaseAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseAction */ "./src/columns/action/BaseAction.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _action_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action-utils */ "./src/columns/action/action-utils.ts");




class Action extends _BaseAction__WEBPACK_IMPORTED_MODULE_1__.BaseAction {
    _action;
    constructor(option = {}) {
        super(option);
        this._action = option.action || (() => {
        });
    }
    get editable() {
        return false;
    }
    get action() {
        return this._action;
    }
    set action(action) {
        this._action = action;
    }
    clone() {
        return new Action(this);
    }
    getState(_grid) {
        return {};
    }
    bindGridEvent(grid, cellId) {
        const state = this.getState(grid);
        const action = (cell) => {
            if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_3__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                return;
            }
            const record = grid.getRowRecord(cell.row);
            this._action(record, (0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.extend)(cell, { grid }));
        };
        return [
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellClickAction)(grid, cellId, {
                action,
                mouseOver: (e) => {
                    if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_3__.isDisabledRecord)(this.disabled, grid, e.row)) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row
                    };
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: (e) => {
                    delete state.mouseActiveCell;
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                }
            }),
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellKeyAction)(grid, cellId, {
                action
            })
        ];
    }
    onPasteCellRangeBox() {
        // noop
    }
    onDeleteCellRangeBox() {
        // noop
    }
}


/***/ }),

/***/ "./src/columns/action/BaseAction.ts":
/*!******************************************!*\
  !*** ./src/columns/action/BaseAction.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAction": () => (/* binding */ BaseAction)
/* harmony export */ });
class BaseAction {
    _disabled;
    constructor(option = {}) {
        this._disabled = option.disabled || false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this.onChangeDisabledInternal();
    }
    onChangeDisabledInternal() {
        // abstruct
    }
}


/***/ }),

/***/ "./src/columns/action/BaseInputEditor.ts":
/*!***********************************************!*\
  !*** ./src/columns/action/BaseInputEditor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseInputEditor": () => (/* binding */ BaseInputEditor)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _action_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action-utils */ "./src/columns/action/action-utils.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Editor */ "./src/columns/action/Editor.ts");




const KEY_ENTER = 13;
const KEY_F2 = 113;
class BaseInputEditor extends _Editor__WEBPACK_IMPORTED_MODULE_3__.Editor {
    constructor(option = {}) {
        super(option);
    }
    bindGridEvent(grid, cellId) {
        const open = (cell) => {
            if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                return false;
            }
            this.onOpenCellInternal(grid, cell);
            return true;
        };
        const input = (cell, value) => {
            if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                return;
            }
            this.onInputCellInternal(grid, cell, value);
        };
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        return [
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.INPUT_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                input({
                    col: e.col,
                    row: e.row
                }, e.value);
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.PASTE_CELL, (e) => {
                if (e.multi) {
                    // ignore multi cell values
                    return;
                }
                const selectionRange = grid.selection.range;
                if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.cellEquals)(selectionRange.start, selectionRange.end)) {
                    // ignore multi paste values
                    return;
                }
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e.event);
                input({
                    col: e.col,
                    row: e.row
                }, e.normalizeValue);
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.DBLCLICK_CELL, (cell) => {
                if (!isTarget(cell.col, cell.row)) {
                    return;
                }
                open({
                    col: cell.col,
                    row: cell.row
                });
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.DBLTAP_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                open({
                    col: e.col,
                    row: e.row
                });
                _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e.event);
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.KEYDOWN, (e) => {
                if (e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) {
                    return;
                }
                const sel = grid.selection.select;
                if (!isTarget(sel.col, sel.row)) {
                    return;
                }
                if (open({
                    col: sel.col,
                    row: sel.row
                })) {
                    e.stopCellMoving();
                }
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.SELECTED_CELL, (e) => {
                this.onChangeSelectCellInternal(grid, { col: e.col, row: e.row }, e.selected);
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.SCROLL, () => {
                this.onGridScrollInternal(grid);
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.EDITABLEINPUT_CELL, (cell) => {
                if (!isTarget(cell.col, cell.row)) {
                    return false;
                }
                if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                    return false;
                }
                return true;
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, (cell) => {
                if (!isTarget(cell.col, cell.row)) {
                    return;
                }
                if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                    return;
                }
                const range = grid.getCellRange(cell.col, cell.row);
                if (range.start.col !== range.end.col || range.start.row !== range.end.row) {
                    const { input } = cell;
                    const baseRect = grid.getCellRect(cell.col, cell.row);
                    const rangeRect = grid.getCellRangeRect(range);
                    input.style.top = `${(parseFloat(input.style.top) + (rangeRect.top - baseRect.top)).toFixed()}px`;
                    input.style.left = `${(parseFloat(input.style.left) + (rangeRect.left - baseRect.left)).toFixed()}px`;
                    input.style.width = `${rangeRect.width.toFixed()}px`;
                    input.style.height = `${rangeRect.height.toFixed()}px`;
                }
                this.onSetInputAttrsInternal(grid, {
                    col: cell.col,
                    row: cell.row
                }, cell.input);
            })
        ];
    }
    onPasteCellRangeBox(grid, cell, value) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        grid.doChangeValue(cell.col, cell.row, () => value);
    }
    onDeleteCellRangeBox(grid, cell) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        grid.doChangeValue(cell.col, cell.row, () => '');
    }
}


/***/ }),

/***/ "./src/columns/action/ButtonAction.ts":
/*!********************************************!*\
  !*** ./src/columns/action/ButtonAction.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonAction": () => (/* binding */ ButtonAction)
/* harmony export */ });
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Action */ "./src/columns/action/Action.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");



const BUTTON_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__.getButtonColumnStateId)();
class ButtonAction extends _Action__WEBPACK_IMPORTED_MODULE_0__.Action {
    getState(grid) {
        let state = grid[BUTTON_COLUMN_STATE_ID];
        if (!state) {
            state = {};
            _internal_utils__WEBPACK_IMPORTED_MODULE_2__.obj.setReadonly(grid, BUTTON_COLUMN_STATE_ID, state);
        }
        return state;
    }
}


/***/ }),

/***/ "./src/columns/action/CheckEditor.ts":
/*!*******************************************!*\
  !*** ./src/columns/action/CheckEditor.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckEditor": () => (/* binding */ CheckEditor)
/* harmony export */ });
/* harmony import */ var _actionBind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionBind */ "./src/columns/action/actionBind.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _action_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action-utils */ "./src/columns/action/action-utils.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Editor */ "./src/columns/action/Editor.ts");
/* harmony import */ var _internal_animate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../internal/animate */ "./src/internal/animate.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");







const CHECK_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__.getCheckColumnStateId)();
class CheckEditor extends _Editor__WEBPACK_IMPORTED_MODULE_4__.Editor {
    clone() {
        return new CheckEditor(this);
    }
    bindGridEvent(grid, cellId) {
        let _state = grid[CHECK_COLUMN_STATE_ID];
        if (!_state) {
            _state = { block: {}, elapsed: {} };
            _internal_utils__WEBPACK_IMPORTED_MODULE_1__.obj.setReadonly(grid, CHECK_COLUMN_STATE_ID, _state);
        }
        const state = _state;
        const action = (cell) => {
            const range = grid.getCellRange(cell.col, cell.row);
            const cellKey = `${range.start.col}:${range.start.row}`;
            if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, cell.row) || state.block[cellKey]) {
                return;
            }
            const ret = grid.doChangeValue(cell.col, cell.row, _action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue);
            if (ret) {
                const onChange = () => {
                    // checkbox animation
                    (0,_internal_animate__WEBPACK_IMPORTED_MODULE_5__.animate)(200, (point) => {
                        if (point === 1) {
                            delete state.elapsed[cellKey];
                        }
                        else {
                            state.elapsed[cellKey] = point;
                        }
                        grid.invalidateCellRange(range);
                    });
                };
                if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(ret)) {
                    state.block[cellKey] = true;
                    ret.then(() => {
                        delete state.block[cellKey];
                        onChange();
                    });
                }
                else {
                    onChange();
                }
            }
        };
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        return [
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellClickAction)(grid, cellId, {
                action,
                mouseOver: (e) => {
                    if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, e.row)) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row
                    };
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: (e) => {
                    delete state.mouseActiveCell;
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                }
            }),
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellKeyAction)(grid, cellId, {
                action: (_e) => {
                    const selrange = grid.selection.range;
                    const { col } = grid.selection.select;
                    for (let { row } = selrange.start; row <= selrange.end.row; row++) {
                        if (!isTarget(col, row)) {
                            continue;
                        }
                        action({
                            col,
                            row
                        });
                    }
                }
            }),
            // paste value
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_3__.DG_EVENT_TYPE.PASTE_CELL, (e) => {
                if (e.multi) {
                    // ignore multi cell values
                    return;
                }
                const selectionRange = grid.selection.range;
                if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.cellEquals)(selectionRange.start, selectionRange.end)) {
                    // ignore multi paste values
                    return;
                }
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                const pasteValue = e.normalizeValue.trim();
                grid.doGetCellValue(e.col, e.row, (value) => {
                    const newValue = (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue)(value);
                    if (`${newValue}`.trim() === pasteValue) {
                        _internal_utils__WEBPACK_IMPORTED_MODULE_1__.event.cancel(e.event);
                        action({
                            col: e.col,
                            row: e.row
                        });
                    }
                });
            })
        ];
    }
    onPasteCellRangeBox(grid, cell, value) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        const pasteValue = value.trim();
        grid.doGetCellValue(cell.col, cell.row, (value) => {
            const newValue = (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue)(value);
            if (`${newValue}`.trim() === pasteValue) {
                grid.doChangeValue(cell.col, cell.row, _action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue);
            }
        });
    }
    onDeleteCellRangeBox() {
        // noop
    }
}


/***/ }),

/***/ "./src/columns/action/Editor.ts":
/*!**************************************!*\
  !*** ./src/columns/action/Editor.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Editor": () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var _BaseAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAction */ "./src/columns/action/BaseAction.ts");

class Editor extends _BaseAction__WEBPACK_IMPORTED_MODULE_0__.BaseAction {
    _readOnly;
    constructor(option = {}) {
        super(option);
        this._readOnly = option.readOnly || false;
    }
    get editable() {
        return true;
    }
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(readOnly) {
        this._readOnly = readOnly;
        this.onChangeReadOnlyInternal();
    }
    onChangeReadOnlyInternal() {
        // abstruct
    }
}


/***/ }),

/***/ "./src/columns/action/InlineInputEditor.ts":
/*!*************************************************!*\
  !*** ./src/columns/action/InlineInputEditor.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineInputEditor": () => (/* binding */ InlineInputEditor)
/* harmony export */ });
/* harmony import */ var _BaseInputEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseInputEditor */ "./src/columns/action/BaseInputEditor.ts");
/* harmony import */ var _internal_InlineInputElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/InlineInputElement */ "./src/columns/action/internal/InlineInputElement.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__.getInlineInputEditorStateId)();
function getState(grid) {
    let state = grid[_];
    if (!state) {
        state = {};
        _internal_utils__WEBPACK_IMPORTED_MODULE_3__.obj.setReadonly(grid, _, state);
    }
    return state;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalElement = null;
let bindGridCount = 0;
function attachInput(grid, cell, editor, value) {
    const state = getState(grid);
    if (!globalElement) {
        globalElement = new _internal_InlineInputElement__WEBPACK_IMPORTED_MODULE_1__.InlineInputElement();
    }
    if (!state.element) {
        state.element = globalElement;
        bindGridCount++;
        grid.addDisposable({
            dispose() {
                bindGridCount--;
                if (!bindGridCount) {
                    globalElement?.dispose();
                    globalElement = null;
                    state.element = null;
                }
            }
        });
    }
    globalElement.attach(grid, editor, cell.col, cell.row, value);
}
function detachInput(gridFocus) {
    if (globalElement) {
        globalElement.detach(gridFocus);
    }
}
function doChangeValue(_grid) {
    if (globalElement) {
        globalElement.doChangeValue();
    }
}
class InlineInputEditor extends _BaseInputEditor__WEBPACK_IMPORTED_MODULE_0__.BaseInputEditor {
    _classList;
    _type;
    constructor(option = {}) {
        super(option);
        this._classList = option.classList;
        this._type = option.type;
    }
    get classList() {
        if (!this._classList) {
            return undefined;
        }
        return Array.isArray(this._classList) ? this._classList : [this._classList];
    }
    set classList(classList) {
        this._classList = classList;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    clone() {
        return new InlineInputEditor(this);
    }
    onInputCellInternal(grid, cell, inputValue) {
        attachInput(grid, cell, this, inputValue);
    }
    onOpenCellInternal(grid, cell) {
        grid.doGetCellValue(cell.col, cell.row, (value) => {
            attachInput(grid, cell, this, value);
        });
    }
    onChangeSelectCellInternal(grid, _cell, _selected) {
        doChangeValue(grid);
        detachInput();
    }
    onGridScrollInternal(grid) {
        doChangeValue(grid);
        detachInput(true);
    }
    onChangeDisabledInternal() {
        // cancel input
        detachInput(true);
    }
    onChangeReadOnlyInternal() {
        // cancel input
        detachInput(true);
    }
    onSetInputAttrsInternal(grid, _cell, input) {
        _internal_InlineInputElement__WEBPACK_IMPORTED_MODULE_1__.InlineInputElement.setInputAttrs(this, grid, input);
    }
}


/***/ }),

/***/ "./src/columns/action/InlineMenuEditor.ts":
/*!************************************************!*\
  !*** ./src/columns/action/InlineMenuEditor.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineMenuEditor": () => (/* binding */ InlineMenuEditor)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _action_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action-utils */ "./src/columns/action/action-utils.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Editor */ "./src/columns/action/Editor.ts");
/* harmony import */ var _internal_InlineMenuElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/InlineMenuElement */ "./src/columns/action/internal/InlineMenuElement.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type */ "./src/columns/type.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_menu_items__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../internal/menu-items */ "./src/internal/menu-items.ts");








const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__.getInlineMenuEditorStateId)();
function getState(grid) {
    let state = grid[_];
    if (!state) {
        state = {};
        _internal_utils__WEBPACK_IMPORTED_MODULE_0__.obj.setReadonly(grid, _, state);
    }
    return state;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalElement = null;
let bindGridCount = 0;
function attachMenu(grid, cell, editor, value, record) {
    const state = getState(grid);
    if (!globalElement) {
        globalElement = new _internal_InlineMenuElement__WEBPACK_IMPORTED_MODULE_4__.InlineMenuElement();
    }
    if (!state.element) {
        state.element = globalElement;
        bindGridCount++;
        grid.addDisposable({
            dispose() {
                bindGridCount--;
                if (!bindGridCount) {
                    globalElement?.dispose();
                    globalElement = null;
                    state.element = null;
                }
            }
        });
    }
    globalElement.attach(grid, editor, cell.col, cell.row, value, record);
}
function detachMenu(gridFocus) {
    if (globalElement) {
        globalElement.detach(gridFocus);
    }
}
const KEY_ENTER = 13;
const KEY_F2 = 113;
class InlineMenuEditor extends _Editor__WEBPACK_IMPORTED_MODULE_3__.Editor {
    _classList;
    _options;
    constructor(option = {}) {
        super(option);
        this._classList = option.classList;
        this._options = (0,_internal_menu_items__WEBPACK_IMPORTED_MODULE_7__.normalizeToFn)(option.options);
    }
    dispose() {
        // noop
    }
    get classList() {
        if (!this._classList) {
            return undefined;
        }
        return Array.isArray(this._classList) ? this._classList : [this._classList];
    }
    set classList(classList) {
        this._classList = classList;
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = (0,_internal_menu_items__WEBPACK_IMPORTED_MODULE_7__.normalizeToFn)(options);
    }
    clone() {
        return new InlineMenuEditor(this);
    }
    onChangeDisabledInternal() {
        // cancel input
        detachMenu(true);
    }
    onChangeReadOnlyInternal() {
        // cancel input
        detachMenu(true);
    }
    bindGridEvent(grid, cellId) {
        const open = (cell) => {
            if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
                return false;
            }
            grid.doGetCellValue(cell.col, cell.row, (value) => {
                const record = grid.getRowRecord(cell.row);
                if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
                    return;
                }
                attachMenu(grid, cell, this, value, record);
            });
            return true;
        };
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        return [
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.CLICK_CELL, (cell) => {
                if (!isTarget(cell.col, cell.row)) {
                    return;
                }
                open({
                    col: cell.col,
                    row: cell.row
                });
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.KEYDOWN, (e) => {
                if (e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) {
                    return;
                }
                const sel = grid.selection.select;
                if (!isTarget(sel.col, sel.row)) {
                    return;
                }
                if (open({
                    col: sel.col,
                    row: sel.row
                })) {
                    e.stopCellMoving();
                }
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.SELECTED_CELL, (_e) => {
                detachMenu();
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.SCROLL, () => {
                detachMenu(true);
            }),
            // mouse move
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, e.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, e.row)) {
                    return;
                }
                grid.getElement().style.cursor = 'pointer';
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.MOUSEMOVE_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, e.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, e.row)) {
                    return;
                }
                if (!grid.getElement().style.cursor) {
                    grid.getElement().style.cursor = 'pointer';
                }
            }),
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                grid.getElement().style.cursor = '';
            }),
            // paste value
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.DG_EVENT_TYPE.PASTE_CELL, (e) => {
                if (e.multi) {
                    // ignore multi cell values
                    return;
                }
                const selectionRange = grid.selection.range;
                if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.cellEquals)(selectionRange.start, selectionRange.end)) {
                    // ignore multi paste values
                    return;
                }
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, e.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, e.row)) {
                    return;
                }
                const record = grid.getRowRecord(e.row);
                if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
                    return;
                }
                const pasteOpt = this._pasteDataToOptionValue(e.normalizeValue, grid, e, record);
                if (pasteOpt) {
                    _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e.event);
                    (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(grid.doChangeValue(e.col, e.row, () => pasteOpt.value), () => {
                        const range = grid.getCellRange(e.col, e.row);
                        grid.invalidateCellRange(range);
                    });
                }
            })
        ];
    }
    onPasteCellRangeBox(grid, cell, value) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        const record = grid.getRowRecord(cell.row);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
            return;
        }
        const pasteOpt = this._pasteDataToOptionValue(value, grid, cell, record);
        if (pasteOpt) {
            grid.doChangeValue(cell.col, cell.row, () => pasteOpt.value);
        }
    }
    onDeleteCellRangeBox(grid, cell) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_1__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        const record = grid.getRowRecord(cell.row);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
            return;
        }
        const pasteOpt = this._pasteDataToOptionValue('', grid, cell, record);
        if (pasteOpt) {
            grid.doChangeValue(cell.col, cell.row, () => pasteOpt.value);
        }
    }
    _pasteDataToOptionValue(value, grid, cell, record) {
        const options = this._options(record);
        const pasteOpt = _textToOptionValue(value, options);
        if (pasteOpt) {
            return pasteOpt;
        }
        const columnType = grid.getColumnType(cell.col, cell.row);
        if (hasOptions(columnType)) {
            // Find with caption.
            const pasteValue = normalizePasteValueStr(value);
            const captionOpt = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.array.find(columnType.options, (opt) => normalizePasteValueStr(opt.label) === pasteValue);
            if (captionOpt) {
                return _textToOptionValue(captionOpt.value, options);
            }
        }
        return undefined;
    }
}
function _textToOptionValue(value, options) {
    const pasteValue = normalizePasteValueStr(value);
    const pasteOpt = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.array.find(options, (opt) => normalizePasteValueStr(opt.value) === pasteValue);
    if (pasteOpt) {
        return pasteOpt;
    }
    return undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePasteValueStr(value) {
    if (value == null) {
        return '';
    }
    return `${value}`.trim();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasOptions(columnType) {
    if (columnType instanceof _type__WEBPACK_IMPORTED_MODULE_5__.MenuColumn) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Array.isArray(columnType.options)) {
        return true;
    }
    return false;
}


/***/ }),

/***/ "./src/columns/action/RadioEditor.ts":
/*!*******************************************!*\
  !*** ./src/columns/action/RadioEditor.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioEditor": () => (/* binding */ RadioEditor)
/* harmony export */ });
/* harmony import */ var _actionBind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionBind */ "./src/columns/action/actionBind.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _action_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action-utils */ "./src/columns/action/action-utils.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Editor */ "./src/columns/action/Editor.ts");
/* harmony import */ var _internal_animate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../internal/animate */ "./src/internal/animate.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/columns/utils/index.ts");








const RADIO_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_6__.getRadioColumnStateId)();
class RadioEditor extends _Editor__WEBPACK_IMPORTED_MODULE_4__.Editor {
    _group;
    _checkAction;
    constructor(option = {}) {
        super(option);
        this._group = option.group;
        this._checkAction = option.checkAction;
    }
    clone() {
        return new RadioEditor(this);
    }
    /** @deprecated Use checkAction instead. */
    get group() {
        return this._group;
    }
    /** @deprecated Use checkAction instead. */
    set group(group) {
        this._group = group;
    }
    get checkAction() {
        return this._checkAction;
    }
    set checkAction(checkAction) {
        this._checkAction = checkAction;
    }
    bindGridEvent(grid, cellId) {
        let _state = grid[RADIO_COLUMN_STATE_ID];
        if (!_state) {
            _state = { block: {}, elapsed: {} };
            _internal_utils__WEBPACK_IMPORTED_MODULE_1__.obj.setReadonly(grid, RADIO_COLUMN_STATE_ID, _state);
        }
        const state = _state;
        const action = (cell) => {
            this._action(grid, cell);
        };
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        return [
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellClickAction)(grid, cellId, {
                action,
                mouseOver: (e) => {
                    if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, e.row)) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row
                    };
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: (e) => {
                    delete state.mouseActiveCell;
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                }
            }),
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellKeyAction)(grid, cellId, {
                action
            }),
            // paste value
            grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_3__.DG_EVENT_TYPE.PASTE_CELL, (e) => {
                if (e.multi) {
                    // ignore multi cell values
                    return;
                }
                const selectionRange = grid.selection.range;
                if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.cellEquals)(selectionRange.start, selectionRange.end)) {
                    // ignore multi paste values
                    return;
                }
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                const pasteValue = e.normalizeValue.trim();
                if (!(0,_utils__WEBPACK_IMPORTED_MODULE_7__.toBoolean)(pasteValue)) {
                    return;
                }
                _internal_utils__WEBPACK_IMPORTED_MODULE_1__.event.cancel(e.event);
                action({
                    col: e.col,
                    row: e.row
                });
            })
        ];
    }
    onPasteCellRangeBox(grid, cell, value) {
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, cell.row)) {
            return;
        }
        const pasteValue = value.trim();
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_7__.toBoolean)(pasteValue)) {
            return;
        }
        this._action(grid, {
            col: cell.col,
            row: cell.row
        });
    }
    onDeleteCellRangeBox() {
        // noop
    }
    _action(grid, cell) {
        const state = grid[RADIO_COLUMN_STATE_ID];
        const range = grid.getCellRange(cell.col, cell.row);
        const cellKey = `${range.start.col}:${range.start.row}`;
        if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, cell.row) || state.block[cellKey]) {
            return;
        }
        grid.doGetCellValue(cell.col, cell.row, (value) => {
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_7__.toBoolean)(value)) {
                return;
            }
            if (this._checkAction) {
                // User behavior
                const record = grid.getRowRecord(cell.row);
                this._checkAction(record, (0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.extend)(cell, { grid }));
                return;
            }
            if (this._group) {
                // Backward compatibility
                const state = grid[RADIO_COLUMN_STATE_ID];
                const targets = this._group({ grid, col: cell.col, row: cell.row });
                targets.forEach(({ col, row }) => {
                    const range = grid.getCellRange(col, row);
                    const cellKey = `${range.start.col}:${range.start.row}`;
                    if ((0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isReadOnlyRecord)(this.readOnly, grid, cell.row) || (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.isDisabledRecord)(this.disabled, grid, cell.row) || state.block[cellKey]) {
                        return;
                    }
                    actionCell(grid, col, row, col === cell.col && row === cell.row);
                });
                return;
            }
            // default behavior
            const field = grid.getField(cell.col, cell.row);
            const recordStartRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(cell.row));
            /** Original DataSource */
            const { dataSource } = grid.dataSource;
            const girdRecords = getAllRecordsFromGrid(grid);
            for (let index = 0; index < dataSource.length; index++) {
                const record = dataSource.get(index);
                const showData = girdRecords.find((d) => d.record === record);
                if (showData) {
                    actionCell(grid, cell.col, showData.row, showData.row === recordStartRow);
                }
                else {
                    // Hidden record
                    (0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.then)(dataSource.getField(index, field), (value) => {
                        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_7__.toBoolean)(value)) {
                            return;
                        }
                        dataSource.setField(index, field, (0,_action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue)(value));
                    });
                }
            }
        });
    }
}
function getAllRecordsFromGrid(grid) {
    const result = [];
    const { rowCount, recordRowCount } = grid;
    for (let targetRow = grid.frozenRowCount; targetRow < rowCount; targetRow += recordRowCount) {
        const record = grid.getRowRecord(targetRow);
        result.push({ row: targetRow, record });
    }
    return result;
}
function actionCell(grid, col, row, flag) {
    grid.doGetCellValue(col, row, (value) => {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_7__.toBoolean)(value) === flag) {
            return;
        }
        const state = grid[RADIO_COLUMN_STATE_ID];
        const range = grid.getCellRange(col, row);
        const cellKey = `${range.start.col}:${range.start.row}`;
        const ret = grid.doChangeValue(col, row, _action_utils__WEBPACK_IMPORTED_MODULE_2__.toggleValue);
        if (ret) {
            const onChange = () => {
                // checkbox animation
                (0,_internal_animate__WEBPACK_IMPORTED_MODULE_5__.animate)(200, (point) => {
                    if (point === 1) {
                        delete state.elapsed[cellKey];
                    }
                    else {
                        state.elapsed[cellKey] = point;
                    }
                    grid.invalidateCellRange(range);
                });
            };
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(ret)) {
                state.block[cellKey] = true;
                ret.then(() => {
                    delete state.block[cellKey];
                    onChange();
                });
            }
            else {
                onChange();
            }
        }
    });
}


/***/ }),

/***/ "./src/columns/action/SmallDialogInputEditor.ts":
/*!******************************************************!*\
  !*** ./src/columns/action/SmallDialogInputEditor.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmallDialogInputEditor": () => (/* binding */ SmallDialogInputEditor)
/* harmony export */ });
/* harmony import */ var _BaseInputEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseInputEditor */ "./src/columns/action/BaseInputEditor.ts");
/* harmony import */ var _internal_SmallDialogInputElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/SmallDialogInputElement */ "./src/columns/action/internal/SmallDialogInputElement.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__.getSmallDialogInputEditorStateId)();
function getState(grid) {
    let state = grid[_];
    if (!state) {
        state = {};
        _internal_utils__WEBPACK_IMPORTED_MODULE_3__.obj.setReadonly(grid, _, state);
    }
    return state;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalElement = null;
let bindGridCount = 0;
function attachInput(grid, cell, editor, value) {
    const state = getState(grid);
    if (!globalElement) {
        globalElement = new _internal_SmallDialogInputElement__WEBPACK_IMPORTED_MODULE_1__.SmallDialogInputElement();
    }
    if (!state.element) {
        state.element = globalElement;
        bindGridCount++;
        grid.addDisposable({
            dispose() {
                bindGridCount--;
                if (!bindGridCount) {
                    globalElement?.dispose();
                    globalElement = null;
                    state.element = null;
                }
            }
        });
    }
    globalElement.attach(grid, editor, cell.col, cell.row, value);
}
function detachInput(gridFocus) {
    if (globalElement) {
        globalElement.detach(gridFocus);
    }
}
class SmallDialogInputEditor extends _BaseInputEditor__WEBPACK_IMPORTED_MODULE_0__.BaseInputEditor {
    _helperText;
    _inputValidator;
    _validator;
    _classList;
    _type;
    constructor(option = {}) {
        super(option);
        this._helperText = option.helperText;
        this._inputValidator = option.inputValidator;
        this._validator = option.validator;
        this._classList = option.classList;
        this._type = option.type;
    }
    dispose() {
        //noop
    }
    get classList() {
        if (!this._classList) {
            return undefined;
        }
        return Array.isArray(this._classList) ? this._classList : [this._classList];
    }
    set classList(classList) {
        this._classList = classList;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    get helperText() {
        return this._helperText;
    }
    get inputValidator() {
        return this._inputValidator;
    }
    get validator() {
        return this._validator;
    }
    clone() {
        return new SmallDialogInputEditor(this);
    }
    onInputCellInternal(grid, cell, inputValue) {
        attachInput(grid, cell, this, inputValue);
    }
    onOpenCellInternal(grid, cell) {
        grid.doGetCellValue(cell.col, cell.row, (value) => {
            attachInput(grid, cell, this, value);
        });
    }
    onChangeSelectCellInternal(_grid, _cell, _selected) {
        // cancel input
        detachInput();
    }
    onGridScrollInternal(_grid) {
        // cancel input
        detachInput(true);
    }
    onChangeDisabledInternal() {
        // cancel input
        detachInput(true);
    }
    onChangeReadOnlyInternal() {
        // cancel input
        detachInput(true);
    }
    onSetInputAttrsInternal(grid, _cell, input) {
        _internal_SmallDialogInputElement__WEBPACK_IMPORTED_MODULE_1__.SmallDialogInputElement.setInputAttrs(this, grid, input);
    }
}


/***/ }),

/***/ "./src/columns/action/action-utils.ts":
/*!********************************************!*\
  !*** ./src/columns/action/action-utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDisabledRecord": () => (/* binding */ isDisabledRecord),
/* harmony export */   "isReadOnlyRecord": () => (/* binding */ isReadOnlyRecord),
/* harmony export */   "toggleValue": () => (/* binding */ toggleValue)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");

function isDisabledRecord(option, grid, row) {
    if (grid.disabled) {
        return true;
    }
    return getBooleanOptionOfRecord(option, grid, row);
}
function isReadOnlyRecord(option, grid, row) {
    if (grid.readOnly) {
        return true;
    }
    return getBooleanOptionOfRecord(option, grid, row);
}
function toggleValue(val) {
    if (typeof val === 'number') {
        if (val === 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (typeof val === 'string') {
        if (val === 'false') {
            return 'true';
        }
        else if (val === 'off') {
            return 'on';
        }
        else if (/^0+$/.exec(val)) {
            return val.replace(/^(0*)0$/, '$11');
        }
        else if (val === 'true') {
            return 'false';
        }
        else if (val === 'on') {
            return 'off';
        }
        else if (/^0*1$/.exec(val)) {
            return val.replace(/^(0*)1$/, '$10');
        }
    }
    return !val;
}
function getBooleanOptionOfRecord(option, grid, row) {
    if (typeof option === 'function') {
        const record = grid.getRowRecord(row);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
            return true;
        }
        return !!option(record);
    }
    return !!option;
}


/***/ }),

/***/ "./src/columns/action/actionBind.ts":
/*!******************************************!*\
  !*** ./src/columns/action/actionBind.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindCellClickAction": () => (/* binding */ bindCellClickAction),
/* harmony export */   "bindCellKeyAction": () => (/* binding */ bindCellKeyAction)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");


const KEY_ENTER = 13;
const KEY_SPACE = 32;
function bindCellClickAction(grid, cellId, { action, mouseOver, mouseOut }) {
    function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
    }
    return [
        // click
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__.DG_EVENT_TYPE.CLICK_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(grid.getRowRecord(e.row))) {
                return;
            }
            action({
                col: e.col,
                row: e.row
            });
        }),
        // mouse move
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__.DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(grid.getRowRecord(e.row))) {
                return;
            }
            if (mouseOver) {
                if (!mouseOver({
                    col: e.col,
                    row: e.row
                })) {
                    return;
                }
            }
            grid.getElement().style.cursor = 'pointer';
        }),
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__.DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if (mouseOut) {
                mouseOut({
                    col: e.col,
                    row: e.row
                });
            }
            grid.getElement().style.cursor = '';
        })
    ];
}
function bindCellKeyAction(grid, cellId, { action, acceptKeys = [] }) {
    function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
    }
    acceptKeys = [...acceptKeys, KEY_ENTER, KEY_SPACE];
    return [
        // enter key down
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__.DG_EVENT_TYPE.KEYDOWN, (e) => {
            if (acceptKeys.indexOf(e.keyCode) === -1) {
                return;
            }
            if (grid.keyboardOptions?.moveCellOnEnter && e.keyCode === KEY_ENTER) {
                // When moving with the enter key, no action is taken with the enter key.
                return;
            }
            const sel = grid.selection.select;
            if (!isTarget(sel.col, sel.row)) {
                return;
            }
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(grid.getRowRecord(sel.row))) {
                return;
            }
            action({
                col: sel.col,
                row: sel.row
            });
            _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e.event);
        })
    ];
}


/***/ }),

/***/ "./src/columns/action/internal/InlineInputElement.ts":
/*!***********************************************************!*\
  !*** ./src/columns/action/internal/InlineInputElement.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineInputElement": () => (/* binding */ InlineInputElement)
/* harmony export */ });
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _internal_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../internal/dom */ "./src/internal/dom.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _input_value_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input-value-handler */ "./src/columns/action/internal/input-value-handler.ts");
/* harmony import */ var _InlineInputElement_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InlineInputElement.css */ "./src/columns/action/internal/InlineInputElement.css");




const KEY_TAB = 9;
const KEY_ENTER = 13;
const CLASSNAME = 'cheetah-grid__inline-input';

function createInputElement() {
    // require('@/columns/action/internal/InlineInputElement.css')
    return (0,_internal_dom__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', { classList: CLASSNAME });
}
function setInputAttrs(editor, _grid, input) {
    const { classList, type } = editor;
    if (classList) {
        input.classList.add(...classList);
    }
    input.type = type || '';
}
class InlineInputElement {
    _handler;
    _input;
    _beforePropEditor;
    _activeData;
    _attaching;
    static setInputAttrs(editor, grid, input) {
        setInputAttrs(editor, grid, input);
    }
    constructor() {
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler();
        this._input = createInputElement();
        this._bindInputEvents();
    }
    dispose() {
        const input = this._input;
        this.detach();
        this._handler.dispose();
        delete this._input;
        this._beforePropEditor = null;
        input.parentElement?.removeChild(input);
    }
    attach(grid, editor, col, row, value) {
        const input = this._input;
        const handler = this._handler;
        if (this._beforePropEditor) {
            const { classList } = this._beforePropEditor;
            if (classList) {
                input.classList.remove(...classList);
            }
        }
        input.style.font = grid.font || '16px sans-serif';
        const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
        input.style.top = `${rect.top.toFixed()}px`;
        input.style.left = `${rect.left.toFixed()}px`;
        input.style.width = `${rect.width.toFixed()}px`;
        input.style.height = `${rect.height.toFixed()}px`;
        element.appendChild(input);
        setInputAttrs(editor, grid, input);
        (0,_input_value_handler__WEBPACK_IMPORTED_MODULE_3__.setInputValue)(input, value);
        this._activeData = { grid, col, row, editor };
        this._beforePropEditor = editor;
        const focus = () => {
            input.focus();
            const end = input.value.length;
            try {
                if (typeof input.selectionStart !== 'undefined') {
                    input.selectionStart = end;
                    input.selectionEnd = end;
                    return;
                }
            }
            catch (e) {
                //ignore
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (document.selection) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const range = input.createTextRange();
                range.collapse();
                range.moveEnd('character', end);
                range.moveStart('character', end);
                range.select();
            }
        };
        handler.tryWithOffEvents(input, 'blur', () => {
            focus();
        });
        this._attaching = true;
        setTimeout(() => {
            delete this._attaching;
        });
    }
    detach(gridFocus) {
        if (this._isActive()) {
            const { grid, col, row } = this._activeData;
            const input = this._input;
            this._handler.tryWithOffEvents(input, 'blur', () => {
                input.parentElement?.removeChild(input);
            });
            const range = grid.getCellRange(col, row);
            grid.invalidateCellRange(range);
            if (gridFocus) {
                grid.focus();
            }
        }
        this._activeData = null;
    }
    doChangeValue() {
        if (!this._isActive()) {
            return;
        }
        const input = this._input;
        const { value } = input;
        const { grid, col, row } = this._activeData;
        grid.doChangeValue(col, row, () => value);
    }
    _isActive() {
        const input = this._input;
        if (!input || !input.parentElement) {
            return false;
        }
        if (!this._activeData) {
            return false;
        }
        return true;
    }
    _bindInputEvents() {
        const handler = this._handler;
        const input = this._input;
        const stopPropagationOnly = (e) => e.stopPropagation(); // gridにイベントが伝播しないように
        handler.on(input, 'click', stopPropagationOnly);
        handler.on(input, 'mousedown', stopPropagationOnly);
        handler.on(input, 'touchstart', stopPropagationOnly);
        handler.on(input, 'dblclick', stopPropagationOnly);
        handler.on(input, 'compositionstart', (_e) => {
            input.classList.add('composition');
        });
        handler.on(input, 'compositionend', (_e) => {
            input.classList.remove('composition');
        });
        handler.on(input, 'keydown', (e) => {
            if (input.classList.contains('composition')) {
                return;
            }
            const keyCode = _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.getKeyCode(e);
            if (keyCode === KEY_ENTER) {
                this._onKeydownEnter(e);
            }
            else if (keyCode === KEY_TAB) {
                this._onKeydownTab(e);
            }
        });
        handler.on(input, 'blur', (_e) => {
            this.doChangeValue();
            this.detach();
        });
    }
    _onKeydownEnter(e) {
        if (!this._isActive() || this._attaching) {
            return;
        }
        const { grid } = this._activeData;
        this.doChangeValue();
        this.detach(true);
        _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
        if (grid.keyboardOptions?.moveCellOnEnter) {
            grid.onKeyDownMove(e);
        }
    }
    _onKeydownTab(e) {
        if (!this._isActive()) {
            return;
        }
        const { grid } = this._activeData;
        if (!grid.keyboardOptions?.moveCellOnTab) {
            return;
        }
        this.doChangeValue();
        this.detach(true);
        grid.onKeyDownMove(e);
    }
}


/***/ }),

/***/ "./src/columns/action/internal/InlineMenuElement.ts":
/*!**********************************************************!*\
  !*** ./src/columns/action/internal/InlineMenuElement.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineMenuElement": () => (/* binding */ InlineMenuElement)
/* harmony export */ });
/* harmony import */ var _internal_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../internal/dom */ "./src/internal/dom.ts");
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _InlineMenuElement_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InlineMenuElement.css */ "./src/columns/action/internal/InlineMenuElement.css");



const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ESC = 27;
const CLASSNAME = 'cheetah-grid__inline-menu';
const ITEM_CLASSNAME = `${CLASSNAME}__menu-item`;
const HIDDEN_CLASSNAME = `${CLASSNAME}--hidden`;
const SHOWN_CLASSNAME = `${CLASSNAME}--shown`;
const EMPTY_ITEM_CLASSNAME = `${ITEM_CLASSNAME}--empty`;
function findItemParents(target) {
    let el = target;
    while (el && !el.classList.contains(ITEM_CLASSNAME)) {
        el = el.parentElement;
        if (!el || el.classList.contains(CLASSNAME)) {
            return null;
        }
    }
    return el;
}

function createMenuElement() {
    // require("@/columns/action/internal/InlineMenuElement.css");
    return (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classList: CLASSNAME });
}
function attachElement(element, rect, menu) {
    menu.style.top = `${rect.top.toFixed()}px`;
    menu.style.left = `${rect.left.toFixed()}px`;
    menu.style.width = `${rect.width.toFixed()}px`;
    menu.style.lineHeight = `${rect.height.toFixed()}px`;
    element.appendChild(menu);
}
function optionToLi({ classList, label, value, html }, index) {
    const item = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classList: ITEM_CLASSNAME });
    item.tabIndex = 0;
    item.dataset.valueindex = `${index}`;
    if (classList) {
        item.classList.add(...(Array.isArray(classList) ? classList : [classList]));
    }
    if (label) {
        const span = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { text: label });
        item.appendChild(span);
    }
    else if (html) {
        (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.appendHtml)(item, html);
    }
    if (value === '' || value == null) {
        item.classList.add(EMPTY_ITEM_CLASSNAME);
    }
    return item;
}
function openMenu(grid, editor, col, row, value, options, menu) {
    const { classList } = editor;
    menu.classList.remove(SHOWN_CLASSNAME);
    menu.classList.add(HIDDEN_CLASSNAME);
    (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.empty)(menu);
    menu.style.font = grid.font || '16px sans-serif';
    let emptyItemEl = null;
    let valueItemEl = null;
    options.forEach((option, i) => {
        const item = optionToLi(option, i);
        menu.appendChild(item);
        if (option.value === value) {
            valueItemEl = item;
            item.dataset.select = 'select';
        }
        if (item.classList.contains(EMPTY_ITEM_CLASSNAME)) {
            emptyItemEl = item;
        }
    });
    const focusEl = valueItemEl || emptyItemEl || menu.children[0];
    if (classList) {
        menu.classList.add(...classList);
    }
    const children = Array.prototype.slice.call(menu.children, 0);
    const focusIndex = children.indexOf(focusEl);
    const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
    // Cover the right line
    rect.width++;
    // append for calculation
    attachElement(element, rect, menu);
    // Make the selection item at the middle
    let offset = 0;
    let allHeight = 0;
    for (let i = 0; i < children.length; i++) {
        const { offsetHeight } = children[i];
        if (i < focusIndex) {
            offset += offsetHeight;
        }
        allHeight += offsetHeight;
    }
    rect.offsetTop(-offset);
    menu.style.transformOrigin = `center ${offset + Math.ceil(children[focusIndex].offsetHeight / 2)}px 0px`;
    attachElement(element, rect, menu);
    // Control not to overflow the screen range
    const menuClientRect = menu.getBoundingClientRect();
    const scaleDiff = (allHeight - menuClientRect.height) / 2;
    const orgMenuTop = menuClientRect.top - scaleDiff;
    let menuTop = orgMenuTop;
    const menuBottom = menuTop + allHeight;
    const winBottom = window.innerHeight;
    const winMargin = 20;
    if (menuBottom > winBottom - winMargin) {
        const diff = menuBottom - winBottom + winMargin;
        menuTop -= diff;
    }
    if (menuTop < 0 /*winTop*/ + winMargin) {
        menuTop = winMargin;
    }
    if (menuTop !== orgMenuTop) {
        rect.offsetTop(-(orgMenuTop - menuTop));
        // re update
        attachElement(element, rect, menu);
    }
    if (focusEl) {
        focusEl.focus();
    }
    menu.classList.remove(HIDDEN_CLASSNAME);
    menu.classList.add(SHOWN_CLASSNAME);
}
function closeMenu(_grid, _col, _row, menu) {
    menu.classList.remove(SHOWN_CLASSNAME);
    menu.classList.add(HIDDEN_CLASSNAME);
    (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.disableFocus)(menu);
}
class InlineMenuElement {
    _handler;
    _menu;
    _beforePropEditor;
    _activeData;
    constructor() {
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_1__.EventHandler();
        this._menu = createMenuElement();
        this._bindMenuEvents();
    }
    dispose() {
        const menu = this._menu;
        this.detach();
        this._handler.dispose();
        delete this._menu;
        this._beforePropEditor = null;
        menu.parentElement?.removeChild(menu);
    }
    attach(grid, editor, col, row, value, record) {
        const menu = this._menu;
        if (this._beforePropEditor) {
            const { classList } = this._beforePropEditor;
            if (classList) {
                menu.classList.remove(...classList);
            }
        }
        const options = editor.options(record);
        openMenu(grid, editor, col, row, value, options, menu);
        this._activeData = { grid, col, row, editor, options };
        this._beforePropEditor = editor;
    }
    detach(gridFocus) {
        if (this._isActive()) {
            const { grid, col, row } = this._activeData;
            const menu = this._menu;
            closeMenu(grid, col, row, menu);
            const range = grid.getCellRange(col, row);
            grid.invalidateCellRange(range);
            if (gridFocus) {
                grid.focus();
            }
        }
        this._activeData = null;
    }
    _doChangeValue(valueindex) {
        if (!this._isActive()) {
            return;
        }
        const { grid, col, row, options } = this._activeData;
        const option = options[Number(valueindex)];
        if (option) {
            const { value } = option;
            grid.doChangeValue(col, row, () => value);
        }
    }
    _isActive() {
        const menu = this._menu;
        if (!menu || !menu.parentElement) {
            return false;
        }
        if (!this._activeData) {
            return false;
        }
        return true;
    }
    _bindMenuEvents() {
        const handler = this._handler;
        const menu = this._menu;
        const stopPropagationOnly = (e) => e.stopPropagation(); // gridにイベントが伝播しないように
        handler.on(menu, 'mousedown', stopPropagationOnly);
        handler.on(menu, 'touchstart', stopPropagationOnly);
        handler.on(menu, 'dblclick', stopPropagationOnly);
        handler.on(menu, 'click', (e) => {
            e.stopPropagation();
            const item = findItemParents(e.target);
            if (!item) {
                return;
            }
            const { valueindex } = item.dataset;
            this._doChangeValue(valueindex || '');
            this.detach(true);
        });
        handler.on(menu, 'keydown', (e) => {
            const item = findItemParents(e.target);
            if (!item) {
                return;
            }
            const keyCode = _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.getKeyCode(e);
            if (keyCode === KEY_ENTER) {
                this._onKeydownEnter(menu, item, e);
            }
            else if (keyCode === KEY_ESC) {
                this.detach(true);
                _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
            }
            else if (keyCode === KEY_UP) {
                const n = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findPrevSiblingFocusable)(item);
                if (n) {
                    n.focus();
                    _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
                }
            }
            else if (keyCode === KEY_DOWN) {
                const n = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findNextSiblingFocusable)(item);
                if (n) {
                    n.focus();
                    _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
                }
            }
            else if (keyCode === KEY_TAB) {
                this._onKeydownTab(menu, item, e);
            }
        });
    }
    _onKeydownEnter(_menu, item, e) {
        const grid = this._isActive() ? this._activeData.grid : null;
        const { valueindex } = item.dataset;
        this._doChangeValue(valueindex || '');
        this.detach(true);
        _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
        if (grid) {
            if (grid.keyboardOptions?.moveCellOnEnter) {
                grid.onKeyDownMove(e);
            }
        }
    }
    _onKeydownTab(menu, item, e) {
        if (this._isActive()) {
            const { grid } = this._activeData;
            if (grid.keyboardOptions?.moveCellOnTab) {
                const { valueindex } = item.dataset;
                this._doChangeValue(valueindex || '');
                this.detach(true);
                grid.onKeyDownMove(e);
                return;
            }
        }
        if (!e.shiftKey) {
            if (!(0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findNextSiblingFocusable)(item)) {
                let n = menu.querySelector(`.${ITEM_CLASSNAME}`);
                if (!(0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(n)) {
                    n = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findNextSiblingFocusable)(n);
                }
                if (n) {
                    n.focus();
                    _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
                }
            }
        }
        else {
            if (!(0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findPrevSiblingFocusable)(item)) {
                const items = menu.querySelectorAll(`.${ITEM_CLASSNAME}`);
                let n = items[items.length - 1];
                if (!(0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(n)) {
                    n = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_0__.findPrevSiblingFocusable)(n);
                }
                if (n) {
                    n.focus();
                    _internal_utils__WEBPACK_IMPORTED_MODULE_2__.event.cancel(e);
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/columns/action/internal/SmallDialogInputElement.ts":
/*!****************************************************************!*\
  !*** ./src/columns/action/internal/SmallDialogInputElement.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmallDialogInputElement": () => (/* binding */ SmallDialogInputElement)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _internal_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../internal/dom */ "./src/internal/dom.ts");
/* harmony import */ var _input_value_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input-value-handler */ "./src/columns/action/internal/input-value-handler.ts");
/* harmony import */ var _SmallDialogInputElement_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SmallDialogInputElement.css */ "./src/columns/action/internal/SmallDialogInputElement.css");




const CLASSNAME = 'cheetah-grid__small-dialog-input';
const INPUT_CLASSNAME = `${CLASSNAME}__input`;
const HIDDEN_CLASSNAME = `${CLASSNAME}--hidden`;
const SHOWN_CLASSNAME = `${CLASSNAME}--shown`;
const KEY_ENTER = 13;
const KEY_ESC = 27;
function _focus(input, handler) {
    const focus = () => {
        input.focus();
        const end = input.value.length;
        try {
            if (typeof input.selectionStart !== 'undefined') {
                input.selectionStart = end;
                input.selectionEnd = end;
                return;
            }
        }
        catch (e) {
            //ignore
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (document.selection) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const range = input.createTextRange();
            range.collapse();
            range.moveEnd('character', end);
            range.moveStart('character', end);
            range.select();
        }
    };
    handler.tryWithOffEvents(input, 'blur', () => {
        focus();
    });
}

function createDialogElement() {
    // require('@/columns/action/internal/SmallDialogInputElement.css')
    const element = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', {
        classList: [CLASSNAME, HIDDEN_CLASSNAME]
    });
    const input = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_2__.createElement)('input', { classList: INPUT_CLASSNAME });
    input.readOnly = true;
    input.tabIndex = -1;
    element.appendChild(input);
    return element;
}
function bindProps(grid, dialog, input, editor) {
    const { classList, helperText } = editor;
    if (classList) {
        dialog.classList.add(...classList);
    }
    if (helperText && typeof helperText !== 'function') {
        dialog.dataset.helperText = helperText;
    }
    setInputAttrs(editor, grid, input);
}
function unbindProps(_grid, dialog, input, editor) {
    const { classList } = editor;
    if (classList) {
        dialog.classList.remove(...classList);
    }
    delete dialog.dataset.helperText;
    input.type = '';
}
function setInputAttrs(editor, _grid, input) {
    const { type } = editor;
    input.type = type || '';
}
class SmallDialogInputElement {
    _handler;
    _dialog;
    _input;
    _beforePropEditor;
    _activeData;
    _attaching;
    _beforeValue;
    static setInputAttrs(editor, grid, input) {
        setInputAttrs(editor, grid, input);
    }
    constructor() {
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_1__.EventHandler();
        this._dialog = createDialogElement();
        this._input = this._dialog.querySelector(`.${INPUT_CLASSNAME}`);
        this._bindDialogEvents();
    }
    dispose() {
        const dialog = this._dialog;
        this.detach();
        this._handler.dispose();
        delete this._dialog;
        delete this._input;
        this._beforePropEditor = null;
        if (dialog.parentElement) {
            dialog.parentElement.removeChild(dialog);
        }
    }
    attach(grid, editor, col, row, value) {
        const handler = this._handler;
        const dialog = this._dialog;
        const input = this._input;
        if (this._beforePropEditor) {
            unbindProps(grid, dialog, input, this._beforePropEditor);
        }
        delete dialog.dataset.errorMessage;
        dialog.classList.remove(SHOWN_CLASSNAME);
        dialog.classList.add(HIDDEN_CLASSNAME);
        input.readOnly = true;
        input.tabIndex = 0;
        const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
        dialog.style.top = `${rect.top.toFixed()}px`;
        dialog.style.left = `${rect.left.toFixed()}px`;
        dialog.style.width = `${rect.width.toFixed()}px`;
        input.style.height = `${rect.height.toFixed()}px`;
        element.appendChild(dialog);
        (0,_input_value_handler__WEBPACK_IMPORTED_MODULE_3__.setInputValue)(input, value);
        input.style.font = grid.font || '16px sans-serif';
        const activeData = { grid, col, row, editor };
        this._onInputValue(input, activeData);
        if (!_internal_utils__WEBPACK_IMPORTED_MODULE_0__.browser.IE) {
            _focus(input, handler);
        }
        else {
            // On the paste-event on IE, since it may not be focused, it will be delayed and focused.
            setTimeout(() => _focus(input, handler));
        }
        dialog.classList.add(SHOWN_CLASSNAME);
        dialog.classList.remove(HIDDEN_CLASSNAME);
        input.readOnly = false;
        bindProps(grid, dialog, input, editor);
        this._activeData = activeData;
        this._beforePropEditor = editor;
        this._attaching = true;
        setTimeout(() => {
            delete this._attaching;
        });
    }
    detach(gridFocus) {
        if (this._isActive()) {
            const dialog = this._dialog;
            const input = this._input;
            dialog.classList.remove(SHOWN_CLASSNAME);
            dialog.classList.add(HIDDEN_CLASSNAME);
            input.readOnly = true;
            input.tabIndex = -1;
            const { grid, col, row } = this._activeData;
            const range = grid.getCellRange(col, row);
            grid.invalidateCellRange(range);
            if (gridFocus) {
                grid.focus();
            }
        }
        this._activeData = null;
        this._beforeValue = null;
    }
    _doChangeValue() {
        if (!this._isActive()) {
            return false;
        }
        const input = this._input;
        const { value } = input;
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(this._validate(value), (res) => {
            if (res && value === input.value) {
                const { grid, col, row } = this._activeData;
                grid.doChangeValue(col, row, () => value);
                return true;
            }
            return false;
        });
    }
    _isActive() {
        const dialog = this._dialog;
        if (!dialog || !dialog.parentElement) {
            return false;
        }
        if (!this._activeData) {
            return false;
        }
        return true;
    }
    _bindDialogEvents() {
        const handler = this._handler;
        const dialog = this._dialog;
        const input = this._input;
        const stopPropagationOnly = (e) => e.stopPropagation(); // gridにイベントが伝播しないように
        handler.on(dialog, 'click', stopPropagationOnly);
        handler.on(dialog, 'dblclick', stopPropagationOnly);
        handler.on(dialog, 'mousedown', stopPropagationOnly);
        handler.on(dialog, 'touchstart', stopPropagationOnly);
        handler.on(input, 'compositionstart', (_e) => {
            input.classList.add('composition');
        });
        handler.on(input, 'compositionend', (_e) => {
            input.classList.remove('composition');
            this._onInputValue(input);
        });
        const onKeyupAndPress = (_e) => {
            if (input.classList.contains('composition')) {
                return;
            }
            this._onInputValue(input);
        };
        handler.on(input, 'keyup', onKeyupAndPress);
        handler.on(input, 'keypress', onKeyupAndPress);
        handler.on(input, 'keydown', (e) => {
            if (input.classList.contains('composition')) {
                return;
            }
            const keyCode = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.getKeyCode(e);
            if (keyCode === KEY_ESC) {
                this.detach(true);
                _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e);
            }
            else if (keyCode === KEY_ENTER) {
                this._onKeydownEnter(e);
            }
            else {
                this._onInputValue(input);
            }
        });
    }
    _onKeydownEnter(e) {
        if (this._attaching) {
            return;
        }
        const input = this._input;
        const { value } = input;
        (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(this._doChangeValue(), (r) => {
            if (r && value === input.value) {
                const grid = this._isActive() ? this._activeData.grid : null;
                this.detach(true);
                if (grid?.keyboardOptions?.moveCellOnEnter) {
                    grid.onKeyDownMove(e);
                }
            }
        });
        _internal_utils__WEBPACK_IMPORTED_MODULE_0__.event.cancel(e);
    }
    _onInputValue(input, activeData) {
        const before = this._beforeValue;
        const { value } = input;
        if (before !== value) {
            this._onInputValueChange(value, activeData);
        }
        this._beforeValue = value;
    }
    _onInputValueChange(after, activeData) {
        activeData = (activeData || this._activeData);
        const dialog = this._dialog;
        const { grid, col, row, editor } = activeData;
        if (typeof editor.helperText === 'function') {
            const helperText = editor.helperText(after, { grid, col, row });
            if (helperText) {
                dialog.dataset.helperText = helperText;
            }
            else {
                delete dialog.dataset.helperText;
            }
        }
        if ('errorMessage' in dialog.dataset) {
            this._validate(after, true);
        }
    }
    _validate(value, inputOnly) {
        const dialog = this._dialog;
        const input = this._input;
        const { grid, col, row, editor } = this._activeData;
        let message = '';
        if (editor.inputValidator) {
            message = editor.inputValidator(value, { grid, col, row });
        }
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(message, (message) => {
            if (!message && editor.validator && !inputOnly) {
                message = editor.validator(value, { grid, col, row });
            }
            return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(message, (message) => {
                if (message && value === input.value) {
                    dialog.dataset.errorMessage = message;
                }
                else {
                    delete dialog.dataset.errorMessage;
                }
                return !message;
            });
        });
    }
}


/***/ }),

/***/ "./src/columns/action/internal/input-value-handler.ts":
/*!************************************************************!*\
  !*** ./src/columns/action/internal/input-value-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setInputValue": () => (/* binding */ setInputValue)
/* harmony export */ });
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../internal/EventHandler */ "./src/internal/EventHandler.ts");

function setInputValue(input, value) {
    const sign = input.type === 'number' && value === '-';
    if (sign) {
        // When `type="number"`, the minus sign is not accepted, so change it to `type="text"` once.
        input.type = '';
        let handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler();
        const dispose = () => {
            if (handler) {
                handler.dispose();
                handler = null;
            }
        };
        handler.once(input, 'input', (_e) => {
            input.type = 'number';
            dispose();
        });
        handler.once(input, 'blur', (_e) => {
            dispose();
        });
    }
    input.value = value ?? '';
}


/***/ }),

/***/ "./src/columns/message/BaseMessage.ts":
/*!********************************************!*\
  !*** ./src/columns/message/BaseMessage.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseMessage": () => (/* binding */ BaseMessage)
/* harmony export */ });
class BaseMessage {
    _grid;
    _messageElement = null;
    constructor(grid) {
        this._grid = grid;
    }
    dispose() {
        this.detachMessageElement();
        if (this._messageElement) {
            this._messageElement.dispose();
        }
        this._messageElement = null;
    }
    _getMessageElement() {
        return this._messageElement || (this._messageElement = this.createMessageElementInternal());
    }
    attachMessageElement(col, row, message) {
        const messageElement = this._getMessageElement();
        messageElement.attach(this._grid, col, row, message);
    }
    moveMessageElement(col, row) {
        const messageElement = this._getMessageElement();
        messageElement.move(this._grid, col, row);
    }
    detachMessageElement() {
        const messageElement = this._getMessageElement();
        messageElement._detach();
    }
    drawCellMessage(message, context, style, helper, grid, info) {
        this.drawCellMessageInternal(message, context, style, helper, grid, info);
    }
}


/***/ }),

/***/ "./src/columns/message/ErrorMessage.ts":
/*!*********************************************!*\
  !*** ./src/columns/message/ErrorMessage.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorMessage": () => (/* binding */ ErrorMessage)
/* harmony export */ });
/* harmony import */ var _messageUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageUtils */ "./src/columns/message/messageUtils.ts");
/* harmony import */ var _BaseMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseMessage */ "./src/columns/message/BaseMessage.ts");
/* harmony import */ var _internal_ErrorMessageElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/ErrorMessageElement */ "./src/columns/message/internal/ErrorMessageElement.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const RED_A100 = '#ff8a80';
class ErrorMessage extends _BaseMessage__WEBPACK_IMPORTED_MODULE_1__.BaseMessage {
    createMessageElementInternal() {
        return new _internal_ErrorMessageElement__WEBPACK_IMPORTED_MODULE_2__.ErrorMessageElement();
    }
    drawCellMessageInternal(_message, context, style, helper, grid, _info) {
        const { bgColor } = style;
        const { select } = context.getSelection();
        if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_3__.cellInRange)(grid.getCellRange(context.col, context.row), select.col, select.row) || !grid.hasFocusGrid()) {
            helper.drawBorderWithClip(context, (ctx) => {
                _messageUtils__WEBPACK_IMPORTED_MODULE_0__.drawExclamationMarkBox(context, {
                    bgColor: helper.getColor(helper.theme.messages.errorBgColor, context.col, context.row, ctx) || RED_A100,
                    color: bgColor
                }, helper);
            });
        }
    }
}


/***/ }),

/***/ "./src/columns/message/InfoMessage.ts":
/*!********************************************!*\
  !*** ./src/columns/message/InfoMessage.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoMessage": () => (/* binding */ InfoMessage)
/* harmony export */ });
/* harmony import */ var _messageUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageUtils */ "./src/columns/message/messageUtils.ts");
/* harmony import */ var _BaseMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseMessage */ "./src/columns/message/BaseMessage.ts");
/* harmony import */ var _internal_MessageElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/MessageElement */ "./src/columns/message/internal/MessageElement.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const GREY_L2 = '#e0e0e0';
class InfoMessage extends _BaseMessage__WEBPACK_IMPORTED_MODULE_1__.BaseMessage {
    createMessageElementInternal() {
        return new _internal_MessageElement__WEBPACK_IMPORTED_MODULE_2__.MessageElement();
    }
    drawCellMessageInternal(_message, context, style, helper, grid, _info) {
        const { bgColor } = style;
        const { select } = context.getSelection();
        if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_3__.cellInRange)(grid.getCellRange(context.col, context.row), select.col, select.row) || !grid.hasFocusGrid()) {
            helper.drawBorderWithClip(context, (ctx) => {
                _messageUtils__WEBPACK_IMPORTED_MODULE_0__.drawInformationMarkBox(context, {
                    bgColor: helper.getColor(helper.theme.messages.infoBgColor, context.col, context.row, ctx) || GREY_L2,
                    color: bgColor
                }, helper);
            });
        }
    }
}


/***/ }),

/***/ "./src/columns/message/MessageHandler.ts":
/*!***********************************************!*\
  !*** ./src/columns/message/MessageHandler.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasMessage": () => (/* binding */ hasMessage),
/* harmony export */   "MessageHandler": () => (/* binding */ MessageHandler)
/* harmony export */ });
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorMessage */ "./src/columns/message/ErrorMessage.ts");
/* harmony import */ var _InfoMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InfoMessage */ "./src/columns/message/InfoMessage.ts");
/* harmony import */ var _list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../list-grid/LG_EVENT_TYPE */ "./src/list-grid/LG_EVENT_TYPE.ts");
/* harmony import */ var _WarningMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WarningMessage */ "./src/columns/message/WarningMessage.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");





const EMPTY_MESSAGE = {
    type: 'error',
    message: null
};
const MESSAGE_INSTANCE_FACTORY = {
    error(grid) {
        return new _ErrorMessage__WEBPACK_IMPORTED_MODULE_0__.ErrorMessage(grid);
    },
    info(grid) {
        return new _InfoMessage__WEBPACK_IMPORTED_MODULE_1__.InfoMessage(grid);
    },
    warning(grid) {
        return new _WarningMessage__WEBPACK_IMPORTED_MODULE_3__.WarningMessage(grid);
    }
};
function normalizeMessage(message) {
    if (!message || (0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isPromise)(message)) {
        return EMPTY_MESSAGE;
    }
    if (typeof message === 'string') {
        return {
            type: 'error',
            message,
            original: message
        };
    }
    const type = message.type || 'error';
    if (type && type in MESSAGE_INSTANCE_FACTORY) {
        return {
            type: type.toLowerCase(),
            message: message.message,
            original: message
        };
    }
    return {
        type: 'error',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: `${message}`,
        original: message
    };
}
function hasMessage(message) {
    return !!normalizeMessage(message).message;
}
class MessageHandler {
    _grid;
    _messageInstances;
    _attachInfo = null;
    constructor(grid, getMessage) {
        this._grid = grid;
        this._messageInstances = {};
        this._bindGridEvent(grid, getMessage);
    }
    dispose() {
        const messageInstances = this._messageInstances;
        for (const k in messageInstances) {
            messageInstances[k]?.dispose();
        }
        delete this._messageInstances;
        delete this._attachInfo;
    }
    drawCellMessage(message, context, style, helper, grid, info) {
        if (!hasMessage(message)) {
            return;
        }
        const instance = this._getMessageInstanceOfMessage(message);
        instance.drawCellMessage(normalizeMessage(message), context, style, helper, grid, info);
    }
    _attach(col, row, message) {
        const info = this._attachInfo;
        const instance = this._getMessageInstanceOfMessage(message);
        if (info && info.instance !== instance) {
            info.instance.detachMessageElement();
        }
        instance.attachMessageElement(col, row, normalizeMessage(message));
        this._attachInfo = { col, row, instance };
    }
    _move(col, row) {
        const info = this._attachInfo;
        if (!info || info.col !== col || info.row !== row) {
            return;
        }
        const { instance } = info;
        instance.moveMessageElement(col, row);
    }
    _detach() {
        const info = this._attachInfo;
        if (!info) {
            return;
        }
        const { instance } = info;
        instance.detachMessageElement();
        this._attachInfo = null;
    }
    _bindGridEvent(grid, getMessage) {
        const onSelectMessage = (sel) => {
            const setMessageData = (msg) => {
                if (!hasMessage(msg)) {
                    this._detach();
                }
                else {
                    this._attach(sel.col, sel.row, msg);
                }
            };
            const message = getMessage(sel.col, sel.row);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isPromise)(message)) {
                this._detach();
                message.then((msg) => {
                    const newSel = grid.selection.select;
                    if (newSel.col !== sel.col || newSel.row !== sel.row) {
                        return;
                    }
                    setMessageData(msg);
                });
                return;
            }
            setMessageData(message);
        };
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.LG_EVENT_TYPE.SELECTED_CELL, (e) => {
            if (!e.selected) {
                return;
            }
            if (e.before.col === e.col && e.before.row === e.row) {
                return;
            }
            onSelectMessage(e);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.LG_EVENT_TYPE.SCROLL, () => {
            const sel = grid.selection.select;
            this._move(sel.col, sel.row);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.LG_EVENT_TYPE.CHANGED_VALUE, (e) => {
            const sel = grid.selection.select;
            if (sel.col !== e.col || sel.row !== e.row) {
                return;
            }
            onSelectMessage(e);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.LG_EVENT_TYPE.FOCUS_GRID, (_e) => {
            const sel = grid.selection.select;
            onSelectMessage(sel);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_2__.LG_EVENT_TYPE.BLUR_GRID, (_e) => {
            this._detach();
        });
    }
    _getMessageInstanceOfMessage(message) {
        const messageInstances = this._messageInstances;
        const { type } = normalizeMessage(message);
        return messageInstances[type] || (messageInstances[type] = MESSAGE_INSTANCE_FACTORY[type](this._grid));
    }
}


/***/ }),

/***/ "./src/columns/message/WarningMessage.ts":
/*!***********************************************!*\
  !*** ./src/columns/message/WarningMessage.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningMessage": () => (/* binding */ WarningMessage)
/* harmony export */ });
/* harmony import */ var _messageUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageUtils */ "./src/columns/message/messageUtils.ts");
/* harmony import */ var _BaseMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseMessage */ "./src/columns/message/BaseMessage.ts");
/* harmony import */ var _internal_WarningMessageElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/WarningMessageElement */ "./src/columns/message/internal/WarningMessageElement.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const DEEP_ORANGE_A100 = '#ff9e80';
class WarningMessage extends _BaseMessage__WEBPACK_IMPORTED_MODULE_1__.BaseMessage {
    createMessageElementInternal() {
        return new _internal_WarningMessageElement__WEBPACK_IMPORTED_MODULE_2__.WarningMessageElement();
    }
    drawCellMessageInternal(_message, context, style, helper, grid, _info) {
        const { bgColor } = style;
        const { select } = context.getSelection();
        if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_3__.cellInRange)(grid.getCellRange(context.col, context.row), select.col, select.row) || !grid.hasFocusGrid()) {
            helper.drawBorderWithClip(context, (ctx) => {
                _messageUtils__WEBPACK_IMPORTED_MODULE_0__.drawExclamationMarkBox(context, {
                    bgColor: helper.getColor(helper.theme.messages.warnBgColor, context.col, context.row, ctx) || DEEP_ORANGE_A100,
                    color: bgColor
                }, helper);
            });
        }
    }
}


/***/ }),

/***/ "./src/columns/message/internal/ErrorMessageElement.ts":
/*!*************************************************************!*\
  !*** ./src/columns/message/internal/ErrorMessageElement.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorMessageElement": () => (/* binding */ ErrorMessageElement)
/* harmony export */ });
/* harmony import */ var _MessageElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageElement */ "./src/columns/message/internal/MessageElement.ts");
/* harmony import */ var _ErrorMessageElement_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorMessageElement.css */ "./src/columns/message/internal/ErrorMessageElement.css");

const CLASSNAME = 'cheetah-grid__error-message-element';
const MESSAGE_CLASSNAME = `${CLASSNAME}__message`;

class ErrorMessageElement extends _MessageElement__WEBPACK_IMPORTED_MODULE_0__.MessageElement {
    constructor() {
        super();
        // require('@/columns/message/internal/ErrorMessageElement.css')
        this._rootElement.classList.add(CLASSNAME);
        this._messageElement.classList.add(MESSAGE_CLASSNAME);
    }
}


/***/ }),

/***/ "./src/columns/message/internal/MessageElement.ts":
/*!********************************************************!*\
  !*** ./src/columns/message/internal/MessageElement.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageElement": () => (/* binding */ MessageElement)
/* harmony export */ });
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _internal_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../internal/dom */ "./src/internal/dom.ts");
/* harmony import */ var _MessageElement_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageElement.css */ "./src/columns/message/internal/MessageElement.css");


const CLASSNAME = 'cheetah-grid__message-element';
const MESSAGE_CLASSNAME = `${CLASSNAME}__message`;
const HIDDEN_CLASSNAME = `${CLASSNAME}--hidden`;
const SHOWN_CLASSNAME = `${CLASSNAME}--shown`;

function createMessageDomElement() {
    // require("@/columns/message/internal/MessageElement.css");
    const rootElement = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        classList: [CLASSNAME, HIDDEN_CLASSNAME]
    });
    const messageElement = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', {
        classList: [MESSAGE_CLASSNAME]
    });
    rootElement.appendChild(messageElement);
    return rootElement;
}
class MessageElement {
    _handler;
    _rootElement;
    _messageElement;
    constructor() {
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler();
        const rootElement = (this._rootElement = createMessageDomElement());
        this._messageElement = rootElement.querySelector(`.${MESSAGE_CLASSNAME}`);
    }
    dispose() {
        this.detach();
        this._handler.dispose();
        delete this._rootElement;
        delete this._messageElement;
    }
    attach(grid, col, row, message) {
        const rootElement = this._rootElement;
        const messageElement = this._messageElement;
        rootElement.classList.remove(SHOWN_CLASSNAME);
        rootElement.classList.add(HIDDEN_CLASSNAME);
        if (this._attachCell(grid, col, row)) {
            rootElement.classList.add(SHOWN_CLASSNAME);
            rootElement.classList.remove(HIDDEN_CLASSNAME);
            messageElement.textContent = message.message;
        }
        else {
            this._detach();
        }
    }
    move(grid, col, row) {
        const rootElement = this._rootElement;
        if (this._attachCell(grid, col, row)) {
            rootElement.classList.add(SHOWN_CLASSNAME);
            rootElement.classList.remove(HIDDEN_CLASSNAME);
        }
        else {
            this._detach();
        }
    }
    detach() {
        this._detach();
    }
    _detach() {
        const rootElement = this._rootElement;
        if (rootElement.parentElement) {
            rootElement.parentElement.removeChild(rootElement);
            rootElement.classList.remove(SHOWN_CLASSNAME);
            rootElement.classList.add(HIDDEN_CLASSNAME);
        }
    }
    _attachCell(grid, col, row) {
        const rootElement = this._rootElement;
        const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
        const { bottom: top, left, width } = rect;
        const { frozenRowCount, frozenColCount } = grid;
        if (row >= frozenRowCount && frozenRowCount > 0) {
            const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1));
            if (top < frozenRect.bottom) {
                return false; //範囲外
            }
        }
        else {
            if (top < 0) {
                return false; //範囲外
            }
        }
        if (col >= frozenColCount && frozenColCount > 0) {
            const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row));
            if (left < frozenRect.right) {
                return false; //範囲外
            }
        }
        else {
            if (left < 0) {
                return false; //範囲外
            }
        }
        const { offsetHeight, offsetWidth } = element;
        if (offsetHeight < top) {
            return false; //範囲外
        }
        if (offsetWidth < left) {
            return false; //範囲外
        }
        rootElement.style.top = `${top.toFixed()}px`;
        rootElement.style.left = `${left.toFixed()}px`;
        rootElement.style.width = `${width.toFixed()}px`;
        if (rootElement.parentElement !== element) {
            element.appendChild(rootElement);
        }
        return true;
    }
}


/***/ }),

/***/ "./src/columns/message/internal/WarningMessageElement.ts":
/*!***************************************************************!*\
  !*** ./src/columns/message/internal/WarningMessageElement.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningMessageElement": () => (/* binding */ WarningMessageElement)
/* harmony export */ });
/* harmony import */ var _MessageElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageElement */ "./src/columns/message/internal/MessageElement.ts");
/* harmony import */ var _WarningMessageElement_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WarningMessageElement.css */ "./src/columns/message/internal/WarningMessageElement.css");

const CLASSNAME = 'cheetah-grid__warning-message-element';
const MESSAGE_CLASSNAME = `${CLASSNAME}__message`;

class WarningMessageElement extends _MessageElement__WEBPACK_IMPORTED_MODULE_0__.MessageElement {
    constructor() {
        super();
        // require("@/columns/message/internal/WarningMessageElement.css");
        this._rootElement.classList.add(CLASSNAME);
        this._messageElement.classList.add(MESSAGE_CLASSNAME);
    }
}


/***/ }),

/***/ "./src/columns/message/messageUtils.ts":
/*!*********************************************!*\
  !*** ./src/columns/message/messageUtils.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawExclamationMarkBox": () => (/* binding */ drawExclamationMarkBox),
/* harmony export */   "drawInformationMarkBox": () => (/* binding */ drawInformationMarkBox)
/* harmony export */ });
/* harmony import */ var _internal_Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/Rect */ "./src/internal/Rect.ts");

function drawExclamationMarkBox(context, style, helper) {
    const { bgColor, color } = style;
    const ctx = context.getContext();
    const rect = context.getRect();
    // draw box
    ctx.fillStyle = bgColor;
    const boxRect = rect.copy();
    boxRect.left = boxRect.right - 24;
    ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
    // draw exclamation mark
    const fillColor = color;
    const height = 20;
    const width = height / 5;
    const left = boxRect.left + (boxRect.width - width) / 2;
    const top = boxRect.top + (boxRect.height - height) / 2;
    helper.fillRectWithState(new _internal_Rect__WEBPACK_IMPORTED_MODULE_0__.Rect(left, top, width, (height / 5) * 3), context, { fillColor });
    helper.fillRectWithState(new _internal_Rect__WEBPACK_IMPORTED_MODULE_0__.Rect(left, top + (height / 5) * 4, width, height / 5), context, { fillColor });
}
function drawInformationMarkBox(context, style, helper) {
    const { bgColor, color } = style;
    const ctx = context.getContext();
    const rect = context.getRect();
    // draw box
    ctx.fillStyle = bgColor;
    const boxRect = rect.copy();
    boxRect.left = boxRect.right - 24;
    ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
    // draw i mark
    const fillColor = color;
    const height = 20;
    const width = height / 5;
    const left = boxRect.left + (boxRect.width - width) / 2;
    const top = boxRect.top + (boxRect.height - height) / 2;
    helper.fillRectWithState(new _internal_Rect__WEBPACK_IMPORTED_MODULE_0__.Rect(left, top, width, height / 5), context, {
        fillColor
    });
    helper.fillRectWithState(new _internal_Rect__WEBPACK_IMPORTED_MODULE_0__.Rect(left, top + (height / 5) * 2, width, (height / 5) * 3), context, { fillColor });
}


/***/ }),

/***/ "./src/columns/style.ts":
/*!******************************!*\
  !*** ./src/columns/style.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_TYPE": () => (/* binding */ EVENT_TYPE),
/* harmony export */   "BaseStyle": () => (/* reexport safe */ _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle),
/* harmony export */   "Style": () => (/* reexport safe */ _style_Style__WEBPACK_IMPORTED_MODULE_10__.Style),
/* harmony export */   "NumberStyle": () => (/* reexport safe */ _style_NumberStyle__WEBPACK_IMPORTED_MODULE_7__.NumberStyle),
/* harmony export */   "CheckStyle": () => (/* reexport safe */ _style_CheckStyle__WEBPACK_IMPORTED_MODULE_2__.CheckStyle),
/* harmony export */   "RadioStyle": () => (/* reexport safe */ _style_RadioStyle__WEBPACK_IMPORTED_MODULE_9__.RadioStyle),
/* harmony export */   "ButtonStyle": () => (/* reexport safe */ _style_ButtonStyle__WEBPACK_IMPORTED_MODULE_1__.ButtonStyle),
/* harmony export */   "ImageStyle": () => (/* reexport safe */ _style_ImageStyle__WEBPACK_IMPORTED_MODULE_4__.ImageStyle),
/* harmony export */   "IconStyle": () => (/* reexport safe */ _style_IconStyle__WEBPACK_IMPORTED_MODULE_3__.IconStyle),
/* harmony export */   "PercentCompleteBarStyle": () => (/* reexport safe */ _style_PercentCompleteBarStyle__WEBPACK_IMPORTED_MODULE_8__.PercentCompleteBarStyle),
/* harmony export */   "MultilineTextStyle": () => (/* reexport safe */ _style_MultilineTextStyle__WEBPACK_IMPORTED_MODULE_6__.MultilineTextStyle),
/* harmony export */   "MenuStyle": () => (/* reexport safe */ _style_MenuStyle__WEBPACK_IMPORTED_MODULE_5__.MenuStyle),
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/BaseStyle */ "./src/columns/style/BaseStyle.ts");
/* harmony import */ var _style_ButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/ButtonStyle */ "./src/columns/style/ButtonStyle.ts");
/* harmony import */ var _style_CheckStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/CheckStyle */ "./src/columns/style/CheckStyle.ts");
/* harmony import */ var _style_IconStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/IconStyle */ "./src/columns/style/IconStyle.ts");
/* harmony import */ var _style_ImageStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/ImageStyle */ "./src/columns/style/ImageStyle.ts");
/* harmony import */ var _style_MenuStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style/MenuStyle */ "./src/columns/style/MenuStyle.ts");
/* harmony import */ var _style_MultilineTextStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style/MultilineTextStyle */ "./src/columns/style/MultilineTextStyle.ts");
/* harmony import */ var _style_NumberStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style/NumberStyle */ "./src/columns/style/NumberStyle.ts");
/* harmony import */ var _style_PercentCompleteBarStyle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style/PercentCompleteBarStyle */ "./src/columns/style/PercentCompleteBarStyle.ts");
/* harmony import */ var _style_RadioStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style/RadioStyle */ "./src/columns/style/RadioStyle.ts");
/* harmony import */ var _style_Style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style/Style */ "./src/columns/style/Style.ts");











const { EVENT_TYPE } = _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle;

function of(columnStyle, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
record, StyleClassDef = _style_Style__WEBPACK_IMPORTED_MODULE_10__.Style) {
    if (columnStyle) {
        if (columnStyle instanceof _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle) {
            return columnStyle;
        }
        else if (typeof columnStyle === 'function') {
            return of(columnStyle(record), record, StyleClassDef);
        }
        else if (record && columnStyle in record) {
            return of(record[columnStyle], record, StyleClassDef);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new StyleClassDef(columnStyle);
    }
    else {
        return StyleClassDef.DEFAULT;
    }
}


/***/ }),

/***/ "./src/columns/style/BaseStyle.ts":
/*!****************************************!*\
  !*** ./src/columns/style/BaseStyle.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseStyle": () => (/* binding */ BaseStyle)
/* harmony export */ });
/* harmony import */ var _core_EventTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/EventTarget */ "./src/core/EventTarget.ts");

const STYLE_EVENT_TYPE = {
    CHANGE_STYLE: 'change_style'
};
let defaultStyle;
class BaseStyle extends _core_EventTarget__WEBPACK_IMPORTED_MODULE_0__.EventTarget {
    _bgColor;
    static get EVENT_TYPE() {
        return STYLE_EVENT_TYPE;
    }
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new BaseStyle());
    }
    constructor({ bgColor } = {}) {
        super();
        this._bgColor = bgColor;
    }
    get bgColor() {
        return this._bgColor;
    }
    set bgColor(bgColor) {
        this._bgColor = bgColor;
        this.doChangeStyle();
    }
    doChangeStyle() {
        this.fireListeners(STYLE_EVENT_TYPE.CHANGE_STYLE);
    }
    clone() {
        return new BaseStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/BranchGraphStyle.ts":
/*!***********************************************!*\
  !*** ./src/columns/style/BranchGraphStyle.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BranchGraphStyle": () => (/* binding */ BranchGraphStyle)
/* harmony export */ });
/* harmony import */ var _BaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseStyle */ "./src/columns/style/BaseStyle.ts");

let defaultStyle;
const DEFAULT_BRANCH_COLORS = (_name, index) => {
    switch (index % 3) {
        case 0:
            return '#979797';
        case 1:
            return '#008fb5';
        case 2:
            return '#f1c109';
        default:
    }
    return '#979797';
};
class BranchGraphStyle extends _BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle {
    _branchColors;
    _margin;
    _circleSize;
    _branchLineWidth;
    _mergeStyle;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new BranchGraphStyle());
    }
    constructor(style = {}) {
        super(style);
        this._branchColors = style.branchColors || DEFAULT_BRANCH_COLORS;
        this._margin = style.margin || 4;
        this._circleSize = style.circleSize || 16;
        this._branchLineWidth = style.branchLineWidth || 4;
        this._mergeStyle = style.mergeStyle === 'straight' ? 'straight' : 'bezier';
    }
    get branchColors() {
        return this._branchColors;
    }
    set branchColors(branchColors) {
        this._branchColors = branchColors;
        this.doChangeStyle();
    }
    get margin() {
        return this._margin;
    }
    set margin(margin) {
        this._margin = margin;
        this.doChangeStyle();
    }
    get circleSize() {
        return this._circleSize;
    }
    set circleSize(circleSize) {
        this._circleSize = circleSize;
        this.doChangeStyle();
    }
    get branchLineWidth() {
        return this._branchLineWidth;
    }
    set branchLineWidth(branchLineWidth) {
        this._branchLineWidth = branchLineWidth;
        this.doChangeStyle();
    }
    get mergeStyle() {
        return this._mergeStyle;
    }
    set mergeStyle(mergeStyle) {
        this._mergeStyle = mergeStyle;
        this.doChangeStyle();
    }
    clone() {
        return new BranchGraphStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/ButtonStyle.ts":
/*!******************************************!*\
  !*** ./src/columns/style/ButtonStyle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonStyle": () => (/* binding */ ButtonStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class ButtonStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _buttonBgColor;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new ButtonStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
        const { buttonBgColor } = style;
        this._buttonBgColor = buttonBgColor;
    }
    get buttonBgColor() {
        return this._buttonBgColor;
    }
    set buttonBgColor(buttonBgColor) {
        this._buttonBgColor = buttonBgColor;
        this.doChangeStyle();
    }
    clone() {
        return new ButtonStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/CheckStyle.ts":
/*!*****************************************!*\
  !*** ./src/columns/style/CheckStyle.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckStyle": () => (/* binding */ CheckStyle)
/* harmony export */ });
/* harmony import */ var _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StdBaseStyle */ "./src/columns/style/StdBaseStyle.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class CheckStyle extends _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__.StdBaseStyle {
    _uncheckBgColor;
    _checkBgColor;
    _borderColor;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new CheckStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
        const { uncheckBgColor, checkBgColor, borderColor } = style;
        this._uncheckBgColor = uncheckBgColor;
        this._checkBgColor = checkBgColor;
        this._borderColor = borderColor;
    }
    get uncheckBgColor() {
        return this._uncheckBgColor;
    }
    set uncheckBgColor(uncheckBgColor) {
        this._uncheckBgColor = uncheckBgColor;
        this.doChangeStyle();
    }
    get checkBgColor() {
        return this._checkBgColor;
    }
    set checkBgColor(checkBgColor) {
        this._checkBgColor = checkBgColor;
        this.doChangeStyle();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(borderColor) {
        this._borderColor = borderColor;
        this.doChangeStyle();
    }
    clone() {
        return new CheckStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/IconStyle.ts":
/*!****************************************!*\
  !*** ./src/columns/style/IconStyle.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconStyle": () => (/* binding */ IconStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class IconStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new IconStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
    }
    clone() {
        return new IconStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/ImageStyle.ts":
/*!*****************************************!*\
  !*** ./src/columns/style/ImageStyle.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageStyle": () => (/* binding */ ImageStyle)
/* harmony export */ });
/* harmony import */ var _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StdBaseStyle */ "./src/columns/style/StdBaseStyle.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class ImageStyle extends _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__.StdBaseStyle {
    _imageSizing;
    _margin;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new ImageStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
        this._imageSizing = style.imageSizing;
        this._margin = style.margin || 4;
    }
    get imageSizing() {
        return this._imageSizing;
    }
    set imageSizing(imageSizing) {
        this._imageSizing = imageSizing;
        this.doChangeStyle();
    }
    get margin() {
        return this._margin;
    }
    set margin(margin) {
        this._margin = margin;
        this.doChangeStyle();
    }
    clone() {
        return new ImageStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/MenuStyle.ts":
/*!****************************************!*\
  !*** ./src/columns/style/MenuStyle.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuStyle": () => (/* binding */ MenuStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");

let defaultStyle;
class MenuStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _appearance;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new MenuStyle());
    }
    constructor(style = {}) {
        super(style);
        const { appearance } = style;
        this._appearance = appearance;
    }
    get appearance() {
        return this._appearance || 'menulist-button';
    }
    set appearance(appearance) {
        this._appearance = appearance;
        this.doChangeStyle();
    }
    clone() {
        return new MenuStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/MultilineTextStyle.ts":
/*!*************************************************!*\
  !*** ./src/columns/style/MultilineTextStyle.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultilineTextStyle": () => (/* binding */ MultilineTextStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class MultilineTextStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _lineHeight;
    _autoWrapText;
    _lineClamp;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new MultilineTextStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textBaseline: 'top' }));
        this._lineHeight = style.lineHeight || '1em';
        this._autoWrapText = style.autoWrapText || false;
        this._lineClamp = style.lineClamp;
    }
    clone() {
        return new MultilineTextStyle(this);
    }
    get lineHeight() {
        return this._lineHeight;
    }
    set lineHeight(lineHeight) {
        this._lineHeight = lineHeight;
        this.doChangeStyle();
    }
    get lineClamp() {
        return this._lineClamp;
    }
    set lineClamp(lineClamp) {
        this._lineClamp = lineClamp;
        this.doChangeStyle();
    }
    get autoWrapText() {
        return this._autoWrapText;
    }
    set autoWrapText(autoWrapText) {
        this._autoWrapText = autoWrapText;
        this.doChangeStyle();
    }
}


/***/ }),

/***/ "./src/columns/style/NumberStyle.ts":
/*!******************************************!*\
  !*** ./src/columns/style/NumberStyle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberStyle": () => (/* binding */ NumberStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class NumberStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new NumberStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'right' }));
    }
    clone() {
        return new NumberStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/PercentCompleteBarStyle.ts":
/*!******************************************************!*\
  !*** ./src/columns/style/PercentCompleteBarStyle.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PercentCompleteBarStyle": () => (/* binding */ PercentCompleteBarStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/columns/style/Style.ts");

let defaultStyle;
const DEFAULT_BAR_COLOR = (num) => {
    if (num > 80) {
        return '#20a8d8';
    }
    if (num > 50) {
        return '#4dbd74';
    }
    if (num > 20) {
        return '#ffc107';
    }
    return '#f86c6b';
};
class PercentCompleteBarStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _barColor;
    _barBgColor;
    _barHeight;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new PercentCompleteBarStyle());
    }
    constructor(style = {}) {
        super(style);
        this._barColor = style.barColor || DEFAULT_BAR_COLOR;
        this._barBgColor = style.barBgColor || '#f0f3f5';
        this._barHeight = style.barHeight || 3;
    }
    get barColor() {
        return this._barColor;
    }
    set barColor(barColor) {
        this._barColor = barColor;
        this.doChangeStyle();
    }
    get barBgColor() {
        return this._barBgColor;
    }
    set barBgColor(barBgColor) {
        this._barBgColor = barBgColor;
        this.doChangeStyle();
    }
    get barHeight() {
        return this._barHeight;
    }
    set barHeight(barHeight) {
        this._barHeight = barHeight;
        this.doChangeStyle();
    }
    clone() {
        return new PercentCompleteBarStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/RadioStyle.ts":
/*!*****************************************!*\
  !*** ./src/columns/style/RadioStyle.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioStyle": () => (/* binding */ RadioStyle)
/* harmony export */ });
/* harmony import */ var _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StdBaseStyle */ "./src/columns/style/StdBaseStyle.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class RadioStyle extends _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__.StdBaseStyle {
    _checkColor;
    _uncheckBorderColor;
    _checkBorderColor;
    _uncheckBgColor;
    _checkBgColor;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new RadioStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
        const { checkColor, uncheckBorderColor, checkBorderColor, uncheckBgColor, checkBgColor } = style;
        this._checkColor = checkColor;
        this._uncheckBorderColor = uncheckBorderColor;
        this._checkBorderColor = checkBorderColor;
        this._uncheckBgColor = uncheckBgColor;
        this._checkBgColor = checkBgColor;
    }
    get checkColor() {
        return this._checkColor;
    }
    set checkColor(checkColor) {
        this._checkColor = checkColor;
        this.doChangeStyle();
    }
    get uncheckBorderColor() {
        return this._uncheckBorderColor;
    }
    set uncheckBorderColor(uncheckBorderColor) {
        this._uncheckBorderColor = uncheckBorderColor;
        this.doChangeStyle();
    }
    get checkBorderColor() {
        return this._checkBorderColor;
    }
    set checkBorderColor(checkBorderColor) {
        this._checkBorderColor = checkBorderColor;
        this.doChangeStyle();
    }
    get uncheckBgColor() {
        return this._uncheckBgColor;
    }
    set uncheckBgColor(uncheckBgColor) {
        this._uncheckBgColor = uncheckBgColor;
        this.doChangeStyle();
    }
    get checkBgColor() {
        return this._checkBgColor;
    }
    set checkBgColor(checkBgColor) {
        this._checkBgColor = checkBgColor;
        this.doChangeStyle();
    }
    clone() {
        return new RadioStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/StdBaseStyle.ts":
/*!*******************************************!*\
  !*** ./src/columns/style/StdBaseStyle.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StdBaseStyle": () => (/* binding */ StdBaseStyle)
/* harmony export */ });
/* harmony import */ var _BaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseStyle */ "./src/columns/style/BaseStyle.ts");

let defaultStyle;
class StdBaseStyle extends _BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle {
    _textAlign;
    _textBaseline;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new StdBaseStyle());
    }
    constructor(style = {}) {
        super(style);
        this._textAlign = style.textAlign || 'left';
        this._textBaseline = style.textBaseline || 'middle';
    }
    get textAlign() {
        return this._textAlign;
    }
    set textAlign(textAlign) {
        this._textAlign = textAlign;
        this.doChangeStyle();
    }
    get textBaseline() {
        return this._textBaseline;
    }
    set textBaseline(textBaseline) {
        this._textBaseline = textBaseline;
        this.doChangeStyle();
    }
    clone() {
        return new StdBaseStyle(this);
    }
}


/***/ }),

/***/ "./src/columns/style/Style.ts":
/*!************************************!*\
  !*** ./src/columns/style/Style.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Style": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StdBaseStyle */ "./src/columns/style/StdBaseStyle.ts");

let defaultStyle;
class Style extends _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__.StdBaseStyle {
    _color;
    _font;
    _padding;
    _textOverflow;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new Style());
    }
    constructor(style = {}) {
        super(style);
        this._color = style.color;
        this._font = style.font;
        this._padding = style.padding;
        this._textOverflow = style.textOverflow || 'clip';
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
        this.doChangeStyle();
    }
    get font() {
        return this._font;
    }
    set font(font) {
        this._font = font;
        this.doChangeStyle();
    }
    get padding() {
        return this._padding;
    }
    set padding(padding) {
        this._padding = padding;
        this.doChangeStyle();
    }
    get textOverflow() {
        return this._textOverflow;
    }
    set textOverflow(textOverflow) {
        this._textOverflow = textOverflow;
        this.doChangeStyle();
    }
    clone() {
        return new Style(this);
    }
}


/***/ }),

/***/ "./src/columns/type.ts":
/*!*****************************!*\
  !*** ./src/columns/type.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPES": () => (/* binding */ TYPES),
/* harmony export */   "Column": () => (/* reexport safe */ _type_Column__WEBPACK_IMPORTED_MODULE_3__.Column),
/* harmony export */   "NumberColumn": () => (/* reexport safe */ _type_NumberColumn__WEBPACK_IMPORTED_MODULE_8__.NumberColumn),
/* harmony export */   "CheckColumn": () => (/* reexport safe */ _type_CheckColumn__WEBPACK_IMPORTED_MODULE_2__.CheckColumn),
/* harmony export */   "RadioColumn": () => (/* reexport safe */ _type_RadioColumn__WEBPACK_IMPORTED_MODULE_10__.RadioColumn),
/* harmony export */   "ButtonColumn": () => (/* reexport safe */ _type_ButtonColumn__WEBPACK_IMPORTED_MODULE_1__.ButtonColumn),
/* harmony export */   "ImageColumn": () => (/* reexport safe */ _type_ImageColumn__WEBPACK_IMPORTED_MODULE_5__.ImageColumn),
/* harmony export */   "PercentCompleteBarColumn": () => (/* reexport safe */ _type_PercentCompleteBarColumn__WEBPACK_IMPORTED_MODULE_9__.PercentCompleteBarColumn),
/* harmony export */   "IconColumn": () => (/* reexport safe */ _type_IconColumn__WEBPACK_IMPORTED_MODULE_4__.IconColumn),
/* harmony export */   "BranchGraphColumn": () => (/* reexport safe */ _type_BranchGraphColumn__WEBPACK_IMPORTED_MODULE_0__.BranchGraphColumn),
/* harmony export */   "MenuColumn": () => (/* reexport safe */ _type_MenuColumn__WEBPACK_IMPORTED_MODULE_6__.MenuColumn),
/* harmony export */   "MultilineTextColumn": () => (/* reexport safe */ _type_MultilineTextColumn__WEBPACK_IMPORTED_MODULE_7__.MultilineTextColumn),
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _type_BranchGraphColumn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type/BranchGraphColumn */ "./src/columns/type/BranchGraphColumn.ts");
/* harmony import */ var _type_ButtonColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type/ButtonColumn */ "./src/columns/type/ButtonColumn.ts");
/* harmony import */ var _type_CheckColumn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/CheckColumn */ "./src/columns/type/CheckColumn.ts");
/* harmony import */ var _type_Column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type/Column */ "./src/columns/type/Column.ts");
/* harmony import */ var _type_IconColumn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./type/IconColumn */ "./src/columns/type/IconColumn.ts");
/* harmony import */ var _type_ImageColumn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type/ImageColumn */ "./src/columns/type/ImageColumn.ts");
/* harmony import */ var _type_MenuColumn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./type/MenuColumn */ "./src/columns/type/MenuColumn.ts");
/* harmony import */ var _type_MultilineTextColumn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./type/MultilineTextColumn */ "./src/columns/type/MultilineTextColumn.ts");
/* harmony import */ var _type_NumberColumn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./type/NumberColumn */ "./src/columns/type/NumberColumn.ts");
/* harmony import */ var _type_PercentCompleteBarColumn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./type/PercentCompleteBarColumn */ "./src/columns/type/PercentCompleteBarColumn.ts");
/* harmony import */ var _type_RadioColumn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./type/RadioColumn */ "./src/columns/type/RadioColumn.ts");











const TYPES = {
    DEFAULT: new _type_Column__WEBPACK_IMPORTED_MODULE_3__.Column(),
    NUMBER: new _type_NumberColumn__WEBPACK_IMPORTED_MODULE_8__.NumberColumn(),
    CHECK: new _type_CheckColumn__WEBPACK_IMPORTED_MODULE_2__.CheckColumn(),
    RADIO: new _type_RadioColumn__WEBPACK_IMPORTED_MODULE_10__.RadioColumn(),
    BUTTON: new _type_ButtonColumn__WEBPACK_IMPORTED_MODULE_1__.ButtonColumn(),
    IMAGE: new _type_ImageColumn__WEBPACK_IMPORTED_MODULE_5__.ImageColumn(),
    MULTILINETEXT: new _type_MultilineTextColumn__WEBPACK_IMPORTED_MODULE_7__.MultilineTextColumn()
};
/**
 * column types
 */

function of(columnType) {
    if (!columnType) {
        return TYPES.DEFAULT;
    }
    else if (typeof columnType === 'string') {
        const key = columnType.toUpperCase();
        return TYPES[key] || of(null);
    }
    else {
        return columnType;
    }
}


/***/ }),

/***/ "./src/columns/type/BaseColumn.ts":
/*!****************************************!*\
  !*** ./src/columns/type/BaseColumn.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseColumn": () => (/* binding */ BaseColumn)
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style */ "./src/columns/style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _style_BaseStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/BaseStyle */ "./src/columns/style/BaseStyle.ts");
/* harmony import */ var _internal_animate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/animate */ "./src/internal/animate.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");





const { setReadonly } = _internal_utils__WEBPACK_IMPORTED_MODULE_1__.obj;
const COLUMN_FADEIN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_4__.getColumnFadeinStateId)();
function isFadeinWhenCallbackInPromise(column, grid) {
    if (column.fadeinWhenCallbackInPromise != null) {
        return column.fadeinWhenCallbackInPromise;
    }
    return !!grid.configure('fadeinWhenCallbackInPromise');
}
function getFadeinState(grid) {
    let state = grid[COLUMN_FADEIN_STATE_ID];
    if (!state) {
        state = { cells: {} };
        setReadonly(grid, COLUMN_FADEIN_STATE_ID, state);
    }
    return state;
}
function _generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase) {
    return (point) => {
        const state = getFadeinState(grid);
        const stateKey = `${row}:${col}`;
        if (point === 1) {
            delete state.cells[stateKey];
        }
        else {
            state.cells[stateKey] = {
                opacity: point
            };
        }
        drawCellBase();
        drawInternal();
        const cellState = state.cells[stateKey];
        if (cellState) {
            //透過するため背景を透過で上書き
            const ctx = context.getContext();
            ctx.globalAlpha = 1 - cellState.opacity;
            try {
                drawCellBase();
            }
            finally {
                ctx.globalAlpha = 1;
            }
        }
    };
}
const fadeinMgr = {
    animate(grid, col, row, context, drawInternal, drawCellBase) {
        // fadein animation
        const state = getFadeinState(grid);
        const activeFadeins = [_generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase)];
        state.activeFadeins = activeFadeins;
        (0,_internal_animate__WEBPACK_IMPORTED_MODULE_3__.animate)(500, (point) => {
            activeFadeins.forEach((f) => f(point));
            if (point === 1) {
                delete state.activeFadeins;
            }
        });
    },
    margeAnimate(grid, col, row, context, drawInternal, drawCellBase) {
        const state = getFadeinState(grid);
        if (state.activeFadeins) {
            state.activeFadeins.push(_generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase));
        }
        else {
            drawInternal();
        }
    }
};
/**
 * 所有columnType基类
 */
class BaseColumn {
    _fadeinWhenCallbackInPromise;
    _transformRecord;
    constructor(option = {}) {
        this.onDrawCell = this.onDrawCell.bind(this); //スコープを固定させる
        this._transformRecord = option.transformRecord;
        //Promiseのcallbackでフェードイン表示する
        this._fadeinWhenCallbackInPromise = option.fadeinWhenCallbackInPromise || false;
    }
    get transformRecord() {
        return this._transformRecord;
    }
    get fadeinWhenCallbackInPromise() {
        return this._fadeinWhenCallbackInPromise;
    }
    get StyleClass() {
        return _style_BaseStyle__WEBPACK_IMPORTED_MODULE_2__.BaseStyle;
    }
    /**
     * 数据格式转换
     * @param value
     * @param cell
     * @param grid
     * @protected
     */
    transformRecordBefore(value, cell, grid) {
        let displayValue = this.convertInternal(value);
        if (this.transformRecord) {
            // @ts-ignore TODO 回调参数签名
            displayValue = this.transformRecord({ value, displayValue, cell, grid });
        }
        return displayValue;
    }
    /**
     * 单元格绘制内容
     * @param cellValue
     * @param info
     * @param context
     * @param grid
     */
    onDrawCell(cellValue, info, context, grid) {
        // 单元格绘制相关信息
        const { style, getRecord, drawCellBase, getCell } = info;
        const helper = grid.getGridCanvasHelper();
        drawCellBase();
        const record = getRecord();
        let promise;
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(record)) {
            promise = record;
        }
        else if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(cellValue)) {
            promise = cellValue;
        }
        else {
            const msg = info.getMessage();
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(msg)) {
                promise = msg;
            }
        }
        //文字描画
        if (promise) {
            const start = Date.now();
            return Promise.all([record, cellValue, promise.then(() => cellValue).then(() => info.getMessage())]).then(({ 0: record, 1: val, 2: message }) => {
                const currentContext = context.toCurrentContext();
                const drawRect = currentContext.getDrawRect();
                if (!drawRect) {
                    return;
                }
                const time = Date.now() - start;
                const drawInternal = () => {
                    const currentContext = context.toCurrentContext();
                    const drawRect = currentContext.getDrawRect();
                    if (!drawRect) {
                        return;
                    }
                    const actStyle = _style__WEBPACK_IMPORTED_MODULE_0__.of(style, record, this.StyleClass);
                    // 绘制内容
                    // this.drawInternal(this.convertInternal(val), currentContext, actStyle, helper, grid, info)
                    this.drawInternal(this.transformRecordBefore(cellValue, getCell(), grid), currentContext, actStyle, helper, grid, info);
                    this.drawMessageInternal(message, currentContext, actStyle, helper, grid, info);
                };
                if (!isFadeinWhenCallbackInPromise(this, grid)) {
                    drawInternal(); //単純な描画
                }
                else {
                    const { col, row } = context;
                    if (time < 80) {
                        //80ms以内のPromiseCallbackは前アニメーションに統合
                        fadeinMgr.margeAnimate(grid, col, row, context, drawInternal, drawCellBase);
                    }
                    else {
                        //アニメーション
                        fadeinMgr.animate(grid, col, row, context, drawInternal, drawCellBase);
                    }
                }
            });
        }
        else {
            const actStyle = _style__WEBPACK_IMPORTED_MODULE_0__.of(style, record, this.StyleClass);
            // this.drawInternal(this.convertInternal(cellValue), context, actStyle, helper, grid, info)
            this.drawInternal(this.transformRecordBefore(cellValue, getCell(), grid), context, actStyle, helper, grid, info);
            this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info);
            //フェードインの場合透過するため背景を透過で上書き
            const { col, row } = context;
            const stateKey = `${col}:${row}`;
            const cellState = grid[COLUMN_FADEIN_STATE_ID]?.cells[stateKey];
            if (cellState) {
                const ctx = context.getContext();
                ctx.globalAlpha = 1 - cellState.opacity;
                try {
                    drawCellBase();
                }
                finally {
                    ctx.globalAlpha = 1;
                }
            }
            return undefined;
        }
    }
    convertInternal(value) {
        return (value != null ? value : '');
    }
    drawMessageInternal(message, context, style, helper, grid, info) {
        info.messageHandler.drawCellMessage(message, context, style, helper, grid, info);
    }
    bindGridEvent(_grid, _cellId) {
        return [];
    }
    getCopyCellValue(value, _grid, _cell) {
        return value;
    }
}


/***/ }),

/***/ "./src/columns/type/BranchGraphColumn.ts":
/*!***********************************************!*\
  !*** ./src/columns/type/BranchGraphColumn.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BranchGraphColumn": () => (/* binding */ BranchGraphColumn)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_BranchGraphStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/BranchGraphStyle */ "./src/columns/style/BranchGraphStyle.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");




const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_3__.getBranchGraphColumnStateId)();
function getAllColumnData(grid, field, callback) {
    const { dataSource } = grid;
    const allData = [];
    let promise;
    for (let index = 0; index < dataSource.length; index++) {
        const data = dataSource.getField(index, field);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(data)) {
            const dataIndex = allData.length;
            allData.push(undefined);
            if (!promise) {
                promise = data.then((d) => {
                    allData[dataIndex] = d;
                });
            }
            else {
                promise = promise.then(() => data).then((d) => {
                    allData[dataIndex] = d;
                });
            }
        }
        else {
            allData.push(data);
        }
    }
    if (promise) {
        promise.then(() => callback(allData));
    }
    else {
        callback(allData);
    }
}
class BranchLine {
    fromIndex;
    toIndex;
    colorIndex;
    point;
    constructor({ fromIndex, toIndex, colorIndex, point }) {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.colorIndex = colorIndex;
        this.point = point;
    }
}
class BranchPoint {
    index;
    commit;
    lines;
    tag;
    constructor({ index, commit = false, lines = [], tag }) {
        this.index = index;
        this.commit = commit;
        this.lines = lines;
        this.tag = tag;
    }
    static mergeLines(lines) {
        const result = lines.filter((l) => l.fromIndex != null && l.toIndex != null);
        const froms = lines.filter((l) => l.fromIndex != null && l.toIndex == null);
        const tos = lines.filter((l) => l.fromIndex == null && l.toIndex != null);
        froms.forEach((f) => {
            for (let i = 0; i < tos.length; i++) {
                const t = tos[i];
                if (t.point) {
                    continue;
                }
                if (f.colorIndex === t.colorIndex) {
                    f.toIndex = t.toIndex;
                    tos.splice(i, 1);
                    break;
                }
            }
            result.push(f);
        });
        return result.concat(tos);
    }
    static merge(a, b) {
        if (!a) {
            return b;
        }
        return new BranchPoint({
            index: a.index,
            commit: a.commit || b.commit,
            lines: BranchPoint.mergeLines(a.lines.concat(b.lines)),
            tag: a.tag || b.tag
        });
    }
}
function joinLine(timeline, branchIndex) {
    const reverse = [...timeline].reverse();
    for (let i = 0; i < reverse.length; i++) {
        const f = reverse[i][branchIndex];
        if (f) {
            f.lines = BranchPoint.mergeLines(f.lines.concat([
                new BranchLine({
                    toIndex: branchIndex,
                    colorIndex: branchIndex
                })
            ]));
            for (let j = 0; j < i; j++) {
                const tl = reverse[j];
                tl[branchIndex] = new BranchPoint({
                    index: branchIndex,
                    lines: [
                        new BranchLine({
                            fromIndex: branchIndex,
                            toIndex: branchIndex,
                            colorIndex: branchIndex
                        })
                    ]
                });
            }
            return true;
        }
    }
    return false;
}
function branch({ timeline, branches }, from, to) {
    const fromIndex = from != null ? branches.indexOf(from) : -1;
    let toIndex = branches.indexOf(to);
    if (toIndex < 0) {
        toIndex = branches.length;
        branches.push(to);
    }
    function findBranchRootIndex() {
        for (let index = timeline.length - 1; index >= 0; index--) {
            const tl = timeline[index];
            const from = tl[fromIndex];
            if (from && from.commit) {
                return index;
            }
        }
        return -1;
    }
    if (fromIndex < 0) {
        return new BranchPoint({
            index: toIndex
        });
    }
    else {
        const fromTargetIndex = findBranchRootIndex();
        if (fromTargetIndex === -1) {
            return null;
        }
        const branchTargetFromIndex = fromTargetIndex + 1;
        const branchPoint = new BranchPoint({
            index: toIndex,
            lines: [
                new BranchLine({
                    fromIndex,
                    colorIndex: toIndex
                })
            ]
        });
        let point;
        let result = null;
        if (branchTargetFromIndex < timeline.length) {
            const targetLine = timeline[branchTargetFromIndex];
            point = targetLine[toIndex] = BranchPoint.merge(targetLine[toIndex], branchPoint);
        }
        else {
            point = branchPoint;
            result = branchPoint;
        }
        const from = timeline[fromTargetIndex][fromIndex];
        from.lines = BranchPoint.mergeLines(from.lines.concat([
            new BranchLine({
                toIndex,
                colorIndex: toIndex,
                point
            })
        ]));
        return result;
    }
}
function commit({ timeline, branches }, name) {
    const index = branches.indexOf(name);
    if (index < 0) {
        return null;
    }
    const result = new BranchPoint({
        index,
        commit: true
    });
    if (joinLine(timeline, index)) {
        result.lines = BranchPoint.mergeLines(result.lines.concat([
            new BranchLine({
                fromIndex: index,
                colorIndex: index
            })
        ]));
    }
    return result;
}
function commitTag({ branches }, name, tag) {
    let index = branches.indexOf(name);
    if (index < 0) {
        index = branches.length;
        branches.push(name);
    }
    return new BranchPoint({
        index,
        tag
    });
}
function commitMerge({ timeline, branches }, from, to) {
    const fromIndex = branches.indexOf(from);
    const toIndex = branches.indexOf(to);
    if (toIndex < 0 || fromIndex < 0) {
        return new BranchPoint({
            index: toIndex,
            commit: true
        });
    }
    const result = new BranchPoint({
        index: toIndex,
        commit: true,
        lines: [
            new BranchLine({
                fromIndex,
                colorIndex: fromIndex
            }),
            new BranchLine({
                fromIndex: toIndex,
                colorIndex: toIndex
            })
        ]
    });
    const froms = [...timeline];
    const fromTargetLine = froms.pop();
    if (fromTargetLine) {
        fromTargetLine[fromIndex] = BranchPoint.merge(fromTargetLine[fromIndex], new BranchPoint({
            index: toIndex,
            lines: [
                new BranchLine({
                    toIndex,
                    colorIndex: fromIndex
                })
            ]
        }));
    }
    if (joinLine(froms, fromIndex) && fromTargetLine) {
        fromTargetLine[fromIndex].lines = BranchPoint.mergeLines(fromTargetLine[fromIndex].lines.concat([
            new BranchLine({
                fromIndex,
                colorIndex: fromIndex
            })
        ]));
    }
    joinLine(timeline, toIndex);
    return result;
}
function calcCommand(info, command) {
    const { timeline } = info;
    const timelineData = [];
    // const last = timeline.length > 0 ? timeline[timeline.length - 1] : null;
    const commands = Array.isArray(command) ? command : [command];
    commands.forEach((cmd) => {
        if (!cmd) {
            return;
        }
        let point;
        if (cmd.command === 'branch') {
            const from = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.obj.isObject(cmd.branch) ? cmd.branch.from : null;
            const to = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.obj.isObject(cmd.branch) ? cmd.branch.to : cmd.branch;
            point = branch(info, from, to);
        }
        else if (cmd.command === 'commit') {
            const { branch } = cmd;
            point = commit(info, branch);
        }
        else if (cmd.command === 'merge') {
            const { from, to } = cmd.branch;
            point = commitMerge(info, from, to);
        }
        else if (cmd.command === 'tag') {
            const { branch, tag } = cmd;
            point = commitTag(info, branch, tag);
        }
        if (point && point.index > -1) {
            timelineData[point.index] = BranchPoint.merge(timelineData[point.index], point);
        }
    });
    timeline.push(timelineData);
}
function calcBranchesInfo(start, grid, field) {
    const result = {
        branches: [],
        timeline: []
    };
    getAllColumnData(grid, field, (data) => {
        if (start !== 'top') {
            data = [...data].reverse();
        }
        data.forEach((command) => {
            calcCommand(result, command);
        });
    });
    return result;
}
function calcBranchXPoints(ctx, left, width, radius, branches, timeline) {
    let w = Math.max(width / branches.length + 1, 5);
    timeline.forEach((tl) => {
        tl.forEach((p, index) => {
            if (index <= 0) {
                // 計算の意味が無い
                return;
            }
            if (p.tag) {
                const textWidth = ctx.measureText(p.tag).width;
                if (w * index + radius * 2 + 4 + textWidth > width) {
                    w = Math.max((width - radius * 2 - 4 - textWidth) / index, 5);
                }
            }
        });
    });
    const result = [];
    let x = left;
    branches.forEach(() => {
        result.push(Math.ceil(x + radius));
        x += w;
    });
    return result;
}
function renderMerge(grid, ctx, x, y, upLineIndex, downLineIndex, colorIndex, { branchXPoints, 
// margin,
branchColors, branchLineWidth, mergeStyle }, { 
// width,
col, row, branches }) {
    if (upLineIndex != null || downLineIndex != null) {
        ctx.strokeStyle = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getOrApply)(branchColors, branches[colorIndex], colorIndex);
        ctx.lineWidth = branchLineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        if (upLineIndex != null) {
            const upX = branchXPoints[upLineIndex];
            const upRect = grid.getCellRelativeRect(col, row - 1);
            const upY = upRect.top + upRect.height / 2;
            ctx.moveTo(upX, upY);
            if (mergeStyle === 'bezier') {
                ctx.bezierCurveTo(upX, (y + upY) / 2, x, (y + upY) / 2, x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        else {
            ctx.moveTo(x, y);
        }
        if (downLineIndex != null) {
            const downX = branchXPoints[downLineIndex];
            const downRect = grid.getCellRelativeRect(col, row + 1);
            const downY = downRect.top + downRect.height / 2;
            if (mergeStyle === 'bezier') {
                ctx.bezierCurveTo(x, (y + downY) / 2, downX, (y + downY) / 2, downX, downY);
            }
            else {
                ctx.lineTo(downX, downY);
            }
        }
        ctx.stroke();
    }
}
/**
 * BranchGraphColumn
 *
 * Data commands
 * - mastar branch or orphan branch
 *
 * ```js
 * {
 * 	command: 'branch',
 * 	branch: 'branch name A',
 * }
 * ```
 *
 * - commit
 *
 * ```js
 * {
 * 	command: 'commit',
 * 	branch: 'branch name A'
 * }
 * ```
 *
 * - branch
 *
 * ```js
 * {
 * 	command: 'branch',
 * 	branch: {
 * 		from: 'branch name A',
 * 		to: 'branch name B'
 * 	}
 * }
 * ```
 *
 * - merge
 *
 * ```js
 * {
 * 	command: 'merge',
 * 	branch: {
 * 		from: 'branch name B',
 * 		to: 'branch name A'
 * 	}
 * }
 * ```
 *
 * - tag
 *
 * ```js
 * {
 * 	command: 'tag',
 * 	branch: 'branch name A',
 * 	tag: 'tag name'
 * }
 * ```
 *
 * @memberof cheetahGrid.columns.type
 */
class BranchGraphColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_1__.BaseColumn {
    _start;
    _cache;
    constructor(option = {}) {
        super(option);
        this._start = option.start || 'bottom';
        this._cache = option.cache != null ? option.cache : false;
    }
    get StyleClass() {
        return _style_BranchGraphStyle__WEBPACK_IMPORTED_MODULE_2__.BranchGraphStyle;
    }
    clearCache(grid) {
        delete grid[_];
    }
    onDrawCell(cellValue, info, context, grid) {
        if (this._cache) {
            const state = grid[_] || (grid[_] = new Map());
            const { col, row } = context;
            const field = grid.getField(col, row);
            if (!state.has(field)) {
                state.set(field, calcBranchesInfo(this._start, grid, field));
            }
        }
        return super.onDrawCell(cellValue, info, context, grid);
    }
    clone() {
        return new BranchGraphColumn(this);
    }
    drawInternal(_value, context, style, helper, grid, { drawCellBase }) {
        const { col, row } = context;
        const field = grid.getField(col, row);
        const { timeline, branches } = (this._cache ? grid[_]?.get(field) : null) ??
            calcBranchesInfo(this._start, grid, field);
        const { upLineIndexKey, downLineIndexKey } = this._start !== 'top'
            ? { upLineIndexKey: 'toIndex', downLineIndexKey: 'fromIndex' }
            : { upLineIndexKey: 'fromIndex', downLineIndexKey: 'toIndex' };
        const data = this._start !== 'top'
            ? timeline[timeline.length - (row - grid.frozenRowCount) - 1]
            : timeline[row - grid.frozenRowCount];
        const { branchColors, branchLineWidth, circleSize, mergeStyle, margin, bgColor } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const rect = context.getRect();
        const radius = circleSize / 2;
        const width = rect.width - margin * 2;
        helper.drawWithClip(context, (ctx) => {
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            const branchXPoints = calcBranchXPoints(ctx, rect.left + margin, width, radius, branches, timeline);
            const y = rect.top + rect.height / 2;
            // draw join lines
            data.map((point, index) => point
                ? point.lines.map((line) => ({
                    colorIndex: line.colorIndex,
                    upLineIndex: line[upLineIndexKey],
                    downLineIndex: line[downLineIndexKey],
                    pointIndex: index
                }))
                : []).reduce((p, c) => p.concat(c), []). // flatMap
                // order of overlap
                sort((a, b) => b.colorIndex - a.colorIndex).forEach((line) => {
                const x = branchXPoints[line.pointIndex];
                renderMerge(grid, ctx, x, y, line.upLineIndex, line.downLineIndex, line.colorIndex, {
                    margin,
                    branchXPoints,
                    branchLineWidth,
                    branchColors,
                    mergeStyle
                }, {
                    width,
                    col,
                    row,
                    branches
                });
            });
            // draw commit points
            data.forEach((p, index) => {
                if (p && p.commit) {
                    const x = branchXPoints[index];
                    ctx.fillStyle = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getOrApply)(branchColors, branches[index], index);
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                    ctx.fill();
                    ctx.closePath();
                }
            });
            // draw tags
            data.forEach((p, index) => {
                if (p && p.tag) {
                    ctx.fillStyle = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getOrApply)(branchColors, branches[index], index);
                    ctx.fillText(p.tag, branchXPoints[index] + radius + 4, y);
                }
            });
        });
    }
}


/***/ }),

/***/ "./src/columns/type/ButtonColumn.ts":
/*!******************************************!*\
  !*** ./src/columns/type/ButtonColumn.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonColumn": () => (/* binding */ ButtonColumn)
/* harmony export */ });
/* harmony import */ var _columnUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columnUtils */ "./src/columns/type/columnUtils.ts");
/* harmony import */ var _style_ButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/ButtonStyle */ "./src/columns/style/ButtonStyle.ts");
/* harmony import */ var _Column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Column */ "./src/columns/type/Column.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");





const BUTTON_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_4__.getButtonColumnStateId)();
class ButtonColumn extends _Column__WEBPACK_IMPORTED_MODULE_2__.Column {
    _caption;
    constructor(option = {}) {
        super(option);
        this._caption = option.caption;
    }
    get StyleClass() {
        return _style_ButtonStyle__WEBPACK_IMPORTED_MODULE_1__.ButtonStyle;
    }
    get caption() {
        return this._caption;
    }
    withCaption(caption) {
        const c = this.clone();
        c._caption = caption;
        return c;
    }
    clone() {
        return new ButtonColumn(this);
    }
    convertInternal(value) {
        return this._caption || super.convertInternal(value);
    }
    drawInternal(value, context, style, helper, grid, { drawCellBase, getIcon }) {
        const { textAlign, textBaseline, bgColor, color, buttonBgColor, font, padding, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        helper.testFontLoad(font, value, context);
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        let active = false;
        const state = grid[BUTTON_COLUMN_STATE_ID];
        if (state) {
            if (state.mouseActiveCell && (0,_internal_utils__WEBPACK_IMPORTED_MODULE_3__.cellInRange)(range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
                active = true;
            }
            else {
                const { select } = context.getSelection();
                if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_3__.cellInRange)(range, select.col, select.row)) {
                    active = true;
                }
            }
        }
        _columnUtils__WEBPACK_IMPORTED_MODULE_0__.loadIcons(getIcon(), context, helper, (icons, context) => {
            helper.button(value, context, {
                textAlign,
                textBaseline,
                bgColor: buttonBgColor,
                color,
                font,
                padding,
                shadow: active
                    ? {
                        color: 'rgba(0, 0, 0, 0.48)',
                        blur: 6,
                        offsetY: 3
                    }
                    : {},
                textOverflow,
                icons
            });
        });
    }
}


/***/ }),

/***/ "./src/columns/type/CheckColumn.ts":
/*!*****************************************!*\
  !*** ./src/columns/type/CheckColumn.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckColumn": () => (/* binding */ CheckColumn)
/* harmony export */ });
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_CheckStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/CheckStyle */ "./src/columns/style/CheckStyle.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/columns/utils/index.ts");




const CHECK_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__.getCheckColumnStateId)();
class CheckColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_0__.BaseColumn {
    get StyleClass() {
        return _style_CheckStyle__WEBPACK_IMPORTED_MODULE_1__.CheckStyle;
    }
    clone() {
        return new CheckColumn(this);
    }
    convertInternal(value) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.toBoolean)(value);
    }
    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
        const { textAlign, textBaseline, borderColor, checkBgColor, uncheckBgColor, bgColor } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        const cellKey = `${range.start.col}:${range.start.row}`;
        const elapsed = grid[CHECK_COLUMN_STATE_ID]?.elapsed[cellKey];
        const opt = {
            textAlign,
            textBaseline,
            borderColor,
            checkBgColor,
            uncheckBgColor
        };
        if (elapsed != null) {
            opt.animElapsedTime = elapsed;
        }
        helper.checkbox(value, context, opt);
    }
}


/***/ }),

/***/ "./src/columns/type/Column.ts":
/*!************************************!*\
  !*** ./src/columns/type/Column.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Column": () => (/* binding */ Column)
/* harmony export */ });
/* harmony import */ var _columnUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columnUtils */ "./src/columns/type/columnUtils.ts");
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_Style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/Style */ "./src/columns/style/Style.ts");



class Column extends _BaseColumn__WEBPACK_IMPORTED_MODULE_1__.BaseColumn {
    constructor(options = {}) {
        super(options);
    }
    get StyleClass() {
        return _style_Style__WEBPACK_IMPORTED_MODULE_2__.Style;
    }
    clone() {
        return new Column(this);
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase, getIcon }) {
        const { textAlign, textBaseline, color, font, bgColor, padding, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        helper.testFontLoad(font, value, context);
        _columnUtils__WEBPACK_IMPORTED_MODULE_0__.loadIcons(getIcon(), context, helper, (icons, context) => {
            helper.text(value, context, {
                textAlign,
                textBaseline,
                color,
                font,
                padding,
                textOverflow,
                icons
            });
        });
    }
}


/***/ }),

/***/ "./src/columns/type/IconColumn.ts":
/*!****************************************!*\
  !*** ./src/columns/type/IconColumn.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconColumn": () => (/* binding */ IconColumn)
/* harmony export */ });
/* harmony import */ var _internal_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/icons */ "./src/internal/icons.ts");
/* harmony import */ var _Column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Column */ "./src/columns/type/Column.ts");
/* harmony import */ var _style_IconStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/IconStyle */ "./src/columns/style/IconStyle.ts");



function repeatArray(val, count) {
    if (count === Infinity) {
        count = 0;
    }
    const a = [];
    for (let i = 0; i < count; i++) {
        a.push(val);
    }
    return a;
}
class IconColumn extends _Column__WEBPACK_IMPORTED_MODULE_1__.Column {
    _tagName;
    _className;
    _content;
    _name;
    _iconWidth;
    constructor(option = {}) {
        super(option);
        this._tagName = option.tagName || 'i';
        this._className = option.className;
        this._content = option.content;
        this._name = option.name;
        this._iconWidth = option.iconWidth;
    }
    get StyleClass() {
        return _style_IconStyle__WEBPACK_IMPORTED_MODULE_2__.IconStyle;
    }
    clone() {
        return new IconColumn(this);
    }
    drawInternal(value, context, style, helper, grid, info) {
        const num = Number(value);
        if (!isNaN(num)) {
            const icon = {};
            _internal_icons__WEBPACK_IMPORTED_MODULE_0__.iconPropKeys.forEach((k) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                icon[k] = style[k];
            });
            icon.className = this._className;
            icon.tagName = this._tagName;
            if (this._content) {
                icon.content = this._content;
            }
            icon.name = this._name;
            if (this._iconWidth) {
                icon.width = this._iconWidth;
            }
            info.getIcon = () => repeatArray(icon, num);
        }
        else {
            info.getIcon = () => null;
        }
        super.drawInternal('', context, style, helper, grid, info);
    }
}


/***/ }),

/***/ "./src/columns/type/ImageColumn.ts":
/*!*****************************************!*\
  !*** ./src/columns/type/ImageColumn.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageColumn": () => (/* binding */ ImageColumn)
/* harmony export */ });
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_ImageStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/ImageStyle */ "./src/columns/style/ImageStyle.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/canvases */ "./src/internal/canvases.ts");
/* harmony import */ var _internal_imgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/imgs */ "./src/internal/imgs.ts");




const MAX_LRU_CACHE_SIZE = 50;
function getImage(url) {
    return (0,_internal_imgs__WEBPACK_IMPORTED_MODULE_3__.getCacheOrLoad)('ImageColumn', MAX_LRU_CACHE_SIZE, url);
}
function calcKeepAspectRatioSize(width, height, maxWidth, maxHeight) {
    let newWidth = width;
    let newHeight = height;
    if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = (newWidth * height) / width;
    }
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (newHeight * width) / height;
    }
    return {
        width: newWidth,
        height: newHeight
    };
}
class ImageColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_0__.BaseColumn {
    get StyleClass() {
        return _style_ImageStyle__WEBPACK_IMPORTED_MODULE_1__.ImageStyle;
    }
    onDrawCell(cellValue, info, context, grid) {
        return super.onDrawCell(getImage(cellValue), info, context, grid);
    }
    clone() {
        return new ImageColumn(this);
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase }) {
        if (value) {
            const { textAlign, textBaseline, margin, bgColor } = style;
            if (bgColor) {
                drawCellBase({
                    bgColor
                });
            }
            helper.drawWithClip(context, (ctx) => {
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBaseline;
                const rect = context.getRect();
                if (style.imageSizing === 'keep-aspect-ratio') {
                    const { width, height } = calcKeepAspectRatioSize(value.width, value.height, rect.width - margin * 2, rect.height - margin * 2);
                    const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_2__.calcStartPosition)(ctx, rect, width, height, {
                        offset: margin
                    });
                    ctx.drawImage(value, 0, 0, value.width, value.height, pos.x, pos.y, width, height);
                }
                else {
                    ctx.drawImage(value, 0, 0, value.width, value.height, rect.left + margin, rect.top + margin, rect.width - margin * 2, rect.height - margin * 2);
                }
            });
        }
    }
}


/***/ }),

/***/ "./src/columns/type/MenuColumn.ts":
/*!****************************************!*\
  !*** ./src/columns/type/MenuColumn.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuColumn": () => (/* binding */ MenuColumn)
/* harmony export */ });
/* harmony import */ var _columnUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columnUtils */ "./src/columns/type/columnUtils.ts");
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_MenuStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/MenuStyle */ "./src/columns/style/MenuStyle.ts");
/* harmony import */ var _internal_menu_items__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/menu-items */ "./src/internal/menu-items.ts");




class MenuColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_1__.BaseColumn {
    _options;
    constructor(option = {}) {
        super(option);
        this._options = (0,_internal_menu_items__WEBPACK_IMPORTED_MODULE_3__.normalize)(option.options);
    }
    get StyleClass() {
        return _style_MenuStyle__WEBPACK_IMPORTED_MODULE_2__.MenuStyle;
    }
    clone() {
        return new MenuColumn(this);
    }
    get options() {
        return this._options;
    }
    withOptions(options) {
        const c = this.clone();
        c._options = (0,_internal_menu_items__WEBPACK_IMPORTED_MODULE_3__.normalize)(options);
        return c;
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase, getIcon }) {
        const { textAlign, textBaseline, font, bgColor, padding, textOverflow, appearance } = style;
        let { color } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const text = this._convertInternal(value);
        helper.testFontLoad(font, text, context);
        _columnUtils__WEBPACK_IMPORTED_MODULE_0__.loadIcons(getIcon(), context, helper, (icons, context) => {
            const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
            const textPadding = basePadding.slice(0);
            textPadding[1] += 26; // icon padding
            const iconPadding = basePadding.slice(0);
            iconPadding[1] += 8;
            if (color == null && (value == null || value === '')) {
                color = 'rgba(0, 0, 0, .38)';
            }
            helper.text(text, context, {
                textAlign,
                textBaseline,
                color,
                font,
                padding: textPadding,
                textOverflow,
                icons
            });
            if (appearance === 'menulist-button') {
                // draw dropdown arrow icon
                helper.text('', context, {
                    textAlign: 'right',
                    textBaseline,
                    color,
                    font,
                    icons: [
                        {
                            path: 'M0 2 5 7 10 2z',
                            width: 10,
                            color: 'rgba(0, 0, 0, .54)'
                        }
                    ],
                    padding: iconPadding
                });
            }
            else if (appearance !== 'none') {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                console.warn(`unsupported appearance:${appearance}`);
            }
        });
    }
    convertInternal(value) {
        return value;
    }
    _convertInternal(value) {
        const options = this._options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.value === value) {
                value = option.label;
                break;
            }
        }
        return super.convertInternal(value);
    }
    getCopyCellValue(value) {
        return this._convertInternal(value);
    }
}


/***/ }),

/***/ "./src/columns/type/MultilineTextColumn.ts":
/*!*************************************************!*\
  !*** ./src/columns/type/MultilineTextColumn.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultilineTextColumn": () => (/* binding */ MultilineTextColumn)
/* harmony export */ });
/* harmony import */ var _columnUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columnUtils */ "./src/columns/type/columnUtils.ts");
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_MultilineTextStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/MultilineTextStyle */ "./src/columns/style/MultilineTextStyle.ts");



class MultilineTextColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_1__.BaseColumn {
    constructor(option = {}) {
        super(option);
    }
    get StyleClass() {
        return _style_MultilineTextStyle__WEBPACK_IMPORTED_MODULE_2__.MultilineTextStyle;
    }
    clone() {
        return new MultilineTextColumn(this);
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase, getIcon }) {
        const { textAlign, textBaseline, color, font, bgColor, padding, lineHeight, autoWrapText, lineClamp, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const multilines = value.replace(/\r?\n/g, '\n').replace(/\r/g, '\n').split('\n');
        helper.testFontLoad(font, value, context);
        _columnUtils__WEBPACK_IMPORTED_MODULE_0__.loadIcons(getIcon(), context, helper, (icons, context) => {
            helper.multilineText(multilines, context, {
                textAlign,
                textBaseline,
                color,
                font,
                padding,
                lineHeight,
                autoWrapText,
                lineClamp,
                textOverflow,
                icons
            });
        });
    }
}


/***/ }),

/***/ "./src/columns/type/NumberColumn.ts":
/*!******************************************!*\
  !*** ./src/columns/type/NumberColumn.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberColumn": () => (/* binding */ NumberColumn)
/* harmony export */ });
/* harmony import */ var _Column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Column */ "./src/columns/type/Column.ts");
/* harmony import */ var _style_NumberStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/NumberStyle */ "./src/columns/style/NumberStyle.ts");


let defaultFotmat;
class NumberColumn extends _Column__WEBPACK_IMPORTED_MODULE_0__.Column {
    _format;
    static get defaultFotmat() {
        return defaultFotmat || (defaultFotmat = new Intl.NumberFormat());
    }
    static set defaultFotmat(fmt) {
        defaultFotmat = fmt;
    }
    constructor(option = {}) {
        super(option);
        this._format = option.format;
    }
    get StyleClass() {
        return _style_NumberStyle__WEBPACK_IMPORTED_MODULE_1__.NumberStyle;
    }
    clone() {
        return new NumberColumn(this);
    }
    get format() {
        return this._format;
    }
    withFormat(format) {
        const c = this.clone();
        c._format = format;
        return c;
    }
    convertInternal(value) {
        const num = Number(value);
        if (isNaN(num)) {
            return super.convertInternal(value);
        }
        const format = this._format || NumberColumn.defaultFotmat;
        return format.format(num);
    }
}


/***/ }),

/***/ "./src/columns/type/PercentCompleteBarColumn.ts":
/*!******************************************************!*\
  !*** ./src/columns/type/PercentCompleteBarColumn.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PercentCompleteBarColumn": () => (/* binding */ PercentCompleteBarColumn)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _Column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Column */ "./src/columns/type/Column.ts");
/* harmony import */ var _style_PercentCompleteBarStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/PercentCompleteBarStyle */ "./src/columns/style/PercentCompleteBarStyle.ts");



const MARGIN = 2;
class PercentCompleteBarColumn extends _Column__WEBPACK_IMPORTED_MODULE_1__.Column {
    _min;
    _max;
    _formatter;
    constructor(option = {}) {
        super(option);
        this._min = option.min || 0;
        this._max = option.max || this._min + 100;
        this._formatter = option.formatter || ((v) => v);
    }
    get StyleClass() {
        return _style_PercentCompleteBarStyle__WEBPACK_IMPORTED_MODULE_2__.PercentCompleteBarStyle;
    }
    clone() {
        return new PercentCompleteBarColumn(this);
    }
    drawInternal(value, context, style, helper, grid, info) {
        super.drawInternal(this._formatter(value), context, style, helper, grid, info);
        const { barColor, barBgColor, barHeight } = style;
        let svalue = `${value}`;
        if (_internal_utils__WEBPACK_IMPORTED_MODULE_0__.str.endsWith(svalue, '%')) {
            svalue = svalue.substr(0, svalue.length - 1);
        }
        const num = Number(svalue);
        if (isNaN(num)) {
            return;
        }
        const rate = num < this._min ? 0 : num > this._max ? 1 : (num - this._min) / (this._max - this._min);
        helper.drawWithClip(context, (ctx) => {
            const rect = context.getRect();
            const barMaxWidth = rect.width - MARGIN * 2 - 1; /*罫線*/
            const barTop = rect.bottom - MARGIN - barHeight - 1; /*罫線*/
            const barLeft = rect.left + MARGIN;
            ctx.fillStyle = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getOrApply)(barBgColor, rate * 100) || '#f0f3f5';
            ctx.beginPath();
            ctx.rect(barLeft, barTop, barMaxWidth, barHeight);
            ctx.fill();
            const barSize = Math.min(barMaxWidth * rate, barMaxWidth);
            ctx.fillStyle = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getOrApply)(barColor, rate * 100) || '#20a8d8';
            ctx.beginPath();
            ctx.rect(barLeft, barTop, barSize, barHeight);
            ctx.fill();
        });
    }
}


/***/ }),

/***/ "./src/columns/type/RadioColumn.ts":
/*!*****************************************!*\
  !*** ./src/columns/type/RadioColumn.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioColumn": () => (/* binding */ RadioColumn)
/* harmony export */ });
/* harmony import */ var _BaseColumn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseColumn */ "./src/columns/type/BaseColumn.ts");
/* harmony import */ var _style_RadioStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/RadioStyle */ "./src/columns/style/RadioStyle.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/columns/utils/index.ts");




const RADIO_COLUMN_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__.getRadioColumnStateId)();
class RadioColumn extends _BaseColumn__WEBPACK_IMPORTED_MODULE_0__.BaseColumn {
    get StyleClass() {
        return _style_RadioStyle__WEBPACK_IMPORTED_MODULE_1__.RadioStyle;
    }
    clone() {
        return new RadioColumn(this);
    }
    convertInternal(value) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.toBoolean)(value);
    }
    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
        const { textAlign, textBaseline, checkColor, uncheckBorderColor, checkBorderColor, uncheckBgColor, checkBgColor, bgColor } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        const cellKey = `${range.start.col}:${range.start.row}`;
        const elapsed = grid[RADIO_COLUMN_STATE_ID]?.elapsed[cellKey];
        const opt = {
            textAlign,
            textBaseline,
            checkColor,
            uncheckBorderColor,
            checkBorderColor,
            uncheckBgColor,
            checkBgColor
        };
        if (elapsed != null) {
            opt.animElapsedTime = elapsed;
        }
        helper.radioButton(value, context, opt);
    }
}


/***/ }),

/***/ "./src/columns/type/columnUtils.ts":
/*!*****************************************!*\
  !*** ./src/columns/type/columnUtils.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadIcons": () => (/* binding */ loadIcons)
/* harmony export */ });
/* harmony import */ var _internal_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/icons */ "./src/internal/icons.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


function loadIcons(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
icon, context, helper, callback) {
    let argIcon = undefined;
    if (icon) {
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(icon)) {
            icon.then((i) => {
                loadIcons(i, context.toCurrentContext(), helper, callback);
            });
        }
        else {
            const iconList = _internal_icons__WEBPACK_IMPORTED_MODULE_0__.toNormarizeArray(icon);
            iconList.forEach((i) => {
                if (i.font && i.content) {
                    helper.testFontLoad(i.font, i.content, context);
                }
            });
            argIcon = iconList;
        }
    }
    callback(argIcon, context);
}


/***/ }),

/***/ "./src/columns/utils/index.ts":
/*!************************************!*\
  !*** ./src/columns/utils/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toBoolean": () => (/* binding */ toBoolean)
/* harmony export */ });
function toBoolean(val) {
    if (typeof val === 'string') {
        if (val === 'false') {
            return false;
        }
        else if (val === 'off') {
            return false;
        }
        else if (/^0+$/.exec(val)) {
            return false;
        }
    }
    return Boolean(val);
}


/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => (/* binding */ core)
/* harmony export */ });
/* harmony import */ var _core_DrawGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/DrawGrid */ "./src/core/DrawGrid.ts");
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");


const core = { DrawGrid: _core_DrawGrid__WEBPACK_IMPORTED_MODULE_0__.DrawGrid, EVENT_TYPE: _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_1__.DG_EVENT_TYPE };


/***/ }),

/***/ "./src/core/DG_EVENT_TYPE.ts":
/*!***********************************!*\
  !*** ./src/core/DG_EVENT_TYPE.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DG_EVENT_TYPE": () => (/* binding */ DG_EVENT_TYPE)
/* harmony export */ });
/**
 * DrawGrid event types
 */
const DG_EVENT_TYPE = {
    CLICK_CELL: 'click_cell',
    DBLCLICK_CELL: 'dblclick_cell',
    DBLTAP_CELL: 'dbltap_cell',
    MOUSEDOWN_CELL: 'mousedown_cell',
    MOUSEUP_CELL: 'mouseup_cell',
    SELECTED_CELL: 'selected_cell',
    KEYDOWN: 'keydown',
    MOUSEMOVE_CELL: 'mousemove_cell',
    MOUSEENTER_CELL: 'mouseenter_cell',
    MOUSELEAVE_CELL: 'mouseleave_cell',
    MOUSEOVER_CELL: 'mouseover_cell',
    MOUSEOUT_CELL: 'mouseout_cell',
    CONTEXTMENU_CELL: 'contextmenu_cell',
    INPUT_CELL: 'input_cell',
    PASTE_CELL: 'paste_cell',
    DELETE_CELL: 'delete_cell',
    EDITABLEINPUT_CELL: 'editableinput_cell',
    MODIFY_STATUS_EDITABLEINPUT_CELL: 'modify_status_editableinput_cell',
    RESIZE_COLUMN: 'resize_column',
    SCROLL: 'scroll',
    FOCUS_GRID: 'focus_grid',
    BLUR_GRID: 'blur_grid'
};


/***/ }),

/***/ "./src/core/DrawGrid.ts":
/*!******************************!*\
  !*** ./src/core/DrawGrid.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DrawGrid": () => (/* binding */ DrawGrid)
/* harmony export */ });
/* harmony import */ var _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/KEY_CODE */ "./src/core/internal/KEY_CODE.ts");
/* harmony import */ var _internal_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/calc */ "./src/internal/calc.ts");
/* harmony import */ var _internal_hiDPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/hiDPI */ "./src/internal/hiDPI.ts");
/* harmony import */ var _internal_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/style */ "./src/internal/style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _EventTarget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventTarget */ "./src/core/EventTarget.ts");
/* harmony import */ var _internal_NumberMap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/NumberMap */ "./src/internal/NumberMap.ts");
/* harmony import */ var _internal_Rect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/Rect */ "./src/internal/Rect.ts");
/* harmony import */ var _internal_Scrollable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../internal/Scrollable */ "./src/internal/Scrollable.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/canvases */ "./src/internal/canvases.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_paste_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/paste-utils */ "./src/internal/paste-utils.ts");














const { isTouchEvent, getMouseButtons, getKeyCode, cancel: cancelEvent } = _internal_utils__WEBPACK_IMPORTED_MODULE_4__.event;
const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_12__.getDrawGridSymbol)();
// function parseInt10(val: string): number {
// 	return parseInt(val, 10)
// }
/**
 * 根据DOM获取元素宽度和高度
 * @param whIdx
 * @param root
 */
// function _getSize(whIdx: number, root: HTMLElement) {
// 	window['_rootDom'] = root
// 	const wh = [ 'width', 'height' ][whIdx] as 'width' | 'height'
// 	const cwh = [ 'clientWidth', 'clientHeight' ][whIdx] as 'clientWidth' | 'clientHeight'
// 	const plt = [ 'paddingLeft', 'paddingTop' ][whIdx] as 'paddingLeft' | 'paddingTop'
// 	const prb = [ 'paddingRight', 'paddingBottom' ][whIdx] as 'paddingRight' | 'paddingBottom'
// 	const stl = document.defaultView.getComputedStyle(root, null)
// 	// document.defaultView.getComputedStyle(window._rootDom, null)['clientHeight']
// 	// document.defaultView.getComputedStyle(window._rootDom, null)['clientHeight']
// 	console.log('root.clientHeight', root.clientHeight)
// 	// console.log('root.clientHeight', root.clientHeight, cwh)
// 	return (
// 		(root[cwh] || parseInt10(stl[wh]) ||
//             parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0)
// 	) | 0
// }
/**
 * 创建画布容器
 * @param parentElement
 */
// function createRoot(parentElement: HTMLElement): HTMLElement {
// 	const rootStyle = parentElement.style
// 	if (rootStyle) {
// 		rootStyle['webkitTapHighlightColor'] = 'transparent'
// 		rootStyle.webkitUserSelect = 'none'
// 		rootStyle.userSelect = 'none';
// 		(rootStyle as any)['-webkit-touch-callout'] = 'none'
// 		parentElement.innerHTML = ''
// 	}
// 	console.dir(parentElement)
// 	setTimeout(()=>{
// 		console.log(`setTimeout==>parentElement.clientHeight = ${parentElement.clientHeight}`)
// 	}, 1000)
// 	console.log(`parentElement.clientHeight = ${parentElement.clientHeight}`)
// 	const width = _getSize(0, parentElement)
// 	const height = _getSize(1, parentElement)
// 	console.log(`width:${ width },height:${ height }`)
// 	const domRoot = document.createElement('div')
// 	domRoot.classList.add('data-grid')
// 	domRoot.style.cssText = [
// 		'position:relative',
// 		// IOS13 safari probably has a compositing bug (z order of the canvas and the consequent
// 		// dom does not act as expected) when some of the parent dom has
// 		// `-webkit-overflow-scrolling: touch;` and the webpage is longer than one screen and
// 		// the canvas is not at the top part of the page.
// 		// Check `https://bugs.webkit.org/show_bug.cgi?id=203681` for more details. We remove
// 		// this `overflow:hidden` to avoid the bug.
// 		// 'overflow:hidden',
// 		'width:' + width + 'px',
// 		// 'height:' + height + 'px',
// 		'padding:0',
// 		'margin:0',
// 		'border-width:0'
// 	].join(';') + ';'
//
// 	return domRoot
// }
function createRootElement(parentElement) {
    const element = document.createElement('div');
    console.log('parentElement.offsetWidth', parentElement.offsetWidth);
    console.log('parentElement.clientHeight', parentElement.clientHeight);
    element.classList.add('data-grid');
    return element;
}
function _vibrate(e) {
    if (navigator.vibrate && isTouchEvent(e)) {
        navigator.vibrate(50);
    }
}
function _getTargetRowAt(absoluteY) {
    const internal = this.getTargetRowAtInternal(absoluteY);
    // if (internal != null) {
    // return internal
    // }
    if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isDef)(internal)) {
        return internal;
    }
    const findBefore = (startRow, startBottom) => {
        let bottom = startBottom;
        for (let row = startRow; row >= 0; row--) {
            const height = _getRowHeight.call(this, row);
            const top = bottom - height;
            if (top <= absoluteY && absoluteY < bottom) {
                return {
                    top,
                    row
                };
            }
            bottom = top;
        }
        return null;
    };
    const findAfter = (startRow, startBottom) => {
        let top = startBottom - _getRowHeight.call(this, startRow);
        const { rowCount } = this[_];
        for (let row = startRow; row < rowCount; row++) {
            const height = _getRowHeight.call(this, row);
            const bottom = top + height;
            if (top <= absoluteY && absoluteY < bottom) {
                return {
                    top,
                    row
                };
            }
            top = bottom;
        }
        return null;
    };
    const candRow = Math.min(Math.ceil(absoluteY / this[_].defaultRowHeight), this.rowCount - 1);
    const bottom = _getRowsHeight.call(this, 0, candRow);
    if (absoluteY >= bottom) {
        return findAfter(candRow, bottom);
    }
    else {
        return findBefore(candRow, bottom);
    }
}
function _getTargetColAt(grid, absoluteX) {
    let left = 0;
    const { colCount } = grid[_];
    for (let col = 0; col < colCount; col++) {
        const width = _getColWidth(grid, col);
        const right = left + width;
        if (right > absoluteX) {
            return {
                left,
                col
            };
        }
        left = right;
    }
    return null;
}
function _getTargetFrozenRowAt(grid, absoluteY) {
    if (!grid[_].frozenRowCount) {
        return null;
    }
    let { top } = grid[_].scroll;
    const rowCount = grid[_].frozenRowCount;
    for (let row = 0; row < rowCount; row++) {
        const height = _getRowHeight.call(grid, row);
        const bottom = top + height;
        if (bottom > absoluteY) {
            return {
                top,
                row
            };
        }
        top = bottom;
    }
    return null;
}
function _getTargetFrozenColAt(grid, absoluteX) {
    if (!grid[_].frozenColCount) {
        return null;
    }
    let { left } = grid[_].scroll;
    const colCount = grid[_].frozenColCount;
    for (let col = 0; col < colCount; col++) {
        const width = _getColWidth(grid, col);
        const right = left + width;
        if (right > absoluteX) {
            return {
                left,
                col
            };
        }
        left = right;
    }
    return null;
}
function _getFrozenRowsRect(grid) {
    if (!grid[_].frozenRowCount) {
        return null;
    }
    const { top } = grid[_].scroll;
    let height = 0;
    const rowCount = grid[_].frozenRowCount;
    for (let row = 0; row < rowCount; row++) {
        height += _getRowHeight.call(grid, row);
    }
    return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(grid[_].scroll.left, top, grid[_].canvas.width, height);
}
function _getFrozenColsRect(grid) {
    if (!grid[_].frozenColCount) {
        return null;
    }
    const { left } = grid[_].scroll;
    let width = 0;
    const colCount = grid[_].frozenColCount;
    for (let col = 0; col < colCount; col++) {
        width += _getColWidth(grid, col);
    }
    return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(left, grid[_].scroll.top, width, grid[_].canvas.height);
}
function _getCellDrawing(grid, col, row) {
    if (!grid[_].drawCells[row]) {
        return null;
    }
    return grid[_].drawCells[row][col];
}
function _putCellDrawing(grid, col, row, context) {
    if (!grid[_].drawCells[row]) {
        grid[_].drawCells[row] = {};
    }
    grid[_].drawCells[row][col] = context;
}
function _removeCellDrawing(grid, col, row) {
    if (!grid[_].drawCells[row]) {
        return;
    }
    delete grid[_].drawCells[row][col];
    if (Object.keys(grid[_].drawCells[row]).length === 0) {
        delete grid[_].drawCells[row];
    }
}
// 绘制列
function _drawCell(ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers) {
    const rect = new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(absoluteLeft - visibleRect.left, absoluteTop - visibleRect.top, width, height);
    const drawRect = _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect.bounds(Math.max(absoluteLeft, skipAbsoluteLeft) - visibleRect.left, Math.max(absoluteTop, skipAbsoluteTop) - visibleRect.top, rect.right, rect.bottom);
    if (drawRect.height > 0 && drawRect.width > 0) {
        ctx.save();
        try {
            const cellDrawing = _getCellDrawing(this, col, row);
            if (cellDrawing) {
                cellDrawing.cancel();
            }
            const dcContext = new DrawCellContext(col, row, ctx, rect, drawRect, !!cellDrawing, this[_].selection, drawLayers);
            const p = this.onDrawCell(col, row, dcContext);
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isPromise)(p)) {
                // 延迟绘制
                _putCellDrawing(this, col, row, dcContext);
                const pCol = col;
                dcContext._delayMode(this, () => {
                    _removeCellDrawing(this, pCol, row);
                });
                p.then(() => {
                    dcContext.terminate();
                });
            }
        }
        finally {
            ctx.restore();
        }
    }
}
/**
 * 绘制行
 * @param grid
 * @param ctx
 * @param initFrozenCol
 * @param initCol
 * @param drawRight
 * @param row
 * @param absoluteTop
 * @param height
 * @param visibleRect
 * @param skipAbsoluteTop
 * @param drawLayers
 */
function _drawRow(grid, ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, skipAbsoluteTop, drawLayers) {
    const { colCount } = grid[_];
    const drawOuter = (col, absoluteLeft) => {
        const canvasWidth = grid[_].canvas.width;
        const outerLeft = absoluteLeft - visibleRect.left;
        // 绘制数据区域以外的绘图
        // 擦除画布计算之外区域
        if (col >= colCount - 1 && canvasWidth > absoluteLeft - visibleRect.left) {
            ctx.clearRect(outerLeft, absoluteTop - visibleRect.top, canvasWidth - outerLeft, height);
        }
        else {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = grid.underlayBackgroundColor || '#F6F6F6';
            ctx.rect(outerLeft, absoluteTop - visibleRect.top, canvasWidth - outerLeft, height);
            ctx.fill();
            ctx.restore();
        }
    };
    let skipAbsoluteLeft = 0;
    if (initFrozenCol) {
        let absoluteLeft = initFrozenCol.left;
        const count = grid[_].frozenColCount; // 固定列
        for (let { col } = initFrozenCol; col < count; col++) {
            const width = _getColWidth(grid, col);
            // 绘制列
            _drawCell.call(grid, ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, 0, drawLayers);
            absoluteLeft += width;
            if (drawRight <= absoluteLeft) {
                // 描画範囲外（終了）
                drawOuter(col, absoluteLeft);
                return;
            }
        }
        skipAbsoluteLeft = absoluteLeft;
    }
    let absoluteLeft = initCol.left;
    for (let { col } = initCol; col < colCount; col++) {
        const width = _getColWidth(grid, col);
        _drawCell.call(grid, ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers);
        absoluteLeft += width;
        if (drawRight <= absoluteLeft) {
            // 画布之外
            drawOuter(col, absoluteLeft);
            return;
        }
    }
    drawOuter(colCount - 1, absoluteLeft);
}
function _getInitContext() {
    return this._getInitContext();
}
/**
 * 初始化绘制
 * @param grid
 * @param drawRect
 */
function _invalidateRect(grid, drawRect) {
    const visibleRect = _getVisibleRect(grid);
    const { rowCount } = grid[_];
    const ctx = _getInitContext.call(grid);
    const initRow = _getTargetRowAt.call(grid, Math.max(visibleRect.top, drawRect.top)) || {
        top: _getRowsHeight.call(grid, 0, rowCount - 1),
        row: rowCount
    };
    const initCol = _getTargetColAt(grid, Math.max(visibleRect.left, drawRect.left)) || {
        left: _getColsWidth(grid, 0, grid[_].colCount - 1),
        col: grid[_].colCount
    };
    const drawBottom = Math.min(visibleRect.bottom, drawRect.bottom);
    const drawRight = Math.min(visibleRect.right, drawRect.right);
    const initFrozenRow = _getTargetFrozenRowAt(grid, Math.max(visibleRect.top, drawRect.top));
    const initFrozenCol = _getTargetFrozenColAt(grid, Math.max(visibleRect.left, drawRect.left));
    const drawLayers = new DrawLayers();
    const drawOuter = (row, absoluteTop) => {
        //データ範囲外の描画
        if (row >= rowCount - 1 && grid[_].canvas.height > absoluteTop - visibleRect.top) {
            const outerTop = absoluteTop - visibleRect.top;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = grid.underlayBackgroundColor || '#F6F6F6';
            ctx.rect(0, outerTop, grid[_].canvas.width, grid[_].canvas.height - outerTop);
            ctx.fill();
            ctx.restore();
        }
    };
    const drawGridBorder = () => {
        // 所有单元格宽度
        let w = _getColsWidth(grid, 0, grid[_].colCount - 1);
        let h = _getRowsHeight.call(grid, 0, rowCount - 1) - visibleRect.top;
        const width = Math.min(grid.canvas.width, w);
        const height = Math.min(grid.canvas.height, h);
        ctx.save();
        try {
            ctx.beginPath();
            ctx.lineWidth = 1 || 0;
            ctx.strokeStyle = 'red'; // , this.borderColor || 'transparent'
            ctx.rect(0 + ctx.lineWidth / 2, 0 + ctx.lineWidth / 2, width - ctx.lineWidth, height - ctx.lineWidth);
            ctx.stroke();
        }
        finally {
            ctx.restore();
        }
    };
    let skipAbsoluteTop = 0;
    if (initFrozenRow) {
        let absoluteTop = initFrozenRow.top;
        const count = grid[_].frozenRowCount;
        for (let { row } = initFrozenRow; row < count; row++) {
            const height = _getRowHeight.call(grid, row);
            _drawRow(grid, ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, 0, drawLayers);
            absoluteTop += height;
            if (drawBottom <= absoluteTop) {
                //描画範囲外（終了）
                drawOuter(row, absoluteTop);
                drawGridBorder();
                drawLayers.draw(ctx);
                return;
            }
        }
        skipAbsoluteTop = absoluteTop;
    }
    let absoluteTop = initRow.top;
    for (let { row } = initRow; row < rowCount; row++) {
        const height = _getRowHeight.call(grid, row);
        //行の描画
        _drawRow(grid, ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, skipAbsoluteTop, drawLayers);
        absoluteTop += height;
        if (drawBottom <= absoluteTop) {
            //描画範囲外（終了）
            drawOuter(row, absoluteTop);
            drawGridBorder();
            drawLayers.draw(ctx);
            return;
        }
    }
    drawOuter(rowCount - 1, absoluteTop);
    drawGridBorder();
    drawLayers.draw(ctx);
}
function _toPxWidth(grid, width) {
    return Math.round(_internal_calc__WEBPACK_IMPORTED_MODULE_1__.toPx(width, grid[_].calcWidthContext));
}
function _adjustColWidth(grid, col, orgWidth) {
    const limits = _getColWidthLimits(grid, col);
    return Math.max(_applyColWidthLimits(limits, orgWidth), 0);
}
function _applyColWidthLimits(limits, orgWidth) {
    if (!limits) {
        return orgWidth;
    }
    if (limits.min) {
        if (limits.min > orgWidth) {
            return limits.min;
        }
    }
    if (limits.max) {
        if (limits.max < orgWidth) {
            return limits.max;
        }
    }
    return orgWidth;
}
/**
 * Gets the definition of the column width.
 * @param {DrawGrid} grid grid instance
 * @param {number} col number of column
 * @returns {string|number} width definition
 * @private
 */
function _getColWidthDefine(grid, col) {
    const width = grid[_].colWidthsMap.get(col);
    if (width) {
        return width;
    }
    return grid.defaultColWidth;
}
/**
 * Gets the column width limits.
 * @param {DrawGrid} grid grid instance
 * @param {number} col number of column
 * @returns {object|null} the column width limits
 * @private
 */
function _getColWidthLimits(grid, col) {
    const limit = grid[_].colWidthsLimit[col];
    if (!limit) {
        return null;
    }
    const result = {};
    if (limit.min) {
        result.min = _toPxWidth(grid, limit.min);
        result.minDef = limit.min;
    }
    if (limit.max) {
        result.max = _toPxWidth(grid, limit.max);
        result.maxDef = limit.max;
    }
    return result;
}
/**
 * Checks if the given width definition is `auto`.
 * @param {string|number} width width definition to check
 * @returns {boolean} `true ` if the given width definition is `auto`
 * @private
 */
function isAutoDefine(width) {
    return Boolean(width && typeof width === 'string' && width.toLowerCase() === 'auto');
}
/**
 * Creates a formula to calculate the auto width.
 * @param {DrawGrid} grid grid instance
 * @returns {string} formula
 * @private
 */
function _calcAutoColWidthExpr(grid, shortCircuit = true) {
    const fullWidth = grid[_].calcWidthContext.full;
    let sumMin = 0;
    const others = [];
    let autoCount = 0;
    const hasLimitsOnAuto = [];
    for (let col = 0; col < grid[_].colCount; col++) {
        const def = _getColWidthDefine(grid, col);
        const limits = _getColWidthLimits(grid, col);
        if (isAutoDefine(def)) {
            if (limits) {
                hasLimitsOnAuto.push(limits);
                if (limits.min) {
                    sumMin += limits.min;
                }
            }
            autoCount++;
        }
        else {
            let expr = def;
            if (limits) {
                const orgWidth = _toPxWidth(grid, expr);
                const newWidth = _applyColWidthLimits(limits, orgWidth);
                if (orgWidth !== newWidth) {
                    expr = `${newWidth}px`;
                }
                sumMin += newWidth;
            }
            others.push(expr);
        }
        if (shortCircuit && sumMin > fullWidth) {
            // Returns 0px because it has consumed the full width.
            return '0px';
        }
    }
    if (hasLimitsOnAuto.length && others.length) {
        const autoPx = (fullWidth - _toPxWidth(grid, `calc(${others.map((c) => (typeof c === 'number' ? `${c}px` : c)).join(' + ')})`)) / autoCount;
        hasLimitsOnAuto.forEach((limits) => {
            if (limits.min && autoPx < limits.min) {
                others.push(limits.minDef);
                autoCount--;
            }
            else if (limits.max && limits.max < autoPx) {
                others.push(limits.maxDef);
                autoCount--;
            }
        });
        if (shortCircuit && autoCount <= 0) {
            return `${autoPx}px`;
        }
    }
    if (others.length) {
        const strDefs = [];
        let num = 0;
        others.forEach((c) => {
            if (typeof c === 'number') {
                num += c;
            }
            else {
                strDefs.push(c);
            }
        });
        strDefs.push(`${num}px`);
        return `calc((100% - (${strDefs.join(' + ')})) / ${autoCount})`;
    }
    else {
        return `${100 / autoCount}%`;
    }
}
/**
 * Calculate the pixels of width from the definition of width.
 * @param {DrawGrid} grid grid instance
 * @param {string|number} width width definition
 * @returns {number} the pixels of width
 * @private
 */
function _colWidthDefineToPxWidth(grid, width) {
    if (isAutoDefine(width)) {
        return _toPxWidth(grid, _calcAutoColWidthExpr(grid));
    }
    return _toPxWidth(grid, width);
}
function _getColWidth(grid, col) {
    const width = _getColWidthDefine(grid, col);
    return _adjustColWidth(grid, col, _colWidthDefineToPxWidth(grid, width));
}
function _setColWidth(grid, col, width) {
    grid[_].colWidthsMap.put(col, width);
}
/**
 * Overwrites the definition of a column whose width is set to `auto` with the current auto width formula.
 * @param {DrawGrid} grid grid instance
 * @returns {void}
 * @private
 */
function _storeAutoColWidthExprs(grid) {
    let expr = null;
    for (let col = 0; col < grid[_].colCount; col++) {
        const def = _getColWidthDefine(grid, col);
        if (isAutoDefine(def)) {
            _setColWidth(grid, col, expr || (expr = _calcAutoColWidthExpr(grid, false)));
        }
    }
}
function _getColsWidth(grid, startCol, endCol) {
    const defaultColPxWidth = _colWidthDefineToPxWidth(grid, grid.defaultColWidth);
    const colCount = endCol - startCol + 1;
    let w = defaultColPxWidth * colCount;
    grid[_].colWidthsMap.each(startCol, endCol, (width, col) => {
        w += _adjustColWidth(grid, col, _colWidthDefineToPxWidth(grid, width)) - defaultColPxWidth;
    });
    for (let col = startCol; col <= endCol; col++) {
        if (grid[_].colWidthsMap.has(col)) {
            continue;
        }
        const adj = _adjustColWidth(grid, col, defaultColPxWidth);
        if (adj !== defaultColPxWidth) {
            w += adj - defaultColPxWidth;
        }
    }
    return w;
}
function _getRowHeight(row) {
    const internal = this.getRowHeightInternal(row);
    if (internal != null) {
        return Number(internal);
    }
    const height = this[_].rowHeightsMap.get(row);
    if (height) {
        return height;
    }
    return this[_].defaultRowHeight;
}
function _setRowHeight(grid, row, height) {
    grid[_].rowHeightsMap.put(row, height);
}
function _getRowsHeight(startRow, endRow) {
    const internal = this.getRowsHeightInternal(startRow, endRow);
    if (internal != null) {
        return Number(internal);
    }
    const rowCount = endRow - startRow + 1;
    let h = this[_].defaultRowHeight * rowCount;
    this[_].rowHeightsMap.each(startRow, endRow, (height) => {
        h += height - this[_].defaultRowHeight;
    });
    return h;
}
function _getScrollWidth(grid) {
    return _getColsWidth(grid, 0, grid[_].colCount - 1);
}
function _getScrollHeight(row) {
    const internal = this.getScrollHeightInternal(row);
    if (internal != null) {
        return Number(internal);
    }
    let h = this[_].defaultRowHeight * this[_].rowCount;
    this[_].rowHeightsMap.each(0, this[_].rowCount - 1, (height) => {
        h += height - this[_].defaultRowHeight;
    });
    return h;
}
function _onScroll(grid, _e) {
    const lastLeft = grid[_].scroll.left;
    const lastTop = grid[_].scroll.top;
    const moveX = grid[_].scrollable.scrollLeft - lastLeft;
    const moveY = grid[_].scrollable.scrollTop - lastTop;
    // 保存下次计算用信息
    grid[_].scroll = {
        left: grid[_].scrollable.scrollLeft,
        top: grid[_].scrollable.scrollTop
    };
    const visibleRect = _getVisibleRect(grid);
    if (Math.abs(moveX) >= visibleRect.width || Math.abs(moveY) >= visibleRect.height) {
        // 全部重新绘制
        _invalidateRect(grid, visibleRect);
    }
    else {
        // 重新绘制差分
        grid[_].context.drawImage(grid[_].canvas, -moveX, -moveY);
        if (moveX !== 0) {
            // 计算水平移动的重新绘制区域
            const redrawRect = visibleRect.copy();
            if (moveX < 0) {
                redrawRect.width = -moveX;
                if (grid[_].frozenColCount > 0) {
                    // 有固定列时绘制固定列
                    const frozenRect = _getFrozenColsRect(grid);
                    redrawRect.width += frozenRect.width;
                }
            }
            else if (moveX > 0) {
                redrawRect.left = redrawRect.right - moveX;
            }
            //再描画
            _invalidateRect(grid, redrawRect);
            if (moveX > 0) {
                if (grid[_].frozenColCount > 0) {
                    // 有固定列时绘制固定列
                    _invalidateRect(grid, _getFrozenColsRect(grid));
                }
            }
        }
        if (moveY !== 0) {
            // 计算垂直重绘区域
            const redrawRect = visibleRect.copy();
            if (moveY < 0) {
                redrawRect.height = -moveY;
                if (grid[_].frozenRowCount > 0) {
                    // 有固定行时绘制固定行
                    const frozenRect = _getFrozenRowsRect(grid);
                    redrawRect.height += frozenRect.height;
                }
            }
            else if (moveY > 0) {
                redrawRect.top = redrawRect.bottom - moveY;
            }
            //再描画
            _invalidateRect(grid, redrawRect);
            if (moveY > 0) {
                if (grid[_].frozenRowCount > 0) {
                    // 有固定行时绘制固定行
                    _invalidateRect(grid, _getFrozenRowsRect(grid));
                }
            }
        }
    }
}
function _onKeyDownMove(e) {
    const { shiftKey } = e;
    const keyCode = getKeyCode(e);
    const focusCell = shiftKey ? this.selection.focus : this.selection.select;
    if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_LEFT) {
        if (e.ctrlKey || e.metaKey) {
            move(this, null, 'W');
        }
        else {
            if (!hmove.call(this, 'W')) {
                return;
            }
        }
        cancelEvent(e);
    }
    else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_UP) {
        if (e.ctrlKey || e.metaKey) {
            move(this, 'N', null);
        }
        else {
            if (!vmove.call(this, 'N')) {
                return;
            }
        }
        cancelEvent(e);
    }
    else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_RIGHT) {
        if (e.ctrlKey || e.metaKey) {
            move(this, null, 'E');
        }
        else {
            if (!hmove.call(this, 'E')) {
                return;
            }
        }
        cancelEvent(e);
    }
    else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_DOWN) {
        if (e.ctrlKey || e.metaKey) {
            move(this, 'S', null);
        }
        else {
            if (!vmove.call(this, 'S')) {
                return;
            }
        }
        cancelEvent(e);
    }
    else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_HOME) {
        if (e.ctrlKey || e.metaKey) {
            move(this, 'N', 'W');
        }
        else {
            move(this, null, 'W');
        }
        cancelEvent(e);
    }
    else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_END) {
        if (e.ctrlKey || e.metaKey) {
            move(this, 'S', 'E');
        }
        else {
            move(this, null, 'E');
        }
        cancelEvent(e);
    }
    else if (this.keyboardOptions?.moveCellOnTab && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_TAB) {
        if (shiftKey) {
            if (!hmove.call(this, 'W', false)) {
                const row = this.getMoveUpRowByKeyDownInternal(focusCell);
                if (0 > row) {
                    return;
                }
                _moveFocusCell.call(this, this.colCount - 1, row, false);
            }
        }
        else {
            if (!hmove.call(this, 'E', false)) {
                const row = this.getMoveDownRowByKeyDownInternal(focusCell);
                if (this.rowCount <= row) {
                    return;
                }
                _moveFocusCell.call(this, 0, row, false);
            }
        }
        cancelEvent(e);
    }
    else if (this.keyboardOptions?.moveCellOnEnter && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ENTER) {
        if (shiftKey) {
            if (!vmove.call(this, 'N', false)) {
                const col = this.getMoveLeftColByKeyDownInternal(focusCell);
                if (0 > col) {
                    return;
                }
                _moveFocusCell.call(this, col, this.rowCount - 1, false);
            }
        }
        else {
            if (!vmove.call(this, 'S', false)) {
                const col = this.getMoveRightColByKeyDownInternal(focusCell);
                if (this.colCount <= col) {
                    return;
                }
                _moveFocusCell.call(this, col, Math.min(this.frozenRowCount, this.rowCount - 1), false);
            }
        }
        cancelEvent(e);
    }
    else if (this.keyboardOptions?.selectAllOnCtrlA && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ALPHA_A && (e.ctrlKey || e.metaKey)) {
        this.selection.range = {
            start: { col: 0, row: 0 },
            end: { col: this.colCount - 1, row: this.rowCount - 1 }
        };
        this.invalidate();
        cancelEvent(e);
    }
    function move(grid, vDir, hDir) {
        const row = vDir === 'S' ? grid.rowCount - 1 : vDir === 'N' ? 0 : focusCell.row;
        const col = hDir === 'E' ? grid.colCount - 1 : hDir === 'W' ? 0 : focusCell.col;
        _moveFocusCell.call(grid, col, row, shiftKey);
    }
    function vmove(vDir, shiftKeyFlg = shiftKey) {
        let row;
        if (vDir === 'S') {
            row = this.getMoveDownRowByKeyDownInternal(focusCell);
            if (this.rowCount <= row) {
                return false;
            }
        }
        else {
            row = this.getMoveUpRowByKeyDownInternal(focusCell);
            if (row < 0) {
                return false;
            }
        }
        const { col } = focusCell;
        _moveFocusCell.call(this, col, row, shiftKeyFlg);
        return true;
    }
    function hmove(hDir, shiftKeyFlg = shiftKey) {
        let col;
        if (hDir === 'E') {
            col = this.getMoveRightColByKeyDownInternal(focusCell);
            if (this.colCount <= col) {
                return false;
            }
        }
        else {
            col = this.getMoveLeftColByKeyDownInternal(focusCell);
            if (col < 0) {
                return false;
            }
        }
        const { row } = focusCell;
        _moveFocusCell.call(this, col, row, shiftKeyFlg);
        return true;
    }
}
function _moveFocusCell(col, row, shiftKey) {
    const offset = this.getOffsetInvalidateCells();
    function extendRange(range) {
        if (offset > 0) {
            range.start.col -= offset;
            range.start.row -= offset;
            range.end.col += offset;
            range.end.row += offset;
        }
        return range;
    }
    const beforeRange = extendRange(this.selection.range);
    const beforeRect = this.getCellRangeRect(beforeRange);
    this.selection._setFocusCell(col, row, shiftKey);
    this.makeVisibleCell(col, row);
    this.focusCell(col, row);
    const afterRange = extendRange(this.selection.range);
    const afterRect = this.getCellRangeRect(afterRange);
    if (afterRect.intersection(beforeRect)) {
        const invalidateRect = _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect.max(afterRect, beforeRect);
        _invalidateRect(this, invalidateRect);
    }
    else {
        _invalidateRect(this, beforeRect);
        _invalidateRect(this, afterRect);
    }
}
function _updatedSelection() {
    const { focusControl } = this[_];
    const { col: selCol, row: selRow } = this[_].selection.select;
    const results = this.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.EDITABLEINPUT_CELL, {
        col: selCol,
        row: selRow
    });
    const editMode = _internal_utils__WEBPACK_IMPORTED_MODULE_4__.array.findIndex(results, (v) => !!v) >= 0;
    focusControl.editMode = editMode;
    if (editMode) {
        focusControl.storeInputStatus();
        focusControl.setDefaultInputStatus();
        this.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, {
            col: selCol,
            row: selRow,
            input: focusControl.input
        });
    }
}
function _getMouseAbstractPoint(grid, evt) {
    let e;
    if (isTouchEvent(evt)) {
        e = evt.changedTouches[0];
    }
    else {
        e = evt;
    }
    const clientX = e.clientX || e.pageX + window.scrollX;
    const clientY = e.clientY || e.pageY + window.scrollY;
    const rect = grid[_].canvas.getBoundingClientRect();
    if (rect.right <= clientX) {
        return null;
    }
    if (rect.bottom <= clientY) {
        return null;
    }
    const x = clientX - rect.left + grid[_].scroll.left;
    const y = clientY - rect.top + grid[_].scroll.top;
    return { x, y };
}
function _bindEvents() {
    // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias
    const grid = this;
    const { handler, element, scrollable } = grid[_];
    const getCellEventArgsSet = (e) => {
        const abstractPos = _getMouseAbstractPoint(grid, e);
        if (!abstractPos) {
            return {};
        }
        const cell = grid.getCellAt(abstractPos.x, abstractPos.y);
        if (cell.col < 0 || cell.row < 0) {
            return {
                abstractPos,
                cell
            };
        }
        const eventArgs = {
            col: cell.col,
            row: cell.row,
            event: e
        };
        return {
            abstractPos,
            cell,
            eventArgs
        };
    };
    const canResizeColumn = (col) => {
        if (grid[_].disableColumnResize) {
            return false;
        }
        const limit = grid[_].colWidthsLimit[col];
        if (!limit || !limit.min || !limit.max) {
            return true;
        }
        return limit.max !== limit.min;
    };
    handler.on(element, 'mousedown', (e) => {
        const eventArgsSet = getCellEventArgsSet(e);
        const { abstractPos, eventArgs } = eventArgsSet;
        if (!abstractPos) {
            return;
        }
        if (eventArgs) {
            const results = grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEDOWN_CELL, eventArgs);
            if (_internal_utils__WEBPACK_IMPORTED_MODULE_4__.array.findIndex(results, (v) => !v) >= 0) {
                return;
            }
        }
        if (getMouseButtons(e) !== 1) {
            return;
        }
        const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y);
        if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
            //幅変更
            grid[_].columnResizer.start(resizeCol, e);
        }
        else {
            //選択
            grid[_].cellSelector.start(e);
        }
    });
    handler.on(element, 'mouseup', (e) => {
        if (!grid.hasListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEUP_CELL)) {
            return;
        }
        const { eventArgs } = getCellEventArgsSet(e);
        if (eventArgs) {
            grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEUP_CELL, eventArgs);
        }
    });
    let doubleTapBefore = null;
    // let longTouchId: NodeJS.Timeout | null = null;
    let longTouchId = 0;
    handler.on(element, 'touchstart', (e) => {
        if (!doubleTapBefore) {
            doubleTapBefore = getCellEventArgsSet(e).eventArgs;
            setTimeout(() => {
                doubleTapBefore = null;
            }, 350);
        }
        else {
            const { eventArgs } = getCellEventArgsSet(e);
            if (eventArgs && eventArgs.col === doubleTapBefore.col && eventArgs.row === doubleTapBefore.row) {
                grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.DBLTAP_CELL, eventArgs);
            }
            doubleTapBefore = null;
            if (e.defaultPrevented) {
                return;
            }
        }
        longTouchId = window.setTimeout(() => {
            //長押しした場合選択モード
            longTouchId = 0;
            const abstractPos = _getMouseAbstractPoint(grid, e);
            if (!abstractPos) {
                return;
            }
            const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y, 15);
            if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
                //幅変更
                grid[_].columnResizer.start(resizeCol, e);
            }
            else {
                //選択
                grid[_].cellSelector.start(e);
            }
        }, 500);
    });
    function cancel(_e) {
        if (longTouchId) {
            window.clearTimeout(longTouchId);
            longTouchId = 0;
        }
    }
    handler.on(element, 'touchcancel', cancel);
    handler.on(element, 'touchmove', cancel);
    handler.on(element, 'touchend', (e) => {
        if (longTouchId) {
            window.clearTimeout(longTouchId);
            grid[_].cellSelector.select(e);
            longTouchId = 0;
        }
    });
    let isMouseover = false;
    let mouseEnterCell = null;
    let mouseOverCell = null;
    function onMouseenterCell(cell, related) {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEENTER_CELL, {
            col: cell.col,
            row: cell.row,
            related
        });
        mouseEnterCell = cell;
    }
    function onMouseleaveCell(related) {
        const beforeMouseCell = mouseEnterCell;
        mouseEnterCell = null;
        if (beforeMouseCell) {
            grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSELEAVE_CELL, {
                col: beforeMouseCell.col,
                row: beforeMouseCell.row,
                related
            });
        }
        return beforeMouseCell || undefined;
    }
    function onMouseoverCell(cell, related) {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEOVER_CELL, {
            col: cell.col,
            row: cell.row,
            related
        });
        mouseOverCell = cell;
    }
    function onMouseoutCell(related) {
        const beforeMouseCell = mouseOverCell;
        mouseOverCell = null;
        if (beforeMouseCell) {
            grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEOUT_CELL, {
                col: beforeMouseCell.col,
                row: beforeMouseCell.row,
                related
            });
        }
        return beforeMouseCell || undefined;
    }
    const scrollElement = scrollable.getElement();
    handler.on(scrollElement, 'mouseover', (_e) => {
        isMouseover = true;
    });
    handler.on(scrollElement, 'mouseout', (_e) => {
        isMouseover = false;
        onMouseoutCell();
    });
    handler.on(element, 'mouseleave', (_e) => {
        onMouseleaveCell();
    });
    handler.on(element, 'mousemove', (e) => {
        const eventArgsSet = getCellEventArgsSet(e);
        const { abstractPos, eventArgs } = eventArgsSet;
        if (eventArgs) {
            const beforeMouseCell = mouseEnterCell;
            if (beforeMouseCell) {
                grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
                if (beforeMouseCell.col !== eventArgs.col || beforeMouseCell.row !== eventArgs.row) {
                    const enterCell = {
                        col: eventArgs.col,
                        row: eventArgs.row
                    };
                    const outCell = onMouseoutCell(enterCell);
                    const leaveCell = onMouseleaveCell(enterCell);
                    onMouseenterCell(enterCell, leaveCell);
                    if (isMouseover) {
                        onMouseoverCell(enterCell, outCell);
                    }
                }
                else if (isMouseover && !mouseOverCell) {
                    onMouseoverCell({
                        col: eventArgs.col,
                        row: eventArgs.row
                    });
                }
            }
            else {
                const enterCell = {
                    col: eventArgs.col,
                    row: eventArgs.row
                };
                onMouseenterCell(enterCell);
                if (isMouseover) {
                    onMouseoverCell(enterCell);
                }
                grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
            }
        }
        else {
            onMouseoutCell();
            onMouseleaveCell();
        }
        if (grid[_].columnResizer.moving(e) || grid[_].cellSelector.moving(e)) {
            return;
        }
        const { style } = element;
        if (!abstractPos) {
            if (style.cursor === 'col-resize') {
                style.cursor = '';
            }
            return;
        }
        const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y);
        if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
            style.cursor = 'col-resize';
        }
        else {
            if (style.cursor === 'col-resize') {
                style.cursor = '';
            }
        }
    });
    handler.on(element, 'click', (e) => {
        if (grid[_].columnResizer.lastMoving(e) || grid[_].cellSelector.lastMoving(e)) {
            return;
        }
        if (!grid.hasListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.CLICK_CELL)) {
            return;
        }
        const { eventArgs } = getCellEventArgsSet(e);
        if (!eventArgs) {
            return;
        }
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.CLICK_CELL, eventArgs);
    });
    handler.on(element, 'contextmenu', (e) => {
        if (!grid.hasListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.CONTEXTMENU_CELL)) {
            return;
        }
        const { eventArgs } = getCellEventArgsSet(e);
        if (!eventArgs) {
            return;
        }
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.CONTEXTMENU_CELL, eventArgs);
    });
    handler.on(element, 'dblclick', (e) => {
        if (!grid.hasListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.DBLCLICK_CELL)) {
            return;
        }
        const { eventArgs } = getCellEventArgsSet(e);
        if (!eventArgs) {
            return;
        }
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.DBLCLICK_CELL, eventArgs);
    });
    grid[_].focusControl.onKeyDown((evt) => {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.KEYDOWN, evt);
    });
    grid[_].selection.listen(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.SELECTED_CELL, (data) => {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.SELECTED_CELL, data, data.selected);
    });
    scrollable.onScroll((e) => {
        _onScroll(grid, e);
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.SCROLL, { event: e });
    });
    grid[_].focusControl.onKeyDownMove((e) => {
        _onKeyDownMove.call(grid, e);
    });
    grid.listen('copydata', (range) => {
        const copyRange = grid.getCopyRangeInternal(range);
        let copyValue = '';
        for (let { row } = copyRange.start; row <= copyRange.end.row; row++) {
            for (let { col } = copyRange.start; col <= copyRange.end.col; col++) {
                const copyCellValue = grid.getCopyCellValue(col, row, copyRange);
                if (typeof Promise !== 'undefined' && copyCellValue instanceof Promise) {
                    //非同期データは取得できない
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    const strCellValue = `${copyCellValue}`;
                    if (/^\[object .*\]$/.exec(strCellValue)) {
                        //object は無視
                    }
                    else {
                        copyValue += strCellValue;
                    }
                }
                if (col < copyRange.end.col) {
                    copyValue += '\t';
                }
            }
            copyValue += '\n';
        }
        return copyValue;
    });
    grid[_].focusControl.onCopy((_e) => _internal_utils__WEBPACK_IMPORTED_MODULE_4__.array.find(grid.fireListeners('copydata', grid[_].selection.range), (r) => r != null));
    grid[_].focusControl.onPaste(({ value, event }) => {
        const normalizeValue = value.replace(/\r?\n$/, '');
        const { col, row } = grid[_].selection.select;
        const multi = /[\r\n\u2028\u2029\t]/.test(normalizeValue); // is multi cell values
        let rangeBoxValues = null;
        const pasteCellEvent = {
            col,
            row,
            value,
            normalizeValue,
            multi,
            get rangeBoxValues() {
                return rangeBoxValues ?? (rangeBoxValues = (0,_internal_paste_utils__WEBPACK_IMPORTED_MODULE_13__.parsePasteRangeBoxValues)(normalizeValue));
            },
            event
        };
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.PASTE_CELL, pasteCellEvent);
    });
    grid[_].focusControl.onInput((value) => {
        const { col, row } = grid[_].selection.select;
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.INPUT_CELL, { col, row, value });
    });
    grid[_].focusControl.onDelete((event) => {
        const { col, row } = grid[_].selection.select;
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.DELETE_CELL, { col, row, event });
    });
    grid[_].focusControl.onFocus((e) => {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.FOCUS_GRID, e);
        grid[_].focusedGrid = true;
        const { col, row } = grid[_].selection.select;
        grid.invalidateCell(col, row);
    });
    grid[_].focusControl.onBlur((e) => {
        grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.BLUR_GRID, e);
        grid[_].focusedGrid = false;
        const { col, row } = grid[_].selection.select;
        grid.invalidateCell(col, row);
    });
}
function _getResizeColAt(grid, abstractX, abstractY, offset = 5) {
    if (grid[_].frozenRowCount <= 0) {
        return -1;
    }
    const frozenRect = _getFrozenRowsRect(grid);
    if (!frozenRect.inPoint(abstractX, abstractY)) {
        return -1;
    }
    const cell = grid.getCellAt(abstractX, abstractY);
    const cellRect = grid.getCellRect(cell.col, cell.row);
    if (abstractX < cellRect.left + offset) {
        return cell.col - 1;
    }
    if (cellRect.right - offset < abstractX) {
        return cell.col;
    }
    return -1;
}
function _getVisibleRect(grid) {
    const { scroll: { left, top }, canvas: { width, height } } = grid[_];
    return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(left, top, width, height);
}
function _getScrollableVisibleRect(grid) {
    let frozenColsWidth = 0;
    if (grid[_].frozenColCount > 0) {
        //固定列がある場合固定列分描画
        const frozenRect = _getFrozenColsRect(grid);
        frozenColsWidth = frozenRect.width;
    }
    let frozenRowsHeight = 0;
    if (grid[_].frozenRowCount > 0) {
        //固定列がある場合固定列分描画
        const frozenRect = _getFrozenRowsRect(grid);
        frozenRowsHeight = frozenRect.height;
    }
    return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(grid[_].scrollable.scrollLeft + frozenColsWidth, grid[_].scrollable.scrollTop + frozenRowsHeight, grid[_].canvas.width - frozenColsWidth, grid[_].canvas.height - frozenRowsHeight);
}
function _toRelativeRect(grid, absoluteRect) {
    const rect = absoluteRect.copy();
    const visibleRect = _getVisibleRect(grid);
    rect.offsetLeft(-visibleRect.left);
    rect.offsetTop(-visibleRect.top);
    return rect;
}
//end private methods
/**
 * managing mouse down moving
 * @private
 */
class BaseMouseDownMover {
    _grid;
    _handler;
    _events;
    _started;
    _moved;
    _mouseEndPoint;
    constructor(grid) {
        this._grid = grid;
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_6__.EventHandler();
        this._events = {};
        this._started = false;
        this._moved = false;
    }
    moving(_e) {
        return !!this._started;
    }
    lastMoving(e) {
        // mouseup後すぐに、clickイベントを反応しないようにする制御要
        if (this.moving(e)) {
            return true;
        }
        const last = this._mouseEndPoint;
        if (!last) {
            return false;
        }
        const pt = _getMouseAbstractPoint(this._grid, e);
        return pt != null && pt.x === last.x && pt.y === last.y;
    }
    _bindMoveAndUp(e) {
        const events = this._events;
        const handler = this._handler;
        if (!isTouchEvent(e)) {
            events.mousemove = handler.on(document.body, 'mousemove', (e) => this._mouseMove(e));
            events.mouseup = handler.on(document.body, 'mouseup', (e) => this._mouseUp(e));
        }
        else {
            events.touchmove = handler.on(document.body, 'touchmove', (e) => this._mouseMove(e), { passive: false });
            events.touchend = handler.on(document.body, 'touchend', (e) => this._mouseUp(e));
            events.touchcancel = handler.on(document.body, 'touchcancel', (e) => this._mouseUp(e));
        }
        this._started = true;
        this._moved = false;
    }
    _mouseMove(e) {
        if (!isTouchEvent(e)) {
            if (getMouseButtons(e) !== 1) {
                this._mouseUp(e);
                return;
            }
        }
        this._moved = this._moveInternal(e) || this._moved; /*calculation on after*/
        cancelEvent(e);
    }
    _moveInternal(_e) {
        //protected
        return false;
    }
    _mouseUp(e) {
        const events = this._events;
        const handler = this._handler;
        handler.off(events.mousemove);
        handler.off(events.touchmove);
        handler.off(events.mouseup);
        handler.off(events.touchend);
        // handler.off(this._events.mouseleave);
        handler.off(events.touchcancel);
        this._started = false;
        this._upInternal(e);
        // mouseup後すぐに、clickイベントを反応しないようにする制御要
        if (this._moved) {
            //移動が発生していたら
            this._mouseEndPoint = _getMouseAbstractPoint(this._grid, e);
            setTimeout(() => {
                this._mouseEndPoint = null;
            }, 10);
        }
    }
    _upInternal(_e) {
        //protected
    }
    dispose() {
        this._handler.dispose();
    }
}
/**
 * managing cell selection operation with mouse
 * @private
 */
class CellSelector extends BaseMouseDownMover {
    _cell;
    start(e) {
        const cell = this._getTargetCell(e);
        if (!cell) {
            return;
        }
        _moveFocusCell.call(this._grid, cell.col, cell.row, e.shiftKey);
        this._bindMoveAndUp(e);
        this._cell = cell;
        cancelEvent(e);
        _vibrate(e);
    }
    select(e) {
        const cell = this._getTargetCell(e);
        if (!cell) {
            return;
        }
        _moveFocusCell.call(this._grid, cell.col, cell.row, e.shiftKey);
        this._cell = cell;
    }
    _moveInternal(e) {
        const cell = this._getTargetCell(e);
        if (!cell) {
            return false;
        }
        const { col: oldCol, row: oldRow } = this._cell;
        const { col: newCol, row: newRow } = cell;
        if (oldCol === newCol && oldRow === newRow) {
            return false;
        }
        const grid = this._grid;
        _moveFocusCell.call(grid, newCol, newRow, true);
        //make visible
        const makeVisibleCol = (() => {
            if (newCol < oldCol && 0 < newCol) {
                // move left
                return newCol - 1;
            }
            else if (oldCol < newCol && newCol + 1 < grid.colCount) {
                // move right
                return newCol + 1;
            }
            return newCol;
        })();
        const makeVisibleRow = (() => {
            if (newRow < oldRow && 0 < newRow) {
                // move up
                return newRow - 1;
            }
            else if (oldRow < newRow && newRow + 1 < grid.rowCount) {
                // move down
                return newRow + 1;
            }
            return newRow;
        })();
        if (makeVisibleCol !== newCol || makeVisibleRow !== newRow) {
            grid.makeVisibleCell(makeVisibleCol, makeVisibleRow);
        }
        this._cell = cell;
        return true;
    }
    _getTargetCell(e) {
        const grid = this._grid;
        const abstractPos = _getMouseAbstractPoint(grid, e);
        if (!abstractPos) {
            return null;
        }
        const cell = grid.getCellAt(abstractPos.x, abstractPos.y);
        if (cell.col < 0 || cell.row < 0) {
            return null;
        }
        return cell;
    }
}
/**
 * managing row width changing operation with mouse
 * @private
 */
class ColumnResizer extends BaseMouseDownMover {
    _targetCol;
    _x = -1;
    _preX = -1;
    _invalidateAbsoluteLeft = -1;
    constructor(grid) {
        super(grid);
        this._targetCol = -1;
    }
    start(col, e) {
        let pageX;
        if (!isTouchEvent(e)) {
            ({ pageX } = e);
        }
        else {
            ({ pageX } = e.changedTouches[0]);
        }
        this._x = pageX;
        this._preX = 0;
        this._bindMoveAndUp(e);
        this._targetCol = col;
        this._invalidateAbsoluteLeft = _getColsWidth(this._grid, 0, col - 1);
        cancelEvent(e);
        _vibrate(e);
    }
    _moveInternal(e) {
        const pageX = isTouchEvent(e) ? e.changedTouches[0].pageX : e.pageX;
        const x = pageX - this._x;
        const moveX = x - this._preX;
        this._preX = x;
        const pre = this._grid.getColWidth(this._targetCol);
        let afterSize = _adjustColWidth(this._grid, this._targetCol, pre + moveX);
        if (afterSize < 10 && moveX < 0) {
            afterSize = 10;
        }
        _storeAutoColWidthExprs(this._grid);
        _setColWidth(this._grid, this._targetCol, afterSize);
        const rect = _getVisibleRect(this._grid);
        rect.left = this._invalidateAbsoluteLeft;
        _invalidateRect(this._grid, rect);
        this._grid.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.RESIZE_COLUMN, {
            col: this._targetCol
        });
        return true;
    }
    _upInternal(_e) {
        const grid = this._grid;
        if (grid.updateScroll()) {
            grid.invalidate();
        }
    }
}
function setSafeInputValue(input, value) {
    const { type } = input;
    input.type = '';
    input.value = value;
    if (type) {
        input.type = type;
    }
}
/**
 * Manage focus
 * @private
 */
class FocusControl extends _EventTarget__WEBPACK_IMPORTED_MODULE_7__.EventTarget {
    _grid;
    _scrollable;
    _handler;
    _input;
    _isComposition;
    _compositionEnd;
    _inputStatus;
    _keyDownMoveCallback;
    constructor(grid, parentElement, scrollable) {
        super();
        this._grid = grid;
        this._scrollable = scrollable;
        const handler = (this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_6__.EventHandler());
        const input = (this._input = document.createElement('input'));
        input.classList.add('grid-focus-control');
        input.readOnly = true;
        parentElement.appendChild(input);
        handler.on(input, 'compositionstart', (_e) => {
            input.classList.add('composition');
            input.style.font = grid.font || '16px sans-serif';
            this._isComposition = true;
            if (this._compositionEnd) {
                clearTimeout(this._compositionEnd);
                delete this._compositionEnd;
            }
            grid.focus();
        });
        let lastInputValue;
        const inputClear = (storeLastInputValue) => {
            lastInputValue = input.value;
            if (this._isComposition) {
                return;
            }
            if (lastInputValue !== '') {
                setSafeInputValue(input, '');
            }
            if (!storeLastInputValue) {
                lastInputValue = '';
            }
        };
        const handleCompositionEnd = () => {
            this._isComposition = false;
            input.classList.remove('composition');
            input.style.font = '';
            const { value } = input;
            inputClear(false);
            if (!input.readOnly) {
                this.fireListeners('input', value);
            }
            if (this._compositionEnd) {
                clearTimeout(this._compositionEnd);
                delete this._compositionEnd;
            }
        };
        handler.on(input, 'compositionend', (_e) => {
            this._compositionEnd = window.setTimeout(handleCompositionEnd, 1);
        });
        handler.on(input, 'keypress', (e) => {
            if (this._isComposition) {
                return;
            }
            if (!input.readOnly && e.key && e.key.length === 1) {
                if (e.ctrlKey || e.metaKey) {
                    if (e.key === 'c') {
                        //copy! for Firefox & Safari
                    }
                    else if (e.key === 'v') {
                        //paste! for Firefox & Safari
                    }
                }
                else {
                    if (e.key === ' ') {
                        // Since the full-width space cannot be determined, it is processed by "input".
                        return;
                    }
                    this.fireListeners('input', e.key);
                    cancelEvent(e);
                }
            }
            inputClear(true);
        });
        handler.on(input, 'keydown', (e) => {
            if (this._isComposition) {
                if (this._compositionEnd) {
                    handleCompositionEnd();
                    cancelEvent(e);
                }
                return;
            }
            const keyCode = getKeyCode(e);
            let stopCellMove = false;
            const evt = {
                keyCode,
                event: e,
                stopCellMoving() {
                    stopCellMove = true;
                }
            };
            this.fireListeners('keydown', evt);
            if (!input.readOnly && lastInputValue) {
                // for Safari
                this.fireListeners('input', lastInputValue);
            }
            if (!stopCellMove) {
                this.fireKeyDownMove(keyCode, e);
            }
            if (this._grid.keyboardOptions?.deleteCellValueOnDel && (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_DEL || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_BS)) {
                this.fireListeners('delete', e);
            }
            inputClear(true);
        });
        handler.on(input, 'keyup', (_e) => {
            if (this._isComposition) {
                if (this._compositionEnd) {
                    handleCompositionEnd();
                }
            }
            inputClear(true);
        });
        handler.on(input, 'input', (e) => {
            if (e.data === ' ' || e.data === '　') {
                // Since the full-width space cannot be determined on "keypress", it is processed by "input".
                this.fireListeners('input', e.data);
            }
            inputClear(true);
        });
        if (_internal_utils__WEBPACK_IMPORTED_MODULE_4__.browser.IE) {
            handler.on(document, 'keydown', (e) => {
                if (e.target !== input) {
                    return;
                }
                const keyCode = getKeyCode(e);
                if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ALPHA_C && e.ctrlKey) {
                    // When text is not selected copy-event is not emit, on IE.
                    setSafeInputValue(input, 'dummy');
                    input.select();
                    setTimeout(() => {
                        setSafeInputValue(input, '');
                    }, 100);
                }
                else if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ALPHA_V && e.ctrlKey) {
                    // When input is read-only paste-event is not emit, on IE.
                    if (input.readOnly) {
                        input.readOnly = false;
                        setTimeout(() => {
                            input.readOnly = true;
                            setSafeInputValue(input, '');
                        }, 10);
                    }
                }
            });
        }
        if (_internal_utils__WEBPACK_IMPORTED_MODULE_4__.browser.Edge) {
            handler.once(document, 'keydown', (e) => {
                if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isDescendantElement)(parentElement, e.target)) {
                    return;
                }
                // When the input has focus on the first page opening, the paste-event and copy-event is not emit, on Edge.
                const dummyInput = document.createElement('input');
                grid.getElement().appendChild(dummyInput);
                dummyInput.focus();
                input.focus();
                dummyInput.parentElement?.removeChild(dummyInput);
            });
        }
        handler.on(document, 'paste', (e) => {
            if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isDescendantElement)(parentElement, e.target)) {
                return;
            }
            let pasteText = undefined;
            if (_internal_utils__WEBPACK_IMPORTED_MODULE_4__.browser.IE) {
                // IE
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                pasteText = window.clipboardData.getData('Text');
            }
            else {
                const { clipboardData } = e;
                if (clipboardData.items) {
                    // Chrome & Firefox & Edge
                    pasteText = clipboardData.getData('text/plain');
                }
                else {
                    // Safari
                    if (-1 !== Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                        pasteText = clipboardData.getData('Text');
                    }
                }
            }
            if (pasteText != null && pasteText.length) {
                this.fireListeners('paste', { value: pasteText, event: e });
            }
        });
        handler.on(document, 'copy', (e) => {
            if (this._isComposition) {
                return;
            }
            if (!(0,_internal_utils__WEBPACK_IMPORTED_MODULE_4__.isDescendantElement)(parentElement, e.target)) {
                return;
            }
            setSafeInputValue(input, '');
            const data = _internal_utils__WEBPACK_IMPORTED_MODULE_4__.array.find(this.fireListeners('copy'), (r) => r != null);
            if (data != null) {
                cancelEvent(e);
                if (_internal_utils__WEBPACK_IMPORTED_MODULE_4__.browser.IE) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    window.clipboardData.setData('Text', data); // IE
                }
                else {
                    e.clipboardData.setData('text/plain', data); // Chrome, Firefox
                }
            }
        });
        handler.on(input, 'focus', (e) => {
            this.fireListeners('focus', e);
        });
        handler.on(input, 'blur', (e) => {
            this.fireListeners('blur', e);
        });
    }
    fireKeyDownMove(keyCode, e) {
        const fn = this._keyDownMoveCallback;
        if (!fn) {
            return;
        }
        if (this._isComposition) {
            return;
        }
        if (keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_LEFT || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_UP || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_RIGHT || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_DOWN || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_HOME || keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_END) {
            fn(e);
        }
        else if (this._grid.keyboardOptions?.moveCellOnTab && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_TAB) {
            fn(e);
        }
        else if (this._grid.keyboardOptions?.moveCellOnEnter && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ENTER) {
            fn(e);
        }
        else if (this._grid.keyboardOptions?.selectAllOnCtrlA && keyCode === _internal_KEY_CODE__WEBPACK_IMPORTED_MODULE_0__.KEY_ALPHA_A && (e.ctrlKey || e.metaKey)) {
            fn(e);
        }
    }
    onKeyDownMove(fn) {
        this._keyDownMoveCallback = fn;
    }
    onKeyDown(fn) {
        return this.listen('keydown', fn);
    }
    onInput(fn) {
        return this.listen('input', fn);
    }
    onDelete(fn) {
        return this.listen('delete', fn);
    }
    onCopy(fn) {
        return this.listen('copy', fn);
    }
    onPaste(fn) {
        return this.listen('paste', fn);
    }
    onFocus(fn) {
        return this.listen('focus', fn);
    }
    onBlur(fn) {
        return this.listen('blur', fn);
    }
    focus() {
        // this._input.value = '';
        this._input.focus();
    }
    setFocusRect(rect) {
        const input = this._input;
        const top = this._scrollable.calcTop(rect.top);
        input.style.top = `${(top - _internal_style__WEBPACK_IMPORTED_MODULE_3__.getScrollBarSize()).toFixed()}px`; //position:relative だとずれるが、IEは position:relativeじゃないと最大値まで利用できない
        input.style.left = `${rect.left.toFixed()}px`;
        input.style.width = `${rect.width.toFixed()}px`;
        input.style.height = `${rect.height.toFixed()}px`;
    }
    get editMode() {
        return !this._input.readOnly;
    }
    set editMode(editMode) {
        this._input.readOnly = !editMode;
    }
    resetInputStatus() {
        const el = this._input;
        if (!el.classList.contains('grid-focus-control--stored-status')) {
            return;
        }
        const composition = el.classList.contains('composition');
        const atts = el.attributes;
        const removeNames = [];
        for (let i = 0, n = atts.length; i < n; i++) {
            const att = atts[i];
            if (!this._inputStatus?.hasOwnProperty(att.nodeName)) {
                removeNames.push(att.name);
            }
        }
        removeNames.forEach((removeName) => {
            el.removeAttribute(removeName);
        });
        for (const name in this._inputStatus) {
            el.setAttribute(name, this._inputStatus[name]);
        }
        if (composition) {
            el.classList.add('composition');
            el.style.font = this._grid.font || '16px sans-serif';
        }
        else {
            el.classList.remove('composition');
        }
        el.classList.remove('grid-focus-control--stored-status');
    }
    storeInputStatus() {
        const el = this._input;
        if (el.classList.contains('grid-focus-control--stored-status')) {
            return;
        }
        const inputStatus = (this._inputStatus = {});
        const atts = el.attributes;
        for (let i = 0, n = atts.length; i < n; i++) {
            const att = atts[i];
            inputStatus[att.name] = att.value;
        }
        el.classList.add('grid-focus-control--stored-status');
    }
    setDefaultInputStatus() {
        // なぜかスクロールが少しずつずれていくことがあるのでここではセットしない。
        // this._input.style.font = this._grid.font || '16px sans-serif';
    }
    get input() {
        return this._input;
    }
    dispose() {
        super.dispose();
        this._handler.dispose();
    }
}
/**
 * Selected area management
 */
class Selection extends _EventTarget__WEBPACK_IMPORTED_MODULE_7__.EventTarget {
    _grid;
    _sel;
    _focus;
    _start;
    _end;
    _isWraped;
    constructor(grid) {
        super();
        this._grid = grid;
        this._sel = { col: 0, row: 0 };
        this._focus = { col: 0, row: 0 };
        this._start = { col: 0, row: 0 };
        this._end = { col: 0, row: 0 };
    }
    get range() {
        const start = this._start;
        const end = this._end;
        const startCol = Math.min(start.col, end.col);
        const startRow = Math.min(start.row, end.row);
        const endCol = Math.max(start.col, end.col);
        const endRow = Math.max(start.row, end.row);
        return {
            start: {
                col: startCol,
                row: startRow
            },
            end: {
                col: endCol,
                row: endRow
            }
        };
    }
    set range(range) {
        const startCol = Math.min(range.start.col, range.end.col);
        const startRow = Math.min(range.start.row, range.end.row);
        const endCol = Math.max(range.start.col, range.end.col);
        const endRow = Math.max(range.start.row, range.end.row);
        this._wrapFireSelectedEvent(() => {
            this._sel = {
                col: startCol,
                row: startRow
            };
            this._focus = {
                col: startCol,
                row: startRow
            };
            this._start = {
                col: startCol,
                row: startRow
            };
            this._end = {
                col: endCol,
                row: endRow
            };
            _updatedSelection.call(this._grid);
        });
    }
    get focus() {
        const { col, row } = this._focus;
        return { col, row };
    }
    get select() {
        const { col, row } = this._sel;
        return { col, row };
    }
    set select(cell) {
        this._wrapFireSelectedEvent(() => {
            const { col = 0, row = 0 } = cell;
            this._setSelectCell(col, row);
            this._setFocusCell(col, row, true);
            _updatedSelection.call(this._grid);
        });
    }
    _setSelectCell(col, row) {
        this._wrapFireSelectedEvent(() => {
            this._sel = { col, row };
            this._start = { col, row };
        });
    }
    _setFocusCell(col, row, keepSelect) {
        this._wrapFireSelectedEvent(() => {
            if (!keepSelect) {
                this._setSelectCell(col, row);
            }
            this._focus = { col, row };
            this._end = { col, row };
        });
    }
    _wrapFireSelectedEvent(callback) {
        if (this._isWraped) {
            callback();
        }
        else {
            this._isWraped = true;
            try {
                const before = {
                    col: this._sel.col,
                    row: this._sel.row,
                    selected: false,
                    after: null
                };
                callback();
                const after = {
                    col: this._sel.col,
                    row: this._sel.row,
                    selected: true,
                    before: {
                        col: before.col,
                        row: before.row
                    }
                };
                before.after = {
                    col: after.col,
                    row: after.row
                };
                this.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.SELECTED_CELL, before);
                this.fireListeners(_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE.SELECTED_CELL, after);
            }
            finally {
                this._isWraped = false;
            }
        }
    }
    _updateGridRange() {
        const { rowCount, colCount } = this._grid;
        const points = [this._sel, this._focus, this._start, this._end];
        let needChange = false;
        for (let i = 0; i < points.length; i++) {
            if (colCount <= points[i].col || rowCount <= points[i].row) {
                needChange = true;
                break;
            }
        }
        if (!needChange) {
            return false;
        }
        this._wrapFireSelectedEvent(() => {
            points.forEach((p) => {
                p.col = Math.min(colCount - 1, p.col);
                p.row = Math.min(rowCount - 1, p.row);
            });
        });
        return true;
    }
}
/**
 * This class manages the drawing process for each layer
 */
class DrawLayers {
    _layers;
    constructor() {
        this._layers = {};
    }
    addDraw(level, fn) {
        const l = this._layers[level] || (this._layers[level] = new DrawLayer(level));
        l.addDraw(fn);
    }
    draw(ctx) {
        const list = [];
        for (const k in this._layers) {
            list.push(this._layers[k]);
        }
        list.sort((a, b) => a.level - b.level);
        list.forEach((l) => l.draw(ctx));
    }
}
class DrawLayer {
    _level;
    _list;
    constructor(level) {
        this._level = level;
        this._list = [];
    }
    get level() {
        return this._level;
    }
    addDraw(fn) {
        this._list.push(fn);
    }
    draw(ctx) {
        this._list.forEach((fn) => {
            ctx.save();
            try {
                fn(ctx);
            }
            finally {
                ctx.restore();
            }
        });
    }
}
/**
 * Context of cell drawing
 * @private
 */
class DrawCellContext {
    _col;
    _row;
    _mode;
    _ctx;
    _rect;
    _drawRect;
    _drawing;
    _selection;
    _drawLayers;
    _childContexts;
    _cancel;
    _grid;
    _onTerminate;
    _rectFilter = null;
    //  private _grid: any;
    //  private _onTerminate: any;
    /**
     * constructor
     * @param {number} col index of column
     * @param {number} row index of row
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Rect} rect rect of cell area
     * @param {Rect} drawRect rect of drawing area
     * @param {boolean} drawing `true` if drawing is in progress
     * @param {object} selection the selection
     * @param {Array} drawLayers array of draw layers
     * @private
     */
    constructor(col, row, ctx, rect, drawRect, drawing, selection, drawLayers) {
        this._col = col;
        this._row = row;
        this._mode = 0;
        this._ctx = ctx;
        this._rect = rect;
        this._drawRect = drawRect;
        this._drawing = drawing;
        this._selection = selection;
        this._drawLayers = drawLayers;
        this._childContexts = [];
    }
    get drawing() {
        if (this._mode === 0) {
            return this._drawing;
        }
        else {
            return true;
        }
    }
    get row() {
        return this._row;
    }
    get col() {
        return this._col;
    }
    cancel() {
        this._cancel = true;
        this._childContexts.forEach((ctx) => {
            ctx.cancel();
        });
    }
    /**
     * select status.
     * @return {object} select status
     */
    getSelection() {
        return {
            select: this._selection.select,
            range: this._selection.range
        };
    }
    /**
     * Canvas context.
     * @return {CanvasRenderingContext2D} Canvas context.
     */
    getContext() {
        if (this._mode === 0) {
            return this._ctx;
        }
        else {
            return _getInitContext.call(this._grid);
        }
    }
    /**
     * Rectangle of cell.
     * @return {Rect} rect Rectangle of cell.
     */
    getRect() {
        const rectFilter = this._rectFilter;
        return rectFilter ? rectFilter(this._getRectInternal()) : this._getRectInternal();
    }
    setRectFilter(rectFilter) {
        this._rectFilter = rectFilter;
    }
    /**
     * Rectangle of Drawing range.
     * @return {Rect} Rectangle of Drawing range.
     */
    getDrawRect() {
        if (this._cancel) {
            return null;
        }
        if (this._mode === 0) {
            return this._drawRect;
        }
        else {
            if (this._isOutOfRange()) {
                return null;
            }
            const absoluteRect = this._grid.getCellRect(this._col, this._row);
            return this._toRelativeDrawRect(absoluteRect);
        }
    }
    _isOutOfRange() {
        const { colCount, rowCount } = this._grid;
        return colCount <= this._col || rowCount <= this._row;
    }
    /**
     * get Context of current state
     * @return {DrawCellContext} current DrawCellContext.
     */
    toCurrentContext() {
        if (this._mode === 0) {
            return this;
        }
        else {
            const absoluteRect = this._grid.getCellRect(this._col, this._row);
            const rect = _toRelativeRect(this._grid, absoluteRect);
            const drawRect = this._isOutOfRange() ? null : this._toRelativeDrawRect(absoluteRect);
            const context = new DrawCellContext(this._col, this._row, this.getContext(), rect, drawRect, this.drawing, this._selection, this._drawLayers);
            // toCurrentContext は自分の toCurrentContextを呼ばせる
            context.toCurrentContext = this.toCurrentContext.bind(this);
            this._childContexts.push(context);
            if (this._cancel) {
                context.cancel();
            }
            context._rectFilter = this._rectFilter;
            return context;
        }
    }
    addLayerDraw(level, fn) {
        this._drawLayers.addDraw(level, fn);
    }
    _toRelativeDrawRect(absoluteRect) {
        const visibleRect = _getVisibleRect(this._grid);
        let rect = absoluteRect.copy();
        if (!rect.intersection(visibleRect)) {
            return null;
        }
        const grid = this._grid;
        const isFrozenCell = grid.isFrozenCell(this._col, this._row);
        if (grid.frozenColCount >= 0 && (!isFrozenCell || !isFrozenCell.col)) {
            const fRect = grid.getCellRect(grid.frozenColCount - 1, this._row);
            rect = _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect.bounds(Math.max(rect.left, fRect.right), rect.top, rect.right, rect.bottom);
        }
        if (grid.frozenRowCount >= 0 && (!isFrozenCell || !isFrozenCell.row)) {
            const fRect = grid.getCellRect(this._col, grid.frozenRowCount - 1);
            rect = _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect.bounds(rect.left, Math.max(rect.top, fRect.bottom), rect.right, rect.bottom);
        }
        if (!rect.intersection(visibleRect)) {
            return null;
        }
        rect.offsetLeft(-visibleRect.left);
        rect.offsetTop(-visibleRect.top);
        return rect;
    }
    _delayMode(grid, onTerminate) {
        this._mode = 1;
        this._ctx = null;
        this._rect = null;
        this._drawRect = null;
        this._grid = grid;
        this._onTerminate = onTerminate;
    }
    /**
     * terminate
     * @return {void}
     */
    terminate() {
        if (this._mode !== 0) {
            this._onTerminate?.();
        }
    }
    _getRectInternal() {
        if (this._mode === 0) {
            return this._rect;
        }
        else {
            if (this._rect) {
                return this._rect;
            }
            return this._grid.getCellRelativeRect(this._col, this._row);
        }
    }
}
/**
 * DrawGrid
 */
class DrawGrid extends _EventTarget__WEBPACK_IMPORTED_MODULE_7__.EventTarget {
    [_];
    static get EVENT_TYPE() {
        return _DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_5__.DG_EVENT_TYPE;
    }
    constructor(options = {}) {
        super();
        const { rowCount = 10, colCount = 10, frozenColCount = 0, frozenRowCount = 0, defaultRowHeight = 40, defaultColWidth = 80, font, underlayBackgroundColor, keyboardOptions, parentElement, disableColumnResize } = options;
        const protectedSpace = (this[_] = {});
        _internal_style__WEBPACK_IMPORTED_MODULE_3__.initDocument();
        // 装载canvas画布容器
        protectedSpace.element = createRootElement(parentElement);
        // protectedSpace.element = createRoot(parentElement)
        protectedSpace.scrollable = new _internal_Scrollable__WEBPACK_IMPORTED_MODULE_10__.Scrollable();
        protectedSpace.handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_6__.EventHandler();
        protectedSpace.selection = new Selection(this);
        protectedSpace.focusControl = new FocusControl(this, protectedSpace.scrollable.getElement(), protectedSpace.scrollable);
        protectedSpace.canvas = _internal_hiDPI__WEBPACK_IMPORTED_MODULE_2__.transform(document.createElement('canvas'));
        protectedSpace.context = protectedSpace.canvas.getContext('2d', {
            alpha: false
        });
        protectedSpace.rowCount = rowCount;
        protectedSpace.colCount = colCount;
        protectedSpace.frozenColCount = frozenColCount;
        protectedSpace.frozenRowCount = frozenRowCount;
        protectedSpace.defaultRowHeight = defaultRowHeight;
        protectedSpace.defaultColWidth = defaultColWidth;
        protectedSpace.font = font;
        protectedSpace.underlayBackgroundColor = underlayBackgroundColor;
        protectedSpace.keyboardOptions = keyboardOptions;
        protectedSpace.disableColumnResize = disableColumnResize;
        /////
        protectedSpace.rowHeightsMap = new _internal_NumberMap__WEBPACK_IMPORTED_MODULE_8__.NumberMap();
        protectedSpace.colWidthsMap = new _internal_NumberMap__WEBPACK_IMPORTED_MODULE_8__.NumberMap();
        protectedSpace.colWidthsLimit = {};
        protectedSpace.calcWidthContext = {
            _: protectedSpace,
            get full() {
                return this._.canvas.width;
            },
            get em() {
                return (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_11__.getFontSize)(this._.context, this._.font).width;
            }
        };
        protectedSpace.columnResizer = new ColumnResizer(this);
        protectedSpace.cellSelector = new CellSelector(this);
        protectedSpace.drawCells = {};
        protectedSpace.cellTextOverflows = {};
        protectedSpace.focusedGrid = false;
        protectedSpace.element.appendChild(protectedSpace.canvas);
        protectedSpace.element.appendChild(protectedSpace.scrollable.getElement());
        protectedSpace.scroll = {
            left: 0,
            top: 0
        };
        this.updateScroll();
        if (parentElement) {
            parentElement.appendChild(protectedSpace.element);
            this.updateSize();
        }
        else {
            this.updateSize();
        }
        _bindEvents.call(this);
        this.bindEventsInternal();
    }
    /**
     * Get root element.
     * @returns {HTMLElement} root element
     */
    getElement() {
        return this[_].element;
    }
    /**
     * Get canvas element.
     */
    get canvas() {
        return this[_].canvas;
    }
    /**
     * Focus the grid.
     * @return {void}
     */
    focus() {
        const { col, row } = this[_].selection.select;
        this.focusCell(col, row);
    }
    hasFocusGrid() {
        return this[_].focusedGrid;
    }
    /**
     * Get the selection instance.
     */
    get selection() {
        return this[_].selection;
    }
    /**
     * Get the number of rows.
     */
    get rowCount() {
        return this[_].rowCount;
    }
    /**
     * Set the number of rows.
     */
    set rowCount(rowCount) {
        this[_].rowCount = rowCount;
        this.updateScroll();
        if (this[_].selection._updateGridRange()) {
            const { col, row } = this[_].selection.focus;
            this.makeVisibleCell(col, row);
            this.setFocusCursor(col, row);
        }
    }
    /**
     * Get the number of columns.
     */
    get colCount() {
        return this[_].colCount;
    }
    /**
     * Set the number of columns.
     */
    set colCount(colCount) {
        this[_].colCount = colCount;
        this.updateScroll();
        if (this[_].selection._updateGridRange()) {
            const { col, row } = this[_].selection.focus;
            this.makeVisibleCell(col, row);
            this.setFocusCursor(col, row);
        }
    }
    /**
     * Get the number of frozen columns.
     */
    get frozenColCount() {
        return this[_].frozenColCount;
    }
    /**
     * Set the number of frozen columns.
     */
    set frozenColCount(frozenColCount) {
        this[_].frozenColCount = frozenColCount;
    }
    /**
     * Get the number of frozen rows.
     */
    get frozenRowCount() {
        return this[_].frozenRowCount;
    }
    /**
     * Set the number of frozen rows.
     */
    set frozenRowCount(frozenRowCount) {
        this[_].frozenRowCount = frozenRowCount;
    }
    /**
     * Get the default row height.
     *
     */
    get defaultRowHeight() {
        return this[_].defaultRowHeight;
    }
    /**
     * Set the default row height.
     */
    set defaultRowHeight(defaultRowHeight) {
        this[_].defaultRowHeight = defaultRowHeight;
    }
    /**
     * Get the default column width.
     */
    get defaultColWidth() {
        return this[_].defaultColWidth;
    }
    /**
     * Set the default column width.
     */
    set defaultColWidth(defaultColWidth) {
        this[_].defaultColWidth = defaultColWidth;
    }
    /**
     * Get the font definition as a string.
     */
    get font() {
        return this[_].font;
    }
    /**
     * Set the font definition with the given string.
     */
    set font(font) {
        this[_].font = font;
    }
    /**
     * Get the background color of the underlay.
     */
    get underlayBackgroundColor() {
        return this[_].underlayBackgroundColor;
    }
    /**
     * Set the background color of the underlay.
     */
    set underlayBackgroundColor(underlayBackgroundColor) {
        this[_].underlayBackgroundColor = underlayBackgroundColor;
    }
    get keyboardOptions() {
        return this[_].keyboardOptions ?? null;
    }
    set keyboardOptions(keyboardOptions) {
        this[_].keyboardOptions = keyboardOptions ?? undefined;
    }
    configure(name, value) {
        const cfg = this[_].config || (this[_].config = {});
        if (value != null) {
            cfg[name] = value;
        }
        return cfg[name];
    }
    /**
     * 更新画布大小
     * @return {void}
     */
    updateSize() {
        // 清除样式并调整大小
        const { canvas } = this[_];
        canvas.style.width = '';
        canvas.style.height = '';
        const width = Math.floor(canvas.offsetWidth || canvas.parentElement.offsetWidth - _internal_style__WEBPACK_IMPORTED_MODULE_3__.getScrollBarSize() /*for legacy*/);
        const height = Math.floor(canvas.offsetHeight || canvas.parentElement.offsetHeight - _internal_style__WEBPACK_IMPORTED_MODULE_3__.getScrollBarSize() /*for legacy*/);
        canvas.width = width;
        canvas.height = height;
        //整数 为使之一致，设定style返回
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const sel = this[_].selection.select;
        // 重新拾取焦点定位
        this[_].focusControl.setFocusRect(this.getCellRect(sel.col, sel.row));
    }
    resize() {
        if (this.getElement().offsetParent) {
            // 只在元素可见时刷新
            this.updateSize();
            this.updateScroll();
            this.invalidate();
        }
    }
    /**
     * Apply the changed scroll size.
     * @return {boolean} `true` if there was a change in the scroll size
     */
    updateScroll() {
        const { scrollable } = this[_];
        const newHeight = _getScrollHeight.call(this);
        const newWidth = _getScrollWidth(this);
        if (newHeight === scrollable.scrollHeight && newWidth === scrollable.scrollWidth) {
            return false;
        }
        scrollable.setScrollSize(newWidth, newHeight);
        this[_].scroll = {
            left: scrollable.scrollLeft,
            top: scrollable.scrollTop
        };
        return true;
    }
    /**
     * Get the row height of the given the row index.
     * @param  {number} row The row index
     * @return {number} The row height
     */
    getRowHeight(row) {
        return _getRowHeight.call(this, row);
    }
    /**
     * Set the row height of the given the row index.
     * @param  {number} row The row index
     * @param  {number} height The row height
     * @return {void}
     */
    setRowHeight(row, height) {
        _setRowHeight(this, row, height);
    }
    /**
     * Get the column width of the given the column index.
     * @param  {number} col The column index
     * @return {number} The column width
     */
    getColWidth(col) {
        return _getColWidth(this, col);
    }
    /**
     * Set the column widtht of the given the column index.
     * @param  {number} col The column index
     * @param  {number} width The column width
     * @return {void}
     */
    setColWidth(col, width) {
        _setColWidth.call(this, this, col, width);
    }
    /**
     * Get the column max width of the given the column index.
     * @param  {number} col The column index
     * @return {number} The column max width
     */
    getMaxColWidth(col) {
        const obj = this[_].colWidthsLimit[col];
        return (obj && obj.max) || undefined;
    }
    /**
     * Set the column max widtht of the given the column index.
     * @param  {number} col The column index
     * @param  {number} maxwidth The column max width
     * @return {void}
     */
    setMaxColWidth(col, maxwidth) {
        const obj = this[_].colWidthsLimit[col] || (this[_].colWidthsLimit[col] = {});
        obj.max = maxwidth;
    }
    /**
     * Get the column min width of the given the column index.
     * @param  {number} col The column index
     * @return {number} The column min width
     */
    getMinColWidth(col) {
        const obj = this[_].colWidthsLimit[col];
        return (obj && obj.min) || undefined;
    }
    /**
     * Set the column min widtht of the given the column index.
     * @param  {number} col The column index
     * @param  {number} minwidth The column min width
     * @return {void}
     */
    setMinColWidth(col, minwidth) {
        const obj = this[_].colWidthsLimit[col] || (this[_].colWidthsLimit[col] = {});
        obj.min = minwidth;
    }
    /**
     * Get the rect of the cell.
     * @param {number} col index of column, of the cell
     * @param {number} row index of row, of the cell
     * @returns {Rect} the rect of the cell.
     */
    getCellRect(col, row) {
        const isFrozenCell = this.isFrozenCell(col, row);
        let absoluteLeft = _getColsWidth(this, 0, col - 1);
        const width = _getColWidth(this, col);
        if (isFrozenCell && isFrozenCell.col) {
            absoluteLeft += this[_].scroll.left;
        }
        let absoluteTop = _getRowsHeight.call(this, 0, row - 1);
        const height = _getRowHeight.call(this, row);
        if (isFrozenCell && isFrozenCell.row) {
            absoluteTop += this[_].scroll.top;
        }
        return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(absoluteLeft, absoluteTop, width, height);
    }
    /**
     * Get the relative rectangle of the cell.
     * @param {number} col index of column, of the cell
     * @param {number} row index of row, of the cell
     * @returns {Rect} the rect of the cell.
     */
    getCellRelativeRect(col, row) {
        return _toRelativeRect(this, this.getCellRect(col, row));
    }
    /**
     * Get the rectangle of the cells area.
     * @param {number} startCol index of the starting column, of the cell
     * @param {number} startRow index of the starting row, of the cell
     * @param {number} endCol index of the ending column, of the cell
     * @param {number} endRow index of the ending row, of the cell
     * @returns {Rect} the rect of the cells.
     */
    getCellsRect(startCol, startRow, endCol, endRow) {
        const isFrozenStartCell = this.isFrozenCell(startCol, startRow);
        const isFrozenEndCell = this.isFrozenCell(endCol, endRow);
        let absoluteLeft = _getColsWidth(this, 0, startCol - 1);
        let width = _getColsWidth(this, startCol, endCol);
        if (isFrozenStartCell && isFrozenStartCell.col) {
            const scrollLeft = this[_].scroll.left;
            absoluteLeft += scrollLeft;
            if (!isFrozenEndCell || !isFrozenEndCell.col) {
                width -= scrollLeft;
                width = Math.max(width, _getColsWidth(this, startCol, this.frozenColCount - 1));
            }
        }
        let absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
        let height = _getRowsHeight.call(this, startRow, endRow);
        if (isFrozenStartCell && isFrozenStartCell.row) {
            const scrollTop = this[_].scroll.top;
            absoluteTop += scrollTop;
            if (!isFrozenEndCell || !isFrozenEndCell.row) {
                height -= scrollTop;
                height = Math.max(height, _getColsWidth(this, startRow, this.frozenRowCount - 1));
            }
        }
        return new _internal_Rect__WEBPACK_IMPORTED_MODULE_9__.Rect(absoluteLeft, absoluteTop, width, height);
    }
    getCellRangeRect(range) {
        return this.getCellsRect(range.start.col, range.start.row, range.end.col, range.end.row);
    }
    isFrozenCell(col, row) {
        const { frozenRowCount, frozenColCount } = this[_];
        const isFrozenRow = frozenRowCount > 0 && row < frozenRowCount;
        const isFrozenCol = frozenColCount > 0 && col < frozenColCount;
        if (isFrozenRow || isFrozenCol) {
            return {
                row: isFrozenRow,
                col: isFrozenCol
            };
        }
        else {
            return null;
        }
    }
    getRowAt(absoluteY) {
        const frozen = _getTargetFrozenRowAt(this, absoluteY);
        if (frozen) {
            return frozen.row;
        }
        const row = _getTargetRowAt.call(this, absoluteY);
        return row ? row.row : -1;
    }
    getColAt(absoluteX) {
        const frozen = _getTargetFrozenColAt(this, absoluteX);
        if (frozen) {
            return frozen.col;
        }
        const col = _getTargetColAt(this, absoluteX);
        return col ? col.col : -1;
    }
    getCellAt(absoluteX, absoluteY) {
        return {
            row: this.getRowAt(absoluteY),
            col: this.getColAt(absoluteX)
        };
    }
    /**
     * Scroll to where cell is visible.
     * @param  {number} col The column index.
     * @param  {number} row The row index
     * @return {void}
     */
    makeVisibleCell(col, row) {
        const isFrozenCell = this.isFrozenCell(col, row);
        if (isFrozenCell && isFrozenCell.col && isFrozenCell.row) {
            return;
        }
        const rect = this.getCellRect(col, row);
        const visibleRect = _getScrollableVisibleRect(this);
        if (visibleRect.contains(rect)) {
            return;
        }
        const { scrollable } = this[_];
        if (!isFrozenCell || !isFrozenCell.col) {
            if (rect.left < visibleRect.left) {
                scrollable.scrollLeft -= visibleRect.left - rect.left;
            }
            else if (visibleRect.right < rect.right) {
                scrollable.scrollLeft -= visibleRect.right - rect.right;
            }
        }
        if (!isFrozenCell || !isFrozenCell.row) {
            if (rect.top < visibleRect.top) {
                scrollable.scrollTop -= visibleRect.top - rect.top;
            }
            else if (visibleRect.bottom < rect.bottom) {
                scrollable.scrollTop -= visibleRect.bottom - rect.bottom;
            }
        }
    }
    /**
     * Moves the focus cursor to the given cell.
     * @param  {number} col The column index.
     * @param  {number} row The row index
     * @return {void}
     */
    setFocusCursor(col, row) {
        const { focusControl } = this[_];
        const oldEditMode = focusControl.editMode;
        focusControl.setFocusRect(this.getCellRect(col, row));
        _updatedSelection.call(this);
        if (oldEditMode && !focusControl.editMode) {
            focusControl.resetInputStatus();
        }
    }
    /**
     * Focus the cell.
     * @param  {number} col The column index.
     * @param  {number} row The row index
     * @return {void}
     */
    focusCell(col, row) {
        this.setFocusCursor(col, row);
        // Failure occurs in IE if focus is not last
        this[_].focusControl.focus();
    }
    /**
     * Redraws the range of the given cell.
     * @param  {number} col The column index of cell.
     * @param  {number} row The row index of cell.
     * @return {void}
     */
    invalidateCell(col, row) {
        this.invalidateGridRect(col, row);
    }
    /**
     * Redraws the range of the given cells.
     * @param {number} startCol index of the starting column, of the cell
     * @param {number} startRow index of the starting row, of the cell
     * @param {number} endCol index of the ending column, of the cell
     * @param {number} endRow index of the ending row, of the cell
     * @return {void}
     */
    invalidateGridRect(startCol, startRow, endCol = startCol, endRow = startRow) {
        const offset = this.getOffsetInvalidateCells();
        if (offset > 0) {
            startCol -= offset;
            startRow -= offset;
            endCol += offset;
            endRow += offset;
        }
        const visibleRect = _getVisibleRect(this);
        const cellsRect = this.getCellsRect(startCol, startRow, endCol, endRow);
        const invalidateTarget = visibleRect.intersection(cellsRect);
        if (invalidateTarget) {
            const { frozenColCount, frozenRowCount } = this[_];
            if (frozenColCount > 0 && endCol >= frozenColCount) {
                const frozenRect = _getFrozenColsRect(this);
                if (frozenRect.intersection(invalidateTarget)) {
                    invalidateTarget.left = Math.min(frozenRect.right - 1, invalidateTarget.left);
                }
            }
            if (frozenRowCount > 0 && endRow >= frozenRowCount) {
                const frozenRect = _getFrozenRowsRect(this);
                if (frozenRect.intersection(invalidateTarget)) {
                    invalidateTarget.top = Math.min(frozenRect.bottom - 1, invalidateTarget.top);
                }
            }
            _invalidateRect(this, invalidateTarget);
        }
    }
    invalidateCellRange(range) {
        this.invalidateGridRect(range.start.col, range.start.row, range.end.col, range.end.row);
    }
    /**
     * Redraws the whole grid.
     * @return {void}
     */
    invalidate() {
        const visibleRect = _getVisibleRect(this);
        _invalidateRect(this, visibleRect);
    }
    /**
     * Get the number of scrollable rows fully visible in the grid. visibleRowCount does not include the frozen rows counted by the frozenRowCount property. It does not include any partially visible rows on the bottom of the grid.
     * @returns {number}
     */
    get visibleRowCount() {
        const { frozenRowCount } = this;
        const visibleRect = _getVisibleRect(this);
        const visibleTop = frozenRowCount > 0 ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1) : visibleRect.top;
        const initRow = _getTargetRowAt.call(this, visibleTop);
        if (!initRow) {
            return 0;
        }
        const startRow = Math.max(initRow.top >= visibleTop ? initRow.row : initRow.row + 1, frozenRowCount);
        let absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
        let count = 0;
        const { rowCount } = this;
        for (let row = startRow; row < rowCount; row++) {
            const height = _getRowHeight.call(this, row);
            const bottom = absoluteTop + height;
            if (visibleRect.bottom < bottom) {
                break;
            }
            count++;
            absoluteTop = bottom;
        }
        return count;
    }
    /**
     * Get the number of scrollable columns fully visible in the grid. visibleColCount does not include the frozen columns counted by the frozenColCount property. It does not include any partially visible columns on the right of the grid.
     * @returns {number}
     */
    get visibleColCount() {
        const { frozenColCount } = this;
        const visibleRect = _getVisibleRect(this);
        const visibleLeft = frozenColCount > 0 ? visibleRect.left + _getColsWidth(this, 0, frozenColCount - 1) : visibleRect.left;
        const initCol = _getTargetColAt(this, visibleLeft);
        if (!initCol) {
            return 0;
        }
        const startCol = Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
        let absoluteLeft = _getColsWidth(this, 0, startCol - 1);
        let count = 0;
        const { colCount } = this;
        for (let col = startCol; col < colCount; col++) {
            const width = _getColWidth(this, col);
            const right = absoluteLeft + width;
            if (visibleRect.right < right) {
                break;
            }
            count++;
            absoluteLeft = right;
        }
        return count;
    }
    /**
     * Get the index of the first row in the scrollable region that is visible.
     * @returns {number}
     */
    get topRow() {
        const { frozenRowCount } = this;
        const visibleRect = _getVisibleRect(this);
        const visibleTop = frozenRowCount > 0 ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1) : visibleRect.top;
        const initRow = _getTargetRowAt.call(this, visibleTop);
        if (!initRow) {
            return 0;
        }
        return Math.max(initRow.top >= visibleTop ? initRow.row : initRow.row + 1, frozenRowCount);
    }
    /**
     * Get the index of the first column in the scrollable region that is visible.
     * @returns {number}
     */
    get leftCol() {
        const { frozenColCount } = this;
        const visibleRect = _getVisibleRect(this);
        const visibleLeft = frozenColCount > 0 ? visibleRect.left + _getColsWidth(this, 0, frozenColCount - 1) : visibleRect.left;
        const initCol = _getTargetColAt(this, visibleLeft);
        if (!initCol) {
            return 0;
        }
        return Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
    }
    /**
     * gets or sets the number of pixels that an element's content is scrolled vertically
     */
    get scrollTop() {
        return this[_].scrollable.scrollTop;
    }
    set scrollTop(scrollTop) {
        this[_].scrollable.scrollTop = scrollTop;
    }
    /**
     * gets or sets the number of pixels that an element's content is scrolled from its left edge
     */
    get scrollLeft() {
        return this[_].scrollable.scrollLeft;
    }
    set scrollLeft(scrollLeft) {
        this[_].scrollable.scrollLeft = scrollLeft;
    }
    /**
     * Get the value of cell with the copy action.
     * <p>
     * Please implement
     * </p>
     *
     * @protected
     * @param col Column index of cell.
     * @param row Row index of cell.
     * @param range Copy range.
     * @return {string} the value of cell
     */
    getCopyCellValue(_col, _row, _range) {
        //Please implement get cell value!!
    }
    /**
     * Get the overflowed text in the cell rectangle, from the given cell.
     * @param  {number} col The column index.
     * @param  {number} row The row index
     * @return {string | null} The text overflowing the cell rect.
     */
    getCellOverflowText(col, row) {
        const key = `${col}:${row}`;
        return this[_].cellTextOverflows[key] || null;
    }
    /**
     * Set the overflowed text in the cell rectangle, to the given cell.
     * @param  {number} col The column index.
     * @param  {number} row The row index
     * @param  {string} overflowText The overflowed text in the cell rectangle.
     * @return {void}
     */
    setCellOverflowText(col, row, overflowText) {
        const key = `${col}:${row}`;
        if (overflowText) {
            this[_].cellTextOverflows[key] = typeof overflowText === 'string' ? overflowText.trim() : overflowText;
        }
        else {
            delete this[_].cellTextOverflows[key];
        }
    }
    addDisposable(disposable) {
        if (!disposable || !disposable.dispose || typeof disposable.dispose !== 'function') {
            throw new Error('not disposable!');
        }
        const disposables = (this[_].disposables = this[_].disposables || []);
        disposables.push(disposable);
    }
    /**
     * Dispose the grid instance.
     * @returns {void}
     */
    dispose() {
        super.dispose();
        const protectedSpace = this[_];
        protectedSpace.handler.dispose();
        protectedSpace.scrollable.dispose();
        protectedSpace.focusControl.dispose();
        protectedSpace.columnResizer.dispose();
        protectedSpace.cellSelector.dispose();
        if (protectedSpace.disposables) {
            protectedSpace.disposables.forEach((disposable) => disposable.dispose());
            protectedSpace.disposables = null;
        }
        const { parentElement } = protectedSpace.element;
        if (parentElement) {
            parentElement.removeChild(protectedSpace.element);
        }
    }
    getAttachCellsArea(range) {
        return {
            element: this.getElement(),
            rect: _toRelativeRect(this, this.getCellRangeRect(range))
        };
    }
    onKeyDownMove(evt) {
        _onKeyDownMove.call(this, evt);
    }
    bindEventsInternal() {
        //nop
    }
    getTargetRowAtInternal(_absoluteY) {
        //継承用 設定を無視して計算する場合継承して実装
    }
    getRowsHeightInternal(_startRow, _endRow) {
        //継承用 設定を無視して計算する場合継承して実装
    }
    getRowHeightInternal(_row) {
        //継承用 設定を無視して計算する場合継承して実装
    }
    getScrollHeightInternal(_row) {
        //継承用 設定を無視して計算する場合継承して実装
    }
    getMoveLeftColByKeyDownInternal({ col }) {
        return col - 1;
    }
    getMoveRightColByKeyDownInternal({ col }) {
        return col + 1;
    }
    getMoveUpRowByKeyDownInternal({ row }) {
        return row - 1;
    }
    getMoveDownRowByKeyDownInternal({ row }) {
        return row + 1;
    }
    getOffsetInvalidateCells() {
        return 0;
    }
    getCopyRangeInternal(range) {
        return range;
    }
    _getInitContext() {
        const ctx = this[_].context;
        // 初始化
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.lineWidth = 1;
        ctx.font = this.font || '16px sans-serif';
        return ctx;
    }
    fireListeners(type, ...event) {
        return super.fireListeners(type, ...event);
    }
}


/***/ }),

/***/ "./src/core/EventTarget.ts":
/*!*********************************!*\
  !*** ./src/core/EventTarget.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventTarget": () => (/* binding */ EventTarget)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/symbolManager */ "./src/internal/symbolManager.ts");


const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__.getEventTargetSymbol)();
let nextId = 1;
/**
 * event target.
 */
class EventTarget {
    [_] = {
        listeners: {},
        listenerData: {}
    };
    /**
     * Adds an event listener.
     * @param  {string} type The event type id.
     * @param  {function} listener Callback method.
     * @return {number} unique id for the listener.
     */
    listen(type, listener) {
        const list = this[_].listeners[type] || (this[_].listeners[type] = []);
        list.push(listener);
        const id = nextId++;
        this[_].listenerData[id] = {
            type,
            listener,
            remove: () => {
                delete this[_].listenerData[id];
                const index = list.indexOf(listener);
                list.splice(index, 1);
                if (!this[_].listeners[type].length) {
                    delete this[_].listeners[type];
                }
            }
        };
        return id;
    }
    /**
     * Removes an event listener which was added with listen() by the id returned by listen().
     * @param  {number} id the id returned by listen().
     * @return {void}
     */
    unlisten(id) {
        if (!this[_]) {
            return;
        }
        this[_].listenerData[id].remove();
    }
    addEventListener(type, listener) {
        this.listen(type, listener);
    }
    removeEventListener(type, listener) {
        if (!this[_]) {
            return;
        }
        (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.each)(this[_].listenerData, (obj, id) => {
            if (obj.type === type && obj.listener === listener) {
                this.unlisten(id);
            }
        });
    }
    hasListeners(type) {
        if (!this[_]) {
            return false;
        }
        return !!this[_].listeners[type];
    }
    /**
     * Fires all registered listeners
     * @param  {string}    type The type of the listeners to fire.
     * @param  {...*} args fire arguments
     * @return {*} the result of the last listener
     */
    fireListeners(type, ...args) {
        if (!this[_]) {
            return [];
        }
        const list = this[_].listeners[type];
        if (!list) {
            return [];
        }
        return list.map((listener) => listener.call(this, ...args)).filter((r) => r != null);
    }
    dispose() {
        delete this[_];
    }
}


/***/ }),

/***/ "./src/core/internal/KEY_CODE.ts":
/*!***************************************!*\
  !*** ./src/core/internal/KEY_CODE.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KEY_BS": () => (/* binding */ KEY_BS),
/* harmony export */   "KEY_TAB": () => (/* binding */ KEY_TAB),
/* harmony export */   "KEY_ENTER": () => (/* binding */ KEY_ENTER),
/* harmony export */   "KEY_ESC": () => (/* binding */ KEY_ESC),
/* harmony export */   "KEY_SPACE": () => (/* binding */ KEY_SPACE),
/* harmony export */   "KEY_END": () => (/* binding */ KEY_END),
/* harmony export */   "KEY_HOME": () => (/* binding */ KEY_HOME),
/* harmony export */   "KEY_LEFT": () => (/* binding */ KEY_LEFT),
/* harmony export */   "KEY_UP": () => (/* binding */ KEY_UP),
/* harmony export */   "KEY_RIGHT": () => (/* binding */ KEY_RIGHT),
/* harmony export */   "KEY_DOWN": () => (/* binding */ KEY_DOWN),
/* harmony export */   "KEY_DEL": () => (/* binding */ KEY_DEL),
/* harmony export */   "KEY_ALPHA_A": () => (/* binding */ KEY_ALPHA_A),
/* harmony export */   "KEY_ALPHA_C": () => (/* binding */ KEY_ALPHA_C),
/* harmony export */   "KEY_ALPHA_V": () => (/* binding */ KEY_ALPHA_V),
/* harmony export */   "KEY_F2": () => (/* binding */ KEY_F2)
/* harmony export */ });
const KEY_BS = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_ESC = 27;
const KEY_SPACE = 32;
const KEY_END = 35;
const KEY_HOME = 36;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_DEL = 46;
const KEY_ALPHA_A = 65;
const KEY_ALPHA_C = 67;
const KEY_ALPHA_V = 86;
const KEY_F2 = 113;


/***/ }),

/***/ "./src/data.ts":
/*!*********************!*\
  !*** ./src/data.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
/* harmony import */ var _data_DataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/DataSource */ "./src/data/DataSource.ts");
/* harmony import */ var _data_CachedDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/CachedDataSource */ "./src/data/CachedDataSource.ts");
/* harmony import */ var _data_FilterDataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/FilterDataSource */ "./src/data/FilterDataSource.ts");



/**
 * data modules
 */
const data = {
    DataSource: _data_DataSource__WEBPACK_IMPORTED_MODULE_0__.DataSource,
    CachedDataSource: _data_CachedDataSource__WEBPACK_IMPORTED_MODULE_1__.CachedDataSource,
    FilterDataSource: _data_FilterDataSource__WEBPACK_IMPORTED_MODULE_2__.FilterDataSource
};


/***/ }),

/***/ "./src/data/CachedDataSource.ts":
/*!**************************************!*\
  !*** ./src/data/CachedDataSource.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CachedDataSource": () => (/* binding */ CachedDataSource)
/* harmony export */ });
/* harmony import */ var _DataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataSource */ "./src/data/DataSource.ts");

function _setFieldCache(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
fCache, index, field, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
value) {
    const recCache = fCache[index] || (fCache[index] = new Map());
    recCache.set(field, value);
}
/**
 * grid data source for caching Promise data
 */
class CachedDataSource extends _DataSource__WEBPACK_IMPORTED_MODULE_0__.DataSource {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _rCache;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fCache;
    static get EVENT_TYPE() {
        return _DataSource__WEBPACK_IMPORTED_MODULE_0__.DataSource.EVENT_TYPE;
    }
    static ofArray(array) {
        return new CachedDataSource({
            get: (index) => array[index],
            length: array.length,
            source: array
        });
    }
    constructor(opt) {
        super(opt);
        this._rCache = {};
        this._fCache = {};
    }
    getOriginal(index) {
        if (this._rCache && this._rCache[index]) {
            return this._rCache[index];
        }
        return super.getOriginal(index);
    }
    getOriginalField(index, field) {
        const rowCache = this._fCache && this._fCache[index];
        if (rowCache) {
            const cache = rowCache.get(field);
            if (cache) {
                return cache;
            }
        }
        return super.getOriginalField(index, field);
    }
    setOriginalField(index, field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        const fCache = this._fCache;
        if (fCache && fCache[index]) {
            delete fCache[index]; // clear row cache
        }
        return super.setOriginalField(index, field, value);
    }
    clearCache() {
        if (this._rCache) {
            this._rCache = {};
        }
        if (this._fCache) {
            this._fCache = {};
        }
    }
    fieldPromiseCallBackInternal(index, field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        _setFieldCache(this._fCache, index, field, value);
    }
    recordPromiseCallBackInternal(index, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    record) {
        this._rCache[index] = record;
    }
    dispose() {
        super.dispose();
    }
}


/***/ }),

/***/ "./src/data/DataSource.ts":
/*!********************************!*\
  !*** ./src/data/DataSource.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSource": () => (/* binding */ DataSource)
/* harmony export */ });
/* harmony import */ var _internal_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/sort */ "./src/internal/sort.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _core_EventTarget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/EventTarget */ "./src/core/EventTarget.ts");



function isFieldAssessor(field) {
    if (_internal_utils__WEBPACK_IMPORTED_MODULE_1__.obj.isObject(field)) {
        if (field.get && field.set) {
            return true;
        }
    }
    return false;
}
const EVENT_TYPE = {
    UPDATE_LENGTH: 'update_length',
    UPDATED_LENGTH: 'updated_length',
    UPDATED_ORDER: 'updated_order'
};
function getValue(value, setPromiseBack) {
    const maybePromiseValue = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.getOrApply)(value);
    if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(maybePromiseValue)) {
        const promiseValue = maybePromiseValue.then((r) => {
            setPromiseBack(r);
            return r;
        });
        //一時的にキャッシュ
        setPromiseBack(promiseValue);
        return promiseValue;
    }
    else {
        return maybePromiseValue;
    }
}
function getField(record, field, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
setPromiseBack) {
    if (record == null) {
        return undefined;
    }
    if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(record)) {
        return record.then((r) => getField(r, field, setPromiseBack));
    }
    const fieldGet = isFieldAssessor(field) ? field.get : field;
    if (fieldGet in record) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fieldResult = record[fieldGet];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return getValue(fieldResult, setPromiseBack);
    }
    if (typeof fieldGet === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fieldResult = fieldGet(record);
        return getValue(fieldResult, setPromiseBack);
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const ss = `${fieldGet}`.split('.');
    if (ss.length <= 1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fieldResult = record[fieldGet];
        return getValue(fieldResult, setPromiseBack);
    }
    const fieldResult = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.applyChainSafe)(record, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (val, name) => getField(val, name, _internal_utils__WEBPACK_IMPORTED_MODULE_1__.emptyFn), ...ss);
    return getValue(fieldResult, setPromiseBack);
}
function setField(record, field, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
value) {
    if (record == null) {
        return false;
    }
    const fieldSet = isFieldAssessor(field) ? field.set : field;
    if (fieldSet in record) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        record[fieldSet] = value;
    }
    else if (typeof fieldSet === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return fieldSet(record, value);
    }
    else if (typeof fieldSet === 'string') {
        const ss = `${fieldSet}`.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let obj = record;
        const { length } = ss;
        for (let i = 0; i < length; i++) {
            const f = ss[i];
            if (i === length - 1) {
                obj[f] = value;
            }
            else {
                obj = obj[f] || (obj[f] = {});
            }
        }
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        record[fieldSet] = value;
    }
    return true;
}
function _getIndex(sortedIndexMap, index) {
    if (!sortedIndexMap) {
        return index;
    }
    const mapIndex = sortedIndexMap[index];
    return mapIndex != null ? mapIndex : index;
}
/**
 * grid data source
 */
class DataSource extends _core_EventTarget__WEBPACK_IMPORTED_MODULE_2__.EventTarget {
    _get;
    _length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _source;
    _sortedIndexMap = null;
    static get EVENT_TYPE() {
        return EVENT_TYPE;
    }
    static ofArray(array) {
        return new DataSource({
            get: (index) => array[index],
            length: array.length,
            source: array
        });
    }
    constructor(obj) {
        super();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._get = obj?.get.bind(obj) || undefined;
        this._length = obj?.length || 0;
        this._source = obj?.source ?? obj;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get source() {
        return this._source;
    }
    get(index) {
        return this.getOriginal(_getIndex(this._sortedIndexMap, index));
    }
    getField(index, field) {
        return this.getOriginalField(_getIndex(this._sortedIndexMap, index), field);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hasField(index, field) {
        return this.hasOriginalField(_getIndex(this._sortedIndexMap, index), field);
    }
    setField(index, field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        return this.setOriginalField(_getIndex(this._sortedIndexMap, index), field, value);
    }
    sort(field, order) {
        const sortedIndexMap = new Array(this._length);
        const orderFn = order !== 'desc' ? (v1, v2) => (v1 === v2 ? 0 : v1 > v2 ? 1 : -1) : (v1, v2) => (v1 === v2 ? 0 : v1 < v2 ? 1 : -1);
        return _internal_sort__WEBPACK_IMPORTED_MODULE_0__.sortPromise((index) => (sortedIndexMap[index] != null ? sortedIndexMap[index] : (sortedIndexMap[index] = index)), (index, rel) => {
            sortedIndexMap[index] = rel;
        }, this._length, orderFn, (index) => this.getOriginalField(index, field)).then(() => {
            this._sortedIndexMap = sortedIndexMap;
            this.fireListeners(EVENT_TYPE.UPDATED_ORDER);
        });
    }
    get length() {
        return this._length;
    }
    set length(length) {
        if (this._length === length) {
            return;
        }
        const results = this.fireListeners(EVENT_TYPE.UPDATE_LENGTH, length);
        if (_internal_utils__WEBPACK_IMPORTED_MODULE_1__.array.findIndex(results, (v) => !v) >= 0) {
            return;
        }
        this._length = length;
        this.fireListeners(EVENT_TYPE.UPDATED_LENGTH, this._length);
    }
    get dataSource() {
        return this;
    }
    dispose() {
        super.dispose();
    }
    getOriginal(index) {
        return getValue(this._get(index), (val) => {
            this.recordPromiseCallBackInternal(index, val);
        });
    }
    getOriginalField(index, field) {
        if (field == null) {
            return undefined;
        }
        const record = this.getOriginal(index);
        return getField(record, field, (val) => {
            this.fieldPromiseCallBackInternal(index, field, val);
        });
    }
    hasOriginalField(index, field) {
        if (field == null) {
            return false;
        }
        if (typeof field === 'function') {
            return true;
        }
        const record = this.getOriginal(index);
        return Boolean(record && field in record);
    }
    setOriginalField(index, field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        if (field == null) {
            return false;
        }
        const record = this.getOriginal(index);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.isPromise)(record)) {
            return record.then((r) => setField(r, field, value));
        }
        return setField(record, field, value);
    }
    fieldPromiseCallBackInternal(_index, _field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _value) {
        //
    }
    recordPromiseCallBackInternal(_index, _record) {
        //
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static EMPTY = new DataSource({
        get() {
            /*noop */
        },
        length: 0
    });
}


/***/ }),

/***/ "./src/data/FilterDataSource.ts":
/*!**************************************!*\
  !*** ./src/data/FilterDataSource.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterDataSource": () => (/* binding */ FilterDataSource)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _DataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataSource */ "./src/data/DataSource.ts");
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/EventHandler */ "./src/internal/EventHandler.ts");



class DataSourceIterator {
    _dataSource;
    _curIndex;
    _data;
    constructor(dataSource) {
        this._dataSource = dataSource;
        this._curIndex = -1;
        this._data = [];
    }
    hasNext() {
        const next = this._curIndex + 1;
        return this._dataSource.length > next;
    }
    next() {
        const next = this._curIndex + 1;
        const data = this._getIndexData(next);
        this._curIndex = next;
        return data;
    }
    movePrev() {
        this._curIndex--;
    }
    _getIndexData(index, nest) {
        const dataSource = this._dataSource;
        const data = this._data;
        if (index < data.length) {
            return data[index];
        }
        if (dataSource.length <= index) {
            return undefined;
        }
        const record = this._dataSource.get(index);
        data[index] = record;
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
            record.then((val) => {
                data[index] = val;
            });
            if (!nest) {
                for (let i = 1; i <= 100; i++) {
                    this._getIndexData(index + i, true);
                }
            }
        }
        return record;
    }
}
class FilterData {
    _owner;
    _dataSourceItr;
    _filter;
    _filterdList;
    _queues;
    _cancel = false;
    constructor(dc, original, filter) {
        this._owner = dc;
        this._dataSourceItr = new DataSourceIterator(original);
        this._filter = filter;
        this._filterdList = [];
        this._queues = [];
    }
    get(index) {
        if (this._cancel) {
            return undefined;
        }
        const filterdList = this._filterdList;
        if (index < filterdList.length) {
            return filterdList[index];
        }
        const queues = this._queues;
        const indexQueue = queues[index];
        if (indexQueue) {
            return indexQueue;
        }
        return queues[index] || this._findIndex(index);
    }
    cancel() {
        this._cancel = true;
    }
    _findIndex(index) {
        if (window.Promise) {
            const timeout = Date.now() + 100;
            let count = 0;
            return this._findIndexWithTimeout(index, () => {
                count++;
                if (count >= 100) {
                    count = 0;
                    return timeout < Date.now();
                }
                return false;
            });
        }
        return this._findIndexWithTimeout(index, () => false);
    }
    _findIndexWithTimeout(index, testTimeout) {
        const filterdList = this._filterdList;
        const filter = this._filter;
        const dataSourceItr = this._dataSourceItr;
        const queues = this._queues;
        while (dataSourceItr.hasNext()) {
            if (this._cancel) {
                return undefined;
            }
            const record = dataSourceItr.next();
            if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(record)) {
                dataSourceItr.movePrev();
                const queue = record.then((_value) => {
                    queues[index] = null;
                    return this.get(index);
                });
                queues[index] = queue;
                return queue;
            }
            if (filter(record)) {
                filterdList.push(record);
                if (index < filterdList.length) {
                    return filterdList[index];
                }
            }
            if (testTimeout()) {
                const promise = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 300);
                });
                const queue = promise.then(() => {
                    queues[index] = null;
                    return this.get(index);
                });
                queues[index] = queue;
                return queue;
            }
        }
        const dc = this._owner;
        dc.length = filterdList.length;
        return undefined;
    }
}
/**
 * grid data source for filter
 */
class FilterDataSource extends _DataSource__WEBPACK_IMPORTED_MODULE_1__.DataSource {
    _dataSource;
    _handler;
    _filterData = null;
    static get EVENT_TYPE() {
        return _DataSource__WEBPACK_IMPORTED_MODULE_1__.DataSource.EVENT_TYPE;
    }
    constructor(dataSource, filter) {
        super(dataSource);
        this._dataSource = dataSource;
        this.filter = filter;
        const handler = (this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_2__.EventHandler());
        handler.on(dataSource, _DataSource__WEBPACK_IMPORTED_MODULE_1__.DataSource.EVENT_TYPE.UPDATED_ORDER, () => {
            // reset
            // eslint-disable-next-line no-self-assign
            this.filter = this.filter;
        });
        (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.each)(_DataSource__WEBPACK_IMPORTED_MODULE_1__.DataSource.EVENT_TYPE, (type) => {
            handler.on(dataSource, type, (...args) => this.fireListeners(type, ...args));
        });
    }
    get filter() {
        return this._filterData?._filter || null;
    }
    set filter(filter) {
        if (this._filterData) {
            this._filterData.cancel();
        }
        this._filterData = filter ? new FilterData(this, this._dataSource, filter) : null;
        this.length = this._dataSource.length;
    }
    getOriginal(index) {
        if (!this._filterData) {
            return super.getOriginal(index);
        }
        return this._filterData.get(index);
    }
    sort(field, order) {
        return this._dataSource.sort(field, order);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get source() {
        return this._dataSource.source;
    }
    get dataSource() {
        return this._dataSource;
    }
    dispose() {
        this._handler.dispose();
        super.dispose();
    }
}


/***/ }),

/***/ "./src/element/Inline.ts":
/*!*******************************!*\
  !*** ./src/element/Inline.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inline": () => (/* binding */ Inline)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");

function getWidth(ctx, content) {
    return ctx.measureText(content).width;
}
function breakWidth(ctx, content, itr, candidateIndex, width) {
    const chars = [];
    let ret = itr.next();
    for (let i = 0; i < candidateIndex && ret !== null; i++, ret = itr.next()) {
        chars.push(ret);
    }
    let beforeWidth = getWidth(ctx, chars.join(''));
    if (beforeWidth > width) {
        while (chars.length) {
            const c = chars.pop();
            beforeWidth -= getWidth(ctx, c || '');
            if (beforeWidth <= width) {
                break;
            }
        }
    }
    else if (beforeWidth < width) {
        while (ret !== null) {
            const charWidth = getWidth(ctx, ret);
            if (beforeWidth + charWidth > width) {
                break;
            }
            chars.push(ret);
            beforeWidth += charWidth;
            ret = itr.next();
        }
    }
    const beforeContent = chars.join('').replace(/\s+$/, '');
    const afterContent = content.slice(beforeContent.length).replace(/^\s+/, '');
    return {
        before: beforeContent ? new Inline(beforeContent) : null,
        after: afterContent ? new Inline(afterContent) : null
    };
}
class Inline {
    _content;
    constructor(content) {
        this._content = content != null ? content : '';
    }
    width({ ctx }) {
        return getWidth(ctx, this._content);
    }
    font() {
        return null;
    }
    color() {
        return null;
    }
    canDraw() {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady(_callback) {
    }
    draw({ ctx, canvashelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
        canvashelper.fillTextRect(ctx, this._content, rect.left, rect.top, rect.width, rect.height, {
            offset: offset + 1,
            padding: {
                left: offsetLeft,
                right: offsetRight,
                top: offsetTop,
                bottom: offsetBottom
            }
        });
    }
    canBreak() {
        return !!this._content;
    }
    splitIndex(index) {
        const content = this._content;
        const itr = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.str.genChars(content);
        const chars = [];
        let ret = itr.next();
        for (let i = 0; i < index && ret !== null; i++, ret = itr.next()) {
            chars.push(ret);
        }
        const beforeContent = chars.join('');
        const afterContent = content.slice(beforeContent.length);
        return {
            before: beforeContent ? new Inline(beforeContent) : null,
            after: afterContent ? new Inline(afterContent) : null
        };
    }
    breakWord(ctx, width) {
        const content = this._content;
        const allWidth = this.width({ ctx });
        const candidate = Math.floor((this._content.length * width) / allWidth);
        const itr = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.str.genWords(content);
        return breakWidth(ctx, content, itr, candidate, width);
    }
    breakAll(ctx, width) {
        const content = this._content;
        const allWidth = this.width({ ctx });
        const candidate = Math.floor((this._content.length * width) / allWidth);
        const itr = _internal_utils__WEBPACK_IMPORTED_MODULE_0__.str.genChars(content);
        return breakWidth(ctx, content, itr, candidate, width);
    }
    toString() {
        return this._content;
    }
}


/***/ }),

/***/ "./src/element/InlineDrawer.ts":
/*!*************************************!*\
  !*** ./src/element/InlineDrawer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineDrawer": () => (/* binding */ InlineDrawer)
/* harmony export */ });
/* harmony import */ var _Inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Inline */ "./src/element/Inline.ts");

class InlineDrawer extends _Inline__WEBPACK_IMPORTED_MODULE_0__.Inline {
    _draw;
    _width;
    // private _height: number;
    _color;
    constructor({ draw, width, 
    // height,
    color }) {
        super();
        this._draw = draw;
        this._width = width;
        // this._height = height;
        this._color = color;
    }
    width(_arg) {
        return this._width;
    }
    font() {
        return null;
    }
    color() {
        return this._color ?? null;
    }
    canDraw() {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady(_callback) {
    }
    draw({ ctx, canvashelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
        this._draw({
            ctx,
            canvashelper,
            rect,
            offset,
            offsetLeft,
            offsetRight,
            offsetTop,
            offsetBottom
        });
    }
    canBreak() {
        return false;
    }
    toString() {
        return '';
    }
}


/***/ }),

/***/ "./src/element/InlineIcon.ts":
/*!***********************************!*\
  !*** ./src/element/InlineIcon.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineIcon": () => (/* binding */ InlineIcon)
/* harmony export */ });
/* harmony import */ var _internal_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/fonts */ "./src/internal/fonts.ts");
/* harmony import */ var _Inline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Inline */ "./src/element/Inline.ts");


class InlineIcon extends _Inline__WEBPACK_IMPORTED_MODULE_1__.Inline {
    _icon;
    constructor(icon) {
        super();
        this._icon = icon || {};
    }
    width({ ctx }) {
        const icon = this._icon;
        if (icon.width) {
            return icon.width;
        }
        if (icon.font && _internal_fonts__WEBPACK_IMPORTED_MODULE_0__.check(icon.font, icon.content || '')) {
            ctx.save();
            ctx.canvas.style.letterSpacing = 'normal';
            try {
                ctx.font = icon.font || ctx.font;
                return ctx.measureText(icon.content || '').width;
            }
            finally {
                ctx.canvas.style.letterSpacing = '';
                ctx.restore();
            }
        }
        return 0; //unknown
    }
    font() {
        return this._icon.font ?? null;
    }
    color() {
        return this._icon.color ?? null;
    }
    canDraw() {
        const icon = this._icon;
        return icon.font ? _internal_fonts__WEBPACK_IMPORTED_MODULE_0__.check(icon.font, icon.content || '') : true;
    }
    onReady(callback) {
        const icon = this._icon;
        if (icon.font && !_internal_fonts__WEBPACK_IMPORTED_MODULE_0__.check(icon.font, icon.content || '')) {
            _internal_fonts__WEBPACK_IMPORTED_MODULE_0__.load(icon.font, icon.content || '', callback);
        }
    }
    draw({ ctx, canvashelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
        const icon = this._icon;
        if (icon.content) {
            ctx.canvas.style.letterSpacing = 'normal';
            try {
                // eslint-disable-next-line no-self-assign
                ctx.font = ctx.font; // To apply letterSpacing, we need to reset it.
                canvashelper.fillTextRect(ctx, icon.content, rect.left, rect.top, rect.width, rect.height, {
                    offset: offset + 1,
                    padding: {
                        left: offsetLeft,
                        right: offsetRight,
                        top: offsetTop,
                        bottom: offsetBottom
                    }
                });
            }
            finally {
                ctx.canvas.style.letterSpacing = '';
            }
        }
    }
    canBreak() {
        return false;
    }
    toString() {
        return '';
    }
}


/***/ }),

/***/ "./src/element/InlineImage.ts":
/*!************************************!*\
  !*** ./src/element/InlineImage.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineImage": () => (/* binding */ InlineImage)
/* harmony export */ });
/* harmony import */ var _Inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Inline */ "./src/element/Inline.ts");
/* harmony import */ var _internal_imgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/imgs */ "./src/internal/imgs.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");



class InlineImage extends _Inline__WEBPACK_IMPORTED_MODULE_0__.Inline {
    _src;
    _width;
    _height;
    _imageLeft;
    _imageTop;
    _imageWidth;
    _imageHeight;
    _onloaded;
    _inlineImgPromise = null;
    _inlineImg = null;
    constructor({ src, width, height, imageLeft, imageTop, imageWidth, imageHeight }) {
        super();
        this._src = src;
        this._width = width;
        this._height = height;
        this._imageLeft = imageLeft;
        this._imageTop = imageTop;
        this._imageWidth = imageWidth;
        this._imageHeight = imageHeight;
        this._onloaded = [];
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.isPromise)(src)) {
            src.then((s) => {
                this._src = s;
                this._loadImage(s);
            });
        }
        else {
            this._loadImage(src);
        }
    }
    _loadImage(src) {
        const img = (this._inlineImgPromise = (0,_internal_imgs__WEBPACK_IMPORTED_MODULE_1__.getCacheOrLoad)('InlineImage', 50, src));
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.isPromise)(img)) {
            img.then((i) => {
                this._inlineImg = i;
                this._onloaded.forEach((fn) => fn());
            });
        }
        else {
            this._inlineImg = img;
        }
    }
    width(_arg) {
        return this._width || (this._inlineImg?.width ?? 0);
    }
    font() {
        return null;
    }
    color() {
        return null;
    }
    canDraw() {
        return !!this._inlineImg;
    }
    onReady(callback) {
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.isPromise)(this._src) || (0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.isPromise)(this._inlineImgPromise)) {
            this._onloaded.push(() => callback());
        }
    }
    draw({ ctx, canvashelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
        const img = this._inlineImg;
        canvashelper.drawInlineImageRect(ctx, img, this._imageLeft || 0, this._imageTop || 0, this._imageWidth || img.width, this._imageHeight || img.height, this._width || img.width, this._height || img.height, rect.left, rect.top, rect.width, rect.height, {
            offset: offset + 1,
            padding: {
                left: offsetLeft,
                right: offsetRight,
                top: offsetTop,
                bottom: offsetBottom
            }
        });
    }
    canBreak() {
        return false;
    }
    toString() {
        return '';
    }
}


/***/ }),

/***/ "./src/element/InlinePath2D.ts":
/*!*************************************!*\
  !*** ./src/element/InlinePath2D.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlinePath2D": () => (/* binding */ InlinePath2D)
/* harmony export */ });
/* harmony import */ var _internal_path2DManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/path2DManager */ "./src/internal/path2DManager.ts");
/* harmony import */ var _Inline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Inline */ "./src/element/Inline.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/canvases */ "./src/internal/canvases.ts");



class InlinePath2D extends _Inline__WEBPACK_IMPORTED_MODULE_1__.Inline {
    _path;
    _width;
    _height;
    _color;
    constructor({ path, width, height, color }) {
        super();
        // このタイミングでないとIEでPath2Dのpolyfillが反映されない
        const Path2D = _internal_path2DManager__WEBPACK_IMPORTED_MODULE_0__.getPath2D();
        this._path = new Path2D(path);
        this._width = width;
        this._height = height;
        this._color = color;
    }
    width(_arg) {
        return this._width;
    }
    font() {
        return null;
    }
    color() {
        return this._color ?? null;
    }
    canDraw() {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady(_callback) {
    }
    draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
        offset++;
        const padding = {
            left: offsetLeft,
            right: offsetRight,
            top: offsetTop,
            bottom: offsetBottom
        };
        ctx.save();
        try {
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            //clip
            ctx.clip();
            //文字描画
            const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_2__.calcStartPosition)(ctx, rect, this._width, this._height, {
                offset,
                padding
            });
            ctx.translate(pos.x, pos.y);
            ctx.fill(this._path);
        }
        finally {
            ctx.restore();
        }
    }
    canBreak() {
        return false;
    }
    toString() {
        return '';
    }
}


/***/ }),

/***/ "./src/element/InlineSvg.ts":
/*!**********************************!*\
  !*** ./src/element/InlineSvg.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineSvg": () => (/* binding */ InlineSvg)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _InlineImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InlineImage */ "./src/element/InlineImage.ts");


function buildSvgDataUrl(svg) {
    const data = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`; //svgデータをbase64に変換
    return url;
}
function getSvgElement(svg) {
    if (typeof svg === 'string') {
        const parser = new DOMParser();
        return parser.parseFromString(svg, 'image/svg+xml').children[0];
    }
    else {
        return svg;
    }
}
class InlineSvg extends _InlineImage__WEBPACK_IMPORTED_MODULE_1__.InlineImage {
    constructor({ svg, width, height }) {
        const svgElem = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(svg, getSvgElement);
        const elmWidth = !(0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(svgElem) ? svgElem.getAttribute('width') ?? undefined : undefined;
        const elmHeight = !(0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(svgElem) ? svgElem.getAttribute('height') ?? undefined : undefined;
        const numElmWidth = elmWidth != null ? Number(elmWidth) : undefined;
        const numElmHeight = elmHeight != null ? Number(elmHeight) : undefined;
        super({
            src: (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.then)(svg, buildSvgDataUrl),
            width: width || numElmWidth,
            height: height || numElmHeight,
            imageWidth: numElmWidth,
            imageHeight: numElmHeight
        });
    }
    canBreak() {
        return false;
    }
    toString() {
        return '';
    }
}


/***/ }),

/***/ "./src/element/inlines.ts":
/*!********************************!*\
  !*** ./src/element/inlines.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iconOf": () => (/* binding */ iconOf),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "buildInlines": () => (/* binding */ buildInlines),
/* harmony export */   "string": () => (/* binding */ string)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons */ "./src/icons.ts");
/* harmony import */ var _internal_path2DManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/path2DManager */ "./src/internal/path2DManager.ts");
/* harmony import */ var _Inline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Inline */ "./src/element/Inline.ts");
/* harmony import */ var _InlineDrawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InlineDrawer */ "./src/element/InlineDrawer.ts");
/* harmony import */ var _InlineIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InlineIcon */ "./src/element/InlineIcon.ts");
/* harmony import */ var _InlineImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InlineImage */ "./src/element/InlineImage.ts");
/* harmony import */ var _InlinePath2D__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InlinePath2D */ "./src/element/InlinePath2D.ts");
/* harmony import */ var _InlineSvg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InlineSvg */ "./src/element/InlineSvg.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/canvases */ "./src/internal/canvases.ts");









function drawRegisteredIcon(ctx, icon, drawWidth, drawHeight, left, top, width, height, { offset = 2, padding } = {}) {
    const rect = {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height
    };
    ctx.save();
    try {
        ctx.beginPath();
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        //clip
        ctx.clip();
        //文字描画
        const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_8__.calcStartPosition)(ctx, rect, drawWidth, drawHeight, {
            offset,
            padding
        });
        _internal_path2DManager__WEBPACK_IMPORTED_MODULE_1__.fill(icon, ctx, pos.x, pos.y, drawWidth, drawHeight);
    }
    finally {
        ctx.restore();
    }
}
function isIconConstructorOption(icon) {
    if (icon.font && icon.content) {
        return true;
    }
    return false;
}
function isInlineImageConstructorOption(icon) {
    if (icon.src) {
        return true;
    }
    return false;
}
function isInlineSvgConstructorOption(icon) {
    if (icon.path) {
        return true;
    }
    return false;
}
function iconOf(icon) {
    if (icon instanceof _Inline__WEBPACK_IMPORTED_MODULE_2__.Inline) {
        return icon;
    }
    if (!icon) {
        return null;
    }
    if (isIconConstructorOption(icon)) {
        return new _InlineIcon__WEBPACK_IMPORTED_MODULE_4__.InlineIcon(icon);
    }
    if (isInlineImageConstructorOption(icon)) {
        return new _InlineImage__WEBPACK_IMPORTED_MODULE_5__.InlineImage({
            src: icon.src,
            width: icon.width,
            height: icon.width
        });
    }
    if (icon.svg) {
        return new _InlineSvg__WEBPACK_IMPORTED_MODULE_7__.InlineSvg({
            svg: icon.svg,
            width: icon.width,
            height: icon.width
        });
    }
    if (isInlineSvgConstructorOption(icon)) {
        return new _InlinePath2D__WEBPACK_IMPORTED_MODULE_6__.InlinePath2D({
            path: icon.path,
            width: icon.width,
            height: icon.width,
            color: icon.color
        });
    }
    const regedIcons = _icons__WEBPACK_IMPORTED_MODULE_0__.svgIcons.get();
    if (icon.name && regedIcons[icon.name]) {
        const regedIcon = regedIcons[icon.name];
        const width = icon.width || Math.max(regedIcon.width, regedIcon.height);
        return new _InlineDrawer__WEBPACK_IMPORTED_MODULE_3__.InlineDrawer({
            draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
                drawRegisteredIcon(ctx, regedIcon, width, width, rect.left, rect.top, rect.width, rect.height, {
                    offset: offset + 1,
                    padding: {
                        left: offsetLeft,
                        right: offsetRight,
                        top: offsetTop,
                        bottom: offsetBottom
                    }
                });
            },
            width,
            height: width,
            color: icon.color
        });
    }
    return new _InlineIcon__WEBPACK_IMPORTED_MODULE_4__.InlineIcon(icon);
}
function of(content) {
    if (content == null) {
        return null;
    }
    if (content instanceof _Inline__WEBPACK_IMPORTED_MODULE_2__.Inline) {
        return content;
    }
    return new _Inline__WEBPACK_IMPORTED_MODULE_2__.Inline(content);
}
function buildInlines(icons, inline) {
    const result = [];
    if (icons) {
        result.push(...icons.map((icon) => iconOf(icon)).filter((i) => i != null));
    }
    if (Array.isArray(inline)
    // && inline.filter(il => il instanceof Inline).length <- ?
    ) {
        result.push(...inline.map((il) => of(il)).filter((i) => i != null));
    }
    else {
        const il = of(inline);
        if (il) {
            result.push(il);
        }
    }
    return result;
}
function string(inline) {
    return buildInlines(undefined, inline).join('');
}


/***/ }),

/***/ "./src/header/action.ts":
/*!******************************!*\
  !*** ./src/header/action.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACTIONS": () => (/* binding */ ACTIONS),
/* harmony export */   "BaseAction": () => (/* reexport safe */ _action_BaseAction__WEBPACK_IMPORTED_MODULE_0__.BaseAction),
/* harmony export */   "SortHeaderAction": () => (/* reexport safe */ _action_SortHeaderAction__WEBPACK_IMPORTED_MODULE_2__.SortHeaderAction),
/* harmony export */   "CheckHeaderAction": () => (/* reexport safe */ _action_CheckHeaderAction__WEBPACK_IMPORTED_MODULE_1__.CheckHeaderAction),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "ofCell": () => (/* binding */ ofCell)
/* harmony export */ });
/* harmony import */ var _action_BaseAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action/BaseAction */ "./src/header/action/BaseAction.ts");
/* harmony import */ var _action_CheckHeaderAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action/CheckHeaderAction */ "./src/header/action/CheckHeaderAction.ts");
/* harmony import */ var _action_SortHeaderAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action/SortHeaderAction */ "./src/header/action/SortHeaderAction.ts");



class ImmutableSortHeaderAction extends _action_SortHeaderAction__WEBPACK_IMPORTED_MODULE_2__.SortHeaderAction {
    get disabled() {
        return this._disabled;
    }
}
class ImmutableCheckHeaderAction extends _action_CheckHeaderAction__WEBPACK_IMPORTED_MODULE_1__.CheckHeaderAction {
    get disabled() {
        return this._disabled;
    }
}
const ACTIONS = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SORT: new ImmutableSortHeaderAction(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CHECK: new ImmutableCheckHeaderAction()
};
/**
 * column actions
 * @namespace cheetahGrid.columns.action
 * @memberof cheetahGrid.columns
 */

function of(headerAction) {
    if (!headerAction) {
        return undefined;
    }
    else if (typeof headerAction === 'string') {
        const key = headerAction.toUpperCase();
        return ACTIONS[key] || of(null);
    }
    else {
        return headerAction;
    }
}
function ofCell(headerCell) {
    if (headerCell.sort) {
        if (typeof headerCell.sort === 'function') {
            const sortMethod = headerCell.sort;
            // 0.9.0 Backward compatibility
            const sort = ({ order, col, grid }) => sortMethod.call(headerCell, order, col, grid);
            return new ImmutableSortHeaderAction({ sort });
        }
        return ACTIONS.SORT;
    }
    return of(headerCell.headerAction);
}


/***/ }),

/***/ "./src/header/action/BaseAction.ts":
/*!*****************************************!*\
  !*** ./src/header/action/BaseAction.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAction": () => (/* binding */ BaseAction)
/* harmony export */ });
class BaseAction {
    _disabled;
    constructor(option = {}) {
        this._disabled = !!option.disabled || false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this.onChangeDisabledInternal();
    }
    clone() {
        return new BaseAction(this);
    }
    bindGridEvent(_grid, _cellId) {
        return [];
    }
    onChangeDisabledInternal() {
        // impl
    }
}


/***/ }),

/***/ "./src/header/action/CheckHeaderAction.ts":
/*!************************************************!*\
  !*** ./src/header/action/CheckHeaderAction.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckHeaderAction": () => (/* binding */ CheckHeaderAction)
/* harmony export */ });
/* harmony import */ var _actionBind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionBind */ "./src/header/action/actionBind.ts");
/* harmony import */ var _BaseAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseAction */ "./src/header/action/BaseAction.ts");
/* harmony import */ var _internal_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/animate */ "./src/internal/animate.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");





const CHECK_HEADER_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_3__.getCheckHeaderStateId)();
function getState(grid) {
    let state = grid[CHECK_HEADER_STATE_ID];
    if (!state) {
        state = { elapsed: {}, block: {} };
        _internal_utils__WEBPACK_IMPORTED_MODULE_4__.obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
    }
    return state;
}
class CheckHeaderAction extends _BaseAction__WEBPACK_IMPORTED_MODULE_1__.BaseAction {
    clone() {
        return new CheckHeaderAction(this);
    }
    bindGridEvent(grid, cellId) {
        const state = getState(grid);
        const action = ({ col, row }) => {
            const range = grid.getCellRange(col, row);
            const cellKey = `${range.start.col}:${range.start.row}`;
            if (this.disabled || state.block[cellKey]) {
                return;
            }
            const checked = grid.getHeaderValue(range.start.col, range.start.row);
            grid.setHeaderValue(range.start.col, range.start.row, !checked);
            const onChange = () => {
                // checkbox animation
                (0,_internal_animate__WEBPACK_IMPORTED_MODULE_2__.animate)(200, (point) => {
                    if (point === 1) {
                        delete state.elapsed[cellKey];
                    }
                    else {
                        state.elapsed[cellKey] = point;
                    }
                    grid.invalidateCellRange(range);
                });
            };
            onChange();
        };
        return [
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellClickAction)(grid, cellId, {
                action,
                mouseOver: (e) => {
                    if (this.disabled) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row
                    };
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: (e) => {
                    delete state.mouseActiveCell;
                    const range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                }
            }),
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_0__.bindCellKeyAction)(grid, cellId, {
                action
            })
        ];
    }
}


/***/ }),

/***/ "./src/header/action/SortHeaderAction.ts":
/*!***********************************************!*\
  !*** ./src/header/action/SortHeaderAction.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortHeaderAction": () => (/* binding */ SortHeaderAction)
/* harmony export */ });
/* harmony import */ var _BaseAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAction */ "./src/header/action/BaseAction.ts");
/* harmony import */ var _actionBind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionBind */ "./src/header/action/actionBind.ts");


class SortHeaderAction extends _BaseAction__WEBPACK_IMPORTED_MODULE_0__.BaseAction {
    _sort;
    constructor(option = {}) {
        super(option);
        this._sort = option.sort ?? true;
    }
    get sort() {
        return this._sort;
    }
    set sort(sort) {
        this._sort = sort;
        this.onChangeDisabledInternal();
    }
    clone() {
        return new SortHeaderAction(this);
    }
    _executeSort(newState, grid) {
        if (typeof this._sort === 'function') {
            this._sort({
                order: newState.order || 'asc',
                col: newState.col,
                row: newState.row,
                grid
            });
        }
        else {
            const fieldRow = Math.min(grid.recordRowCount - 1, newState.row) + grid.frozenRowCount;
            const field = grid.getField(newState.col, fieldRow);
            if (field == null) {
                return;
            }
            grid.dataSource.sort(field, newState.order || 'asc');
        }
    }
    bindGridEvent(grid, cellId) {
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        const action = (cell) => {
            if (this.disabled) {
                return;
            }
            const state = grid.sortState;
            let newState;
            const range = grid.getCellRange(cell.col, cell.row);
            if (isTarget(state.col, cell.row)) {
                newState = {
                    col: range.start.col,
                    row: range.start.row,
                    order: state.order === 'asc' ? 'desc' : 'asc'
                };
            }
            else {
                newState = {
                    col: range.start.col,
                    row: range.start.row,
                    order: 'asc'
                };
            }
            grid.sortState = newState;
            this._executeSort(newState, grid);
            grid.invalidateGridRect(0, 0, grid.colCount - 1, grid.rowCount - 1);
        };
        return [
            ...(0,_actionBind__WEBPACK_IMPORTED_MODULE_1__.bindCellClickAction)(grid, cellId, {
                action,
                mouseOver: (_e) => {
                    if (this.disabled) {
                        return false;
                    }
                    return true;
                }
            })
        ];
    }
}


/***/ }),

/***/ "./src/header/action/actionBind.ts":
/*!*****************************************!*\
  !*** ./src/header/action/actionBind.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindCellClickAction": () => (/* binding */ bindCellClickAction),
/* harmony export */   "bindCellKeyAction": () => (/* binding */ bindCellKeyAction)
/* harmony export */ });
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


const KEY_ENTER = 13;
const KEY_SPACE = 32;
function bindCellClickAction(grid, cellId, { action, mouseOver, mouseOut }) {
    function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
    }
    let inMouse;
    return [
        // click
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE.CLICK_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            action({
                col: e.col,
                row: e.row
            });
        }),
        // mouse move
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if (mouseOver) {
                if (!mouseOver({
                    col: e.col,
                    row: e.row
                })) {
                    return;
                }
            }
            grid.getElement().style.cursor = 'pointer';
            inMouse = true;
        }),
        //横からMOUSEENTERした場合、'col-resize'の処理と競合するのでmoveを監視して処理する
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE.MOUSEMOVE_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if (inMouse && !grid.getElement().style.cursor) {
                grid.getElement().style.cursor = 'pointer';
            }
        }),
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
            if (!isTarget(e.col, e.row)) {
                return;
            }
            if (mouseOut) {
                mouseOut({
                    col: e.col,
                    row: e.row
                });
            }
            grid.getElement().style.cursor = '';
            inMouse = false;
        })
    ];
}
function bindCellKeyAction(grid, cellId, { action, acceptKeys = [] }) {
    function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
    }
    acceptKeys = [...acceptKeys, KEY_ENTER, KEY_SPACE];
    return [
        // enter key down
        grid.listen(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE.KEYDOWN, (e) => {
            if (acceptKeys.indexOf(e.keyCode) === -1) {
                return;
            }
            if (grid.keyboardOptions?.moveCellOnEnter && e.keyCode === KEY_ENTER) {
                // When moving with the enter key, no action is taken with the enter key.
                return;
            }
            const sel = grid.selection.select;
            if (!isTarget(sel.col, sel.row)) {
                return;
            }
            action({
                col: sel.col,
                row: sel.row
            });
            _internal_utils__WEBPACK_IMPORTED_MODULE_1__.event.cancel(e.event);
        })
    ];
}


/***/ }),

/***/ "./src/header/style.ts":
/*!*****************************!*\
  !*** ./src/header/style.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseStyle": () => (/* reexport safe */ _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle),
/* harmony export */   "Style": () => (/* reexport safe */ _style_Style__WEBPACK_IMPORTED_MODULE_4__.Style),
/* harmony export */   "SortHeaderStyle": () => (/* reexport safe */ _style_SortHeaderStyle__WEBPACK_IMPORTED_MODULE_3__.SortHeaderStyle),
/* harmony export */   "CheckHeaderStyle": () => (/* reexport safe */ _style_CheckHeaderStyle__WEBPACK_IMPORTED_MODULE_1__.CheckHeaderStyle),
/* harmony export */   "MultilineTextHeaderStyle": () => (/* reexport safe */ _style_MultilineTextHeaderStyle__WEBPACK_IMPORTED_MODULE_2__.MultilineTextHeaderStyle),
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _style_BaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/BaseStyle */ "./src/header/style/BaseStyle.ts");
/* harmony import */ var _style_CheckHeaderStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/CheckHeaderStyle */ "./src/header/style/CheckHeaderStyle.ts");
/* harmony import */ var _style_MultilineTextHeaderStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/MultilineTextHeaderStyle */ "./src/header/style/MultilineTextHeaderStyle.ts");
/* harmony import */ var _style_SortHeaderStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/SortHeaderStyle */ "./src/header/style/SortHeaderStyle.ts");
/* harmony import */ var _style_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/Style */ "./src/header/style/Style.ts");






function of(headerStyle, StyleClass) {
    if (headerStyle) {
        if (headerStyle instanceof _style_Style__WEBPACK_IMPORTED_MODULE_4__.Style) {
            return headerStyle;
        }
        else if (typeof headerStyle === 'function') {
            return of(headerStyle(), StyleClass);
        }
        return new StyleClass(headerStyle);
    }
    else {
        return StyleClass.DEFAULT;
    }
}


/***/ }),

/***/ "./src/header/style/BaseStyle.ts":
/*!***************************************!*\
  !*** ./src/header/style/BaseStyle.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseStyle": () => (/* binding */ BaseStyle)
/* harmony export */ });
/* harmony import */ var _core_EventTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/EventTarget */ "./src/core/EventTarget.ts");

const EVENT_TYPE = {
    CHANGE_STYLE: 'change_style'
};
let defaultStyle;
class BaseStyle extends _core_EventTarget__WEBPACK_IMPORTED_MODULE_0__.EventTarget {
    _bgColor;
    static get EVENT_TYPE() {
        return EVENT_TYPE;
    }
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new BaseStyle());
    }
    constructor({ bgColor } = {}) {
        super();
        this._bgColor = bgColor;
    }
    get bgColor() {
        return this._bgColor;
    }
    set bgColor(bgColor) {
        this._bgColor = bgColor;
        this.doChangeStyle();
    }
    doChangeStyle() {
        this.fireListeners(EVENT_TYPE.CHANGE_STYLE);
    }
    clone() {
        return new BaseStyle(this);
    }
}


/***/ }),

/***/ "./src/header/style/CheckHeaderStyle.ts":
/*!**********************************************!*\
  !*** ./src/header/style/CheckHeaderStyle.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckHeaderStyle": () => (/* binding */ CheckHeaderStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/header/style/Style.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");


let defaultStyle;
class CheckHeaderStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _uncheckBgColor;
    _checkBgColor;
    _borderColor;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new CheckHeaderStyle());
    }
    constructor(style = {}) {
        super((0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.defaults)(style, { textAlign: 'center' }));
        const { uncheckBgColor, checkBgColor, borderColor } = style;
        this._uncheckBgColor = uncheckBgColor;
        this._checkBgColor = checkBgColor;
        this._borderColor = borderColor;
    }
    get uncheckBgColor() {
        return this._uncheckBgColor;
    }
    set uncheckBgColor(uncheckBgColor) {
        this._uncheckBgColor = uncheckBgColor;
        this.doChangeStyle();
    }
    get checkBgColor() {
        return this._checkBgColor;
    }
    set checkBgColor(checkBgColor) {
        this._checkBgColor = checkBgColor;
        this.doChangeStyle();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(borderColor) {
        this._borderColor = borderColor;
        this.doChangeStyle();
    }
    clone() {
        return new CheckHeaderStyle(this);
    }
}


/***/ }),

/***/ "./src/header/style/MultilineTextHeaderStyle.ts":
/*!******************************************************!*\
  !*** ./src/header/style/MultilineTextHeaderStyle.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultilineTextHeaderStyle": () => (/* binding */ MultilineTextHeaderStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/header/style/Style.ts");

let defaultStyle;
class MultilineTextHeaderStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _lineHeight;
    _autoWrapText;
    _lineClamp;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new MultilineTextHeaderStyle());
    }
    constructor(style = {}) {
        super(style);
        this._lineHeight = style.lineHeight || '1em';
        this._autoWrapText = style.autoWrapText || false;
        this._lineClamp = style.lineClamp;
    }
    clone() {
        return new MultilineTextHeaderStyle(this);
    }
    get lineHeight() {
        return this._lineHeight;
    }
    set lineHeight(lineHeight) {
        this._lineHeight = lineHeight;
        this.doChangeStyle();
    }
    get lineClamp() {
        return this._lineClamp;
    }
    set lineClamp(lineClamp) {
        this._lineClamp = lineClamp;
        this.doChangeStyle();
    }
    get autoWrapText() {
        return this._autoWrapText;
    }
    set autoWrapText(autoWrapText) {
        this._autoWrapText = autoWrapText;
        this.doChangeStyle();
    }
}


/***/ }),

/***/ "./src/header/style/SortHeaderStyle.ts":
/*!*********************************************!*\
  !*** ./src/header/style/SortHeaderStyle.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortHeaderStyle": () => (/* binding */ SortHeaderStyle)
/* harmony export */ });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style */ "./src/header/style/Style.ts");

let defaultStyle;
class SortHeaderStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__.Style {
    _sortArrowColor;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new SortHeaderStyle());
    }
    constructor(style = {}) {
        super(style);
        this._sortArrowColor = style.sortArrowColor;
    }
    get sortArrowColor() {
        return this._sortArrowColor;
    }
    set sortArrowColor(sortArrowColor) {
        this._sortArrowColor = sortArrowColor;
        this.doChangeStyle();
    }
    clone() {
        return new SortHeaderStyle(this);
    }
}


/***/ }),

/***/ "./src/header/style/StdBaseStyle.ts":
/*!******************************************!*\
  !*** ./src/header/style/StdBaseStyle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StdBaseStyle": () => (/* binding */ StdBaseStyle)
/* harmony export */ });
/* harmony import */ var _BaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseStyle */ "./src/header/style/BaseStyle.ts");

let defaultStyle;
class StdBaseStyle extends _BaseStyle__WEBPACK_IMPORTED_MODULE_0__.BaseStyle {
    _textAlign;
    _textBaseline;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new StdBaseStyle());
    }
    constructor(style = {}) {
        super(style);
        this._textAlign = style.textAlign || 'left';
        this._textBaseline = style.textBaseline || 'middle';
    }
    get textAlign() {
        return this._textAlign;
    }
    set textAlign(textAlign) {
        this._textAlign = textAlign;
        this.doChangeStyle();
    }
    get textBaseline() {
        return this._textBaseline;
    }
    set textBaseline(textBaseline) {
        this._textBaseline = textBaseline;
        this.doChangeStyle();
    }
    clone() {
        return new StdBaseStyle(this);
    }
}


/***/ }),

/***/ "./src/header/style/Style.ts":
/*!***********************************!*\
  !*** ./src/header/style/Style.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Style": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StdBaseStyle */ "./src/header/style/StdBaseStyle.ts");

let defaultStyle;
class Style extends _StdBaseStyle__WEBPACK_IMPORTED_MODULE_0__.StdBaseStyle {
    _color;
    _font;
    _textOverflow;
    static get DEFAULT() {
        return defaultStyle ? defaultStyle : (defaultStyle = new Style());
    }
    constructor(style = {}) {
        super(style);
        this._color = style.color;
        this._font = style.font;
        this._textOverflow = style.textOverflow || 'ellipsis';
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
        this.doChangeStyle();
    }
    get font() {
        return this._font;
    }
    set font(font) {
        this._font = font;
        this.doChangeStyle();
    }
    get textOverflow() {
        return this._textOverflow;
    }
    set textOverflow(textOverflow) {
        this._textOverflow = textOverflow;
        this.doChangeStyle();
    }
    clone() {
        return new Style(this);
    }
}


/***/ }),

/***/ "./src/header/type.ts":
/*!****************************!*\
  !*** ./src/header/type.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPES": () => (/* binding */ TYPES),
/* harmony export */   "BaseHeader": () => (/* reexport safe */ _type_BaseHeader__WEBPACK_IMPORTED_MODULE_0__.BaseHeader),
/* harmony export */   "Header": () => (/* reexport safe */ _type_Header__WEBPACK_IMPORTED_MODULE_2__.Header),
/* harmony export */   "SortHeader": () => (/* reexport safe */ _type_SortHeader__WEBPACK_IMPORTED_MODULE_4__.SortHeader),
/* harmony export */   "CheckHeader": () => (/* reexport safe */ _type_CheckHeader__WEBPACK_IMPORTED_MODULE_1__.CheckHeader),
/* harmony export */   "MultilineTextHeader": () => (/* reexport safe */ _type_MultilineTextHeader__WEBPACK_IMPORTED_MODULE_3__.MultilineTextHeader),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "ofCell": () => (/* binding */ ofCell)
/* harmony export */ });
/* harmony import */ var _type_BaseHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type/BaseHeader */ "./src/header/type/BaseHeader.ts");
/* harmony import */ var _type_CheckHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type/CheckHeader */ "./src/header/type/CheckHeader.ts");
/* harmony import */ var _type_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/Header */ "./src/header/type/Header.ts");
/* harmony import */ var _type_MultilineTextHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type/MultilineTextHeader */ "./src/header/type/MultilineTextHeader.ts");
/* harmony import */ var _type_SortHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./type/SortHeader */ "./src/header/type/SortHeader.ts");





const TYPES = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DEFAULT: new _type_Header__WEBPACK_IMPORTED_MODULE_2__.Header(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SORT: new _type_SortHeader__WEBPACK_IMPORTED_MODULE_4__.SortHeader(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CHECK: new _type_CheckHeader__WEBPACK_IMPORTED_MODULE_1__.CheckHeader(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MULTILINETEXT: new _type_MultilineTextHeader__WEBPACK_IMPORTED_MODULE_3__.MultilineTextHeader()
};

function of(headerType) {
    if (!headerType) {
        return TYPES.DEFAULT;
    }
    else if (typeof headerType === 'string') {
        const key = headerType.toUpperCase();
        return TYPES[key] || of(null);
    }
    else {
        return headerType;
    }
}
function ofCell(headerCell) {
    if (headerCell.sort) {
        return TYPES.SORT;
    }
    return of(headerCell.headerType);
}


/***/ }),

/***/ "./src/header/type/BaseHeader.ts":
/*!***************************************!*\
  !*** ./src/header/type/BaseHeader.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseHeader": () => (/* binding */ BaseHeader)
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style */ "./src/header/style.ts");
/* harmony import */ var _style_BaseStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/BaseStyle */ "./src/header/style/BaseStyle.ts");


class BaseHeader {
    constructor(_options = {}) {
        this.onDrawCell = this.onDrawCell.bind(this); //スコープを固定させる
    }
    get StyleClass() {
        return _style_BaseStyle__WEBPACK_IMPORTED_MODULE_1__.BaseStyle;
    }
    onDrawCell(cellValue, info, context, grid) {
        const { style, drawCellBase } = info;
        const helper = grid.getGridCanvasHelper();
        drawCellBase();
        //文字描画
        this.drawInternal(this.convertInternal(cellValue), context, _style__WEBPACK_IMPORTED_MODULE_0__.of(style, this.StyleClass), helper, grid, info);
    }
    convertInternal(value) {
        if (typeof value === 'function') {
            value = value();
        }
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return value != null ? `${value}` : '';
    }
    bindGridEvent(_grid, _cellId) {
        return [];
    }
}


/***/ }),

/***/ "./src/header/type/CheckHeader.ts":
/*!****************************************!*\
  !*** ./src/header/type/CheckHeader.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckHeader": () => (/* binding */ CheckHeader)
/* harmony export */ });
/* harmony import */ var _BaseHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseHeader */ "./src/header/type/BaseHeader.ts");
/* harmony import */ var _style_CheckHeaderStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/CheckHeaderStyle */ "./src/header/style/CheckHeaderStyle.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/symbolManager */ "./src/internal/symbolManager.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");




const CHECK_HEADER_STATE_ID = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_2__.getCheckHeaderStateId)();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getState(grid) {
    let state = grid[CHECK_HEADER_STATE_ID];
    if (!state) {
        state = { elapsed: {}, block: {} };
        _internal_utils__WEBPACK_IMPORTED_MODULE_3__.obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
    }
    return state;
}
class CheckHeader extends _BaseHeader__WEBPACK_IMPORTED_MODULE_0__.BaseHeader {
    get StyleClass() {
        return _style_CheckHeaderStyle__WEBPACK_IMPORTED_MODULE_1__.CheckHeaderStyle;
    }
    clone() {
        return new CheckHeader(this);
    }
    drawInternal(value, context, style, helper, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grid, { drawCellBase }) {
        const { textAlign, textBaseline, borderColor, checkBgColor, uncheckBgColor, bgColor, color, font, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        const cellKey = `${range.start.col}:${range.start.row}`;
        const { elapsed: { [cellKey]: elapsed } } = getState(grid);
        const checked = grid.getHeaderValue(range.start.col, range.start.row);
        const opt = {
            textAlign,
            textBaseline,
            borderColor,
            checkBgColor,
            uncheckBgColor
        };
        if (elapsed != null) {
            opt.animElapsedTime = elapsed;
        }
        const inlineCheck = helper.buildCheckBoxInline(!!checked, context, opt);
        helper.text([inlineCheck, value], context, {
            textAlign,
            textBaseline,
            color,
            font,
            textOverflow
        });
    }
}


/***/ }),

/***/ "./src/header/type/Header.ts":
/*!***********************************!*\
  !*** ./src/header/type/Header.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Header": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _BaseHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseHeader */ "./src/header/type/BaseHeader.ts");
/* harmony import */ var _style_Style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/Style */ "./src/header/style/Style.ts");


class Header extends _BaseHeader__WEBPACK_IMPORTED_MODULE_0__.BaseHeader {
    get StyleClass() {
        return _style_Style__WEBPACK_IMPORTED_MODULE_1__.Style;
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase }) {
        const { textAlign, textBaseline, color, font, bgColor, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        helper.text(value, context, {
            textAlign,
            textBaseline,
            color,
            font,
            textOverflow
        });
    }
}


/***/ }),

/***/ "./src/header/type/MultilineTextHeader.ts":
/*!************************************************!*\
  !*** ./src/header/type/MultilineTextHeader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultilineTextHeader": () => (/* binding */ MultilineTextHeader)
/* harmony export */ });
/* harmony import */ var _BaseHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseHeader */ "./src/header/type/BaseHeader.ts");
/* harmony import */ var _style_MultilineTextHeaderStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/MultilineTextHeaderStyle */ "./src/header/style/MultilineTextHeaderStyle.ts");


class MultilineTextHeader extends _BaseHeader__WEBPACK_IMPORTED_MODULE_0__.BaseHeader {
    get StyleClass() {
        return _style_MultilineTextHeaderStyle__WEBPACK_IMPORTED_MODULE_1__.MultilineTextHeaderStyle;
    }
    clone() {
        return new MultilineTextHeader(this);
    }
    drawInternal(value, context, style, helper, _grid, { drawCellBase }) {
        const { textAlign, textBaseline, color, font, bgColor, lineHeight, autoWrapText, lineClamp, textOverflow } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const multilines = value.replace(/\r?\n/g, '\n').replace(/\r/g, '\n').split('\n');
        helper.testFontLoad(font, value, context);
        helper.multilineText(multilines, context, {
            textAlign,
            textBaseline,
            color,
            font,
            lineHeight,
            autoWrapText,
            lineClamp,
            textOverflow
        });
    }
}


/***/ }),

/***/ "./src/header/type/SortHeader.ts":
/*!***************************************!*\
  !*** ./src/header/type/SortHeader.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortHeader": () => (/* binding */ SortHeader)
/* harmony export */ });
/* harmony import */ var _BaseHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseHeader */ "./src/header/type/BaseHeader.ts");
/* harmony import */ var _style_SortHeaderStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/SortHeaderStyle */ "./src/header/style/SortHeaderStyle.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internal/canvases */ "./src/internal/canvases.ts");




class SortHeader extends _BaseHeader__WEBPACK_IMPORTED_MODULE_0__.BaseHeader {
    get StyleClass() {
        return _style_SortHeaderStyle__WEBPACK_IMPORTED_MODULE_1__.SortHeaderStyle;
    }
    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
        const { textAlign, textBaseline = 'middle', color, bgColor, font, textOverflow, sortArrowColor } = style;
        if (bgColor) {
            drawCellBase({
                bgColor
            });
        }
        const state = grid.sortState;
        let order = undefined;
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        if ((0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.cellInRange)(range, state.col, state.row)) {
            ({ order } = state);
        }
        const ctx = context.getContext();
        const arrowSize = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_3__.getFontSize)(ctx, font).width * 1.2;
        helper.text(value, context, {
            textAlign,
            textBaseline,
            color,
            font,
            textOverflow,
            icons: [
                {
                    name: order != null ? (order === 'asc' ? 'arrow_downward' : 'arrow_upward') : undefined,
                    width: arrowSize,
                    color: helper.getColor(sortArrowColor || helper.theme.header.sortArrowColor, col, row, ctx) || 'rgba(0, 0, 0, 0.38)'
                }
            ]
        });
    }
}


/***/ }),

/***/ "./src/headers.ts":
/*!************************!*\
  !*** ./src/headers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "headers": () => (/* binding */ headers)
/* harmony export */ });
/* harmony import */ var _header_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/action */ "./src/header/action.ts");
/* harmony import */ var _header_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/style */ "./src/header/style.ts");
/* harmony import */ var _header_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/type */ "./src/header/type.ts");
// import * as action from './header/action'
// import * as style from './header/style'
// import * as type from './header/type'



const action = {
    ACTIONS: _header_action__WEBPACK_IMPORTED_MODULE_0__.ACTIONS,
    BaseAction: _header_action__WEBPACK_IMPORTED_MODULE_0__.BaseAction,
    // BaseCheckAction,
    SortHeaderAction: _header_action__WEBPACK_IMPORTED_MODULE_0__.SortHeaderAction,
    CheckHeaderAction: _header_action__WEBPACK_IMPORTED_MODULE_0__.CheckHeaderAction,
    // SwitchHeaderAction,
    of: _header_action__WEBPACK_IMPORTED_MODULE_0__.of,
    ofCell: _header_action__WEBPACK_IMPORTED_MODULE_0__.ofCell
};
const style = {
    BaseStyle: _header_style__WEBPACK_IMPORTED_MODULE_1__.BaseStyle,
    // BaseStdStyle,
    // BaseCheckStyle,
    Style: _header_style__WEBPACK_IMPORTED_MODULE_1__.Style,
    SortHeaderStyle: _header_style__WEBPACK_IMPORTED_MODULE_1__.SortHeaderStyle,
    CheckHeaderStyle: _header_style__WEBPACK_IMPORTED_MODULE_1__.CheckHeaderStyle,
    // SwitchHeaderStyle,
    MultilineTextHeaderStyle: _header_style__WEBPACK_IMPORTED_MODULE_1__.MultilineTextHeaderStyle,
    of: _header_style__WEBPACK_IMPORTED_MODULE_1__.of
};
const type = {
    TYPES: _header_type__WEBPACK_IMPORTED_MODULE_2__.TYPES,
    BaseHeader: _header_type__WEBPACK_IMPORTED_MODULE_2__.BaseHeader,
    // BaseCheckHeader,
    Header: _header_type__WEBPACK_IMPORTED_MODULE_2__.Header,
    SortHeader: _header_type__WEBPACK_IMPORTED_MODULE_2__.SortHeader,
    CheckHeader: _header_type__WEBPACK_IMPORTED_MODULE_2__.CheckHeader,
    // SwitchHeader,
    MultilineTextHeader: _header_type__WEBPACK_IMPORTED_MODULE_2__.MultilineTextHeader,
    of: _header_type__WEBPACK_IMPORTED_MODULE_2__.of,
    ofCell: _header_type__WEBPACK_IMPORTED_MODULE_2__.ofCell
};
/**
 * header classes
 */
const headers = { action, type, style };


/***/ }),

/***/ "./src/icons.ts":
/*!**********************!*\
  !*** ./src/icons.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "svgIcons": () => (/* binding */ svgIcons)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _plugins_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/icons */ "./src/plugins/icons.ts");
/* harmony import */ var _icons_ic_add_48px_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/ic_add_48px.svg */ "./src/icons/ic_add_48px.svg");
/* harmony import */ var _icons_ic_edit_48px_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/ic_edit_48px.svg */ "./src/icons/ic_edit_48px.svg");
/* harmony import */ var _icons_ic_arrow_downward_48px_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/ic_arrow_downward_48px.svg */ "./src/icons/ic_arrow_downward_48px.svg");
/* harmony import */ var _icons_ic_arrow_upward_48px_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/ic_arrow_upward_48px.svg */ "./src/icons/ic_arrow_upward_48px.svg");
/* harmony import */ var _icons_ic_star_24px_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/ic_star_24px.svg */ "./src/icons/ic_star_24px.svg");
/* harmony import */ var _icons_ic_star_border_24px_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icons/ic_star_border_24px.svg */ "./src/icons/ic_star_border_24px.svg");
/* harmony import */ var _icons_ic_star_half_24px_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons/ic_star_half_24px.svg */ "./src/icons/ic_star_half_24px.svg");
/* harmony import */ var _tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tools/svgToIcon */ "./src/tools/svgToIcon.ts");










const builtins = {
    add: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_add_48px_svg__WEBPACK_IMPORTED_MODULE_2__["default"]),
    arrowDownward: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_arrow_downward_48px_svg__WEBPACK_IMPORTED_MODULE_4__["default"]),
    arrowUpward: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_arrow_upward_48px_svg__WEBPACK_IMPORTED_MODULE_5__["default"]),
    edit: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_edit_48px_svg__WEBPACK_IMPORTED_MODULE_3__["default"]),
    star: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_star_24px_svg__WEBPACK_IMPORTED_MODULE_6__["default"]),
    starBorder: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_star_border_24px_svg__WEBPACK_IMPORTED_MODULE_7__["default"]),
    starHalf: (0,_tools_svgToIcon__WEBPACK_IMPORTED_MODULE_9__["default"])(_icons_ic_star_half_24px_svg__WEBPACK_IMPORTED_MODULE_8__["default"])
};
const svgIcons = {
    get() {
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.extend)(builtins, _plugins_icons__WEBPACK_IMPORTED_MODULE_1__.icons);
    }
};


/***/ }),

/***/ "./src/internal/EventHandler.ts":
/*!**************************************!*\
  !*** ./src/internal/EventHandler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventHandler": () => (/* binding */ EventHandler)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");

let nextId = 1;
class EventHandler {
    _listeners = {};
    on(target, type, listener, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...options) {
        if (target.addEventListener) {
            target.addEventListener(type, listener, ...options);
        }
        const obj = {
            target,
            type,
            listener,
            options
        };
        const id = nextId++;
        this._listeners[id] = obj;
        return id;
    }
    once(target, type, listener, ...options) {
        const id = this.on(target, type, (...args) => {
            this.off(id);
            listener(...args);
        }, ...options);
        return id;
    }
    tryWithOffEvents(target, type, call) {
        const list = [];
        try {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.each)(this._listeners, (obj) => {
                if (obj.target === target && obj.type === type) {
                    if (obj.target.removeEventListener) {
                        obj.target.removeEventListener(obj.type, obj.listener, ...obj.options);
                    }
                    list.push(obj);
                }
            });
            call();
        }
        finally {
            list.forEach((obj) => {
                if (obj.target.addEventListener) {
                    obj.target.addEventListener(obj.type, obj.listener, ...obj.options);
                }
            });
        }
    }
    off(id) {
        if (id == null) {
            return;
        }
        const obj = this._listeners[id];
        if (!obj) {
            return;
        }
        delete this._listeners[id];
        if (obj.target.removeEventListener) {
            obj.target.removeEventListener(obj.type, obj.listener, ...obj.options);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fire(target, type, ...args) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.each)(this._listeners, (obj) => {
            if (obj.target === target && obj.type === type) {
                obj.listener.call(obj.target, ...args);
            }
        });
    }
    hasListener(target, type) {
        let result = false;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.each)(this._listeners, (obj) => {
            if (obj.target === target && obj.type === type) {
                result = true;
            }
        });
        return result;
    }
    clear() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.each)(this._listeners, (obj) => {
            if (obj.target.removeEventListener) {
                obj.target.removeEventListener(obj.type, obj.listener, ...obj.options);
            }
        });
        this._listeners = {};
    }
    dispose() {
        this.clear();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._listeners = null;
    }
}


/***/ }),

/***/ "./src/internal/LRUCache.ts":
/*!**********************************!*\
  !*** ./src/internal/LRUCache.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LRUCache": () => (/* binding */ LRUCache)
/* harmony export */ });
class LRUCache {
    _list;
    _map;
    _cacheSize;
    constructor(cacheSize) {
        this._list = [];
        this._map = {};
        this._cacheSize = cacheSize || 50;
    }
    get(key) {
        const val = this._map[key];
        if (val) {
            const list = this._list;
            const idx = list.indexOf(key);
            list.splice(idx, 1);
            list.push(key);
        }
        return val;
    }
    put(key, value) {
        const list = this._list;
        const map = this._map;
        if (map[key]) {
            const idx = list.indexOf(key);
            list.splice(idx, 1);
        }
        map[key] = value;
        list.push(key);
        if (list.length > this._cacheSize) {
            const remKey = list.shift() || '';
            delete map[remKey];
        }
    }
}


/***/ }),

/***/ "./src/internal/NumberMap.ts":
/*!***********************************!*\
  !*** ./src/internal/NumberMap.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberMap": () => (/* binding */ NumberMap)
/* harmony export */ });
const indexFirst = (arr, elm) => {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const i = Math.floor((low + high) / 2);
        if (arr[i] === elm) {
            return i;
        }
        else if (arr[i] > elm) {
            high = i - 1;
        }
        else {
            low = i + 1;
        }
    }
    return high < 0 ? 0 : high;
};
class NumberMap {
    _keys = [];
    _vals = {};
    _sorted = false;
    put(key, value) {
        if (!(key in this._vals)) {
            this._keys.push(key);
            this._sorted = false;
        }
        this._vals[key] = value;
    }
    get(key) {
        return this._vals[key];
    }
    has(key) {
        return this._vals[key] != null;
    }
    each(keyFrom, keyTo, fn) {
        const { _keys: keys } = this;
        const { length } = keys;
        if (!this._sorted) {
            keys.sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            this._sorted = true;
        }
        for (let i = indexFirst(keys, keyFrom); i < length; i++) {
            const key = keys[i];
            if (keyFrom <= key && key <= keyTo) {
                fn(this.get(key), key);
            }
            else if (keyTo < key) {
                return;
            }
        }
    }
}


/***/ }),

/***/ "./src/internal/Rect.ts":
/*!******************************!*\
  !*** ./src/internal/Rect.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => (/* binding */ Rect)
/* harmony export */ });
class Rect {
    _left;
    _top;
    _width;
    _height;
    _right;
    _bottom;
    constructor(left, top, width, height) {
        this._left = left;
        this._top = top;
        this._width = width;
        this._height = height;
    }
    static bounds(left, top, right, bottom) {
        return new Rect(left, top, right - left, bottom - top);
    }
    static max(rect1, rect2) {
        return Rect.bounds(Math.min(rect1.left, rect2.left), Math.min(rect1.top, rect2.top), Math.max(rect1.right, rect2.right), Math.max(rect1.bottom, rect2.bottom));
    }
    get left() {
        return this._left;
    }
    set left(left) {
        const { right } = this;
        this._left = left;
        this.right = right;
    }
    get top() {
        return this._top;
    }
    set top(top) {
        const { bottom } = this;
        this._top = top;
        this.bottom = bottom;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this._right = undefined;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        this._bottom = undefined;
    }
    get right() {
        return this._right !== undefined ? this._right : (this._right = this.left + this.width);
    }
    set right(right) {
        this._right = right;
        this.width = right - this.left;
    }
    get bottom() {
        return this._bottom !== undefined ? this._bottom : (this._bottom = this.top + this.height);
    }
    set bottom(bottom) {
        this._bottom = bottom;
        this.height = bottom - this.top;
    }
    offsetLeft(offset) {
        this._left += offset;
        this._right = undefined;
    }
    offsetTop(offset) {
        this._top += offset;
        this._bottom = undefined;
    }
    copy() {
        return new Rect(this.left, this.top, this.width, this.height);
    }
    intersection(rect) {
        const x0 = Math.max(this.left, rect.left);
        const x1 = Math.min(this.left + this.width, rect.left + rect.width);
        if (x0 <= x1) {
            const y0 = Math.max(this.top, rect.top);
            const y1 = Math.min(this.top + this.height, rect.top + rect.height);
            if (y0 <= y1) {
                return Rect.bounds(x0, y0, x1, y1);
            }
        }
        return null;
    }
    contains(another) {
        return this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height;
    }
    inPoint(x, y) {
        return this.left <= x && this.left + this.width >= x && this.top <= y && this.top + this.height >= y;
    }
}


/***/ }),

/***/ "./src/internal/Scrollable.ts":
/*!************************************!*\
  !*** ./src/internal/Scrollable.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scrollable": () => (/* binding */ Scrollable)
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./src/internal/style.ts");
/* harmony import */ var _EventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");



const MAX_SCROLL = _utils__WEBPACK_IMPORTED_MODULE_2__.browser.heightLimit - 1000;
class Scrollable {
    _handler;
    _scrollable;
    _height;
    _width;
    _endPointElement;
    _p = 1;
    constructor() {
        this._handler = new _EventHandler__WEBPACK_IMPORTED_MODULE_1__.EventHandler();
        this._scrollable = document.createElement('div');
        this._scrollable.classList.add('grid-scrollable');
        this._height = 0;
        this._width = 0;
        this._endPointElement = document.createElement('div');
        this._endPointElement.classList.add('grid-scroll-end-point');
        this._update();
        this._scrollable.appendChild(this._endPointElement);
        // const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel'; //FF doesn't recognize mousewheel as of FF3.x
        // this._handler.on(this._scrollable, mousewheelevt, (evt) => {
        // const delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
        // const point = Math.min(Math.abs(delta) / 12, this.scrollHeight / 5);
        // this.scrollTop += delta < 0 ? point : -point;
        // });
    }
    calcTop(top) {
        const relativeTop = top - this.scrollTop;
        return this._scrollable.scrollTop + relativeTop;
    }
    getElement() {
        return this._scrollable;
    }
    setScrollSize(width, height) {
        this._width = width;
        this._height = height;
        this._update();
    }
    get scrollWidth() {
        return this._width;
    }
    set scrollWidth(width) {
        this._width = width;
        this._update();
    }
    get scrollHeight() {
        return this._height;
    }
    set scrollHeight(height) {
        this._height = height;
        this._update();
    }
    get scrollLeft() {
        return Math.max(Math.ceil(this._scrollable.scrollLeft), 0);
    }
    set scrollLeft(scrollLeft) {
        this._scrollable.scrollLeft = scrollLeft;
    }
    get scrollTop() {
        return Math.max(Math.ceil(this._scrollable.scrollTop / this._p), 0);
    }
    set scrollTop(scrollTop) {
        this._scrollable.scrollTop = scrollTop * this._p;
    }
    onScroll(fn) {
        this._handler.on(this._scrollable, 'scroll', fn);
    }
    dispose() {
        this._handler.dispose();
    }
    _update() {
        let domHeight;
        if (this._height > MAX_SCROLL) {
            const sbSize = _style__WEBPACK_IMPORTED_MODULE_0__.getScrollBarSize();
            const { offsetHeight } = this._scrollable;
            const vScrollRange = MAX_SCROLL - offsetHeight + sbSize;
            const rScrollRange = this._height - offsetHeight + sbSize;
            this._p = vScrollRange / rScrollRange;
            domHeight = MAX_SCROLL;
        }
        else {
            this._p = 1;
            domHeight = this._height;
        }
        this._endPointElement.style.top = `${domHeight.toFixed()}px`;
        this._endPointElement.style.left = `${this._width.toFixed()}px`;
    }
}


/***/ }),

/***/ "./src/internal/animate.ts":
/*!*********************************!*\
  !*** ./src/internal/animate.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");

function cubicBezier(x2, y2, x3, y3) {
    let step;
    const err = 0.0001;
    x2 *= 3;
    y2 *= 3;
    x3 *= 3;
    y3 *= 3;
    return function (t) {
        let p, a, b, c, d, x, s;
        if (t < 0 || 1 < t) {
            throw new Error(`${t}`);
        }
        p = step || t;
        do {
            a = 1 - p;
            b = a * a;
            c = p * p;
            d = c * p;
            x = x2 * b * p + x3 * a * c + d;
            s = t - x;
            p += s * 0.5;
        } while (err < Math.abs(s));
        step = p;
        return y2 * b * p + y3 * a * c + d;
    };
}
const EASINGS = {
    linear(p) {
        return p;
    },
    easeIn: cubicBezier(0.42, 0.0, 1.0, 1.0),
    easeOut: cubicBezier(0.0, 0.0, 0.58, 1.0),
    easeInOut: cubicBezier(0.42, 0.0, 0.58, 1.0)
};
const raf = (_utils__WEBPACK_IMPORTED_MODULE_0__.isNode
    ? () => {
    }
    : window.requestAnimationFrame ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((fn) => setTimeout(fn, 1)));
function now() {
    return Date.now();
}
/**
 * <pre>
 * Animates.
 * </pre>
 * @function
 * @param {number} duration animation time.
 * @param {function} step step
 * @param {function|string} easing easing
 * @returns {object} Deferred object.
 */
function animate(duration, step, easing) {
    const startedAt = now();
    const easingFn = easing == null ? EASINGS.easeInOut : typeof easing === 'string' ? EASINGS[easing] : easing;
    let canceledFlg = false;
    const createAnim = (resolve, reject) => {
        const anim = () => {
            const point = now() - startedAt;
            if (canceledFlg) {
                //cancel
                if (reject) {
                    reject();
                }
            }
            else if (point >= duration) {
                //end
                step(1);
                if (resolve) {
                    resolve();
                }
            }
            else {
                step(easingFn(point / duration));
                raf(anim);
            }
        };
        return anim;
    };
    const cancel = () => {
        canceledFlg = true;
    };
    if (typeof Promise !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = new Promise((resolve, reject) => {
            const anim = createAnim(resolve, reject);
            step(0);
            anim();
        });
        result.cancel = cancel;
        return result;
    }
    else {
        const anim = createAnim(() => {
        }, () => {
        });
        step(0);
        anim();
        return {
            cancel
        };
    }
}


/***/ }),

/***/ "./src/internal/calc.ts":
/*!******************************!*\
  !*** ./src/internal/calc.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toPx": () => (/* binding */ toPx)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");

const TYPE_PAREN = 0;
const TYPE_UNIT = 1;
const TYPE_OPERATOR = 2;
const TYPE_NUMBER = 3;
const NODE_TYPE_UNIT = 10;
const NODE_TYPE_BINARY_EXPRESSION = 11;
const NODE_TYPE_NUMBER = 12;
const TABULATION = 0x09;
const CARRIAGE_RETURN = 0x0d;
const LINE_FEED = 0x0a;
const FORM_FEED = 0x0c;
const SPACE = 0x20;
const PERCENT = 0x25;
const FULL_STOP = 0x2e;
const DIGIT_0 = 0x30;
const DIGIT_9 = 0x39;
const LATIN_CAPITAL_A = 0x41;
const LATIN_CAPITAL_Z = 0x5a;
const LATIN_SMALL_A = 0x61;
const LATIN_SMALL_Z = 0x7a;
function isUpperLetter(cp) {
    return cp >= LATIN_CAPITAL_A && cp <= LATIN_CAPITAL_Z;
}
function isLowerLetter(cp) {
    return cp >= LATIN_SMALL_A && cp <= LATIN_SMALL_Z;
}
function isLetter(cp) {
    return isLowerLetter(cp) || isUpperLetter(cp);
}
function isWhitespace(cp) {
    return cp === TABULATION || cp === LINE_FEED || cp === FORM_FEED || cp === CARRIAGE_RETURN || cp === SPACE;
}
function isDigit(cp) {
    return cp >= DIGIT_0 && cp <= DIGIT_9;
}
function isDot(cp) {
    return cp === FULL_STOP;
}
function isUnit(cp) {
    return isLetter(cp) || cp === PERCENT;
}
function createError(calc) {
    return new Error(`calc parse error: ${calc}`);
}
/**
 * tokenize
 * @param {string} calc calc expression
 * @returns {Array} tokens
 * @private
 */
function tokenize(calc) {
    const exp = calc.replace(/calc\(/g, '(').trim();
    const tokens = [];
    const len = exp.length;
    for (let index = 0; index < len; index++) {
        const c = exp[index];
        const cp = c.charCodeAt(0);
        if (c === '(' || c === ')') {
            tokens.push({ value: c, type: TYPE_PAREN });
        }
        else if (c === '*' || c === '/') {
            tokens.push({ value: c, type: TYPE_OPERATOR });
        }
        else if (c === '+' || c === '-') {
            index = parseSign(c, index + 1) - 1;
        }
        else if (isDigit(cp) || isDot(cp)) {
            index = parseNum(c, index + 1) - 1;
        }
        else if (isWhitespace(cp)) {
            // skip
        }
        else {
            throw createError(calc);
        }
    }
    function parseSign(sign, start) {
        if (start < len) {
            const c = exp[start];
            const cp = c.charCodeAt(0);
            if (isDigit(cp) || isDot(cp)) {
                return parseNum(sign + c, start + 1);
            }
        }
        tokens.push({ value: sign, type: TYPE_OPERATOR });
        return start;
    }
    function parseNum(num, start) {
        let index = start;
        for (; index < len; index++) {
            const c = exp[index];
            const cp = c.charCodeAt(0);
            if (isDigit(cp)) {
                num += c;
            }
            else if (c === '.') {
                if (num.indexOf('.') >= 0) {
                    throw createError(calc);
                }
                num += c;
            }
            else if (isUnit(cp)) {
                return parseUnit(num, c, index + 1);
            }
            else {
                break;
            }
        }
        if (num === '.') {
            throw createError(calc);
        }
        tokens.push({ value: parseFloat(num), type: TYPE_NUMBER });
        return index;
    }
    function parseUnit(num, unit, start) {
        let index = start;
        for (; index < len; index++) {
            const c = exp[index];
            const cp = c.charCodeAt(0);
            if (isUnit(cp)) {
                unit += c;
            }
            else {
                break;
            }
        }
        tokens.push({ value: parseFloat(num), unit, type: TYPE_UNIT });
        return index;
    }
    return tokens;
}
const PRECEDENCE = {
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2
};
function lex(tokens, calc) {
    function buildBinaryExpNode(stack) {
        const right = stack.pop();
        const op = stack.pop();
        const left = stack.pop();
        if (!left || !left.nodeType || !op || op.type !== TYPE_OPERATOR || !right || !right.nodeType) {
            throw createError(calc);
        }
        return {
            nodeType: NODE_TYPE_BINARY_EXPRESSION,
            left,
            op,
            right
        };
    }
    const stack = [];
    while (tokens.length) {
        const token = tokens.shift();
        if (token.type === TYPE_PAREN && token.value === '(') {
            let deep = 0;
            const closeIndex = _utils__WEBPACK_IMPORTED_MODULE_0__.array.findIndex(tokens, (t) => {
                if (t.type === TYPE_PAREN && t.value === '(') {
                    deep++;
                }
                else if (t.type === TYPE_PAREN && t.value === ')') {
                    if (!deep) {
                        return true;
                    }
                    deep--;
                }
                return false;
            });
            if (closeIndex === -1) {
                throw createError(calc);
            }
            stack.push(lex(tokens.splice(0, closeIndex), calc));
            tokens.shift();
        }
        else if (token.type === TYPE_OPERATOR) {
            if (stack.length >= 3) {
                const beforeOp = stack[stack.length - 2].value;
                if (PRECEDENCE[token.value] <= PRECEDENCE[beforeOp]) {
                    stack.push(buildBinaryExpNode(stack));
                }
            }
            stack.push(token);
        }
        else if (token.type === TYPE_UNIT) {
            const { value: num, unit } = token;
            stack.push({
                nodeType: NODE_TYPE_UNIT,
                value: num,
                unit
            });
        }
        else if (token.type === TYPE_NUMBER) {
            stack.push({
                nodeType: NODE_TYPE_NUMBER,
                value: token.value
            });
        }
    }
    while (stack.length > 1) {
        stack.push(buildBinaryExpNode(stack));
    }
    return stack[0];
}
function parse(calcStr) {
    const tokens = tokenize(calcStr);
    return lex(tokens, calcStr);
}
function calcNode(node, context) {
    if (node.nodeType === NODE_TYPE_BINARY_EXPRESSION) {
        const left = calcNode(node.left, context);
        const right = calcNode(node.right, context);
        switch (node.op.value) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            default:
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error(`calc error. unknown operator: ${node.op.value}`);
        }
    }
    else if (node.nodeType === NODE_TYPE_UNIT) {
        switch (node.unit) {
            case '%':
                return (node.value * context.full) / 100;
            case 'em':
                return node.value * context.em;
            case 'px':
                return node.value;
            default:
                throw new Error(`calc error. unknown unit: ${node.unit}`);
        }
    }
    else if (node.nodeType === NODE_TYPE_NUMBER) {
        return node.value;
    }
    throw new Error('calc error.');
}
function toPxInternal(value, context) {
    const ast = parse(value);
    return calcNode(ast, context);
}
function toPx(value, context) {
    if (typeof value === 'string') {
        return toPxInternal(value.trim(), context);
    }
    return value - 0;
}


/***/ }),

/***/ "./src/internal/canvases.ts":
/*!**********************************!*\
  !*** ./src/internal/canvases.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFontSize": () => (/* binding */ getFontSize),
/* harmony export */   "calcBasePosition": () => (/* binding */ calcBasePosition),
/* harmony export */   "calcStartPosition": () => (/* binding */ calcStartPosition)
/* harmony export */ });
const fontSizeCache = {};
function getFontSize(ctx, font) {
    const fontName = font || ctx.font;
    if (fontSizeCache[fontName]) {
        return fontSizeCache[fontName];
    }
    const bk = ctx.font;
    try {
        ctx.font = fontName;
        const em = ctx.measureText('帅').width;
        return (fontSizeCache[fontName] = {
            width: em,
            height: em
        });
    }
    finally {
        ctx.font = bk;
    }
}
function calcBasePosition(ctx, rect, { offset = 0, padding: { left: paddingLeft = 0, right: paddingRight = 0, top: paddingTop = 0, bottom: paddingBottom = 0 } = {} } = {}) {
    return calcStartPosition(ctx, rect, 0, 0, {
        offset,
        padding: {
            left: paddingLeft,
            right: paddingRight,
            top: paddingTop,
            bottom: paddingBottom
        }
    });
}
function calcStartPosition(ctx, rect, width, height, { offset = 0, padding: { left: paddingLeft = 0, right: paddingRight = 0, top: paddingTop = 0, bottom: paddingBottom = 0 } = {} } = {}) {
    const textAlign = ctx.textAlign || 'left';
    const textBaseline = ctx.textBaseline || 'middle';
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    let x = rect.left + offset + paddingLeft;
    if (textAlign === 'right' || textAlign === 'end') {
        x = rect.right - width - offset - paddingRight;
    }
    else if (textAlign === 'center') {
        x = rect.left + (rect.width - width + paddingLeft - paddingRight) / 2;
    }
    let y = rect.top + offset + paddingTop;
    if (textBaseline === 'bottom' || textBaseline === 'alphabetic' || textBaseline === 'ideographic') {
        y = rect.bottom - height - offset - paddingBottom;
    }
    else if (textBaseline === 'middle') {
        y = rect.top + (rect.height - height + paddingTop - paddingBottom) / 2;
    }
    return { x, y };
}


/***/ }),

/***/ "./src/internal/color.ts":
/*!*******************************!*\
  !*** ./src/internal/color.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorToRGB": () => (/* binding */ colorToRGB)
/* harmony export */ });
const rgbMap = {};
function styleColorToRGB(color) {
    const dummy = document.createElement('div');
    const { style } = dummy;
    style.color = color;
    style.position = 'fixed';
    style.height = '1px';
    style.width = '1px';
    style.opacity = '0';
    document.body.appendChild(dummy);
    const { color: styleColor } = (document.defaultView || window).getComputedStyle(dummy, '');
    document.body.removeChild(dummy);
    return colorToRGB0(styleColor || '');
}
function hexToNum(hex) {
    return parseInt(hex, 16);
}
function createRGB(r, g, b, a = 1) {
    return { r, g, b, a };
}
function tripleHexToRGB({ 1: r, 2: g, 3: b }) {
    return createRGB(hexToNum(r + r), hexToNum(g + g), hexToNum(b + b));
}
function sextupleHexToRGB({ 1: r1, 2: r2, 3: g1, 4: g2, 5: b1, 6: b2 }) {
    return createRGB(hexToNum(r1 + r2), hexToNum(g1 + g2), hexToNum(b1 + b2));
}
function testRGB({ r, g, b, a }) {
    return 0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255 && 0 <= a && a <= 1;
}
function rateToByte(r) {
    return Math.ceil((r * 255) / 100);
}
function colorToRGB0(color) {
    if (/^#[0-9a-f]{3}$/i.exec(color)) {
        return tripleHexToRGB(color);
    }
    if (/^#[0-9a-f]{6}$/i.exec(color)) {
        return sextupleHexToRGB(color);
    }
    let ret = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(color);
    if (ret) {
        const rgb = createRGB(Number(ret[1]), Number(ret[2]), Number(ret[3]));
        if (testRGB(rgb)) {
            return rgb;
        }
    }
    ret = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d(\.\d)?)\s*\)$/i.exec(color);
    if (ret) {
        const rgb = createRGB(Number(ret[1]), Number(ret[2]), Number(ret[3]), Number(ret[4]));
        if (testRGB(rgb)) {
            return rgb;
        }
    }
    ret = /^rgb\(\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*\)$/i.exec(color);
    if (ret) {
        const rgb = createRGB(rateToByte(Number(ret[1])), rateToByte(Number(ret[3])), rateToByte(Number(ret[5])));
        if (testRGB(rgb)) {
            return rgb;
        }
    }
    ret = /^rgba\(\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d(\.\d)?)\s*\)$/i.exec(color);
    if (ret) {
        const rgb = createRGB(rateToByte(Number(ret[1])), rateToByte(Number(ret[3])), rateToByte(Number(ret[5])), Number(ret[7]));
        if (testRGB(rgb)) {
            return rgb;
        }
    }
    return null;
}
function colorToRGB(color) {
    if (typeof color !== 'string') {
        return createRGB(0, 0, 0, 0);
    }
    color = color.toLowerCase().trim();
    if (rgbMap[color]) {
        return rgbMap[color];
    }
    return colorToRGB0(color) || (rgbMap[color] = styleColorToRGB(color));
}


/***/ }),

/***/ "./src/internal/dom.ts":
/*!*****************************!*\
  !*** ./src/internal/dom.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "toNodeList": () => (/* binding */ toNodeList),
/* harmony export */   "appendHtml": () => (/* binding */ appendHtml),
/* harmony export */   "disableFocus": () => (/* binding */ disableFocus),
/* harmony export */   "enableFocus": () => (/* binding */ enableFocus),
/* harmony export */   "isFocusable": () => (/* binding */ isFocusable),
/* harmony export */   "findPrevSiblingFocusable": () => (/* binding */ findPrevSiblingFocusable),
/* harmony export */   "findNextSiblingFocusable": () => (/* binding */ findNextSiblingFocusable)
/* harmony export */ });
function createElement(tagName, { classList, text, html } = {}) {
    const element = document.createElement(tagName);
    if (classList) {
        if (Array.isArray(classList)) {
            element.classList.add(...classList);
        }
        else {
            element.classList.add(classList);
        }
    }
    if (text) {
        element.textContent = text;
    }
    else if (html) {
        element.innerHTML = html;
    }
    return element;
}
function empty(dom) {
    let c;
    while ((c = dom.firstChild)) {
        dom.removeChild(c);
    }
}
function isNode(arg) {
    return !!(arg.nodeType && arg.nodeName);
}
function toNode(arg) {
    if (isNode(arg)) {
        return arg;
    }
    const dom = createElement('div', { html: arg });
    return Array.prototype.slice.call(dom.childNodes);
}
function toNodeList(arg) {
    if (Array.isArray(arg)) {
        const result = [];
        arg.forEach((e) => {
            result.push(...toNodeList(e));
        });
        return result;
    }
    const node = toNode(arg);
    return Array.isArray(node) ? node : [node];
}
function appendHtml(dom, inner) {
    toNodeList(inner).forEach((node) => {
        dom.appendChild(node);
    });
}
function disableFocus(el) {
    el.dataset.disableBeforeTabIndex = `${el.tabIndex}`;
    el.tabIndex = -1;
    Array.prototype.slice.call(el.children, 0).forEach(disableFocus);
}
function enableFocus(el) {
    if ('disableBeforeTabIndex' in el.dataset) {
        el.tabIndex = Number(el.dataset.disableBeforeTabIndex);
    }
    Array.prototype.slice.call(el.children, 0).forEach(enableFocus);
}
function isFocusable(el) {
    return el.tabIndex != null && el.tabIndex > -1;
}
function findPrevSiblingFocusable(el) {
    let n = el.previousSibling;
    while (n && !isFocusable(n)) {
        n = n.previousSibling;
    }
    // return n
    return n;
}
function findNextSiblingFocusable(el) {
    let n = el.nextSibling;
    while (n && !isFocusable(n)) {
        n = n.nextSibling;
    }
    return n;
}


/***/ }),

/***/ "./src/internal/fonts.ts":
/*!*******************************!*\
  !*** ./src/internal/fonts.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "check": () => (/* binding */ check),
/* harmony export */   "load": () => (/* binding */ load)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");
/* harmony import */ var _legacy_fontwatch_FontWatchRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy/fontwatch/FontWatchRunner */ "./src/internal/legacy/fontwatch/FontWatchRunner.ts");


const loads = {};
let load;
let check;
if (_utils__WEBPACK_IMPORTED_MODULE_0__.isNode) {
    load = function (_font, _testStr, callback) {
        callback();
    };
    check = function () {
        return false;
    };
}
else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fontFaceSet = document.fonts;
    const legacy = !fontFaceSet;
    load = legacy
        ? function (font, testStr, callback) {
            //for legacy(IE)
            if (loads[`${font} @ ${testStr}`]) {
                callback();
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            // require('./legacy/fontwatch/FontWatchRunner').load(
            _legacy_fontwatch_FontWatchRunner__WEBPACK_IMPORTED_MODULE_1__["default"].load(font, testStr, () => {
                loads[`${font} @ ${testStr}`] = true;
                callback();
            }, () => {
                loads[`${font} @ ${testStr}`] = true;
                callback();
            });
        }
        : function (font, _testStr, callback) {
            if (loads.all || loads[font]) {
                callback();
                return;
            }
            fontFaceSet.ready.then(() => {
                loads.all = true;
            });
            fontFaceSet.load(font).then(() => {
                loads[font] = true;
                callback();
            });
        };
    check = legacy
        ? function (font, testStr) {
            //for legacy(IE)
            if (loads[`${font} @ ${testStr}`]) {
                return true;
            }
            load(font, testStr, () => {
            });
            return false;
        }
        : function (font, testStr) {
            if (loads.all || loads[font]) {
                return true;
            }
            if (!fontFaceSet.check(font)) {
                load(font, testStr, () => {
                });
                return false;
            }
            return true;
        };
}



/***/ }),

/***/ "./src/internal/hiDPI.ts":
/*!*******************************!*\
  !*** ./src/internal/hiDPI.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transform": () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");


const handler = new _EventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler();
let ratio = 1;
function setRatio() {
    if (_utils__WEBPACK_IMPORTED_MODULE_1__.isNode) {
        ratio = 1;
    }
    else {
        ratio = Math.ceil(window.devicePixelRatio || 1);
        if (ratio > 1 && ratio % 2 !== 0) {
            ratio += 1;
        }
    }
}
setRatio();
if (!_utils__WEBPACK_IMPORTED_MODULE_1__.isNode) {
    handler.on(window, 'resize', setRatio);
}
/**
 * 设置画布宽度和高度
 * @param canvas
 */
function transform(canvas) {
    const ctx = canvas.getContext('2d');
    const { getAttribute, setAttribute } = canvas;
    canvas.getAttribute = function (name) {
        let result = getAttribute.call(this, name);
        if (name === 'width' || name === 'height') {
            result = `${Number(result) / ratio}`;
        }
        return result;
    };
    canvas.setAttribute = function (name, val) {
        const wh = name === 'width' || name === 'height';
        if (wh) {
            val = `${Number(val) * ratio}`;
        }
        const result = setAttribute.call(this, name, val);
        if (wh) {
            ctx.scale(ratio, ratio);
        }
        return result;
    };
    Object.defineProperty(canvas, 'width', {
        get() {
            return Number(canvas.getAttribute('width'));
        },
        set: (val) => {
            canvas.setAttribute('width', `${Math.floor(val)}`);
        },
        configurable: true,
        enumerable: true
    });
    Object.defineProperty(canvas, 'height', {
        get() {
            return Number(canvas.getAttribute('height'));
        },
        set: (val) => {
            canvas.setAttribute('height', `${Math.floor(val)}`);
        },
        configurable: true,
        enumerable: true
    });
    const { drawImage } = ctx;
    ctx.drawImage = function (img, ...args) {
        if (img !== canvas || ratio === 1) {
            return drawImage.call(this, img, ...args);
        }
        this.save();
        try {
            this.scale(1 / ratio, 1 / ratio);
            if (args.length > 4) {
                args[4] *= ratio;
                args[5] *= ratio;
            }
            else {
                args[0] *= ratio;
                args[1] *= ratio;
            }
            return drawImage.call(this, img, ...args);
        }
        finally {
            this.restore();
        }
    };
    return canvas;
}


/***/ }),

/***/ "./src/internal/icons.ts":
/*!*******************************!*\
  !*** ./src/internal/icons.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIconProps": () => (/* binding */ getIconProps),
/* harmony export */   "toNormarizeArray": () => (/* binding */ toNormarizeArray),
/* harmony export */   "iconPropKeys": () => (/* binding */ iconPropKeys)
/* harmony export */ });
const ICON_PROP_KEYS = ['content', 'font', 'color', 'className', 'tagName', 'isLiga', 'width', 'src', 'svg', 'name', 'path'];
function quote(name) {
    const quoted = [];
    const split = name.split(/,\s*/);
    for (let i = 0; i < split.length; i++) {
        const part = split[i].replace(/['"]/g, '');
        if (part.indexOf(' ') === -1 && !/^\d/.test(part)) {
            quoted.push(part);
        }
        else {
            quoted.push(`'${part}'`);
        }
    }
    return quoted.join(',');
}
const doms = {};
const props = {};
function getIconProps(tagName, className) {
    const tagProps = props[tagName] || (props[tagName] = {});
    if (tagProps[className]) {
        return tagProps[className];
    }
    const dom = doms[tagName] || (doms[tagName] = document.createElement(tagName));
    dom.className = className;
    document.body.appendChild(dom);
    try {
        const beforeStyle = (document.defaultView || window).getComputedStyle(dom, '::before');
        let content = beforeStyle.getPropertyValue('content');
        if (content.length >= 3 && (content[0] === '"' || content[0] === '\'')) {
            if (content[0] === content[content.length - 1]) {
                content = content.substr(1, content.length - 2);
            }
        }
        let font = beforeStyle.getPropertyValue('font');
        if (!font) {
            font = `${beforeStyle.getPropertyValue('font-style')} ${beforeStyle.getPropertyValue('font-variant')} ${beforeStyle.getPropertyValue('font-weight')} ${beforeStyle.getPropertyValue('font-size')}/${beforeStyle.getPropertyValue('line-height')} ${quote(beforeStyle.getPropertyValue('font-family'))}`;
        }
        const color = beforeStyle.getPropertyValue('color');
        const width = dom.clientWidth;
        const isLiga = (beforeStyle.getPropertyValue('font-feature-settings') || '').indexOf('liga') > -1;
        return (tagProps[className] = {
            content,
            font,
            color,
            width,
            isLiga
        });
    }
    finally {
        document.body.removeChild(dom);
    }
}
function toPropArray(prop, count) {
    const result = [];
    if (Array.isArray(prop)) {
        result.push(...prop);
        for (let i = prop.length; i < count; i++) {
            result.push(null);
        }
    }
    else {
        for (let i = 0; i < count; i++) {
            result.push(prop);
        }
    }
    return result;
}
function toSimpleArray(iconProps) {
    if (!iconProps) {
        return iconProps;
    }
    else if (Array.isArray(iconProps)) {
        return iconProps;
    }
    const workData = {};
    let count = 0;
    ICON_PROP_KEYS.forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const prop = iconProps[k];
        if (prop) {
            if (Array.isArray(prop)) {
                count = Math.max(count, prop.length);
            }
            else {
                count = Math.max(count, 1);
            }
        }
    });
    ICON_PROP_KEYS.forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arr = toPropArray(iconProps[k], count);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        workData[k] = arr;
    });
    const result = [];
    for (let i = 0; i < count; i++) {
        const data = {};
        ICON_PROP_KEYS.forEach((k) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const val = workData[k][i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data[k] = val;
        });
        result.push(data);
    }
    return result;
}
function normarize(iconProps) {
    const data = {};
    for (const k in iconProps) {
        if (k === 'className') {
            continue;
        }
        if (isIconKey(k)) {
            // @ts-ignore
            data[k] = iconProps[k];
        }
    }
    if (iconProps.className) {
        const prop = getIconProps(iconProps.tagName || 'i', iconProps.className);
        for (const k in prop) {
            if (isIconKey(k)) {
                if (iconProps[k] == null) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    // @ts-ignore
                    data[k] = prop[k];
                }
            }
        }
    }
    return data;
}
function toNormarizeArray(iconProps) {
    const icons = toSimpleArray(iconProps);
    if (!icons) {
        // @ts-ignore
        return icons;
    }
    // @ts-ignore
    return icons.map((icon) => normarize(icon));
}
const iconPropKeys = ICON_PROP_KEYS;
function isIconKey(k) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ICON_PROP_KEYS.indexOf(k) >= 0;
}


/***/ }),

/***/ "./src/internal/imgs.ts":
/*!******************************!*\
  !*** ./src/internal/imgs.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadImage": () => (/* binding */ loadImage),
/* harmony export */   "getCacheOrLoad": () => (/* binding */ getCacheOrLoad)
/* harmony export */ });
/* harmony import */ var _LRUCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LRUCache */ "./src/internal/LRUCache.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");


const allCache = {};
function loadImage(src) {
    if (typeof Promise === 'undefined') {
        console.error('Promise is not loaded. load Promise before this process.');
        return {
            then() {
                return this;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
    }
    const img = new Image();
    const result = new Promise((resolve) => {
        img.onload = () => {
            resolve(img);
        };
    });
    img.onerror = () => {
        const url = src.length > 200 ? `${src.substr(0, 200)}...` : src;
        console.warn(`cannot load: ${url}`);
        throw new Error(`IMAGE LOAD ERROR: ${url}`);
    };
    img.src = src;
    return result;
}
function getCacheOrLoad0(cache, src) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.then)(src, (src) => {
        const c = cache.get(src);
        if (c) {
            return c;
        }
        const result = loadImage(src).then((img) => {
            cache.put(src, img);
            return img;
        });
        cache.put(src, result);
        return result;
    });
}
function getCacheOrLoad(cacheName, cacheSize, src) {
    const cache = allCache[cacheName] || (allCache[cacheName] = new _LRUCache__WEBPACK_IMPORTED_MODULE_0__.LRUCache(cacheSize));
    return getCacheOrLoad0(cache, src);
}


/***/ }),

/***/ "./src/internal/legacy/canvas/Path2DShim.ts":
/*!**************************************************!*\
  !*** ./src/internal/legacy/canvas/Path2DShim.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Path2DShim": () => (/* binding */ Path2DShim)
/* harmony export */ });
/* harmony import */ var _PathCommandsParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PathCommandsParser */ "./src/internal/legacy/canvas/PathCommandsParser.ts");

const parser = new _PathCommandsParser__WEBPACK_IMPORTED_MODULE_0__.PathCommandsParser();
class Path2DShim {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _ops;
    arc(...args) {
        this._ops.push({ op: 'arc', args });
    }
    arcTo(...args) {
        this._ops.push({ op: 'arcTo', args });
    }
    bezierCurveTo(...args) {
        this._ops.push({ op: 'bezierCurveTo', args });
    }
    closePath(...args) {
        this._ops.push({ op: 'closePath', args });
    }
    ellipse(...args) {
        this._ops.push({ op: 'ellipse', args });
    }
    lineTo(...args) {
        this._ops.push({ op: 'lineTo', args });
    }
    moveTo(...args) {
        this._ops.push({ op: 'moveTo', args });
    }
    quadraticCurveTo(...args) {
        this._ops.push({ op: 'quadraticCurveTo', args });
    }
    rect(...args) {
        this._ops.push({ op: 'rect', args });
    }
    constructor(arg) {
        this._ops = [];
        if (arg === undefined) {
            return;
        }
        if (typeof arg === 'string') {
            // try {
            this._ops = parser.parse(arg);
            // } catch (e) {
            // 	throw e;
            // }
        }
        else if (arg.hasOwnProperty('_ops')) {
            this._ops = [...arg._ops];
        }
        else {
            throw new Error(`Error: ${typeof arg} is not a valid argument to Path`);
        }
    }
}
const { CanvasRenderingContext2D } = window;
const originalFill = CanvasRenderingContext2D.prototype.fill;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
CanvasRenderingContext2D.prototype.fill = function (...args) {
    if (args[0] instanceof Path2DShim) {
        const path = args[0];
        this.beginPath();
        path._ops.forEach((op) => {
            const fn = this[op.op];
            fn.apply(this, op.args);
        });
        originalFill.apply(this, Array.prototype.slice.call(args, 1));
    }
    else {
        originalFill.apply(this, args);
    }
};


/***/ }),

/***/ "./src/internal/legacy/canvas/PathCommands.ts":
/*!****************************************************!*\
  !*** ./src/internal/legacy/canvas/PathCommands.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PathCommands": () => (/* binding */ PathCommands)
/* harmony export */ });
/*eslint new-cap: "off"*/
function mag(v) {
    return Math.sqrt(v[0] ** 2 + v[1] ** 2);
}
function dot(u, v) {
    return u[0] * v[0] + u[1] * v[1];
}
function ratio(u, v) {
    return dot(u, v) / (mag(u) * mag(v));
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function angle(u, v) {
    let sign = 1.0;
    if (u[0] * v[1] - u[1] * v[0] < 0) {
        sign = -1.0;
    }
    return sign * Math.acos(clamp(ratio(u, v), -1, 1));
}
function rotClockwise(v, angle) {
    const cost = Math.cos(angle);
    const sint = Math.sin(angle);
    return [cost * v[0] + sint * v[1], -1 * sint * v[0] + cost * v[1]];
}
function rotCounterClockwise(v, angle) {
    const cost = Math.cos(angle);
    const sint = Math.sin(angle);
    return [cost * v[0] - sint * v[1], sint * v[0] + cost * v[1]];
}
function midPoint(u, v) {
    return [(u[0] - v[0]) / 2.0, (u[1] - v[1]) / 2.0];
}
function meanVec(u, v) {
    return [(u[0] + v[0]) / 2.0, (u[1] + v[1]) / 2.0];
}
function pointMul(u, v) {
    return [u[0] * v[0], u[1] * v[1]];
}
function scale(c, v) {
    return [c * v[0], c * v[1]];
}
function sum(u, v) {
    return [u[0] + v[0], u[1] + v[1]];
}
// Convert an SVG elliptical arc to a series of canvas commands.
//
// x1, y1, x2, y2: start and stop coordinates of the ellipse.
// rx, ry: radii of the ellipse.
// phi: rotation of the ellipse.
// fA: large arc flag.
// fS: sweep flag.
function ellipseFromEllipticalArc(ctx, x1, y1, rx, ry, phi, fA, fS, x2, y2) {
    // Convert from endpoint to center parametrization, as detailed in:
    //   http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
    if (rx === 0 || ry === 0) {
        ctx.lineTo(x2, x1);
        return;
    }
    phi *= Math.PI / 180.0;
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const xPrime = rotClockwise(midPoint([x1, y1], [x2, y2]), phi); // F.6.5.1
    const xPrime2 = pointMul(xPrime, xPrime);
    let rx2 = rx ** 2;
    let ry2 = ry ** 2;
    const lambda = Math.sqrt(xPrime2[0] / rx2 + xPrime2[1] / ry2);
    if (lambda > 1) {
        rx *= lambda;
        ry *= lambda;
        rx2 = rx ** 2;
        ry2 = ry ** 2;
    }
    let factor = Math.sqrt(Math.abs(rx2 * ry2 - rx2 * xPrime2[1] - ry2 * xPrime2[0]) / (rx2 * xPrime2[1] + ry2 * xPrime2[0]));
    if (fA === fS) {
        factor *= -1.0;
    }
    const cPrime = scale(factor, [(rx * xPrime[1]) / ry, (-ry * xPrime[0]) / rx]); // F.6.5.2
    const c = sum(rotCounterClockwise(cPrime, phi), meanVec([x1, y1], [x2, y2])); // F.6.5.3
    const x1UnitVector = [(xPrime[0] - cPrime[0]) / rx, (xPrime[1] - cPrime[1]) / ry];
    const x2UnitVector = [(-1.0 * xPrime[0] - cPrime[0]) / rx, (-1.0 * xPrime[1] - cPrime[1]) / ry];
    const theta = angle([1, 0], x1UnitVector); // F.6.5.5
    const deltaTheta = angle(x1UnitVector, x2UnitVector); // F.6.5.6
    const start = theta;
    const end = theta + deltaTheta;
    ctx.save();
    ctx.translate(c[0], c[1]);
    ctx.rotate(phi);
    ctx.scale(rx, ry);
    ctx.arc(0, 0, 1, start, end, !fS);
    ctx.restore();
}
class PathCommands {
    M;
    m;
    L;
    l;
    H;
    h;
    V;
    v;
    Z;
    z;
    C;
    c;
    S;
    s;
    Q;
    q;
    T;
    t;
    A;
    a;
    constructor(ctx) {
        let lMx;
        let lMy;
        let lx = 0;
        let ly = 0;
        let reflected;
        let lastCommand = '';
        function makeReflected() {
            if ('CcSsQqTt'.indexOf(lastCommand) < 0) {
                return { x: lx, y: ly };
            }
            return reflected;
        }
        this.M = (px, py) => {
            ctx.moveTo(px, py);
            lMx = px;
            lMy = py;
            lx = px;
            ly = py;
            lastCommand = 'M';
            return this;
        };
        this.m = (px, py) => this.M(px + lx, py + ly);
        this.L = (px, py) => {
            ctx.lineTo(px, py);
            lx = px;
            ly = py;
            lastCommand = 'L';
            return this;
        };
        this.l = (px, py) => this.L(px + lx, py + ly);
        this.H = (px) => this.L(px, ly);
        this.h = (px) => this.H(px + lx);
        this.V = (py) => this.L(lx, py);
        this.v = (py) => this.V(py + ly);
        this.Z = () => {
            ctx.closePath();
            lx = lMx;
            ly = lMy;
            lastCommand = 'Z';
            return this;
        };
        this.z = () => this.Z();
        //C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
        this.C = (cp1x, cp1y, cp2x, cp2y, px, py) => {
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py);
            lx = px;
            ly = py;
            reflected = {
                x: 2 * px - cp2x,
                y: 2 * py - cp2y
            };
            lastCommand = 'C';
            return this;
        };
        this.c = (cp1x, cp1y, cp2x, cp2y, px, py) => this.C(cp1x + lx, cp1y + ly, cp2x + lx, cp2y + ly, px + lx, py + ly);
        //S x2 y2, x y (or s dx2 dy2, dx dy)
        this.S = (cpx, cpy, px, py) => {
            const { x: cp1x, y: cp1y } = makeReflected( /*lastCommand*/);
            return this.C(cp1x, cp1y, cpx, cpy, px, py);
        };
        this.s = (cpx, cpy, px, py) => this.S(cpx + lx, cpy + ly, px + lx, py + ly);
        //Q x1 y1, x y (or q dx1 dy1, dx dy)
        this.Q = (cpx, cpy, px, py) => {
            ctx.quadraticCurveTo(cpx, cpy, px, py);
            lx = px;
            ly = py;
            reflected = {
                x: 2 * px - cpx,
                y: 2 * py - cpy
            };
            lastCommand = 'Q';
            return this;
        };
        this.q = (cpx, cpy, px, py) => this.Q(cpx + lx, cpy + ly, px + lx, py + ly);
        //T x y (or t dx dy)
        this.T = (px, py) => {
            const { x: cpx, y: cpy } = makeReflected();
            return this.Q(cpx, cpy, px, py);
        };
        this.t = (px, py) => this.T(px + lx, py + ly);
        //A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        this.A = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py) => {
            const x1 = lx;
            const y1 = ly;
            ellipseFromEllipticalArc(ctx, x1, y1, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py);
            lx = px;
            ly = py;
            lastCommand = 'A';
            return this;
        };
        //a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
        this.a = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py) => this.A(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px + lx, py + ly);
    }
}


/***/ }),

/***/ "./src/internal/legacy/canvas/PathCommandsParser.ts":
/*!**********************************************************!*\
  !*** ./src/internal/legacy/canvas/PathCommandsParser.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PathCommandsParser": () => (/* binding */ PathCommandsParser)
/* harmony export */ });
/* harmony import */ var _PathCommands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PathCommands */ "./src/internal/legacy/canvas/PathCommands.ts");

function pathTokens(d) {
    let idx = 0;
    return {
        next() {
            let s = '';
            while (d.length > idx) {
                const c = d[idx];
                idx++;
                if (' ,\n\r\t'.indexOf(c) > -1) {
                    if (s) {
                        return s;
                    }
                }
                else {
                    const type = '.+-1234567890'.indexOf(c) > -1 ? 'num' : 'str';
                    if (type === 'str') {
                        if (s) {
                            idx--;
                            return s;
                        }
                        return c;
                    }
                    if ('-+'.indexOf(c) > -1) {
                        if (s) {
                            idx--;
                            return s;
                        }
                    }
                    if (c === '.') {
                        if (s.indexOf('.') > -1) {
                            idx--;
                            return s;
                        }
                    }
                    s += c;
                }
            }
            return s || null;
        }
    };
}
function command(builder, cmd, argsProvider) {
    if (cmd.toUpperCase() === 'M' || cmd.toUpperCase() === 'L' || cmd.toUpperCase() === 'T') {
        builder.command(cmd, argsProvider.next(), argsProvider.next());
        return cmd === 'M' ? 'L' : cmd === 'm' ? 'l' : cmd;
    }
    else if (cmd.toUpperCase() === 'H' || cmd.toUpperCase() === 'V') {
        builder.command(cmd, argsProvider.next());
        return cmd;
    }
    else if (cmd.toUpperCase() === 'Z') {
        builder.command(cmd);
        return cmd;
    }
    else if (cmd.toUpperCase() === 'C') {
        builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
        return cmd;
    }
    else if (cmd.toUpperCase() === 'S' || cmd.toUpperCase() === 'Q') {
        builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
        return cmd;
    }
    else if (cmd.toUpperCase() === 'A') {
        builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
        return cmd;
    }
    else {
        // https://developer.mozilla.org/ja/docs/Web/SVG/Tutorial/Paths
        console.warn(`unsupported:${cmd}`);
    }
    return null;
}
class PathCommandsParser {
    moveTo;
    lineTo;
    closePath;
    bezierCurveTo;
    quadraticCurveTo;
    save;
    translate;
    rotate;
    scale;
    arc;
    restore;
    arcTo;
    ellipse;
    rect;
    _commands;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _ops = [];
    constructor() {
        this._commands = new _PathCommands__WEBPACK_IMPORTED_MODULE_0__.PathCommands(this);
        const buildPush = (op) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (...args) => {
            this._ops.push({
                op,
                args
            });
        };
        this.moveTo = buildPush('moveTo');
        this.lineTo = buildPush('lineTo');
        this.closePath = buildPush('closePath');
        this.bezierCurveTo = buildPush('bezierCurveTo');
        this.quadraticCurveTo = buildPush('quadraticCurveTo');
        this.save = buildPush('save');
        this.translate = buildPush('translate');
        this.rotate = buildPush('rotate');
        this.scale = buildPush('scale');
        this.arc = buildPush('arc');
        this.restore = buildPush('restore');
        this.arcTo = buildPush('arcTo');
        this.ellipse = buildPush('ellipse');
        this.rect = buildPush('rect');
    }
    command(name, ...args) {
        const numArgs = args || [];
        for (let i = 0; i < args.length; i++) {
            numArgs[i] -= 0;
        }
        const command = this._commands[name];
        command.apply(this, numArgs);
    }
    parse(d) {
        const ops = (this._ops = []);
        const tokens = pathTokens(d);
        try {
            let cmd;
            let subsequentCommand = 'Z';
            while ((cmd = tokens.next())) {
                if (!isNaN(Number(cmd))) {
                    let fst = true;
                    const argsProvider = {
                        next() {
                            if (fst) {
                                fst = false;
                                return cmd;
                            }
                            return tokens.next();
                        }
                    };
                    subsequentCommand = command(this, subsequentCommand, argsProvider) || 'Z';
                }
                else {
                    subsequentCommand = command(this, cmd, tokens) || 'Z';
                }
            }
        }
        catch (e) {
            console.log(`Error: ${d}`);
            throw e;
        }
        return ops;
    }
}


/***/ }),

/***/ "./src/internal/legacy/fontwatch/FontRuler.ts":
/*!****************************************************!*\
  !*** ./src/internal/legacy/fontwatch/FontRuler.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FontRuler": () => (/* binding */ FontRuler)
/* harmony export */ });
//see https://github.com/typekit/webfontloader
function computeStyle(font) {
    return [
        {
            'display': 'block',
            'position': 'absolute',
            'top': '-9999px',
            'left': '-9999px',
            'width': 'auto',
            'height': 'auto',
            'margin': '0',
            'padding': '0',
            'white-space': 'nowrap',
            font
        },
        {
            'font-variant': 'normal',
            'font-size': '300px',
            'font-style': 'normal',
            'font-weight': '400',
            'line-height': 'normal'
        }
    ];
}
class FontRuler {
    el_;
    constructor(font, testStr) {
        const e = document.createElement('span');
        e.setAttribute('aria-hidden', 'true');
        e.textContent = testStr || 'BESbswy';
        computeStyle(font).forEach((style) => {
            for (const k in style) {
                const key = k;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                e.style[key] = style[key];
            }
        });
        document.body.appendChild(e);
        this.el_ = e;
    }
    getWidth() {
        return this.el_.offsetWidth;
    }
    remove() {
        document.body.removeChild(this.el_);
    }
}


/***/ }),

/***/ "./src/internal/legacy/fontwatch/FontWatchRunner.ts":
/*!**********************************************************!*\
  !*** ./src/internal/legacy/fontwatch/FontWatchRunner.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FontRuler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FontRuler */ "./src/internal/legacy/fontwatch/FontRuler.ts");
//see https://github.com/typekit/webfontloader
//http://defghi1977.html.xdomain.jp/tech/canvasMemo/canvasMemo.htm

const LastResortFonts = {
    SERIF: 'serif',
    SANS_SERIF: 'sans-serif'
};
const watchRunners = {};
class FontWatchRunner {
    activeCallbacks;
    inactiveCallbacks;
    status;
    lastResortWidths_;
    fontRulerA_;
    fontRulerB_;
    started_;
    static async load(font, testStr, activeCallback, inactiveCallback) {
        const c = watchRunners[font] || (watchRunners[font] = {});
        testStr += '';
        let runner;
        if (await c[testStr]) {
            runner = c[testStr];
        }
        else {
            runner = c[testStr] = new FontWatchRunner(font, testStr);
        }
        runner.then(activeCallback, inactiveCallback);
    }
    constructor(font, testStr) {
        this.activeCallbacks = [];
        this.inactiveCallbacks = [];
        this.status = null;
        this.lastResortWidths_ = {};
        this.fontRulerA_ = new _FontRuler__WEBPACK_IMPORTED_MODULE_0__.FontRuler(`${font},${LastResortFonts.SERIF}`, testStr);
        this.fontRulerB_ = new _FontRuler__WEBPACK_IMPORTED_MODULE_0__.FontRuler(`${font},${LastResortFonts.SANS_SERIF}`, testStr);
        const lastResortRulerA = new _FontRuler__WEBPACK_IMPORTED_MODULE_0__.FontRuler(`4px ${LastResortFonts.SERIF}`, testStr);
        const lastResortRulerB = new _FontRuler__WEBPACK_IMPORTED_MODULE_0__.FontRuler(`4px ${LastResortFonts.SANS_SERIF}`, testStr);
        //start
        this.lastResortWidths_[LastResortFonts.SERIF] = lastResortRulerA.getWidth();
        this.lastResortWidths_[LastResortFonts.SANS_SERIF] = lastResortRulerB.getWidth();
        lastResortRulerA.remove();
        lastResortRulerB.remove();
        this.started_ = Date.now();
        this.check_();
    }
    then(activeCallback, inactiveCallback) {
        if (this.status) {
            if (this.status !== 'ng') {
                activeCallback();
            }
            else {
                inactiveCallback();
            }
        }
        else {
            this.activeCallbacks.push(activeCallback);
            this.inactiveCallbacks.push(inactiveCallback);
        }
    }
    check_() {
        const widthA = this.fontRulerA_.getWidth();
        const widthB = this.fontRulerB_.getWidth();
        if (this.isFallbackFont_(widthA, widthB) || this.isLastResortFont_(widthA, widthB)) {
            if (Date.now() - this.started_ >= 3000) {
                // timeout
                if (this.isLastResortFont_(widthA, widthB)) {
                    this.finish_(this.activeCallbacks);
                    this.status = 'ok';
                }
                else {
                    this.finish_(this.inactiveCallbacks);
                    this.status = 'ng';
                }
            }
            else {
                setTimeout(() => {
                    this.check_();
                }, 50);
            }
        }
        else {
            this.finish_(this.activeCallbacks);
            this.status = 'ok';
        }
    }
    isFallbackFont_(a, b) {
        return this.widthMatches_(a, LastResortFonts.SERIF) && this.widthMatches_(b, LastResortFonts.SANS_SERIF);
    }
    widthsMatchLastResortWidths_(a, b) {
        for (const font in LastResortFonts) {
            if (LastResortFonts.hasOwnProperty(font)) {
                if (this.widthMatches_(a, LastResortFonts[font]) && this.widthMatches_(b, LastResortFonts[font])) {
                    return true;
                }
            }
        }
        return false;
    }
    widthMatches_(width, lastResortFont) {
        return width === this.lastResortWidths_[lastResortFont];
    }
    isLastResortFont_(a, b) {
        return hasWebKitFallbackBug() && this.widthsMatchLastResortWidths_(a, b);
    }
    finish_(callbacks) {
        setTimeout(() => {
            this.fontRulerA_.remove();
            this.fontRulerB_.remove();
            callbacks.forEach((cb) => cb());
        }, 0);
    }
}
let HAS_WEBKIT_FALLBACK_BUG = null;
function hasWebKitFallbackBug() {
    if (HAS_WEBKIT_FALLBACK_BUG === null) {
        const match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
        HAS_WEBKIT_FALLBACK_BUG = !!match && (parseInt(match[1], 10) < 536 || (parseInt(match[1], 10) === 536 && parseInt(match[2], 10) <= 11));
    }
    return HAS_WEBKIT_FALLBACK_BUG;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FontWatchRunner);


/***/ }),

/***/ "./src/internal/menu-items.ts":
/*!************************************!*\
  !*** ./src/internal/menu-items.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "normalizeToFn": () => (/* binding */ normalizeToFn)
/* harmony export */ });
function extend(a, b) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o = {};
    for (const k in a) {
        o[k] = a[k];
    }
    for (const k in b) {
        o[k] = b[k];
    }
    return o;
}
/**
 * Normalize the given menu options.
 * @param {*} options menu options to given
 * @returns {Array} Normalized options
 * @private
 */
function normalize(options) {
    if (!options) {
        return [];
    }
    if (Array.isArray(options)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return options.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e) => extend(e, { label: e.caption || e.label }));
    }
    if (typeof options === 'string') {
        return normalize(JSON.parse(options));
    }
    const result = [];
    for (const k in options) {
        result.push({
            value: k,
            label: options[k]
        });
    }
    return result;
}
/**
 * Normalize the given menu options.
 * @param {*} options menu options to given
 * @returns {Array} Normalized options
 * @private
 */
function normalizeToFn(options) {
    if (typeof options === 'function') {
        return (record) => normalize(options(record));
    }
    return () => normalize(options);
}


/***/ }),

/***/ "./src/internal/paste-utils.ts":
/*!*************************************!*\
  !*** ./src/internal/paste-utils.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parsePasteRangeBoxValues": () => (/* binding */ parsePasteRangeBoxValues)
/* harmony export */ });
function parsePasteRangeBoxValues(value) {
    const normalizeValue = value.replace(/\r?\n$/, '');
    const lines = normalizeValue.split(/(?:\r?\n)|[\u2028\u2029]/g);
    const values = lines.map((line) => line.split(/\t/g));
    const colCount = values.reduce((n, cells) => Math.max(n, cells.length), 0);
    return {
        colCount,
        rowCount: values.length,
        getCellValue(offsetCol, offsetRow) {
            return values[offsetRow]?.[offsetCol] || '';
        }
    };
}


/***/ }),

/***/ "./src/internal/path2DManager.ts":
/*!***************************************!*\
  !*** ./src/internal/path2DManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPath2D": () => (/* binding */ getPath2D),
/* harmony export */   "fill": () => (/* binding */ fill)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");

function getPath2D() {
    if (typeof Path2D !== 'undefined' && !_utils__WEBPACK_IMPORTED_MODULE_0__.browser.Edge) {
        return Path2D;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return __webpack_require__(/*! ./legacy/canvas/Path2DShim */ "./src/internal/legacy/canvas/Path2DShim.ts").Path2DShim;
}
function fill(pathModule, ctx, x, y, w, h) {
    ctx.save();
    try {
        const { width, height } = pathModule;
        const { ud: upsideDown, x: offsetX = 0, y: offsetY = 0 } = pathModule;
        w = w || width;
        h = h || height;
        const xrate = w / width;
        const yrate = h / (upsideDown ? -height : height);
        x = x || 0;
        y = upsideDown ? (y || 0) + -height * yrate : y || 0;
        ctx.translate(x, y);
        ctx.scale(xrate, yrate);
        if (offsetX !== 0 || offsetY !== 0) {
            ctx.translate(offsetX, offsetY);
        }
        const Path2D = getPath2D();
        const path2d = (pathModule.path2d = pathModule.path2d || new Path2D(pathModule.d));
        ctx.fill(path2d);
    }
    finally {
        ctx.restore();
    }
}


/***/ }),

/***/ "./src/internal/sort.ts":
/*!******************************!*\
  !*** ./src/internal/sort.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortArray": () => (/* binding */ sortArray),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortPromise": () => (/* binding */ sortPromise)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/internal/utils.ts");

function createArray(get, length) {
    const array = new Array(length);
    for (let i = 0; i < length; i++) {
        array[i] = get(i);
    }
    return array;
}
function createArrayPromise(get, getField, length
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    return new Promise((resolve) => {
        const plist = [];
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
            const data = get(i);
            const record = {
                v: data,
                f: data
            };
            array[i] = record;
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(data)) {
                plist.push(data.then((v) => {
                    record.v = v;
                    record.f = v;
                }));
            }
        }
        Promise.all(plist).then(() => getField == null
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                array
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setArrayField(array, getField)).then(resolve);
    });
}
function setArrayField(array, getField) {
    return new Promise((resolve) => {
        const { length } = array;
        const plist = [];
        for (let i = 0; i < length; i++) {
            const record = array[i];
            const f = getField(record.v);
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPromise)(f)) {
                plist.push(f.then((v) => {
                    record.f = v;
                }));
            }
            else {
                record.f = f;
            }
        }
        Promise.all(plist).then(() => resolve(array));
    });
}
function sortArray(array, compare) {
    Array.prototype.sort.call(array, compare);
}
function sort(get, set, length, compare, getField) {
    const old = createArray(get, length);
    if (getField != null) {
        old.sort((r1, r2) => compare(getField(r1), getField(r2)));
    }
    else {
        old.sort(compare);
    }
    for (let i = 0; i < length; i++) {
        set(i, old[i]);
    }
}
function sortPromise(get, set, length, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
compare, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
getField) {
    if (typeof Promise !== 'undefined') {
        return createArrayPromise(get, getField, length).then((array) => {
            array.sort((r1, r2) => compare(r1.f, r2.f));
            for (let i = 0; i < length; i++) {
                set(i, array[i].v);
            }
        });
    }
    else {
        sort(get, set, length, compare, getField);
        const dummyPromise = {
            then(fn) {
                fn();
                return dummyPromise;
            },
            catch() {
                return dummyPromise;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
        return dummyPromise;
    }
}


/***/ }),

/***/ "./src/internal/style.ts":
/*!*******************************!*\
  !*** ./src/internal/style.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initDocument": () => (/* binding */ initDocument),
/* harmony export */   "getScrollBarSize": () => (/* binding */ getScrollBarSize)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/internal/style.css");
/**
 * 计算滚动条宽度
 * @return {number}
 */
function getScrollBarWidth() {
    const dummy = document.createElement('div');
    const { style } = dummy;
    style.position = 'absolute';
    style.height = '9999px';
    style.width = 'calc(100vw - 100%)';
    style.opacity = '0';
    dummy.textContent = 'x';
    document.body.appendChild(dummy);
    const { width } = (document.defaultView || window).getComputedStyle(dummy, '');
    document.body.removeChild(dummy);
    return parseInt(width, 10);
}
let SCROLLBAR_SIZE;

/**
 * 滚动条相关初始化
 */
function initDocumentInternal() {
    SCROLLBAR_SIZE = getScrollBarWidth() || 10;
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-name', 'data-grid');
    style.setAttribute('id', 'data-grid');
    style.innerHTML = `
.data-grid .grid-scrollable {
	overflow: scroll;
}
.data-grid .grid-scroll-end-point {
	width: ${SCROLLBAR_SIZE}px;
	height: ${SCROLLBAR_SIZE}px;
}
.data-grid > canvas {
    width: -webkit-calc(100% - ${SCROLLBAR_SIZE}px);
    width: calc(100% - ${SCROLLBAR_SIZE}px);
    height: -webkit-calc(100% - ${SCROLLBAR_SIZE}px);
    height: calc(100% - ${SCROLLBAR_SIZE}px);
}
`;
    document.head.appendChild(style);
}
let initDocumentVar = initDocumentInternal;
function initDocument() {
    initDocumentVar();
    initDocumentVar = Function.prototype;
}
function getScrollBarSize() {
    return SCROLLBAR_SIZE;
}


/***/ }),

/***/ "./src/internal/symbolManager.ts":
/*!***************************************!*\
  !*** ./src/internal/symbolManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getThemeSymbol": () => (/* binding */ getThemeSymbol),
/* harmony export */   "getDrawGridSymbol": () => (/* binding */ getDrawGridSymbol),
/* harmony export */   "getProtectedSymbol": () => (/* binding */ getProtectedSymbol),
/* harmony export */   "getCheckColumnStateId": () => (/* binding */ getCheckColumnStateId),
/* harmony export */   "getRadioColumnStateId": () => (/* binding */ getRadioColumnStateId),
/* harmony export */   "getButtonColumnStateId": () => (/* binding */ getButtonColumnStateId),
/* harmony export */   "getColumnFadeinStateId": () => (/* binding */ getColumnFadeinStateId),
/* harmony export */   "getBranchGraphColumnStateId": () => (/* binding */ getBranchGraphColumnStateId),
/* harmony export */   "getSmallDialogInputEditorStateId": () => (/* binding */ getSmallDialogInputEditorStateId),
/* harmony export */   "getInlineInputEditorStateId": () => (/* binding */ getInlineInputEditorStateId),
/* harmony export */   "getInlineMenuEditorStateId": () => (/* binding */ getInlineMenuEditorStateId),
/* harmony export */   "getCheckHeaderStateId": () => (/* binding */ getCheckHeaderStateId),
/* harmony export */   "getEventTargetSymbol": () => (/* binding */ getEventTargetSymbol)
/* harmony export */ });
function get(name = '') {
    return Symbol.for(name);
}
function getThemeSymbol() {
    return get('protected.theme');
}
function getDrawGridSymbol() {
    return get('protected.draw_grid');
}
function getProtectedSymbol() {
    return get('protected.list_grid');
}
function getCheckColumnStateId() {
    return get('chkcol.stateID');
}
function getRadioColumnStateId() {
    return get('rdcol.stateID');
}
function getButtonColumnStateId() {
    return get('btncol.stateID');
}
function getColumnFadeinStateId() {
    return get('col.fadein_stateID');
}
function getBranchGraphColumnStateId() {
    return get('branch_graph_col.stateID');
}
function getSmallDialogInputEditorStateId() {
    return get('small_dialog_input_editor.stateID');
}
function getInlineInputEditorStateId() {
    return get('inline_input_editor.stateID');
}
function getInlineMenuEditorStateId() {
    return get('inline_menu_editor.stateID');
}
function getCheckHeaderStateId() {
    return get('check_header.stateID');
}
function getEventTargetSymbol() {
    return get('protected.event_target');
}


/***/ }),

/***/ "./src/internal/utils.ts":
/*!*******************************!*\
  !*** ./src/internal/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "omit": () => (/* binding */ omit),
/* harmony export */   "defaults": () => (/* binding */ defaults),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "isDef": () => (/* binding */ isDef),
/* harmony export */   "isDefString": () => (/* binding */ isDefString),
/* harmony export */   "isNode": () => (/* binding */ isNode),
/* harmony export */   "isDescendantElement": () => (/* binding */ isDescendantElement),
/* harmony export */   "getChainSafe": () => (/* binding */ getChainSafe),
/* harmony export */   "applyChainSafe": () => (/* binding */ applyChainSafe),
/* harmony export */   "getOrApply": () => (/* binding */ getOrApply),
/* harmony export */   "getIgnoreCase": () => (/* binding */ getIgnoreCase),
/* harmony export */   "then": () => (/* binding */ then),
/* harmony export */   "array": () => (/* binding */ array),
/* harmony export */   "cellEquals": () => (/* binding */ cellEquals),
/* harmony export */   "cellInRange": () => (/* binding */ cellInRange),
/* harmony export */   "browser": () => (/* binding */ browser),
/* harmony export */   "obj": () => (/* binding */ obj),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "event": () => (/* binding */ event),
/* harmony export */   "style": () => (/* binding */ style),
/* harmony export */   "emptyFn": () => (/* binding */ emptyFn)
/* harmony export */ });
const isNode = typeof window === 'undefined' || typeof window.window === 'undefined';
let arrayFind;
let arrayFindIndex;
const array = {
    get find() {
        if (arrayFind) {
            return arrayFind;
        }
        if (Array.prototype.find) {
            arrayFind = (arr, predicate) => Array.prototype.find.call(arr, predicate);
        }
        else {
            arrayFind = (arr, predicate) => {
                const index = array.findIndex(arr, predicate);
                return index >= 0 ? arr[index] : undefined;
            };
        }
        return arrayFind;
    },
    get findIndex() {
        if (arrayFindIndex) {
            return arrayFindIndex;
        }
        if (Array.prototype.findIndex) {
            arrayFindIndex = (arr, predicate) => Array.prototype.findIndex.call(arr, predicate);
        }
        else {
            arrayFindIndex = (arr, predicate) => {
                const { length } = arr;
                for (let i = 0; i < length; i++) {
                    const value = arr[i];
                    if (predicate(value, i, arr)) {
                        return i;
                    }
                }
                return -1;
            };
        }
        return arrayFindIndex;
    }
};
function analyzeUserAgent() {
    if (isNode) {
        return {
            IE: false,
            Edge: false,
            Chrome: false,
            Firefox: false,
            Safari: false
        };
    }
    else {
        const ua = window.navigator.userAgent.toLowerCase();
        return {
            IE: !!/(msie|trident)/.exec(ua),
            Edge: ua.indexOf('edge') > -1,
            Chrome: ua.indexOf('chrome') > -1 && ua.indexOf('edge') === -1,
            Firefox: ua.indexOf('firefox') > -1,
            Safari: ua.indexOf('safari') > -1 && ua.indexOf('edge') === -1
        };
    }
}
const isDef = (data) => {
    return data !== null && typeof data !== 'undefined';
};
const isDefString = (data) => {
    return isDef(data) && (typeof data !== 'string' || data !== '');
};
const { IE, Chrome, Firefox, Edge, Safari } = analyzeUserAgent();
function setReadonly(obj, name, value) {
    Object.defineProperty(obj, name, {
        enumerable: false,
        configurable: true,
        value
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function each(obj, fn) {
    for (const key in obj) {
        fn(obj[key], key, obj);
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(obj) {
    return obj === Object(obj);
}
function omit(source, omits) {
    const result = {};
    for (const key in source) {
        if (omits.indexOf(key) >= 0) {
            continue;
        }
        Object.defineProperty(result, key, {
            get() {
                return source[key];
            },
            set(val) {
                source[key] = val;
            },
            configurable: true,
            enumerable: true
        });
    }
    return result;
}
function defaults(source, defs) {
    const keys = [];
    const result = {};
    for (const key in source) {
        keys.push(key);
        Object.defineProperty(result, key, {
            get() {
                const val = source[key];
                return val === undefined ? defs[key] : val;
            },
            set(val) {
                source[key] = val;
            },
            configurable: true,
            enumerable: true
        });
    }
    for (const key in defs) {
        if (keys.indexOf(key) >= 0) {
            continue;
        }
        Object.defineProperty(result, key, {
            get() {
                const val = source[key];
                return val === undefined ? defs[key] : val;
            },
            set(val) {
                source[key] = val;
            },
            configurable: true,
            enumerable: true
        });
    }
    return result;
}
function extend(...args) {
    const result = {};
    args.forEach((source) => {
        for (const key in source) {
            Object.defineProperty(result, key, {
                get() {
                    return source[key];
                },
                set(val) {
                    source[key] = val;
                },
                configurable: true,
                enumerable: true
            });
        }
    });
    return result;
}
function isDescendantElement(root, target) {
    while (target.parentElement) {
        const p = target.parentElement;
        if (root === p) {
            return true;
        }
        target = p;
    }
    return false;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
function applyChainSafe(obj, fn, ...names) {
    let value = obj;
    for (let i = 0; i < names.length && value != null; i++) {
        value = fn(value, names[i]);
    }
    return value;
}
function getChainSafe(obj, ...names) {
    return applyChainSafe(obj, (val, name) => val[name], ...names);
}
function getOrApply(value, ...args) {
    if (typeof value === 'function') {
        return value(...args);
    }
    else {
        return value;
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
function endsWith(str, searchString, position) {
    const subjectString = str.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    const lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
function genChars(s) {
    // Surrogate Code Point
    // [\uD800-\uDBFF]
    // Variation Selectors
    // FVS [\u180B-\u180D]
    // VS1～VS16 [\uFE00-\uFE0F]
    // VS17～VS256 \uDB40[\uDD00-\uDDEF]
    const re = /([\uD800-\uDBFF][\uDC00-\uDFFF]|\r\n|[^\uD800-\uDFFF])([\u180B-\u180D]|[\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])?/g;
    return {
        next() {
            const res = re.exec(s);
            return res !== null ? res[0] : null;
        }
    };
}
function genWords(s) {
    const re = /[!-~]+|[^!-~\s]+|\s+/g;
    return {
        next() {
            const res = re.exec(s);
            return res !== null ? res[0] : null;
        }
    };
}
function isPromise(data) {
    return Boolean(data && typeof data.then === 'function');
}
function then(result, callback) {
    return isPromise(result) ? result.then((r) => callback(r)) : callback(result);
}
function getMouseButtons(e) {
    if (e.buttons != null) {
        return e.buttons;
    }
    /*for legacy*/
    if (e.which != null) {
        if (e.which === 3) {
            //right?
            return 4;
        }
        if (e.which === 2) {
            //middle?
            return 4;
        }
        return e.which; //left or no
    }
    if (e.button === 0 || e.button === 1) {
        return 1; //candidate left
    }
    if (e.button === 2) {
        return 2; // right
    }
    return 0; //no or middle?
}
function getKeyCode(e) {
    return e.keyCode || e.which;
}
function isTouchEvent(e) {
    return !!e.changedTouches;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIgnoreCase(obj, name) {
    if (obj[name]) {
        return obj[name];
    }
    const l = name.toLowerCase();
    if (obj[l]) {
        return obj[l];
    }
    const u = name.toLowerCase();
    if (obj[u]) {
        return obj[u];
    }
    for (const k in obj) {
        if (k.toLowerCase() === l) {
            return obj[k];
        }
    }
    return undefined;
}
function cancel(e) {
    e.preventDefault();
    e.stopPropagation();
}
function toBoxArray(obj) {
    if (!Array.isArray(obj)) {
        return [obj /*top*/, obj /*right*/, obj /*bottom*/, obj];
    }
    if (obj.length === 3) {
        return [obj[0] /*top*/, obj[1] /*right*/, obj[2] /*bottom*/, obj[1]];
    }
    if (obj.length === 2) {
        return [obj[0] /*top*/, obj[1] /*right*/, obj[0] /*bottom*/, obj[1]];
    }
    if (obj.length === 1) {
        return [obj[0] /*top*/, obj[0] /*right*/, obj[0] /*bottom*/, obj[0]];
    }
    return obj;
}

function cellEquals(a, b) {
    return a.col === b.col && a.row === b.row;
}
function cellInRange(range, col, row) {
    return range.start.col <= col && col <= range.end.col && range.start.row <= row && row <= range.end.row;
}
const browser = {
    IE,
    Edge,
    Chrome,
    Firefox,
    Safari,
    // Chrome 33554431
    // FireFox 17895588
    // IE 10737433
    heightLimit: Chrome ? 33554431 : Firefox ? 17895588 : 10737433 // default IE limit
};
const obj = {
    setReadonly,
    isObject
};
const str = {
    endsWith,
    genChars,
    genWords
};
const event = {
    getMouseButtons,
    getKeyCode,
    isTouchEvent,
    cancel
};
const style = {
    toBoxArray
};
const emptyFn = Function.prototype;


/***/ }),

/***/ "./src/list-grid/LG_EVENT_TYPE.ts":
/*!****************************************!*\
  !*** ./src/list-grid/LG_EVENT_TYPE.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LG_EVENT_TYPE": () => (/* binding */ LG_EVENT_TYPE)
/* harmony export */ });
/* harmony import */ var _core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/DG_EVENT_TYPE */ "./src/core/DG_EVENT_TYPE.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");


const LG_EVENT_TYPE = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_1__.extend)(_core_DG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.DG_EVENT_TYPE, {
    CHANGED_VALUE: 'changed_value',
    CHANGED_HEADER_VALUE: 'changed_header_value'
});


/***/ }),

/***/ "./src/list-grid/layout-map/api.ts":
/*!*****************************************!*\
  !*** ./src/list-grid/layout-map/api.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/list-grid/layout-map/index.ts":
/*!*******************************************!*\
  !*** ./src/list-grid/layout-map/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleHeaderLayoutMap": () => (/* reexport safe */ _internal_simple_header_layout__WEBPACK_IMPORTED_MODULE_1__.SimpleHeaderLayoutMap),
/* harmony export */   "MultiLayoutMap": () => (/* reexport safe */ _internal_multi_layout__WEBPACK_IMPORTED_MODULE_2__.MultiLayoutMap)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/list-grid/layout-map/api.ts");
/* harmony import */ var _internal_simple_header_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/simple-header-layout */ "./src/list-grid/layout-map/internal/simple-header-layout.ts");
/* harmony import */ var _internal_multi_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/multi-layout */ "./src/list-grid/layout-map/internal/multi-layout.ts");





/***/ }),

/***/ "./src/list-grid/layout-map/internal/multi-layout.ts":
/*!***********************************************************!*\
  !*** ./src/list-grid/layout-map/internal/multi-layout.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiLayoutMap": () => (/* binding */ MultiLayoutMap)
/* harmony export */ });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../columns */ "./src/columns.ts");
/* harmony import */ var _header_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../header/action */ "./src/header/action.ts");
/* harmony import */ var _header_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../header/type */ "./src/header/type.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/list-grid/layout-map/internal/utils.ts");




function normalizeLayout(layout) {
    if (Array.isArray(layout)) {
        return {
            header: layout,
            body: layout
        };
    }
    return layout;
}
let seqId = 0;
class LayoutObjectGrid {
    objects = [];
    objectGrid = [];
    objectMap = {};
    columnCount = 0;
    columnWidths = [];
    constructor(layout, transform) {
        layout.forEach((rowLayout, row) => {
            let col = 0;
            rowLayout.forEach((cell) => {
                const id = seqId++;
                const obj = transform(cell, id);
                this.objects.push(obj);
                this.objectMap[id] = obj;
                col = this._findStartCell(col, row);
                const rowSpan = Number(cell.rowSpan ?? 1);
                const colSpan = Number(cell.colSpan ?? 1);
                const endRow = row + rowSpan;
                const endCol = col + colSpan;
                for (let rowIndex = row; rowIndex < endRow; rowIndex++) {
                    const objectGridRow = this._getObjectGridRow(rowIndex);
                    for (let colIndex = col; colIndex < endCol; colIndex++) {
                        objectGridRow[colIndex] = obj;
                    }
                }
                if (colSpan === 1) {
                    this._setWidthDataIfAbsent(col, cell);
                }
                this._useColumnIndex(endCol - 1);
                col = endCol;
            });
        });
    }
    get rowCount() {
        return this.objectGrid.length;
    }
    _findStartCell(col, row) {
        const objectGridRow = this._getObjectGridRow(row);
        for (let index = col; index < objectGridRow.length; index++) {
            if (!objectGridRow[index]) {
                return index;
            }
        }
        return objectGridRow.length;
    }
    _getObjectGridRow(row) {
        return this.objectGrid[row] || (this.objectGrid[row] = []);
    }
    _useColumnIndex(col) {
        if (this.columnCount > col) {
            return;
        }
        this.columnCount = col + 1;
    }
    _setWidthDataIfAbsent(col, cell) {
        if (!this.columnWidths[col]) {
            if (cell.width != null || cell.maxWidth != null || cell.minWidth != null) {
                this.columnWidths[col] = {
                    width: cell.width,
                    maxWidth: cell.maxWidth,
                    minWidth: cell.minWidth
                };
            }
        }
    }
}
class MultiLayoutMap {
    _header;
    _body;
    _columnWidths = [];
    _columnCount;
    _emptyDataCache = new _utils__WEBPACK_IMPORTED_MODULE_3__.EmptyDataCache();
    constructor(layout) {
        const hbLayouut = normalizeLayout(layout);
        const header = (this._header = new LayoutObjectGrid(hbLayouut.header, (hd, id) => ({
            id,
            caption: hd.caption,
            field: hd.headerField || hd.field,
            style: hd.headerStyle,
            headerType: _header_type__WEBPACK_IMPORTED_MODULE_2__.ofCell(hd),
            action: _header_action__WEBPACK_IMPORTED_MODULE_1__.ofCell(hd),
            define: hd
        })));
        const body = (this._body = new LayoutObjectGrid(hbLayouut.body, (colDef, id) => ({
            id,
            field: colDef.field,
            width: colDef.width,
            minWidth: colDef.minWidth,
            maxWidth: colDef.maxWidth,
            icon: colDef.icon,
            message: colDef.message,
            columnType: _columns__WEBPACK_IMPORTED_MODULE_0__.columns.type.of(colDef.columnType),
            action: _columns__WEBPACK_IMPORTED_MODULE_0__.columns.action.of(colDef.action),
            style: colDef.style,
            define: colDef
        })));
        const columnCount = (this._columnCount = Math.max(header.columnCount, body.columnCount));
        for (let col = 0; col < columnCount; col++) {
            const widthDef = header.columnWidths[col] || body.columnWidths[col] || {};
            this._columnWidths[col] = widthDef;
        }
    }
    get columnWidths() {
        return this._columnWidths;
    }
    get headerRowCount() {
        return this._header.rowCount;
    }
    get bodyRowCount() {
        return this._body.rowCount;
    }
    get colCount() {
        return this._columnCount;
    }
    get headerObjects() {
        return this._header.objects;
    }
    get columnObjects() {
        return this._body.objects;
    }
    getCellId(col, row) {
        if (this.headerRowCount <= row) {
            const bodyRow = row - this.headerRowCount;
            const bodyLayoutRow = bodyRow % this.bodyRowCount;
            return this._body.objectGrid[bodyLayoutRow]?.[col]?.id;
        }
        //in header
        return this._header.objectGrid[row]?.[col]?.id;
    }
    getHeader(col, row) {
        const id = this.getCellId(col, row);
        // @ts-ignore
        return this._header.objectMap[id] || this._emptyDataCache.getHeader(col, row);
    }
    getBody(col, row) {
        const id = this.getCellId(col, row);
        // return this._body.objectMap[id as number] || this._emptyDataCache.getBody(col, row)
        // @ts-ignore
        return (this._body.objectMap[id] ||
            this._emptyDataCache.getBody(col, row));
    }
    getBodyLayoutRangeById(id) {
        for (let row = 0; row < this.bodyRowCount; row++) {
            const objectGridRow = this._body.objectGrid[row];
            if (!objectGridRow) {
                continue;
            }
            for (let col = 0; col < this.colCount; col++) {
                if (id === objectGridRow[col]?.id) {
                    return this._getCellRange(this._body, col, row, 0);
                }
            }
        }
        throw new Error(`can not found body layout @id=${id}`);
    }
    getCellRange(col, row) {
        if (this.headerRowCount <= row) {
            const recordIndex = this.getRecordIndexByRow(row);
            const startRow = this.getRecordStartRowByRecordIndex(recordIndex);
            const bodyRow = row - this.headerRowCount;
            const bodyLayoutRow = bodyRow % this.bodyRowCount;
            return this._getCellRange(this._body, col, bodyLayoutRow, startRow);
        }
        //in header
        return this._getCellRange(this._header, col, row, 0);
    }
    getRecordIndexByRow(row) {
        if (row < this.headerRowCount) {
            return -1;
        }
        else {
            const bodyRow = row - this.headerRowCount;
            return Math.floor(bodyRow / this.bodyRowCount);
        }
    }
    getRecordStartRowByRecordIndex(index) {
        return this.headerRowCount + index * this.bodyRowCount;
    }
    _getCellRange(layout, col, layoutRow, offsetRow) {
        const result = {
            start: { col, row: layoutRow + offsetRow },
            end: { col, row: layoutRow + offsetRow }
        };
        const { objectGrid } = layout;
        const id = objectGrid[layoutRow]?.[col]?.id;
        if (id == null) {
            return result;
        }
        for (let c = col - 1; c >= 0; c--) {
            if (id !== objectGrid[layoutRow]?.[c]?.id) {
                break;
            }
            result.start.col = c;
        }
        for (let c = col + 1; c < layout.columnCount; c++) {
            if (id !== objectGrid[layoutRow]?.[c]?.id) {
                break;
            }
            result.end.col = c;
        }
        for (let r = layoutRow - 1; r >= 0; r--) {
            if (id !== objectGrid[r]?.[col]?.id) {
                break;
            }
            result.start.row = r + offsetRow;
        }
        for (let r = layoutRow + 1; r < layout.rowCount; r++) {
            if (id !== objectGrid[r]?.[col]?.id) {
                break;
            }
            result.end.row = r + offsetRow;
        }
        return result;
    }
}


/***/ }),

/***/ "./src/list-grid/layout-map/internal/simple-header-layout.ts":
/*!*******************************************************************!*\
  !*** ./src/list-grid/layout-map/internal/simple-header-layout.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleHeaderLayoutMap": () => (/* binding */ SimpleHeaderLayoutMap)
/* harmony export */ });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../columns */ "./src/columns.ts");
/* harmony import */ var _header_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../header/action */ "./src/header/action.ts");
/* harmony import */ var _header_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../header/type */ "./src/header/type.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/list-grid/layout-map/internal/utils.ts");




let seqId = 0;
class SimpleHeaderLayoutMap {
    _headerObjects;
    _headerObjectMap;
    _headerCellIds;
    _columns;
    bodyRowCount = 1;
    _emptyDataCache = new _utils__WEBPACK_IMPORTED_MODULE_3__.EmptyDataCache();
    constructor(header) {
        this._columns = [];
        this._headerCellIds = [];
        this._headerObjects = this._addHeaders(0, header, []);
        this._headerObjectMap = this._headerObjects.reduce((o, e) => {
            o[e.id] = e;
            return o;
        }, {});
    }
    get columnWidths() {
        return this._columns;
    }
    get headerRowCount() {
        return this._headerCellIds.length;
    }
    get colCount() {
        return this._columns.length;
    }
    get headerObjects() {
        return this._headerObjects;
    }
    get columnObjects() {
        return this._columns;
    }
    getCellId(col, row) {
        if (this.headerRowCount <= row) {
            return this._columns[col].id;
        }
        //in header
        return this._headerCellIds[row][col];
    }
    getHeader(col, row) {
        const id = this.getCellId(col, row);
        return (this._headerObjectMap[id] ||
            this._emptyDataCache.getHeader(col, row));
    }
    getBody(col, _row) {
        return this._columns[col] || this._emptyDataCache.getBody(col, 0);
    }
    getBodyLayoutRangeById(id) {
        for (let col = 0; col < this.colCount; col++) {
            if (id === this._columns[col].id) {
                return {
                    start: { col, row: 0 },
                    end: { col, row: 0 }
                };
            }
        }
        throw new Error(`can not found body layout @id=${id}`);
    }
    getCellRange(col, row) {
        const result = { start: { col, row }, end: { col, row } };
        if (this.headerRowCount <= row) {
            return result;
        }
        //in header
        const id = this.getCellId(col, row);
        for (let c = col - 1; c >= 0; c--) {
            if (id !== this.getCellId(c, row)) {
                break;
            }
            result.start.col = c;
        }
        for (let c = col + 1; c < this.colCount; c++) {
            if (id !== this.getCellId(c, row)) {
                break;
            }
            result.end.col = c;
        }
        for (let r = row - 1; r >= 0; r--) {
            if (id !== this.getCellId(col, r)) {
                break;
            }
            result.start.row = r;
        }
        for (let r = row + 1; r < this.headerRowCount; r++) {
            if (id !== this.getCellId(col, r)) {
                break;
            }
            result.end.row = r;
        }
        return result;
    }
    getRecordIndexByRow(row) {
        if (row < this.headerRowCount) {
            return -1;
        }
        else {
            return row - this.headerRowCount;
        }
    }
    getRecordStartRowByRecordIndex(index) {
        return this.headerRowCount + index;
    }
    _addHeaders(row, header, roots) {
        const results = [];
        const rowCells = this._headerCellIds[row] || this._newRow(row);
        header.forEach((hd) => {
            const col = this._columns.length;
            const id = seqId++;
            const cell = {
                id,
                caption: hd.caption,
                field: hd.headerField || hd.field,
                style: hd.headerStyle,
                headerType: _header_type__WEBPACK_IMPORTED_MODULE_2__.ofCell(hd),
                action: _header_action__WEBPACK_IMPORTED_MODULE_1__.ofCell(hd),
                define: hd
            };
            results[id] = cell;
            rowCells[col] = id;
            for (let r = row - 1; r >= 0; r--) {
                this._headerCellIds[r][col] = roots[r];
            }
            if (hd.columns) {
                this._addHeaders(row + 1, hd.columns, [
                    ...roots,
                    id
                ]).forEach((c) => results.push(c));
            }
            else {
                const colDef = hd;
                this._columns.push({
                    id: seqId++,
                    field: colDef.field,
                    width: colDef.width,
                    minWidth: colDef.minWidth,
                    maxWidth: colDef.maxWidth,
                    icon: colDef.icon,
                    message: colDef.message,
                    columnType: _columns__WEBPACK_IMPORTED_MODULE_0__.columns.type.of(colDef.columnType),
                    action: _columns__WEBPACK_IMPORTED_MODULE_0__.columns.action.of(colDef.action),
                    style: colDef.style,
                    define: colDef
                });
                for (let r = row + 1; r < this._headerCellIds.length; r++) {
                    this._headerCellIds[r][col] = id;
                }
            }
        });
        return results;
    }
    _newRow(row) {
        const newRow = (this._headerCellIds[row] = []);
        if (!this._columns.length) {
            return newRow;
        }
        const prev = this._headerCellIds[row - 1];
        for (let col = 0; col < prev.length; col++) {
            newRow[col] = prev[col];
        }
        return newRow;
    }
}


/***/ }),

/***/ "./src/list-grid/layout-map/internal/utils.ts":
/*!****************************************************!*\
  !*** ./src/list-grid/layout-map/internal/utils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newEmptyHeaderData": () => (/* binding */ newEmptyHeaderData),
/* harmony export */   "newEmptyColumnData": () => (/* binding */ newEmptyColumnData),
/* harmony export */   "EmptyDataCache": () => (/* binding */ EmptyDataCache)
/* harmony export */ });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../columns */ "./src/columns.ts");
/* harmony import */ var _header_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../header/type */ "./src/header/type.ts");


let seqId = -1;
function newEmptyHeaderData() {
    return {
        id: seqId--,
        define: {},
        headerType: _header_type__WEBPACK_IMPORTED_MODULE_1__.of(null) // default
    };
}
function newEmptyColumnData() {
    return {
        id: seqId--,
        define: {},
        columnType: _columns__WEBPACK_IMPORTED_MODULE_0__.columns.type.of(null),
        style: null
    };
}
class EmptyDataCache {
    headers = [];
    columns = [];
    getHeader(col, row) {
        const rows = this.headers[row] || (this.headers[row] = []);
        return rows[col] || (rows[col] = newEmptyHeaderData());
    }
    getBody(col, row) {
        const rows = this.columns[row] || (this.columns[row] = []);
        return rows[col] || (rows[col] = newEmptyColumnData());
    }
}


/***/ }),

/***/ "./src/plugins/icons.ts":
/*!******************************!*\
  !*** ./src/plugins/icons.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "icons": () => (/* binding */ icons)
/* harmony export */ });
const icons = {};


/***/ }),

/***/ "./src/plugins/themes.ts":
/*!*******************************!*\
  !*** ./src/plugins/themes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "themes": () => (/* binding */ themes)
/* harmony export */ });
const themes = {};


/***/ }),

/***/ "./src/register.ts":
/*!*************************!*\
  !*** ./src/register.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "theme": () => (/* binding */ theme),
/* harmony export */   "icon": () => (/* binding */ icon),
/* harmony export */   "icons": () => (/* binding */ icons),
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _plugins_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugins/icons */ "./src/plugins/icons.ts");
/* harmony import */ var _plugins_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/themes */ "./src/plugins/themes.ts");


function registerPlugin(obj, name, value) {
    const old = obj[name];
    obj[name] = value;
    return old;
}
function registerPlugins(obj, values) {
    for (const k in values) {
        obj[k] = values[k];
    }
}
function theme(name, theme) {
    if (theme != null) {
        return registerPlugin(_plugins_themes__WEBPACK_IMPORTED_MODULE_1__.themes, name, theme);
    }
    else {
        return _plugins_themes__WEBPACK_IMPORTED_MODULE_1__.themes[name];
    }
}
function icon(name, icon) {
    if (icon != null) {
        return registerPlugin(_plugins_icons__WEBPACK_IMPORTED_MODULE_0__.icons, name, icon);
    }
    else {
        return _plugins_icons__WEBPACK_IMPORTED_MODULE_0__.icons[name];
    }
}
function icons(icons) {
    return registerPlugins(_plugins_icons__WEBPACK_IMPORTED_MODULE_0__.icons, icons);
}
const register = {
    theme,
    icon,
    icons
};


/***/ }),

/***/ "./src/themes.ts":
/*!***********************!*\
  !*** ./src/themes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BASIC": () => (/* binding */ BASIC),
/* harmony export */   "MATERIAL_DESIGN": () => (/* binding */ MATERIAL_DESIGN),
/* harmony export */   "theme": () => (/* binding */ theme),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "getDefault": () => (/* binding */ getDefault),
/* harmony export */   "setDefault": () => (/* binding */ setDefault),
/* harmony export */   "getChoices": () => (/* binding */ getChoices),
/* harmony export */   "themes": () => (/* binding */ themes)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _themes_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes/theme */ "./src/themes/theme.ts");
/* harmony import */ var _themes_BASIC__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./themes/BASIC */ "./src/themes/BASIC.ts");
/* harmony import */ var _themes_MATERIAL_DESIGN__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themes/MATERIAL_DESIGN */ "./src/themes/MATERIAL_DESIGN.ts");
/* harmony import */ var _plugins_themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plugins/themes */ "./src/plugins/themes.ts");





const BASIC = new _themes_theme__WEBPACK_IMPORTED_MODULE_1__.Theme(_themes_BASIC__WEBPACK_IMPORTED_MODULE_2__["default"]);
const MATERIAL_DESIGN = new _themes_theme__WEBPACK_IMPORTED_MODULE_1__.Theme(_themes_MATERIAL_DESIGN__WEBPACK_IMPORTED_MODULE_3__["default"]);
const builtin = {
    BASIC,
    MATERIAL_DESIGN
};
let defTheme = MATERIAL_DESIGN;
const theme = { Theme: _themes_theme__WEBPACK_IMPORTED_MODULE_1__.Theme };
function of(value) {
    if (!value) {
        return null;
    }
    if (typeof value === 'string') {
        const t = (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getIgnoreCase)(getChoices(), value);
        if (t) {
            return t;
        }
        return null;
    }
    if (value instanceof _themes_theme__WEBPACK_IMPORTED_MODULE_1__.Theme) {
        return value;
    }
    return new _themes_theme__WEBPACK_IMPORTED_MODULE_1__.Theme(value);
}
function getDefault() {
    return defTheme;
}
function setDefault(defaultTheme) {
    defTheme = of(defaultTheme) || defTheme;
}
function getChoices() {
    return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.extend)(builtin, _plugins_themes__WEBPACK_IMPORTED_MODULE_4__.themes);
}
const themes = {
    BASIC,
    MATERIAL_DESIGN,
    theme,
    of,
    getDefault,
    getChoices
};


/***/ }),

/***/ "./src/themes/BASIC.ts":
/*!*****************************!*\
  !*** ./src/themes/BASIC.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*eslint no-bitwise:0*/
function DEFAULT_BG_COLOR(args) {
    const { row, grid } = args;
    if (row < grid.frozenRowCount) {
        return '#FFF';
    }
    const index = grid.getRecordIndexByRow(row);
    if (!(index & 1)) {
        return '#FFF';
    }
    else {
        return '#F6F6F6';
    }
}
const cacheLinearGradient = {};
function getLinearGradient(context, left, top, right, bottom, colorStops) {
    let stop;
    const stopsKey = [];
    for (stop in colorStops) {
        stopsKey.push(`${stop}@${colorStops[stop]}`);
    }
    const key = `${left}/${top}/${right}/${bottom}/${stopsKey.join(',')}`;
    const ret = cacheLinearGradient[key];
    if (ret) {
        return ret;
    }
    const grad = context.createLinearGradient(left, top, left, bottom);
    for (stop in colorStops) {
        grad.addColorStop(Number(stop), colorStops[stop]);
    }
    return (cacheLinearGradient[key] = grad);
}
function FROZEN_ROWS_BG_COLOR(args) {
    const { col, grid, grid: { frozenRowCount }, context } = args;
    const { left, top } = grid.getCellRelativeRect(col, 0);
    const { bottom } = grid.getCellRelativeRect(col, frozenRowCount - 1);
    return getLinearGradient(context, left, top, left, bottom, {
        0: '#FFF',
        1: '#D3D3D3'
    });
}
/**
 * basic theme
 * @name BASIC
 * @memberof cheetahGrid.themes.choices
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    color: '#000',
    // frozenRowsColor: '#000',
    defaultBgColor: DEFAULT_BG_COLOR,
    frozenRowsBgColor: FROZEN_ROWS_BG_COLOR,
    selectionBgColor: '#CCE0FF',
    borderColor: '#000',
    // frozenRowsBorderColor: '#000',
    highlightBorderColor: '#5E9ED6',
    checkbox: {
        uncheckBgColor: '#FFF',
        checkBgColor: 'rgb(76, 73, 72)',
        borderColor: '#000'
    },
    radioButton: {
        checkColor: 'rgb(76, 73, 72)',
        checkBorderColor: '#000',
        uncheckBorderColor: '#000',
        uncheckBgColor: '#FFF',
        checkBgColor: '#FFF'
    },
    button: {
        color: '#FFF',
        bgColor: '#2196F3'
    },
    header: {
        sortArrowColor: 'rgba(0, 0, 0, 0.38)'
    },
    underlayBackgroundColor: '#F6F6F6'
});


/***/ }),

/***/ "./src/themes/MATERIAL_DESIGN.ts":
/*!***************************************!*\
  !*** ./src/themes/MATERIAL_DESIGN.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function FROZEN_ROWS_BORDER_COLOR(args) {
    const { row, grid: { frozenRowCount } } = args;
    if (frozenRowCount - 1 === row) {
        return ['#f2f2f2', '#f2f2f2', '#ccc7c7', '#f2f2f2'];
    }
    else {
        return ['#f2f2f2'];
    }
}
function BORDER_COLOR(args) {
    const { col, row, grid } = args;
    const { colCount, frozenColCount, recordRowCount } = grid;
    let top = '#ccc7c7';
    let bottom = '#ccc7c7';
    if (recordRowCount > 1) {
        const startRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(row));
        const endRow = startRow + recordRowCount - 1;
        if (startRow !== row) {
            top = null;
        }
        if (endRow !== row) {
            bottom = null;
        }
    }
    if (frozenColCount - 1 === col) {
        return [top, '#f2f2f2', bottom, null];
    }
    if (colCount - 1 === col) {
        return [top, '#f2f2f2', bottom, null];
    }
    return [top, null, bottom, null];
}
/**
 * material design theme
 * @name MATERIAL_DESIGN
 * @memberof cheetahGrid.themes.choices
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    color: 'rgba(0, 0, 0, 0.87)',
    frozenRowsColor: 'rgba(0, 0, 0, 0.54)',
    defaultBgColor: '#FFF',
    // frozenRowsBgColor: '#FFF',
    selectionBgColor: '#CCE0FF',
    borderColor: BORDER_COLOR,
    frozenRowsBorderColor: FROZEN_ROWS_BORDER_COLOR,
    highlightBorderColor: '#5E9ED6',
    checkbox: {
        // uncheckBgColor: '#FFF',
        checkBgColor: 'rgb(76, 73, 72)',
        borderColor: 'rgba(0, 0, 0, 0.26)'
    },
    radioButton: {
        checkColor: 'rgb(76, 73, 72)',
        checkBorderColor: 'rgb(76, 73, 72)',
        uncheckBorderColor: 'rgb(189, 189, 189)'
        // uncheckBgColor: "#FFF",
        // checkBgColor: "#FFF",
    },
    button: {
        color: '#FFF',
        bgColor: '#2196F3'
    },
    header: {
        sortArrowColor: 'rgba(0, 0, 0, 0.38)'
    },
    underlayBackgroundColor: '#FFF'
});


/***/ }),

/***/ "./src/themes/theme.ts":
/*!*****************************!*\
  !*** ./src/themes/theme.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Theme": () => (/* binding */ Theme)
/* harmony export */ });
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");
/* harmony import */ var _internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/symbolManager */ "./src/internal/symbolManager.ts");


//private symbol
const _ = (0,_internal_symbolManager__WEBPACK_IMPORTED_MODULE_1__.getThemeSymbol)();
function getProp(obj, superObj, names, defNames) {
    return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getChainSafe)(obj, ...names) || (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getChainSafe)(superObj, ...names) || (defNames && (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getChainSafe)(obj, ...defNames)) || (defNames && (0,_internal_utils__WEBPACK_IMPORTED_MODULE_0__.getChainSafe)(superObj, ...defNames));
}
class Theme {
    [_];
    _checkbox = null;
    _radioButton = null;
    _button = null;
    _header = null;
    _messages = null;
    constructor(obj, superTheme) {
        this[_] = {
            obj,
            superTheme: superTheme
        };
    }
    get font() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['font']);
    }
    get underlayBackgroundColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['underlayBackgroundColor']);
    }
    // color
    get color() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['color']);
    }
    get frozenRowsColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['frozenRowsColor'], ['color']);
    }
    // background
    get defaultBgColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['defaultBgColor']);
    }
    get frozenRowsBgColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['frozenRowsBgColor'], ['defaultBgColor']);
    }
    get selectionBgColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['selectionBgColor'], ['defaultBgColor']);
    }
    get highlightBgColor() {
        if (this.hasProperty(['highlightBgColor'])) {
            const { obj, superTheme } = this[_];
            return getProp(obj, superTheme, ['highlightBgColor']);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (args) => {
            const color = args.row < args.grid.frozenRowCount ? this.frozenRowsBgColor : this.defaultBgColor;
            if (typeof color === 'function') {
                return color(args);
            }
            return color;
        };
    }
    // border
    get borderColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['borderColor']);
    }
    get frozenRowsBorderColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['frozenRowsBorderColor'], ['borderColor']);
    }
    get highlightBorderColor() {
        const { obj, superTheme } = this[_];
        return getProp(obj, superTheme, ['highlightBorderColor'], ['borderColor']);
    }
    get checkbox() {
        const { obj, superTheme } = this[_];
        return (this._checkbox ||
            (this._checkbox = {
                get uncheckBgColor() {
                    return getProp(obj, superTheme, ['checkbox', 'uncheckBgColor'], ['defaultBgColor']);
                },
                get checkBgColor() {
                    return getProp(obj, superTheme, ['checkbox', 'checkBgColor'], ['borderColor']);
                },
                get borderColor() {
                    return getProp(obj, superTheme, ['checkbox', 'borderColor'], ['borderColor']);
                }
            }));
    }
    get radioButton() {
        const { obj, superTheme } = this[_];
        return (this._radioButton ||
            (this._radioButton = {
                get checkColor() {
                    return getProp(obj, superTheme, ['radioButton', 'checkColor'], ['color']);
                },
                get uncheckBorderColor() {
                    return getProp(obj, superTheme, ['radioButton', 'uncheckBorderColor'], ['borderColor']);
                },
                get checkBorderColor() {
                    return getProp(obj, superTheme, ['radioButton', 'checkBorderColor'], ['borderColor']);
                },
                get uncheckBgColor() {
                    return getProp(obj, superTheme, ['radioButton', 'uncheckBgColor'], ['defaultBgColor']);
                },
                get checkBgColor() {
                    return getProp(obj, superTheme, ['radioButton', 'checkBgColor'], ['defaultBgColor']);
                }
            }));
    }
    get button() {
        const { obj, superTheme } = this[_];
        return (this._button ||
            (this._button = {
                get color() {
                    return getProp(obj, superTheme, ['button', 'color'], ['color']);
                },
                get bgColor() {
                    return getProp(obj, superTheme, ['button', 'bgColor'], ['defaultBgColor']);
                }
            }));
    }
    get header() {
        const { obj, superTheme } = this[_];
        return (this._header ||
            (this._header = {
                get sortArrowColor() {
                    return getProp(obj, superTheme, ['header', 'sortArrowColor'], ['color']);
                }
            }));
    }
    get messages() {
        const { obj, superTheme } = this[_];
        return (this._messages ||
            (this._messages = {
                get infoBgColor() {
                    return getProp(obj, superTheme, ['messages', 'infoBgColor']);
                },
                get errorBgColor() {
                    return getProp(obj, superTheme, ['messages', 'errorBgColor']);
                },
                get warnBgColor() {
                    return getProp(obj, superTheme, ['messages', 'warnBgColor']);
                }
            }));
    }
    hasProperty(names) {
        const { obj, superTheme } = this[_];
        return hasThemeProperty(obj, names) || hasThemeProperty(superTheme, names);
    }
    extends(obj) {
        return new Theme(obj, this);
    }
}
function hasThemeProperty(obj, names) {
    if (obj instanceof Theme) {
        return obj.hasProperty(names);
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let o = obj;
        if (!o) {
            return false;
        }
        for (let index = 0; index < names.length; index++) {
            const name = names[index];
            o = o[name];
            if (!o) {
                return false;
            }
        }
        return !!o;
    }
}


/***/ }),

/***/ "./src/tools.ts":
/*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tools": () => (/* binding */ tools)
/* harmony export */ });
/* harmony import */ var _tools_canvashelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/canvashelper */ "./src/tools/canvashelper.ts");

/**
 * tools
 // * @namespace cheetahGrid.tools
 // * @memberof cheetahGrid
 */
// export { canvashelper };
/**
 * tools
 */
const tools = { canvasHelper: _tools_canvashelper__WEBPACK_IMPORTED_MODULE_0__.canvasHelper };


/***/ }),

/***/ "./src/tools/Svg.ts":
/*!**************************!*\
  !*** ./src/tools/Svg.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const parser = new DOMParser();
const ELEMENT_NODE = 1;
function findElement(el, test) {
    for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        if (child.nodeType !== ELEMENT_NODE) {
            continue;
        }
        if (test(child)) {
            return child;
        }
        const r = findElement(child, test);
        if (r) {
            return r;
        }
    }
    return null;
}
class Svg {
    _svg;
    _glyphs;
    _glyphUnis;
    _fontFace;
    _font;
    constructor(svgCode) {
        const document = parser.parseFromString(svgCode, 'image/svg+xml');
        this._svg = document.documentElement;
        this._glyphs = {};
        this._glyphUnis = {};
    }
    get svg() {
        return this._svg;
    }
    get fontFaceElement() {
        if (!this._fontFace) {
            this._fontFace = this.findElement((child) => child.tagName.toLowerCase() === 'font-face');
        }
        return this._fontFace;
    }
    get fontElement() {
        if (!this._font) {
            this._font = this.findElement((child) => child.tagName.toLowerCase() === 'font');
        }
        return this._font;
    }
    findElement(test) {
        return findElement(this.svg, test);
    }
    findGlyph(glyphName) {
        return this._glyphs[glyphName] || (this._glyphs[glyphName] = this.findElement((child) => child.getAttribute('glyph-name') === glyphName));
    }
    findGlyphByUnicode(unicode) {
        return this._glyphUnis[unicode] || (this._glyphUnis[unicode] = this.findElement((child) => child.getAttribute('unicode') === unicode));
    }
    walkAllGlyph(callback) {
        const walkGlyph = (el, fn) => {
            for (let i = 0; i < el.childNodes.length; i++) {
                const child = el.childNodes[i];
                if (child.nodeType !== ELEMENT_NODE) {
                    continue;
                }
                const unicode = child.getAttribute('unicode');
                if (unicode && child.getAttribute('d')) {
                    if (!this._glyphUnis[unicode]) {
                        this._glyphUnis[unicode] = child;
                    }
                    const glyphName = child.getAttribute('glyph-name');
                    if (glyphName && !this._glyphs[glyphName]) {
                        this._glyphs[glyphName] = child;
                    }
                    fn(child);
                }
                else {
                    walkGlyph(child, fn);
                }
            }
        };
        walkGlyph(this.svg, callback);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Svg);


/***/ }),

/***/ "./src/tools/canvashelper.ts":
/*!***********************************!*\
  !*** ./src/tools/canvashelper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "strokeColorsRect": () => (/* binding */ strokeColorsRect),
/* harmony export */   "roundRect": () => (/* binding */ roundRect),
/* harmony export */   "fillRoundRect": () => (/* binding */ fillRoundRect),
/* harmony export */   "strokeRoundRect": () => (/* binding */ strokeRoundRect),
/* harmony export */   "fillCircle": () => (/* binding */ fillCircle),
/* harmony export */   "strokeCircle": () => (/* binding */ strokeCircle),
/* harmony export */   "fillTextRect": () => (/* binding */ fillTextRect),
/* harmony export */   "drawInlineImageRect": () => (/* binding */ drawInlineImageRect),
/* harmony export */   "measureCheckbox": () => (/* binding */ measureCheckbox),
/* harmony export */   "measureRadioButton": () => (/* binding */ measureRadioButton),
/* harmony export */   "drawCheckbox": () => (/* binding */ drawCheckbox),
/* harmony export */   "drawRadioButton": () => (/* binding */ drawRadioButton),
/* harmony export */   "drawButton": () => (/* binding */ drawButton),
/* harmony export */   "canvasHelper": () => (/* binding */ canvasHelper)
/* harmony export */ });
/* harmony import */ var _internal_canvases__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/canvases */ "./src/internal/canvases.ts");

const { ceil, PI } = Math;
function strokeColorsRect(ctx, borderColors, left, top, width, height) {
    function strokeRectLines(positions) {
        for (let i = 0; i < borderColors.length; i++) {
            const color = borderColors[i];
            const preColor = borderColors[i - 1];
            if (color) {
                if (preColor !== color) {
                    if (preColor) {
                        ctx.strokeStyle = preColor;
                        ctx.stroke();
                    }
                    const pos1 = positions[i];
                    ctx.beginPath();
                    ctx.moveTo(pos1.x, pos1.y);
                }
                const pos2 = positions[i + 1];
                ctx.lineTo(pos2.x, pos2.y);
            }
            else {
                if (preColor) {
                    ctx.strokeStyle = preColor;
                    ctx.stroke();
                }
            }
        }
        const preColor = borderColors[borderColors.length - 1];
        if (preColor) {
            ctx.strokeStyle = preColor;
            ctx.stroke();
        }
    }
    if (borderColors[0] === borderColors[1] && borderColors[0] === borderColors[2] && borderColors[0] === borderColors[3]) {
        if (borderColors[0]) {
            ctx.strokeStyle = borderColors[0];
            ctx.strokeRect(left, top, width, height);
        }
    }
    else {
        strokeRectLines([
            { x: left, y: top },
            { x: left + width, y: top },
            { x: left + width, y: top + height },
            { x: left, y: top + height },
            { x: left, y: top }
        ]);
    }
}
function roundRect(ctx, left, top, width, height, radius) {
    ctx.beginPath();
    ctx.arc(left + radius, top + radius, radius, -PI, -0.5 * PI, false);
    ctx.arc(left + width - radius, top + radius, radius, -0.5 * PI, 0, false);
    ctx.arc(left + width - radius, top + height - radius, radius, 0, 0.5 * PI, false);
    ctx.arc(left + radius, top + height - radius, radius, 0.5 * PI, PI, false);
    ctx.closePath();
}
function fillRoundRect(ctx, left, top, width, height, radius) {
    roundRect(ctx, left, top, width, height, radius);
    ctx.fill();
}
function strokeRoundRect(ctx, left, top, width, height, radius) {
    roundRect(ctx, left, top, width, height, radius);
    ctx.stroke();
}
function fillCircle(ctx, left, top, width, height) {
    const min = Math.min(width, height) / 2;
    ctx.beginPath();
    ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
function strokeCircle(ctx, left, top, width, height) {
    const min = Math.min(width, height) / 2;
    ctx.beginPath();
    ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}
function fillTextRect(ctx, text, left, top, width, height, { offset = 2, padding } = {}) {
    const rect = {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height
    };
    ctx.save();
    try {
        ctx.beginPath();
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        //clip
        ctx.clip();
        //文字描画
        const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_0__.calcBasePosition)(ctx, rect, {
            offset,
            padding
        });
        ctx.fillText(text, pos.x, pos.y);
    }
    finally {
        ctx.restore();
    }
}
function drawInlineImageRect(ctx, image, srcLeft, srcTop, srcWidth, srcHeight, destWidth, destHeight, left, top, width, height, { offset = 2, padding } = {}) {
    const rect = {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height
    };
    ctx.save();
    try {
        ctx.beginPath();
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        //clip
        ctx.clip();
        //文字描画
        const pos = (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_0__.calcStartPosition)(ctx, rect, destWidth, destHeight, {
            offset,
            padding
        });
        ctx.drawImage(image, srcLeft, srcTop, srcWidth, srcHeight, pos.x, pos.y, destWidth, destHeight);
    }
    finally {
        ctx.restore();
    }
}
/**
 * Returns an object containing the width of the checkbox.
 * @param  {CanvasRenderingContext2D} ctx canvas context
 * @return {Object} Object containing the width of the checkbox
 * @memberof cheetahGrid.tools.canvashelper
 */
function measureCheckbox(ctx) {
    return {
        width: (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_0__.getFontSize)(ctx, null).width
    };
}
/**
 * Returns an object containing the width of the radio button.
 * @param  {CanvasRenderingContext2D} ctx canvas context
 * @return {Object} Object containing the width of the radio button
 * @memberof cheetahGrid.tools.canvashelper
 */
function measureRadioButton(ctx) {
    return {
        width: (0,_internal_canvases__WEBPACK_IMPORTED_MODULE_0__.getFontSize)(ctx, null).width
    };
}
/**
 * draw Checkbox
 * @param  {CanvasRenderingContext2D} ctx canvas context
 * @param  {number} x The x coordinate where to start drawing the checkbox (relative to the canvas)
 * @param  {number} y The y coordinate where to start drawing the checkbox (relative to the canvas)
 * @param  {boolean|number} check checkbox check status
 * @param  {object} option option
 * @return {void}
 * @memberof cheetahGrid.tools.canvashelper
 */
function drawCheckbox(ctx, x, y, check, { uncheckBgColor = '#FFF', checkBgColor = 'rgb(76, 73, 72)', borderColor = '#000', boxSize = measureCheckbox(ctx).width } = {}) {
    const checkPoint = typeof check === 'number' ? (check > 1 ? 1 : check) : 1;
    ctx.save();
    try {
        ctx.fillStyle = check ? checkBgColor : uncheckBgColor;
        const leftX = ceil(x);
        const topY = ceil(y);
        const size = ceil(boxSize);
        fillRoundRect(ctx, leftX - 1, topY - 1, size + 1, size + 1, boxSize / 5);
        ctx.lineWidth = 1;
        ctx.strokeStyle = borderColor;
        strokeRoundRect(ctx, leftX - 0.5, topY - 0.5, size, size, boxSize / 5);
        if (check) {
            ctx.lineWidth = ceil(boxSize / 10);
            ctx.strokeStyle = uncheckBgColor;
            let leftWidth = boxSize / 4;
            let rightWidth = (boxSize / 2) * 0.9;
            const leftLeftPos = x + boxSize * 0.2;
            const leftTopPos = y + boxSize / 2;
            if (checkPoint < 0.5) {
                leftWidth *= checkPoint * 2;
            }
            ctx.beginPath();
            ctx.moveTo(leftLeftPos, leftTopPos);
            ctx.lineTo(leftLeftPos + leftWidth, leftTopPos + leftWidth);
            if (checkPoint > 0.5) {
                if (checkPoint < 1) {
                    rightWidth *= (checkPoint - 0.5) * 2;
                }
                ctx.lineTo(leftLeftPos + leftWidth + rightWidth, leftTopPos + leftWidth - rightWidth);
            }
            ctx.stroke();
        }
    }
    finally {
        ctx.restore();
    }
}
/**
 * draw Radio button
 * @param  {CanvasRenderingContext2D} ctx canvas context
 * @param  {number} x The x coordinate where to start drawing the radio button (relative to the canvas)
 * @param  {number} y The y coordinate where to start drawing the radio button (relative to the canvas)
 * @param  {boolean|number} check radio button check status
 * @param  {object} option option
 * @return {void}
 * @memberof cheetahGrid.tools.canvashelper
 */
function drawRadioButton(ctx, x, y, check, { checkColor = 'rgb(76, 73, 72)', borderColor = '#000', bgColor = '#FFF', boxSize = measureRadioButton(ctx).width } = {}) {
    const ratio = typeof check === 'number' ? (check > 1 ? 1 : check) : 1;
    ctx.save();
    try {
        ctx.fillStyle = bgColor;
        const leftX = ceil(x);
        const topY = ceil(y);
        const size = ceil(boxSize);
        fillCircle(ctx, leftX - 1, topY - 1, size + 1, size + 1);
        ctx.lineWidth = 1;
        ctx.strokeStyle = borderColor;
        strokeCircle(ctx, leftX - 0.5, topY - 0.5, size, size);
        if (check) {
            const checkSize = (size * ratio) / 2;
            const padding = (size - checkSize) / 2;
            ctx.fillStyle = checkColor;
            fillCircle(ctx, ceil((leftX - 0.5 + padding) * 100) / 100, ceil((topY - 0.5 + padding) * 100) / 100, ceil(checkSize * 100) / 100, ceil(checkSize * 100) / 100);
        }
    }
    finally {
        ctx.restore();
    }
}
/**
 * draw Button
 */
function drawButton(ctx, left, top, width, height, option = {}) {
    const { backgroundColor = '#FFF', bgColor = backgroundColor, radius = 4, shadow = {} } = option;
    ctx.save();
    try {
        ctx.fillStyle = bgColor;
        if (shadow) {
            const { color = 'rgba(0, 0, 0, 0.24)', blur = 1, offsetX = 0, offsetY = 2, offset: { x: ox = offsetX, y: oy = offsetY } = {} } = shadow;
            ctx.shadowColor = color;
            ctx.shadowBlur = blur; //ぼかし
            ctx.shadowOffsetX = ox;
            ctx.shadowOffsetY = oy;
        }
        fillRoundRect(ctx, ceil(left), ceil(top), ceil(width), ceil(height), radius);
    }
    finally {
        ctx.restore();
    }
}
const canvasHelper = {
    drawButton,
    drawCheckbox,
    drawInlineImageRect,
    drawRadioButton,
    fillRoundRect,
    fillTextRect,
    measureCheckbox,
    measureRadioButton,
    roundRect,
    strokeColorsRect,
    strokeRoundRect,
    fillCircle,
    strokeCircle
};


/***/ }),

/***/ "./src/tools/svgToIcon.ts":
/*!********************************!*\
  !*** ./src/tools/svgToIcon.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Svg */ "./src/tools/Svg.ts");

const ELEMENT_NODE = 1;
function polygonToPath(polygon) {
    const points = polygon.getAttribute('points');
    return `M${points}z`;
}
function polylineToPath(polyline) {
    const points = polyline.getAttribute('points');
    return `M${points}`;
}
function circleToPath(circle) {
    const cx = Number(circle.getAttribute('cx'));
    const cy = Number(circle.getAttribute('cy'));
    const r = Number(circle.getAttribute('r'));
    // https://tyru.github.io/svg-circle-misc-algorithm/
    const SEGMENTS = 8;
    const ANGLE = (2 * Math.PI) / SEGMENTS;
    const anchorX = (theta) => r * Math.cos(theta);
    const anchorY = (theta) => r * Math.sin(theta);
    const controlX = (theta) => anchorX(theta) + r * Math.tan(ANGLE / 2) * Math.cos(theta - Math.PI / 2);
    const controlY = (theta) => anchorY(theta) + r * Math.tan(ANGLE / 2) * Math.sin(theta - Math.PI / 2);
    let paths = `M${cx + r} ${cy}`;
    for (let index = 1; index <= SEGMENTS; index++) {
        const theta = index * ANGLE;
        paths += `Q${controlX(theta) + cx} ${controlY(theta) + cy} ${anchorX(theta) + cx} ${anchorY(theta) + cy}`;
    }
    return paths;
}
function getD(path) {
    const fill = path.getAttribute('fill');
    if (fill === 'none') {
        return '';
    }
    return path.getAttribute('d').replace(/[\n\r]/g, '');
}
function elementToPaths(el) {
    let path = '';
    switch (el.tagName.toLowerCase()) {
        case 'path':
        case 'glyph':
            path = getD(el);
            break;
        case 'circle':
            path = circleToPath(el);
            break;
        case 'polygon':
            path = polygonToPath(el);
            break;
        case 'polyline':
            path = polylineToPath(el);
            break;
        case 'g':
            for (let i = 0; i < el.childNodes.length; i++) {
                const child = el.childNodes[i];
                if (child.nodeType !== ELEMENT_NODE) {
                    continue;
                }
                if (!child.getAttribute('fill')) {
                    child.setAttribute('fill', el.getAttribute('fill'));
                }
                path += elementToPaths(child);
            }
            break;
        default:
            window.console.warn(`unsupported:${el.tagName}`, `@ ${el.innerHTML}`);
    }
    return path;
}
function buildObject(obj = {}) {
    const icon = {
        d: obj.d || '',
        html: obj.html || '',
        height: obj.height || 0,
        width: obj.width || 0
    };
    if (obj.isGlyph) {
        icon.ud = true;
    }
    if (obj.offsetX !== undefined) {
        icon.offsetX = obj.offsetX;
    }
    if (obj.offsetY !== undefined) {
        icon.offsetY = obj.offsetY;
    }
    return icon;
}
function glyphToJSON(svgCode, opt) {
    const svg = new _Svg__WEBPACK_IMPORTED_MODULE_0__["default"](svgCode);
    function findGlyph() {
        if (opt.glyphName) {
            return svg.findGlyph(opt.glyphName);
        }
        else if (opt.unicode) {
            return svg.findGlyphByUnicode(opt.unicode);
        }
    }
    const fontFace = svg.fontFaceElement || {
        getAttribute(qualifiedName) {
            return null;
        }
    };
    const font = svg.fontElement || {
        getAttribute(qualifiedName) {
            return null;
        }
    };
    const glyph = findGlyph();
    // 左下角的x坐标值，同y坐标值，右上角的x坐标值，同y坐标值
    // const bbox = (fontFace.getAttribute("bbox") || "").split(" ");
    // bbox.st = {
    // 	x: bbox[0] - 0,
    // 	y: bbox[1] - 0,
    // };
    // bbox.ed = {
    // 	x: bbox[2] - 0,
    // 	y: bbox[3] - 0,
    // };
    const fontHorizAdvX = Number(font.getAttribute('horiz-adv-x')) || 0;
    const fontVertAdvX = Number(font.getAttribute('vert-adv-x')) || 0;
    const horizAdvX = Number(glyph.getAttribute('horiz-adv-x')) || fontHorizAdvX || 0;
    const vertAdvX = Number(glyph.getAttribute('vert-adv-x')) || fontVertAdvX || 0;
    const unitsPerEm = Number(fontFace.getAttribute('units-per-em')) || 1000;
    // const ascent = Number(fontFace.getAttribute("ascent")) || (unitsPerEm - vertAdvX);
    const descent = Number(fontFace.getAttribute('descent')) || vertAdvX;
    let size = unitsPerEm;
    const contentSize = {
        height: vertAdvX || unitsPerEm,
        width: horizAdvX || unitsPerEm
    };
    if (horizAdvX > size) {
        size = horizAdvX;
    }
    if (vertAdvX > size) {
        size = vertAdvX;
    }
    let offsetX = 0; // -bbox.st.x || 0;
    let offsetY = -descent;
    offsetX += Math.round((size - contentSize.width) / 2);
    offsetY += Math.round((size - contentSize.height) / 2);
    const d = elementToPaths(glyph);
    return buildObject({
        d,
        height: size,
        html: glyph.outerHTML,
        isGlyph: true,
        offsetX,
        offsetY,
        width: size
    });
}
function svgToJSON(svgCode) {
    const { svg } = new _Svg__WEBPACK_IMPORTED_MODULE_0__["default"](svgCode);
    const viewBox = (svg.getAttribute('viewBox') || '').split(' ');
    const width = Number(svg.getAttribute('width') || viewBox[2]) || 0;
    const height = Number(svg.getAttribute('height') || viewBox[3]) || 0;
    const offsetX = 0 - Number(viewBox[0]) || 0;
    const offsetY = 0 - Number(viewBox[1]) || 0;
    let d = '';
    for (let i = 0; i < svg.childNodes.length; i++) {
        const el = svg.childNodes[i];
        if (el.nodeType !== ELEMENT_NODE) {
            continue;
        }
        d += elementToPaths(el);
    }
    return buildObject({
        d,
        height,
        html: svgCode,
        offsetX,
        offsetY,
        width
    });
}
const svgToIcon = (svgCode, opt = {}) => {
    if (opt.glyphName || opt.unicode) {
        return glyphToJSON(svgCode, opt);
    }
    else {
        return svgToJSON(svgCode);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (svgToIcon);


/***/ }),

/***/ "./src/tooltip/BaseTooltip.ts":
/*!************************************!*\
  !*** ./src/tooltip/BaseTooltip.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTooltip": () => (/* binding */ BaseTooltip)
/* harmony export */ });
class BaseTooltip {
    _grid;
    _tooltipElement;
    constructor(grid) {
        this._grid = grid;
    }
    dispose() {
        this.detachTooltipElement();
        if (this._tooltipElement) {
            this._tooltipElement.dispose();
        }
        this._tooltipElement = undefined;
    }
    _getTooltipElement() {
        if (this._tooltipElement) {
            return this._tooltipElement;
        }
        return (this._tooltipElement = this.createTooltipElementInternal());
    }
    attachTooltipElement(col, row, content) {
        const tooltipElement = this._getTooltipElement();
        tooltipElement.attach(this._grid, col, row, content);
    }
    moveTooltipElement(col, row) {
        const tooltipElement = this._getTooltipElement();
        tooltipElement.move(this._grid, col, row);
    }
    detachTooltipElement() {
        const tooltipElement = this._getTooltipElement();
        tooltipElement._detach();
    }
}


/***/ }),

/***/ "./src/tooltip/Tooltip.ts":
/*!********************************!*\
  !*** ./src/tooltip/Tooltip.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _BaseTooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTooltip */ "./src/tooltip/BaseTooltip.ts");
/* harmony import */ var _internal_TooltipElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/TooltipElement */ "./src/tooltip/internal/TooltipElement.ts");


class Tooltip extends _BaseTooltip__WEBPACK_IMPORTED_MODULE_0__.BaseTooltip {
    createTooltipElementInternal() {
        return new _internal_TooltipElement__WEBPACK_IMPORTED_MODULE_1__.TooltipElement();
    }
}


/***/ }),

/***/ "./src/tooltip/TooltipHandler.ts":
/*!***************************************!*\
  !*** ./src/tooltip/TooltipHandler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TooltipHandler": () => (/* binding */ TooltipHandler)
/* harmony export */ });
/* harmony import */ var _list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list-grid/LG_EVENT_TYPE */ "./src/list-grid/LG_EVENT_TYPE.ts");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip */ "./src/tooltip/Tooltip.ts");
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/utils */ "./src/internal/utils.ts");



const TOOLTIP_INSTANCE_FACTORY = {
    'overflow-text'(grid) {
        return new _Tooltip__WEBPACK_IMPORTED_MODULE_1__.Tooltip(grid);
    }
};
function getTooltipInstanceInfo(grid, col, row) {
    // overflow text tooltip
    const overflowText = grid.getCellOverflowText(col, row);
    if (overflowText) {
        return {
            type: 'overflow-text',
            content: overflowText
        };
    }
    return null;
}
class TooltipHandler {
    _grid;
    _tooltipInstances;
    _attachInfo;
    constructor(grid) {
        this._grid = grid;
        this._tooltipInstances = {};
        this._bindGridEvent(grid);
    }
    dispose() {
        const tooltipInstances = this._tooltipInstances;
        for (const k in tooltipInstances) {
            tooltipInstances[k].dispose();
        }
        delete this._tooltipInstances;
        this._attachInfo = null;
    }
    _attach(col, row) {
        const info = this._attachInfo;
        const instanceInfo = this._getTooltipInstanceInfo(col, row);
        if (info && (!instanceInfo || info.instance !== instanceInfo.instance)) {
            info.instance.detachTooltipElement();
            this._attachInfo = null;
        }
        if (!instanceInfo) {
            return;
        }
        const { instance } = instanceInfo;
        instance.attachTooltipElement(col, row, instanceInfo.content);
        const range = this._grid.getCellRange(col, row);
        this._attachInfo = { range, instance };
    }
    _move(col, row) {
        const info = this._attachInfo;
        if (!info || !(0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.cellInRange)(info.range, col, row)) {
            return;
        }
        const { instance } = info;
        instance.moveTooltipElement(col, row);
    }
    _detach() {
        const info = this._attachInfo;
        if (!info) {
            return;
        }
        const { instance } = info;
        instance.detachTooltipElement();
        this._attachInfo = null;
    }
    _isAttachCell(col, row) {
        const info = this._attachInfo;
        if (!info) {
            return false;
        }
        return (0,_internal_utils__WEBPACK_IMPORTED_MODULE_2__.cellInRange)(info.range, col, row);
    }
    _bindGridEvent(grid) {
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.LG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
            if (e.related) {
                if (this._isAttachCell(e.col, e.row)) {
                    return;
                }
            }
            this._attach(e.col, e.row);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.LG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
            if (e.related) {
                if (this._isAttachCell(e.related.col, e.related.row)) {
                    return;
                }
            }
            this._detach();
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.LG_EVENT_TYPE.SELECTED_CELL, (e) => {
            if (this._isAttachCell(e.col, e.row)) {
                this._detach();
            }
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.LG_EVENT_TYPE.SCROLL, () => {
            const info = this._attachInfo;
            if (!info) {
                return;
            }
            this._move(info.range.start.col, info.range.start.row);
        });
        grid.listen(_list_grid_LG_EVENT_TYPE__WEBPACK_IMPORTED_MODULE_0__.LG_EVENT_TYPE.CHANGED_VALUE, (e) => {
            if (this._isAttachCell(e.col, e.row)) {
                this._detach();
                this._attach(e.col, e.row);
            }
        });
    }
    _getTooltipInstanceInfo(col, row) {
        const grid = this._grid;
        const tooltipInstances = this._tooltipInstances;
        const info = getTooltipInstanceInfo(grid, col, row);
        if (!info) {
            return null;
        }
        const { type } = info;
        const instance = tooltipInstances[type] || (tooltipInstances[type] = TOOLTIP_INSTANCE_FACTORY[type](grid));
        return {
            instance,
            type,
            content: info.content
        };
    }
}


/***/ }),

/***/ "./src/tooltip/internal/TooltipElement.ts":
/*!************************************************!*\
  !*** ./src/tooltip/internal/TooltipElement.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TooltipElement": () => (/* binding */ TooltipElement)
/* harmony export */ });
/* harmony import */ var _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/EventHandler */ "./src/internal/EventHandler.ts");
/* harmony import */ var _internal_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/dom */ "./src/internal/dom.ts");
/* harmony import */ var _TooltipElement_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TooltipElement.css */ "./src/tooltip/internal/TooltipElement.css");


const CLASSNAME = 'cheetah-grid__tooltip-element';
const CONTENT_CLASSNAME = `${CLASSNAME}__content`;
const HIDDEN_CLASSNAME = `${CLASSNAME}--hidden`;
const SHOWN_CLASSNAME = `${CLASSNAME}--shown`;

function createTooltipDomElement() {
    // require('@/tooltip/internal/TooltipElement.css')
    const rootElement = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        classList: [CLASSNAME, HIDDEN_CLASSNAME]
    });
    const messageElement = (0,_internal_dom__WEBPACK_IMPORTED_MODULE_1__.createElement)('pre', {
        classList: [CONTENT_CLASSNAME]
    });
    rootElement.appendChild(messageElement);
    return rootElement;
}
class TooltipElement {
    _handler;
    _rootElement;
    _messageElement;
    constructor() {
        this._handler = new _internal_EventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler();
        const rootElement = (this._rootElement = createTooltipDomElement());
        this._messageElement = rootElement.querySelector(`.${CONTENT_CLASSNAME}`);
    }
    dispose() {
        this.detach();
        const rootElement = this._rootElement;
        if (rootElement.parentElement) {
            rootElement.parentElement.removeChild(rootElement);
        }
        this._handler.dispose();
        delete this._rootElement;
        delete this._messageElement;
    }
    attach(grid, col, row, content) {
        const rootElement = this._rootElement;
        const messageElement = this._messageElement;
        rootElement.classList.remove(SHOWN_CLASSNAME);
        rootElement.classList.add(HIDDEN_CLASSNAME);
        if (this._attachCell(grid, col, row)) {
            rootElement.classList.add(SHOWN_CLASSNAME);
            rootElement.classList.remove(HIDDEN_CLASSNAME);
            messageElement.textContent = content;
        }
        else {
            this._detach();
        }
    }
    move(grid, col, row) {
        const rootElement = this._rootElement;
        if (this._attachCell(grid, col, row)) {
            rootElement.classList.add(SHOWN_CLASSNAME);
            rootElement.classList.remove(HIDDEN_CLASSNAME);
        }
        else {
            this._detach();
        }
    }
    detach() {
        this._detach();
    }
    _detach() {
        const rootElement = this._rootElement;
        if (rootElement.parentElement) {
            // rootElement.parentElement.removeChild(rootElement);
            rootElement.classList.remove(SHOWN_CLASSNAME);
            rootElement.classList.add(HIDDEN_CLASSNAME);
        }
    }
    _attachCell(grid, col, row) {
        const rootElement = this._rootElement;
        const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
        const { bottom: top, left, width } = rect;
        const { frozenRowCount, frozenColCount } = grid;
        if (row >= frozenRowCount && frozenRowCount > 0) {
            const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1));
            if (top < frozenRect.bottom) {
                return false; //範囲外
            }
        }
        else {
            if (top < 0) {
                return false; //範囲外
            }
        }
        if (col >= frozenColCount && frozenColCount > 0) {
            const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row));
            if (left < frozenRect.right) {
                return false; //範囲外
            }
        }
        else {
            if (left < 0) {
                return false; //範囲外
            }
        }
        const { offsetHeight, offsetWidth } = element;
        if (offsetHeight < top) {
            return false; //範囲外
        }
        if (offsetWidth < left) {
            return false; //範囲外
        }
        rootElement.style.top = `${top.toFixed()}px`;
        rootElement.style.left = `${(left + width / 2).toFixed()}px`;
        rootElement.style.minWidth = `${width.toFixed()}px`;
        if (rootElement.parentElement !== element) {
            element.appendChild(rootElement);
        }
        return true;
    }
}


/***/ }),

/***/ "./src/icons/ic_add_48px.svg":
/*!***********************************!*\
  !*** ./src/icons/ic_add_48px.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBkPSJNMzggMjZIMjZ2MTJoLTRWMjZIMTB2LTRoMTJWMTBoNHYxMmgxMnY0eiIvPjwvc3ZnPg==");

/***/ }),

/***/ "./src/icons/ic_arrow_downward_48px.svg":
/*!**********************************************!*\
  !*** ./src/icons/ic_arrow_downward_48px.svg ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBmaWxsPSIjMDEwMTAxIiBkPSJNNDAgMjRsLTIuODItMi44MkwyNiAzMi4zNFY4aC00djI0LjM0TDEwLjg0IDIxLjE2IDggMjRsMTYgMTYgMTYtMTZ6Ii8+PC9zdmc+");

/***/ }),

/***/ "./src/icons/ic_arrow_upward_48px.svg":
/*!********************************************!*\
  !*** ./src/icons/ic_arrow_upward_48px.svg ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBkPSJNOCAyNGwyLjgzIDIuODNMMjIgMTUuNjZWNDBoNFYxNS42NmwxMS4xNyAxMS4xN0w0MCAyNCAyNCA4IDggMjR6Ii8+PC9zdmc+");

/***/ }),

/***/ "./src/icons/ic_edit_48px.svg":
/*!************************************!*\
  !*** ./src/icons/ic_edit_48px.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBkPSJNNiAzNC41VjQyaDcuNWwyMi4xMy0yMi4xMy03LjUtNy41TDYgMzQuNXptMzUuNDEtMjAuNDFjLjc4LS43OC43OC0yLjA1IDAtMi44M2wtNC42Ny00LjY3Yy0uNzgtLjc4LTIuMDUtLjc4LTIuODMgMGwtMy42NiAzLjY2IDcuNSA3LjUgMy42Ni0zLjY2eiIvPjwvc3ZnPg==");

/***/ }),

/***/ "./src/icons/ic_star_24px.svg":
/*!************************************!*\
  !*** ./src/icons/ic_star_24px.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMTcuMjdMMTguMTggMjFsLTEuNjQtNy4wM0wyMiA5LjI0bC03LjE5LS42MUwxMiAyIDkuMTkgOC42MyAyIDkuMjRsNS40NiA0LjczTDUuODIgMjF6Ii8+PC9zdmc+");

/***/ }),

/***/ "./src/icons/ic_star_border_24px.svg":
/*!*******************************************!*\
  !*** ./src/icons/ic_star_border_24px.svg ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIgOS4yNGwtNy4xOS0uNjJMMTIgMiA5LjE5IDguNjMgMiA5LjI0bDUuNDYgNC43M0w1LjgyIDIxIDEyIDE3LjI3IDE4LjE4IDIxbC0xLjYzLTcuMDNMMjIgOS4yNHpNMTIgMTUuNGwtMy43NiAyLjI3IDEtNC4yOC0zLjMyLTIuODggNC4zOC0uMzhMMTIgNi4xbDEuNzEgNC4wNCA0LjM4LjM4LTMuMzIgMi44OCAxIDQuMjhMMTIgMTUuNHoiLz48L3N2Zz4=");

/***/ }),

/***/ "./src/icons/ic_star_half_24px.svg":
/*!*****************************************!*\
  !*** ./src/icons/ic_star_half_24px.svg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIgOS4yNGwtNy4xOS0uNjJMMTIgMiA5LjE5IDguNjMgMiA5LjI0bDUuNDYgNC43M0w1LjgyIDIxIDEyIDE3LjI3IDE4LjE4IDIxbC0xLjYzLTcuMDNMMjIgOS4yNHpNMTIgMTUuNFY2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIvPjwvc3ZnPg==");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_1__.core),
/* harmony export */   "tools": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_2__.tools),
/* harmony export */   "ListGrid": () => (/* reexport safe */ _ListGrid__WEBPACK_IMPORTED_MODULE_3__.ListGrid),
/* harmony export */   "columns": () => (/* reexport safe */ _columns__WEBPACK_IMPORTED_MODULE_0__.columns),
/* harmony export */   "data": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_4__.data),
/* harmony export */   "headers": () => (/* reexport safe */ _headers__WEBPACK_IMPORTED_MODULE_5__.headers),
/* harmony export */   "themes": () => (/* reexport safe */ _themes__WEBPACK_IMPORTED_MODULE_6__.themes),
/* harmony export */   "_GridCanvasHelper": () => (/* reexport safe */ _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_7__.GridCanvasHelper),
/* harmony export */   "svgIcons": () => (/* reexport safe */ _icons__WEBPACK_IMPORTED_MODULE_9__.svgIcons),
/* harmony export */   "register": () => (/* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_8__.register),
/* harmony export */   "_dataGrid": () => (/* binding */ _dataGrid),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns */ "./src/columns.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "./src/core.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _ListGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ListGrid */ "./src/ListGrid.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data */ "./src/data.ts");
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./headers */ "./src/headers.ts");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./themes */ "./src/themes.ts");
/* harmony import */ var _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GridCanvasHelper */ "./src/GridCanvasHelper.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./register */ "./src/register.ts");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icons */ "./src/icons.ts");











const _dataGrid = {
    version: '1.0.1',
    core: _core__WEBPACK_IMPORTED_MODULE_1__.core,
    tools: _tools__WEBPACK_IMPORTED_MODULE_2__.tools,
    // impl Grids
    ListGrid: _ListGrid__WEBPACK_IMPORTED_MODULE_3__.ListGrid,
    // objects
    columns: _columns__WEBPACK_IMPORTED_MODULE_0__.columns,
    data: _data__WEBPACK_IMPORTED_MODULE_4__.data,
    headers: _headers__WEBPACK_IMPORTED_MODULE_5__.headers,
    themes: _themes__WEBPACK_IMPORTED_MODULE_6__.themes,
    // helper
    GridCanvasHelper: _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_7__.GridCanvasHelper,
    get icons() {
        return _icons__WEBPACK_IMPORTED_MODULE_9__.svgIcons.get();
    },
    // plugin registers
    register: _register__WEBPACK_IMPORTED_MODULE_8__.register
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    version: '1.0.1',
    core: _core__WEBPACK_IMPORTED_MODULE_1__.core,
    tools: _tools__WEBPACK_IMPORTED_MODULE_2__.tools,
    // impl Grids
    ListGrid: _ListGrid__WEBPACK_IMPORTED_MODULE_3__.ListGrid,
    // objects
    columns: _columns__WEBPACK_IMPORTED_MODULE_0__.columns,
    data: _data__WEBPACK_IMPORTED_MODULE_4__.data,
    headers: _headers__WEBPACK_IMPORTED_MODULE_5__.headers,
    themes: _themes__WEBPACK_IMPORTED_MODULE_6__.themes,
    // helper
    GridCanvasHelper: _GridCanvasHelper__WEBPACK_IMPORTED_MODULE_7__.GridCanvasHelper,
    get icons() {
        return _icons__WEBPACK_IMPORTED_MODULE_9__.svgIcons.get();
    },
    // plugin registers
    register: _register__WEBPACK_IMPORTED_MODULE_8__.register
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dataGrid.js.map