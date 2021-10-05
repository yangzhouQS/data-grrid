/*!
* @mctech/kaka-grid v2.3.14
* Copyright 2021 ChenGang <10147817@qq.com>
* Licensed under MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.kakaGrid = factory());
}(this, (function () {
  'use strict';

  const isNode$1 = typeof window === 'undefined' || typeof window.window === 'undefined';
  let arrayFind;
  let arrayFindIndex;
  const array = {
    get find() {
      if (arrayFind) {
        return arrayFind;
      }
      if (Array.prototype.find) {
        arrayFind = (arr, predicate) => Array.prototype.find.call(arr, predicate);
      } else {
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
      } else {
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
  const isDef = (data) => {
    return data !== null && typeof data !== 'undefined';
  };
  const isDefString = (data) => {
    return isDef(data) && (typeof data !== 'string' || data !== '');
  };

  function analyzeUserAgent() {
    if (isNode$1) {
      return {
        Chrome: false,
        Edge: false,
        Firefox: false,
        IE: false,
        Safari: false
      };
    } else {
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

  const { IE, Chrome, Firefox, Edge, Safari } = analyzeUserAgent();

  function setReadonly(obj, name, value) {
    Object.defineProperty(obj, name, {
      enumerable: false,
      configurable: true,
      value
    });
  }

  function each(obj, fn) {
    for (const key in obj) {
      fn(obj[key], key, obj);
    }
  }

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

  function extend$1(...args) {
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
    while (target && target.parentElement) {
      const p = target.parentElement;
      if (root === p) {
        return true;
      }
      target = p;
    }
    return false;
  }

  function applyChainSafe(obj, fn, ...names) {
    let value = obj;
    for (let i = 0; i < names.length && isDef(value); i++) {
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
    } else {
      return value;
    }
  }

  function endsWith(str, searchString, position) {
    const subjectString = str.toString();
    if (typeof position !== 'number' ||
      !isFinite(position) ||
      Math.floor(position) !== position ||
      position > subjectString.length) {
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

  const template = (strings, ...keys) => {
    return (...values) => {
      const dict = values[values.length - 1] || {};
      const result = [strings[0]];
      keys.forEach((key, i) => {
        const isInteger = Number.isInteger
          ? Number.isInteger(key)
          : typeof key === 'number' && key !== Infinity && Math.floor(key) === key;
        const value = isInteger ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    };
  };
  const escape = (html) => {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function isPromise(data) {
    return Boolean(data && typeof data.then === 'function');
  }

  function then(result, callback) {
    return isPromise(result) ? result.then((r) => callback(r)) : callback(result);
  }

  function getMouseButtons(e) {
    if (isDef(e.buttons)) {
      return e.buttons;
    }
    /* for legacy */
    if (isDef(e.which)) {
      if (e.which === 3) {
        // right?
        return 4;
      }
      if (e.which === 2) {
        // middle?
        return 4;
      }
      return e.which; // left or no
    }
    if (e.button === 0 || e.button === 1) {
      return 1; // candidate left
    }
    if (e.button === 2) {
      return 2; // right
    }
    return 0; // no or middle?
  }

  function getKeyCode(e) {
    return e.keyCode || e.which;
  }

  function isTouchEvent(e) {
    return !!e.changedTouches;
  }

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
    e.stopImmediatePropagation();
  }

  function toBoxArray(obj) {
    if (!Array.isArray(obj)) {
      return [obj /*top*/, obj /*right*/, obj /*bottom*/, obj /*left*/];
    }
    if (obj.length === 3) {
      return [
        obj[0] /*top*/,
        obj[1] /*right*/,
        obj[2] /*bottom*/,
        obj[1] /*left*/
      ];
    }
    if (obj.length === 2) {
      return [
        obj[0] /*top*/,
        obj[1] /*right*/,
        obj[0] /*bottom*/,
        obj[1] /*left*/
      ];
    }
    if (obj.length === 1) {
      return [
        obj[0] /*top*/,
        obj[0] /*right*/,
        obj[0] /*bottom*/,
        obj[0] /*left*/
      ];
    }
    return obj;
  }

  function cellEquals(a, b) {
    return a.col === b.col && a.row === b.row;
  }

  function cellInRange(range, col, row) {
    return (range.start.col <= col &&
      col <= range.end.col &&
      range.start.row <= row &&
      row <= range.end.row);
  }

  function cellMerge(a, b) {
    const startCol = Math.min(a.start.col, a.end.col, b.start.col, b.end.col);
    const startRow = Math.min(a.start.row, a.end.row, b.start.row, b.end.row);
    const endCol = Math.max(a.start.col, a.end.col, b.start.col, b.end.col);
    const endRow = Math.max(a.start.row, a.end.row, b.start.row, b.end.row);
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
    genWords,
    escape,
    template
  };
  const event = {
    getMouseButtons,
    getKeyCode,
    isTouchEvent,
    cancel
  };
  const style$3 = {
    toBoxArray
  };
  const emptyFn = () => {
  };

  function toggleValue(val) {
    if (typeof val === 'number') {
      if (val === 0) {
        return 1;
      } else {
        return 0;
      }
    } else if (typeof val === 'string') {
      if (val === 'false') {
        return 'true';
      } else if (val === 'off') {
        return 'on';
      } else if (/^0+$/.exec(val)) {
        return val.replace(/^(0*)0$/, '$11');
      } else if (val === 'true') {
        return 'false';
      } else if (val === 'on') {
        return 'off';
      } else if (/^0*1$/.exec(val)) {
        return val.replace(/^(0*)1$/, '$10');
      }
    }
    return !val;
  }

  const getBooleanOptionOfRecord = (option, grid, row) => {
    if (typeof option === 'function') {
      const record = grid.getRowRecord(row);
      if (isPromise(record)) {
        return true;
      }
      return !!option(record);
    }
    return !!option;
  };
  const isDisabledRecord = (option, grid, row) => {
    return (getBooleanOptionOfRecord(grid.disabled, grid, row) ||
      getBooleanOptionOfRecord(option, grid, row));
  };
  const isReadOnlyRecord = (option, grid, row) => {
    return (getBooleanOptionOfRecord(grid.readOnly, grid, row) ||
      getBooleanOptionOfRecord(option, grid, row));
  };

  const DG_EVENT_TYPE = {
    CLICK_CELL: 'click_cell',
    DBLCLICK_CELL: 'dblclick_cell',
    DBLTAP_CELL: 'dbltap_cell',
    MOUSEDOWN_CELL: 'mousedown_cell',
    MOUSEUP_CELL: 'mouseup_cell',
    SELECTED_CELL: 'selected_cell',
    MOUSE_SELECTED_START: 'mouse_selected_start',
    MOUSE_SELECTED_END: 'mouse_selected_end',
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
    BLUR_GRID: 'blur_grid',
    CAN_DRAG_SELECTION: 'can_drag_selection',
    DRAG_SELECTION: 'drag_selection',
    CLICK_UNDERLAY: 'click_underlay',
    DBLCLICK_UNDERLAY: 'dblclick_underlay',
    DBLTAP_UNDERLAY: 'dbltap_underlay',
    COPY: 'copydata',
    CUT: 'cutdata',
    PASTE: 'pastedata'
  };

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

  // import utils from "./utils";
  // type SymbolType = (description?: string | number) => symbol;
  // const Symbol: SymbolType = utils.isNode
  //   ? (global.Symbol as SymbolType)
  //   : (window.Symbol as SymbolType)
  //   ? (window.Symbol as SymbolType)
  //   : ((): SymbolType => {
  //       function random(): string {
  //         const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  //         const cl = c.length;
  //         let r = "";
  //         for (let i = 0; i < 10; i++) {
  //           r += c[Math.floor(Math.random() * cl)];
  //         }
  //         return r;
  //       }
  //       return (name?: string | number): symbol => {
  //         if (name) {
  //           return `#${name}_${random()}` as any;
  //         } else {
  //           return `#_${random()}` as any;
  //         }
  //       };
  //     })();
  // const mem: { [key: string]: symbol } = {};
  function get(name) {
    // if (name) {
    //   return (mem[name] ? mem[name] : (mem[name] = Symbol(name))) as any;
    // } else {
    //   return Symbol() as any;
    // }
    return (name || '_');
  }

  function getEventTargetSymbol() {
    return get('protected.event_target');
  }

  function getThemeSymbol() {
    return get('protected.theme');
  }

  function getDrawGridSymbol() {
    return get('protected.draw_grid');
  }

  function getListGridSymbol() {
    return get('protected.list_grid');
  }

  function getCheckColumnStateId() {
    return get('chkcol.stateID');
  }

  function getRadioColumnStateId() {
    return get('rdcol.stateID');
  }

  function getSwitchColumnStateId() {
    return get('swtcol.stateID');
  }

  function getButtonColumnStateId() {
    return get('btncol.stateID');
  }

  function getColumnActionStateId() {
    return get('col.action.stateID');
  }

  function getColumnFadeinStateId() {
    return get('col.fadein_stateID');
  }

  function getInlineEditingStateId() {
    return get('col.inline_editing_stateID');
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

  function getInlineTextareaEditorStateId() {
    return get('inline_textarea_editor.stateID');
  }

  function getInlineLookupEditorStateId() {
    return get('inline_lookup_editor.stateID');
  }

  function getInlineMenuEditorStateId() {
    return get('inline_menu_editor.stateID');
  }

  function getCheckHeaderStateId() {
    return get('check_header.stateID');
  }

  function getSwitchHeaderStateId() {
    return get('switch_header.stateID');
  }

  function getHeaderIconTooltipStateId() {
    return get('header.iconTooltip.stateID');
  }

  const COLUMN_ACTION_STATE_ID$1 = getColumnActionStateId();

  function bindCellClickAction$1(grid, cellId, { action, mouseOver, mouseMove, mouseOut }) {
    function isTarget(col, row) {
      return grid.getLayoutCellId(col, row) === cellId;
    }

    if (!grid[COLUMN_ACTION_STATE_ID$1]) {
      obj.setReadonly(grid, COLUMN_ACTION_STATE_ID$1, {});
    }
    const actionState = grid[COLUMN_ACTION_STATE_ID$1];
    return [
      // click
      grid.listen(DG_EVENT_TYPE.CLICK_CELL, (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        if (isPromise(grid.getRowRecord(e.row))) {
          return;
        }
        action({
          col: e.col,
          row: e.row
        });
      }),
      // mouse move
      grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        if (isPromise(grid.getRowRecord(e.row))) {
          return;
        }
        if (mouseMove) {
          if (!mouseMove({
            col: e.col,
            row: e.row
          }, e.event)) {
            grid.getElement().style.cursor = '';
            actionState.mouseActive = false;
            return;
          }
        }
        grid.getElement().style.cursor = 'pointer';
        actionState.mouseActive = true;
      }),
      grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        if (isPromise(grid.getRowRecord(e.row))) {
          return;
        }
        if (mouseOver) {
          if (!mouseOver({
            col: e.col,
            row: e.row
          }, e.event)) {
            grid.getElement().style.cursor = '';
            actionState.mouseActive = false;
            return;
          }
        }
        grid.getElement().style.cursor = 'pointer';
        actionState.mouseActive = true;
      }),
      grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
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
        actionState.mouseActive = false;
      })
    ];
  }

  function bindCellKeyAction$1(grid, cellId, { action, acceptKeys = [] }) {
    function isTarget(col, row) {
      return grid.getLayoutCellId(col, row) === cellId;
    }

    acceptKeys = [...acceptKeys, KEY_ENTER, KEY_SPACE];
    return [
      // enter key down
      grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
        var _a;
        if (acceptKeys.indexOf(e.keyCode) === -1) {
          return;
        }
        if (((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) && e.keyCode === KEY_ENTER) {
          // When moving with the enter key, no action is taken with the enter key.
          return;
        }
        const sel = grid.selection.select;
        if (!isTarget(sel.col, sel.row)) {
          return;
        }
        if (isPromise(grid.getRowRecord(sel.row))) {
          return;
        }
        action({
          col: sel.col,
          row: sel.row
        });
        event.cancel(e.event);
      })
    ];
  }

  class BaseAction$1 {
    constructor(options = {}) {
      this._disabled = options.disabled || false;
    }

    get disabled() {
      return this._disabled;
    }

    set disabled(disabled) {
      if (this._disabled !== disabled) {
        this._disabled = disabled;
        this.onChangeDisabledInternal();
      }
    }

    onChangeDisabledInternal() {
      // nothing
    }
  }

  class Action extends BaseAction$1 {
    constructor(options = {}) {
      super(options);
      this._action = options.action || emptyFn;
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
        if (isDisabledRecord(this.disabled, grid, cell.row)) {
          return;
        }
        const record = grid.getRowRecord(cell.row);
        this._action.apply(this, [
          record,
          {
            cell,
            grid
          }
        ]);
      };
      const actionMouse = (cell) => {
        if (state.mouseActive) {
          action(cell);
        }
      };
      const mouseOut = (cell) => {
        delete state.mouseRelativePos;
        delete state.mouseActiveCell;
        delete state.mouseActive;
        const range = grid.getCellRange(cell.col, cell.row);
        grid.invalidateCellRange(range);
      };
      const mouseMove = (cell, event) => {
        if (isDisabledRecord(this.disabled, grid, cell.row)) {
          return false;
        }
        state.mouseRelativePos = grid._getMouseRelativePoint(event);
        state.mouseActiveCell = {
          col: cell.col,
          row: cell.row
        };
        const range = grid.getCellRange(cell.col, cell.row);
        grid.invalidateCellRange(range);
        return isDef(state.mouseActive) ? state.mouseActive : true;
      };
      return [
        ...bindCellClickAction$1(grid, cellId, {
          action: actionMouse,
          mouseMove,
          mouseOut,
          mouseOver: mouseMove
        }),
        ...bindCellKeyAction$1(grid, cellId, {
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

  class Editor extends BaseAction$1 {
    constructor(options = {}) {
      super(options);
      this._readOnly = options.readOnly || options.readonly || false;
    }

    get editable() {
      return true;
    }

    get readOnly() {
      return this._readOnly;
    }

    set readOnly(readOnly) {
      if (this._readOnly !== readOnly) {
        this._readOnly = readOnly;
        this.onChangeReadOnlyInternal();
      }
    }

    get readonly() {
      window.console.warn('\'readonly\' is deprecated, please use \'readOnly\' instead');
      return this.readOnly;
    }

    set readonly(readOnly) {
      window.console.warn('\'readonly\' is deprecated, please use \'readOnly\' instead');
      this.readOnly = readOnly;
    }

    onChangeReadOnlyInternal() {
      // nothing
    }
  }

  function _inAttachCellArea(grid, col, row, event) {
    let bool = false;
    const relativePos = grid._getMouseRelativePoint(event);
    const rect = grid.getAttachCellsArea(grid.getCellRange(col, row)).rect;
    if (relativePos) {
      if (rect.inPoint(relativePos.x, relativePos.y)) {
        bool = true;
      }
    }
    return bool;
  }

  class BaseInputEditor extends Editor {
    constructor(options = {}) {
      super(options);
    }

    open(grid, cell) {
      const allowOpen = !isReadOnlyRecord(this.readOnly, grid, cell.row) &&
        !isDisabledRecord(this.disabled, grid, cell.row);
      if (allowOpen) {
        this.onOpenCellInternal(grid, cell);
      }
      return allowOpen;
    }

    onBeforeKeydownInternal(_grid, _keyCode, _e, _cellId) {
      return true;
    }

    bindGridEvent(grid, cellId) {
      const open = (cell) => {
        return this.open(grid, cell);
      };
      const input = (cell, value) => {
        if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
          isDisabledRecord(this.disabled, grid, cell.row)) {
          return;
        }
        this.onInputCellInternal(grid, cell, value);
      };

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      return [
        grid.listen(DG_EVENT_TYPE.INPUT_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          input({
            col: e.col,
            row: e.row
          }, e.value);
        }),
        grid.listen(DG_EVENT_TYPE.PASTE_CELL, (e) => {
          if (e.multi) {
            // ignore multi cell values
            return;
          }
          const selectionRange = grid.selection.range;
          if (!cellEquals(selectionRange.start, selectionRange.end)) {
            // ignore multi paste values
            return;
          }
          if (!isTarget(e.col, e.row)) {
            return;
          }
          event.cancel(e.event);
          input({
            col: e.col,
            row: e.row
          }, e.normalizeValue);
        }),
        grid.listen(DG_EVENT_TYPE.DBLCLICK_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (!_inAttachCellArea(grid, e.col, e.row, e.event)) {
            return;
          }
          open({
            col: e.col,
            row: e.row
          });
          event.cancel(e.event);
        }),
        grid.listen(DG_EVENT_TYPE.DBLTAP_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (!_inAttachCellArea(grid, e.col, e.row, e.event)) {
            return;
          }
          open({
            col: e.col,
            row: e.row
          });
          event.cancel(e.event);
        }),
        grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
          if ((e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) ||
            (e.keyCode === KEY_ENTER && e.event.shiftKey)) {
            return;
          }
          const sel = grid.selection.select;
          if (!isTarget(sel.col, sel.row)) {
            return;
          }
          if (this.onBeforeKeydownInternal(grid, e.keyCode, e.event, cellId) ===
            false) {
            return false;
          }
          if (e.event.ctrlKey || e.event.metaKey) {
            return;
          }
          if (open({
            col: sel.col,
            row: sel.row
          })) {
            event.cancel(e.event);
            e.stopCellMoving();
          }
        }),
        grid.listen(DG_EVENT_TYPE.SELECTED_CELL, (e) => {
          this.onChangeSelectCellInternal(grid, { col: e.col, row: e.row }, e.selected);
        }),
        grid.listen(DG_EVENT_TYPE.SCROLL, () => {
          this.onGridScrollInternal(grid);
        }),
        grid.listen(DG_EVENT_TYPE.EDITABLEINPUT_CELL, (cell) => {
          if (!isTarget(cell.col, cell.row)) {
            return false;
          }
          if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
            isDisabledRecord(this.disabled, grid, cell.row)) {
            return false;
          }
          return true;
        }),
        grid.listen(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, (cell) => {
          if (!isTarget(cell.col, cell.row)) {
            return;
          }
          if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
            isDisabledRecord(this.disabled, grid, cell.row)) {
            return;
          }
          const range = grid.getCellRange(cell.col, cell.row);
          if (range.start.col !== range.end.col ||
            range.start.row !== range.end.row) {
            const { input } = cell;
            const baseRect = grid.getCellRect(cell.col, cell.row);
            const rangeRect = grid.getCellRangeRect(range);
            input.style.top = `${ (parseFloat(input.style.top) +
              (rangeRect.top - baseRect.top)).toFixed() }px`;
            input.style.left = `${ (parseFloat(input.style.left) +
              (rangeRect.left - baseRect.left)).toFixed() }px`;
            input.style.width = `${ rangeRect.width.toFixed() }px`;
            input.style.height = `${ rangeRect.height.toFixed() }px`;
          }
          this.onSetInputAttrsInternal(grid, {
            col: cell.col,
            row: cell.row
          }, cell.input);
        })
      ];
    }

    onPasteCellRangeBox(grid, cell, value) {
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      grid.doChangeValue(cell.col, cell.row, () => value);
    }

    onDeleteCellRangeBox(grid, cell) {
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      grid.doChangeValue(cell.col, cell.row, () => '');
    }
  }

  class BaseActionInput extends BaseInputEditor {
    constructor(options = {}) {
      super(options);
      this._disableInput = options.disableInput || false;
      this._disableAction = options.disableAction || false;
      this._action = options.action;
    }

    get disableInput() {
      return this._disableInput;
    }

    set disableInput(disableInput) {
      this._disableInput = disableInput;
    }

    get disableAction() {
      return this._disableAction;
    }

    set disableAction(disableAction) {
      this._disableAction = disableAction;
    }

    get action() {
      return this._action;
    }

    set action(action) {
      this._action = action;
    }

    onBeforeKeydownInternal(grid, keyCode, e, cellId) {
      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      const sel = grid.selection.select;
      if (isReadOnlyRecord(this.readOnly, grid, sel.row) ||
        isDisabledRecord(this.disabled, grid, sel.row) ||
        !isTarget(sel.col, sel.row) ||
        !this._action ||
        this.isDisabledAction(grid, sel)) {
        return true;
      }
      if ((this.isDisabledInput(grid, sel) &&
        keyCode === KEY_ENTER &&
        !e.ctrlKey &&
        !e.metaKey) ||
        (keyCode === KEY_ENTER && (e.ctrlKey || e.metaKey))) {
        const record = grid.getRowRecord(sel.row);
        if (this._action) {
          this._action.apply(this, [
            record,
            {
              cell: {
                col: sel.col,
                row: sel.row
              },
              grid
            }
          ]);
          event.cancel(e);
          return false;
        }
      }
      return true;
    }

    bindGridEvent(grid, cellId) {
      const state = this.getState(grid);
      const action = (cell) => {
        if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
          isDisabledRecord(this.disabled, grid, cell.row) ||
          !this._action ||
          this.isDisabledAction(grid, cell)) {
          return;
        }
        if (state.mouseActive) {
          const record = grid.getRowRecord(cell.row);
          if (this._action) {
            this._action.apply(this, [
              record,
              {
                cell,
                grid
              }
            ]);
          }
        }
      };
      const mouseOut = (cell) => {
        delete state.mouseRelativePos;
        delete state.mouseActiveCell;
        delete state.mouseActive;
        const range = grid.getCellRange(cell.col, cell.row);
        grid.invalidateCellRange(range);
      };
      const mouseMove = (cell, event) => {
        if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
          isDisabledRecord(this.disabled, grid, cell.row) ||
          !this._action ||
          this.isDisabledAction(grid, cell)) {
          return false;
        }
        state.mouseRelativePos = grid._getMouseRelativePoint(event);
        state.mouseActiveCell = {
          col: cell.col,
          row: cell.row
        };
        const range = grid.getCellRange(cell.col, cell.row);
        grid.invalidateCellRange(range);
        return isDef(state.mouseActive) ? state.mouseActive : true;
      };
      let ids = super.bindGridEvent(grid, cellId);
      ids = ids.concat(bindCellClickAction$1(grid, cellId, {
        action,
        mouseMove,
        mouseOut,
        mouseOver: mouseMove
      }));
      return ids;
    }

    onInputCellInternal(grid, cell, inputValue) {
      if (this.isDisabledInput(grid, cell)) {
        return;
      }
      this.onActionInputCellInternal(grid, cell, inputValue);
    }

    onOpenCellInternal(grid, cell) {
      if (this.isDisabledInput(grid, cell)) {
        return;
      }
      this.onActionOpenCellInternal(grid, cell);
    }

    onActionInputCellInternal(grid, cell, inputValue) {
      throw new Error();
    }

    onActionOpenCellInternal(grid, cell) {
      throw new Error();
    }

    isDisabledInput(grid, cell) {
      return this.isDisabled(this._disableInput, grid, cell);
    }

    isDisabledAction(grid, cell) {
      return this.isDisabled(this._disableAction, grid, cell);
    }

    isDisabled(p, grid, cell) {
      let isDisabled = false;
      if (p) {
        if (typeof p === 'function') {
          const record = grid.getRowRecord(cell.row);
          if (p.apply(this, [
            record,
            {
              cell,
              grid
            }
          ])) {
            isDisabled = true;
          }
        } else {
          isDisabled = true;
        }
      }
      return isDisabled;
    }
  }

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
        throw new Error(`${ t }`);
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
  const raf = (isNode$1
    ? () => {
    }
    : window.requestAnimationFrame ||
    ((fn) => setTimeout(fn, 1)));

  function now() {
    return Date.now();
  }

  /**
   * <pre>
   * Animates.
   * </pre>
   * @param duration - animation time.
   * @param step - step
   * @param easing - easing
   * @returns Deferred object.
   */
  function animate(duration, step, easing) {
    const startedAt = now();
    const easingFn = easing == null
      ? EASINGS.easeInOut
      : typeof easing === 'string'
        ? EASINGS[easing]
        : easing;
    let canceledFlg = false;
    const createAnim = (resolve, reject) => {
      const anim = () => {
        const point = now() - startedAt;
        if (canceledFlg) {
          //cancel
          if (reject) {
            reject();
          }
        } else if (point >= duration) {
          //end
          step(1);
          if (resolve) {
            resolve(undefined);
          }
        } else {
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
      const result = new Promise((resolve, reject) => {
        const anim = createAnim(resolve, reject);
        step(0);
        anim();
      });
      result.cancel = cancel;
      return result;
    } else {
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

  class BaseCheckEditor extends Editor {
    constructor(options = {}) {
      super(options);
    }

    bindGridEvent(grid, cellId) {
      const state = this.getState(grid);
      const action = (cell) => {
        const range = grid.getCellRange(cell.col, cell.row);
        const cellKey = `${ range.start.col }:${ range.start.row }`;
        if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
          isDisabledRecord(this.disabled, grid, cell.row) ||
          state.block[cellKey]) {
          return;
        }
        const ret = grid.doChangeValue(cell.col, cell.row, toggleValue);
        if (ret) {
          const onChange = () => {
            // checkbox animation
            animate(200, (point) => {
              if (point === 1) {
                delete state.elapsed[cellKey];
              } else {
                state.elapsed[cellKey] = point;
              }
              grid.invalidateCellRange(range);
            });
          };
          if (isPromise(ret)) {
            state.block[cellKey] = true;
            ret.then(() => {
              delete state.block[cellKey];
              onChange();
            });
          } else {
            onChange();
          }
        }
      };

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      return [
        ...bindCellClickAction$1(grid, cellId, {
          action,
          mouseMove: (e) => {
            if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
              isDisabledRecord(this.disabled, grid, e.row)) {
              return false;
            } else {
              return true;
            }
          },
          mouseOver: (e) => {
            if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
              isDisabledRecord(this.disabled, grid, e.row)) {
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
        ...bindCellKeyAction$1(grid, cellId, {
          action: (e) => {
            const selRange = grid.selection.range;
            const col = grid.selection.select.col;
            for (let row = selRange.start.row; row <= selRange.end.row; row++) {
              if (!isTarget(col, row)) {
                continue;
              }
              action({
                col,
                row
              });
            }
          },
          acceptKeys: [KEY_ENTER, KEY_SPACE]
        }),
        // paste value
        grid.listen(DG_EVENT_TYPE.PASTE_CELL, (e) => {
          if (e.multi) {
            // ignore multi cell values
            return;
          }
          const selectionRange = grid.selection.range;
          if (!cellEquals(selectionRange.start, selectionRange.end)) {
            // ignore multi paste values
            return;
          }
          if (!isTarget(e.col, e.row)) {
            return;
          }
          const pasteValue = e.normalizeValue.trim();
          grid.doGetCellValue(e.col, e.row, (value) => {
            const newValue = toggleValue(value);
            if (`${ newValue }`.trim() === pasteValue) {
              event.cancel(e.event);
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
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      const pasteValue = value.trim();
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        const newValue = toggleValue(value);
        if (`${ newValue }`.trim() === pasteValue) {
          grid.doChangeValue(cell.col, cell.row, toggleValue);
        }
      });
    }

    onDeleteCellRangeBox() {
      // noop
    }
  }

  const BUTTON_COLUMN_STATE_ID$2 = getButtonColumnStateId();

  class ButtonAction extends Action {
    constructor(options = {}) {
      super(options);
    }

    getState(grid) {
      if (!grid[BUTTON_COLUMN_STATE_ID$2]) {
        obj.setReadonly(grid, BUTTON_COLUMN_STATE_ID$2, {});
      }
      return grid[BUTTON_COLUMN_STATE_ID$2];
    }
  }

  const CHECK_COLUMN_STATE_ID$1 = getCheckColumnStateId();

  class CheckEditor extends BaseCheckEditor {
    clone() {
      return new CheckEditor(this);
    }

    getState(grid) {
      let state = grid[CHECK_COLUMN_STATE_ID$1];
      if (!state) {
        state = { block: {}, elapsed: {} };
        obj.setReadonly(grid, CHECK_COLUMN_STATE_ID$1, state);
      }
      return state;
    }
  }

  const SWITCH_COLUMN_STATE_ID$1 = getSwitchColumnStateId();

  class SwitchEditor extends BaseCheckEditor {
    clone() {
      return new SwitchEditor(this);
    }

    getState(grid) {
      let state = grid[SWITCH_COLUMN_STATE_ID$1];
      if (!state) {
        state = { block: {}, elapsed: {} };
        obj.setReadonly(grid, SWITCH_COLUMN_STATE_ID$1, state);
      }
      return state;
    }
  }

  function createElement(tagName, { classList, text, html } = {}) {
    const element = document.createElement(tagName);
    if (classList) {
      if (Array.isArray(classList)) {
        element.classList.add(...classList);
      } else {
        element.classList.add(classList);
      }
    }
    if (text) {
      element.textContent = text;
    } else if (html) {
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
    el.dataset.disableBeforeTabIndex = `${ el.tabIndex }`;
    el.tabIndex = -1;
    Array.prototype.slice
      .call(el.children || el.childNodes, 0)
      .forEach(disableFocus);
  }

  function isFocusable(el) {
    return (isDef(el.tabIndex) && el.tabIndex > -1);
  }

  function findPrevSiblingFocusable(el) {
    let n = el.previousSibling;
    while (n && !isFocusable(n)) {
      n = n.previousSibling;
    }
    return n;
  }

  function findNextSiblingFocusable(el) {
    let n = el.nextSibling;
    while (n && !isFocusable(n)) {
      n = n.nextSibling;
    }
    return n;
  }

  let eventHandlerNextId = 1;

  class EventHandler {
    constructor() {
      this._listeners = {};
    }

    on(target, type, listener, ...options) {
      if (target.addEventListener) {
        target.addEventListener(type, listener, ...options);
      }
      const obj = {
        target,
        type,
        listener,
        options
      };
      const id = eventHandlerNextId++;
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
        each(this._listeners, (obj) => {
          if (obj.target === target && obj.type === type) {
            if (obj.target.removeEventListener) {
              obj.target.removeEventListener(obj.type, obj.listener, ...obj.options);
            }
            list.push(obj);
          }
        });
        call();
      } finally {
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

    fire(target, type, ...args) {
      each(this._listeners, (obj) => {
        if (obj.target === target && obj.type === type) {
          obj.listener.call(obj.target, ...args);
        }
      });
    }

    hasListener(target, type) {
      let result = false;
      each(this._listeners, (obj) => {
        if (obj.target === target && obj.type === type) {
          result = true;
        }
      });
      return result;
    }

    clear() {
      each(this._listeners, (obj) => {
        if (obj.target.removeEventListener) {
          obj.target.removeEventListener(obj.type, obj.listener, ...obj.options);
        }
      });
      this._listeners = {};
    }

    dispose() {
      this.clear();
    }
  }

  var styleCss = '/**\n * core styles \n */\n.kaka-grid .grid-scrollable {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.kaka-grid .grid-scroll-end-point {\n  position: relative;\n  opacity: 0;\n}\n.kaka-grid {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.kaka-grid > canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n}\n.kaka-grid .grid-focus-control {\n  position: relative !important;\n  width: 1px;\n  height: 1px;\n  opacity: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  box-sizing: border-box;\n  pointer-events: none;\n  max-width: 0;\n  max-height: 0;\n  float: none !important;\n}\n.kaka-grid input.grid-focus-control::-ms-clear {\n  visibility: hidden;\n}\n.kaka-grid input.grid-focus-control.composition {\n  opacity: 1;\n  max-width: none;\n  max-height: none;\n}\n';

  function styleInject(id, css) {
    if (css && typeof document !== 'undefined') {
      let styleElement;
      if (id) {
        const el = document.getElementById(id);
        if (el instanceof HTMLStyleElement) {
          styleElement = el;
        }
      }
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = id;
        const headElement = document.head || document.getElementsByTagName('head')[0];
        headElement.appendChild(styleElement);
      }
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
      } else {
        styleElement.innerHTML = '';
        styleElement.appendChild(document.createTextNode(css));
      }
    }
  }

  function getScrollBarWidth() {
    // https://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }
    document.body.removeChild(outer);
    return w1 - w2;
  }

  let SCROLLBAR_SIZE = 0;
  const hasMusselScrollbar = () => {
    var _a;
    return !!((_a = window.mussel) === null || _a === void 0 ? void 0 : _a.scrollbar);
  };
  const hasPerfectScrollbar = () => !!window.PerfectScrollbar;
  const initDocument = () => {
    let css = styleCss;
    if (hasMusselScrollbar() || hasPerfectScrollbar()) {
      css += `
      .kaka-grid .grid-scroll-end-point {
        width: 1px;
        height: 1px;
      }`;
    } else {
      SCROLLBAR_SIZE = getScrollBarWidth() || 10;
      css += `
      .kaka-grid .grid-scrollable {
        overflow: scroll;
      }
      .kaka-grid .grid-scroll-end-point {
        width: ${ SCROLLBAR_SIZE }px;
        height: ${ SCROLLBAR_SIZE }px;
      }
      .kaka-grid > canvas {
        width: -webkit-calc(100% - ${ SCROLLBAR_SIZE }px);
        width: calc(100% - ${ SCROLLBAR_SIZE }px);
        height: -webkit-calc(100% - ${ SCROLLBAR_SIZE }px);
        height: calc(100% - ${ SCROLLBAR_SIZE }px);
      }`;
    }
    styleInject('style', css);
  };
  const style$2 = {
    initDocument() {
      style$2.initDocument = () => {
        // nothing
      };
      initDocument();
    },
    getScrollBarSize() {
      return SCROLLBAR_SIZE;
    },
    inject: styleInject,
    hasMusselScrollbar,
    hasPerfectScrollbar
  };

  var inlineInputElementCss = '.kaka-grid__inline-input::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-input {\n  position: absolute;\n  box-sizing: border-box;\n  background-color: transparent;\n  padding: 0;\n  border: none;\n}\n';

  function setInputValue(input, value) {
    const sign = input.type === 'number' && value === '-';
    if (sign) {
      // When `type="number"`, the minus sign is not accepted, so change it to `type="text"` once.
      input.type = '';
      let handler = new EventHandler();
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
    input.value = value !== null && value !== void 0 ? value : '';
  }

  const INLINE_EDITING_STATE_ID = getInlineEditingStateId();

  function getInlineEditingState(grid) {
    let state = grid[INLINE_EDITING_STATE_ID];
    if (!state) {
      state = {};
      obj.setReadonly(grid, INLINE_EDITING_STATE_ID, state);
    }
    return state;
  }

  function toBoolean(val) {
    if (typeof val === 'string') {
      if (val === 'false') {
        return false;
      } else if (val === 'off') {
        return false;
      } else if (/^0+$/.exec(val)) {
        return false;
      }
    }
    return Boolean(val);
  }

  const CLASSNAME_IIE = 'kaka-grid__inline-input';

  function createInputElement$1() {
    style$2.inject('inlineInputElement', inlineInputElementCss);
    return createElement('input', { classList: CLASSNAME_IIE });
  }

  const INPUT_EDITOR_TYPE = 'editor_type';
  const BEFORE_INPUT_VALUE = 'before_value';

  function setInlineInputValue(type = '', input, value, inputValue) {
    input.dataset[INPUT_EDITOR_TYPE] = type;
    if (type === 'date') {
      if (value instanceof Date) {
        if (input.type === 'text') {
          input.value = value.toJSON().slice(0, 10);
        } else {
          input.valueAsDate = value;
        }
      } else {
        input.value = '';
      }
    } else if (type === 'number') {
      if (typeof value === 'number' || typeof value === 'string') {
        input.value = String(value);
      } else {
        input.value = '';
      }
    } else if (isDef(value)) {
      input.value = value;
    } else {
      input.value = '';
    }
    input.dataset[BEFORE_INPUT_VALUE] = input.value;
    if (inputValue) {
      setInputValue(input, inputValue);
    }
  }

  function getInlineInputValue(input) {
    let value;
    switch (input.dataset[INPUT_EDITOR_TYPE]) {
      case 'date':
        if (/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/.test(input.value)) {
          value = new Date(input.value);
        } else {
          value = null;
        }
        break;
      case 'number':
        value = input.value ? Number(input.value) : null;
        if (isNaN(value)) {
          value = null;
        }
        break;
      default:
        value = input.value;
        break;
    }
    return value;
  }

  function isInputValueChanged(input) {
    return input.value !== input.dataset[BEFORE_INPUT_VALUE];
  }

  function setInputAttrs$1(editor, _grid, input, fixedType) {
    const { classList, type } = editor;
    if (classList) {
      input.classList.add(...classList);
    }
    try {
      input.type = fixedType || type || '';
    } catch (e) {
      input.type = '';
    }
  }

  class InlineInputElement {
    constructor() {
      this._enabledMouseWheel = false;
      this._handler = new EventHandler();
      this._input = createInputElement$1();
      this._bindInputEvents();
    }

    static setInputAttrs(editor, grid, input, fixedType) {
      setInputAttrs$1(editor, grid, input, fixedType);
    }

    dispose() {
      var _a;
      const input = this._input;
      this.detach();
      this._handler.dispose();
      this._beforePropEditor = null;
      (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    }

    attach(grid, editor, col, row, value, inputValue) {
      const input = this._input;
      this._enabledMouseWheel = editor.enabledMouseWheel;
      if (input.parentElement) {
        // 解决 chrome 下 Failed to execute 'appendChild' on 'Node': The node to be removed is no longer a child of this node. Perhaps it was moved in a 'blur' event handler? 问题
        // 问题原因：
        //  正在输入的时候，双击其他单元格，正常情况要先触发 blur 再执行此方法，但 chrome 有时会延后执行 blur
        //  element.appendChild(input) 执行此行代码的过程中会执行 blur 事件内容，导致此错误
        // 解决办法：
        //  如果发现 blur 还没有执行，则不执行此方法
        return;
      }
      const handler = this._handler;
      if (this._beforePropEditor) {
        const { classList } = this._beforePropEditor;
        if (classList) {
          input.classList.remove(...classList);
        }
      }
      input.style.font = grid.font || '16px sans-serif';
      const { element, rect, padding } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      input.style.top = `${ rect.top.toFixed() }px`;
      input.style.left = `${ rect.left.toFixed() }px`;
      input.style.width = `${ rect.width.toFixed() }px`;
      input.style.height = `${ rect.height.toFixed() }px`;
      input.style.paddingTop = `${ padding[0] }px`;
      input.style.paddingRight = `${ padding[1] }px`;
      input.style.paddingBottom = `${ padding[2] }px`;
      input.style.paddingLeft = `${ padding[3] }px`;
      element.appendChild(input);
      setInputAttrs$1(editor, grid, input);
      setInlineInputValue(editor.type, input, value, inputValue);
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
        } catch (e) {
          // ignore
        }
        if (document.selection) {
          const range = input.createTextRange();
          range.collapse();
          range.moveEnd('character', end);
          range.moveStart('character', end);
          range.select();
        }
      };
      const safeInputFocus = () => {
        handler.tryWithOffEvents(input, 'blur', () => {
          focus();
        });
        const state = getInlineEditingState(grid);
        state.cellRange = grid.getCellRange(col, row);
        grid.invalidateCellRange(state.cellRange);
      };
      this._attaching = true;
      setTimeout(() => {
        safeInputFocus();
        this._attaching = false;
      });
    }

    detach(gridFocus) {
      if (this._isActive()) {
        const activeData = this._activeData;
        const grid = activeData.grid;
        const col = activeData.col;
        const row = activeData.row;
        const input = this._input;
        this._handler.tryWithOffEvents(input, 'blur', () => {
          if (input.parentElement) {
            input.parentElement.removeChild(input);
          }
        });
        const state = getInlineEditingState(grid);
        delete state.cellRange;
        const range = grid.getCellRange(col, row);
        grid.invalidateCellRange(range);
        if (gridFocus) {
          grid.focus();
        }
      }
      delete this._activeData;
      this._enabledMouseWheel = false;
    }

    doChangeValue() {
      if (!this._isActive()) {
        return;
      }
      if (isInputValueChanged(this._input)) {
        const value = getInlineInputValue(this._input);
        const activeData = this._activeData;
        const grid = activeData.grid;
        const col = activeData.col;
        const row = activeData.row;
        grid.doChangeValue(col, row, () => value);
      }
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
      const stopPropagationOnly = (e) => e.stopPropagation(); // 终止事件传播
      handler.on(input, 'click', stopPropagationOnly);
      handler.on(input, 'mousedown', stopPropagationOnly);
      handler.on(input, 'touchstart', stopPropagationOnly);
      handler.on(input, 'dblclick', stopPropagationOnly);
      handler.on(input, 'mousewheel', (e) => {
        if (!this._enabledMouseWheel) {
          e.preventDefault();
        }
      });
      handler.on(input, 'compositionstart', (e) => {
        input.classList.add('composition');
      });
      handler.on(input, 'compositionend', (e) => {
        input.classList.remove('composition');
      });
      handler.on(input, 'keydown', (e) => {
        if (input.classList.contains('composition')) {
          return;
        }
        const keyCode = event.getKeyCode(e);
        if (keyCode === KEY_ESC) {
          this.detach(true);
          event.cancel(e);
        } else if (keyCode === KEY_ENTER) {
          this._onKeydownEnter(e);
        } else if (keyCode === KEY_TAB) {
          this._onKeydownTab(e);
        }
      });
      handler.on(input, 'blur', (e) => {
        this.doChangeValue();
        this.detach();
      });
    }

    _onKeydownEnter(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      this.doChangeValue();
      this.detach(true);
      event.cancel(e);
      if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
        grid.onKeyDownMove(e);
      }
    }

    _onKeydownTab(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
        return;
      }
      this.doChangeValue();
      this.detach(true);
      grid.onKeyDownMove(e);
    }
  }

  const INLINE_INPUT_EDITOR_STATE_ID$4 = getInlineInputEditorStateId();
  let globalInlineInputElement = null;
  let globalInlineInputBindGridCount$1 = 0;

  function attachInput$1(grid, cell, editor, value, inputValue) {
    if (!globalInlineInputElement) {
      globalInlineInputElement = new InlineInputElement();
    }
    const state = editor.getState(grid);
    if (!state.element) {
      state.element = globalInlineInputElement;
      globalInlineInputBindGridCount$1++;
      grid.addDisposable({
        dispose() {
          globalInlineInputBindGridCount$1--;
          if (!globalInlineInputBindGridCount$1 && globalInlineInputElement) {
            globalInlineInputElement.dispose();
            globalInlineInputElement = null;
          }
        }
      });
    }
    globalInlineInputElement.attach(grid, editor, cell.col, cell.row, value, inputValue);
  }

  function detachInput$1(gridFocus) {
    if (globalInlineInputElement) {
      globalInlineInputElement.detach(gridFocus);
    }
  }

  function doChangeValue$1(_grid) {
    if (globalInlineInputElement) {
      globalInlineInputElement.doChangeValue();
    }
  }

  class InlineInputEditor extends BaseActionInput {
    constructor(options = {}) {
      super(options);
      this._classList = options.classList;
      this._type = options.type;
      this._enabledMouseWheel = !!options.enabledMouseWheel;
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

    get enabledMouseWheel() {
      return this._enabledMouseWheel;
    }

    set enabledMouseWheel(enabled) {
      this._enabledMouseWheel = enabled;
    }

    clone() {
      return new InlineInputEditor(this);
    }

    onActionInputCellInternal(grid, cell, inputValue) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachInput$1(grid, cell, this, value, inputValue);
      });
    }

    onActionOpenCellInternal(grid, cell) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachInput$1(grid, cell, this, value);
      });
    }

    onChangeSelectCellInternal(grid, _cell, _selected) {
      doChangeValue$1();
      detachInput$1();
    }

    onGridScrollInternal(grid) {
      doChangeValue$1();
      detachInput$1(true);
    }

    onChangeDisabledInternal() {
      // cancel input
      detachInput$1(true);
    }

    onChangeReadOnlyInternal() {
      // cancel input
      detachInput$1(true);
    }

    onSetInputAttrsInternal(grid, _cell, input) {
      InlineInputElement.setInputAttrs(this, grid, input, 'text');
    }

    getState(grid) {
      if (!grid[INLINE_INPUT_EDITOR_STATE_ID$4]) {
        obj.setReadonly(grid, INLINE_INPUT_EDITOR_STATE_ID$4, {});
      }
      return grid[INLINE_INPUT_EDITOR_STATE_ID$4];
    }
  }

  var InlineLookupElementCss = '.kaka-grid__inline-lookup__input::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-lookup__input {\n  box-sizing: border-box;\n  background-color: transparent;\n  padding: 0;\n  border: none;\n}\n\n.kaka-grid__inline-lookup__dropdown {\n  position: absolute;\n  color: rgba(0, 0, 0, 0.87);\n  box-sizing: content-box;\n  margin: 0;\n  padding: 8px 0;\n  background-color: #fafafa;\n  list-style-type: none;\n  border-radius: 2px;\n  /* max-height: calc(50vh - 40px); */\n  overflow-y: auto;\n  min-width: 100%;\n}\n\n.kaka-grid__inline-lookup__dropdown--hidden {\n  transform: scale(0.9);\n  box-shadow: none;\n  opacity: 0;\n  pointer-events: none;\n  transition: all 50ms ease-out;\n}\n\n.kaka-grid__inline-lookup__dropdown--hidden * {\n  pointer-events: none;\n}\n\n.kaka-grid__inline-lookup__dropdown--shown {\n  transform: translateY(2px);\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  opacity: 1;\n  /* transition: all 150ms ease-out; */\n}\n.kaka-grid__inline-lookup__dropdown--shown.kaka-grid__inline-lookup__dropdown--right {\n  right: 0px;\n}\n.kaka-grid__inline-lookup__dropdown--shown.kaka-grid__inline-lookup__dropdown--bottom {\n  bottom: 100%;\n  transform: translateY(-2px);\n  box-shadow: 0 -3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 -2px 2px 0px rgba(0, 0, 0, 0.14), 0 -1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n.kaka-grid__inline-lookup__dropdown-item {\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  outline: none;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  padding: 0 16px;\n}\n\n.kaka-grid__inline-lookup__dropdown-item--empty {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.kaka-grid__inline-lookup__dropdown-item::before {\n  content: \'\';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background-color: #000;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 15ms linear;\n}\n\n.kaka-grid__inline-lookup__dropdown-item:hover::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-lookup__dropdown-item[data-select]::before {\n  opacity: 0.12;\n}\n\n.kaka-grid__inline-lookup {\n  position: absolute;\n}\n';

  const CLASSNAME_ILE = 'kaka-grid__inline-lookup';
  const INPUT_CLASSNAME_ILE = `${ CLASSNAME_ILE }__input`;
  const DROPDOWN_CLASSNAME_ILE = `${ CLASSNAME_ILE }__dropdown`;
  const DROPDOWN_HIDDEN_CLASSNAME_ILE = `${ DROPDOWN_CLASSNAME_ILE }--hidden`;
  const DROPDOWN_SHOWN_CLASSNAME_ILE = `${ DROPDOWN_CLASSNAME_ILE }--shown`;
  const DROPDOWN_RIGHT_CLASSNAME_ILE = `${ DROPDOWN_CLASSNAME_ILE }--right`;
  const DROPDOWN_BOTTOM_CLASSNAME_ILE = `${ DROPDOWN_CLASSNAME_ILE }--bottom`;
  const DROPDOWN_ITEM_CLASSNAME_ILE = `${ DROPDOWN_CLASSNAME_ILE }-item`;
  const DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE = `${ DROPDOWN_ITEM_CLASSNAME_ILE }--empty`;
  const DROPDOWN_ITEM_OTHER_CLASSNAME_ILE = `${ DROPDOWN_ITEM_CLASSNAME_ILE }--other`;
  const DROPDOWN_ITEM_FIRST_CLASSNAME_ILE = `${ DROPDOWN_ITEM_CLASSNAME_ILE }--first`;
  const DEFAULT_DROPDOWN_VALUE_FIELD = 'id';

  function highlight(data, search) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
    const s = (search + '').replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
    return s ? data.replace(new RegExp('(' + s + ')', 'gi'), '<b>$1</b>') : data;
  }

  function createLookupElement() {
    style$2.inject('InlineLookupElement', InlineLookupElementCss);
    const element = createElement('div', { classList: CLASSNAME_ILE });
    const input = createElement('input', { classList: INPUT_CLASSNAME_ILE });
    const ul = createElement('ul', { classList: DROPDOWN_CLASSNAME_ILE });
    ul.tabIndex = -1;
    element.appendChild(input);
    element.appendChild(ul);
    return element;
  }

  const LOOKUP_BEFORE_VALUE = 'before_value';
  const LOOKUP_SELECT_VALUE = 'select_value';
  const LOOKUP_VALUE_TYPE = 'value_type';

  function setLookupInputValue(type, input, value, captionValue, inputValue) {
    input.value = captionValue;
    input.dataset[LOOKUP_VALUE_TYPE] = type;
    input.dataset[LOOKUP_BEFORE_VALUE] = JSON.stringify(value);
    input.dataset[LOOKUP_SELECT_VALUE] = JSON.stringify(value);
    if (inputValue) {
      input.value = inputValue;
    }
  }

  function getLookupInputValue(input) {
    let value = JSON.parse(input.dataset[LOOKUP_SELECT_VALUE] || 'null');
    if (input.dataset[LOOKUP_VALUE_TYPE] === 'number' && isDef(value)) {
      value = value - 0;
      if (isNaN(value)) {
        value = null;
      }
    }
    return value;
  }

  function isLookupInputValueChanged(input) {
    return (input.dataset[LOOKUP_BEFORE_VALUE] !== input.dataset[LOOKUP_SELECT_VALUE]);
  }

  function findDropdownItemParents(target) {
    let el = target;
    while (!el.classList.contains(DROPDOWN_ITEM_CLASSNAME_ILE)) {
      el = el.parentElement;
      if (!el || el.classList.contains(DROPDOWN_CLASSNAME_ILE)) {
        return undefined;
      }
    }
    return el;
  }

  class InlineLookupElement {
    constructor() {
      this._attaching = false;
      this._handler = new EventHandler();
      this._lookup = createLookupElement();
      this._input = this._lookup.querySelector(`.${ INPUT_CLASSNAME_ILE }`);
      this._dropdown = this._lookup.querySelector(`.${ DROPDOWN_CLASSNAME_ILE }`);
      this._bindInputEvents();
    }

    static setInputAttrs(_editor, _grid, input) {
      input.type = 'text';
    }

    dispose() {
      var _a;
      const lookup = this._lookup;
      this.detach();
      this._handler.dispose();
      this._beforePropEditor = null;
      (_a = lookup.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(lookup);
    }

    attach(grid, editor, col, row, value, lookupRecords, inputValue) {
      const handler = this._handler;
      const lookup = this._lookup;
      const input = this._input;
      if (this._beforePropEditor) {
        this._unbindLookupProps(grid, lookup, input, this._beforePropEditor);
      }
      const { element, rect, padding } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      lookup.style.top = `${ rect.top.toFixed() }px`;
      lookup.style.left = `${ rect.left.toFixed() }px`;
      lookup.style.width = `${ rect.width.toFixed() }px`;
      lookup.style.height = `${ rect.height.toFixed() }px`;
      input.style.width = lookup.style.width;
      input.style.height = lookup.style.height;
      input.style.paddingTop = `${ padding[0] }px`;
      input.style.paddingRight = `${ padding[1] }px`;
      input.style.paddingBottom = `${ padding[2] }px`;
      input.style.paddingLeft = `${ padding[3] }px`;
      element.appendChild(lookup);
      input.style.font = grid.font || '16px sans-serif';
      const valueField = editor.valueField || DEFAULT_DROPDOWN_VALUE_FIELD;
      const captionField = editor.captionField || valueField;
      // 让 valueField 和 captionField 默认在 filterFields 中
      const filterFields = !isDefString(editor.filterFields) ||
      (Array.isArray(editor.filterFields) && editor.filterFields.length === 0)
        ? [valueField, captionField]
        : [];
      if (Array.isArray(editor.filterFields)) {
        editor.filterFields.forEach((field) => {
          if (filterFields.indexOf(field) < 0 && field) {
            filterFields.push(field);
          }
        });
      } else if (isDef(editor.filterFields) &&
        filterFields.indexOf(editor.filterFields) < 0 &&
        editor.filterFields) {
        filterFields.push(editor.filterFields);
      }
      const gridRecord = grid.getRowRecord(row);
      const records = [];
      let emptyRecord; // 找到表示空的记录
      let beforeRecord; // 找到上一个值对应的记录
      const filter = typeof editor.filter === 'function' ? editor.filter : () => true;
      for (const record of lookupRecords) {
        if (filter(record, gridRecord)) {
          records.push(record);
          if (!isDefString(record[valueField])) {
            emptyRecord = record;
            if (!isDefString(value)) {
              beforeRecord = record;
            }
          } else if (record[valueField] === value) {
            beforeRecord = record;
          }
        }
      }
      // 进入编辑状态时，输入框中显示 captionField 的值
      // 如果 captionField 没有值则显示 valueField 的值
      // 如果 valueField 为空，显示空格
      let captionValue = isDef(value) ? value + '' : '';
      if (beforeRecord) {
        if (beforeRecord !== emptyRecord) {
          captionValue = beforeRecord[captionField] + '' || captionValue;
        } else {
          captionValue = '';
        }
      }
      const allowOtherInput = getOrApply(editor.allowOtherInput, gridRecord);
      const activeData = {
        col,
        dropdownInfo: {
          allowOtherInput,
          beforeRecord: isDef(inputValue) ? undefined : beforeRecord,
          captionField,
          disableFilterRecords: editor.disableFilterRecords,
          disableFilterSort: editor.disableFilterSort,
          dropdownEmptyTemplate: editor.dropdownEmptyTemplate
            ? editor.dropdownEmptyTemplate
            : str.template`${ captionField }`,
          dropdownTemplate: editor.dropdownTemplate
            ? editor.dropdownTemplate
            : str.template`${ captionField }`,
          emptyRecord,
          filterFields,
          records,
          valueField,
          valueType: editor.valueType
        },
        editor,
        grid,
        row
      };
      setLookupInputValue(editor.valueType, input, value, captionValue, inputValue);
      this._onInputValue(input, activeData);
      this._bindLookupProps(grid, lookup, input, editor);
      this._activeData = activeData;
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
        } catch (e) {
          // ignore
        }
        if (document.selection) {
          const range = input.createTextRange();
          range.collapse();
          range.moveEnd('character', end);
          range.moveStart('character', end);
          range.select();
        }
      };
      const safeInputFocus = () => {
        handler.tryWithOffEvents(input, 'blur', () => {
          focus();
        });
        const state = getInlineEditingState(grid);
        state.cellRange = grid.getCellRange(col, row);
        grid.invalidateCellRange(state.cellRange);
      };
      this._attaching = true;
      setTimeout(() => {
        safeInputFocus();
        this._attaching = false;
      });
    }

    detach(gridFocus) {
      if (this._isActive()) {
        const lookup = this._lookup;
        const input = this._input;
        this._handler.tryWithOffEvents(input, 'blur', () => {
          if (lookup.parentElement) {
            this._onInputValue(input);
            lookup.parentElement.removeChild(lookup);
          }
        });
        const { grid, col, row } = this._activeData;
        const state = getInlineEditingState(grid);
        delete state.cellRange;
        const range = grid.getCellRange(col, row);
        grid.invalidateCellRange(range);
        if (gridFocus) {
          grid.focus();
        }
      }
      delete this._beforeValue;
      delete this._activeData;
    }

    doChangeValue(changeOnlyWhenAllowOtherInput) {
      if (!this._isActive()) {
        return;
      }
      if (changeOnlyWhenAllowOtherInput &&
        this._activeData &&
        !this._activeData.dropdownInfo.allowOtherInput) {
        return;
      }
      if (isLookupInputValueChanged(this._input)) {
        const value = getLookupInputValue(this._input);
        const { grid, col, row } = this._activeData;
        grid.doChangeValue(col, row, () => value);
      }
    }

    _isActive() {
      const lookup = this._lookup;
      if (!lookup || !lookup.parentElement) {
        return false;
      }
      if (!this._activeData) {
        return false;
      }
      return true;
    }

    _bindInputEvents() {
      const handler = this._handler;
      const dropdown = this._dropdown;
      const input = this._input;
      const stopPropagationOnly = (e) => e.stopPropagation(); // 终止事件传播
      handler.on(input, 'click', stopPropagationOnly);
      handler.on(input, 'mousedown', stopPropagationOnly);
      handler.on(input, 'touchstart', stopPropagationOnly);
      handler.on(input, 'dblclick', stopPropagationOnly);
      handler.on(dropdown, 'mousedown', stopPropagationOnly);
      handler.on(dropdown, 'touchstart', stopPropagationOnly);
      handler.on(dropdown, 'dblclick', stopPropagationOnly);
      handler.on(dropdown, 'click', (e) => {
        e.stopPropagation();
        const item = findDropdownItemParents(e.target);
        if (item) {
          this._selectNode(item);
          this.doChangeValue();
          this.detach(true);
        } else {
          this._input.focus();
        }
      });
      handler.on(input, 'compositionstart', (e) => {
        input.classList.add('composition');
      });
      handler.on(input, 'compositionend', (e) => {
        input.classList.remove('composition');
        this._onInputValue(input);
      });
      const onKeyupAndPress = (e) => {
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
        const keyCode = event.getKeyCode(e);
        if (keyCode === KEY_ESC) {
          this.detach(true);
          event.cancel(e);
        } else if (keyCode === KEY_ENTER) {
          this._onKeydownEnter(e);
        } else if (keyCode === KEY_TAB) {
          this._onKeydownTab(e);
        } else if (keyCode === KEY_UP) {
          const n = this._dropdown.querySelector('[data-select=true]');
          if (n) {
            this._selectNode(n, false);
            let next = findPrevSiblingFocusable(n);
            if (!next) {
              const items = this._dropdown.querySelectorAll(`.${ DROPDOWN_ITEM_CLASSNAME_ILE }`);
              next = items[items.length - 1];
              if (!isFocusable(next)) {
                next = findPrevSiblingFocusable(next);
              }
            }
            if (next) {
              this._selectNode(next);
              event.cancel(e);
            }
          }
        } else if (keyCode === KEY_DOWN) {
          const n = this._dropdown.querySelector('[data-select=true]');
          if (n) {
            this._selectNode(n, false);
            let next = findNextSiblingFocusable(n);
            if (!next) {
              next = this._dropdown.querySelector(`.${ DROPDOWN_ITEM_CLASSNAME_ILE }`);
              if (!isFocusable(next)) {
                next = findNextSiblingFocusable(next);
              }
            }
            if (next) {
              this._selectNode(next);
              event.cancel(e);
            }
          }
        } else {
          this._onInputValue(input);
        }
      });
      handler.on(input, 'blur', () => setTimeout(() => this.detach(), 300));
    }

    _onKeydownEnter(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      this.doChangeValue();
      this.detach(true);
      if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
        grid.onKeyDownMove(e);
      } else {
        event.cancel(e);
      }
    }

    _onKeydownTab(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
        return;
      }
      this.doChangeValue();
      this.detach(true);
      grid.onKeyDownMove(e);
    }

    _onInputValue(input, activeData) {
      const before = this._beforeValue;
      const value = input.value;
      if (before !== value) {
        this._onInputValueChange(value, before, activeData);
      }
      this._beforeValue = value;
    }

    _onInputValueChange(after, before, activeData) {
      activeData = activeData || this._activeData;
      const grid = activeData.grid;
      const dropdownInfo = activeData.dropdownInfo;
      const isFirstChange = !isDef(before);
      // 过滤下拉数据
      const filterInfo = this._filterRecords(dropdownInfo.records, dropdownInfo.filterFields, after, dropdownInfo.valueField, dropdownInfo.disableFilterRecords, dropdownInfo.disableFilterSort, dropdownInfo.emptyRecord, isFirstChange ? dropdownInfo.beforeRecord : undefined);
      const isAll = filterInfo.isAll;
      const filterRecords = filterInfo.filterRecords;
      const itemNodes = [];
      let beforeNode;
      let firstMatchedNode;
      // 只在有输入内容时显示输入内容选项
      let isEmptyValue = false;
      if (dropdownInfo.allowOtherInput) {
        let saveValue = after;
        let displayValue = str.escape(after);
        if (dropdownInfo.valueType === 'number') {
          if (saveValue.trim()) {
            saveValue = Number(after);
            if (isNaN(saveValue)) {
              saveValue = null;
            }
          } else {
            saveValue = null;
          }
          if (saveValue === null) {
            displayValue = str.escape('<null>');
            isEmptyValue = true;
          }
        } else {
          if (!saveValue) {
            displayValue = str.escape('<Empty>');
            isEmptyValue = true;
          }
        }
        if ((dropdownInfo.valueType === 'number' &&
          (saveValue !== null ||
            (isAll && isEmptyValue && !dropdownInfo.emptyRecord))) ||
          (dropdownInfo.valueType !== 'number' &&
            (saveValue || (isEmptyValue && !dropdownInfo.emptyRecord)))) {
          const otherLi = createElement('li', {
            classList: [
              DROPDOWN_ITEM_CLASSNAME_ILE,
              isEmptyValue
                ? DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE
                : DROPDOWN_ITEM_OTHER_CLASSNAME_ILE
            ]
          });
          otherLi.tabIndex = 0;
          otherLi.dataset.value = JSON.stringify(saveValue);
          appendHtml(otherLi, displayValue);
          itemNodes.push(otherLi);
        }
      }
      if (itemNodes.length === 0 || isEmptyValue || !isAll) {
        // 当 allowOtherInput === true 并"有非空输入内容"且"无匹配"时，不显示参照列表、只显示其他值
        // 显示过滤后的选项
        filterRecords.forEach((record) => {
          const classList = [DROPDOWN_ITEM_CLASSNAME_ILE];
          let html;
          if (record.__isEmpty) {
            classList.push(DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE);
            html = dropdownInfo.dropdownEmptyTemplate(record);
          } else {
            html = dropdownInfo.dropdownTemplate(record);
          }
          const li = createElement('li', {
            classList
          });
          if (record.__isBefore) {
            beforeNode = li;
          }
          if (!isDef(firstMatchedNode) && record.__isMatched) {
            firstMatchedNode = li;
          }
          li.tabIndex = 0;
          li.dataset.value = JSON.stringify(record.__value);
          appendHtml(li, html);
          itemNodes.push(li);
        });
      }
      empty(this._dropdown);
      const offset = this._dropdown.scrollHeight + 2;
      if (itemNodes.length > 0) {
        itemNodes[0].classList.add(DROPDOWN_ITEM_FIRST_CLASSNAME_ILE);
        let selectedNode;
        if (isFirstChange && dropdownInfo.beforeRecord && beforeNode) {
          selectedNode = beforeNode;
        } else if (firstMatchedNode) {
          selectedNode = firstMatchedNode;
        } else {
          selectedNode = itemNodes[0];
        }
        this._selectNode(selectedNode);
        this._dropdown.style.maxHeight = '';
        appendHtml(this._dropdown, itemNodes);
        // 确定下拉框显示位置
        if (this._lookup.offsetTop +
          this._lookup.offsetHeight +
          this._dropdown.offsetHeight >
          grid.getElement().clientHeight &&
          this._lookup.offsetTop >
          grid.getElement().clientHeight -
          this._lookup.offsetTop -
          this._lookup.offsetHeight) {
          // 上方显示
          this._dropdown.classList.add(DROPDOWN_BOTTOM_CLASSNAME_ILE);
          this._dropdown.style.maxHeight = this._lookup.offsetTop - offset + 'px';
        } else {
          // 下方显示
          this._dropdown.style.maxHeight =
            grid.getElement().clientHeight -
            this._lookup.offsetTop -
            this._lookup.offsetHeight -
            offset +
            'px';
          this._dropdown.classList.remove(DROPDOWN_BOTTOM_CLASSNAME_ILE);
        }
        if (this._lookup.offsetLeft +
          this._lookup.offsetWidth +
          this._dropdown.offsetWidth >
          grid.getElement().clientWidth &&
          this._lookup.offsetLeft >
          grid.getElement().clientWidth -
          this._lookup.offsetLeft -
          this._lookup.offsetWidth) {
          this._dropdown.classList.add(DROPDOWN_RIGHT_CLASSNAME_ILE);
        } else {
          this._dropdown.classList.remove(DROPDOWN_RIGHT_CLASSNAME_ILE);
        }
        this._dropdown.classList.remove(DROPDOWN_HIDDEN_CLASSNAME_ILE);
        this._dropdown.classList.add(DROPDOWN_SHOWN_CLASSNAME_ILE);
      } else {
        this._selectNode();
        this._dropdown.classList.remove(DROPDOWN_SHOWN_CLASSNAME_ILE);
        this._dropdown.classList.add(DROPDOWN_HIDDEN_CLASSNAME_ILE);
      }
    }

    _selectNode(node, isSelected) {
      if (node) {
        if (isSelected !== false) {
          node.dataset.select = 'true';
          this._input.dataset[LOOKUP_SELECT_VALUE] = node.dataset.value;
          // 滚动到可视位置
          if (node.parentElement) {
            if (node.offsetTop < node.parentElement.scrollTop) {
              node.parentElement.scrollTop = node.offsetTop;
            } else if (node.offsetTop + node.offsetHeight >
              node.parentElement.scrollTop + node.parentElement.clientHeight) {
              node.parentElement.scrollTop =
                node.offsetTop +
                node.offsetHeight -
                node.parentElement.clientHeight;
            }
          }
        } else {
          delete node.dataset.select;
          this._input.dataset[LOOKUP_SELECT_VALUE] = this._input.dataset[LOOKUP_BEFORE_VALUE];
        }
      } else {
        this._input.dataset[LOOKUP_SELECT_VALUE] = this._input.dataset[LOOKUP_BEFORE_VALUE];
      }
    }

    _filterRecords(records, filterFields, inputValue, valueField, disableFilterRecords, disableFilterSort, emptyRecord, beforeRecord) {
      const filterRecords = [];
      const allRecords = [];
      const otherRecords = [];
      records.forEach((record) => {
        const filterRecord = {};
        let matched = false;
        for (const key in record) {
          const value = isDef(record[key]) ? record[key] + '' : '';
          if (filterFields.indexOf(key) >= 0) {
            const matchValue = highlight(value, inputValue);
            filterRecord[key] = matchValue;
            matched = matched || matchValue !== value || !inputValue;
          } else {
            filterRecord[key] = value;
          }
        }
        filterRecord.__isMatched = matched;
        filterRecord.__value = record[valueField];
        filterRecord.__isBefore = beforeRecord === record;
        filterRecord.__isEmpty = emptyRecord === record;
        if (matched || filterRecord.__isBefore || disableFilterSort) {
          filterRecords.push(filterRecord);
        } else if (disableFilterRecords) {
          otherRecords.push(filterRecord);
        }
        allRecords.push(filterRecord);
      });
      const isAll = filterFields.length === 0 ||
        (!inputValue && !beforeRecord) ||
        filterRecords.length === 0;
      if (!isAll && disableFilterRecords) {
        for (const record of otherRecords) {
          filterRecords.push(record);
        }
      }
      return {
        filterRecords: isAll ? allRecords : filterRecords,
        isAll
      };
    }

    _bindLookupProps(grid, lookup, input, editor) {
      const classList = editor.classList;
      if (classList) {
        lookup.classList.add(...classList);
      }
      InlineLookupElement.setInputAttrs(editor, grid, input);
    }

    _unbindLookupProps(_grid, lookup, _input, editor) {
      const classList = editor.classList;
      if (classList) {
        lookup.classList.remove(...classList);
      }
    }
  }

  const INLINE_LOOKUP_EDITOR_STATE_ID$1 = getInlineLookupEditorStateId();
  let globalInlineLookupElement = null;
  let globalInlineLookupBindGridCount = 0;

  function attachLookupInput(grid, cell, editor, value, inputValue) {
    if (!globalInlineLookupElement) {
      globalInlineLookupElement = new InlineLookupElement();
    }
    const state = editor.getState(grid);
    if (!state.element) {
      state.element = globalInlineLookupElement;
      globalInlineLookupBindGridCount++;
      grid.addDisposable({
        dispose() {
          globalInlineLookupBindGridCount--;
          if (!globalInlineLookupBindGridCount && globalInlineLookupElement) {
            globalInlineLookupElement.dispose();
            globalInlineLookupElement = null;
          }
        }
      });
    }
    const records = getOrApply(editor.records || [], grid.getRowRecord(cell.row));
    if (isPromise(records)) {
      records.then((rs) => {
        if (globalInlineLookupElement) {
          globalInlineLookupElement.attach(grid, editor, cell.col, cell.row, value, rs, inputValue);
        }
      });
    } else {
      globalInlineLookupElement.attach(grid, editor, cell.col, cell.row, value, records, inputValue);
    }
  }

  function detachLookupInput(gridFocus) {
    if (globalInlineLookupElement) {
      globalInlineLookupElement.detach(gridFocus);
    }
  }

  function doChangeLookupValue() {
    if (globalInlineLookupElement) {
      globalInlineLookupElement.doChangeValue(true);
    }
  }

  class InlineLookupEditor extends BaseActionInput {
    constructor(options = {}) {
      super(options);
      this.action =
        this.action ||
        ((me) => (_record, data) => {
          if (isReadOnlyRecord(me.readOnly, data.grid, data.cell.row) ||
            isDisabledRecord(me.disabled, data.grid, data.cell.row)) {
            return;
          }
          me.onOpenCellInternal(data.grid, data.cell);
        })(this);
      this._classList = options.classList;
      this._records = options.records || [];
      this._valueField = options.valueField || '';
      this._valueType = options.valueType || 'string';
      this._captionField = options.captionField || '';
      this._filterFields = options.filterFields || '';
      this._allowOtherInput = options.allowOtherInput || false;
      this._disableFilterRecords = !!options.disableFilterRecords;
      this._disableFilterSort = !!options.disableFilterSort;
      if (isDef(options.disableDropdown)) {
        this.disableDropdown = !!options.disableDropdown;
      }
      this._filter = options.filter;
      this._dropdownTemplate = options.dropdownTemplate;
      this._dropdownEmptyTemplate = options.dropdownEmptyTemplate;
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

    get records() {
      return this._records;
    }

    set records(records) {
      this._records = records;
    }

    get valueField() {
      return this._valueField;
    }

    set valueField(valueField) {
      this._valueField = valueField;
    }

    get valueType() {
      return this._valueType;
    }

    set valueType(valueType) {
      this._valueType = valueType;
    }

    get captionField() {
      return this._captionField;
    }

    set captionField(captionField) {
      this._captionField = captionField;
    }

    get filterFields() {
      return this._filterFields;
    }

    set filterFields(filterFields) {
      this._filterFields = filterFields;
    }

    get allowOtherInput() {
      return this._allowOtherInput;
    }

    set allowOtherInput(allowOtherInput) {
      this._allowOtherInput = allowOtherInput || false;
    }

    get disableFilterRecords() {
      return this._disableFilterRecords;
    }

    set disableFilterRecords(disableFilterRecords) {
      this._disableFilterRecords = !!disableFilterRecords;
    }

    get disableFilterSort() {
      return this._disableFilterSort;
    }

    set disableFilterSort(disableFilterSort) {
      this._disableFilterSort = !!disableFilterSort;
    }

    get disableDropdown() {
      window.console.warn('\'disableDropdown\' is deprecated, please use \'disableInput\' instead');
      return !!this.disableInput;
    }

    set disableDropdown(disableDropdown) {
      window.console.warn('\'disableDropdown\' is deprecated, please use \'disableInput\' instead');
      this.disableInput = !!disableDropdown;
    }

    get filter() {
      return this._filter;
    }

    set filter(filter) {
      this._filter = filter;
    }

    get dropdownTemplate() {
      return this._dropdownTemplate;
    }

    set dropdownTemplate(dropdownTemplate) {
      this._dropdownTemplate = dropdownTemplate;
    }

    get dropdownEmptyTemplate() {
      return this._dropdownEmptyTemplate;
    }

    set dropdownEmptyTemplate(dropdownEmptyTemplate) {
      this._dropdownEmptyTemplate = dropdownEmptyTemplate;
    }

    clone() {
      return new InlineLookupEditor(this);
    }

    onActionInputCellInternal(grid, cell, inputValue) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachLookupInput(grid, cell, this, value, inputValue);
      });
    }

    onActionOpenCellInternal(grid, cell) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachLookupInput(grid, cell, this, value);
      });
    }

    onChangeSelectCellInternal(_grid, _cell, _selected) {
      // cancel input
      doChangeLookupValue();
      detachLookupInput();
    }

    onGridScrollInternal(grid) {
      // cancel input
      doChangeLookupValue();
      detachLookupInput(true);
    }

    onChangeDisabledInternal() {
      // cancel input
      detachLookupInput(true);
    }

    onChangeReadOnlyInternal() {
      // cancel input
      detachLookupInput(true);
    }

    onSetInputAttrsInternal(grid, _cell, input) {
      InlineLookupElement.setInputAttrs(this, grid, input);
    }

    bindGridEvent(grid, cellId) {
      const ids = super.bindGridEvent(grid, cellId);
      const detach = () => {
        doChangeLookupValue();
        detachLookupInput(true);
      };
      ids.push(grid.listen(DG_EVENT_TYPE.CLICK_UNDERLAY, detach));
      ids.push(grid.listen(DG_EVENT_TYPE.DBLCLICK_UNDERLAY, detach));
      ids.push(grid.listen(DG_EVENT_TYPE.DBLTAP_UNDERLAY, detach));
      return ids;
    }

    getState(grid) {
      if (!grid[INLINE_LOOKUP_EDITOR_STATE_ID$1]) {
        obj.setReadonly(grid, INLINE_LOOKUP_EDITOR_STATE_ID$1, {});
      }
      return grid[INLINE_LOOKUP_EDITOR_STATE_ID$1];
    }
  }

  function extend(a, b) {
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
   * @param options - menu options to given
   * @returns Normalized options
   */
  function normalize$1(options) {
    if (!options) {
      return [];
    }
    if (Array.isArray(options)) {
      return options.map((e) => extend(e, { label: e.caption || e.label }));
    }
    if (typeof options === 'string') {
      return normalize$1(JSON.parse(options));
    }
    const result = [];
    for (const k in options) {
      if (options.hasOwnProperty(k)) {
        result.push({
          label: options[k],
          value: k
        });
      }
    }
    return result;
  }

  /**
   * Normalize the given menu options.
   * @param options - menu options to given
   * @returns Normalized options
   */
  function normalizeToFn(options) {
    if (typeof options === 'function') {
      return (record) => normalize$1(options(record));
    }
    return () => normalize$1(options);
  }

  var menuItems = {
    normalize: normalize$1,
    normalizeToFn
  };

  var inlineMenuElementCss = '.kaka-grid__inline-menu {\n  position: absolute;\n  color: rgba(0, 0, 0, 0.87);\n  box-sizing: content-box;\n  margin: -1px auto auto -1px;\n  padding: 8px 0;\n  background-color: #fafafa;\n  list-style-type: none;\n  border-radius: 2px;\n  max-height: calc(100vh - 40px);\n  overflow-y: auto;\n  white-space: nowrap;\n}\n\n.kaka-grid__inline-menu--hidden {\n  transform: scale(0.9);\n  box-shadow: none;\n  opacity: 0;\n  pointer-events: none;\n  transition: all 50ms ease-out;\n}\n\n.kaka-grid__inline-menu--hidden * {\n  pointer-events: none;\n}\n\n.kaka-grid__inline-menu--shown {\n  transform: translateY(-7px);\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  opacity: 1;\n  transition: all 150ms ease-out;\n}\n\n.kaka-grid__inline-menu__menu-item {\n  height: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  outline: none;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  padding: 0 16px;\n}\n\n.kaka-grid__inline-menu__menu-item--empty {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.kaka-grid__inline-menu__menu-item::before {\n  content: \'\';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background-color: #000;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 15ms linear;\n}\n\n.kaka-grid__inline-menu__menu-item:hover::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-menu__menu-item[data-select]::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-menu__menu-item:focus::before {\n  opacity: 0.12;\n}\n';

  const CLASSNAME_IME = 'kaka-grid__inline-menu';
  const ITEM_CLASSNAME_IME = `${ CLASSNAME_IME }__menu-item`;
  const HIDDEN_CLASSNAME_IME = `${ CLASSNAME_IME }--hidden`;
  const SHOWN_CLASSNAME_IME = `${ CLASSNAME_IME }--shown`;
  const EMPTY_ITEM_CLASSNAME_IME = `${ ITEM_CLASSNAME_IME }--empty`;

  function findItemParents(target) {
    let el = target;
    while (!el.classList.contains(ITEM_CLASSNAME_IME)) {
      el = el.parentElement;
      if (!el || el.classList.contains(CLASSNAME_IME)) {
        return undefined;
      }
    }
    return el;
  }

  function createMenuElement() {
    style$2.inject('inlineMenuElement', inlineMenuElementCss);
    return createElement('ul', { classList: CLASSNAME_IME });
  }

  function attachElement(element, rect, menu, autoWidth) {
    menu.style.top = `${ rect.top.toFixed() }px`;
    menu.style.left = `${ rect.left.toFixed() }px`;
    menu.style.width = autoWidth ? '' : `${ rect.width.toFixed() }px`;
    menu.style.lineHeight = `${ rect.height.toFixed() }px`;
    element.appendChild(menu);
  }

  function optionToLi({ classList, label, value, html }, index) {
    const item = createElement('li', { classList: ITEM_CLASSNAME_IME });
    item.tabIndex = 0;
    item.setAttribute('data-value-index', index + '');
    if (classList) {
      item.classList.add(...(Array.isArray(classList) ? classList : [classList]));
    }
    if (label) {
      const span = createElement('span', { text: label });
      item.appendChild(span);
    } else if (html) {
      appendHtml(item, html);
    }
    if (value === '' || !isDef(value)) {
      item.classList.add(EMPTY_ITEM_CLASSNAME_IME);
    }
    return item;
  }

  function openMenu(grid, editor, col, row, value, options, menu) {
    const { classList } = editor;
    menu.classList.remove(SHOWN_CLASSNAME_IME);
    menu.classList.add(HIDDEN_CLASSNAME_IME);
    empty(menu);
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
      if (item.classList.contains(EMPTY_ITEM_CLASSNAME_IME)) {
        emptyItemEl = item;
      }
    });
    const focusEl = valueItemEl ||
      emptyItemEl ||
      (menu.children || menu.childNodes)[0];
    if (classList) {
      menu.classList.add(...classList);
    }
    const children = Array.prototype.slice.call(menu.children || menu.childNodes, 0);
    const focusIndex = children.indexOf(focusEl);
    const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
    // Cover the right line
    rect.width++;
    // append for calculation
    attachElement(element, rect, menu, editor.autoWidth);
    // Make the selection item at the middle
    let offset = 0;
    let allHeight = 0;
    for (let i = 0; i < children.length; i++) {
      const offsetHeight = children[i].offsetHeight;
      if (i < focusIndex) {
        offset += offsetHeight;
      }
      allHeight += offsetHeight;
    }
    rect.offsetTop(-offset);
    if (children[focusIndex]) {
      offset += Math.ceil(children[focusIndex].offsetHeight / 2);
    }
    menu.style.transformOrigin = `center ${ offset }px 0px`;
    attachElement(element, rect, menu, editor.autoWidth);
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
      attachElement(element, rect, menu, editor.autoWidth);
    }
    if (focusEl) {
      focusEl.focus();
    }
    menu.classList.remove(HIDDEN_CLASSNAME_IME);
    menu.classList.add(SHOWN_CLASSNAME_IME);
  }

  function closeMenu(_grid, _col, _row, menu) {
    menu.classList.remove(SHOWN_CLASSNAME_IME);
    menu.classList.add(HIDDEN_CLASSNAME_IME);
    disableFocus(menu);
  }

  class InlineMenuElement {
    constructor() {
      this._handler = new EventHandler();
      this._menu = createMenuElement();
      this._bindMenuEvents();
    }

    dispose() {
      var _a;
      const menu = this._menu;
      this.detach();
      this._handler.dispose();
      this._beforePropEditor = null;
      (_a = menu.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(menu);
    }

    attach(grid, editor, col, row, value, record) {
      const menu = this._menu;
      if (this._beforePropEditor) {
        const classList = this._beforePropEditor.classList;
        if (classList) {
          menu.classList.remove(...classList);
        }
      }
      const options = editor.options(record);
      openMenu(grid, editor, col, row, value, options, menu);
      // 当焦点离开菜单时，关闭菜单
      const owner = menu;
      for (let i = 0; i < menu.childNodes.length; i++) {
        const el = menu.childNodes[i];
        this._handler.on(el, 'focus', () => {
          owner._focus = true;
        });
        this._handler.on(el, 'blur', () => {
          owner._focus = false;
          setTimeout(() => {
            if (!owner._focus) {
              this.detach();
            }
          }, 0);
        });
      }
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

    _doChangeValue(valueIndex) {
      if (this._isActive() && valueIndex) {
        const { grid, col, row, options } = this._activeData;
        const option = options[parseInt(valueIndex, 10)];
        if (option) {
          const { value } = option;
          grid.doChangeValue(col, row, () => value);
        }
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
      const stopPropagationOnly = (e) => e.stopPropagation(); // 为了不在grid中传播
      handler.on(menu, 'mousedown', stopPropagationOnly);
      handler.on(menu, 'touchstart', stopPropagationOnly);
      handler.on(menu, 'dblclick', stopPropagationOnly);
      handler.on(menu, 'click', (e) => {
        e.stopPropagation();
        const item = findItemParents(e.target);
        if (!item) {
          return;
        }
        const valueIndex = item.getAttribute('data-value-index');
        this._doChangeValue(valueIndex);
        this.detach(true);
      });
      handler.on(menu, 'keydown', (e) => {
        const item = findItemParents(e.target);
        if (!item || !this._isActive()) {
          return;
        }
        const keyCode = event.getKeyCode(e);
        if (keyCode === KEY_ENTER) {
          this._onKeydownEnter(menu, item, e);
        } else if (keyCode === KEY_ESC) {
          this.detach(true);
          event.cancel(e);
        } else if (keyCode === KEY_UP) {
          const n = findPrevSiblingFocusable(item);
          if (n) {
            n.focus();
            event.cancel(e);
          }
        } else if (keyCode === KEY_DOWN) {
          const n = findNextSiblingFocusable(item);
          if (n) {
            n.focus();
            event.cancel(e);
          }
        } else if (keyCode === KEY_TAB) {
          this._onKeydownTab(menu, item, e);
        }
      });
    }

    _onKeydownEnter(_menu, item, e) {
      var _a;
      const grid = this._isActive() ? this._activeData.grid : null;
      const valueIndex = item.getAttribute('data-value-index');
      this._doChangeValue(valueIndex);
      this.detach(true);
      event.cancel(e);
      if (grid) {
        if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
          grid.onKeyDownMove(e);
        }
      }
    }

    _onKeydownTab(menu, item, e) {
      var _a;
      if (this._isActive()) {
        const { grid } = this._activeData;
        if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) {
          const valueIndex = item.getAttribute('data-value-index');
          this._doChangeValue(valueIndex || '');
          this.detach(true);
          grid.onKeyDownMove(e);
          return;
        }
      }
      if (!e.shiftKey) {
        if (!findNextSiblingFocusable(item)) {
          let n = menu.querySelector(`.${ ITEM_CLASSNAME_IME }`);
          if (!isFocusable(n)) {
            n = findNextSiblingFocusable(n);
          }
          if (n) {
            n.focus();
            event.cancel(e);
          }
        }
      } else {
        if (!findPrevSiblingFocusable(item)) {
          const items = menu.querySelectorAll(`.${ ITEM_CLASSNAME_IME }`);
          let n = items[items.length - 1];
          if (!isFocusable(n)) {
            n = findPrevSiblingFocusable(n);
          }
          if (n) {
            n.focus();
            event.cancel(e);
          }
        }
      }
    }
  }

  const ICON_PROP_KEYS = [
    'content',
    'font',
    'color',
    'className',
    'tagName',
    'isLiga',
    'width',
    'src',
    'svg',
    'name',
    'path'
  ];

  function quote(name) {
    const quoted = [];
    const split = name.split(/,\s*/);
    for (let i = 0; i < split.length; i++) {
      const part = split[i].replace(/['"]/g, '');
      if (part.indexOf(' ') === -1 && !/^\d/.test(part)) {
        quoted.push(part);
      } else {
        quoted.push(`'${ part }'`);
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
      if (content === 'none') {
        content = ''; // 解决部分IE11浏览器显示"none"的问题，并不是所有的IE11都有此问题，原因未知、暂无法解决
      }
      if (content.length >= 3 && (content[0] === '"' || content[0] === '\'')) {
        if (content[0] === content[content.length - 1]) {
          content = content.substr(1, content.length - 2);
        }
      }
      let font = beforeStyle.getPropertyValue('font');
      if (!font) {
        font = `${ beforeStyle.getPropertyValue('font-style') } ${ beforeStyle.getPropertyValue('font-variant') } ${ beforeStyle.getPropertyValue('font-weight') } ${ beforeStyle.getPropertyValue('font-size') }/${ beforeStyle.getPropertyValue('line-height') } ${ quote(beforeStyle.getPropertyValue('font-family')) }`;
      }
      const color = beforeStyle.getPropertyValue('color');
      const width = dom.clientWidth;
      const isLiga = (beforeStyle.getPropertyValue('font-feature-settings') || '').indexOf('liga') > -1;
      return (tagProps[className] = {
        color,
        content,
        font,
        isLiga,
        width
      });
    } finally {
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
    } else {
      for (let i = 0; i < count; i++) {
        result.push(prop);
      }
    }
    return result;
  }

  function toSimpleArray(iconProps) {
    if (!iconProps) {
      return iconProps;
    } else if (Array.isArray(iconProps)) {
      return iconProps;
    }
    const workData = {};
    let count = 0;
    ICON_PROP_KEYS.forEach((k) => {
      const prop = iconProps[k];
      if (prop) {
        if (Array.isArray(prop)) {
          count = Math.max(count, prop.length);
        } else {
          count = Math.max(count, 1);
        }
      }
    });
    ICON_PROP_KEYS.forEach((k) => {
      const arr = toPropArray(iconProps[k], count);
      workData[k] = arr;
    });
    const result = [];
    for (let i = 0; i < count; i++) {
      const data = {};
      ICON_PROP_KEYS.forEach((k) => {
        const val = workData[k][i];
        data[k] = val;
      });
      result.push(data);
    }
    return result;
  }

  function normalize(iconProps) {
    const data = {};
    for (const k in iconProps) {
      if (k === 'className') {
        continue;
      }
      if (isIconKey(k)) {
        data[k] = iconProps[k];
      }
    }
    if (iconProps.className) {
      const prop = getIconProps(iconProps.tagName || 'i', iconProps.className);
      for (const k in prop) {
        if (isIconKey(k)) {
          if (!isDef(iconProps[k])) {
            data[k] = prop[k];
          }
        }
      }
    }
    return data;
  }

  function toNormalizeArray(iconProps) {
    const icons = toSimpleArray(iconProps);
    if (!icons) {
      return icons;
    }
    return icons.map((icon) => normalize(icon));
  }

  const iconPropKeys = ICON_PROP_KEYS;

  function isIconKey(k) {
    return ICON_PROP_KEYS.indexOf(k) >= 0;
  }

  const icons$2 = {
    toNormalizeArray,
    iconPropKeys
  };

  class Rect {
    constructor(left, top, width, height) {
      this._left = left;
      this._top = top;
      this._width = width;
      this._height = height;
      this._right = undefined;
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
      const right = this.right;
      this._left = left;
      this.right = right;
    }

    get top() {
      return this._top;
    }

    set top(top) {
      const bottom = this.bottom;
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
      return this._right !== undefined
        ? this._right
        : (this._right = this.left + this.width);
    }

    set right(right) {
      this._right = right;
      this.width = right - this.left;
    }

    get bottom() {
      return this._bottom !== undefined
        ? this._bottom
        : (this._bottom = this.top + this.height);
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
      return (this.left <= another.left &&
        this.left + this.width >= another.left + another.width &&
        this.top <= another.top &&
        this.top + this.height >= another.top + another.height);
    }

    inPoint(x, y) {
      return (this.left <= x &&
        this.left + this.width >= x &&
        this.top <= y &&
        this.top + this.height >= y);
    }
  }

  function loadIcons(icon, context, helper, callback) {
    let argIcon = undefined;
    if (icon) {
      if (isPromise(icon)) {
        icon.then((i) => {
          loadIcons(i, context.toCurrentContext(), helper, callback);
        });
      } else {
        const iconList = icons$2.toNormalizeArray(icon);
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

  function getActionTextPadding(context, helper, style) {
    const font = style.font;
    const padding = style.padding;
    const appearance = style.appearance;
    const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
    const textPadding = basePadding.slice(0);
    if (appearance !== 'none' && isDefString(appearance)) {
      textPadding[1] += 26; // 文字距离有边框位置，右侧图标
    }
    return textPadding;
  }

  function drawActionButton(grid, context, stateId, helper, style) {
    const textBaseline = style.textBaseline;
    const font = style.font;
    const padding = style.padding;
    const appearance = style.appearance;
    const color = style.color;
    let active = false;
    const state = grid[stateId];
    if (state) {
      if (state.mouseActiveCell &&
        cellInRange(context.range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
        if (state.mouseRelativePos) {
          let rect = context.getRect();
          const btnWidth = 32;
          rect = new Rect(rect.left + rect.width - btnWidth, rect.top, btnWidth, rect.height);
          active =
            rect.left <= state.mouseRelativePos.x &&
            rect.right >= state.mouseRelativePos.x &&
            rect.top <= state.mouseRelativePos.y &&
            rect.bottom >= state.mouseRelativePos.y;
          state.mouseActive = active;
        }
      }
    }
    if (appearance !== 'none' && isDefString(appearance)) {
      const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
      const iconPadding = basePadding.slice(0);
      iconPadding[1] += 8; // 图标距离右边框位置
      let icon;
      if (appearance === 'menulist-button') {
        // draw dropdown arrow icon
        icon = {
          color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
          path: 'M0 2 5 7 10 2z',
          width: 10
        };
      } else if (appearance === 'lookup-button') {
        // draw lookup icon
        icon = {
          color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
          // tslint:disable-next-line:max-line-length
          path: 'M4.7997924,9.6 C2.15326327,9.6 0,7.44655046 0,4.79937714 C0,2.15261906 2.15326327,0 4.7997924,0 C7.44673673,0 9.6,2.15261906 9.6,4.79937714 C9.6,7.44655046 7.44673673,9.6 4.7997924,9.6 Z M4.79959481,0.9 C2.64922597,0.9 0.9,2.64900249 0.9,4.79918953 C0.9,6.95018703 2.64922597,8.7 4.79959481,8.7 C6.95036883,8.7 8.7,6.95018703 8.7,4.79918953 C8.7,2.64940773 6.95036883,0.9 4.79959481,0.9 Z M11.579002,12 C11.4749824,12 11.3709629,11.9593028 11.289322,11.8774707 L7.93168591,8.56830498 C7.76260228,8.39851441 7.75555713,8.11713467 7.91510908,7.93902961 C8.07631871,7.76136216 8.34237677,7.75261007 8.51104597,7.92065022 L11.8686821,11.2315664 C12.0373513,11.4004817 12.0443964,11.6822991 11.8848445,11.8608417 C11.8019603,11.9527387 11.6904812,12 11.579002,12 Z',
          width: 12
        };
      } else if (appearance === 'clear-button') {
        // draw clear icon
        icon = {
          color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
          // tslint:disable-next-line:max-line-length
          path: 'M5.26896659,6.00000686 L0.152356675,11.1166168 C-0.048420546,11.317394 -0.0501211184,11.6463861 0.151753253,11.8482467 C0.355026465,12.05152 0.681179729,12.0498468 0.883383238,11.8476433 L5.99999314,6.73103342 L11.1166168,11.8476433 C11.317394,12.0484205 11.6463861,12.0501211 11.8482467,11.8482467 C12.05152,11.6449735 12.0498468,11.3188203 11.8476433,11.1166168 L6.73103341,6.00000686 L11.8476433,0.883383238 C12.0484205,0.682606017 12.0501074,0.3536139 11.8482467,0.151753253 C11.6449598,-0.0515199596 11.3188065,-0.0498468209 11.1166168,0.152356675 L6.00000686,5.2689803 L0.883383238,0.152356688 C0.682606017,-0.0484205326 0.3536139,-0.0501073814 0.151753253,0.151753266 C-0.0515199596,0.355040202 -0.0498468209,0.681193466 0.152356675,0.883383252 L5.26896659,6.00000686 Z',
          width: 12
        };
      } else if (appearance === 'date-button') {
        // draw date icon
        icon = {
          color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
          // tslint:disable-next-line:max-line-length
          path: 'M5.6,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C6.8,6.2,6.7,6,6.4,6c0,0,0,0,0,0H5.6C5.3,6,5.1,6.2,5.1,6.4c0,0,0,0,0,0C5.1,6.7,5.3,6.8,5.6,6.8L5.6,6.8z M5.6,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H5.6c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C5.1,8.4,5.3,8.6,5.6,8.6L5.6,8.6z M10.3,0.9H8.6V0.4C8.6,0.2,8.4,0,8.1,0c0,0,0,0,0,0C7.9,0,7.7,0.2,7.7,0.4c0,0,0,0,0,0v0.4H4.3V0.4C4.3,0.2,4.1,0,3.9,0c0,0,0,0,0,0C3.6,0,3.4,0.2,3.4,0.4c0,0,0,0,0,0v0.4H1.7C0.8,0.9,0,1.6,0,2.6v6.8c0,0.9,0.8,1.7,1.7,1.7h8.6c0.9,0,1.7-0.8,1.7-1.7V2.6C12,1.6,11.2,0.9,10.3,0.9L10.3,0.9z M11.1,9.4c0,0.5-0.4,0.9-0.9,0.9H1.7c-0.5,0-0.9-0.4-0.9-0.9V4.3h10.3V9.4z M11.1,3.4H0.9V2.6c0-0.5,0.4-0.9,0.9-0.9h1.7v0.4c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4V1.7h3.4v0.4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V1.7h1.7c0.5,0,0.9,0.4,0.9,0.9L11.1,3.4L11.1,3.4z M3,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H3c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C2.6,8.4,2.8,8.6,3,8.6z M8.1,6.8H9c0.2,0,0.4-0.2,0.4-0.4C9.4,6.2,9.2,6,9,6c0,0,0,0,0,0H8.1C7.9,6,7.7,6.2,7.7,6.4c0,0,0,0,0,0C7.7,6.7,7.9,6.8,8.1,6.8L8.1,6.8z M3,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C4.3,6.2,4.1,6,3.9,6c0,0,0,0,0,0H3C2.8,6,2.6,6.2,2.6,6.4c0,0,0,0,0,0C2.6,6.7,2.8,6.8,3,6.8z M8.1,8.6H9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H8.1c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C7.7,8.4,7.9,8.6,8.1,8.6z',
          width: 12
        };
      } else if (typeof appearance === 'function') {
        icon = appearance(active);
      } else if (obj.isObject(appearance)) {
        icon = appearance;
      } else {
        window.console.warn(`unsupported appearance:${ appearance }`);
      }
      if (icon) {
        // 绘制按钮图标时，不应影响到 overflowText
        const cellOverflowText = grid.getCellOverflowText(context.col, context.row) || '';
        helper.text('', context, {
          color,
          font,
          icons: [icon],
          padding: iconPadding,
          textAlign: 'right',
          textBaseline
        });
        grid.setCellOverflowText(context.col, context.row, cellOverflowText);
      }
    }
  }

  function customDraw(helper, draw, value, context, grid, record) {
    let b = false;
    if (draw) {
      const rect = context.getRect();
      const row = context.row;
      const col = context.col;
      const selection = context.getSelection();
      const opt = {
        grid,
        record,
        rect,
        row,
        col,
        selection
      };
      helper.drawWithClip(context, (ctx) => {
        b = draw(value, ctx, opt) === false;
      });
    }
    return b;
  }

  function isAttachArea(record, cellStyle) {
    let s;
    if (typeof cellStyle === 'function') {
      s = cellStyle(record);
    } else {
      s = cellStyle;
    }
    let b = false;
    if (s && s.innerBox === 'dashed') {
      b = true;
    }
    return b;
  }

  function reviseAttachCellsArea(rect, row, grid, cellStyle) {
    const record = grid.getRowRecord(row);
    if (isAttachArea(record, cellStyle)) {
      rect.left += 4;
      rect.top += 4;
      rect.right -= 4;
      rect.bottom -= 4;
    }
  }

  function reviseAttachCellsPadding(padding, row, grid, cellStyle) {
    const record = grid.getRowRecord(row);
    if (isAttachArea(record, cellStyle)) {
      padding[3] -= 4;
      if (padding[3] < 0) {
        padding[3] = 0;
      }
      padding[1] -= 4;
      if (padding[1] < 0) {
        padding[1] = 0;
      }
    }
  }

  function drawAttachArea(grid, record, context, helper, cellStyle) {
    if (isAttachArea(record, cellStyle)) {
      const rect = context.getRect();
      rect.top += 4;
      rect.right -= 4;
      rect.bottom -= 4;
      rect.left += 4;
      helper.attachArea(rect, context);
    }
  }

  var _a;
  const _$3 = getEventTargetSymbol();
  let eventTargetNextId = 1;

  /**
   * event target.
   */
  class EventTarget {
    constructor() {
      this[_a] = {
        listeners: {},
        listenerData: {}
      };
    }

    /**
     * Adds an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns unique id for the listener.
     */
    listen(type, listener) {
      const list = this[_$3].listeners[type] || (this[_$3].listeners[type] = []);
      list.push(listener);
      const id = eventTargetNextId++;
      this[_$3].listenerData[id] = {
        listener,
        remove: () => {
          delete this[_$3].listenerData[id];
          const index = list.indexOf(listener);
          list.splice(index, 1);
          if (!this[_$3].listeners[type].length) {
            delete this[_$3].listeners[type];
          }
        },
        type
      };
      return id;
    }

    /**
     * Removes an event listener which was added with listen() by the id returned by listen().
     * @param id - the id returned by listen().
     * @returns
     */
    unlisten(id) {
      if (!this[_$3]) {
        return;
      }
      this[_$3].listenerData[id].remove();
    }

    /**
     * Adds an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns
     */
    addEventListener(type, listener) {
      this.listen(type, listener);
    }

    /**
     * Removes an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns
     */
    removeEventListener(type, listener) {
      if (!this[_$3]) {
        return;
      }
      each(this[_$3].listenerData, (obj, id) => {
        if (obj.type === type && obj.listener === listener) {
          this.unlisten(id);
        }
      });
    }

    /**
     * @param type - The event type id.
     * @returns
     */
    hasListeners(type) {
      return !!this[_$3].listeners[type];
    }

    /**
     * Fires all registered listeners
     * @param type - The type of the listeners to fire.
     * @param args - fire arguments
     * @returns the result of the last listener
     */
    fireListeners(type, ...args) {
      const list = this[_$3].listeners[type];
      if (!list) {
        return [];
      }
      return list.map((listener) => listener.call(this, ...args)).filter(isDef);
    }

    /**
     * @returns
     */
    dispose() {
    }
  }

  _a = _$3;

  const BASE_STYLE_EVENT_TYPE = {
    CHANGE_STYLE: 'change_style'
  };
  let defaultBaseStyle;

  class BaseStyle$1 extends EventTarget {
    constructor({ bgColor } = {}) {
      super();
      this._bgColor = bgColor;
    }

    static get EVENT_TYPE() {
      return BASE_STYLE_EVENT_TYPE;
    }

    static get DEFAULT() {
      return defaultBaseStyle
        ? defaultBaseStyle
        : (defaultBaseStyle = new BaseStyle$1());
    }

    get bgColor() {
      return this._bgColor;
    }

    set bgColor(bgColor) {
      this._bgColor = bgColor;
      this.doChangeStyle();
    }

    doChangeStyle() {
      this.fireListeners(BASE_STYLE_EVENT_TYPE.CHANGE_STYLE);
    }

    clone() {
      return new BaseStyle$1(this);
    }
  }

  let defaultBaseStdStyle;

  class BaseStdStyle$1 extends BaseStyle$1 {
    constructor(style = {}) {
      super(style);
      this._textAlign = style.textAlign || 'left';
      this._textBaseline = style.textBaseline || 'middle';
    }

    static get DEFAULT() {
      return defaultBaseStdStyle
        ? defaultBaseStdStyle
        : (defaultBaseStdStyle = new BaseStdStyle$1());
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
      return new BaseStdStyle$1(this);
    }
  }

  let defaultBaseCheckStyle;

  class BaseCheckStyle$1 extends BaseStdStyle$1 {
    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
      const { uncheckBgColor, checkBgColor, borderColor } = style;
      this._uncheckBgColor = uncheckBgColor;
      this._checkBgColor = checkBgColor;
      this._borderColor = borderColor;
    }

    static get DEFAULT() {
      return defaultBaseCheckStyle
        ? defaultBaseCheckStyle
        : (defaultBaseCheckStyle = new BaseCheckStyle$1());
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
      return new BaseCheckStyle$1(this);
    }
  }

  let defaultStyle;

  class Style$1 extends BaseStdStyle$1 {
    constructor(style = {}) {
      super(style);
      this._color = style.color;
      this._font = style.font;
      this._padding = style.padding;
      this._inputPadding = style.inputPadding;
      this._textOverflow = style.textOverflow || 'clip';
      this._appearance = style.appearance || 'none';
    }

    static get DEFAULT() {
      return defaultStyle ? defaultStyle : (defaultStyle = new Style$1());
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

    get inputPadding() {
      return this._inputPadding;
    }

    set inputPadding(inputPadding) {
      this._inputPadding = inputPadding;
      this.doChangeStyle();
    }

    get textOverflow() {
      return this._textOverflow;
    }

    set textOverflow(textOverflow) {
      this._textOverflow = textOverflow;
      this.doChangeStyle();
    }

    get appearance() {
      return this._appearance;
    }

    set appearance(appearance) {
      this._appearance = appearance;
      this.doChangeStyle();
    }

    clone() {
      return new Style$1(this);
    }
  }

  let defaultButtonStyle;

  class ButtonStyle extends Style$1 {
    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
      this._buttonBgColor = style.buttonBgColor;
    }

    static get DEFAULT() {
      return defaultButtonStyle
        ? defaultButtonStyle
        : (defaultButtonStyle = new ButtonStyle());
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

  let defaultCheckStyle;

  class CheckStyle extends BaseCheckStyle$1 {
    static get DEFAULT() {
      return defaultCheckStyle
        ? defaultCheckStyle
        : (defaultCheckStyle = new CheckStyle());
    }

    constructor(style = {}) {
      super(style);
    }

    clone() {
      return new CheckStyle(this);
    }
  }

  let defaultSwitchStyle;

  class SwitchStyle$1 extends BaseCheckStyle$1 {
    static get DEFAULT() {
      return defaultSwitchStyle
        ? defaultSwitchStyle
        : (defaultSwitchStyle = new SwitchStyle$1());
    }

    constructor(style = {}) {
      super(style);
    }

    clone() {
      return new SwitchStyle$1(this);
    }
  }

  function adjustDateTimeStyleOption(style) {
    style.textAlign = style.textAlign || 'right';
    return style;
  }

  let defaultDateStyle;

  class DateStyle extends Style$1 {
    static get DEFAULT() {
      return defaultDateStyle
        ? defaultDateStyle
        : (defaultDateStyle = new DateStyle());
    }

    constructor(style = {}) {
      super(adjustDateTimeStyleOption(style));
    }

    clone() {
      return new DateStyle(this);
    }
  }

  let defaultDrawStyle;

  class DrawStyle extends BaseStyle$1 {
    constructor(style = {}) {
      super(style);
      this._appearance = style.appearance || 'none';
    }

    static get DEFAULT() {
      return defaultDrawStyle
        ? defaultDrawStyle
        : (defaultDrawStyle = new DrawStyle());
    }

    get appearance() {
      return this._appearance;
    }

    set appearance(appearance) {
      this._appearance = appearance;
      this.doChangeStyle();
    }

    clone() {
      return new DrawStyle(this);
    }
  }

  let defaultIconStyle;

  class IconStyle extends Style$1 {
    static get DEFAULT() {
      return defaultIconStyle
        ? defaultIconStyle
        : (defaultIconStyle = new IconStyle());
    }

    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
    }

    clone() {
      return new IconStyle(this);
    }
  }

  let defaultImageStyle;

  class ImageStyle extends BaseStdStyle$1 {
    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
      this._imageSizing = style.imageSizing;
      this._margin = style.margin || 4;
      this._appearance = style.appearance || 'none';
    }

    static get DEFAULT() {
      return defaultImageStyle
        ? defaultImageStyle
        : (defaultImageStyle = new ImageStyle());
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

    get appearance() {
      return this._appearance;
    }

    set appearance(appearance) {
      this._appearance = appearance;
      this.doChangeStyle();
    }

    clone() {
      return new ImageStyle(this);
    }
  }

  let defaultLookupStyle;

  class LookupStyle extends Style$1 {
    static get DEFAULT() {
      return defaultLookupStyle
        ? defaultLookupStyle
        : (defaultLookupStyle = new LookupStyle());
    }

    constructor(style = {}) {
      super(defaults(style, { textAlign: 'left' }));
      this.appearance = style.appearance || 'menulist-button';
    }

    clone() {
      return new LookupStyle(this);
    }
  }

  let defaultMenuStyle;

  class MenuStyle extends Style$1 {
    static get DEFAULT() {
      return defaultMenuStyle
        ? defaultMenuStyle
        : (defaultMenuStyle = new MenuStyle());
    }

    constructor(style = {}) {
      super(style);
      this.appearance = style.appearance || 'menulist-button';
    }

    clone() {
      return new MenuStyle(this);
    }
  }

  let defaultMultilineTextStyle$1;

  class MultilineTextStyle extends Style$1 {
    constructor(style = {}) {
      super(defaults(style, { textBaseline: 'middle', textOverflow: 'ellipsis' }));
      this._lineHeight = style.lineHeight || '1em';
      this._autoWrapText = style.autoWrapText || false;
      this._lineClamp = style.lineClamp || 'auto';
    }

    static get DEFAULT() {
      return defaultMultilineTextStyle$1
        ? defaultMultilineTextStyle$1
        : (defaultMultilineTextStyle$1 = new MultilineTextStyle());
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

  let defaultNumberStyle;

  class NumberStyle extends Style$1 {
    static get DEFAULT() {
      return defaultNumberStyle
        ? defaultNumberStyle
        : (defaultNumberStyle = new NumberStyle());
    }

    constructor(style = {}) {
      super(defaults(style, { textAlign: 'right' }));
    }

    clone() {
      return new NumberStyle(this);
    }
  }

  let defaultPercentCompleteBarStyle;
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

  class PercentCompleteBarStyle extends Style$1 {
    constructor(style = {}) {
      super(style);
      this._barColor = style.barColor || DEFAULT_BAR_COLOR;
      this._barBgColor = style.barBgColor || '#f0f3f5';
      this._barHeight = style.barHeight || 3;
    }

    static get DEFAULT() {
      return defaultPercentCompleteBarStyle
        ? defaultPercentCompleteBarStyle
        : (defaultPercentCompleteBarStyle = new PercentCompleteBarStyle());
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

  let defaultRadioStyle;

  class RadioStyle extends BaseStdStyle$1 {
    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
      const { checkColor, uncheckBorderColor, checkBorderColor, uncheckBgColor, checkBgColor } = style;
      this._checkColor = checkColor;
      this._uncheckBorderColor = uncheckBorderColor;
      this._checkBorderColor = checkBorderColor;
      this._uncheckBgColor = uncheckBgColor;
      this._checkBgColor = checkBgColor;
    }

    static get DEFAULT() {
      return defaultRadioStyle
        ? defaultRadioStyle
        : (defaultRadioStyle = new RadioStyle());
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

  function adjustTreeStyleOption(style) {
    style.textAlign = style.textAlign || 'left';
    return style;
  }

  let defaultTreeStyle;

  class TreeStyle extends Style$1 {
    constructor(style = {}) {
      super(adjustTreeStyleOption(style));
      this._lineColor = style.lineColor;
      this._buttonColor = style.buttonColor;
      this._buttonBgColor = style.buttonBgColor;
      this._buttonBorderColor = style.buttonBorderColor;
      this._linkColor = style.linkColor;
      this._lineHeight = style.lineHeight || '1em';
      this._autoWrapText = style.autoWrapText || false;
      this._lineClamp = style.lineClamp || 'auto';
    }

    static get DEFAULT() {
      return defaultTreeStyle
        ? defaultTreeStyle
        : (defaultTreeStyle = new TreeStyle());
    }

    get lineColor() {
      return this._lineColor;
    }

    set lineColor(lineColor) {
      this._lineColor = lineColor;
      this.doChangeStyle();
    }

    get buttonColor() {
      return this._buttonColor;
    }

    set buttonColor(buttonColor) {
      this._buttonColor = buttonColor;
      this.doChangeStyle();
    }

    get buttonBgColor() {
      return this._buttonBgColor;
    }

    set buttonBgColor(buttonBgColor) {
      this._buttonBgColor = buttonBgColor;
      this.doChangeStyle();
    }

    get buttonBorderColor() {
      return this._buttonBorderColor;
    }

    set buttonBorderColor(buttonBorderColor) {
      this._buttonBorderColor = buttonBorderColor;
      this.doChangeStyle();
    }

    get linkColor() {
      return this._linkColor;
    }

    set linkColor(linkColor) {
      this._linkColor = linkColor;
      this.doChangeStyle();
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

    clone() {
      return new TreeStyle(this);
    }
  }

  const { EVENT_TYPE } = BaseStyle$1;

  function of$7(columnStyle, record, StyleClassDef = Style$1) {
    if (columnStyle) {
      if (columnStyle instanceof BaseStyle$1) {
        return columnStyle;
      } else if (typeof columnStyle === 'function') {
        return of$7(columnStyle(record), record, StyleClassDef);
      } else if (typeof columnStyle === 'string' &&
        record &&
        columnStyle in record) {
        return of$7(record[columnStyle], record, StyleClassDef);
      }
      return new StyleClassDef(columnStyle);
    } else {
      return StyleClassDef.DEFAULT;
    }
  }

  const COLUMN_FADEIN_STATE_ID = getColumnFadeinStateId();

  function getFadinState(grid) {
    let state = grid[COLUMN_FADEIN_STATE_ID];
    if (!state) {
      state = { cells: {} };
      obj.setReadonly(grid, COLUMN_FADEIN_STATE_ID, state);
    }
    return state;
  }

  function _generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase) {
    return (point) => {
      const state = getFadinState(grid);
      const stateKey = `${ col }:${ row }`;
      if (point === 1) {
        delete state.cells[stateKey];
      } else {
        state.cells[stateKey] = {
          opacity: point
        };
      }
      drawCellBase();
      drawInternal();
      const cellState = state.cells[stateKey];
      if (cellState) {
        // 透明背景覆盖透明度
        const ctx = context.getContext();
        ctx.globalAlpha = 1 - cellState.opacity;
        try {
          drawCellBase();
        } finally {
          ctx.globalAlpha = 1;
        }
      }
    };
  }

  const fadinMgr = {
    animate(grid, col, row, context, drawInternal, drawCellBase) {
      // fadein animation
      const state = getFadinState(grid);
      const activeFadeins = [
        _generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase)
      ];
      state.activeFadeins = activeFadeins;
      animate(500, (point) => {
        activeFadeins.forEach((f) => f(point));
        if (point === 1) {
          delete state.activeFadeins;
        }
      });
    },
    margeAnimate(grid, col, row, context, drawInternal, drawCellBase) {
      const state = getFadinState(grid);
      if (state.activeFadeins) {
        state.activeFadeins.push(_generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase));
      } else {
        drawInternal();
      }
    }
  };

  class BaseColumn {
    constructor(options = {}) {
      this.onDrawCell = this.onDrawCell.bind(this); // 修复范围
      this._convert = options.convert;
      this._convertCopy = options.convertCopy;
      this._hidden = options.hidden;
      // 使用Promise的回调显示淡入
      this._fadeinWhenCallbackInPromise =
        options.fadeinWhenCallbackInPromise || false;
    }

    get StyleClass() {
      return BaseStyle$1;
    }

    get fadeinWhenCallbackInPromise() {
      return this._fadeinWhenCallbackInPromise;
    }

    get convert() {
      return this._convert;
    }

    get convertCopy() {
      return this._convertCopy;
    }

    get hidden() {
      return this._hidden;
    }

    set hidden(hidden) {
      this._hidden = hidden;
    }

    reviseAttachCellsArea(_rect, _row, _grid) {
      // nothing
    }

    reviseAttachCellsPadding(padding, row, grid) {
      const state = getInlineEditingState(grid);
      if (state.inputPadding) {
        padding[0] += state.inputPadding[0];
        padding[1] += state.inputPadding[1];
        padding[2] += state.inputPadding[2];
        padding[3] += state.inputPadding[3];
      }
    }

    reviseFocusRect(_rect, _row, _grid) {
      // nothing
    }

    onDrawCell(cellValue, info, context, grid) {
      const { style, getRecord, clearCellBase, drawCellBase, getCell, getContentHidden } = info;
      const record = getRecord();
      const helper = grid.getGridCanvasHelper();
      const state = getInlineEditingState(grid);
      if (state.cellRange &&
        cellInRange(state.cellRange, context.col, context.row)) {
        // 被编辑单元格
        drawCellBase({ bgColor: '#FFF' });
        const actStyle = of$7(style, record, this.StyleClass);
        this.drawEditingInternal(context, actStyle, helper, grid, info);
        return;
      }
      if (!state.cellRange) {
        // 在绘制单元格时，在编辑前，顺便保存当前焦点单元格的 inputPadding
        const sel = context.getSelection();
        const { col, row } = context;
        if (!sel.dragged &&
          cellInRange(context.range, sel.select.col, sel.select.row) &&
          cellInRange(sel.range, col, row)) {
          // 焦点单元格
          const actStyle = of$7(style, record, this.StyleClass);
          if (actStyle instanceof Style$1 && actStyle.inputPadding) {
            state.inputPadding = helper.toBoxPixelArray(actStyle.inputPadding, context, actStyle.font);
          } else {
            delete state.inputPadding;
          }
        }
      }
      clearCellBase();
      let promise;
      if (!record) {
        return; // 过滤过程中 record 可能没有值
      } else if (isPromise(record)) {
        promise = record.then(() => cellValue);
      } else if (isPromise(cellValue)) {
        promise = cellValue;
      }
      // 文字
      if (promise) {
        const start = Date.now();
        return promise.then((val) => {
          const currentContext = context.toCurrentContext();
          const drawRect = currentContext.getDrawRect();
          if (!drawRect) {
            return;
          }
          const time = Date.now() - start;
          const drawInternal = () => {
            const _currentContext = context.toCurrentContext();
            const _drawRect = _currentContext.getDrawRect();
            if (!_drawRect) {
              return;
            }
            const _record = getRecord();
            if (isPromise(_record)) {
              return;
            }
            const actStyle = of$7(style, _record, this.StyleClass);
            if (actStyle.bgColor) {
              drawCellBase({ bgColor: actStyle.bgColor });
            } else {
              drawCellBase();
            }
            if (this.isContentHidden(_record, getContentHidden)) {
              return;
            }
            this.drawInternal(this.doConvertInternal(val, getCell(), grid), _currentContext, actStyle, helper, grid, info);
            this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info);
          };
          let isFadeinWhenCallbackInPromise = this._fadeinWhenCallbackInPromise;
          if (!isDef(isFadeinWhenCallbackInPromise)) {
            isFadeinWhenCallbackInPromise = !!grid.configure('fadeinWhenCallbackInPromise');
          }
          if (!isFadeinWhenCallbackInPromise) {
            drawInternal(); // 简单的绘图
          } else {
            const col = context.col;
            const row = context.row;
            if (time < 80) {
              // 80 ms内的PromiseCallback被集成到之前的动画中
              fadinMgr.margeAnimate(grid, col, row, context, drawInternal, drawCellBase);
            } else {
              // 动画
              fadinMgr.animate(grid, col, row, context, drawInternal, drawCellBase);
            }
          }
        });
      } else {
        const actStyle = of$7(style, record, this.StyleClass);
        if (actStyle.bgColor) {
          drawCellBase({ bgColor: actStyle.bgColor });
        } else {
          drawCellBase();
        }
        if (this.isContentHidden(record, getContentHidden)) {
          return;
        }
        this.drawInternal(this.doConvertInternal(cellValue, getCell(), grid), context, actStyle, helper, grid, info);
        this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info);
        // 在淡入的情况下透明背景覆盖透明度
        const col = context.col;
        const row = context.row;
        const stateKey = `${ col }:${ row }`;
        const cellState = grid[COLUMN_FADEIN_STATE_ID] &&
          grid[COLUMN_FADEIN_STATE_ID][stateKey];
        if (cellState) {
          const ctx = context.getContext();
          ctx.globalAlpha = 1 - cellState.opacity;
          try {
            drawCellBase();
          } finally {
            ctx.globalAlpha = 1;
          }
        }
        return;
      }
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

    convertCopyValue(value, cell, grid) {
      let displayValue = this.convertCopyInternal(value);
      if (this.convertCopy) {
        displayValue = this.convertCopy(value, displayValue, cell, grid);
      }
      return displayValue;
    }

    doConvertInternal(value, cell, grid) {
      let displayValue = this.convertInternal(value);
      if (this.convert) {
        displayValue = this.convert(value, displayValue, cell, grid);
      }
      return displayValue;
    }

    convertInternal(value) {
      return (isDef(value) ? value : '');
    }

    convertCopyInternal(value) {
      return this.convertInternal(value);
    }

    drawEditingInternal(_context, _style, _helper, _grid, _info) {
      // nothing
    }

    isContentHidden(record, getContentHidden) {
      let contentHidden = getOrApply(this.hidden, record);
      if (!isDef(contentHidden)) {
        contentHidden = getContentHidden();
      }
      return contentHidden;
    }
  }

  class MenuColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._options = menuItems.normalize(options.options);
    }

    get StyleClass() {
      return MenuStyle;
    }

    get options() {
      return this._options;
    }

    clone() {
      return new MenuColumn(this);
    }

    withOptions(options) {
      const c = this.clone();
      c._options = menuItems.normalize(options);
      return c;
    }

    drawInternal(value, context, style, helper, grid, { getCell, getIcon }) {
      const { textAlign, textBaseline, font, padding, textOverflow, appearance } = style;
      let { color } = style;
      const text = this._convertInternal(value, getCell(), grid);
      helper.testFontLoad(font, text, context);
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
        const textPadding = basePadding.slice(0);
        textPadding[1] += 26; // icon padding
        const iconPadding = basePadding.slice(0);
        iconPadding[1] += 8;
        if (!isDef(color) && (!isDef(value) || value === '')) {
          color = 'rgba(0, 0, 0, .38)';
        }
        helper.text(text, ctx, {
          color,
          font,
          icons,
          padding: textPadding,
          textAlign,
          textBaseline,
          textOverflow
        });
        if (appearance === 'menulist-button') {
          // draw dropdown arrow icon
          helper.text('', context, {
            color,
            font,
            icons: [
              {
                color: 'rgba(0, 0, 0, .54)',
                path: 'M0 2 5 7 10 2z',
                width: 10
              }
            ],
            padding: iconPadding,
            textAlign: 'right',
            textBaseline
          });
        } else if (appearance !== 'none') {
          window.console.warn(`unsupported appearance:${ appearance }`);
        }
      });
    }

    convertInternal(value) {
      return value;
    }

    _convertInternal(value, cell, grid) {
      const options = this._options;
      for (const option of options) {
        if (option.value === value) {
          value = option.label;
          break;
        }
      }
      return super.doConvertInternal(value, cell, grid);
    }

    getCopyCellValue(value, grid, cell) {
      return this._convertInternal(value, cell, grid);
    }
  }

  const INLINE_MENU_EDITOR_STATE_ID = getInlineMenuEditorStateId();
  let globalInlineMenuElement = null;
  let globalInlineMenuBindGridCount = 0;

  function getState$1(grid) {
    let state = grid[INLINE_MENU_EDITOR_STATE_ID];
    if (!state) {
      state = {};
      obj.setReadonly(grid, INLINE_MENU_EDITOR_STATE_ID, state);
    }
    return state;
  }

  function attachMenu(grid, cell, editor, value, record) {
    const state = getState$1(grid);
    if (!globalInlineMenuElement) {
      globalInlineMenuElement = new InlineMenuElement();
    }
    if (!state.element) {
      state.element = globalInlineMenuElement;
      globalInlineMenuBindGridCount++;
      grid.addDisposable({
        dispose() {
          globalInlineMenuBindGridCount--;
          if (!globalInlineMenuBindGridCount && globalInlineMenuElement) {
            globalInlineMenuElement.dispose();
            globalInlineMenuElement = null;
          }
        }
      });
    }
    globalInlineMenuElement.attach(grid, editor, cell.col, cell.row, value, record);
  }

  function detachMenu(gridFocus) {
    if (globalInlineMenuElement) {
      globalInlineMenuElement.detach(gridFocus);
    }
  }

  class InlineMenuEditor extends Editor {
    constructor(options = {}) {
      super(options);
      this._classList = options.classList || '';
      this._options = menuItems.normalizeToFn(options.options);
      this._autoWidth = options.autoWidth || false;
    }

    dispose() {
      // nothing
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
      this._options = menuItems.normalizeToFn(options);
    }

    get autoWidth() {
      return this._autoWidth;
    }

    set autoWidth(autoWidth) {
      this._autoWidth = autoWidth;
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
        const allowOpen = !isReadOnlyRecord(this.readOnly, grid, cell.row) &&
          !isDisabledRecord(this.disabled, grid, cell.row);
        if (allowOpen) {
          grid.doGetCellValue(cell.col, cell.row, (value) => {
            const record = grid.getRowRecord(cell.row);
            if (isPromise(record)) {
              return;
            }
            attachMenu(grid, cell, this, value, record);
          });
        }
        return allowOpen;
      };

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      return [
        grid.listen(DG_EVENT_TYPE.CLICK_CELL, (cell) => {
          if (!isTarget(cell.col, cell.row)) {
            return;
          }
          open({
            col: cell.col,
            row: cell.row
          });
        }),
        grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
          if ((e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) ||
            (e.keyCode === KEY_ENTER && e.event.shiftKey)) {
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
            event.cancel(e.event);
            e.stopCellMoving();
          }
        }),
        grid.listen(DG_EVENT_TYPE.SELECTED_CELL, (e) => {
          detachMenu();
        }),
        grid.listen(DG_EVENT_TYPE.SCROLL, () => {
          detachMenu(true);
        }),
        // mouse move
        grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
            isDisabledRecord(this.disabled, grid, e.row)) {
            return;
          }
          grid.getElement().style.cursor = 'pointer';
        }),
        grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
            isDisabledRecord(this.disabled, grid, e.row)) {
            return;
          }
          if (!grid.getElement().style.cursor) {
            grid.getElement().style.cursor = 'pointer';
          }
        }),
        grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          grid.getElement().style.cursor = '';
        }),
        // paste value
        grid.listen(DG_EVENT_TYPE.PASTE_CELL, (e) => {
          if (e.multi) {
            // ignore multi cell values
            return;
          }
          const selectionRange = grid.selection.range;
          if (!cellEquals(selectionRange.start, selectionRange.end)) {
            // ignore multi paste values
            return;
          }
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
            isDisabledRecord(this.disabled, grid, e.row)) {
            return;
          }
          const record = grid.getRowRecord(e.row);
          if (isPromise(record)) {
            return;
          }
          const pasteOpt = this._pasteDataToOptionValue(e.normalizeValue, grid, e, record);
          if (pasteOpt) {
            event.cancel(e.event);
            then(grid.doChangeValue(e.col, e.row, () => pasteOpt.value), () => {
              const range = grid.getCellRange(e.col, e.row);
              grid.invalidateCellRange(range);
            });
          }
        })
      ];
    }

    onPasteCellRangeBox(grid, cell, value) {
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      const record = grid.getRowRecord(cell.row);
      if (isPromise(record)) {
        return;
      }
      const pasteOpt = this._pasteDataToOptionValue(value, grid, cell, record);
      if (pasteOpt) {
        grid.doChangeValue(cell.col, cell.row, () => pasteOpt.value);
      }
    }

    onDeleteCellRangeBox(grid, cell) {
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      const record = grid.getRowRecord(cell.row);
      if (isPromise(record)) {
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
        const captionOpt = array.find(columnType.options, (opt) => normalizePasteValueStr(opt.label) === pasteValue);
        if (captionOpt) {
          return _textToOptionValue(captionOpt.value, options);
        }
      }
      return undefined;
    }
  }

  function _textToOptionValue(value, options) {
    const pasteValue = normalizePasteValueStr(value);
    const pasteOpt = array.find(options, (opt) => normalizePasteValueStr(opt.value) === pasteValue);
    if (pasteOpt) {
      return pasteOpt;
    }
    return undefined;
  }

  function normalizePasteValueStr(value) {
    if (value == null) {
      return '';
    }
    return `${ value }`.trim();
  }

  function hasOptions(columnType) {
    if (columnType instanceof MenuColumn) {
      return true;
    }
    if (Array.isArray(columnType.options)) {
      return true;
    }
    return false;
  }

  var InlineTextAreaElementCss = '.kaka-grid__inline-textarea::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-textarea {\n  position: absolute;\n  box-sizing: border-box;\n  overflow: hidden;\n  padding: 0;\n  border: none;\n}\n';

  const CLASSNAME_ITAE = 'kaka-grid__inline-textarea';

  function createInputElement() {
    style$2.inject('InlineTextAreaElement', InlineTextAreaElementCss);
    return createElement('textarea', { classList: CLASSNAME_ITAE });
  }

  const BEFORE_TEXTAREA_VALUE = 'before_value';

  function inputAutoHeight(input) {
    const h = input.style.minHeight;
    input.style.minHeight = '0px';
    input.style.height = '0px';
    input.style.height = input.scrollHeight + 'px';
    input.style.minHeight = h;
  }

  function setTextInputValue(input, value, inputValue) {
    if (isDef(value)) {
      input.value = value;
    } else {
      input.value = '';
    }
    input.dataset[BEFORE_TEXTAREA_VALUE] = input.value;
    if (inputValue) {
      input.value = inputValue;
    }
    inputAutoHeight(input);
  }

  function getTextInputValue(input) {
    return input.value;
  }

  function isTextInputValueChanged(input) {
    return input.value !== input.dataset[BEFORE_TEXTAREA_VALUE];
  }

  class InlineTextAreaElement {
    constructor() {
      this._attaching = false;
      this._handler = new EventHandler();
      this._input = createInputElement();
      this._bindInputEvents();
    }

    static setInputAttrs(editor, _grid, input) {
      const classList = editor.classList;
      if (classList) {
        input.classList.add(...classList);
      }
    }

    dispose() {
      this.detach();
      this._handler.dispose();
      delete this._beforePropEditor;
    }

    attach(grid, editor, col, row, value, inputValue) {
      const input = this._input;
      if (input.parentElement) {
        // 参见 InlineInputElement.ts
        return;
      }
      const handler = this._handler;
      if (this._beforePropEditor) {
        const classList = this._beforePropEditor.classList;
        if (classList) {
          input.classList.remove(...classList);
        }
      }
      input.style.font = grid.font || '16px sans-serif';
      const { element, rect, padding } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      input.style.top = `${ rect.top.toFixed() }px`;
      input.style.left = `${ rect.left.toFixed() }px`;
      input.style.minWidth = `${ rect.width.toFixed() }px`;
      input.style.width = input.style.minWidth;
      input.style.minHeight = `${ rect.height.toFixed() }px`;
      input.style.height = input.style.minHeight;
      input.style.paddingTop = `${ padding[0] }px`;
      input.style.paddingRight = `${ padding[1] }px`;
      input.style.paddingBottom = `${ padding[2] }px`;
      input.style.paddingLeft = `${ padding[3] }px`;
      element.appendChild(input);
      InlineTextAreaElement.setInputAttrs(editor, grid, input);
      setTextInputValue(input, value, inputValue);
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
        } catch (e) {
          // ignore
        }
        if (document.selection) {
          const range = input.createTextRange();
          range.collapse();
          range.moveEnd('character', end);
          range.moveStart('character', end);
          range.select();
        }
      };
      const safeInputFocus = () => {
        handler.tryWithOffEvents(input, 'blur', () => {
          focus();
        });
        const state = getInlineEditingState(grid);
        state.cellRange = grid.getCellRange(col, row);
        grid.invalidateCellRange(state.cellRange);
      };
      this._attaching = true;
      setTimeout(() => {
        safeInputFocus();
        this._attaching = false;
      });
    }

    detach(gridFocus) {
      if (this._isActive()) {
        const activeData = this._activeData;
        const grid = activeData.grid;
        const col = activeData.col;
        const row = activeData.row;
        const input = this._input;
        this._handler.tryWithOffEvents(input, 'blur', () => {
          if (input.parentElement) {
            input.parentElement.removeChild(input);
          }
        });
        const state = getInlineEditingState(grid);
        delete state.cellRange;
        const range = grid.getCellRange(col, row);
        grid.invalidateCellRange(range);
        if (gridFocus) {
          grid.focus();
        }
      }
      delete this._activeData;
    }

    doChangeValue() {
      if (!this._isActive()) {
        return;
      }
      if (isTextInputValueChanged(this._input)) {
        const value = getTextInputValue(this._input);
        const activeData = this._activeData;
        const grid = activeData.grid;
        const col = activeData.col;
        const row = activeData.row;
        grid.doChangeValue(col, row, () => value);
      }
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
      const stopPropagationOnly = (e) => e.stopPropagation(); // grid为了不在活动中传播
      handler.on(input, 'click', stopPropagationOnly);
      handler.on(input, 'mousedown', stopPropagationOnly);
      handler.on(input, 'touchstart', stopPropagationOnly);
      handler.on(input, 'dblclick', stopPropagationOnly);
      handler.on(input, 'compositionstart', (e) => {
        input.classList.add('composition');
      });
      handler.on(input, 'compositionend', (e) => {
        input.classList.remove('composition');
      });
      handler.on(input, 'keydown', (e) => {
        if (input.classList.contains('composition')) {
          return;
        }
        const keyCode = event.getKeyCode(e);
        if (keyCode === KEY_ESC) {
          this.detach(true);
          event.cancel(e);
        } else if (keyCode === KEY_ENTER) {
          this._onKeydownEnter(e, input);
        } else if (keyCode === KEY_TAB) {
          this._onKeydownTab(e);
        }
      });
      handler.on(input, 'blur', (e) => {
        this.doChangeValue();
        this.detach();
      });
      handler.on(input, 'input', (e) => {
        inputAutoHeight(input);
      });
    }

    _onKeydownEnter(e, input) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      if (e.altKey || e.ctrlKey) {
        input.setRangeText('\n');
        input.selectionStart++;
        setTimeout(() => {
          inputAutoHeight(input);
        }, 0);
        event.cancel(e);
      } else {
        const { grid } = this._activeData;
        this.doChangeValue();
        this.detach(true);
        if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
          grid.onKeyDownMove(e);
        }
        event.cancel(e);
      }
    }

    _onKeydownTab(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) {
        return;
      }
      this.doChangeValue();
      this.detach(true);
      grid.onKeyDownMove(e);
    }
  }

  const INLINE_TEXTAREA_EDITOR_STATE_ID$1 = getInlineTextareaEditorStateId();
  let globalInlineTextAreaElement = null;
  let globalInlineInputBindGridCount = 0;

  function attachInput(grid, cell, editor, value, inputValue) {
    if (!globalInlineTextAreaElement) {
      globalInlineTextAreaElement = new InlineTextAreaElement();
    }
    const state = editor.getState(grid);
    if (!state.element) {
      state.element = globalInlineTextAreaElement;
      globalInlineInputBindGridCount++;
      grid.addDisposable({
        dispose() {
          globalInlineInputBindGridCount--;
          if (!globalInlineInputBindGridCount && globalInlineTextAreaElement) {
            globalInlineTextAreaElement.dispose();
            globalInlineTextAreaElement = null;
          }
        }
      });
    }
    globalInlineTextAreaElement.attach(grid, editor, cell.col, cell.row, value, inputValue);
  }

  function detachInput(gridFocus) {
    if (globalInlineTextAreaElement) {
      globalInlineTextAreaElement.detach(gridFocus);
    }
  }

  function doChangeValue(grid) {
    if (globalInlineTextAreaElement) {
      globalInlineTextAreaElement.doChangeValue();
    }
  }

  class InlineTextAreaEditor extends BaseActionInput {
    constructor(options = {}) {
      super(options);
      this._classList = options.classList || '';
    }

    get classList() {
      return (this._classList &&
        (Array.isArray(this._classList) ? this._classList : [this._classList]));
    }

    set classList(classList) {
      this._classList = classList;
    }

    clone() {
      return new InlineTextAreaEditor(this);
    }

    onActionInputCellInternal(grid, cell, inputValue) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachInput(grid, cell, this, value, inputValue);
      });
    }

    onActionOpenCellInternal(grid, cell) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachInput(grid, cell, this, value);
      });
    }

    onChangeSelectCellInternal(grid, cell, selected) {
      doChangeValue();
      detachInput();
    }

    onGridScrollInternal(grid) {
      doChangeValue();
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
      InlineTextAreaElement.setInputAttrs(this, grid, input);
    }

    getState(grid) {
      if (!grid[INLINE_TEXTAREA_EDITOR_STATE_ID$1]) {
        obj.setReadonly(grid, INLINE_TEXTAREA_EDITOR_STATE_ID$1, {});
      }
      return grid[INLINE_TEXTAREA_EDITOR_STATE_ID$1];
    }
  }

  const RADIO_COLUMN_STATE_ID$1 = getRadioColumnStateId();
  const defaultGroupResolver = ({ grid, col, row }) => {
    const cellId = grid.getLayoutCellId(col, row);
    const recordStartRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(row));
    const offsetRow = row - recordStartRow;
    const result = [];
    const { rowCount, recordRowCount } = grid;
    for (let targetRow = grid.frozenRowCount + offsetRow; targetRow < rowCount; targetRow += recordRowCount) {
      if (grid.getLayoutCellId(col, targetRow) === cellId) {
        result.push({ col, row: targetRow });
      }
    }
    return result;
  };

  class RadioEditor extends Editor {
    constructor(option = {}) {
      super(option);
      this._group = option.group || defaultGroupResolver;
    }

    clone() {
      return new RadioEditor(this);
    }

    get group() {
      return this._group;
    }

    set group(group) {
      this._group = group;
    }

    bindGridEvent(grid, cellId) {
      let _state = grid[RADIO_COLUMN_STATE_ID$1];
      if (!_state) {
        _state = { block: {}, elapsed: {} };
        obj.setReadonly(grid, RADIO_COLUMN_STATE_ID$1, _state);
      }
      const state = _state;
      const action = (cell) => {
        this._action(grid, cell);
      };

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      return [
        ...bindCellClickAction$1(grid, cellId, {
          action,
          mouseMove: (e) => {
            if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
              isDisabledRecord(this.disabled, grid, e.row)) {
              return false;
            } else {
              return true;
            }
          },
          mouseOver: (e) => {
            if (isReadOnlyRecord(this.readOnly, grid, e.row) ||
              isDisabledRecord(this.disabled, grid, e.row)) {
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
        ...bindCellKeyAction$1(grid, cellId, {
          action
        }),
        // paste value
        grid.listen(DG_EVENT_TYPE.PASTE_CELL, (e) => {
          if (e.multi) {
            // ignore multi cell values
            return;
          }
          const selectionRange = grid.selection.range;
          if (!cellEquals(selectionRange.start, selectionRange.end)) {
            // ignore multi paste values
            return;
          }
          if (!isTarget(e.col, e.row)) {
            return;
          }
          const pasteValue = e.normalizeValue.trim();
          if (!toBoolean(pasteValue)) {
            return;
          }
          event.cancel(e.event);
          action({
            col: e.col,
            row: e.row
          });
        })
      ];
    }

    onPasteCellRangeBox(grid, cell, value) {
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row)) {
        return;
      }
      const pasteValue = value.trim();
      if (!toBoolean(pasteValue)) {
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
      const state = grid[RADIO_COLUMN_STATE_ID$1];
      const range = grid.getCellRange(cell.col, cell.row);
      const cellKey = `${ range.start.col }:${ range.start.row }`;
      if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
        isDisabledRecord(this.disabled, grid, cell.row) ||
        state.block[cellKey]) {
        return;
      }
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        if (toBoolean(value)) {
          return;
        }
        const targets = this._group({ grid, col: cell.col, row: cell.row });
        targets.forEach(({ col, row }) => {
          const range = grid.getCellRange(col, row);
          const cellKey = `${ range.start.col }:${ range.start.row }`;
          if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
            isDisabledRecord(this.disabled, grid, cell.row) ||
            state.block[cellKey]) {
            return;
          }
          actionCell(grid, col, row, col === cell.col && row === cell.row);
        });
      });
    }
  }

  function actionCell(grid, col, row, flag) {
    grid.doGetCellValue(col, row, (value) => {
      if (toBoolean(value) === flag) {
        return;
      }
      const state = grid[RADIO_COLUMN_STATE_ID$1];
      const range = grid.getCellRange(col, row);
      const cellKey = `${ range.start.col }:${ range.start.row }`;
      const ret = grid.doChangeValue(col, row, toggleValue);
      if (ret) {
        const onChange = () => {
          // checkbox animation
          animate(200, (point) => {
            if (point === 1) {
              delete state.elapsed[cellKey];
            } else {
              state.elapsed[cellKey] = point;
            }
            grid.invalidateCellRange(range);
          });
        };
        if (isPromise(ret)) {
          state.block[cellKey] = true;
          ret.then(() => {
            delete state.block[cellKey];
            onChange();
          });
        } else {
          onChange();
        }
      }
    });
  }

  var smallDialogInputElementCss = '.kaka-grid__small-dialog-input__input::-ms-clear {\n  visibility: hidden;\n}\n\n@keyframes kaka-grid__small-dialog-input--hidden-animation {\n  0% {\n    opacity: 1;\n  }\n  99% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.kaka-grid__small-dialog-input {\n  position: absolute;\n  box-sizing: content-box;\n  margin: -1px auto auto -1px;\n  border-radius: 3px;\n  background-color: #fafafa;\n  transition: padding 150ms ease-out, box-shadow 150ms ease-out;\n}\n\n.kaka-grid__small-dialog-input--hidden {\n  box-shadow: none;\n  padding: 0;\n  pointer-events: none;\n  animation: kaka-grid__small-dialog-input--hidden-animation 150ms ease-out;\n  opacity: 0;\n}\n\n.kaka-grid__small-dialog-input--shown {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  padding: 8px 24px;\n}\n\n.kaka-grid__small-dialog-input__input {\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 3px 2px 0 4px;\n  border: none;\n  border-bottom: solid 1px rgba(0, 0, 0, 0.87);\n  outline: none;\n  background-color: transparent;\n  transition: all 300ms ease-out;\n}\n\n.kaka-grid__small-dialog-input__input:focus {\n  border-bottom: solid 1px #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3;\n}\n\n.kaka-grid__small-dialog-input::after {\n  content: \'\';\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  display: block;\n  width: 100%;\n  padding-top: 8px;\n}\n\n.kaka-grid__small-dialog-input.helper-text--right-justified::after {\n  text-align: right;\n}\n\n.kaka-grid__small-dialog-input[data-helper-text]::after {\n  content: attr(data-helper-text);\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.kaka-grid__small-dialog-input[data-error-message] input {\n  border-bottom: solid 1px #ff1744;\n  box-shadow: 0 1px 0 0 #ff1744;\n}\n\n.kaka-grid__small-dialog-input[data-error-message]::after {\n  content: attr(data-error-message);\n  color: #ff1744;\n  text-align: left;\n}\n';

  const CLASSNAME_SDE = 'kaka-grid__small-dialog-input';
  const INPUT_CLASSNAME_SDE = `${ CLASSNAME_SDE }__input`;
  const HIDDEN_CLASSNAME_SDE = `${ CLASSNAME_SDE }--hidden`;
  const SHOWN_CLASSNAME_SDE = `${ CLASSNAME_SDE }--shown`;

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
      } catch (e) {
        // ignore
      }
      if (document.selection) {
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
    style$2.inject('smallDialogInputElement', smallDialogInputElementCss);
    const element = createElement('div', {
      classList: [CLASSNAME_SDE, HIDDEN_CLASSNAME_SDE]
    });
    const input = createElement('input', { classList: INPUT_CLASSNAME_SDE });
    // input.readOnly = true;
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
    constructor() {
      this._handler = new EventHandler();
      this._dialog = createDialogElement();
      this._input = this._dialog.querySelector(`.${ INPUT_CLASSNAME_SDE }`);
      this._bindDialogEvents();
    }

    static setInputAttrs(editor, grid, input) {
      setInputAttrs(editor, grid, input);
    }

    dispose() {
      const dialog = this._dialog;
      this.detach();
      this._handler.dispose();
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
      dialog.classList.remove(SHOWN_CLASSNAME_SDE);
      dialog.classList.add(HIDDEN_CLASSNAME_SDE);
      // input.readOnly = false;
      input.tabIndex = 0;
      const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      dialog.style.top = `${ rect.top.toFixed() }px`;
      dialog.style.left = `${ rect.left.toFixed() }px`;
      dialog.style.width = `${ rect.width.toFixed() }px`;
      input.style.height = `${ rect.height.toFixed() }px`;
      element.appendChild(dialog);
      setInputValue(input, value);
      input.style.font = grid.font || '16px sans-serif';
      const activeData = { grid, col, row, editor };
      this._onInputValue(input, activeData);
      if (!browser.IE) {
        _focus(input, handler);
      } else {
        // On the paste-event on IE, since it may not be focused, it will be delayed and focused.
        setTimeout(() => _focus(input, handler));
      }
      dialog.classList.add(SHOWN_CLASSNAME_SDE);
      dialog.classList.remove(HIDDEN_CLASSNAME_SDE);
      // input.readOnly = true;
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
        dialog.classList.remove(SHOWN_CLASSNAME_SDE);
        dialog.classList.add(HIDDEN_CLASSNAME_SDE);
        // input.readOnly = false;
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
      return then(this._validate(value), (res) => {
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
      const stopPropagationOnly = (e) => e.stopPropagation(); // 终止事件传播
      handler.on(dialog, 'click', stopPropagationOnly);
      handler.on(dialog, 'dblclick', stopPropagationOnly);
      handler.on(dialog, 'mousedown', stopPropagationOnly);
      handler.on(dialog, 'touchstart', stopPropagationOnly);
      handler.on(input, 'compositionstart', (e) => {
        input.classList.add('composition');
      });
      handler.on(input, 'compositionend', (e) => {
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
        const keyCode = event.getKeyCode(e);
        if (keyCode === KEY_ESC) {
          this.detach(true);
          event.cancel(e);
        } else if (keyCode === KEY_ENTER) {
          this._onKeydownEnter(e);
        } else if (keyCode === KEY_TAB) {
          this._onKeydownTab(e);
        } else {
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
      then(this._doChangeValue(), (r) => {
        var _a;
        if (r && value === input.value) {
          const grid = this._isActive() ? this._activeData.grid : null;
          this.detach(true);
          if ((_a = grid === null || grid === void 0 ? void 0 : grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
            grid.onKeyDownMove(e);
          }
        }
      });
      event.cancel(e);
    }

    _onKeydownTab(e) {
      var _a;
      if (!this._isActive() || this._attaching) {
        return;
      }
      const { grid } = this._activeData;
      if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
        return;
      }
      const input = this._input;
      const { value } = input;
      then(this._doChangeValue(), (r) => {
        if (r && value === input.value) {
          this.detach(true);
          grid.onKeyDownMove(e);
        }
      });
      event.cancel(e);
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
        } else {
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
      return then(message, (msg) => {
        if (!msg && editor.validator && !inputOnly) {
          msg = editor.validator(value, { grid, col, row });
        }
        return then(msg, (mess) => {
          if (mess && value === input.value) {
            dialog.dataset.errorMessage = mess;
          } else {
            delete dialog.dataset.errorMessage;
          }
          return !mess;
        });
      });
    }
  }

  const SMALL_DIALOG_INPUT_EDITOR_STATE_ID = getSmallDialogInputEditorStateId();
  let globalSmallDialogInputElement = null;
  let globalSmallDialogInputBindGridCount = 0;

  function getState(grid) {
    let state = grid[SMALL_DIALOG_INPUT_EDITOR_STATE_ID];
    if (!state) {
      state = {};
      obj.setReadonly(grid, SMALL_DIALOG_INPUT_EDITOR_STATE_ID, state);
    }
    return state;
  }

  function attachDialogInput(grid, cell, editor, value) {
    const state = getState(grid);
    if (!globalSmallDialogInputElement) {
      globalSmallDialogInputElement = new SmallDialogInputElement();
    }
    if (!state.element) {
      state.element = globalSmallDialogInputElement;
      globalSmallDialogInputBindGridCount++;
      grid.addDisposable({
        dispose() {
          globalSmallDialogInputBindGridCount--;
          if (!globalSmallDialogInputBindGridCount &&
            globalSmallDialogInputElement) {
            globalSmallDialogInputElement.dispose();
            globalSmallDialogInputElement = null;
          }
        }
      });
    }
    globalSmallDialogInputElement.attach(grid, editor, cell.col, cell.row, value);
  }

  function detachDialogInput(gridFocus) {
    if (globalSmallDialogInputElement) {
      globalSmallDialogInputElement.detach(gridFocus);
    }
  }

  class SmallDialogInputEditor extends BaseInputEditor {
    constructor(options = {}) {
      super(options);
      this._helperText = options.helperText;
      this._inputValidator = options.inputValidator;
      this._validator = options.validator;
      this._classList = options.classList || '';
      this._type = options.type || '';
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
      attachDialogInput(grid, cell, this, inputValue);
    }

    onOpenCellInternal(grid, cell) {
      grid.doGetCellValue(cell.col, cell.row, (value) => {
        attachDialogInput(grid, cell, this, value);
      });
    }

    onChangeSelectCellInternal(grid, cell, selected) {
      // cancel input
      detachDialogInput();
    }

    onGridScrollInternal(grid) {
      // cancel input
      detachDialogInput(true);
    }

    onChangeDisabledInternal() {
      // cancel input
      detachDialogInput(true);
    }

    onChangeReadOnlyInternal() {
      // cancel input
      detachDialogInput(true);
    }

    onSetInputAttrsInternal(grid, cell, input) {
      SmallDialogInputElement.setInputAttrs(this, grid, input);
    }
  }

  class ImmutableCheckEditor extends CheckEditor {
    get disabled() {
      return this._disabled;
    }

    get readOnly() {
      return this._readOnly;
    }
  }

  class ImmutableRadioEditor extends RadioEditor {
    get disabled() {
      return this._disabled;
    }

    get readOnly() {
      return this._readOnly;
    }
  }

  class ImmutableInputEditor extends SmallDialogInputEditor {
    get disabled() {
      return this._disabled;
    }

    get readOnly() {
      return this._readOnly;
    }
  }

  class ImmutableSwitchEditor extends SwitchEditor {
    get disabled() {
      return this._disabled;
    }

    get readOnly() {
      return this._readOnly;
    }
  }

  const ACTIONS$1 = {
    CHECK: new ImmutableCheckEditor(),
    RADIO: new ImmutableRadioEditor(),
    INPUT: new ImmutableInputEditor(),
    SWITCH: new ImmutableSwitchEditor()
  };

  function of$6(columnAction) {
    if (!columnAction) {
      return undefined;
    } else if (typeof columnAction === 'string') {
      const key = columnAction.toUpperCase();
      return ACTIONS$1[key] || of$6(null);
    } else {
      return columnAction;
    }
  }

  class BaseCheckColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._draw = options.draw;
    }

    get draw() {
      return this._draw;
    }

    drawInternal(value, context, style, helper, grid, { getRecord }) {
      const { textAlign, textBaseline, borderColor, checkBgColor, uncheckBgColor } = style;
      const record = getRecord();
      const isCustomDraw = customDraw(helper, this.draw, value, context, grid, record);
      if (!isCustomDraw) {
        const { col, row } = context;
        const range = grid.getCellRange(col, row);
        const cellKey = `${ range.start.col }:${ range.start.row }`;
        const state = this.getState(grid);
        const elapsed = state === null || state === void 0 ? void 0 : state.elapsed[cellKey];
        const opt = {
          borderColor,
          checkBgColor,
          textAlign,
          textBaseline,
          uncheckBgColor
        };
        if (isDef(elapsed)) {
          opt.animElapsedTime = elapsed;
        }
        this.doDrawInternal(helper, value, context, record, opt);
      }
    }

    convertInternal(value) {
      return toBoolean(value);
    }
  }

  let defaultBranchGraphStyle;
  const DEFAULT_BRANCH_COLORS = (_name, index) => {
    switch (index % 3) {
      case 0:
        return '#979797';
      case 1:
        return '#008fb5';
      case 2:
        return '#f1c109';
    }
    return '#979797';
  };

  class BranchGraphStyle extends BaseStyle$1 {
    constructor(style = {}) {
      super(style);
      this._branchColors = style.branchColors || DEFAULT_BRANCH_COLORS;
      this._margin = style.margin || 4;
      this._circleSize = style.circleSize || 16;
      this._branchLineWidth = style.branchLineWidth || 4;
      this._mergeStyle = style.mergeStyle === 'straight' ? 'straight' : 'bezier';
    }

    static get DEFAULT() {
      return defaultBranchGraphStyle
        ? defaultBranchGraphStyle
        : (defaultBranchGraphStyle = new BranchGraphStyle());
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

  class BranchLine {
    constructor({ fromIndex, toIndex, colorIndex, point }) {
      this.fromIndex = fromIndex;
      this.toIndex = toIndex;
      this.colorIndex = colorIndex;
      this.point = point;
    }
  }

  class BranchPoint {
    constructor({ index, commit = false, lines = [], tag }) {
      this.index = index;
      this.commit = commit;
      this.lines = lines;
      this.tag = tag;
    }

    static mergeLines(lines) {
      const result = lines.filter((l) => isDef(l.fromIndex) && isDef(l.toIndex));
      const fromLines = lines.filter((l) => isDef(l.fromIndex) && !isDef(l.toIndex));
      const toLines = lines.filter((l) => !isDef(l.fromIndex) && isDef(l.toIndex));
      fromLines.forEach((f) => {
        for (let i = 0; i < toLines.length; i++) {
          const t = toLines[i];
          if (t.point) {
            continue;
          }
          if (f.colorIndex === t.colorIndex) {
            f.toIndex = t.toIndex;
            toLines.splice(i, 1);
            break;
          }
        }
        result.push(f);
      });
      return result.concat(toLines);
    }

    static merge(a, b) {
      if (!a) {
        return b;
      }
      return new BranchPoint({
        commit: a.commit || b.commit,
        index: a.index,
        lines: BranchPoint.mergeLines(a.lines.concat(b.lines)),
        tag: a.tag || b.tag
      });
    }
  }

  const BRANCH_GRAPH_COLUMN_STATE_ID = getBranchGraphColumnStateId();

  function getAllColumnData(grid, field, callback) {
    const { dataSource } = grid;
    const allData = [];
    let promise;
    for (let index = 0; index < dataSource.length; index++) {
      const data = dataSource.getField(index, field);
      if (isPromise(data)) {
        const dataIndex = allData.length;
        allData.push(undefined);
        if (!promise) {
          promise = data.then((d) => {
            allData[dataIndex] = d;
          });
        } else {
          promise = promise
            .then(() => data)
            .then((d) => {
              allData[dataIndex] = d;
            });
        }
      } else {
        allData.push(data);
      }
    }
    if (promise) {
      promise.then(() => callback(allData));
    } else {
      callback(allData);
    }
  }

  function joinLine(timeline, branchIndex) {
    const reverse = [...timeline].reverse();
    for (let i = 0; i < reverse.length; i++) {
      const f = reverse[i][branchIndex];
      if (f) {
        f.lines = BranchPoint.mergeLines(f.lines.concat([
          new BranchLine({
            colorIndex: branchIndex,
            toIndex: branchIndex
          })
        ]));
        for (let j = 0; j < i; j++) {
          const tl = reverse[j];
          tl[branchIndex] = new BranchPoint({
            index: branchIndex,
            lines: [
              new BranchLine({
                colorIndex: branchIndex,
                fromIndex: branchIndex,
                toIndex: branchIndex
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
        const fromTL = tl[fromIndex];
        if (fromTL && fromTL.commit) {
          return index;
        }
      }
      return -1;
    }

    if (fromIndex < 0) {
      return new BranchPoint({
        index: toIndex
      });
    } else {
      const fromTargetIndex = findBranchRootIndex();
      if (fromTargetIndex === -1) {
        return null;
      }
      const branchTargetFromIndex = fromTargetIndex + 1;
      const branchPoint = new BranchPoint({
        index: toIndex,
        lines: [
          new BranchLine({
            colorIndex: toIndex,
            fromIndex
          })
        ]
      });
      let point;
      let result = null;
      if (branchTargetFromIndex < timeline.length) {
        const targetLine = timeline[branchTargetFromIndex];
        point = targetLine[toIndex] = BranchPoint.merge(targetLine[toIndex], branchPoint);
      } else {
        point = branchPoint;
        result = branchPoint;
      }
      const fromTL = timeline[fromTargetIndex][fromIndex];
      fromTL.lines = BranchPoint.mergeLines(fromTL.lines.concat([
        new BranchLine({
          colorIndex: toIndex,
          point,
          toIndex
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
      commit: true,
      index
    });
    if (joinLine(timeline, index)) {
      result.lines = BranchPoint.mergeLines(result.lines.concat([
        new BranchLine({
          colorIndex: index,
          fromIndex: index
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
          colorIndex: fromIndex,
          fromIndex
        }),
        new BranchLine({
          colorIndex: toIndex,
          fromIndex: toIndex
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
            colorIndex: fromIndex,
            toIndex
          })
        ]
      }));
    }
    if (joinLine(froms, fromIndex) && fromTargetLine) {
      fromTargetLine[fromIndex].lines = BranchPoint.mergeLines(fromTargetLine[fromIndex].lines.concat([
        new BranchLine({
          colorIndex: fromIndex,
          fromIndex
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
        const from = obj.isObject(cmd.branch) ? cmd.branch.from : null;
        const to = obj.isObject(cmd.branch) ? cmd.branch.to : cmd.branch;
        point = branch(info, from, to);
      } else if (cmd.command === 'commit') {
        point = commit(info, cmd.branch);
      } else if (cmd.command === 'merge') {
        const from = cmd.branch.from;
        const to = cmd.branch.to;
        point = commitMerge(info, from, to);
      } else if (cmd.command === 'tag') {
        point = commitTag(info, cmd.branch, cmd.tag);
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
          // 没有计算的意义
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

  function renderMerge(grid, ctx, x, y, upLineIndex, downLineIndex, colorIndex, {
    branchXPoints,
    // margin,
    branchColors, branchLineWidth, mergeStyle
  }, {
                         // width,
                         col, row, branches
                       }) {
    if (isDef(upLineIndex) || isDef(downLineIndex)) {
      ctx.strokeStyle = getOrApply(branchColors, branches[colorIndex], colorIndex);
      ctx.lineWidth = branchLineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (isDef(upLineIndex)) {
        const upX = branchXPoints[upLineIndex];
        const upRect = grid.getCellRelativeRect(col, row - 1);
        const upY = upRect.top + upRect.height / 2;
        ctx.moveTo(upX, upY);
        if (mergeStyle === 'bezier') {
          ctx.bezierCurveTo(upX, (y + upY) / 2, x, (y + upY) / 2, x, y);
        } else {
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(x, y);
      }
      if (isDef(downLineIndex)) {
        const downX = branchXPoints[downLineIndex];
        const downRect = grid.getCellRelativeRect(col, row + 1);
        const downY = downRect.top + downRect.height / 2;
        if (mergeStyle === 'bezier') {
          ctx.bezierCurveTo(x, (y + downY) / 2, downX, (y + downY) / 2, downX, downY);
        } else {
          ctx.lineTo(downX, downY);
        }
      }
      ctx.stroke();
    }
  }

  /**
   * BranchGraphColumn
   */
  class BranchGraphColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._start = options.start || 'bottom';
      this._cache = isDef(options.cache) ? options.cache : false;
    }

    get StyleClass() {
      return BranchGraphStyle;
    }

    clearCache(grid) {
      delete grid[BRANCH_GRAPH_COLUMN_STATE_ID];
    }

    onDrawCell(cellValue, info, context, grid) {
      if (this._cache) {
        const state = grid[BRANCH_GRAPH_COLUMN_STATE_ID] ||
          (grid[BRANCH_GRAPH_COLUMN_STATE_ID] = new Map());
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

    drawInternal(_value, context, style, helper, grid, _info) {
      var _a, _b;
      const { col, row } = context;
      const field = grid.getField(col, row);
      const {
        timeline,
        branches
      } = (_b = (this._cache ? (_a = grid[BRANCH_GRAPH_COLUMN_STATE_ID]) === null || _a === void 0 ? void 0 : _a.get(field) : null)) !== null && _b !== void 0 ? _b : calcBranchesInfo(this._start, grid, field);
      const { upLineIndexKey, downLineIndexKey } = this._start !== 'top'
        ? { upLineIndexKey: 'toIndex', downLineIndexKey: 'fromIndex' }
        : { upLineIndexKey: 'fromIndex', downLineIndexKey: 'toIndex' };
      const data = this._start !== 'top'
        ? timeline[timeline.length - (row - grid.frozenRowCount) - 1]
        : timeline[row - grid.frozenRowCount];
      const { branchColors, branchLineWidth, circleSize, mergeStyle, margin } = style;
      const rect = context.getRect();
      const radius = circleSize / 2;
      const width = rect.width - margin * 2;
      helper.drawWithClip(context, (ctx) => {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        const branchXPoints = calcBranchXPoints(ctx, rect.left + margin, width, radius, branches, timeline);
        const y = rect.top + rect.height / 2;
        // draw join lines
        data
          .map((point, index) => point
            ? point.lines.map((line) => ({
              colorIndex: line.colorIndex,
              downLineIndex: line[downLineIndexKey],
              pointIndex: index,
              upLineIndex: line[upLineIndexKey]
            }))
            : [])
          .reduce((p, c) => p.concat(c), []) // flatMap
          // order of overlap
          .sort((a, b) => b.colorIndex - a.colorIndex)
          .forEach((line) => {
            const x = branchXPoints[line.pointIndex];
            renderMerge(grid, ctx, x, y, line.upLineIndex, line.downLineIndex, line.colorIndex, {
              branchColors,
              branchLineWidth,
              branchXPoints,
              margin,
              mergeStyle
            }, {
              branches,
              col,
              row,
              width
            });
          });
        // draw commit points
        data.forEach((p, index) => {
          if (p && p.commit) {
            const x = branchXPoints[index];
            ctx.fillStyle = getOrApply(branchColors, branches[index], index);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
          }
        });
        // draw tags
        data.forEach((p, index) => {
          if (p && p.tag) {
            ctx.fillStyle = getOrApply(branchColors, branches[index], index);
            ctx.fillText(p.tag, branchXPoints[index] + radius + 4, y);
          }
        });
      });
    }
  }

  const INLINE_INPUT_EDITOR_STATE_ID$3 = getInlineInputEditorStateId();

  class Column extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._draw = options.draw;
      this._cellStyle = options.cellStyle;
    }

    get StyleClass() {
      return Style$1;
    }

    clone() {
      return new Column(this);
    }

    get draw() {
      return this._draw;
    }

    get cellStyle() {
      return this._cellStyle;
    }

    reviseAttachCellsArea(rect, row, grid) {
      reviseAttachCellsArea(rect, row, grid, this._cellStyle);
    }

    reviseAttachCellsPadding(padding, row, grid) {
      super.reviseAttachCellsPadding(padding, row, grid);
      reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
    }

    drawInternal(value, context, style, helper, grid, { getIcon, getRecord }) {
      const { textAlign, textBaseline, color, font, textOverflow } = style;
      helper.testFontLoad(font, value, context);
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        const isCustomDraw = customDraw(helper, this.draw, value, context, grid, getRecord());
        if (!isCustomDraw) {
          helper.text(value, ctx, {
            color,
            font,
            icons,
            padding: getActionTextPadding(context, helper, style),
            textAlign,
            textBaseline,
            textOverflow
          });
        }
        drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$3, helper, style);
        drawAttachArea(grid, getRecord(), context, helper, this._cellStyle);
      });
    }
  }

  const BUTTON_COLUMN_STATE_ID$1 = getButtonColumnStateId();

  class ButtonColumn extends Column {
    constructor(options = {}) {
      super(options);
      this._caption = options.caption;
      this._linkButton = !!options.linkButton;
    }

    get StyleClass() {
      return ButtonStyle;
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

    drawInternal(value, context, style, helper, grid, { getIcon }) {
      const { textAlign, textBaseline, color, buttonBgColor, font, padding, textOverflow } = style;
      helper.testFontLoad(font, value, context);
      const { col, row } = context;
      const range = grid.getCellRange(col, row);
      let active = false;
      let selected = false;
      const state = grid[BUTTON_COLUMN_STATE_ID$1];
      if (state) {
        if (state.mouseActiveCell &&
          cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
          active = true;
        }
        const { select } = context.getSelection();
        if (cellInRange(range, select.col, select.row)) {
          selected = true;
        }
      }
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        if (this._linkButton) {
          if (active && state && state.mouseRelativePos) {
            const rect = helper.getTextRect(value, ctx, {
              font,
              icons,
              padding,
              textAlign,
              textBaseline,
              textOverflow
            });
            active =
              rect.left <= state.mouseRelativePos.x &&
              rect.right >= state.mouseRelativePos.x &&
              rect.top <= state.mouseRelativePos.y &&
              rect.bottom >= state.mouseRelativePos.y;
            state.mouseActive = active;
          }
          helper.text(value, ctx, {
            color: active ? buttonBgColor || helper.theme.button.bgColor : color || helper.theme.button.color,
            font,
            icons,
            padding,
            textAlign,
            textBaseline,
            textOverflow
          });
        } else {
          if (active) {
            state.mouseActive = active;
          }
          helper.button(value, ctx, {
            bgColor: buttonBgColor,
            color,
            font,
            icons,
            padding,
            shadow: active || selected
              ? {
                blur: 6,
                color: 'rgba(0, 0, 0, 0.48)',
                offsetY: 3
              }
              : {},
            textAlign,
            textBaseline,
            textOverflow
          });
        }
      });
    }

    convertInternal(value) {
      return this._caption || super.convertInternal(value);
    }
  }

  const CHECK_COLUMN_STATE_ID = getCheckColumnStateId();

  class CheckColumn extends BaseCheckColumn {
    constructor(options = {}) {
      super(options);
    }

    get StyleClass() {
      return CheckStyle;
    }

    clone() {
      return new CheckColumn(this);
    }

    getState(grid) {
      let state = grid[CHECK_COLUMN_STATE_ID];
      if (!state) {
        state = { block: {}, elapsed: {} };
        obj.setReadonly(grid, CHECK_COLUMN_STATE_ID, state);
      }
      return state;
    }

    doDrawInternal(helper, value, context, record, opt) {
      helper.checkbox(value, context, opt);
    }
  }

  const SWITCH_COLUMN_STATE_ID = getSwitchColumnStateId();

  class SwitchColumn extends BaseCheckColumn {
    constructor(options = {}) {
      super(options);
      this._textOn = options.textOn;
      this._textOff = options.textOff;
    }

    get textOn() {
      return this._textOn;
    }

    set textOn(value) {
      this._textOn = value;
    }

    get textOff() {
      return this._textOff;
    }

    set textOff(value) {
      this._textOff = value;
    }

    get StyleClass() {
      return SwitchStyle$1;
    }

    clone() {
      return new SwitchColumn(this);
    }

    getState(grid) {
      let state = grid[SWITCH_COLUMN_STATE_ID];
      if (!state) {
        state = { block: {}, elapsed: {} };
        obj.setReadonly(grid, SWITCH_COLUMN_STATE_ID, state);
      }
      return state;
    }

    doDrawInternal(helper, value, context, record, opt) {
      const textOff = getOrApply(this.textOff, record);
      const textOn = getOrApply(this.textOn, record);
      const options = Object.assign(Object.assign({}, opt), {
        textOn,
        textOff
      });
      helper.switch(value, context, options);
    }
  }

  let defaultDateTimeFormat;

  class DateColumn extends Column {
    constructor(options = {}) {
      super(options);
      this._format = options.format;
    }

    static get defaultFormat() {
      return (defaultDateTimeFormat ||
        (defaultDateTimeFormat = new Intl.DateTimeFormat()));
    }

    static set defaultFormat(fmt) {
      defaultDateTimeFormat = fmt;
    }

    get StyleClass() {
      return DateStyle;
    }

    get format() {
      return this._format;
    }

    clone() {
      return new DateColumn(this);
    }

    withFormat(format) {
      const c = this.clone();
      c._format = format;
      return c;
    }

    convertInternal(value) {
      if (value instanceof Date) {
        const format = this._format || DateColumn.defaultFormat;
        return format.format(value);
      } else {
        return '';
      }
    }
  }

  const INLINE_INPUT_EDITOR_STATE_ID$2 = getInlineInputEditorStateId();

  class DrawColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._draw = options.draw;
    }

    get StyleClass() {
      return DrawStyle;
    }

    clone() {
      return new DrawColumn(this);
    }

    get draw() {
      return this._draw;
    }

    drawInternal(value, context, style, helper, grid, { getRecord }) {
      customDraw(helper, this.draw, value, context, grid, getRecord());
      drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$2, helper, style);
    }
  }

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

  class IconColumn extends Column {
    constructor(options = {}) {
      super(options);
      this._tagName = options.tagName || 'i';
      this._className = options.className;
      this._content = options.content;
      this._name = options.name;
      this._iconWidth = options.iconWidth;
    }

    get StyleClass() {
      return IconStyle;
    }

    clone() {
      return new IconColumn(this);
    }

    drawInternal(value, context, style, helper, grid, info) {
      const num = Number(value);
      if (!isNaN(num)) {
        const icon = {};
        icons$2.iconPropKeys.forEach((k) => {
          icon[k] = style[k];
        });
        icon.className = this._className;
        icon.tagName = this._tagName;
        icon.content = this._content;
        icon.name = this._name;
        if (this._iconWidth) {
          icon.width = this._iconWidth;
        }
        info.getIcon = () => repeatArray(icon, num);
      } else {
        info.getIcon = () => null;
      }
      super.drawInternal('', context, style, helper, grid, info);
    }
  }

  const fontSizeCache = {};

  function getFontSize(ctx, font) {
    const fontName = font || ctx.font;
    if (fontSizeCache[fontName]) {
      return fontSizeCache[fontName];
    }
    const bk = ctx.font;
    try {
      ctx.font = fontName;
      const em = ctx.measureText('哦').width;
      return (fontSizeCache[fontName] = {
        height: em,
        width: em
      });
    } finally {
      ctx.font = bk;
    }
  }

  function calcBasePosition(ctx, rect, { offset = 0, padding: { left: paddingLeft = 0, right: paddingRight = 0, top: paddingTop = 0, bottom: paddingBottom = 0 } = {} } = {}) {
    return calcStartPosition(ctx, rect, 0, 0, {
      offset,
      padding: {
        bottom: paddingBottom,
        left: paddingLeft,
        right: paddingRight,
        top: paddingTop
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
    } else if (textAlign === 'center') {
      x = rect.left + (rect.width - width + paddingLeft - paddingRight) / 2;
    }
    let y = rect.top + offset + paddingTop;
    if (textBaseline === 'bottom' ||
      textBaseline === 'alphabetic' ||
      textBaseline === 'ideographic') {
      y = rect.bottom - height - offset - paddingBottom;
    } else if (textBaseline === 'middle') {
      y = rect.top + (rect.height - height + paddingTop - paddingBottom) / 2;
    }
    return { x, y };
  }

  class LRUCache {
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

  const allCache = {};
  // function isDataUrl(url: string): boolean {
  //   return url ? url.search(/^(data:)/) !== -1 : false
  // }
  function loadImage(src) {
    if (typeof Promise === 'undefined') {
      window.console.error('Promise is not loaded. load Promise before this process.');
      return {
        then() {
          return this;
        }
      };
    }
    const img = new Image();
    const result = new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      };
    });
    img.onerror = () => {
      const url = src.length > 200 ? `${ src.substr(0, 200) }...` : src;
      console.warn(`cannot load: ${ url }`);
      throw new Error(`IMAGE LOAD ERROR: ${ url }`);
    };
    // img.src = isDataUrl(src) ? src : `${src}?${Date.now()}`
    img.src = src;
    return result;
  }

  function getCacheOrLoad0(cache, src) {
    return then(src, (src) => {
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
    const cache = allCache[cacheName] ||
      (allCache[cacheName] = new LRUCache(cacheSize));
    return getCacheOrLoad0(cache, src);
  }

  const INLINE_INPUT_EDITOR_STATE_ID$1 = getInlineInputEditorStateId();
  const MAX_LRU_CACHE_SIZE = 50;

  function getImage(url) {
    return getCacheOrLoad('ImageColumn', MAX_LRU_CACHE_SIZE, url);
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
      height: newHeight,
      width: newWidth
    };
  }

  class ImageColumn extends BaseColumn {
    get StyleClass() {
      return ImageStyle;
    }

    onDrawCell(cellValue, info, context, grid) {
      const img = cellValue ? getImage(cellValue) : '';
      return super.onDrawCell(img, info, context, grid);
    }

    clone() {
      return new ImageColumn(this);
    }

    drawInternal(value, context, style, helper, grid, _info) {
      const { textAlign, textBaseline, margin } = style;
      if (value) {
        helper.drawWithClip(context, (ctx) => {
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          const rect = context.getRect().copy();
          const padding = getActionTextPadding(context, helper, style);
          rect.width -= padding[1];
          if (rect.width < 0) {
            rect.width = 0;
          }
          if (style.imageSizing === 'keep-aspect-ratio') {
            const size = calcKeepAspectRatioSize(value.width, value.height, rect.width - margin * 2, rect.height - margin * 2);
            const width = size.width;
            const height = size.height;
            const pos = calcStartPosition(ctx, rect, width, height, {
              offset: margin
            });
            ctx.drawImage(value, 0, 0, value.width, value.height, pos.x, pos.y, width, height);
          } else {
            ctx.drawImage(value, 0, 0, value.width, value.height, rect.left + margin, rect.top + margin, rect.width - margin * 2, rect.height - margin * 2);
          }
        });
      }
      drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$1, helper, style);
    }
  }

  const INLINE_LOOKUP_EDITOR_STATE_ID = getInlineLookupEditorStateId();
  let lookupColumnPromiseDrawingCol = '';

  class LookupColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._lookupMap = {};
      this._records = options.records;
      this._valueField = options.valueField;
      this._captionField = options.captionField;
      this._draw = options.draw;
      this._cellStyle = options.cellStyle;
    }

    get StyleClass() {
      return LookupStyle;
    }

    get records() {
      return this._records;
    }

    get valueField() {
      return this._valueField;
    }

    get captionField() {
      return this._captionField;
    }

    get draw() {
      return this._draw;
    }

    get cellStyle() {
      return this._cellStyle;
    }

    reviseAttachCellsArea(rect, row, grid) {
      reviseAttachCellsArea(rect, row, grid, this._cellStyle);
    }

    reviseAttachCellsPadding(padding, row, grid) {
      super.reviseAttachCellsPadding(padding, row, grid);
      reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
    }

    clone() {
      return new LookupColumn(this);
    }

    drawInternal(value, context, style, helper, grid, info) {
      const getIcon = info.getIcon;
      const getCell = info.getCell;
      const getRecord = info.getRecord;
      const records = getOrApply(this.records || [], getRecord());
      if (isPromise(records)) {
        const cell = getCell();
        const col = cell.col;
        const row = cell.row;
        if (!lookupColumnPromiseDrawingCol) {
          records.then(((me, col, row) => (rs) => {
            lookupColumnPromiseDrawingCol = String(col);
            try {
              me._mergeRecords(rs);
              const range = grid.getCellRange(col, row);
              grid.invalidateCellRange(range);
            } finally {
              lookupColumnPromiseDrawingCol = '';
            }
          })(this, col, row));
          return;
        }
      } else {
        this._mergeRecords(records);
      }
      const textAlign = style.textAlign;
      const textBaseline = style.textBaseline;
      const font = style.font;
      const textOverflow = style.textOverflow;
      let color = style.color;
      const text = this._convertInternal(value, getCell(), grid);
      helper.testFontLoad(font, text, context);
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        const isCustomDraw = customDraw(helper, this.draw, text, context, grid, getRecord());
        if (!isCustomDraw) {
          if (!isDef(color) && (!isDef(value) || value === '')) {
            color = 'rgba(0, 0, 0, .38)';
          }
          helper.text(text, ctx, {
            color,
            font,
            icons,
            padding: getActionTextPadding(ctx, helper, style),
            textAlign,
            textBaseline,
            textOverflow
          });
        }
        drawActionButton(grid, ctx, INLINE_LOOKUP_EDITOR_STATE_ID, helper, style);
        drawAttachArea(grid, getRecord(), context, helper, this._cellStyle);
      });
    }

    convertCopyInternal(value) {
      return isDef(value) ? this._convertInternalValue(value) : '';
    }

    convertInternal(value) {
      return value;
    }

    doConvertInternal(value, _cell, _grid) {
      return this.convertInternal(value);
    }

    _convertInternalValue(value) {
      const key = isDef(value) ? value + '' : '';
      let v = this._lookupMap[key];
      if (!isDef(v)) {
        v = key;
      }
      return v;
    }

    _convertInternal(value, cell, grid) {
      let v = this._convertInternalValue(value);
      if (this.convert) {
        v = this.convert(value, v, cell, grid);
      }
      return this.doConvertInternal(v, cell, grid);
    }

    _mergeRecords(recs = []) {
      const valueField = this.valueField || 'id';
      const captionField = this.captionField || valueField;
      for (const record of recs) {
        let key = record[valueField];
        key = isDef(key) ? key + '' : '';
        let value = record[captionField];
        value = isDef(value) ? value + '' : '';
        this._lookupMap[key] = value;
      }
    }
  }

  const INLINE_TEXTAREA_EDITOR_STATE_ID = getInlineTextareaEditorStateId();

  class MultilineTextColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._draw = options.draw;
      this._cellStyle = options.cellStyle;
    }

    get StyleClass() {
      return MultilineTextStyle;
    }

    clone() {
      return new MultilineTextColumn(this);
    }

    get draw() {
      return this._draw;
    }

    get cellStyle() {
      return this._cellStyle;
    }

    reviseAttachCellsArea(rect, row, grid) {
      reviseAttachCellsArea(rect, row, grid, this._cellStyle);
    }

    reviseAttachCellsPadding(padding, row, grid) {
      super.reviseAttachCellsPadding(padding, row, grid);
      reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
    }

    drawInternal(value, context, style, helper, grid, { getIcon, getRecord }) {
      const { textAlign, textBaseline, color, font, lineHeight, autoWrapText, lineClamp, textOverflow } = style;
      const v = isDef(value) ? value + '' : '';
      const multiline = v.replace(/\r?\n/g, '\n').replace(/\r/g, '\n').split('\n');
      helper.testFontLoad(font, v, context);
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        const isCustomDraw = customDraw(helper, this.draw, multiline, context, grid, getRecord());
        if (!isCustomDraw) {
          helper.multilineText(multiline, ctx, {
            autoWrapText,
            color,
            font,
            icons,
            lineClamp,
            lineHeight,
            padding: getActionTextPadding(context, helper, style),
            textAlign,
            textBaseline,
            textOverflow
          });
        }
        drawActionButton(grid, context, INLINE_TEXTAREA_EDITOR_STATE_ID, helper, style);
        drawAttachArea(grid, getRecord(), context, helper, this._cellStyle);
      });
    }
  }

  let defaultFormat;

  class NumberColumn extends Column {
    constructor(options = {}) {
      super(options);
      this._format = options.format;
    }

    static get defaultFormat() {
      return defaultFormat || (defaultFormat = new Intl.NumberFormat());
    }

    static set defaultFormat(fmt) {
      defaultFormat = fmt;
    }

    get StyleClass() {
      return NumberStyle;
    }

    get format() {
      return this._format;
    }

    clone() {
      return new NumberColumn(this);
    }

    withFormat(format) {
      const c = this.clone();
      c._format = format;
      return c;
    }

    convertInternal(value) {
      let s = (value + '').trim();
      if (s) {
        s = s - 0;
        if (isNaN(s)) {
          s = '';
        } else {
          s = (this._format || NumberColumn.defaultFormat).format(s);
        }
      }
      return s;
    }
  }

  const MARGIN = 2;

  class PercentCompleteBarColumn extends Column {
    constructor(options = {}) {
      super(options);
      this._min = options.min || 0;
      this._max = options.max || this._min + 100;
      this._formatter = options.formatter || ((v) => v);
    }

    get StyleClass() {
      return PercentCompleteBarStyle;
    }

    clone() {
      return new PercentCompleteBarColumn(this);
    }

    drawInternal(value, context, style, helper, grid, info) {
      super.drawInternal(this._formatter(value), context, style, helper, grid, info);
      const barColor = style.barColor;
      const barBgColor = style.barBgColor;
      const barHeight = style.barHeight;
      let sValue = `${ value }`;
      if (str.endsWith(sValue, '%')) {
        sValue = sValue.substr(0, sValue.length - 1);
      }
      const num = Number(sValue);
      const rate = num < this._min
        ? 0
        : num > this._max
          ? 1
          : (num - this._min) / (this._max - this._min);
      helper.drawWithClip(context, (ctx) => {
        const rect = context.getRect();
        const barMaxWidth = rect.width - MARGIN * 2 - 1; /*边线*/
        const barTop = rect.bottom - MARGIN - barHeight - 1; /*边线*/
        const barLeft = rect.left + MARGIN;
        ctx.fillStyle = getOrApply(barBgColor, rate * 100) || '#f0f3f5';
        ctx.beginPath();
        ctx.rect(barLeft, barTop, barMaxWidth, barHeight);
        ctx.fill();
        const barSize = Math.min(barMaxWidth * rate, barMaxWidth);
        ctx.fillStyle = getOrApply(barColor, rate * 100) || '#20a8d8';
        ctx.beginPath();
        ctx.rect(barLeft, barTop, barSize, barHeight);
        ctx.fill();
      });
    }
  }

  function createArray(get, length) {
    const array = new Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = get(i);
    }
    return array;
  }

  function createArrayPromise(get, getField, length) {
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
        if (isPromise(data)) {
          plist.push(data.then((v) => {
            record.v = v;
            record.f = v;
          }));
        }
      }
      Promise.all(plist)
        .then(() => getField == null
          ? array
          : setArrayField(array, getField))
        .then(resolve);
    });
  }

  function setArrayField(array, getField) {
    return new Promise((resolve) => {
      const { length } = array;
      const plist = [];
      for (let i = 0; i < length; i++) {
        const record = array[i];
        const f = getField(record.v);
        if (isPromise(f)) {
          plist.push(f.then((v) => {
            record.f = v;
          }));
        } else {
          record.f = f;
        }
      }
      Promise.all(plist).then(() => resolve(array));
    });
  }

  function sort(get, set, length, compare, getField) {
    const old = createArray(get, length);
    if (getField != null) {
      old.sort((r1, r2) => compare(getField(r1), getField(r2)));
    } else {
      old.sort(compare);
    }
    for (let i = 0; i < length; i++) {
      set(i, old[i]);
    }
  }

  function sortPromise(get, set, length, compare, getField) {
    if (typeof Promise !== 'undefined') {
      return createArrayPromise(get, getField, length).then((array) => {
        array.sort((r1, r2) => compare(r1.f, r2.f));
        for (let i = 0; i < length; i++) {
          set(i, array[i].v);
        }
      });
    } else {
      sort(get, set, length, compare, getField);
      const dummyPromise = {
        then(fn) {
          fn();
          return dummyPromise;
        },
        catch() {
          return dummyPromise;
        }
      };
      return dummyPromise;
    }
  }

  function isFieldAssessor(field) {
    if (obj.isObject(field)) {
      const a = field;
      if (a.get && a.set) {
        return true;
      }
    }
    return false;
  }

  const DATA_SOURCE_EVENT_TYPE = {
    REFRESH_DATA: 'refresh_data',
    UPDATED_LENGTH: 'updated_length',
    UPDATED_ORDER: 'updated_order',
    UPDATE_LENGTH: 'update_length'
  };

  function getValue(value, setPromiseBack) {
    const maybePromiseValue = getOrApply(value);
    if (isPromise(maybePromiseValue)) {
      const promiseValue = maybePromiseValue.then((r) => {
        setPromiseBack(r);
        return r;
      });
      // 临时缓存
      setPromiseBack(promiseValue);
      return promiseValue;
    } else {
      return maybePromiseValue;
    }
  }

  function getField(record, field, setPromiseBack) {
    if (!isDef(record)) {
      return undefined;
    }
    if (isPromise(record)) {
      return record.then((r) => getField(r, field, setPromiseBack));
    }
    const fieldGet = isFieldAssessor(field) ? field.get : field;
    if (typeof fieldGet === 'string' && fieldGet in record) {
      const fieldResult = record[fieldGet];
      return getValue(fieldResult, setPromiseBack);
    }
    if (typeof fieldGet === 'function') {
      const fieldResult = fieldGet(record);
      return getValue(fieldResult, setPromiseBack);
    }
    const ss = `${ fieldGet }`.split('.');
    if (ss.length <= 1) {
      const fieldResult = record[fieldGet];
      return getValue(fieldResult, setPromiseBack);
    }
    const fieldResult = applyChainSafe(record, (val, name) => getField(val, name, emptyFn), ...ss);
    return getValue(fieldResult, setPromiseBack);
  }

  function setField(record, field, value) {
    if (record == null) {
      return false;
    }
    const fieldSet = isFieldAssessor(field) ? field.set : field;
    if (typeof fieldSet === 'string' && fieldSet in record) {
      record[fieldSet] = value;
    } else if (typeof fieldSet === 'function') {
      return fieldSet(record, value);
    } else if (typeof fieldSet === 'string') {
      const ss = `${ fieldSet }`.split('.');
      let obj = record;
      const { length } = ss;
      for (let i = 0; i < length; i++) {
        const f = ss[i];
        if (i === length - 1) {
          obj[f] = value;
        } else {
          obj = obj[f] || (obj[f] = {});
        }
      }
    } else {
      record[fieldSet] = value;
    }
    return true;
  }

  function _getIndex(sortedIndexMap, index) {
    if (!sortedIndexMap) {
      return index;
    }
    const mapIndex = sortedIndexMap[index];
    return isDef(mapIndex) ? mapIndex : index;
  }

  /**
   * grid data source
   */
  class DataSource extends EventTarget {
    constructor(obj) {
      var _a;
      super();
      this._sortedIndexMap = null;
      this._get = (obj === null || obj === void 0 ? void 0 : obj.get.bind(obj)) || undefined;
      this._length = (obj === null || obj === void 0 ? void 0 : obj.length) || 0;
      this._source = (_a = obj === null || obj === void 0 ? void 0 : obj.source) !== null && _a !== void 0 ? _a : obj;
    }

    static get EVENT_TYPE() {
      return DATA_SOURCE_EVENT_TYPE;
    }

    static ofArray(array) {
      return new DataSource({
        get: (index) => array[index],
        length: array.length,
        source: array
      });
    }

    get source() {
      return this._source;
    }

    get(index) {
      return this.getOriginal(_getIndex(this._sortedIndexMap, index));
    }

    getField(index, field) {
      return this.getOriginalField(_getIndex(this._sortedIndexMap, index), field);
    }

    hasField(index, field) {
      return this.hasOriginalField(_getIndex(this._sortedIndexMap, index), field);
    }

    setField(index, field, value) {
      return this.setOriginalField(_getIndex(this._sortedIndexMap, index), field, value);
    }

    sort(field, order) {
      const sortedIndexMap = new Array(this._length);
      const orderFn = order !== 'desc'
        ? (v1, v2) => (v1 === v2 ? 0 : v1 > v2 ? 1 : -1)
        : (v1, v2) => (v1 === v2 ? 0 : v1 < v2 ? 1 : -1);
      return sortPromise((index) => isDef(sortedIndexMap[index])
        ? sortedIndexMap[index]
        : (sortedIndexMap[index] = index), (index, rel) => {
        sortedIndexMap[index] = rel;
      }, this._length, orderFn, (index) => this.getOriginalField(index, field))
        .then(() => {
          this._sortedIndexMap = sortedIndexMap;
          this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATED_ORDER);
        });
    }

    get length() {
      return this._length;
    }

    set length(length) {
      if (this._length !== length) {
        this.setLength(length);
      }
    }

    refresh() {
      this.refreshInternal();
      this.fireListeners(DATA_SOURCE_EVENT_TYPE.REFRESH_DATA);
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
      if (!isDef(field)) {
        return undefined;
      }
      const record = this.getOriginal(index);
      return getField(record, field, (val) => {
        this.fieldPromiseCallBackInternal(index, field, val);
      });
    }

    hasOriginalField(index, field) {
      if (!isDef(field)) {
        return false;
      }
      if (typeof field === 'function') {
        return true;
      }
      const record = this.getOriginal(index);
      return Boolean(record && typeof field === 'string' && field in record);
    }

    setOriginalField(index, field, value) {
      if (!isDef(field)) {
        return false;
      }
      const record = this.getOriginal(index);
      if (isPromise(record)) {
        return record.then((r) => setField(r, field, value));
      }
      return setField(record, field, value);
    }

    fieldPromiseCallBackInternal(_index, _field, _value) {
      // nothing
    }

    recordPromiseCallBackInternal(_index, _record) {
      // nothing
    }

    refreshInternal() {
      // nothing
    }

    setLength(length) {
      const results = this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATE_LENGTH, length);
      if (array.findIndex(results, (v) => !v) >= 0) {
        return;
      }
      this._length = length;
      this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATED_LENGTH, this._length);
    }
  }

  DataSource.EMPTY = new DataSource({
    get() {
    },
    length: 0
  });

  function _initLevel(ds, record, level) {
    const key = record[ds.options.keyField];
    ds._levelMap[key] = level;
    const children = ds._pIdMap[key] || [];
    for (const child of children) {
      _initLevel(ds, child, level + 1);
    }
  }

  function _initLast(ds, records) {
    if (records && records.length > 0) {
      const key = records[records.length - 1][ds.options.keyField];
      ds._lastMap[key] = true;
    }
  }

  function _expandAll(ds, record) {
    const key = record[ds.options.keyField];
    const children = ds._pIdMap[key] || [];
    if (children.length > 0) {
      ds._expandMap[key] = true;
      for (const r of children) {
        _expandAll(ds, r);
      }
    }
  }

  function _getExpandRecords(ds, record) {
    let records = [];
    const key = record[ds.options.keyField];
    if (ds._expandMap[key]) {
      const children = ds._pIdMap[key] || [];
      for (const r of children) {
        records.push(r);
        records = records.concat(_getExpandRecords(ds, r));
      }
    }
    return records;
  }

  function _getCollapseRecordCount(ds, index) {
    const record = ds._records[index];
    const key = record[ds.options.keyField];
    const level = ds._levelMap[key];
    let count = 0;
    for (let i = index + 1; i < ds._records.length; i++) {
      const r = ds._records[i];
      const k = r[ds.options.keyField];
      if (level < ds._levelMap[k]) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  function _expand(ds, record, all, silent, callback) {
    if (record) {
      const index = ds._records.indexOf(record);
      const key = record[ds._options.keyField];
      if (ds._pIdMap[key]) {
        if (!ds._expandMap[key]) {
          if (all) {
            _expandAll(ds, record);
          } else {
            ds._expandMap[key] = true;
          }
          ds._records.splice(index + 1, 0, ..._getExpandRecords(ds, record));
        } else if (all) {
          _expandAll(ds, record);
          ds._records.splice(index + 1, _getCollapseRecordCount(ds, index), ..._getExpandRecords(ds, record));
        }
        if (silent === 0) {
          ds.length = ds._records.length;
        }
      } else if (callback) {
        callback(ds, record, all, silent);
      }
    }
  }

  function _collapseAll(ds, record) {
    const key = record[ds.options.keyField];
    delete ds._expandMap[key];
    const children = ds._pIdMap[key] || [];
    for (const r of children) {
      _collapseAll(ds, r);
    }
  }

  function _parentKey(ds, key) {
    const record = ds._idMap[key];
    const parentKey = record[ds.options.parentKeyField];
    return parentKey;
  }

  function _rebuildTree(ds, silent) {
    // 构建显示记录列表
    ds._levelMap = {}; // 级别索引列表
    ds._lastMap = {}; // 是否末节点列表
    ds._rootRecords = []; // 根记录对象列表
    ds._records = []; // 显示记录列表
    for (const parentKey in ds._pIdMap) {
      if (ds._pIdMap.hasOwnProperty(parentKey)) {
        const records = ds._pIdMap[parentKey];
        if (ds._idMap[parentKey]) {
          _initLast(ds, records);
        } else {
          for (const item of records) {
            _initLevel(ds, item, 0);
            ds._rootRecords.push(item);
            ds._records.push(item);
            ds._records.push(..._getExpandRecords(ds, item));
          }
        }
      }
    }
    _initLast(ds, ds._rootRecords);
    // 清理展开信息
    for (const key in ds._expandMap) {
      if (!ds._pIdMap[key]) {
        delete ds._expandMap[key];
      }
    }
    if (silent === 0) {
      ds.length = ds._records.length;
    }
  }

  function _lazyLoadRecords(ds, records, expandedKeys, silent) {
    let hasNewRecords = false;
    for (const record of records) {
      const key = record[ds._options.keyField];
      if (!ds._idMap[key]) {
        hasNewRecords = true;
        const pKey = record[ds._options.parentKeyField];
        ds._idMap[key] = record;
        ds._pIdMap[pKey] = ds._pIdMap[pKey] || [];
        ds._pIdMap[pKey].push(record);
        if (expandedKeys &&
          Array.isArray(expandedKeys) &&
          expandedKeys.indexOf(key) >= 0) {
          ds._expandMap[key] = true;
        }
      }
    }
    if (hasNewRecords) {
      _rebuildTree(ds, silent);
    }
  }

  function _lazyLoadChildren(ds, record, all, silent, callback) {
    if (ds._options.hasChildren &&
      ds._options.getChildren &&
      ds._options.hasChildren(record)) {
      const records = ds._options.getChildren(record, all);
      if (isPromise(records)) {
        records.then((recs) => {
          const rs = Array.isArray(recs) ? recs : recs.records;
          const expandedKeys = Array.isArray(recs) ? undefined : recs.expandedKeys;
          _lazyLoadRecords(ds, rs, expandedKeys, silent);
          if (callback) {
            callback(ds, record, all, silent);
          }
        });
      } else {
        _lazyLoadRecords(ds, records, null, silent);
        if (callback) {
          callback(ds, record, all, silent);
        }
      }
    }
  }

  /**
   * grid data source for tree
   */
  class TreeDataSource extends DataSource {
    constructor(dataSource, options) {
      super(dataSource);
      this._idMap = {};
      this._pIdMap = {};
      this._levelMap = {};
      this._lastMap = {};
      this._rootRecords = [];
      this._records = [];
      this._updateLengthSilentCounter = 0;
      this._dataSource = dataSource;
      this._options = options;
      this._expandMap = {};
      for (const key of options.expandedKeys || []) {
        this._expandMap[key] = true;
      }
      this.refreshInternal();
    }

    static get EVENT_TYPE() {
      return DataSource.EVENT_TYPE;
    }

    get options() {
      return this._options;
    }

    get expandedKeys() {
      return Object.keys(this._expandMap);
    }

    getOriginal(index) {
      return this._records[index];
    }

    getTreeInfo(index) {
      const record = this.getOriginal(index);
      if (record) {
        const key = record[this._options.keyField];
        const parentKey = _parentKey(this, key);
        const expanded = !!this._expandMap[key];
        let isLeaf = !this._pIdMap[key];
        const isLast = !!this._lastMap[key];
        const level = this._levelMap[key];
        const levelLast = [];
        let k = key;
        for (let i = 0; i < level; i++) {
          levelLast.unshift(!!this._lastMap[k]);
          k = _parentKey(this, k);
        }
        if (isLeaf && this._options.hasChildren) {
          isLeaf = !this._options.hasChildren(record);
        }
        return {
          expanded,
          isLast,
          isLeaf,
          key,
          level,
          levelLast,
          parentKey
        };
      } else {
        return undefined;
      }
    }

    getIndexByKey(key) {
      return this._records.indexOf(this._idMap[key]);
    }

    expandAll() {
      this._records.length = 0;
      for (const record of this._rootRecords) {
        _expandAll(this, record);
        this._records.push(record);
        this._records.push(..._getExpandRecords(this, record));
      }
      this.length = this._records.length;
    }

    expand(index, all = false) {
      const record = this.getOriginal(index);
      _expand(this, record, all, this._updateLengthSilentCounter, (ds1, record1, all1, silent1) => {
        _lazyLoadChildren(ds1, record1, all1, silent1, (ds2, record2, all2, silent2) => {
          _expand(ds2, record2, all2, silent2);
        });
      });
    }

    expandToKey(key) {
      // 根据指定的主键，展开到该记录，并返回索引值
      const parentKeys = [];
      let value = key;
      let record = this._idMap[value];
      while (record) {
        value = record[this._options.parentKeyField];
        record = this._idMap[value];
        if (record) {
          parentKeys.unshift(value);
        }
      }
      this._updateLengthSilentCounter++;
      try {
        for (const parentKey of parentKeys) {
          this.expand(this._records.indexOf(this._idMap[parentKey]));
        }
      } finally {
        this._updateLengthSilentCounter--;
        if (this._updateLengthSilentCounter === 0) {
          this.length = this._records.length;
        }
      }
      return this.getIndexByKey(key);
    }

    expandToLevel(level) {
      // 展开到指定级别
      const targets = [];
      if (level > 0) {
        this._updateLengthSilentCounter++;
        try {
          for (const key in this._levelMap) {
            if (this._levelMap.hasOwnProperty(key)) {
              if (level === this._levelMap[key] ||
                (level > this._levelMap[key] && this._lastMap[key])) {
                targets.push(this.expandToKey(key));
              }
            }
          }
        } finally {
          this._updateLengthSilentCounter--;
          if (this._updateLengthSilentCounter === 0) {
            this.length = this._records.length;
          }
        }
      }
      return targets;
    }

    collapseAll() {
      this._records.length = 0;
      this._records.push(...this._rootRecords);
      this._expandMap = {};
      this.length = this._records.length;
    }

    collapse(index, all) {
      const record = this.getOriginal(index);
      if (record) {
        const key = record[this._options.keyField];
        if (this._pIdMap[key]) {
          if (this._expandMap[key]) {
            if (all) {
              _collapseAll(this, record);
            } else {
              delete this._expandMap[key];
            }
            this._records.splice(index + 1, _getCollapseRecordCount(this, index));
            this.length = this._records.length;
          } else if (all) {
            _collapseAll(this, record);
          }
        }
      }
    }

    toggle(index, all) {
      const record = this.getOriginal(index);
      if (record) {
        const key = record[this._options.keyField];
        if (this._expandMap[key]) {
          this.collapse(index, all);
        } else {
          this.expand(index, all);
        }
      }
    }

    get source() {
      return this._dataSource.source;
    }

    get dataSource() {
      return this._dataSource;
    }

    refreshInternal() {
      // 构建 id 和 pId 与记录的对应关系
      this._idMap = {};
      this._pIdMap = {};
      for (let i = 0; i < this._dataSource.length; i++) {
        const key = this._dataSource.getField(i, this._options.keyField);
        const parentKey = this._dataSource.getField(i, this._options.parentKeyField);
        const record = this._dataSource.get(i);
        this._idMap[key] = record;
        this._pIdMap[parentKey] = this._pIdMap[parentKey] || [];
        this._pIdMap[parentKey].push(record);
      }
      // 构建显示记录列表
      _rebuildTree(this, this._updateLengthSilentCounter);
      if (this.length === 0) {
        _lazyLoadChildren(this, null, false, this._updateLengthSilentCounter);
      }
    }
  }

  const INLINE_INPUT_EDITOR_STATE_ID = getInlineInputEditorStateId();
  const BUTTON_COLUMN_STATE_ID = getButtonColumnStateId();
  const COLUMN_ACTION_STATE_ID = getColumnActionStateId();
  const TREE_NODE_SPACE = 16;

  function _getTreeInfo(grid, row) {
    let treeInfo = undefined;
    if (grid.dataSource instanceof TreeDataSource) {
      const recordIndex = grid.getRecordIndexByRow(row);
      if (recordIndex >= 0) {
        treeInfo = grid.dataSource.getTreeInfo(recordIndex);
      }
    }
    return treeInfo;
  }

  function _getTreeNodeSpaceWidth(treeInfo) {
    let width = 0;
    if (treeInfo) {
      width += treeInfo.level * TREE_NODE_SPACE + TREE_NODE_SPACE * 2;
    }
    return width;
  }

  function _isTreeNodeSpace(grid, col, row, event) {
    let bool = false;
    const relativePos = grid._getMouseRelativePoint(event);
    if (relativePos) {
      const rect = grid.getCellRelativeRect(col, row);
      const treeInfo = _getTreeInfo(grid, row);
      if (treeInfo && !treeInfo.isLeaf) {
        const treeNodeSpaceWidth = _getTreeNodeSpaceWidth(treeInfo);
        if (treeNodeSpaceWidth &&
          relativePos.x - rect.left < treeNodeSpaceWidth) {
          bool = true;
        }
      }
    }
    return bool;
  }

  class TreeColumn extends BaseColumn {
    constructor(options = {}) {
      super(options);
      this._canToggle = options.canToggle;
      this._toggled = options.toggled;
      this._draw = options.draw;
      this._cellStyle = options.cellStyle;
      this._multilineText = options.multilineText;
    }

    get StyleClass() {
      return TreeStyle;
    }

    get canToggle() {
      return this._canToggle;
    }

    get toggled() {
      return this._toggled;
    }

    get draw() {
      return this._draw;
    }

    get cellStyle() {
      return this._cellStyle;
    }

    get multilineText() {
      return this._multilineText;
    }

    reviseAttachCellsArea(rect, row, grid) {
      reviseAttachCellsArea(rect, row, grid, this._cellStyle);
    }

    reviseAttachCellsPadding(padding, row, grid) {
      super.reviseAttachCellsPadding(padding, row, grid);
      const treeInfo = _getTreeInfo(grid, row);
      padding[3] += _getTreeNodeSpaceWidth(treeInfo);
      reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
    }

    reviseFocusRect(rect, row, grid) {
      const treeInfo = _getTreeInfo(grid, row);
      rect.left += _getTreeNodeSpaceWidth(treeInfo);
    }

    clone() {
      return new TreeColumn(this);
    }

    drawInternal(value, context, style, helper, grid, info) {
      const getIcon = info.getIcon;
      const getRecord = info.getRecord;
      const { textAlign, textBaseline, color, font, textOverflow, lineColor, buttonColor, buttonBgColor, buttonBorderColor, linkColor, autoWrapText, lineHeight, lineClamp } = style;
      helper.testFontLoad(font, value, context);
      const treeInfo = _getTreeInfo(grid, context.row);
      let active = false;
      const state = grid[BUTTON_COLUMN_STATE_ID];
      if (state) {
        const range = grid.getCellRange(context.col, context.row);
        if (state.mouseActiveCell &&
          cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
          active = true;
        }
      }
      loadIcons(getIcon(), context, helper, (icons, ctx) => {
        const isCustomDraw = customDraw(helper, this.draw, value, context, grid, getRecord());
        if (!isCustomDraw) {
          const padding = getActionTextPadding(context, helper, style);
          if (active && state && state.mouseRelativePos) {
            const rect = helper.getTextRect(value, ctx, {
              font,
              icons,
              padding,
              textAlign,
              textBaseline,
              textOverflow
            });
            const offset = _getTreeNodeSpaceWidth(treeInfo);
            rect.left = Math.max(context.getRect().left + offset, rect.left + offset);
            rect.right += offset;
            active =
              rect.left <= state.mouseRelativePos.x &&
              rect.right >= state.mouseRelativePos.x &&
              rect.top <= state.mouseRelativePos.y &&
              rect.bottom >= state.mouseRelativePos.y;
            state.mouseActive = active;
          }
          const record = info.getRecord();
          const isMultilineText = getOrApply(this.multilineText, record);
          helper.tree(value, ctx, {
            color: active ? linkColor || helper.theme.tree.linkColor : color,
            lineColor,
            buttonColor,
            buttonBgColor,
            buttonBorderColor,
            icons,
            padding,
            textAlign,
            textBaseline,
            textOverflow,
            treeInfo,
            treeNodeSpace: TREE_NODE_SPACE,
            isMultilineText,
            autoWrapText,
            lineHeight,
            lineClamp
          });
        }
        drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID, helper, style);
        drawAttachArea(grid, getRecord(), context, helper, this._cellStyle);
      });
    }

    bindGridEvent(grid, cellId) {
      const expand = (cell, all) => {
        if (grid.dataSource instanceof TreeDataSource) {
          const recordIndex = grid.getRecordIndexByRow(cell.row);
          grid.dataSource.expand(recordIndex, all);
        }
      };
      const collapse = (cell, all) => {
        if (grid.dataSource instanceof TreeDataSource) {
          const recordIndex = grid.getRecordIndexByRow(cell.row);
          grid.dataSource.collapse(recordIndex, all);
        }
      };
      const toggle = (cell, all) => {
        if (grid.dataSource instanceof TreeDataSource) {
          const recordIndex = grid.getRecordIndexByRow(cell.row);
          grid.dataSource.toggle(recordIndex, all);
        }
      };

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      const doMouseMove = (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        if (isPromise(grid.getRowRecord(e.row))) {
          return;
        }
        if (this._canToggle) {
          const treeInfo = _getTreeInfo(grid, e.row);
          if (treeInfo &&
            this._canToggle({
              col: e.col,
              event: e.event,
              row: e.row,
              treeInfo,
              type: 'over'
            }) === false) {
            return;
          }
        }
        const state = grid[BUTTON_COLUMN_STATE_ID];
        const actionState = grid[COLUMN_ACTION_STATE_ID];
        grid.getElement().style.cursor =
          _isTreeNodeSpace(grid, e.col, e.row, e.event) ||
          (state && state.mouseActive) ||
          (actionState && actionState.mouseActive)
            ? 'pointer'
            : '';
      };
      const doMouseLeave = (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        grid.getElement().style.cursor = '';
      };
      return [
        // click
        grid.listen(DG_EVENT_TYPE.CLICK_CELL, (e) => {
          if (!isTarget(e.col, e.row)) {
            return;
          }
          if (isPromise(grid.getRowRecord(e.row))) {
            return;
          }
          if (!_isTreeNodeSpace(grid, e.col, e.row, e.event)) {
            return;
          }
          const treeInfo = _getTreeInfo(grid, e.row);
          if (!treeInfo) {
            return;
          }
          const isAll = e.event.shiftKey;
          const type = treeInfo.expanded
            ? isAll
              ? 'collapseAll'
              : 'collapse'
            : isAll
              ? 'expandAll'
              : 'expand';
          const params = {
            col: e.col,
            event: e.event,
            row: e.row,
            treeInfo,
            type
          };
          if (this._canToggle && this._canToggle(params) === false) {
            return;
          }
          grid.selectCellRange(e.col, e.row, e.col, e.row);
          toggle({
            col: e.col,
            row: e.row
          }, isAll);
          if (this._toggled) {
            this._toggled(params);
          }
          event.cancel(e.event);
          return false;
        }),
        // mouse move
        grid.listen(DG_EVENT_TYPE.MOUSEENTER_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSELEAVE_CELL, doMouseLeave),
        grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, doMouseLeave),
        // key down
        grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
          const keys = [KEY_DOWN, KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP];
          if (keys.indexOf(e.keyCode) === -1 ||
            (!e.event.ctrlKey && !e.event.metaKey)) {
            return;
          }
          const sel = grid.selection.select;
          const cell = {
            col: sel.col,
            row: sel.row
          };
          if (!isTarget(cell.col, cell.row)) {
            return;
          }
          if (isPromise(grid.getRowRecord(cell.row))) {
            return;
          }
          const treeInfo = _getTreeInfo(grid, cell.row);
          if (!treeInfo) {
            return;
          }
          let type;
          if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
            type = e.keyCode === KEY_DOWN ? 'expandAll' : 'expand';
          } else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
            type = e.keyCode === KEY_UP ? 'collapseAll' : 'collapse';
          } else {
            type = treeInfo.expanded
              ? e.event.shiftKey
                ? 'collapseAll'
                : 'collapse'
              : e.event.shiftKey
                ? 'expandAll'
                : 'expand';
          }
          const params = {
            col: cell.col,
            event: e.event,
            row: cell.row,
            treeInfo,
            type
          };
          if (this._canToggle && this._canToggle(params) === false) {
            return;
          }
          if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
            expand(cell, e.keyCode === KEY_DOWN);
          } else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
            collapse(cell, e.keyCode === KEY_UP);
          } else {
            toggle(cell, e.event.shiftKey);
          }
          if (this._toggled) {
            this._toggled(params);
          }
          event.cancel(e.event);
          return treeInfo.isLeaf; // 只有叶子节点允许不阻止后续事件执行
        })
      ];
    }

    drawEditingInternal(context, style, helper, grid, info) {
      super.drawEditingInternal(context, style, helper, grid, info);
      const textAlign = style.textAlign;
      const textBaseline = style.textBaseline;
      const color = style.color;
      const treeInfo = _getTreeInfo(grid, context.row);
      const textOverflow = style.textOverflow;
      const autoWrapText = style.autoWrapText;
      const lineHeight = style.lineHeight;
      const lineClamp = style.lineClamp;
      const record = info.getRecord();
      const isMultilineText = getOrApply(this.multilineText, record);
      helper.tree('', context, {
        color,
        padding: getActionTextPadding(context, helper, style),
        textAlign,
        textBaseline,
        textOverflow,
        treeInfo,
        treeNodeSpace: TREE_NODE_SPACE,
        isMultilineText,
        autoWrapText,
        lineHeight,
        lineClamp
      });
    }
  }

  const RADIO_COLUMN_STATE_ID = getRadioColumnStateId();

  class RadioColumn extends BaseColumn {
    get StyleClass() {
      return RadioStyle;
    }

    clone() {
      return new RadioColumn(this);
    }

    convertInternal(value) {
      return toBoolean(value);
    }

    drawInternal(value, context, style, helper, grid, _info) {
      var _a;
      const { textAlign, textBaseline, checkColor, uncheckBorderColor, checkBorderColor, uncheckBgColor, checkBgColor } = style;
      const { col, row } = context;
      const range = grid.getCellRange(col, row);
      const cellKey = `${ range.start.col }:${ range.start.row }`;
      const elapsed = (_a = grid[RADIO_COLUMN_STATE_ID]) === null || _a === void 0 ? void 0 : _a.elapsed[cellKey];
      const opt = {
        textAlign,
        textBaseline,
        checkColor,
        uncheckBorderColor,
        checkBorderColor,
        uncheckBgColor,
        checkBgColor
      };
      if (isDef(elapsed)) {
        opt.animElapsedTime = elapsed;
      }
      helper.radioButton(value, context, opt);
    }
  }

  const TYPES$1 = {
    DEFAULT: new Column(),
    NUMBER: new NumberColumn(),
    CHECK: new CheckColumn(),
    RADIO: new RadioColumn(),
    BUTTON: new ButtonColumn(),
    IMAGE: new ImageColumn(),
    MULTILINETEXT: new MultilineTextColumn(),
    DATE: new DateColumn(),
    LOOKUP: new LookupColumn(),
    SWITCH: new SwitchColumn(),
    TREE: new TreeColumn(),
    DRAW: new DrawColumn()
  };

  function of$5(columnType) {
    if (!columnType) {
      return TYPES$1.DEFAULT;
    } else if (typeof columnType === 'string') {
      const key = columnType.toUpperCase();
      return TYPES$1[key] || of$5(null);
    } else {
      return columnType;
    }
  }

  const action$1 = {
    ACTIONS: ACTIONS$1,
    BaseAction: BaseAction$1,
    Editor,
    BaseCheckEditor,
    BaseInputEditor,
    BaseActionInput,
    Action: Action,
    CheckEditor,
    RadioEditor,
    SwitchEditor,
    ButtonAction,
    SmallDialogInputEditor,
    InlineInputEditor,
    InlineTextAreaEditor,
    InlineLookupEditor,
    InlineMenuEditor,
    of: of$6
  };
  const style$1 = {
    EVENT_TYPE,
    BaseStyle: BaseStyle$1,
    BaseStdStyle: BaseStdStyle$1,
    BaseCheckStyle: BaseCheckStyle$1,
    Style: Style$1,
    NumberStyle,
    CheckStyle,
    RadioStyle,
    SwitchStyle: SwitchStyle$1,
    ButtonStyle,
    ImageStyle,
    IconStyle,
    PercentCompleteBarStyle,
    MultilineTextStyle,
    MenuStyle,
    DateStyle,
    LookupStyle,
    TreeStyle,
    DrawStyle,
    of: of$7
  };
  const type$1 = {
    TYPES: TYPES$1,
    BaseColumn,
    BaseCheckColumn,
    Column,
    NumberColumn,
    CheckColumn,
    RadioColumn,
    SwitchColumn,
    ButtonColumn,
    ImageColumn,
    PercentCompleteBarColumn,
    IconColumn,
    BranchGraphColumn,
    MenuColumn,
    MultilineTextColumn,
    DateColumn,
    LookupColumn,
    TreeColumn,
    DrawColumn,
    of: of$5
  };
  /**
   * columns
   */
  const columns = { action: action$1, type: type$1, style: style$1 };

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
    return (cp === TABULATION ||
      cp === LINE_FEED ||
      cp === FORM_FEED ||
      cp === CARRIAGE_RETURN ||
      cp === SPACE);
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
    return new Error(`calc parse error: ${ calc }`);
  }

  /**
   * tokenize
   * @param calc - calc expression
   * @returns tokens
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
      } else if (c === '*' || c === '/') {
        tokens.push({ value: c, type: TYPE_OPERATOR });
      } else if (c === '+' || c === '-') {
        index = parseSign(c, index + 1) - 1;
      } else if (isDigit(cp) || isDot(cp)) {
        index = parseNum(c, index + 1) - 1;
      } else if (isWhitespace(cp)) ;
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
        } else if (c === '.') {
          if (num.indexOf('.') >= 0) {
            throw createError(calc);
          }
          num += c;
        } else if (isUnit(cp)) {
          return parseUnit(num, c, index + 1);
        } else {
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
        } else {
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
      if (!left ||
        !left.nodeType ||
        !op ||
        op.type !== TYPE_OPERATOR ||
        !right ||
        !right.nodeType) {
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
        const closeIndex = array.findIndex(tokens, (t) => {
          if (t.type === TYPE_PAREN && t.value === '(') {
            deep++;
          } else if (t.type === TYPE_PAREN && t.value === ')') {
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
      } else if (token.type === TYPE_OPERATOR) {
        if (stack.length >= 3) {
          const beforeOp = stack[stack.length - 2].value;
          if (PRECEDENCE[token.value] <= PRECEDENCE[beforeOp]) {
            stack.push(buildBinaryExpNode(stack));
          }
        }
        stack.push(token);
      } else if (token.type === TYPE_UNIT) {
        const { value: num, unit } = token;
        stack.push({
          nodeType: NODE_TYPE_UNIT,
          value: num,
          unit
        });
      } else if (token.type === TYPE_NUMBER) {
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
          throw new Error(`calc error. unknown operator: ${ node.op.value }`);
      }
    } else if (node.nodeType === NODE_TYPE_UNIT) {
      switch (node.unit) {
        case '%':
          return (node.value * context.full) / 100;
        case 'em':
          return node.value * context.em;
        case 'px':
          return node.value;
        default:
          throw new Error(`calc error. unknown unit: ${ node.unit }`);
      }
    } else if (node.nodeType === NODE_TYPE_NUMBER) {
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

  const handler = new EventHandler();
  let ratio$1;

  function setRatio() {
    if (isNode$1) {
      ratio$1 = 1;
    } else {
      ratio$1 = Math.ceil(window.devicePixelRatio || 1);
      if (ratio$1 > 1 && ratio$1 % 2 !== 0) {
        ratio$1 += 1;
      }
    }
  }

  setRatio();
  if (!isNode$1) {
    handler.on(window, 'resize', setRatio);
  }
  var hiDPI = {
    transform(canvas) {
      const ctx = canvas.getContext('2d');
      const getAttribute = canvas.getAttribute;
      const setAttribute = canvas.setAttribute;
      canvas.getAttribute = ((me) => (name) => {
        let result = getAttribute.apply(me, [name]);
        if (name === 'width' || name === 'height') {
          result /= ratio$1;
        }
        return result;
      })(canvas);
      canvas.setAttribute = ((me) => (name, val) => {
        const wh = name === 'width' || name === 'height';
        if (wh) {
          val = ratio$1 * Number(val) + '';
        }
        const result = setAttribute.apply(me, [name, val]);
        if (wh && ctx) {
          ctx.scale(ratio$1, ratio$1);
        }
        return result;
      })(canvas);
      Object.defineProperty(canvas, 'width', {
        configurable: true,
        enumerable: true,
        get() {
          return canvas.getAttribute('width');
        },
        set: (val) => {
          canvas.setAttribute('width', Math.floor(val) + '');
        }
      });
      Object.defineProperty(canvas, 'height', {
        configurable: true,
        enumerable: true,
        get() {
          return canvas.getAttribute('height');
        },
        set: (val) => {
          canvas.setAttribute('height', Math.floor(val) + '');
        }
      });
      if (ctx) {
        const drawImage = ctx.drawImage;
        ctx.drawImage = ((me) => (img, ...args) => {
          if (img !== canvas || ratio$1 === 1) {
            return drawImage.apply(me, [img].concat(args));
          }
          me.save();
          try {
            me.scale(1 / ratio$1, 1 / ratio$1);
            if (args.length > 4) {
              args[4] *= ratio$1;
              args[5] *= ratio$1;
            } else {
              args[0] *= ratio$1;
              args[1] *= ratio$1;
            }
            return drawImage.apply(me, [img].concat(args));
          } finally {
            me.restore();
          }
        })(ctx);
      }
      return canvas;
    }
  };

  const indexFirst = (ary, elm) => {
    let low = 0;
    let high = ary.length - 1;
    while (low <= high) {
      const i = Math.floor((low + high) / 2);
      if (ary[i] === elm) {
        return i;
      } else if (ary[i] > elm) {
        high = i - 1;
      } else {
        low = i + 1;
      }
    }
    return high < 0 ? 0 : high;
  };

  class NumberMap {
    constructor() {
      this._keys = [];
      this._vals = {};
      this._sorted = false;
    }

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
      return this._vals[key] !== null;
    }

    each(keyFrom, keyTo, fn) {
      const keys = this._keys;
      const length = keys.length;
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
        } else if (keyTo < key) {
          return;
        }
      }
    }
  }

  const MAX_SCROLL$2 = browser.heightLimit - 1000;

  class MusselScrollbar {
    constructor() {
      this._handler = new EventHandler();
      this._scrollable = document.createElement('div');
      this._scrollable.classList.add('grid-scrollable');
      this._height = 0;
      this._width = 0;
      window.mussel.scrollbar.attach(this._scrollable, {
        scrollbarVisible: 'scrolling' // 'enter'
      });
      this._handler.on(this._scrollable, 'click', (e) => {
        if (e.target !== this._scrollable) {
          event.cancel(e);
        }
      });
      this._p = 1;
      this._endPointElement = document.createElement('div');
      this._endPointElement.classList.add('grid-scroll-end-point');
      this._update();
      this._scrollable.appendChild(this._endPointElement);
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
      window.mussel.scrollbar.detach(this._scrollable);
      this._handler.dispose();
    }

    update() {
      this._update();
    }

    _update() {
      let domHeight;
      if (this._height > MAX_SCROLL$2) {
        const sbSize = style$2.getScrollBarSize();
        const { offsetHeight } = this._scrollable;
        const vScrollRange = MAX_SCROLL$2 - offsetHeight + sbSize;
        const rScrollRange = this._height - offsetHeight + sbSize;
        this._p = vScrollRange / rScrollRange;
        domHeight = MAX_SCROLL$2;
      } else {
        this._p = 1;
        domHeight = this._height;
      }
      domHeight -= 1;
      const domWidth = this._width - 1;
      this._endPointElement.style.top = `${ domHeight.toFixed() }px`;
      this._endPointElement.style.left = `${ domWidth.toFixed() }px`;
    }
  }

  const MAX_SCROLL$1 = browser.heightLimit - 1000;

  class Scrollbar {
    constructor() {
      this._handler = new EventHandler();
      this._scrollable = document.createElement('div');
      this._scrollable.classList.add('grid-scrollable');
      this._height = 0;
      this._width = 0;
      this._perfectScrollbar = new window.PerfectScrollbar(this._scrollable, {
        minScrollbarLength: 24
      });
      this._handler.on(this._scrollable, 'click', (e) => {
        if (e.target !== this._scrollable) {
          event.cancel(e);
        }
      });
      this._p = 1;
      this._endPointElement = document.createElement('div');
      this._endPointElement.classList.add('grid-scroll-end-point');
      this._update();
      this._scrollable.appendChild(this._endPointElement);
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
      this._perfectScrollbar.destroy();
      this._handler.dispose();
    }

    update() {
      this._update();
    }

    _update() {
      let domHeight;
      if (this._height > MAX_SCROLL$1) {
        const sbSize = style$2.getScrollBarSize();
        const { offsetHeight } = this._scrollable;
        const vScrollRange = MAX_SCROLL$1 - offsetHeight + sbSize;
        const rScrollRange = this._height - offsetHeight + sbSize;
        this._p = vScrollRange / rScrollRange;
        domHeight = MAX_SCROLL$1;
      } else {
        this._p = 1;
        domHeight = this._height;
      }
      domHeight -= 1;
      const domWidth = this._width - 1;
      this._endPointElement.style.top = `${ domHeight.toFixed() }px`;
      this._endPointElement.style.left = `${ domWidth.toFixed() }px`;
      this._perfectScrollbar.update();
    }
  }

  const MAX_SCROLL = browser.heightLimit - 1000;

  class Scrollable {
    constructor(canvas) {
      this._canvas = canvas;
      this._handler = new EventHandler();
      this._scrollable = document.createElement('div');
      this._scrollable.classList.add('grid-scrollable');
      this._height = 0;
      this._width = 0;
      this._p = 1;
      this._endPointElement = document.createElement('div');
      this._endPointElement.classList.add('grid-scroll-end-point');
      this._update();
      this._scrollable.appendChild(this._endPointElement);
      // const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ?
      //     "DOMMouseScroll" : "mousewheel"; // FF doesn"t recognize mousewheel as of FF3.x
      // this._handler.on(this._scrollable, mousewheelevt, (evt) => {
      //     const delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
      //     const point = Math.min(Math.abs(delta) / 12, this.scrollHeight / 5);
      //     this.scrollTop += delta < 0 ? point : -point;
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

    update() {
      this._update();
    }

    _update() {
      let domHeight;
      const sbSize = style$2.getScrollBarSize();
      if (this._height > MAX_SCROLL) {
        const offsetHeight = this._scrollable.offsetHeight;
        const vScrollRange = MAX_SCROLL - offsetHeight + sbSize;
        const rScrollRange = this._height - offsetHeight + sbSize;
        this._p = vScrollRange / rScrollRange;
        domHeight = MAX_SCROLL;
      } else {
        this._p = 1;
        domHeight = this._height;
      }
      const domWidth = this._width;
      // TODO: windows 下横纵滚动条都存在时，显示多余空白问题
      // const isWindows = /windows|win32/i.test(window.navigator.userAgent);
      const top = domHeight > this._canvas.height ? domHeight : domHeight - sbSize;
      const left = domWidth > this._canvas.width ? domWidth : domWidth - sbSize;
      this._endPointElement.style.top = `${ top.toFixed() }px`;
      this._endPointElement.style.left = `${ left.toFixed() }px`;
      // 不让滚动条位置超出范围
      const maxScrollTop = Math.max(0, top - this._canvas.height);
      if (this._scrollable.scrollTop > maxScrollTop) {
        this._scrollable.scrollTop = maxScrollTop;
      }
      const maxScrollLeft = Math.max(0, left - this._canvas.width);
      if (this._scrollable.scrollLeft > maxScrollLeft) {
        this._scrollable.scrollLeft = maxScrollLeft;
      }
    }
  }

  /**
   * managing mouse down moving
   */
  class BaseMouseDownMover {
    constructor(grid) {
      this._grid = grid;
      this._handler = new EventHandler();
      this._events = {};
      this._started = false;
      this._moved = false;
      this._mouseEndPoint = null;
    }

    get grid() {
      return this._grid;
    }

    moving(e) {
      return !!this._started;
    }

    lastMoving(e) {
      // 必要的控制以防止点击事件在mouseup后立即作出反应
      if (this.moving(e)) {
        return true;
      }
      const last = this._mouseEndPoint;
      if (!last) {
        return false;
      }
      const pt = this._grid._getMouseAbstractPoint(e);
      return !!pt && pt.x === last.x && pt.y === last.y;
    }

    dispose() {
      this._handler.dispose();
    }

    _bindMoveAndUp(e) {
      const events = this._events;
      const handler = this._handler;
      if (!event.isTouchEvent(e)) {
        events.mousemove = handler.on(document.body, 'mousemove', (event) => this._mouseMove(event));
        events.mouseup = handler.on(document.body, 'mouseup', (event) => this._mouseUp(event));
      } else {
        events.touchmove = handler.on(document.body, 'touchmove', (event) => this._mouseMove(event), {
          passive: false
        });
        events.touchend = handler.on(document.body, 'touchend', (event) => this._mouseUp(event));
        events.touchcancel = handler.on(document.body, 'touchcancel', (event) => this._mouseUp(event));
      }
      this._started = true;
      this._moved = false;
    }

    _mouseMove(e) {
      if (!event.isTouchEvent(e)) {
        if (event.getMouseButtons(e) !== 1) {
          this._mouseUp(e);
          return;
        }
      }
      this._moved =
        this._moveInternal(e) || this._moved; /* calculation on after */
      event.cancel(e);
    }

    _mouseUp(e) {
      const events = this._events;
      const handler = this._handler;
      handler.off(events.mousemove);
      handler.off(events.touchmove);
      handler.off(events.mouseup);
      handler.off(events.touchend);
      // handler.off(events.mouseleave);
      handler.off(events.touchcancel);
      this._upInternal(e);
      // 必要的控制以防止点击事件在mouseup后立即作出反应
      if (this._moved) {
        // 如果发生了移动
        this._mouseEndPoint = this._grid._getMouseAbstractPoint(e);
        setTimeout(() => {
          this._mouseEndPoint = null;
          this._started = false;
        }, 10);
      } else {
        this._started = false;
      }
      event.cancel(e);
    }

    _upInternal(e) {
      // nothing
    }

    _vibrate(e) {
      if (navigator.vibrate && event.isTouchEvent(e)) {
        navigator.vibrate(50);
      }
    }
  }

  /**
   * managing cell selection operation with mouse
   */
  class CellSelector extends BaseMouseDownMover {
    constructor() {
      super(...arguments);
      this._cell = { col: -1, row: -1 };
    }

    start(e) {
      const cell = this._getTargetCell(e);
      if (!cell) {
        this.grid._forceFocusCell();
        event.cancel(e);
        return;
      }
      this.grid.fireListeners(DG_EVENT_TYPE.MOUSE_SELECTED_START, e);
      this.grid._moveFocusCell(cell.col, cell.row, e.shiftKey);
      this._bindMoveAndUp(e);
      this._cell = cell;
      event.cancel(e);
      this._vibrate(e);
    }

    select(e) {
      const cell = this._getTargetCell(e);
      if (!cell) {
        return;
      }
      this.grid._moveFocusCell(cell.col, cell.row, e.shiftKey);
      this._cell = cell;
    }

    _upInternal(e) {
      this.grid.fireListeners(DG_EVENT_TYPE.MOUSE_SELECTED_END, e);
    }

    _moveInternal(e) {
      const cell = this._getTargetCell(e);
      if (!cell) {
        return false;
      }
      const oldCol = this._cell.col;
      const oldRow = this._cell.row;
      const newCol = cell.col;
      const newRow = cell.row;
      if (oldCol === newCol && oldRow === newRow) {
        return false;
      }
      const grid = this.grid;
      grid._moveFocusCell(newCol, newRow, true, true);
      // make visible
      const makeVisibleCol = (() => {
        if (newCol < oldCol && 0 < newCol) {
          // move left
          return newCol - 1;
        } else if (oldCol < newCol && newCol + 1 < grid.colCount) {
          // move right
          return newCol + 1;
        }
        return newCol;
      })();
      const makeVisibleRow = (() => {
        if (newRow < oldRow && 0 < newRow) {
          // move up
          return newRow - 1;
        } else if (oldRow < newRow && newRow + 1 < grid.rowCount) {
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
      const grid = this.grid;
      const abstractPos = grid._getMouseAbstractPoint(e);
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
   */
  class ColumnResizer extends BaseMouseDownMover {
    constructor(grid) {
      super(grid);
      this._targetCol = -1;
      this._x = 0;
      this._preX = 0;
      this._invalidateAbsoluteLeft = 0;
    }

    start(col, e) {
      let pageX;
      if (!event.isTouchEvent(e)) {
        ({ pageX } = e);
      } else {
        ({ pageX } = e.changedTouches[0]);
      }
      this._x = pageX;
      this._preX = 0;
      this.grid._resetColWidthOffset(col);
      this._bindMoveAndUp(e);
      this._targetCol = col;
      // 由于有合并单元格，所以起始刷新列始终从 0 开始计算
      // this._invalidateAbsoluteLeft = this.grid._getColsWidth(0, col - 1)
      event.cancel(e);
      this._vibrate(e);
    }

    _moveInternal(e) {
      const pageX = event.isTouchEvent(e)
        ? e.changedTouches[0].pageX
        : e.pageX;
      const x = pageX - this._x;
      const moveX = x - this._preX;
      this._preX = x;
      const pre = this.grid.getColWidth(this._targetCol);
      let afterSize = this.grid._adjustColWidth(this._targetCol, pre + moveX);
      if (afterSize < 10 && moveX < 0) {
        afterSize = 10;
      }
      this.grid._storeAutoColWidthExprs();
      this.grid.setColWidth(this._targetCol, afterSize);
      const rect = this.grid._getVisibleRect();
      rect.left = this._invalidateAbsoluteLeft;
      this.grid._invalidateRect(rect);
      this.grid.fireListeners(DG_EVENT_TYPE.RESIZE_COLUMN, {
        col: this._targetCol
      });
      return true;
    }

    _upInternal(e) {
      if (this.grid.updateScroll()) {
        this.grid.invalidate();
      }
    }
  }

  function createCellRange(startCol, startRow, endCol, endRow) {
    return {
      start: { col: startCol, row: startRow },
      end: { col: endCol, row: endRow }
    };
  }

  /**
   * Context of cell drawing
   */
  class DrawCellContext {
    /**
     * constructor
     */
    constructor(col, row, ctx, rect, drawRect, drawing, selection, drawLayers) {
      this._rectFilter = null;
      this._col = col;
      this._row = row;
      this._mode = 0;
      this._range = createCellRange(col, row, col, row);
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
      } else {
        return true;
      }
    }

    get row() {
      return this._row;
    }

    get col() {
      return this._col;
    }

    get range() {
      return this._range;
    }

    set range(range) {
      this._range = range;
    }

    cancel() {
      this._cancel = true;
      this._childContexts.forEach((ctx) => {
        ctx.cancel();
      });
    }

    /**
     * select status.
     */
    getSelection() {
      return {
        border: this._selection.border(this._col, this._row),
        dragged: this._selection.drag.inDrag(this._col, this._row),
        select: this._selection.drag.select,
        range: this._selection.range
      };
    }

    /**
     * Canvas context.
     */
    getContext() {
      if (this._mode === 0) {
        return this._ctx;
      } else {
        return this._grid._getInitContext();
      }
    }

    /**
     * Rectangle of cell.
     */
    getRect() {
      const rectFilter = this._rectFilter;
      return rectFilter
        ? rectFilter(this._getRectInternal())
        : this._getRectInternal();
    }

    setRectFilter(rectFilter) {
      this._rectFilter = rectFilter;
    }

    /**
     * Rectangle of Drawing range.
     */
    getDrawRect() {
      if (this._cancel) {
        return null;
      }
      if (this._mode === 0) {
        return this._drawRect;
      } else {
        if (this._isOutOfRange()) {
          return null;
        }
        const absoluteRect = this._grid.getCellRect(this._col, this._row);
        return this._toRelativeDrawRect(absoluteRect);
      }
    }

    /**
     * get Context of current state
     */
    toCurrentContext() {
      if (this._mode === 0) {
        return this;
      } else {
        const absoluteRect = this._grid.getCellRect(this._col, this._row);
        const rect = this._grid._toRelativeRect(absoluteRect);
        const drawRect = this._isOutOfRange()
          ? null
          : this._toRelativeDrawRect(absoluteRect);
        const context = new DrawCellContext(this._col, this._row, this.getContext(), rect, drawRect, this.drawing, this._selection, this._drawLayers);
        // toCurrentContext 调用 this.toCurrentContext
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
     */
    terminate() {
      var _a;
      if (this._mode !== 0) {
        (_a = this._onTerminate) === null || _a === void 0 ? void 0 : _a.call(this);
      }
    }

    _getRectInternal() {
      if (this._mode === 0) {
        return this._rect;
      } else {
        if (this._rect) {
          return this._rect;
        }
        return this._grid.getCellRelativeRect(this._col, this._row);
      }
    }

    _isOutOfRange() {
      const { colCount, rowCount } = this._grid;
      return colCount <= this._col || rowCount <= this._row;
    }

    _toRelativeDrawRect(absoluteRect) {
      const grid = this._grid;
      const visibleRect = grid._getVisibleRect();
      let rect = absoluteRect.copy();
      if (!rect.intersection(visibleRect)) {
        return null;
      }
      const isFrozenCell = grid.isFrozenCell(this._col, this._row);
      if (grid.frozenColCount >= 0 && (!isFrozenCell || !isFrozenCell.col)) {
        const fRect = grid.getCellRect(grid.frozenColCount - 1, this._row);
        rect = Rect.bounds(Math.max(rect.left, fRect.right), rect.top, rect.right, rect.bottom);
      }
      if (grid.frozenRowCount >= 0 && (!isFrozenCell || !isFrozenCell.row)) {
        const fRect = grid.getCellRect(this._col, grid.frozenRowCount - 1);
        rect = Rect.bounds(rect.left, Math.max(rect.top, fRect.bottom), rect.right, rect.bottom);
      }
      if (!rect.intersection(visibleRect)) {
        return null;
      }
      rect.offsetLeft(-visibleRect.left);
      rect.offsetTop(-visibleRect.top);
      return rect;
    }
  }

  class DrawLayer {
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
        } finally {
          ctx.restore();
        }
      });
    }
  }

  /**
   * This class manages the drawing process for each layer
   */
  class DrawLayers {
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
        if (this._layers.hasOwnProperty(k)) {
          list.push(this._layers[k]);
        }
      }
      list.sort((a, b) => a.level - b.level);
      list.forEach((l) => l.draw(ctx));
    }
  }

  function _setSafeInputValue(input, value) {
    const type = input.type;
    input.type = '';
    input.value = value;
    if (type) {
      input.type = type;
    }
  }

  /**
   * Manage focus
   */
  class FocusControl extends EventTarget {
    constructor(grid, parentElement, scrollable) {
      super();
      this._isComposition = false;
      this._grid = grid;
      this._scrollable = scrollable;
      const handler = (this._handler = new EventHandler());
      const input = (this._input = document.createElement('input'));
      input.classList.add('grid-focus-control');
      input.readOnly = true;
      parentElement.appendChild(input);
      handler.on(input, 'compositionstart', (e) => {
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
      const inputClear = () => {
        lastInputValue = input.value;
        if (this._isComposition) {
          return;
        }
        if (lastInputValue !== '') {
          _setSafeInputValue(input, '');
        }
      };
      const handleCompositionEnd = () => {
        this._isComposition = false;
        input.classList.remove('composition');
        input.style.font = '';
        const value = input.value;
        inputClear();
        if (!input.readOnly) {
          this.fireListeners('input', value);
        }
        if (this._compositionEnd) {
          clearTimeout(this._compositionEnd);
          delete this._compositionEnd;
        }
      };
      handler.on(input, 'compositionend', (e) => {
        this._compositionEnd = setTimeout(handleCompositionEnd, 0);
      });
      handler.on(input, 'keypress', (e) => {
        if (this._isComposition) {
          return;
        }
        if (!input.readOnly && e.key && e.key.length === 1) {
          if (e.ctrlKey || e.metaKey) {
            if (e.key === 'c') ;
            else if (e.key === 'v') ;
            else if (e.key === 'x') ;
          } else {
            if (e.key === ' ') {
              // Since the full-width space cannot be determined, it is processed by "input".
              return;
            }
            this.fireListeners('input', e.key);
            event.cancel(e);
          }
        }
        inputClear();
      });
      handler.on(input, 'keydown', (e) => {
        var _a;
        if (this._isComposition) {
          if (this._compositionEnd) {
            handleCompositionEnd();
            event.cancel(e);
          }
          return;
        }
        const keyCode = event.getKeyCode(e);
        let stopCellMove = false;
        const evt = {
          keyCode,
          event: e,
          stopCellMoving() {
            stopCellMove = true;
          }
        };
        const results = this.fireListeners('keydown', evt);
        if (array.findIndex(results, (v) => v === false) >= 0) {
          return;
        }
        if (!input.readOnly && lastInputValue && browser.Safari) {
          // for Safari
          this.fireListeners('input', lastInputValue);
        }
        if (!stopCellMove)
          this.fireKeyDownMove(keyCode, e);
        if (((_a = this._grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.deleteCellValueOnDel) &&
          (keyCode === KEY_DEL || keyCode === KEY_BS)) {
          this.fireListeners('delete', e);
        }
        inputClear();
      });
      handler.on(input, 'keyup', (e) => {
        if (this._isComposition) {
          if (this._compositionEnd) {
            handleCompositionEnd();
          }
        }
        inputClear();
      });
      handler.on(input, 'input', (e) => {
        if (e.data === ' ' || e.data === '　') {
          // Since the full-width space cannot be determined on "keypress", it is processed by "input".
          this.fireListeners('input', e.data);
        }
        inputClear();
      });
      if (browser.IE) {
        handler.on(document, 'keydown', (e) => {
          if (e.target !== input) {
            return;
          }
          const keyCode = event.getKeyCode(e);
          if (keyCode === KEY_ALPHA_C && e.ctrlKey) {
            // When text is not selected copy-event is not emit, on IE.
            _setSafeInputValue(input, 'dummy');
            input.select();
            setTimeout(() => {
              _setSafeInputValue(input, '');
            }, 100);
          } else if (keyCode === KEY_ALPHA_V && e.ctrlKey) {
            // When input is read-only paste-event is not emit, on IE.
            if (input.readOnly) {
              input.readOnly = false;
              setTimeout(() => {
                input.readOnly = true;
                _setSafeInputValue(input, '');
              }, 10);
            }
          }
        });
      }
      if (browser.Edge) {
        handler.once(document, 'keydown', (e) => {
          if (!isDescendantElement(parentElement, e.target)) {
            return;
          }
          // When the input has focus on the first page opening,
          // the paste-event and copy-event is not emit, on Edge.
          const dummyInput = document.createElement('input');
          grid.getElement().appendChild(dummyInput);
          dummyInput.focus();
          input.focus();
          if (dummyInput.parentElement) {
            dummyInput.parentElement.removeChild(dummyInput);
          }
        });
      }
      handler.on(document, 'paste', (e) => {
        if (this._isComposition) {
          return;
        }
        if (!isDescendantElement(parentElement, e.target)) {
          return;
        }
        setTimeout(() => {
          inputClear();
        }, 100);
        let pasteText;
        if (browser.IE) {
          // IE
          pasteText = window.clipboardData.getData('Text');
        } else {
          const clipboardData = e.clipboardData;
          if (clipboardData) {
            if (clipboardData.items) {
              // Chrome & Firefox & Edge
              pasteText = clipboardData.getData('text/plain');
            } else {
              // Safari
              if (-1 !==
                Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                pasteText = clipboardData.getData('Text');
              }
            }
          }
        }
        if (isDef(pasteText) && pasteText.length) {
          this.fireListeners('paste', { value: pasteText, event: e });
        }
      });
      const copy = (data, e) => {
        if (isDef(data)) {
          event.cancel(e);
          if (browser.IE) {
            const cData = window.clipboardData;
            if (cData) {
              cData.setData('Text', data); // IE
            }
          } else {
            const cData = e.clipboardData;
            if (cData) {
              cData.setData('text/plain', data); // Chrome, Firefox
            }
          }
        }
      };
      handler.on(document, 'copy', (e) => {
        if (this._isComposition) {
          return;
        }
        if (!isDescendantElement(parentElement, e.target)) {
          return;
        }
        _setSafeInputValue(input, '');
        const data = array.find(this.fireListeners('copy', e), isDef);
        copy(data, e);
      });
      handler.on(document, 'cut', (e) => {
        if (this._isComposition) {
          return;
        }
        if (!isDescendantElement(parentElement, e.target)) {
          return;
        }
        _setSafeInputValue(input, '');
        const data = array.find(this.fireListeners('cut', e), isDef);
        copy(data, e);
      });
      handler.on(input, 'focus', (e) => {
        this.fireListeners('focus', e);
      });
      handler.on(input, 'blur', (e) => {
        this.fireListeners('blur', e);
      });
    }

    fireKeyDownMove(keyCode, e) {
      var _a, _b, _c;
      const fn = this._keyDownMoveCallback;
      if (!fn) {
        return;
      }
      if (this._isComposition) {
        return;
      }
      if (keyCode === KEY_LEFT ||
        keyCode === KEY_UP ||
        keyCode === KEY_RIGHT ||
        keyCode === KEY_DOWN ||
        keyCode === KEY_HOME ||
        keyCode === KEY_END) {
        fn(e);
      } else if (((_a = this._grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) &&
        keyCode === KEY_TAB) {
        fn(e);
      } else if (((_b = this._grid.keyboardOptions) === null || _b === void 0 ? void 0 : _b.moveCellOnEnter) &&
        keyCode === KEY_ENTER) {
        fn(e);
      } else if (((_c = this._grid.keyboardOptions) === null || _c === void 0 ? void 0 : _c.selectAllOnCtrlA) &&
        keyCode === KEY_ALPHA_A &&
        (e.ctrlKey || e.metaKey)) {
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

    onCut(fn) {
      return this.listen('cut', fn);
    }

    onFocus(fn) {
      return this.listen('focus', fn);
    }

    onBlur(fn) {
      return this.listen('blur', fn);
    }

    focus() {
      // this._input.value = "";
      this._input.focus();
    }

    setFocusRect(rect) {
      const input = this._input;
      const top = this._scrollable.calcTop(rect.top);
      // 位置：相对 但是，如果IE不是position：relative，则不能使用最大值
      input.style.top = `${ (top - style$2.getScrollBarSize()).toFixed() }px`;
      input.style.left = `${ rect.left.toFixed() }px`;
      input.style.width = `${ rect.width.toFixed() }px`;
      input.style.height = `${ rect.height.toFixed() }px`;
    }

    get editMode() {
      return !this._input.readOnly;
    }

    set editMode(editMode) {
      this._input.readOnly = !editMode;
    }

    resetInputStatus() {
      var _a;
      const el = this._input;
      if (!el.classList.contains('grid-focus-control--stored-status')) {
        return;
      }
      const composition = el.classList.contains('composition');
      const attrs = el.attributes;
      const removeNames = [];
      for (let i = 0, n = attrs.length; i < n; i++) {
        const att = attrs[i];
        if (!((_a = this._inputStatus) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(att.nodeName))) {
          removeNames.push(att.name);
        }
      }
      removeNames.forEach((removeName) => {
        el.removeAttribute(removeName);
      });
      for (const name in this._inputStatus) {
        if (this._inputStatus.hasOwnProperty(name)) {
          el.setAttribute(name, this._inputStatus[name]);
        }
      }
      if (composition) {
        el.classList.add('composition');
        el.style.font = this._grid.font || '16px sans-serif';
      } else {
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
      // 有一种情况，滚动逐渐逐渐变化，所以不要在这里设置。
      // this._input.style.font = this._grid.font || "16px sans-serif";
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
  class Selection extends EventTarget {
    constructor(grid, updateRange) {
      super();
      this._isWraped = false;
      this._grid = grid;
      this._sel = { col: 0, row: 0 };
      this._focus = { col: 0, row: 0 };
      this._start = { col: 0, row: 0 };
      this._end = { col: 0, row: 0 };
      this._updateRange = updateRange;
    }

    get range() {
      const start = this._start;
      const end = this._end;
      const startCol = Math.min(start.col, end.col);
      const startRow = Math.min(start.row, end.row);
      const endCol = Math.max(start.col, end.col);
      const endRow = Math.max(start.row, end.row);
      return {
        end: {
          col: endCol,
          row: endRow
        },
        start: {
          col: startCol,
          row: startRow
        }
      };
    }

    set range(range) {
      const startCol = Math.min(range.start.col, range.end.col);
      const startRow = Math.min(range.start.row, range.end.row);
      const endCol = Math.max(range.start.col, range.end.col);
      const endRow = Math.max(range.start.row, range.end.row);
      this._wrapFireSelectedEvent(() => {
        this._setSelectCell(startCol, startRow);
        this._setFocusCell(endCol, endRow, true);
        this._grid._updatedSelection();
      });
    }

    get focus() {
      const col = this._focus.col;
      const row = this._focus.row;
      return { col, row };
    }

    get select() {
      const col = this._sel.col;
      const row = this._sel.row;
      return { col, row };
    }

    set select(cell) {
      this._wrapFireSelectedEvent(() => {
        const { col = 0, row = 0 } = cell || {};
        this._setSelectCell(col, row);
        this._setFocusCell(col, row, true);
        this._grid._updatedSelection();
      });
    }

    get dragging() {
      return !!this._drag;
    }

    get drag() {
      const me = this;
      return {
        get select() {
          const sel = me._drag ? me._drag.sel : me._sel;
          return {
            col: sel.col,
            row: sel.row
          };
        },
        get range() {
          const start = me._drag ? me._drag.start : me._start;
          const end = me._drag ? me._drag.end : me._end;
          const startCol = Math.min(start.col, end.col);
          const startRow = Math.min(start.row, end.row);
          const endCol = Math.max(start.col, end.col);
          const endRow = Math.max(start.row, end.row);
          return {
            end: {
              col: endCol,
              row: endRow
            },
            start: {
              col: startCol,
              row: startRow
            }
          };
        },
        inRange(col, row) {
          const startCol = this.range.start.col;
          const startRow = this.range.start.row;
          const endCol = this.range.end.col;
          const endRow = this.range.end.row;
          return (startCol <= col && col <= endCol && startRow <= row && row <= endRow);
        },
        inDrag(col, row) {
          const inOldRange = this.inRange(col, row);
          const inNewRange = me.inRange(col, row);
          return (inOldRange && !inNewRange) || (!inOldRange && inNewRange);
        }
      };
    }

    inRange(col, row) {
      const startCol = Math.min(this._start.col, this._end.col);
      const startRow = Math.min(this._start.row, this._end.row);
      const endCol = Math.max(this._start.col, this._end.col);
      const endRow = Math.max(this._start.row, this._end.row);
      return startCol <= col && col <= endCol && startRow <= row && row <= endRow;
    }

    border(col, row) {
      const range = this.range;
      const inRange = range.start.col <= col &&
        col <= range.end.col &&
        range.start.row <= row &&
        row <= range.end.row;
      return {
        bottom: inRange ? range.end.row === row : false,
        left: inRange ? range.start.col === col : false,
        right: inRange ? range.end.col === col : false,
        top: inRange ? range.start.row === row : false
      };
    }

    fireSelectedEvent() {
      this._wrapFireSelectedEvent(() => {
        // nothing
      });
    }

    startDrag() {
      this._drag = {
        end: this._end,
        focus: this._focus,
        sel: this._sel,
        start: this._start
      };
    }

    stopDrag() {
      if (this._drag) {
        this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, {
          after: {
            col: this._sel.col,
            row: this._sel.row
          },
          col: this._drag.sel.col,
          row: this._drag.sel.row,
          selected: false
        });
        this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, {
          before: {
            col: this._drag.sel.col,
            row: this._drag.sel.row
          },
          col: this._sel.col,
          row: this._sel.row,
          selected: true
        });
        const oldStartCol = this.drag.range.start.col;
        const oldStartRow = this.drag.range.start.row;
        const oldEndCol = this.drag.range.end.col;
        const oldEndRow = this.drag.range.end.row;
        const newStartCol = this.range.start.col;
        const newStartRow = this.range.start.row;
        const newEndCol = this.range.end.col;
        const newEndRow = this.range.end.row;
        delete this._drag;
        this._grid.invalidateGridRect(oldStartCol, oldStartRow, oldEndCol, oldEndRow);
        this._grid.invalidateGridRect(newStartCol, newStartRow, newEndCol, newEndRow);
      }
    }

    _updateGridRange() {
      const { rowCount, colCount } = this._grid;
      const points = [this._sel, this._focus, this._start, this._end];
      let needChange = false;
      for (const point of points) {
        if (colCount <= point.col || rowCount <= point.row) {
          needChange = true;
          break;
        }
      }
      if (!needChange || !rowCount || !colCount) {
        // rowCount 或 colCount 为 0 时，暂不触发事件
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

    _setFocusCell(col, row, keepSelect) {
      this._wrapFireSelectedEvent(() => {
        if (!keepSelect || this._grid.singleSelection) {
          this._setSelectCell(col, row);
        } else {
          this._setSelectCell(this._sel.col, this._sel.row);
        }
        this._focus = { col, row };
        this._end = { col, row };
      });
    }

    _forceUpdateRange() {
      const range = this._updateRange(this.range);
      if (range) {
        this._start = range.start;
        this._end = range.end;
      }
    }

    _setSelectCell(col, row) {
      this._wrapFireSelectedEvent(() => {
        this._sel = { col, row };
        this._start = { col, row };
      });
    }

    _wrapFireSelectedEvent(callback) {
      if (this._isWraped) {
        callback();
      } else {
        this._isWraped = true;
        try {
          const backup = {
            end: {
              col: this._end.col,
              row: this._end.row
            },
            focus: {
              col: this._focus.col,
              row: this._focus.row
            },
            sel: {
              col: this._sel.col,
              row: this._sel.row
            },
            start: {
              col: this._start.col,
              row: this._start.row
            }
          };
          const before = {
            col: this._sel.col,
            row: this._sel.row,
            selected: false,
            after: null
          };
          callback();
          this._forceUpdateRange();
          const after = {
            before: {
              col: before.col,
              row: before.row
            },
            col: this._sel.col,
            row: this._sel.row,
            selected: true
          };
          before.after = {
            col: after.col,
            row: after.row
          };
          if (!this.dragging) {
            const results = this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, before);
            if (array.findIndex(results, (v) => v === false) >= 0) {
              this._end = backup.end;
              this._focus = backup.focus;
              this._sel = backup.sel;
              this._start = backup.start;
            } else {
              this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, after);
            }
          }
        } finally {
          this._isWraped = false;
        }
      }
    }
  }

  /**
   * managing selection size changing operation with mouse
   */
  class SelectionResizer extends BaseMouseDownMover {
    constructor() {
      super(...arguments);
      this._oldRange = createCellRange(-1, -1, -1, -1);
      this._newRange = createCellRange(-1, -1, -1, -1);
      this._cell = { col: -1, row: -1 };
    }

    start(e) {
      const cellAndRange = this._getTargetCellAndRange(e);
      if (!cellAndRange) {
        return false;
      }
      this._oldRange = this.grid.selection.range;
      this.grid.selection.startDrag();
      this._bindMoveAndUp(e);
      this._newRange = cellAndRange.range;
      this._cell = cellAndRange.cell;
      event.cancel(e);
      this._vibrate(e);
    }

    canStart() {
      return array.find(this.grid.fireListeners(DG_EVENT_TYPE.CAN_DRAG_SELECTION, this.grid.selection.range), (v) => v === true);
    }

    _moveInternal(e) {
      const cellAndRange = this._getTargetCellAndRange(e);
      if (!cellAndRange || !this._oldRange) {
        return false;
      }
      const newRange = cellAndRange.range;
      const newCell = cellAndRange.cell;
      const oldCol = this._cell.col;
      const oldRow = this._cell.row;
      const newCol = newCell.col;
      const newRow = newCell.row;
      if (oldCol === newCol &&
        oldRow === newRow &&
        newRange.start.col === this._newRange.start.col &&
        newRange.start.row === this._newRange.start.row &&
        newRange.end.col === this._newRange.end.col &&
        newRange.end.row === this._newRange.end.row) {
        return false;
      }
      if (array.find(this.grid.fireListeners(DG_EVENT_TYPE.DRAG_SELECTION, {
        dragDone: false,
        newRange,
        oldRange: this._oldRange
      }), (v) => v === false) === false) {
        return false;
      }
      const grid = this.grid;
      grid._moveFocusCell(newRange.start.col, newRange.start.row, false, true);
      grid._moveFocusCell(newRange.end.col, newRange.end.row, true, true);
      // make visible
      const makeVisibleCol = (() => {
        if (newCol < oldCol && 0 < newCol) {
          // move left
          return newCol - 1;
        } else if (oldCol < newCol && newCol + 1 < grid.colCount) {
          // move right
          return newCol + 1;
        }
        return newCol;
      })();
      const makeVisibleRow = (() => {
        if (newRow < oldRow && 0 < newRow) {
          // move up
          return newRow - 1;
        } else if (oldRow < newRow && newRow + 1 < grid.rowCount) {
          // move down
          return newRow + 1;
        }
        return newRow;
      })();
      if (makeVisibleCol !== newCol || makeVisibleRow !== newRow) {
        grid.makeVisibleCell(makeVisibleCol, makeVisibleRow);
      }
      this._newRange = newRange;
      this._cell = newCell;
      return true;
    }

    _upInternal(e) {
      this.grid.fireListeners(DG_EVENT_TYPE.DRAG_SELECTION, {
        dragDone: true,
        newRange: this._newRange,
        oldRange: this._oldRange
      });
      this.grid.selection.stopDrag();
    }

    _getTargetCellAndRange(e) {
      const grid = this.grid;
      const abstractPos = grid._getMouseAbstractPoint(e);
      if (!abstractPos) {
        return null;
      }
      if (!this._oldRange) {
        return null;
      }
      // \    A    /
      //   ---t---
      //   |\   E|
      // D l  X  r B
      //   |F   \|
      //   ---b---
      // /    C    \
      let startCol = this._oldRange.start.col;
      let startRow = this._oldRange.start.row;
      let endCol = this._oldRange.end.col;
      let endRow = this._oldRange.end.row;
      const x = abstractPos.x;
      const y = abstractPos.y;
      const cell = grid.getCellAt(x, y);
      if (cell.col < 0 || cell.row < 0) {
        return null;
      }
      const startRect = grid.getCellRect(this._oldRange.start.col, this._oldRange.start.row);
      const endRect = grid.getCellRect(this._oldRange.end.col, this._oldRange.end.row);
      const top = startRect.top;
      const left = startRect.left;
      const right = endRect.right;
      const bottom = endRect.bottom;
      let x1 = left;
      let y1 = top;
      let x2 = right;
      let y2 = bottom;
      const ab = (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 <= 0; // A 或 B
      x1 = right;
      y1 = top;
      x2 = left;
      y2 = bottom;
      const ad = (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 > 0; // A 或 D
      if (cell.row >= startRow &&
        cell.row <= endRow &&
        cell.col >= startCol &&
        cell.col <= endCol) {
        if (ab) {
          // E
          endRow = cell.row;
        } else {
          // F
          endCol = cell.col;
        }
      } else {
        if (ab && ad) {
          // A
          startRow = cell.row;
        } else if (ab && !ad) {
          // B
          endCol = cell.col;
        } else if (!ab && ad) {
          // D
          startCol = cell.col;
        } else {
          // C
          endRow = cell.row;
        }
      }
      const range = createCellRange(startCol, startRow, endCol, endRow);
      return {
        cell,
        range
      };
    }
  }

  function parsePasteRangeBoxValues(value) {
    const normalizeValue = value.replace(/\r?\n$/, '');
    const lines = normalizeValue.split(/(?:\r?\n)|[\u2028\u2029]/g);
    const values = lines.map((line) => line.split(/\t/g));
    const colCount = values.reduce((n, cells) => Math.max(n, cells.length), 0);
    return {
      colCount,
      rowCount: values.length,
      getCellValue(offsetCol, offsetRow) {
        var _a;
        return ((_a = values[offsetRow]) === null || _a === void 0 ? void 0 : _a[offsetCol]) || '';
      }
    };
  }

  const _$2 = getDrawGridSymbol();

  function _getTargetRowAt(absoluteY) {
    const internal = this.getTargetRowAtInternal(absoluteY);
    if (isDef(internal)) {
      return internal;
    }
    const findBefore = (startRow, startBottom) => {
      let bottom = startBottom;
      for (let row = startRow; row >= 0; row--) {
        const height = _getRowHeight.call(this, row);
        const top = bottom - height;
        if (top <= absoluteY && absoluteY < bottom) {
          return {
            row,
            top
          };
        }
        bottom = top;
      }
      return null;
    };
    const findAfter = (startRow, startBottom) => {
      let top = startBottom - _getRowHeight.call(this, startRow);
      const { rowCount } = this[_$2];
      for (let row = startRow; row < rowCount; row++) {
        const height = _getRowHeight.call(this, row);
        const bottom = top + height;
        if (top <= absoluteY && absoluteY < bottom) {
          return {
            row,
            top
          };
        }
        top = bottom;
      }
      return null;
    };
    const candRow = Math.min(Math.ceil(absoluteY / this.defaultRowHeight), this.rowCount - 1);
    const candBottom = _getRowsHeight.call(this, 0, candRow);
    if (absoluteY >= candBottom) {
      return findAfter(candRow, candBottom);
    } else {
      return findBefore(candRow, candBottom);
    }
  }

  function _getTargetColAt(absoluteX) {
    let left = 0;
    const { colCount } = this[_$2];
    for (let col = 0; col < colCount; col++) {
      const width = _getColWidth.call(this, col);
      const right = left + width;
      if (right > absoluteX) {
        return {
          col,
          left
        };
      }
      left = right;
    }
    return null;
  }

  function _getTargetFrozenRowAt(absoluteY) {
    if (!this[_$2].frozenRowCount) {
      return null;
    }
    let top = this[_$2].scroll.top;
    const rowCount = this[_$2].frozenRowCount;
    for (let row = 0; row < rowCount; row++) {
      const height = _getRowHeight.call(this, row);
      const bottom = top + height;
      if (bottom > absoluteY) {
        return {
          row,
          top
        };
      }
      top = bottom;
    }
    return null;
  }

  function _getTargetFrozenColAt(absoluteX) {
    if (!this[_$2].frozenColCount) {
      return null;
    }
    let left = this[_$2].scroll.left;
    const colCount = this[_$2].frozenColCount;
    for (let col = 0; col < colCount; col++) {
      const width = _getColWidth.call(this, col);
      const right = left + width;
      if (right > absoluteX) {
        return {
          col,
          left
        };
      }
      left = right;
    }
    return null;
  }

  function _getFrozenRowsRect() {
    if (!this[_$2].frozenRowCount) {
      return null;
    }
    const top = this[_$2].scroll.top;
    let height = 0;
    const rowCount = this[_$2].frozenRowCount;
    for (let row = 0; row < rowCount; row++) {
      height += _getRowHeight.call(this, row);
    }
    return new Rect(this[_$2].scroll.left, top, this[_$2].canvas.width, height);
  }

  function _getFrozenColsRect() {
    if (!this[_$2].frozenColCount) {
      return null;
    }
    const left = this[_$2].scroll.left;
    let width = 0;
    const colCount = this[_$2].frozenColCount;
    for (let col = 0; col < colCount; col++) {
      width += _getColWidth.call(this, col);
    }
    return new Rect(left, this[_$2].scroll.top, width, this[_$2].canvas.height);
  }

  function _getCellDrawing(col, row) {
    if (!this[_$2].drawCells[row]) {
      return null;
    }
    return this[_$2].drawCells[row][col];
  }

  function _putCellDrawing(col, row, context) {
    if (!this[_$2].drawCells[row]) {
      this[_$2].drawCells[row] = {};
    }
    this[_$2].drawCells[row][col] = context;
  }

  function _removeCellDrawing(col, row) {
    if (!this[_$2].drawCells[row]) {
      return;
    }
    delete this[_$2].drawCells[row][col];
    if (Object.keys(this[_$2].drawCells[row]).length === 0) {
      delete this[_$2].drawCells[row];
    }
  }

  function _drawCell(ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers) {
    const rect = new Rect(absoluteLeft - visibleRect.left, absoluteTop - visibleRect.top, width, height);
    const drawRect = Rect.bounds(Math.max(absoluteLeft, skipAbsoluteLeft) - visibleRect.left, Math.max(absoluteTop, skipAbsoluteTop) - visibleRect.top, rect.right, rect.bottom);
    if (drawRect.height > 0 && drawRect.width > 0) {
      ctx.save();
      try {
        const cellDrawing = _getCellDrawing.call(this, col, row);
        if (cellDrawing) {
          cellDrawing.cancel();
        }
        const dcContext = new DrawCellContext(col, row, ctx, rect, drawRect, !!cellDrawing, this[_$2].selection, drawLayers);
        const p = this.onDrawCell(col, row, dcContext);
        if (isPromise(p)) {
          // 延迟绘图
          _putCellDrawing.call(this, col, row, dcContext);
          const pCol = col;
          dcContext._delayMode(this, () => {
            _removeCellDrawing.call(this, pCol, row);
          });
          p.then(() => {
            dcContext.terminate();
          });
        }
      } finally {
        ctx.restore();
      }
    }
  }

  function _drawRow(ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, skipAbsoluteTop, drawLayers) {
    const colCount = this[_$2].colCount;
    const drawOuter = (col, absoluteLeft) => {
      // 在数据范围之外绘制
      if (col >= colCount - 1 &&
        this[_$2].canvas.width > absoluteLeft - visibleRect.left) {
        const outerLeft = absoluteLeft - visibleRect.left;
        if (this.underlayBackgroundColor === 'transparent') {
          ctx.clearRect(outerLeft, absoluteTop - visibleRect.top, this[_$2].canvas.width - outerLeft, height);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = this.underlayBackgroundColor || '#F6F6F6';
          ctx.rect(outerLeft, absoluteTop - visibleRect.top, this[_$2].canvas.width - outerLeft, height);
          ctx.fill();
          ctx.restore();
        }
      }
    };
    let skipAbsoluteLeft = 0;
    if (initFrozenCol) {
      let absoluteLeft = initFrozenCol.left;
      const count = this[_$2].frozenColCount;
      for (let col = initFrozenCol.col; col < count; col++) {
        const width = _getColWidth.call(this, col);
        _drawCell.call(this, ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, 0, drawLayers);
        absoluteLeft += width;
        if (drawRight <= absoluteLeft) {
          // 在绘图范围之外（结束）
          drawOuter(col, absoluteLeft);
          return;
        }
      }
      skipAbsoluteLeft = absoluteLeft;
    }
    if (initCol) {
      let colAbsoluteLeft = initCol.left;
      for (let col = initCol.col; col < colCount; col++) {
        const width = _getColWidth.call(this, col);
        _drawCell.call(this, ctx, col, colAbsoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers);
        colAbsoluteLeft += width;
        if (drawRight <= colAbsoluteLeft) {
          // 在绘图范围之外（结束）
          drawOuter(col, colAbsoluteLeft);
          return;
        }
      }
      drawOuter(colCount - 1, colAbsoluteLeft);
    }
  }

  let _isPreciseColWidth = false;

  function _toPxWidth(grid, width) {
    // 解决100%出现滚动条问题，此办法会导致右侧有空白，空白部分由_initColWidthsOffset负责填充
    // return Math.round(toPx(width, grid[_].calcWidthContext));
    const w = toPx(width, grid[_$2].calcWidthContext);
    return _isPreciseColWidth ? w : Math.floor(w);
  }

  function _getColPreciseWidth(grid, col) {
    try {
      _isPreciseColWidth = true;
      return grid.getColWidth(col);
    } finally {
      _isPreciseColWidth = false;
    }
  }

  function _initColWidthsOffset(grid) {
    const colWidthsOffset = {};
    let total = 0;
    for (let col = 0; col < grid.colCount; col++) {
      const w1 = grid.getColWidth(col);
      const w2 = _getColPreciseWidth(grid, col);
      if (w1 !== w2) {
        total += w2 - w1;
        colWidthsOffset[col] = 0;
      }
    }
    total = Math.round(total);
    if (total > 0) {
      for (const col in colWidthsOffset) {
        if (colWidthsOffset.hasOwnProperty(col)) {
          colWidthsOffset[col] += 1;
          total--;
          if (!total) {
            break;
          }
        }
      }
    }
    grid[_$2].colWidthsOffset = colWidthsOffset;
  }

  function _adjustColWidth(col, orgWidth) {
    return this._adjustColWidth(col, orgWidth);
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
   * @param col - number of column
   * @returns width definition
   */
  function _getColWidthDefine(col) {
    const width = this[_$2].colWidthsMap.get(col);
    if (width) {
      return width;
    }
    return this.defaultColWidth;
  }

  /**
   * Gets the column width limits.
   * @param col - number of column
   * @returns the column width limits
   */
  function _getColWidthLimits(col) {
    const limit = this[_$2].colWidthsLimit[col];
    if (!limit) {
      return null;
    }
    const result = {};
    if (limit.min) {
      result.min = _toPxWidth(this, limit.min);
      result.minDef = limit.min;
    }
    if (limit.max) {
      result.max = _toPxWidth(this, limit.max);
      result.maxDef = limit.max;
    }
    return result;
  }

  /**
   * Checks if the given width definition is `auto`.
   * @param width - width definition to check
   * @returns `true ` if the given width definition is `auto`
   */
  function isAutoDefine(width) {
    return !!(width &&
      typeof width === 'string' &&
      width.toLowerCase() === 'auto');
  }

  /**
   * Creates a formula to calculate the auto width.
   * @returns formula
   */
  function _calcAutoColWidthExpr(shortCircuit = true) {
    const fullWidth = this[_$2].calcWidthContext.full;
    let sumMin = 0;
    const others = [];
    let autoCount = 0;
    const hasLimitsOnAuto = [];
    for (let col = 0; col < this[_$2].colCount; col++) {
      const def = _getColWidthDefine.call(this, col);
      const limits = _getColWidthLimits.call(this, col);
      if (isAutoDefine(def)) {
        if (limits) {
          hasLimitsOnAuto.push(limits);
          if (limits.min) {
            sumMin += limits.min;
          }
        }
        autoCount++;
      } else {
        let expr = def;
        if (limits) {
          const orgWidth = _toPxWidth(this, expr);
          const newWidth = _applyColWidthLimits(limits, orgWidth);
          if (orgWidth !== newWidth) {
            expr = `${ newWidth }px`;
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
      const autoPx = (fullWidth -
        _toPxWidth(this, `calc(${ others
          .map((c) => (typeof c === 'number' ? `${ c }px` : c))
          .join(' + ') })`)) /
        autoCount;
      hasLimitsOnAuto.forEach((limits) => {
        if (limits.min && autoPx < limits.min) {
          others.push(limits.minDef);
          autoCount--;
        } else if (limits.max && limits.max < autoPx) {
          others.push(limits.maxDef);
          autoCount--;
        }
      });
      if (shortCircuit && autoCount <= 0) {
        return `${ autoPx }px`;
      }
    }
    if (others.length) {
      const strDefs = [];
      let num = 0;
      others.forEach((c) => {
        if (typeof c === 'number') {
          num += c;
        } else {
          strDefs.push(c);
        }
      });
      strDefs.push(`${ num }px`);
      return `calc((100% - (${ strDefs.join(' + ') })) / ${ autoCount })`;
    } else {
      return `${ 100 / autoCount }%`;
    }
  }

  /**
   * Calculate the pixels of width from the definition of width.
   * @param width - width definition
   * @returns the pixels of width
   */
  function _colWidthDefineToPxWidth(width) {
    if (isAutoDefine(width)) {
      return _toPxWidth(this, _calcAutoColWidthExpr.call(this));
    }
    return _toPxWidth(this, width);
  }

  function _getColWidth(col) {
    const width = _getColWidthDefine.call(this, col);
    return _adjustColWidth.call(this, col, _colWidthDefineToPxWidth.call(this, width));
  }

  function _setColWidth(col, width) {
    this[_$2].colWidthsMap.put(col, width);
  }

  function _getRowHeight(row) {
    const internal = this.getRowHeightInternal(row);
    if (typeof internal === 'number') {
      return Number(internal);
    }
    const height = this[_$2].rowHeightsMap.get(row);
    if (height) {
      return height;
    }
    return this.defaultRowHeight;
  }

  function _getRowsHeight(startRow, endRow) {
    const internal = this.getRowsHeightInternal(startRow, endRow);
    if (typeof internal === 'number') {
      return Number(internal);
    }
    const rowCount = endRow - startRow + 1;
    let h = this.defaultRowHeight * rowCount;
    this[_$2].rowHeightsMap.each(startRow, endRow, (height) => {
      h += height - this.defaultRowHeight;
    });
    return h;
  }

  function _setRowHeight(row, height) {
    this[_$2].rowHeightsMap.put(row, height);
  }

  function _getUnderlayWidth() {
    let bodyWidth = this.getElement().clientWidth;
    for (let col = 0; col < this.frozenColCount; col++) {
      bodyWidth -= this.getColWidth(col);
    }
    if (bodyWidth < 0) {
      bodyWidth = 0;
    }
    let w = 0;
    if (this.underlayColCount >= 0) {
      if (this.underlayColWidth === 'auto') {
        w = this.underlayColCount * _toPxWidth(this, this.defaultColWidth);
      } else {
        w = this.underlayColCount * this.underlayColWidth;
      }
    } else {
      w = bodyWidth;
      if (this.underlayColWidth === 'auto') {
        const startCol = Math.max(this.colCount + this.underlayColCount, this.frozenColCount, 0);
        for (let col = startCol; col < this.colCount; col++) {
          w -= this.getColWidth(col);
        }
      } else {
        w += this.underlayColCount * this.underlayColWidth;
      }
    }
    if (w < 0) {
      w = 0;
    } else if (w > bodyWidth) {
      w = bodyWidth;
    }
    return w;
  }

  function _getScrollWidth() {
    const w = this._getColsWidth(0, this[_$2].colCount - 1);
    const underlayWidth = _getUnderlayWidth.call(this);
    return w + underlayWidth;
  }

  function _getUnderlayHeight() {
    let bodyHeight = this.getElement().clientHeight;
    for (let row = 0; row < this.frozenRowCount; row++) {
      bodyHeight -= this.getRowHeight(row);
    }
    if (bodyHeight < 0) {
      bodyHeight = 0;
    }
    let h = 0;
    if (this.underlayRowCount >= 0) {
      if (this.underlayRowHeight === 'auto') {
        h = this.underlayRowCount * this.defaultRowHeight;
      } else {
        h = this.underlayRowCount * this.underlayRowHeight;
      }
    } else {
      h = bodyHeight;
      if (this.underlayRowHeight === 'auto') {
        const startRow = Math.max(this.rowCount + this.underlayRowCount, this.frozenRowCount, 0);
        for (let row = startRow; row < this.rowCount; row++) {
          h -= this.getRowHeight(row);
        }
      } else {
        h += this.underlayRowCount * this.underlayRowHeight;
      }
    }
    if (h < 0) {
      h = 0;
    } else if (h > bodyHeight) {
      h = bodyHeight;
    }
    return h;
  }

  function _getScrollHeight() {
    const internal = this.getScrollHeightInternal(this[_$2].rowCount);
    if (typeof internal === 'number') {
      return Number(internal);
    }
    let h = this.defaultRowHeight * this[_$2].rowCount;
    this[_$2].rowHeightsMap.each(0, this[_$2].rowCount - 1, (height) => {
      h += height - this.defaultRowHeight;
    });
    const underlayHeight = _getUnderlayHeight.call(this);
    return h + underlayHeight;
  }

  function _onScroll(_e) {
    const lastLeft = this[_$2].scroll.left;
    const lastTop = this[_$2].scroll.top;
    const moveX = this[_$2].scrollable.scrollLeft - lastLeft;
    const moveY = this[_$2].scrollable.scrollTop - lastTop;
    // 保留下一个计算信息
    this[_$2].scroll = {
      left: this[_$2].scrollable.scrollLeft,
      top: this[_$2].scrollable.scrollTop
    };
    const visibleRect = this._getVisibleRect();
    if (Math.abs(moveX) >= visibleRect.width ||
      Math.abs(moveY) >= visibleRect.height) {
      // 完全重绘
      this._invalidateRect(visibleRect);
    } else {
      // 不同的重绘
      const context = this[_$2].context;
      if (context) {
        context.drawImage(this[_$2].canvas, -moveX, -moveY);
      }
      if (moveX !== 0) {
        // 计算水平移动的重绘范围
        const redrawRect = visibleRect.copy();
        if (moveX < 0) {
          redrawRect.width = -moveX;
          if (this[_$2].frozenColCount > 0) {
            // 当有固定列时绘制固定数量的列
            const frozenRect = _getFrozenColsRect.call(this);
            if (frozenRect) {
              redrawRect.width += frozenRect.width;
            }
          }
        } else if (moveX > 0) {
          redrawRect.left = redrawRect.right - moveX;
        }
        // 重绘
        this._invalidateRect(redrawRect);
        if (moveX > 0) {
          if (this[_$2].frozenColCount > 0) {
            // 当有固定列固定列图时
            const frozenRect = _getFrozenColsRect.call(this);
            if (frozenRect) {
              this._invalidateRect(frozenRect);
            }
          }
        }
      }
      if (moveY !== 0) {
        // 计算纵向移动的重绘范围
        const redrawRect = visibleRect.copy();
        if (moveY < 0) {
          redrawRect.height = -moveY;
          if (this[_$2].frozenRowCount > 0) {
            // 有固定线时固定线图
            const frozenRect = _getFrozenRowsRect.call(this);
            if (frozenRect) {
              redrawRect.height += frozenRect.height;
            }
          }
        } else if (moveY > 0) {
          redrawRect.top = redrawRect.bottom - moveY;
        }
        // 重绘
        this._invalidateRect(redrawRect);
        if (moveY > 0) {
          if (this[_$2].frozenRowCount > 0) {
            // 有固定线时固定线图
            const frozenRect = _getFrozenRowsRect.call(this);
            if (frozenRect) {
              this._invalidateRect(frozenRect);
            }
          }
        }
      }
    }
  }

  function _onTabKeyDown(shiftKey) {
    const grid = this;
    const focusCell = grid.selection.focus;
    const col = shiftKey
      ? grid.getMoveLeftColByKeyDownInternal(focusCell)
      : grid.getMoveRightColByKeyDownInternal(focusCell);
    if (0 <= col && col < grid.colCount) {
      grid._moveFocusCell(col, focusCell.row, false);
    } else if (0 > col) {
      grid._moveFocusCell(grid.colCount - 1, focusCell.row, false);
    } else {
      grid._moveFocusCell(0, focusCell.row, false);
    }
  }

  function _onEnterKeyDown(shiftKey) {
    const grid = this;
    const focusCell = grid.selection.focus;
    const row = shiftKey
      ? grid.getMoveUpRowByKeyDownInternal(focusCell)
      : grid.getMoveDownRowByKeyDownInternal(focusCell);
    if (0 <= row && row < grid.rowCount) {
      grid._moveFocusCell(focusCell.col, row, false);
      // } else if (0 > row) {
      //   grid._moveFocusCell(focusCell.col, grid.rowCount - 1, false)
      // } else {
      //   grid._moveFocusCell(focusCell.col, 0, false)
    }
  }

  function _onKeyDownMove(e) {
    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const { shiftKey, ctrlKey, metaKey, altKey } = e;
    const keyCode = event.getKeyCode(e);
    if (altKey) {
      return;
    }
    const focusCell = shiftKey ? this.selection.focus : this.selection.select;
    if (keyCode === KEY_LEFT) {
      if (ctrlKey || metaKey) {
        move(this, null, 'W');
      } else {
        if (!hmove.call(this, 'W')) {
          return;
        }
      }
      event.cancel(e);
    } else if (keyCode === KEY_UP) {
      if (e.ctrlKey || e.metaKey) {
        move(this, 'N', null);
      } else {
        if (!vmove.call(this, 'N')) {
          return;
        }
      }
      event.cancel(e);
    } else if (keyCode === KEY_RIGHT) {
      if (e.ctrlKey || e.metaKey) {
        move(this, null, 'E');
      } else {
        if (!hmove.call(this, 'E')) {
          return;
        }
      }
      event.cancel(e);
    } else if (keyCode === KEY_DOWN) {
      if (e.ctrlKey || e.metaKey) {
        move(this, 'S', null);
      } else {
        if (!vmove.call(this, 'S')) {
          return;
        }
      }
      event.cancel(e);
    } else if (keyCode === KEY_HOME) {
      if (e.ctrlKey || e.metaKey) {
        move(this, 'N', 'W');
      } else {
        move(this, null, 'W');
      }
      event.cancel(e);
    } else if (keyCode === KEY_END) {
      if (e.ctrlKey || e.metaKey) {
        move(this, 'S', 'E');
      } else {
        move(this, null, 'E');
      }
      event.cancel(e);
    } else if (keyCode === KEY_TAB && ((_a = this.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
      _onTabKeyDown.call(this, shiftKey);
      event.cancel(e);
    } else if (keyCode === KEY_ENTER && ((_b = this.keyboardOptions) === null || _b === void 0 ? void 0 : _b.moveCellOnEnter)) {
      _onEnterKeyDown.call(this, shiftKey);
      event.cancel(e);
    } else if (keyCode === KEY_ALPHA_A &&
      ((_c = this.keyboardOptions) === null || _c === void 0 ? void 0 : _c.selectAllOnCtrlA) &&
      (ctrlKey || metaKey)) {
      let startCol = 0;
      let startRow = 0;
      if (shiftKey) {
        if ((_g = (_f = (_d = this.keyboardOptions) === null || _d === void 0 ? void 0 : _d.selectAllOptions) === null || _f === void 0 ? void 0 : _f.shiftCtrlA) === null || _g === void 0 ? void 0 : _g.excludeFrozenCol) {
          startCol = this.frozenRowCount;
        }
        if ((_k = (_j = (_h = this.keyboardOptions) === null || _h === void 0 ? void 0 : _h.selectAllOptions) === null || _j === void 0 ? void 0 : _j.shiftCtrlA) === null || _k === void 0 ? void 0 : _k.excludeFrozenRow) {
          startRow = this.frozenRowCount;
        }
      } else {
        if ((_o = (_m = (_l = this.keyboardOptions) === null || _l === void 0 ? void 0 : _l.selectAllOptions) === null || _m === void 0 ? void 0 : _m.ctrlA) === null || _o === void 0 ? void 0 : _o.excludeFrozenCol) {
          startCol = this.frozenRowCount;
        }
        if ((_r = (_q = (_p = this.keyboardOptions) === null || _p === void 0 ? void 0 : _p.selectAllOptions) === null || _q === void 0 ? void 0 : _q.ctrlA) === null || _r === void 0 ? void 0 : _r.excludeFrozenRow) {
          startRow = this.frozenRowCount;
        }
      }
      this.selection.range = {
        start: { col: startCol, row: startRow },
        end: { col: this.colCount - 1, row: this.rowCount - 1 }
      };
      this.invalidate();
      event.cancel(e);
    }

    function move(grid, vDir, hDir) {
      const row = vDir === 'S' ? grid.rowCount - 1 : vDir === 'N' ? 0 : focusCell.row;
      const col = hDir === 'E' ? grid.colCount - 1 : hDir === 'W' ? 0 : focusCell.col;
      grid._moveFocusCell(col, row, shiftKey);
    }

    function vmove(vDir) {
      let row;
      if (vDir === 'S') {
        row = this.getMoveDownRowByKeyDownInternal(focusCell);
        if (this.rowCount <= row) {
          return false;
        }
      } else {
        row = this.getMoveUpRowByKeyDownInternal(focusCell);
        if (row < 0) {
          return false;
        }
      }
      const { col } = focusCell;
      this._moveFocusCell(col, row, shiftKey);
      return true;
    }

    function hmove(hDir, shiftKeyFlg = shiftKey) {
      let col;
      if (hDir === 'E') {
        col = this.getMoveRightColByKeyDownInternal(focusCell);
        if (this.colCount <= col) {
          return false;
        }
      } else {
        col = this.getMoveLeftColByKeyDownInternal(focusCell);
        if (col < 0) {
          return false;
        }
      }
      const { row } = focusCell;
      this._moveFocusCell(col, row, shiftKeyFlg);
      return true;
    }
  }

  function _bindEvents() {
    const { handler, element, scrollable } = this[_$2];
    const getCellEventArgsSet = (e) => {
      const abstractPos = this._getMouseAbstractPoint(e);
      if (!abstractPos) {
        return {};
      }
      const cell = this.getCellAt(abstractPos.x, abstractPos.y);
      if (cell.col < 0 || cell.row < 0) {
        return {
          abstractPos,
          cell
        };
      }
      const eventArgs = {
        col: cell.col,
        event: e,
        row: cell.row
      };
      return {
        abstractPos,
        cell,
        eventArgs
      };
    };
    const canResizeColumn = (col) => {
      const limit = this[_$2].colWidthsLimit[col];
      let canResize = this.disableColumnResize !== true;
      if (limit && canResize) {
        canResize = limit.disableResize !== true;
        if (canResize && limit.min && limit.max) {
          canResize = limit.max !== limit.min;
        }
      }
      return canResize;
      // if (!limit || !limit.min || !limit.max) {
      //     return true;
      // }
      // return limit.max !== limit.min;
    };
    handler.on(element, 'mousedown', (e) => {
      const eventArgsSet = getCellEventArgsSet(e);
      const abstractPos = eventArgsSet.abstractPos;
      const eventArgs = eventArgsSet.eventArgs;
      if (!abstractPos) {
        return;
      }
      if (eventArgs) {
        const results = this.fireListeners(DG_EVENT_TYPE.MOUSEDOWN_CELL, eventArgs);
        if (array.findIndex(results, (v) => !v) >= 0) {
          return;
        }
      }
      if (event.getMouseButtons(e) !== 1) {
        return;
      }
      if (_getResizeSelectionAt.call(this, abstractPos.x, abstractPos.y)) {
        this[_$2].selectionResizer.start(e);
      } else {
        const resizeCol = _getResizeColAt.call(this, abstractPos.x, abstractPos.y);
        if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
          // 改变宽度
          this[_$2].columnResizer.start(resizeCol, e);
        } else {
          // 选择
          this[_$2].cellSelector.start(e);
        }
      }
    });
    handler.on(element, 'mouseup', (e) => {
      if (!this.hasListeners(DG_EVENT_TYPE.MOUSEUP_CELL)) {
        return;
      }
      const eventArgs = getCellEventArgsSet(e).eventArgs;
      if (eventArgs) {
        this.fireListeners(DG_EVENT_TYPE.MOUSEUP_CELL, eventArgs);
      }
    });
    let doubleTapBefore = null;
    let longTouchId = null;
    handler.on(element, 'touchstart', (e) => {
      if (!doubleTapBefore) {
        doubleTapBefore = getCellEventArgsSet(e).eventArgs;
        setTimeout(() => {
          doubleTapBefore = null;
        }, 350);
      } else {
        const eventArgs = getCellEventArgsSet(e).eventArgs;
        if (eventArgs &&
          eventArgs.col === doubleTapBefore.col &&
          eventArgs.row === doubleTapBefore.row) {
          this.fireListeners(DG_EVENT_TYPE.DBLTAP_CELL, eventArgs);
        } else if (!eventArgs) {
          this.fireListeners(DG_EVENT_TYPE.DBLTAP_UNDERLAY);
        }
        doubleTapBefore = null;
        if (e.defaultPrevented) {
          return;
        }
      }
      longTouchId = setTimeout(() => {
        // 长按选择模式时
        longTouchId = null;
        const abstractPos = this._getMouseAbstractPoint(e);
        if (!abstractPos) {
          return;
        }
        if (_getResizeSelectionAt.call(this, abstractPos.x, abstractPos.y)) {
          this[_$2].selectionResizer.start(e);
        } else {
          const resizeCol = _getResizeColAt.call(this, abstractPos.x, abstractPos.y, 15);
          if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
            // 改变宽度
            this[_$2].columnResizer.start(resizeCol, e);
          } else {
            // 选择
            this[_$2].cellSelector.start(e);
          }
        }
      }, 500);
    });

    function cancel(e) {
      if (longTouchId) {
        clearTimeout(longTouchId);
        longTouchId = null;
      }
    }

    handler.on(element, 'touchcancel', cancel);
    handler.on(element, 'touchmove', cancel);
    handler.on(element, 'touchend', (e) => {
      if (longTouchId) {
        clearTimeout(longTouchId);
        this[_$2].cellSelector.select(e);
        longTouchId = null;
      }
    });
    let isMouseover = false;
    let mouseEnterCell = null;
    let mouseOverCell = null;
    const onMouseenterCell = (cell, related) => {
      this.fireListeners(DG_EVENT_TYPE.MOUSEENTER_CELL, {
        col: cell.col,
        row: cell.row,
        event: cell.event,
        related
      });
      mouseEnterCell = cell;
    };
    const onMouseleaveCell = (related) => {
      const beforeMouseCell = mouseEnterCell;
      mouseEnterCell = null;
      if (beforeMouseCell) {
        this.fireListeners(DG_EVENT_TYPE.MOUSELEAVE_CELL, {
          col: beforeMouseCell.col,
          row: beforeMouseCell.row,
          related
        });
      }
      return beforeMouseCell || undefined;
    };
    const onMouseoverCell = (cell, related) => {
      this.fireListeners(DG_EVENT_TYPE.MOUSEOVER_CELL, {
        col: cell.col,
        row: cell.row,
        event: cell.event,
        related
      });
      mouseOverCell = cell;
    };
    const onMouseoutCell = (related) => {
      const beforeMouseCell = mouseOverCell;
      mouseOverCell = null;
      if (beforeMouseCell) {
        this.fireListeners(DG_EVENT_TYPE.MOUSEOUT_CELL, {
          col: beforeMouseCell.col,
          row: beforeMouseCell.row,
          related
        });
      }
      return beforeMouseCell || undefined;
    };
    const scrollElement = scrollable.getElement();
    handler.on(scrollElement, 'mouseover', (e) => {
      isMouseover = true;
    });
    handler.on(scrollElement, 'mouseout', (e) => {
      isMouseover = false;
      onMouseoutCell();
    });
    handler.on(element, 'mouseleave', (e) => {
      onMouseleaveCell();
    });
    handler.on(element, 'mousemove', (e) => {
      const eventArgsSet = getCellEventArgsSet(e);
      const abstractPos = eventArgsSet.abstractPos;
      const eventArgs = eventArgsSet.eventArgs;
      if (eventArgs) {
        const beforeMouseCell = mouseEnterCell;
        if (beforeMouseCell) {
          this.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
          if (beforeMouseCell.col !== eventArgs.col ||
            beforeMouseCell.row !== eventArgs.row) {
            const enterCell = {
              col: eventArgs.col,
              row: eventArgs.row
            };
            const outCell = onMouseoutCell(enterCell);
            const leaveCell = onMouseleaveCell(enterCell);
            onMouseenterCell(eventArgs, leaveCell);
            if (isMouseover) {
              onMouseoverCell(eventArgs, outCell);
            }
          } else if (isMouseover && !mouseOverCell) {
            onMouseoverCell(eventArgs);
          }
        } else {
          onMouseenterCell(eventArgs);
          if (isMouseover) {
            onMouseoverCell(eventArgs);
          }
          this.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
        }
      } else {
        onMouseoutCell();
        onMouseleaveCell();
      }
      if (this[_$2].columnResizer.moving(e) ||
        this[_$2].selectionResizer.moving(e) ||
        this[_$2].cellSelector.moving(e)) {
        return;
      }
      const elementStyle = element.style;
      if (!abstractPos) {
        if (elementStyle.cursor === 'col-resize' ||
          elementStyle.cursor === 'crosshair') {
          elementStyle.cursor = '';
        }
        return;
      }
      if (_getResizeSelectionAt.call(this, abstractPos.x, abstractPos.y)) {
        elementStyle.cursor = 'crosshair';
      } else {
        const resizeCol = _getResizeColAt.call(this, abstractPos.x, abstractPos.y);
        if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
          elementStyle.cursor = 'col-resize';
        } else {
          if (elementStyle.cursor === 'col-resize' ||
            elementStyle.cursor === 'crosshair') {
            elementStyle.cursor = '';
          }
        }
      }
    });
    handler.on(element, 'click', (e) => {
      if (this[_$2].columnResizer.lastMoving(e) ||
        this[_$2].selectionResizer.moving(e) ||
        this[_$2].cellSelector.lastMoving(e)) {
        return;
      }
      if (!this.hasListeners(DG_EVENT_TYPE.CLICK_CELL) &&
        !this.hasListeners(DG_EVENT_TYPE.CLICK_UNDERLAY)) {
        return;
      }
      if (browser.Chrome && e.eventPhase === Event.AT_TARGET) {
        // 解决 Chrome 下，单元格输入状态使用鼠标选择，当鼠标在输入框action按钮处抬起时触发动作问题
        return;
      }
      const eventArgs = getCellEventArgsSet(e).eventArgs;
      if (!eventArgs) {
        this.fireListeners(DG_EVENT_TYPE.CLICK_UNDERLAY);
      } else {
        this.fireListeners(DG_EVENT_TYPE.CLICK_CELL, eventArgs);
      }
    });
    handler.on(element, 'contextmenu', (e) => {
      if (!this.hasListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL)) {
        return;
      }
      const { eventArgs } = getCellEventArgsSet(e);
      if (!eventArgs) {
        return;
      }
      this.fireListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL, eventArgs);
    });
    handler.on(element, 'dblclick', (e) => {
      if (!this.hasListeners(DG_EVENT_TYPE.DBLCLICK_CELL) &&
        !this.hasListeners(DG_EVENT_TYPE.DBLCLICK_UNDERLAY)) {
        return;
      }
      const eventArgs = getCellEventArgsSet(e).eventArgs;
      if (!eventArgs) {
        this.fireListeners(DG_EVENT_TYPE.DBLCLICK_UNDERLAY);
      } else {
        this.fireListeners(DG_EVENT_TYPE.DBLCLICK_CELL, eventArgs);
      }
    });
    this[_$2].focusControl.onKeyDown((evt) => {
      const results = this.fireListeners(DG_EVENT_TYPE.KEYDOWN, evt);
      if (array.findIndex(results, (v) => v === false) >= 0) {
        return false;
      }
    });
    this[_$2].selection.listen(DG_EVENT_TYPE.SELECTED_CELL, (data) => {
      const results = this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, data, data.selected);
      if (array.findIndex(results, (v) => v === false) >= 0) {
        return false;
      }
    });
    scrollable.onScroll((e) => {
      _onScroll.call(this, e);
      this.fireListeners(DG_EVENT_TYPE.SCROLL, { event: e });
    });
    this[_$2].focusControl.onKeyDownMove((e) => {
      _onKeyDownMove.call(this, e);
    });
    const getCopyValue = () => {
      let copyValue = '';
      const range = this[_$2].selection.range;
      const copyRange = this.getCopyRangeInternal(range);
      for (let row = copyRange.start.row; row <= copyRange.end.row; row++) {
        for (let col = copyRange.start.col; col <= copyRange.end.col; col++) {
          const copyCellValue = this.getCopyCellValue(col, row, copyRange);
          if (isPromise(copyCellValue)) ;
          else {
            const strCellValue = `${ copyCellValue }`;
            if (/^\[object .*\]$/.exec(strCellValue)) ;
            else {
              copyValue += strCellValue;
            }
          }
          if (col < copyRange.end.col) {
            copyValue += '\t';
          }
        }
        if (row < copyRange.end.row) {
          copyValue += '\n';
        }
      }
      return copyValue;
    };
    this[_$2].focusControl.onCopy((e) => {
      let copyValue = getCopyValue();
      let value = array.find(this.fireListeners(DG_EVENT_TYPE.COPY, e), isDef);
      if (isDef(value)) {
        copyValue = value;
      }
      return copyValue;
    });
    this[_$2].focusControl.onCut((e) => {
      let copyValue = getCopyValue();
      let value = array.find(this.fireListeners(DG_EVENT_TYPE.CUT, e), isDef);
      if (isDef(value)) {
        copyValue = value;
      }
      return copyValue;
    });
    this[_$2].focusControl.onPaste((e) => {
      const value = e.value;
      const event = e.event;
      const pasteValue = this.hasListeners(DG_EVENT_TYPE.PASTE)
        ? array.find(this.fireListeners(DG_EVENT_TYPE.PASTE, value, event), isDef)
        : value;
      if (isDef(pasteValue)) {
        const normalizeValue = pasteValue.replace(/\r?\n$/, '');
        const { col, row } = this[_$2].selection.select;
        const multi = /[\r\n\u2028\u2029\t]/.test(normalizeValue); // is multi cell values
        let rangeBoxValues = null;
        const pasteCellEvent = {
          col,
          row,
          value: pasteValue,
          normalizeValue,
          multi,
          get rangeBoxValues() {
            return (rangeBoxValues !== null && rangeBoxValues !== void 0 ? rangeBoxValues : (rangeBoxValues = parsePasteRangeBoxValues(normalizeValue)));
          },
          event
        };
        this.fireListeners(DG_EVENT_TYPE.PASTE_CELL, pasteCellEvent);
      }
    });
    this[_$2].focusControl.onInput((value) => {
      const col = this[_$2].selection.select.col;
      const row = this[_$2].selection.select.row;
      this.fireListeners(DG_EVENT_TYPE.INPUT_CELL, { col, row, value });
    });
    this[_$2].focusControl.onDelete((event) => {
      const { col, row } = this[_$2].selection.select;
      this.fireListeners(DG_EVENT_TYPE.DELETE_CELL, { col, row, event });
    });
    this[_$2].focusControl.onFocus((e) => {
      this.fireListeners(DG_EVENT_TYPE.FOCUS_GRID, e);
      this[_$2].focusedGrid = true;
      const col = this[_$2].selection.select.col;
      const row = this[_$2].selection.select.row;
      this.invalidateCell(col, row);
    });
    this[_$2].focusControl.onBlur((e) => {
      this.fireListeners(DG_EVENT_TYPE.BLUR_GRID, e);
      this[_$2].focusedGrid = false;
      const col = this[_$2].selection.select.col;
      const row = this[_$2].selection.select.row;
      this.invalidateCell(col, row);
    });
  }

  function _getResizeSelectionAt(abstractX, abstractY, offset = 7) {
    const range = this.selection.range;
    const cellRect = this.getCellRect(range.end.col, range.end.row);
    return !!(cellRect.bottom - offset <= abstractY &&
      abstractY <= cellRect.bottom &&
      cellRect.right - offset <= abstractX &&
      abstractX <= cellRect.right &&
      this.canDragSelection);
  }

  function _getResizeColAt(abstractX, abstractY, offset = 5) {
    const grid = this;
    if (grid[_$2].frozenRowCount <= 0) {
      return -1;
    }
    const frozenRect = _getFrozenRowsRect.call(this);
    if (frozenRect && !frozenRect.inPoint(abstractX, abstractY)) {
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

  function _getScrollableVisibleRect() {
    let frozenColsWidth = 0;
    if (this[_$2].frozenColCount > 0) {
      // 当有固定列时绘制固定数量的列
      const frozenRect = _getFrozenColsRect.call(this);
      if (frozenRect) {
        frozenColsWidth = frozenRect.width;
      }
    }
    let frozenRowsHeight = 0;
    if (this[_$2].frozenRowCount > 0) {
      // 当有固定列时绘制固定数量的列
      const frozenRect = _getFrozenRowsRect.call(this);
      if (frozenRect) {
        frozenRowsHeight = frozenRect.height;
      }
    }
    return new Rect(this[_$2].scrollable.scrollLeft + frozenColsWidth, this[_$2].scrollable.scrollTop + frozenRowsHeight, this[_$2].canvas.width - frozenColsWidth, this[_$2].canvas.height - frozenRowsHeight);
  }

  function createRootElement() {
    const element = document.createElement('div');
    element.classList.add('kaka-grid');
    return element;
  }

  const grids = [];

  /**
   * DrawGrid
   */
  class DrawGrid extends EventTarget {
    /**
     * constructor
     *
     * <pre>
     * Constructor options
     * -----
     * rowCount: grid row count.default 10
     * colCount: grid col count.default 10
     * frozenColCount: default 0
     * frozenRowCount: default 0
     * defaultRowHeight: default grid row height. default 40
     * defaultColWidth: default grid col width. default 80
     * highlightBorderWidth: default grid highlight border width. default 2
     * parentElement: canvas parentElement
     * font: default font
     * underlayRowCount: default 0
     * underlayColCount: default 0
     * underlayRowHeight: default 'auto'
     * underlayColWidth: default 'auto'
     * underlayBackgroundColor: underlay background color
     * singleSelection: default false
     * disableColumnResize: default false
     * -----
     * </pre>
     */
    constructor(options = {}) {
      var _a, _b;
      super();
      grids.push(this);
      const {
        rowCount = 10,
        colCount = 10,
        frozenColCount = 0,
        frozenRowCount = 0,
        defaultRowHeight,
        defaultColWidth,
        highlightBorderWidth,
        font,
        underlayRowCount = 0,
        underlayColCount = 0,
        underlayRowHeight = 'auto',
        underlayColWidth = 'auto',
        underlayBackgroundColor,
        borderMode = 'none',
        borderColor = '',
        borderWidth = 0,
        keyboardOptions,
        parentElement,
        singleSelection,
        disableColumnResize
      } = options;
      const protectedSpace = (this[_$2] = {});
      style$2.initDocument();
      protectedSpace.element = createRootElement();
      console.log(`w=${parentElement.clientWidth} h=${parentElement.clientHeight}`)
      console.log(`w=${parentElement.offsetWidth} h=${parentElement.offsetHeight}`)
      protectedSpace.canvas = hiDPI.transform(document.createElement('canvas'));
      protectedSpace.context = protectedSpace.canvas.getContext('2d', {
        alpha: false
      });
      protectedSpace.scrollable = style$2.hasMusselScrollbar()
        ? new MusselScrollbar()
        : style$2.hasPerfectScrollbar()
          ? new Scrollbar()
          : new Scrollable(protectedSpace.canvas);
      protectedSpace.handler = new EventHandler();
      protectedSpace.selection = new Selection(this, (range) => {
        return this.updateSelectionRange(range);
      });
      protectedSpace.focusControl = new FocusControl(this, protectedSpace.scrollable.getElement(), protectedSpace.scrollable);
      protectedSpace.rowCount = rowCount;
      protectedSpace.colCount = colCount;
      protectedSpace.frozenColCount = frozenColCount;
      protectedSpace.frozenRowCount = frozenRowCount;
      protectedSpace.underlayRowCount = underlayRowCount;
      protectedSpace.underlayColCount = underlayColCount;
      protectedSpace.underlayRowHeight = underlayRowHeight;
      protectedSpace.underlayColWidth = underlayColWidth;
      protectedSpace.borderMode = borderMode;
      protectedSpace.borderColor = borderColor;
      protectedSpace.borderWidth = borderWidth;
      protectedSpace.defaultRowHeight = defaultRowHeight;
      protectedSpace.defaultColWidth = defaultColWidth;
      protectedSpace.highlightBorderWidth = highlightBorderWidth;
      protectedSpace.font = font;
      protectedSpace.underlayBackgroundColor = underlayBackgroundColor;
      protectedSpace.keyboardOptions = keyboardOptions || {};
      protectedSpace.keyboardOptions.moveCellOnEnter =
        (_a = protectedSpace.keyboardOptions.moveCellOnEnter) !== null && _a !== void 0 ? _a : true;
      protectedSpace.keyboardOptions.moveCellOnTab =
        (_b = protectedSpace.keyboardOptions.moveCellOnTab) !== null && _b !== void 0 ? _b : true;
      protectedSpace.singleSelection = !!singleSelection;
      protectedSpace.disableColumnResize =
        !!disableColumnResize || !!options.disableColResize;
      /////
      protectedSpace.rowHeightsMap = new NumberMap();
      protectedSpace.colWidthsMap = new NumberMap();
      protectedSpace.colWidthsLimit = {};
      protectedSpace.colWidthsOffset = {};
      protectedSpace.calcWidthContext = {
        _: protectedSpace,
        get full() {
          return this._.canvas.width;
        },
        get em() {
          return getFontSize(this._.context, this._.font).width;
        }
      };
      protectedSpace.columnResizer = new ColumnResizer(this);
      protectedSpace.selectionResizer = new SelectionResizer(this);
      protectedSpace.cellSelector = new CellSelector(this);
      protectedSpace.drawCells = {};
      protectedSpace.cellTextOverflows = {};
      protectedSpace.cellTypeOverflows = {};
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
      } else {
        this.updateSize();
      }
      _bindEvents.call(this);
      this.bindEventsInternal();
    }

    static get EVENT_TYPE() {
      return DG_EVENT_TYPE;
    }

    /**
     * Get root element.
     * @returns root element
     */
    getElement() {
      return this[_$2].element;
    }

    /**
     * Get canvas element.
     */
    get canvas() {
      return this[_$2].canvas;
    }

    /**
     * Focus the grid.
     * @returns
     */
    focus() {
      const { col, row } = this[_$2].selection.select;
      this.focusCell(col, row);
    }

    hasFocusGrid() {
      return this[_$2].focusedGrid;
    }

    /**
     * Selection instance.
     */
    get selection() {
      return this[_$2].selection;
    }

    /**
     * Number of rows.
     */
    get rowCount() {
      return this[_$2].rowCount;
    }

    set rowCount(rowCount) {
      this[_$2].rowCount = rowCount;
      this.updateScroll();
      if (this[_$2].selection._updateGridRange()) {
        const { col, row } = this[_$2].selection.focus;
        this.makeVisibleCell(col, row);
        this.setFocusCursor(col, row);
      }
    }

    /**
     * Number of columns.
     */
    get colCount() {
      return this[_$2].colCount;
    }

    set colCount(colCount) {
      this[_$2].colCount = colCount;
      this.updateScroll();
      if (this[_$2].selection._updateGridRange()) {
        const { col, row } = this[_$2].selection.focus;
        this.makeVisibleCell(col, row);
        this.setFocusCursor(col, row);
      }
    }

    /**
     * Number of frozen columns.
     */
    get frozenColCount() {
      return this[_$2].frozenColCount;
    }

    set frozenColCount(frozenColCount) {
      this[_$2].frozenColCount = frozenColCount;
    }

    /**
     * Number of frozen rows.
     */
    get frozenRowCount() {
      return this[_$2].frozenRowCount;
    }

    set frozenRowCount(frozenRowCount) {
      this[_$2].frozenRowCount = frozenRowCount;
    }

    /**
     * Default row height.
     *
     */
    get defaultRowHeight() {
      return this[_$2].defaultRowHeight || this.getDefaultRowHeight();
    }

    set defaultRowHeight(defaultRowHeight) {
      this[_$2].defaultRowHeight = defaultRowHeight;
    }

    /**
     * Default column width.
     */
    get defaultColWidth() {
      return this[_$2].defaultColWidth || this.getDefaultColWidth();
    }

    set defaultColWidth(defaultColWidth) {
      this[_$2].defaultColWidth = defaultColWidth;
    }

    /**
     * Highlight Border Width.
     */
    get highlightBorderWidth() {
      return this[_$2].highlightBorderWidth || this.getHighlightBorderWidth();
    }

    set highlightBorderWidth(highlightBorderWidth) {
      this[_$2].highlightBorderWidth = highlightBorderWidth;
    }

    /**
     * Font definition as a string.
     */
    get font() {
      return this[_$2].font || this.getDefaultFont();
    }

    set font(font) {
      this[_$2].font = font;
    }

    /**
     * Number of underlay rows.
     */
    get underlayRowCount() {
      return this[_$2].underlayRowCount;
    }

    set underlayRowCount(underlayRowCount) {
      this[_$2].underlayRowCount = underlayRowCount;
    }

    /**
     * Number of underlay cols.
     */
    get underlayColCount() {
      return this[_$2].underlayColCount;
    }

    set underlayColCount(underlayColCount) {
      this[_$2].underlayColCount = underlayColCount;
    }

    /**
     * Height of underlay row.
     */
    get underlayRowHeight() {
      return this[_$2].underlayRowHeight;
    }

    set underlayRowHeight(underlayRowHeight) {
      this[_$2].underlayRowHeight = underlayRowHeight;
    }

    /**
     * Width of underlay col.
     */
    get underlayColWidth() {
      return this[_$2].underlayColWidth;
    }

    set underlayColWidth(underlayColWidth) {
      this[_$2].underlayColWidth = underlayColWidth;
    }

    /**
     * Background color of the underlay.
     */
    get underlayBackgroundColor() {
      return (this[_$2].underlayBackgroundColor ||
        this.getDefaultUnderlayBackgroundColor());
    }

    set underlayBackgroundColor(underlayBackgroundColor) {
      this[_$2].underlayBackgroundColor = underlayBackgroundColor;
    }

    /**
     * Border color of the grid.
     */
    get borderColor() {
      return this[_$2].borderColor || this.getDefaultBorderColor();
    }

    set borderColor(borderColor) {
      this[_$2].borderColor = borderColor;
    }

    /**
     * Border width of the grid.
     */
    get borderWidth() {
      return this[_$2].borderWidth || this.getDefaultBorderWidth();
    }

    set borderWidth(borderWidth) {
      this[_$2].borderWidth = borderWidth;
    }

    /**
     * Border mode of the grid.
     */
    get borderMode() {
      return this[_$2].borderMode || this.getDefaultBorderMode();
    }

    set borderMode(borderMode) {
      this[_$2].borderMode = borderMode;
    }

    get keyboardOptions() {
      var _a;
      return (_a = this[_$2].keyboardOptions) !== null && _a !== void 0 ? _a : null;
    }

    set keyboardOptions(keyboardOptions) {
      this[_$2].keyboardOptions = keyboardOptions !== null && keyboardOptions !== void 0 ? keyboardOptions : undefined;
    }

    /**
     * Single selection.
     */
    get singleSelection() {
      return this[_$2].singleSelection;
    }

    set singleSelection(singleSelection) {
      this[_$2].singleSelection = singleSelection;
    }

    /**
     * Disable column resize.
     */
    get disableColumnResize() {
      return this[_$2].disableColumnResize;
    }

    set disableColumnResize(disableColumnResize) {
      this[_$2].disableColumnResize = disableColumnResize;
    }

    get disableColResize() {
      window.console.warn('\'disableColResize\' is deprecated, please use \'disableColumnResize\' instead');
      return this.disableColumnResize;
    }

    set disableColResize(disableColumnResize) {
      window.console.warn('\'disableColResize\' is deprecated, please use \'disableColumnResize\' instead');
      this.disableColumnResize = disableColumnResize;
    }

    get canDragSelection() {
      return this[_$2].selectionResizer.canStart();
    }

    configure(name, value) {
      const cfg = this[_$2].config || (this[_$2].config = {});
      if (isDef(value)) {
        cfg[name] = value;
      }
      return cfg[name];
    }

    /**
     * Apply the changed size.
     * @returns
     */
    updateSize() {
      // Update size of canvas
      const { canvas } = this[_$2];
      canvas.style.width = '';
      canvas.style.height = '';
      let width = canvas.offsetWidth;
      if (!width) {
        // for legacy
        const parent = canvas.parentElement;
        if (parent !== null) {
          width = parent.offsetWidth - style$2.getScrollBarSize();
        }
      }
      width = Math.floor(width);
      let height = canvas.offsetHeight;
      if (!height) {
        // for legacy
        const parent = canvas.parentElement;
        if (parent !== null) {
          height = parent.offsetHeight - style$2.getScrollBarSize();
        }
      }
      height = Math.floor(height);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${ width }px`;
      canvas.style.height = `${ height }px`;
      const sel = this[_$2].selection.select;
      this[_$2].focusControl.setFocusRect(this.getFocusRectInternal(sel.col, sel.row));
    }

    /**
     * Apply the changed scroll size.
     * @returns `true` if there was a change in the scroll size
     */
    updateScroll() {
      _initColWidthsOffset(this);
      const { scrollable } = this[_$2];
      const newHeight = _getScrollHeight.call(this);
      const newWidth = _getScrollWidth.call(this);
      if (newHeight === scrollable.scrollHeight &&
        newWidth === scrollable.scrollWidth) {
        scrollable.update();
        return false;
      } else {
        scrollable.setScrollSize(newWidth, newHeight);
        this[_$2].scroll = {
          left: scrollable.scrollLeft,
          top: scrollable.scrollTop
        };
        return true;
      }
    }

    /**
     * Get the row height of the given the row index.
     * @param row - The row index
     * @returns The row height
     */
    getRowHeight(row) {
      return _getRowHeight.call(this, row);
    }

    /**
     * Set the row height of the given the row index.
     * @param row - The row index
     * @param height - The row height
     * @returns
     */
    setRowHeight(row, height) {
      _setRowHeight.call(this, row, height);
    }

    /**
     * Get the column width of the given the column index.
     * @param col - The column index
     * @returns The column width
     */
    getColWidth(col) {
      return _getColWidth.call(this, col);
    }

    /**
     * Set the column widtht of the given the column index.
     * @param col - The column index
     * @param width - The column width
     * @returns
     */
    setColWidth(col, width) {
      _setColWidth.call(this, col, width);
    }

    /**
     * Get the column max width of the given the column index.
     * @param col - The column index
     * @returns The column max width
     */
    getMaxColWidth(col) {
      const obj = this[_$2].colWidthsLimit[col];
      return (obj && obj.max) || undefined;
    }

    /**
     * Set the column max width of the given the column index.
     * @param col - The column index
     * @param maxWidth - The column max width
     * @returns
     */
    setMaxColWidth(col, maxWidth) {
      const obj = this[_$2].colWidthsLimit[col] || (this[_$2].colWidthsLimit[col] = {});
      obj.max = maxWidth;
    }

    /**
     * Get the column min width of the given the column index.
     * @param col - The column index
     * @returns The column min width
     */
    getMinColWidth(col) {
      const obj = this[_$2].colWidthsLimit[col];
      return (obj && obj.min) || undefined;
    }

    /**
     * Set the column min width of the given the column index.
     * @param col - The column index
     * @param minWidth - The column min width
     * @returns
     */
    setMinColWidth(col, minWidth) {
      const obj = this[_$2].colWidthsLimit[col] || (this[_$2].colWidthsLimit[col] = {});
      obj.min = minWidth;
    }

    /**
     * Get the column disable resize of the given the column index.
     * @param col - The column index
     * @returns The column disable resize
     */
    getColDisableResize(col) {
      const obj = this[_$2].colWidthsLimit[col];
      return (obj && obj.disableResize) || undefined;
    }

    /**
     * Set the column disable resize of the given the column index.
     * @param col - The column index
     * @param disableResize - The column disable resize
     * @returns
     */
    setColDisableResize(col, disableResize) {
      const obj = this[_$2].colWidthsLimit[col] || (this[_$2].colWidthsLimit[col] = {});
      obj.disableResize = disableResize;
    }

    /**
     * Get the rect of the cell.
     * @param col - index of column, of the cell
     * @param row - index of row, of the cell
     * @returns the rect of the cell.
     */
    getCellRect(col, row) {
      const isFrozenCell = this.isFrozenCell(col, row);
      let absoluteLeft = this._getColsWidth(0, col - 1);
      const width = _getColWidth.call(this, col);
      if (isFrozenCell && isFrozenCell.col) {
        absoluteLeft += this[_$2].scroll.left;
      }
      let absoluteTop = _getRowsHeight.call(this, 0, row - 1);
      const height = _getRowHeight.call(this, row);
      if (isFrozenCell && isFrozenCell.row) {
        absoluteTop += this[_$2].scroll.top;
      }
      return new Rect(absoluteLeft, absoluteTop, width, height);
    }

    /**
     * Get the relative rectangle of the cell.
     * @param col - index of column, of the cell
     * @param row - index of row, of the cell
     * @returns the rect of the cell.
     */
    getCellRelativeRect(col, row) {
      return this._toRelativeRect(this.getCellRect(col, row));
    }

    /**
     * Get the rectangle of the cells area.
     * @param startCol - index of the starting column, of the cell
     * @param startRow - index of the starting row, of the cell
     * @param endCol - index of the ending column, of the cell
     * @param endRow - index of the ending row, of the cell
     * @returns the rect of the cells.
     */
    getCellsRect(startCol, startRow, endCol, endRow) {
      const isFrozenStartCell = this.isFrozenCell(startCol, startRow);
      const isFrozenEndCell = this.isFrozenCell(endCol, endRow);
      let absoluteLeft = this._getColsWidth(0, startCol - 1);
      let width = this._getColsWidth(startCol, endCol);
      if (isFrozenStartCell && isFrozenStartCell.col) {
        const scrollLeft = this[_$2].scroll.left;
        absoluteLeft += scrollLeft;
        if (!isFrozenEndCell || !isFrozenEndCell.col) {
          width -= scrollLeft;
          width = Math.max(width, this._getColsWidth(startCol, this.frozenColCount - 1));
        }
      }
      let absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
      let height = _getRowsHeight.call(this, startRow, endRow);
      if (isFrozenStartCell && isFrozenStartCell.row) {
        const scrollTop = this[_$2].scroll.top;
        absoluteTop += scrollTop;
        if (!isFrozenEndCell || !isFrozenEndCell.row) {
          height -= scrollTop;
          height = Math.max(height, this._getColsWidth(startRow, this.frozenRowCount - 1));
        }
      }
      return new Rect(absoluteLeft, absoluteTop, width, height);
    }

    getCellRangeRect(range) {
      return this.getCellsRect(range.start.col, range.start.row, range.end.col, range.end.row);
    }

    isFrozenCell(col, row) {
      const { frozenRowCount, frozenColCount } = this[_$2];
      const isFrozenRow = frozenRowCount > 0 && row < frozenRowCount;
      const isFrozenCol = frozenColCount > 0 && col < frozenColCount;
      if (isFrozenRow || isFrozenCol) {
        return {
          col: isFrozenCol,
          row: isFrozenRow
        };
      } else {
        return null;
      }
    }

    getRowAt(absoluteY) {
      const frozen = _getTargetFrozenRowAt.call(this, absoluteY);
      if (frozen) {
        return frozen.row;
      }
      const row = _getTargetRowAt.call(this, absoluteY);
      return row ? row.row : -1;
    }

    getColAt(absoluteX) {
      const frozen = _getTargetFrozenColAt.call(this, absoluteX);
      if (frozen) {
        return frozen.col;
      }
      const col = _getTargetColAt.call(this, absoluteX);
      return col ? col.col : -1;
    }

    getCellAt(absoluteX, absoluteY) {
      return {
        col: this.getColAt(absoluteX),
        row: this.getRowAt(absoluteY)
      };
    }

    /**
     * Scroll to where cell is visible.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    makeVisibleCell(col, row) {
      const isFrozenCell = this.isFrozenCell(col, row);
      if (isFrozenCell && isFrozenCell.col && isFrozenCell.row) {
        return;
      }
      const rect = this.getCellRect(col, row);
      const visibleRect = _getScrollableVisibleRect.call(this);
      if (visibleRect.contains(rect)) {
        return;
      }
      const { scrollable } = this[_$2];
      if (!isFrozenCell || !isFrozenCell.col) {
        if (rect.left < visibleRect.left) {
          scrollable.scrollLeft -= visibleRect.left - rect.left;
        } else if (visibleRect.right < rect.right) {
          scrollable.scrollLeft -= visibleRect.right - rect.right;
        }
      }
      if (!isFrozenCell || !isFrozenCell.row) {
        if (rect.top < visibleRect.top) {
          scrollable.scrollTop -= visibleRect.top - rect.top;
        } else if (visibleRect.bottom < rect.bottom) {
          scrollable.scrollTop -= visibleRect.bottom - rect.bottom;
        }
      }
    }

    /**
     * Moves the focus cursor to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    setFocusCursor(col, row) {
      const focusControl = this[_$2].focusControl;
      const oldEditMode = focusControl.editMode;
      focusControl.setFocusRect(this.getFocusRectInternal(col, row));
      this._updatedSelection();
      if (oldEditMode && !focusControl.editMode) {
        focusControl.resetInputStatus();
      }
    }

    _updatedSelection() {
      const { focusControl } = this[_$2];
      const { col: selCol, row: selRow } = this[_$2].selection.select;
      const results = this.fireListeners(DG_EVENT_TYPE.EDITABLEINPUT_CELL, {
        col: selCol,
        row: selRow
      });
      const editMode = array.findIndex(results, (v) => !!v) >= 0;
      focusControl.editMode = editMode;
      if (editMode) {
        focusControl.storeInputStatus();
        focusControl.setDefaultInputStatus();
        this.fireListeners(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, {
          col: selCol,
          row: selRow,
          input: focusControl.input
        });
      }
    }

    /**
     * Focus the cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    focusCell(col, row) {
      const startCol = this.selection.range.start.col;
      const startRow = this.selection.range.start.row;
      const endCol = this.selection.range.end.col;
      const endRow = this.selection.range.end.row;
      this.setFocusCursor(col, row);
      // Failure occurs in IE if focus is not last
      this._forceFocusCell();
      // Invalidate Grid
      this.selection.select = {
        col,
        row
      };
      this.invalidateGridRect(startCol, startRow, endCol, endRow);
      this.invalidateCell(col, row);
    }

    /**
     * Redraws the range of the given cell.
     * @param col - The column index of cell.
     * @param row - The row index of cell.
     * @returns
     */
    invalidateCell(col, row) {
      this.invalidateGridRect(col, row);
    }

    /**
     * Redraws the range of the given cells.
     * @param startCol - index of the starting column, of the cell
     * @param startRow - index of the starting row, of the cell
     * @param endCol - index of the ending column, of the cell
     * @param endRow - index of the ending row, of the cell
     * @returns
     */
    invalidateGridRect(startCol, startRow, endCol = startCol, endRow = startRow) {
      const offset = this.getOffsetInvalidateCells();
      if (offset > 0) {
        startCol -= offset;
        startRow -= offset;
        endCol += offset;
        endRow += offset;
      }
      const visibleRect = this._getVisibleRect();
      const cellsRect = this.getCellsRect(startCol, startRow, endCol, endRow);
      const invalidateTarget = visibleRect.intersection(cellsRect);
      if (invalidateTarget) {
        const { frozenColCount, frozenRowCount } = this[_$2];
        if (frozenColCount > 0 && endCol >= frozenColCount) {
          const frozenRect = _getFrozenColsRect.call(this);
          if (frozenRect && frozenRect.intersection(invalidateTarget)) {
            invalidateTarget.left = Math.min(frozenRect.right - 1, frozenRect.left);
          }
        }
        if (frozenRowCount > 0 && endRow >= frozenRowCount) {
          const frozenRect = _getFrozenRowsRect.call(this);
          if (frozenRect && frozenRect.intersection(invalidateTarget)) {
            invalidateTarget.top = Math.min(frozenRect.bottom - 1, invalidateTarget.top);
          }
        }
        this._invalidateRect(invalidateTarget);
      }
    }

    invalidateCellRange(range) {
      this.invalidateGridRect(range.start.col, range.start.row, range.end.col, range.end.row);
    }

    /**
     * Redraws the whole grid.
     * @returns
     */
    invalidate() {
      const visibleRect = this._getVisibleRect();
      this._invalidateRect(visibleRect);
    }

    /**
     * Get the number of scrollable rows fully visible in the grid. visibleRowCount does not include the frozen rows counted by the frozenRowCount property. It does not include any partially visible rows on the bottom of the grid.
     * @returns
     */
    get visibleRowCount() {
      const { frozenRowCount } = this;
      const visibleRect = this._getVisibleRect();
      const visibleTop = frozenRowCount > 0
        ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
        : visibleRect.top;
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
     * @returns
     */
    get visibleColCount() {
      const { frozenColCount } = this;
      const visibleRect = this._getVisibleRect();
      const visibleLeft = frozenColCount > 0
        ? visibleRect.left + this._getColsWidth(0, frozenColCount - 1)
        : visibleRect.left;
      const initCol = _getTargetColAt.call(this, visibleLeft);
      if (!initCol) {
        return 0;
      }
      const startCol = Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
      let absoluteLeft = this._getColsWidth(0, startCol - 1);
      let count = 0;
      const { colCount } = this;
      for (let col = startCol; col < colCount; col++) {
        const width = _getColWidth.call(this, col);
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
     * @returns
     */
    get topRow() {
      const { frozenRowCount } = this;
      const visibleRect = this._getVisibleRect();
      const visibleTop = frozenRowCount > 0
        ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
        : visibleRect.top;
      const initRow = _getTargetRowAt.call(this, visibleTop);
      if (!initRow) {
        return 0;
      }
      return Math.max(initRow.top >= visibleTop ? initRow.row : initRow.row + 1, frozenRowCount);
    }

    /**
     * Get the index of the first column in the scrollable region that is visible.
     * @returns
     */
    get leftCol() {
      const { frozenColCount } = this;
      const visibleRect = this._getVisibleRect();
      const visibleLeft = frozenColCount > 0
        ? visibleRect.left + this._getColsWidth(0, frozenColCount - 1)
        : visibleRect.left;
      const initCol = _getTargetColAt.call(this, visibleLeft);
      if (!initCol) {
        return 0;
      }
      return Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
    }

    /**
     * gets or sets the number of pixels that an element's content is scrolled vertically
     */
    get scrollTop() {
      return this[_$2].scrollable.scrollTop;
    }

    set scrollTop(scrollTop) {
      this[_$2].scrollable.scrollTop = scrollTop;
    }

    /**
     * gets or sets the number of pixels that an element's content is scrolled from its left edge
     */
    get scrollLeft() {
      return this[_$2].scrollable.scrollLeft;
    }

    set scrollLeft(scrollLeft) {
      this[_$2].scrollable.scrollLeft = scrollLeft;
    }

    /**
     * Get the overflowed text in the cell rectangle, from the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns The text overflowing the cell rect.
     */
    getCellOverflowText(col, row) {
      let overflowText = this.getCellOverflowTextInternal({ col, row }) || null;
      if (!overflowText) {
        const key = `${ col }:${ row }`;
        overflowText = this[_$2].cellTextOverflows[key] || null;
      }
      return overflowText;
    }

    /**
     * Set the overflowed text in the cell rectangle, to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @param overflowText - The overflowed text in the cell rectangle.
     * @returns
     */
    setCellOverflowText(col, row, overflowText) {
      const key = `${ col }:${ row }`;
      if (overflowText) {
        this[_$2].cellTextOverflows[key] =
          typeof overflowText === 'string' ? overflowText.trim() : '';
      } else {
        delete this[_$2].cellTextOverflows[key];
      }
    }

    /**
     * Get the overflowed type in the cell rectangle, from the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns The type overflowing the cell rect.
     */
    getCellOverflowType(col, row) {
      let overflowType = this.getCellOverflowTypeInternal({ col, row }) || null;
      if (!overflowType) {
        const key = `${ col }:${ row }`;
        overflowType = this[_$2].cellTypeOverflows[key] || null;
      }
      return overflowType;
    }

    /**
     * Set the overflowed type in the cell rectangle, to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @param overflowType - The overflowed type in the cell rectangle.
     * @returns
     */
    setCellOverflowType(col, row, overflowType) {
      const key = `${ col }:${ row }`;
      if (overflowType) {
        this[_$2].cellTypeOverflows[key] =
          typeof overflowType === 'string' ? overflowType.trim() : '';
      } else {
        delete this[_$2].cellTypeOverflows[key];
      }
    }

    addDisposable(disposable) {
      if (!disposable ||
        !disposable.dispose ||
        typeof disposable.dispose !== 'function') {
        throw new Error('not disposable!');
      }
      const disposables = (this[_$2].disposables = this[_$2].disposables || []);
      disposables.push(disposable);
    }

    /**
     * Dispose the grid instance.
     * @returns
     */
    dispose() {
      super.dispose();
      const index = grids.indexOf(this);
      if (index >= 0) {
        grids.splice(index, 1);
      }
      const protectedSpace = this[_$2];
      protectedSpace.handler.dispose();
      protectedSpace.scrollable.dispose();
      protectedSpace.focusControl.dispose();
      protectedSpace.columnResizer.dispose();
      protectedSpace.selectionResizer.dispose();
      protectedSpace.cellSelector.dispose();
      if (protectedSpace.disposables) {
        protectedSpace.disposables.forEach((disposable) => disposable.dispose());
        protectedSpace.disposables = null;
      }
      const parentElement = protectedSpace.element.parentElement;
      if (parentElement) {
        parentElement.removeChild(protectedSpace.element);
      }
    }

    getAttachCellsArea(range) {
      return {
        element: this.getElement(),
        rect: this.getAttachCellsAreaInternal(range),
        padding: this.getAttachCellsPaddingInternal(range)
      };
    }

    onKeyDownMove(evt) {
      _onKeyDownMove.call(this, evt);
    }

    _getMouseAbstractPoint(evt) {
      let e;
      if (event.isTouchEvent(evt)) {
        e = evt.changedTouches[0];
      } else {
        e = evt;
      }
      const clientX = e.clientX || e.pageX + window.scrollX;
      const clientY = e.clientY || e.pageY + window.scrollY;
      const rect = this[_$2].canvas.getBoundingClientRect();
      if (rect.right <= clientX) {
        return null;
      }
      if (rect.bottom <= clientY) {
        return null;
      }
      const x = clientX - rect.left + this[_$2].scroll.left;
      const y = clientY - rect.top + this[_$2].scroll.top;
      return { x, y };
    }

    _getMouseRelativePoint(e) {
      const abstractPos = this._getMouseAbstractPoint(e);
      if (abstractPos) {
        return {
          x: abstractPos.x - this[_$2].scroll.left,
          y: abstractPos.y - this[_$2].scroll.top
        };
      } else {
        return null;
      }
    }

    _getColsWidth(startCol, endCol) {
      const defaultColPxWidth = _colWidthDefineToPxWidth.call(this, this.defaultColWidth);
      const colCount = endCol - startCol + 1;
      let w = defaultColPxWidth * colCount;
      this[_$2].colWidthsMap.each(startCol, endCol, (width, col) => {
        w +=
          _adjustColWidth.call(this, col, _colWidthDefineToPxWidth.call(this, width)) - defaultColPxWidth;
      });
      for (let col = startCol; col <= endCol; col++) {
        if (this[_$2].colWidthsMap.has(col)) {
          continue;
        }
        const adj = _adjustColWidth.call(this, col, defaultColPxWidth);
        if (adj !== defaultColPxWidth) {
          w += adj - defaultColPxWidth;
        }
      }
      return w;
    }

    _moveFocusCell(col, row, shiftKey, silence) {
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
      if (!silence) {
        this.makeVisibleCell(col, row);
      }
      this.setFocusCursor(col, row);
      this._forceFocusCell();
      const afterRange = extendRange(this.selection.range);
      const afterRect = this.getCellRangeRect(afterRange);
      if (afterRect.intersection(beforeRect)) {
        const invalidateRect = Rect.max(afterRect, beforeRect);
        this._invalidateRect(invalidateRect);
      } else {
        this._invalidateRect(beforeRect);
        this._invalidateRect(afterRect);
      }
    }

    _forceFocusCell() {
      this[_$2].focusControl.focus();
    }

    _resetColWidthOffset(col) {
      delete this[_$2].colWidthsOffset[col];
    }

    _adjustColWidth(col, orgWidth) {
      const offset = this[_$2].colWidthsOffset[col] || 0;
      const limits = _getColWidthLimits.call(this, col);
      return Math.max(_applyColWidthLimits(limits, orgWidth), 0) + offset;
    }

    _getVisibleRect() {
      const left = this[_$2].scroll.left;
      const top = this[_$2].scroll.top;
      const width = this[_$2].canvas.width;
      const height = this[_$2].canvas.height;
      return new Rect(left, top, width, height);
    }

    _invalidateRect(drawRect) {
      const ctx = this._getInitContext();
      if (ctx) {
        const visibleRect = this._getVisibleRect();
        const rowCount = this[_$2].rowCount;
        const initRow = _getTargetRowAt.call(this, Math.max(visibleRect.top, drawRect.top)) || {
          row: rowCount,
          top: _getRowsHeight.call(this, 0, rowCount - 1)
        };
        const initCol = _getTargetColAt.call(this, Math.max(visibleRect.left, drawRect.left)) || {
          col: this[_$2].colCount,
          left: this._getColsWidth(0, this[_$2].colCount - 1)
        };
        const drawBottom = Math.min(visibleRect.bottom, drawRect.bottom);
        const drawRight = Math.min(visibleRect.right, drawRect.right);
        const initFrozenRow = _getTargetFrozenRowAt.call(this, Math.max(visibleRect.top, drawRect.top));
        const initFrozenCol = _getTargetFrozenColAt.call(this, Math.max(visibleRect.left, drawRect.left));
        const drawLayers = new DrawLayers();
        const drawGridBorder = () => {
          const isContent = this.borderMode === 'content-border';
          const isGrid = this.borderMode === 'grid-border';
          if (isGrid || isContent) {
            let width = this[_$2].canvas.width;
            let height = this[_$2].canvas.height;
            if (isContent) {
              let w = this._getColsWidth(0, this[_$2].colCount - 1) - visibleRect.left;
              let h = _getRowsHeight.call(this, 0, rowCount - 1) - visibleRect.top;
              width = Math.min(this[_$2].canvas.width, w);
              height = Math.min(this[_$2].canvas.height, h);
            }
            ctx.save();
            try {
              ctx.beginPath();
              ctx.lineWidth = 2 // this.borderWidth || 0;
              ctx.strokeStyle = this.borderColor || 'transparent';
              ctx.rect(0 + ctx.lineWidth / 2, 0 + ctx.lineWidth / 2, width - ctx.lineWidth, height - ctx.lineWidth);
              ctx.stroke();
            } finally {
              ctx.restore();
            }
          }
        };
        const drawOuter = (row, absoluteTop) => {
          // 在数据范围之外绘制
          if (row >= rowCount - 1 &&
            this[_$2].canvas.height > absoluteTop - visibleRect.top) {
            const outerTop = absoluteTop - visibleRect.top;
            if (this.underlayBackgroundColor === 'transparent') {
              ctx.clearRect(0, outerTop, this[_$2].canvas.width, this[_$2].canvas.height - outerTop);
            } else {
              ctx.save();
              ctx.beginPath();
              ctx.fillStyle = this.underlayBackgroundColor || '#F6F6F6';
              ctx.rect(0, outerTop, this[_$2].canvas.width, this[_$2].canvas.height - outerTop);
              ctx.fill();
              ctx.restore();
            }
          }
        };
        let skipAbsoluteTop = 0;
        if (initFrozenRow) {
          let absoluteTop = initFrozenRow.top;
          const count = this[_$2].frozenRowCount;
          for (let row = initFrozenRow.row; row < count; row++) {
            const height = _getRowHeight.call(this, row);
            _drawRow.call(this, ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, 0, drawLayers);
            absoluteTop += height;
            if (drawBottom <= absoluteTop) {
              // 在绘制范围之外（结束）
              drawOuter(row, absoluteTop);
              drawGridBorder();
              drawLayers.draw(ctx);
              return;
            }
          }
          skipAbsoluteTop = absoluteTop;
        }
        let rowAbsoluteTop = initRow.top;
        for (let row = initRow.row; row < rowCount; row++) {
          const height = _getRowHeight.call(this, row);
          // 绘制行
          _drawRow.call(this, ctx, initFrozenCol, initCol, drawRight, row, rowAbsoluteTop, height, visibleRect, skipAbsoluteTop, drawLayers);
          rowAbsoluteTop += height;
          if (drawBottom <= rowAbsoluteTop) {
            // 在绘制范围之外（结束）
            drawOuter(row, rowAbsoluteTop);
            drawGridBorder();
            drawLayers.draw(ctx);
            return;
          }
        }
        drawOuter(rowCount - 1, rowAbsoluteTop);
        drawGridBorder();
        drawLayers.draw(ctx);
      }
    }

    _getInitContext() {
      const ctx = this[_$2].context;
      if (ctx) {
        // 初始化
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.lineWidth = 1;
        ctx.font = this.font || '16px sans-serif';
      }
      return ctx;
    }

    _toRelativeRect(absoluteRect) {
      const rect = absoluteRect.copy();
      const visibleRect = this._getVisibleRect();
      rect.offsetLeft(-visibleRect.left);
      rect.offsetTop(-visibleRect.top);
      return rect;
    }

    /**
     * Overwrites the definition of a column whose width is set to `auto` with the current auto width formula.
     * @param grid - grid instance
     * @returns
     */
    _storeAutoColWidthExprs() {
      let expr = null;
      for (let col = 0; col < this[_$2].colCount; col++) {
        const def = _getColWidthDefine.call(this, col);
        if (isAutoDefine(def)) {
          _setColWidth.call(this, col, expr || (expr = _calcAutoColWidthExpr.call(this, false)));
        }
      }
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
     * Get the value of cell with the copy action.
     * <p>
     * Please implement
     * </p>
     *
     * @param col - Column index of cell.
     * @param row - Row index of cell.
     * @returns the value of cell
     */
    getCopyCellValue(_col, _row, _range) {
      // Please implement get cell value!!
    }

    bindEventsInternal() {
      // nothing
    }

    getTargetRowAtInternal(_absoluteY) {
      // 忽略继承的设置继承和实现的计算
    }

    getRowsHeightInternal(_startRow, _endRow) {
      // 忽略继承的设置继承和实现的计算
    }

    getRowHeightInternal(_row) {
      // 忽略继承的设置继承和实现的计算
    }

    getScrollHeightInternal(_row) {
      // 忽略继承的设置继承和实现的计算
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

    getAttachCellsAreaInternal(range) {
      return this._toRelativeRect(this.getCellRangeRect(range));
    }

    getAttachCellsPaddingInternal(_range) {
      return [0, 3, 0, 3];
    }

    getFocusRectInternal(col, row) {
      return this.getCellRect(col, row);
    }

    getDefaultRowHeight() {
      return 40;
    }

    getDefaultColWidth() {
      return 80;
    }

    getHighlightBorderWidth() {
      return 2;
    }

    updateSelectionRange(range) {
      return range;
    }

    getCellOverflowTextInternal(_cell) {
      return '';
    }

    getCellOverflowTypeInternal(_cell) {
      return '';
    }

    getDefaultBorderMode() {
      return 'none';
    }

    fireListeners(type, ...event) {
      return super.fireListeners(type, ...event);
    }
  }

  /**
   * core modules
   */
  const core = { DrawGrid, EVENT_TYPE: DG_EVENT_TYPE };

  function _setFieldCache(fCache, index, field, value) {
    const recCache = fCache[index] || (fCache[index] = new Map());
    recCache.set(field, value);
  }

  /**
   * grid data source for caching Promise data
   */
  class CachedDataSource extends DataSource {
    constructor(opt) {
      super(opt);
      this._rCache = {};
      this._fCache = {};
    }

    static get EVENT_TYPE() {
      return DataSource.EVENT_TYPE;
    }

    static ofArray(array) {
      return new CachedDataSource({
        get: (index) => array[index],
        length: array.length,
        source: array
      });
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

    setOriginalField(index, field, value) {
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

    fieldPromiseCallBackInternal(index, field, value) {
      _setFieldCache(this._fCache, index, field, value);
    }

    recordPromiseCallBackInternal(index, record) {
      this._rCache[index] = record;
    }

    dispose() {
      super.dispose();
    }
  }

  class DataSourceIterator {
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
      if (isPromise(record)) {
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
    constructor(dc, original, filter) {
      this._cancel = false;
      this._owner = dc;
      this._dataSourceItr = new DataSourceIterator(original);
      this._filter = filter;
      this._filteredList = [];
      this._queues = [];
    }

    get filter() {
      return this._filter;
    }

    get(index) {
      if (this._cancel) {
        return undefined;
      }
      const filteredList = this._filteredList;
      if (index < filteredList.length) {
        return filteredList[index];
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
      const filteredList = this._filteredList;
      const filter = this._filter;
      const dataSourceItr = this._dataSourceItr;
      const queues = this._queues;
      while (dataSourceItr.hasNext()) {
        if (this._cancel) {
          return undefined;
        }
        const record = dataSourceItr.next();
        if (isPromise(record)) {
          dataSourceItr.movePrev();
          return (queues[index] = record.then((value) => {
            queues[index] = null;
            return this.get(index);
          }));
        }
        if (filter(record)) {
          filteredList.push(record);
          if (index < filteredList.length) {
            return filteredList[index];
          }
        }
        if (testTimeout()) {
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              resolve(undefined);
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
      dc.length = filteredList.length;
      return undefined;
    }
  }

  /**
   * grid data source for filter
   */
  class FilterDataSource extends DataSource {
    constructor(dataSource, filter) {
      super(dataSource);
      this._filterData = null;
      this._dataSource = dataSource;
      this.filter = filter;
      const handler = (this._handler = new EventHandler());
      handler.on(dataSource, FilterDataSource.EVENT_TYPE.UPDATED_ORDER, () => {
        // reset
        this.filter = this.filter;
      });
      for (const k in FilterDataSource.EVENT_TYPE) {
        if (FilterDataSource.EVENT_TYPE.hasOwnProperty(k)) {
          const type = FilterDataSource.EVENT_TYPE[k];
          handler.on(dataSource, type, (...args) => this.fireListeners(type, ...args));
        }
      }
    }

    static get EVENT_TYPE() {
      return DataSource.EVENT_TYPE;
    }

    get filter() {
      var _a;
      return ((_a = this._filterData) === null || _a === void 0 ? void 0 : _a.filter) || null;
    }

    set filter(filter) {
      if (this._filterData) {
        this._filterData.cancel();
      }
      this._filterData = filter
        ? new FilterData(this, this._dataSource, filter)
        : null;
      this.setLength(this._dataSource.length);
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

    refreshInternal() {
      this.filter = this.filter;
    }
  }

  var aggregateType;
  (function (aggregateType) {
    aggregateType[aggregateType['count'] = 0] = 'count';
    aggregateType[aggregateType['sum'] = 1] = 'sum';
    aggregateType[aggregateType['avg'] = 2] = 'avg';
    aggregateType[aggregateType['max'] = 3] = 'max';
    aggregateType[aggregateType['min'] = 4] = 'min';
  })(aggregateType || (aggregateType = {}));

  function _getPivotRecordKey(record, pivots, distinctKeys) {
    const keys = [];
    for (const i of pivots) {
      const field = i.field;
      const value = JSON.stringify(record[i.field]) || '';
      distinctKeys[field] = distinctKeys[field] || {};
      distinctKeys[field][value] = true;
      keys.push(value);
    }
    return keys.join('_');
  }

  /**
   * grid data source for pivot
   */
  class PivotDataSource extends DataSource {
    constructor(dataSource, options) {
      super(dataSource);
      this._records = [];
      this._keysMap = {};
      this._distinctMap = {};
      this._dataSource = dataSource;
      this._options = options;
      this.refresh();
    }

    static get EVENT_TYPE() {
      return DataSource.EVENT_TYPE;
    }

    get options() {
      return this._options;
    }

    getOriginal(index) {
      return this._records[index];
    }

    refresh() {
      this._keysMap = {};
      const distinctKeys = {};
      const rowPivots = this._options.rowPivots || [];
      const colPivots = this._options.colPivots || [];
      const begin = new Date();
      for (let i = 0; i < this._dataSource.length; i++) {
        const record = this._dataSource.get(i);
        const rowKey = _getPivotRecordKey(record, rowPivots, distinctKeys);
        const colKey = _getPivotRecordKey(record, colPivots, distinctKeys);
        this._keysMap[rowKey] = this._keysMap[rowKey] || {};
        this._keysMap[rowKey][colKey] = this._keysMap[rowKey][colKey] || [];
        this._keysMap[rowKey][colKey].push(record);
      }
      this._distinctMap = {};
      for (const field in distinctKeys) {
        if (distinctKeys.hasOwnProperty(field)) {
          this._distinctMap[field] = [];
          const keys = distinctKeys[field];
          for (const key in keys) {
            if (keys.hasOwnProperty(key)) {
              this._distinctMap[field].push(key);
            }
          }
        }
      }
      const end = new Date();
      const s = Number(end) - Number(begin);
      // TODO: data.ts PivotDataSource.ts
      window.console.log(s);
      this._records = []; // 显示记录列表
      this.length = this._records.length;
    }
  }

  /**
   * data modules
   */
  const data = {
    CachedDataSource,
    DataSource,
    FilterDataSource,
    PivotDataSource,
    TreeDataSource
  };

  class BaseAction {
    constructor(option = {}) {
      this._disabled = option.disabled || false;
    }

    get disabled() {
      return this._disabled;
    }

    set disabled(disabled) {
      if (this._disabled !== disabled) {
        this._disabled = disabled;
        this.onChangeDisabledInternal();
      }
    }

    clone() {
      return new BaseAction(this);
    }

    bindGridEvent(_grid, _cellId) {
      return [];
    }

    onChangeDisabledInternal() {
      // nothing
    }
  }

  function bindCellClickAction(grid, cellId, { action, mouseOver, mouseOut }) {
    function isTarget(col, row) {
      return grid.getLayoutCellId(col, row) === cellId;
    }

    let inMouse;
    return [
      // click
      grid.listen(DG_EVENT_TYPE.CLICK_CELL, (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        action({
          col: e.col,
          row: e.row
        });
      }),
      // mouse move
      grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
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
      // 当MOUSEENTER从侧面看，因为它与'col-resize'的处理冲突，移动被监视和处理
      grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        if (inMouse && !grid.getElement().style.cursor) {
          grid.getElement().style.cursor = 'pointer';
        }
      }),
      grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
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
    acceptKeys = [...acceptKeys, KEY_ENTER, KEY_SPACE];

    function isTarget(col, row) {
      return grid.getLayoutCellId(col, row) === cellId;
    }

    return [
      // enter key down
      grid.listen(DG_EVENT_TYPE.KEYDOWN, (e) => {
        var _a;
        if (acceptKeys.indexOf(e.keyCode) === -1) {
          return;
        }
        if (((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) && e.keyCode === KEY_ENTER) {
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
        event.cancel(e.event);
      })
    ];
  }

  const isHeaderDisabledCell = (option, grid, cell) => {
    if (typeof option === 'function') {
      return !!option(grid, cell);
    }
    return !!option;
  };

  class BaseCheckAction extends BaseAction {
    bindGridEvent(grid, cellId) {
      const state = this.getState(grid);
      const action = ({ col, row }) => {
        const range = grid.getCellRange(col, row);
        const cellKey = `${ range.start.col }:${ range.start.row }`;
        if (isHeaderDisabledCell(this.disabled, grid, {
            col: range.start.col,
            row: range.start.row
          }) ||
          state.block[cellKey]) {
          return;
        }
        const checked = grid.getHeaderValue(range.start.col, range.start.row);
        grid.setHeaderValue(range.start.col, range.start.row, !checked);
        const onChange = () => {
          // checkbox animation
          animate(200, (point) => {
            if (point === 1) {
              delete state.elapsed[cellKey];
            } else {
              state.elapsed[cellKey] = point;
            }
            grid.invalidateCellRange(range);
          });
        };
        onChange();
      };
      return [
        ...bindCellClickAction(grid, cellId, {
          action,
          mouseOver: (e) => {
            const range = grid.getCellRange(e.col, e.row);
            if (isHeaderDisabledCell(this.disabled, grid, {
              col: range.start.col,
              row: range.start.row
            })) {
              return false;
            }
            state.mouseActiveCell = {
              col: e.col,
              row: e.row
            };
            grid.invalidateCellRange(range);
            return true;
          },
          mouseOut: (e) => {
            delete state.mouseActiveCell;
            const range = grid.getCellRange(e.col, e.row);
            grid.invalidateCellRange(range);
          }
        }),
        ...bindCellKeyAction(grid, cellId, {
          action,
          acceptKeys: [KEY_ENTER, KEY_SPACE]
        })
      ];
    }
  }

  const CHECK_HEADER_STATE_ID$1 = getCheckHeaderStateId();

  class CheckHeaderAction extends BaseCheckAction {
    clone() {
      return new CheckHeaderAction(this);
    }

    getState(grid) {
      let state = grid[CHECK_HEADER_STATE_ID$1];
      if (!state) {
        state = { elapsed: {}, block: {} };
        obj.setReadonly(grid, CHECK_HEADER_STATE_ID$1, state);
      }
      return state;
    }
  }

  const SWITCH_HEADER_STATE_ID$1 = getSwitchHeaderStateId();

  class SwitchHeaderAction extends BaseCheckAction {
    clone() {
      return new SwitchHeaderAction(this);
    }

    getState(grid) {
      let state = grid[SWITCH_HEADER_STATE_ID$1];
      if (!state) {
        state = { elapsed: {}, block: {} };
        obj.setReadonly(grid, SWITCH_HEADER_STATE_ID$1, state);
      }
      return state;
    }
  }

  class SortHeaderAction extends BaseAction {
    constructor(option = {}) {
      var _a;
      super(option);
      this._sort = (_a = option.sort) !== null && _a !== void 0 ? _a : true;
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
      } else {
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
        if (isHeaderDisabledCell(this.disabled, grid, cell)) {
          return;
        }
        const state = grid.sortState;
        let newState;
        const range = grid.getCellRange(cell.col, cell.row);
        if (isTarget(state.col, cell.row)) {
          newState = {
            col: range.start.col,
            order: state.order === 'asc' ? 'desc' : 'asc',
            row: range.start.row
          };
        } else {
          newState = {
            col: range.start.col,
            order: 'asc',
            row: range.start.row
          };
        }
        grid.sortState = newState;
        this._executeSort(newState, grid);
        grid.invalidateGridRect(0, 0, grid.colCount - 1, grid.rowCount - 1);
      };
      return [
        ...bindCellClickAction(grid, cellId, {
          action,
          mouseOver: (e) => {
            if (isHeaderDisabledCell(this.disabled, grid, e)) {
              return false;
            }
            return true;
          }
        })
      ];
    }
  }

  class ImmutableCheckHeaderAction extends CheckHeaderAction {
    get disabled() {
      return this._disabled;
    }
  }

  class ImmutableSortHeaderAction extends SortHeaderAction {
    get disabled() {
      return this._disabled;
    }
  }

  class ImmutableSwitchHeaderAction extends SwitchHeaderAction {
    get disabled() {
      return this._disabled;
    }
  }

  const ACTIONS = {
    SORT: new ImmutableSortHeaderAction(),
    CHECK: new ImmutableCheckHeaderAction(),
    SWITCH: new ImmutableSwitchHeaderAction()
  };

  function of$4(headerAction) {
    if (!headerAction) {
      return undefined;
    } else if (typeof headerAction === 'string') {
      const key = headerAction.toUpperCase();
      return ACTIONS[key] || of$4(null);
    } else {
      return headerAction;
    }
  }

  function ofCell$1(headerCell) {
    if (headerCell.sort) {
      if (typeof headerCell.sort === 'function') {
        const sortMethod = headerCell.sort;
        // 0.9.0 Backward compatibility
        const sort = ({ order, col, grid }) => sortMethod.call(headerCell, order, col, grid);
        return new ImmutableSortHeaderAction({ sort });
      }
      return ACTIONS.SORT;
    }
    return of$4(headerCell.headerAction);
  }

  const HEADER_BASE_STYLE_EVENT_TYPE = {
    CHANGE_STYLE: 'change_style'
  };
  let defaultHeaderBaseStyle;

  class BaseStyle extends EventTarget {
    constructor({ bgColor } = {}) {
      super();
      this._bgColor = bgColor;
    }

    static get EVENT_TYPE() {
      return HEADER_BASE_STYLE_EVENT_TYPE;
    }

    static get DEFAULT() {
      return defaultHeaderBaseStyle
        ? defaultHeaderBaseStyle
        : (defaultHeaderBaseStyle = new BaseStyle());
    }

    get bgColor() {
      return this._bgColor;
    }

    set bgColor(bgColor) {
      this._bgColor = bgColor;
      this.doChangeStyle();
    }

    doChangeStyle() {
      this.fireListeners(HEADER_BASE_STYLE_EVENT_TYPE.CHANGE_STYLE);
    }

    clone() {
      return new BaseStyle(this);
    }
  }

  let defaultHeaderBaseStdStyle;

  class BaseStdStyle extends BaseStyle {
    constructor(style = {}) {
      super(style);
      this._textAlign = style.textAlign || 'left';
      this._textBaseline = style.textBaseline || 'middle';
    }

    static get DEFAULT() {
      return defaultHeaderBaseStdStyle
        ? defaultHeaderBaseStdStyle
        : (defaultHeaderBaseStdStyle = new BaseStdStyle());
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
      return new BaseStdStyle(this);
    }
  }

  let defaultHeaderStyle;

  class Style extends BaseStdStyle {
    constructor(style = {}) {
      super(style);
      this._color = style.color;
      this._font = style.font;
      this._padding = style.padding;
      this._textOverflow = style.textOverflow || 'ellipsis';
      this._lineHeight = style.lineHeight || '1em';
      this._autoWrapText = style.autoWrapText || false;
      this._lineClamp = style.lineClamp || 'auto';
    }

    static get DEFAULT() {
      return defaultHeaderStyle
        ? defaultHeaderStyle
        : (defaultHeaderStyle = new Style());
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

    clone() {
      return new Style(this);
    }
  }

  let defaultHeaderBaseCheckStyle;

  class BaseCheckStyle extends Style {
    constructor(style = {}) {
      super(defaults(style, { textAlign: 'center' }));
      this._uncheckBgColor = style.uncheckBgColor;
      this._checkBgColor = style.checkBgColor;
      this._borderColor = style.borderColor;
    }

    static get DEFAULT() {
      return defaultHeaderBaseCheckStyle
        ? defaultHeaderBaseCheckStyle
        : (defaultHeaderBaseCheckStyle = new BaseCheckStyle());
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
      return new BaseCheckStyle(this);
    }
  }

  let defaultCheckHeaderStyle;

  class CheckHeaderStyle extends BaseCheckStyle {
    static get DEFAULT() {
      return defaultCheckHeaderStyle
        ? defaultCheckHeaderStyle
        : (defaultCheckHeaderStyle = new CheckHeaderStyle());
    }

    constructor(style = {}) {
      super(style);
    }

    clone() {
      return new CheckHeaderStyle(this);
    }
  }

  let defaultSortHeaderStyle;

  class SortHeaderStyle extends Style {
    constructor(style = {}) {
      super(style);
      this._sortArrowColor = style.sortArrowColor;
    }

    static get DEFAULT() {
      return defaultSortHeaderStyle
        ? defaultSortHeaderStyle
        : (defaultSortHeaderStyle = new SortHeaderStyle());
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

  let defaultSwitchHeaderStyle;

  class SwitchHeaderStyle extends BaseCheckStyle {
    static get DEFAULT() {
      return defaultSwitchHeaderStyle
        ? defaultSwitchHeaderStyle
        : (defaultSwitchHeaderStyle = new SwitchHeaderStyle());
    }

    constructor(style = {}) {
      super(style);
    }

    clone() {
      return new SwitchHeaderStyle(this);
    }
  }

  let defaultMultilineTextStyle;

  class MultilineTextHeaderStyle extends Style {
    static get DEFAULT() {
      return defaultMultilineTextStyle
        ? defaultMultilineTextStyle
        : (defaultMultilineTextStyle = new MultilineTextHeaderStyle());
    }

    constructor(style = {}) {
      super(style);
    }

    clone() {
      return new MultilineTextHeaderStyle(this);
    }
  }

  function of$3(headerStyle, headerValues, StyleClass) {
    if (headerStyle) {
      if (headerStyle instanceof BaseStyle) {
        return headerStyle;
      } else if (typeof headerStyle === 'function') {
        return of$3(headerStyle(headerValues), headerValues, StyleClass);
      } else if (typeof headerStyle === 'string') {
        if (headerValues && headerStyle in headerValues) {
          return of$3(headerValues[headerStyle], headerValues, StyleClass);
        } else {
          return new StyleClass({});
        }
      } else {
        return new StyleClass(headerStyle);
      }
    } else {
      return StyleClass.DEFAULT;
    }
  }

  class BaseHeader {
    constructor(options = {}) {
      this.onDrawCell = this.onDrawCell.bind(this); // 修复范围
      this._draw = options.draw;
    }

    get StyleClass() {
      return BaseStyle;
    }

    get draw() {
      return this._draw;
    }

    onDrawCell(cellValue, info, context, grid) {
      const { style, drawCellBase, drawCellBorder } = info;
      const helper = grid.getGridCanvasHelper();
      drawCellBase();
      // 文字
      this.drawInternal(this.convertInternal(cellValue), context, of$3(style, grid.headerValues, this.StyleClass), helper, grid, info);
      drawCellBorder();
    }

    convertInternal(value) {
      if (typeof value === 'function') {
        value = value();
      }
      return isDef(value) ? `${ value }` : '';
    }

    bindGridEvent(_grid, _cellId) {
      return [];
    }
  }

  let headerTooltip;
  const activeHeaderTooltip = {};
  style$2.inject('headerTooltipElement', `
.kaka-grid-header-icon-tooltip {
  min-width: 16px;
  min-height: 16px;
  border: 1px solid #d9d9d9;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  box-shadow: 0px 0px 8px #ccc;
  border-radius: 3px;
  font: 12px sans-serif;
  color: #666;
  padding: 8px;
  white-space: nowrap;
}
.kaka-grid-header-icon-tooltip::before{
  content: '';
  width: 0;
  height: 0;
  border: 8px solid;
  position: absolute;
  top: -16px;
  left: 50%;
  border-color: transparent transparent #d9d9d9 transparent;
  margin-left: -8px;
}
.kaka-grid-header-icon-tooltip::after{
  content: '';
  width: 0;
  height: 0;
  border: 8px solid;
  position: absolute;
  top: -14.5px;
  left: 50%;
  border-color: transparent transparent #fff transparent;
  margin-left: -8px;
}`);

  function getElementOffset(curEle) {
    const x = curEle.getBoundingClientRect().left + document.documentElement.scrollLeft;
    const y = curEle.getBoundingClientRect().top + document.documentElement.scrollTop;
    return {
      x,
      y
    };
  }

  function showHeaderTooltip(grid, point, tooltip) {
    if (!headerTooltip) {
      headerTooltip = createElement('div', {
        classList: ['kaka-grid-header-icon-tooltip']
      });
      document.body.appendChild(headerTooltip);
    }
    const p = getElementOffset(grid.getElement());
    headerTooltip.innerHTML = tooltip
      .replace(/\r?\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, '<br/>');
    headerTooltip.style.display = 'block';
    headerTooltip.style.top = p.y + point.y + 'px';
    headerTooltip.style.left = p.x + point.x + 'px';
    headerTooltip.style.marginLeft = '-' + headerTooltip.clientWidth / 2 + 'px';
  }

  function hideHeaderTooltip() {
    if (headerTooltip) {
      headerTooltip.style.display = 'none';
    }
  }

  var headerUtils = {
    loadIcons(icon, context, helper, callback) {
      if (icon) {
        const iconList = icons$2.toNormalizeArray(icon);
        iconList.forEach((i) => {
          helper.testFontLoad(i.font, i.content, context);
        });
        icon = iconList;
      }
      callback(icon, context);
    },
    getIconTooltipPadding(context, helper, style) {
      const font = style.font;
      const padding = style.padding;
      const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
      const textPadding = basePadding.slice(0);
      textPadding[1] += 26; // 文字距离有边框位置，右侧图标
      return textPadding;
    },
    drawIconTooltipButton(grid, context, stateId, helper, style, tooltip) {
      const textBaseline = style.textBaseline;
      const font = style.font;
      const padding = style.padding;
      const color = style.color;
      let active = false;
      const state = grid[stateId];
      if (state) {
        let rect = context.getRect();
        const btnWidth = 16;
        rect = new Rect(rect.left + rect.width - 26 - 1, rect.top + (rect.height - btnWidth) / 2, btnWidth, btnWidth);
        if (state.mouseActiveCell &&
          cellInRange(context.range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
          if (state.mouseRelativePos) {
            active =
              rect.left <= state.mouseRelativePos.x &&
              rect.right >= state.mouseRelativePos.x &&
              rect.top <= state.mouseRelativePos.y &&
              rect.bottom >= state.mouseRelativePos.y;
          }
          if (state.mouseActive !== active) {
            state.mouseActive = active;
            if (active) {
              showHeaderTooltip(grid, {
                x: rect.left + rect.width / 2,
                y: rect.bottom + 16
              }, tooltip);
            }
          }
        }
      }
      if (active) {
        activeHeaderTooltip[context.col + '|' + context.row] = true;
      } else {
        delete activeHeaderTooltip[context.col + '|' + context.row];
      }
      if (!active) {
        let l = 0;
        for (const key in activeHeaderTooltip) {
          if (activeHeaderTooltip[key])
            l++;
        }
        if (l === 0) {
          hideHeaderTooltip();
        }
      }
      const icon = {
        color: active ? '#008CD6' : color,
        path: 'M8,3.8c0.7,0,1.5,0.3,2,0.7c0.6,0.5,0.9,1.1,0.9,1.8c0,1-0.7,2-1.7,2.4C8.8,8.9,8.6,9.2,8.6,9.5v0.4c0,0.1-0.1,0.1-0.1,0.1H7.6c-0.1,0-0.1-0.1-0.1-0.1V9.5c0-0.4,0.1-0.8,0.4-1.2C8,8.1,8.3,7.8,8.7,7.7c0.6-0.2,1-0.7,1-1.3c0-0.8-0.8-1.4-1.7-1.4S6.3,5.6,6.3,6.4v0.1c0,0.1-0.1,0.1-0.1,0.1H5.3c-0.1,0-0.1-0.1-0.1-0.1V6.4C5.1,5.7,5.4,5,6,4.5C6.5,4,7.2,3.8,8,3.8L8,3.8zM8,11.2c0.4,0,0.7,0.3,0.7,0.7S8.4,12.6,8,12.6s-0.7-0.3-0.7-0.7S7.6,11.2,8,11.2z M8,1.4c-3.7,0-6.6,3-6.6,6.6s3,6.6,6.6,6.6s6.6-3,6.6-6.6S11.7,1.4,8,1.4z M8,0c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S3.6,0,8,0z',
        width: 16
      };
      const basePadding = helper.toBoxPixelArray(padding || 0, context, font);
      const iconPadding = basePadding.slice(0);
      iconPadding[1] += 8; // 图标距离右边框位置
      const cellOverflowText = grid.getCellOverflowText(context.col, context.row) || '';
      helper.text('', context, {
        color,
        font,
        icons: [icon],
        padding: iconPadding,
        textAlign: 'right',
        textBaseline
      });
      grid.setCellOverflowText(context.col, context.row, cellOverflowText);
    },
    customDraw(helper, draw, value, context, grid) {
      let b = false;
      if (draw) {
        const rect = context.getRect();
        const row = context.row;
        const col = context.col;
        const selection = context.getSelection();
        const opt = {
          grid,
          rect,
          row,
          col,
          selection
        };
        helper.drawWithClip(context, (ctx) => {
          b = draw(value, ctx, opt) === false;
        });
      }
      return b;
    }
  };

  class BaseCheckHeader extends BaseHeader {
    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
      const { textAlign, textBaseline, borderColor, checkBgColor, uncheckBgColor, bgColor, color, font, textOverflow } = style;
      if (bgColor) {
        drawCellBase({
          bgColor
        });
      }
      const { col, row } = context;
      const range = grid.getCellRange(col, row);
      const cellKey = `${ range.start.col }:${ range.start.row }`;
      const state = this.getState(grid);
      const elapsed = state === null || state === void 0 ? void 0 : state.elapsed[cellKey];
      const checked = grid.getHeaderValue(range.start.col, range.start.row);
      const isCustomDraw = headerUtils.customDraw(helper, this.draw, !!checked, context, grid);
      if (!isCustomDraw) {
        const opt = {
          textAlign,
          textBaseline,
          borderColor,
          checkBgColor,
          uncheckBgColor
        };
        if (isDef(elapsed)) {
          opt.animElapsedTime = elapsed;
        }
        const inlineCheck = this.getInlineCheck(helper, !!checked, context, opt);
        helper.text([inlineCheck, value], context, {
          color,
          font,
          textAlign,
          textBaseline,
          textOverflow
        });
      }
    }
  }

  const CHECK_HEADER_STATE_ID = getCheckHeaderStateId();

  class CheckHeader extends BaseCheckHeader {
    get StyleClass() {
      return CheckHeaderStyle;
    }

    clone() {
      return new CheckHeader(this);
    }

    getState(grid) {
      let state = grid[CHECK_HEADER_STATE_ID];
      if (!state) {
        state = { elapsed: {}, block: {} };
        obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
      }
      return state;
    }

    getInlineCheck(helper, checked, context, opt) {
      return helper.buildCheckBoxInline(checked, context, opt);
    }
  }

  const HEADER_ICON_TOOLTIP_STATE_ID = getHeaderIconTooltipStateId();

  class Header extends BaseHeader {
    get StyleClass() {
      return Style;
    }

    drawInternal(value, context, style, helper, grid, { drawCellBase, getHeaderIcon, getHeaderIconTooltip }) {
      const { textAlign, textBaseline, color, font, bgColor, textOverflow, padding, lineHeight, autoWrapText, lineClamp } = style;
      if (bgColor) {
        drawCellBase({
          bgColor
        });
      }
      const iconTooltip = getHeaderIconTooltip();
      const v = isDef(value) ? value + '' : '';
      const multiLines = v
        .replace(/\r?\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n');
      helper.testFontLoad(font, value, context);
      headerUtils.loadIcons(getHeaderIcon(), context, helper, (icons, ctx) => {
        const isCustomDraw = headerUtils.customDraw(helper, this.draw, value, context, grid);
        if (!isCustomDraw) {
          const newPadding = iconTooltip
            ? headerUtils.getIconTooltipPadding(context, helper, style)
            : padding;
          if (multiLines.length > 1) {
            helper.multilineText(multiLines, ctx, {
              color,
              font,
              icons,
              textAlign,
              textBaseline,
              textOverflow,
              padding: newPadding,
              lineHeight,
              autoWrapText,
              lineClamp
            });
          } else {
            helper.text(value, ctx, {
              color,
              font,
              icons,
              padding: newPadding,
              textAlign,
              textBaseline,
              textOverflow
            });
          }
        }
        if (iconTooltip) {
          headerUtils.drawIconTooltipButton(grid, context, HEADER_ICON_TOOLTIP_STATE_ID, helper, style, iconTooltip);
        }
      });
    }

    bindGridEvent(grid, cellId) {
      if (!grid[HEADER_ICON_TOOLTIP_STATE_ID]) {
        obj.setReadonly(grid, HEADER_ICON_TOOLTIP_STATE_ID, {});
      }
      const state = grid[HEADER_ICON_TOOLTIP_STATE_ID];

      function isTarget(col, row) {
        return grid.getLayoutCellId(col, row) === cellId;
      }

      const doMouseMove = (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        state.mouseRelativePos = grid._getMouseRelativePoint(e.event);
        state.mouseActiveCell = {
          col: e.col,
          row: e.row
        };
        const range = grid.getCellRange(e.col, e.row);
        grid.invalidateCellRange(range);
        // grid.getElement().style.cursor = state.mouseActive ? 'pointer' : ''
      };
      const doMouseLeave = (e) => {
        if (!isTarget(e.col, e.row)) {
          return;
        }
        const range = grid.getCellRange(e.col, e.row);
        grid.invalidateCellRange(range);
        delete state.mouseRelativePos;
        delete state.mouseActiveCell;
        delete state.mouseActive;
        // grid.getElement().style.cursor = ''
      };
      return [
        // mouse move
        grid.listen(DG_EVENT_TYPE.MOUSEENTER_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, doMouseMove),
        grid.listen(DG_EVENT_TYPE.MOUSELEAVE_CELL, doMouseLeave),
        grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, doMouseLeave)
      ];
    }
  }

  class SortHeader extends BaseHeader {
    get StyleClass() {
      return SortHeaderStyle;
    }

    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
      const textAlign = style.textAlign;
      const textBaseline = style.textBaseline || 'middle';
      const color = style.color;
      const bgColor = style.bgColor;
      const padding = style.padding;
      const lineHeight = style.lineHeight;
      const autoWrapText = style.autoWrapText;
      const lineClamp = style.lineClamp;
      const font = style.font;
      const textOverflow = style.textOverflow;
      const sortArrowColor = style.sortArrowColor;
      if (bgColor) {
        drawCellBase({
          bgColor
        });
      }
      const state = grid.sortState;
      let order = undefined;
      const col = context.col;
      const row = context.row;
      const range = grid.getCellRange(col, row);
      if (cellInRange(range, state.col, state.row)) {
        ({ order } = state);
      }
      const ctx = context.getContext();
      const arrowSize = getFontSize(ctx, font).width * 1.2;
      const v = isDef(value) ? value + '' : '';
      const multiLines = v
        .replace(/\r?\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n');
      const icons = [
        {
          color: helper.getColor(sortArrowColor || helper.theme.header.sortArrowColor, col, row, ctx) || 'rgba(0, 0, 0, 0.38)',
          name: isDef(order)
            ? order === 'asc'
              ? 'arrowDownward'
              : 'arrowUpward'
            : undefined,
          width: arrowSize
        }
      ];
      const isCustomDraw = headerUtils.customDraw(helper, this.draw, multiLines, context, grid);
      if (!isCustomDraw) {
        if (multiLines.length > 1) {
          helper.multilineText(multiLines, context, {
            autoWrapText,
            color,
            font,
            icons,
            lineClamp,
            lineHeight,
            padding,
            textAlign,
            textBaseline,
            textOverflow
          });
        } else {
          helper.text(multiLines, context, {
            color,
            font,
            icons,
            padding,
            textAlign,
            textBaseline,
            textOverflow
          });
        }
      }
    }
  }

  const SWITCH_HEADER_STATE_ID = getSwitchHeaderStateId();

  class SwitchHeader extends BaseCheckHeader {
    constructor(options = {}) {
      super(options);
      this._textOn = options.textOn;
      this._textOff = options.textOff;
    }

    get textOn() {
      return this._textOn;
    }

    set textOn(value) {
      this._textOn = value;
    }

    get textOff() {
      return this._textOff;
    }

    set textOff(value) {
      this._textOff = value;
    }

    get StyleClass() {
      return SwitchHeaderStyle;
    }

    clone() {
      return new SwitchHeader(this);
    }

    getState(grid) {
      let state = grid[SWITCH_HEADER_STATE_ID];
      if (!state) {
        state = { elapsed: {}, block: {} };
        obj.setReadonly(grid, SWITCH_HEADER_STATE_ID, state);
      }
      return state;
    }

    getInlineCheck(helper, checked, context, opt) {
      const options = Object.assign(Object.assign({}, opt), { textOn: this.textOn, textOff: this.textOff });
      return helper.buildSwitchBtnInline(checked, context, options);
    }
  }

  class MultilineTextHeader extends BaseHeader {
    get StyleClass() {
      return MultilineTextHeaderStyle;
    }

    clone() {
      return new MultilineTextHeader(this);
    }

    drawInternal(value, context, style, helper, grid, { drawCellBase }) {
      const { textAlign, textBaseline, color, font, bgColor, lineHeight, autoWrapText, lineClamp, textOverflow } = style;
      if (bgColor) {
        drawCellBase({
          bgColor
        });
      }
      const multiLines = value
        .replace(/\r?\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n');
      helper.testFontLoad(font, value, context);
      const isCustomDraw = headerUtils.customDraw(helper, this.draw, multiLines, context, grid);
      if (!isCustomDraw) {
        helper.multilineText(multiLines, context, {
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
  }

  const TYPES = {
    DEFAULT: new Header(),
    SORT: new SortHeader(),
    CHECK: new CheckHeader(),
    SWITCH: new SwitchHeader(),
    MULTILINETEXT: new MultilineTextHeader()
  };

  function of$2(headerType) {
    if (!headerType) {
      return TYPES.DEFAULT;
    } else if (typeof headerType === 'string') {
      const key = headerType.toUpperCase();
      return TYPES[key] || of$2(null);
    } else {
      return headerType;
    }
  }

  function ofCell(headerCell) {
    if (headerCell.sort) {
      return TYPES.SORT;
    }
    return of$2(headerCell.headerType);
  }

  const action = {
    ACTIONS: ACTIONS,
    BaseAction,
    BaseCheckAction,
    SortHeaderAction,
    CheckHeaderAction,
    SwitchHeaderAction,
    of: of$4,
    ofCell: ofCell$1
  };
  const style = {
    BaseStyle,
    BaseStdStyle,
    BaseCheckStyle,
    Style,
    SortHeaderStyle,
    CheckHeaderStyle,
    SwitchHeaderStyle,
    MultilineTextHeaderStyle,
    of: of$3
  };
  const type = {
    TYPES,
    BaseHeader,
    BaseCheckHeader,
    Header,
    SortHeader,
    CheckHeader,
    SwitchHeader,
    MultilineTextHeader,
    of: of$2,
    ofCell: ofCell
  };
  /**
   * headers
   */
  const headers = { action, style, type };

  const themes$1 = {};

  function DEFAULT_BG_COLOR(args) {
    const { row, grid } = args;
    if (row < grid.frozenRowCount) {
      return '#FFF';
    }
    const index = grid.getRecordIndexByRow(row);
    if (!(index & 1)) {
      return '#FFF';
    } else {
      return '#F6F6F6';
    }
  }

  const cacheLinearGradient = {};

  function getLinearGradient(context, left, top, right, bottom, colorStops) {
    const stopsKey = [];
    for (const stop in colorStops) {
      if (colorStops.hasOwnProperty(stop)) {
        stopsKey.push(`${ stop }@${ colorStops[stop] }`);
      }
    }
    const key = `${ left }/${ top }/${ right }/${ bottom }/${ stopsKey.join(',') }`;
    const ret = cacheLinearGradient[key];
    if (ret) {
      return ret;
    }
    const grad = context.createLinearGradient(left, top, left, bottom);
    for (const stop in colorStops) {
      if (colorStops.hasOwnProperty(stop)) {
        grad.addColorStop(Number(stop), colorStops[stop]);
      }
    }
    return (cacheLinearGradient[key] = grad);
  }

  function FROZEN_ROWS_BG_COLOR(args) {
    const col = args.col;
    const grid = args.grid;
    const frozenRowCount = args.grid.frozenRowCount;
    const context = args.context;
    const rect = grid.getCellRelativeRect(col, 0);
    const left = rect.left;
    const top = rect.top;
    const bottom = grid.getCellRelativeRect(col, frozenRowCount - 1).bottom;
    return getLinearGradient(context, left, top, left, bottom, {
      0: '#FFF',
      1: '#D3D3D3'
    });
  }

  /**
   * basic theme
   * @name BASIC
   * @type {Object}
   * @memberof kakaGrid.themes.choices
   */
  var basicTheme = {
    borderColor: '#000',
    button: {
      bgColor: '#2196F3',
      color: '#FFF'
    },
    checkbox: {
      borderColor: '#000',
      checkBgColor: 'rgb(76, 73, 72)',
      uncheckBgColor: '#FFF'
    },
    radioButton: {
      checkColor: 'rgb(76, 73, 72)',
      checkBorderColor: '#000',
      uncheckBorderColor: '#000',
      uncheckBgColor: '#FFF',
      checkBgColor: '#FFF'
    },
    color: '#000',
    defaultBgColor: DEFAULT_BG_COLOR,
    frozenRowsBgColor: FROZEN_ROWS_BG_COLOR,
    // frozenRowsBorderColor: "#000",
    // frozenRowsColor: "#000",
    header: {
      sortArrowColor: 'rgba(0, 0, 0, 0.38)'
    },
    highlightBorderColor: '#5E9ED6',
    selectionBgColor: '#CCE0FF',
    selectionDragBgColor: '#EAF2FF',
    switch: {
      borderColor: '#000',
      checkBgColor: '#008CD6',
      uncheckBgColor: '#FFF'
    },
    tree: {
      lineColor: 'rgb(76, 73, 72)',
      buttonColor: 'rgb(76, 73, 72)',
      buttonBgColor: 'transparent',
      buttonBorderColor: 'rgb(76, 73, 72)',
      linkColor: 'rgb(76, 73, 72)'
    },
    underlayBackgroundColor: '#F6F6F6'
  };

  function FROZEN_ROWS_BORDER_COLOR(args) {
    const row = args.row;
    const frozenRowCount = args.grid.frozenRowCount;
    if (frozenRowCount - 1 === row) {
      return ['#f2f2f2', '#f2f2f2', '#ccc7c7', '#f2f2f2'];
    } else {
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
   * @type {Object}
   * @memberof kakaGrid.themes.choices
   */
  var materialDesignTheme = {
    borderColor: BORDER_COLOR,
    button: {
      bgColor: '#2196F3',
      color: '#FFF'
    },
    checkbox: {
      borderColor: 'rgba(0, 0, 0, 0.26)',
      checkBgColor: 'rgb(76, 73, 72)'
      // uncheckBgColor: "#FFF",
    },
    radioButton: {
      checkColor: 'rgb(76, 73, 72)',
      checkBorderColor: 'rgb(76, 73, 72)',
      uncheckBorderColor: 'rgb(189, 189, 189)'
      // uncheckBgColor: "#FFF",
      // checkBgColor: "#FFF",
    },
    color: 'rgba(0, 0, 0, 0.87)',
    defaultBgColor: '#FFF',
    // frozenRowsBgColor: "#FFF",
    frozenRowsBorderColor: FROZEN_ROWS_BORDER_COLOR,
    frozenRowsColor: 'rgba(0, 0, 0, 0.54)',
    header: {
      sortArrowColor: 'rgba(0, 0, 0, 0.38)'
    },
    highlightBorderColor: '#5E9ED6',
    selectionBgColor: '#CCE0FF',
    selectionDragBgColor: '#EAF2FF',
    switch: {
      borderColor: '#BFBFBF',
      checkBgColor: '#008CD6' // '3BCD4F'
      // uncheckBgColor: "#FFF",
    },
    tree: {
      lineColor: 'rgba(0, 0, 0, 0.3)',
      buttonColor: 'rgba(0, 0, 0, 0.45)',
      buttonBgColor: 'transparent',
      buttonBorderColor: 'rgba(0, 0, 0, 0.3)',
      linkColor: 'rgba(0, 0, 0, 0.3)'
    },
    underlayBackgroundColor: '#FFF'
    // gridBorderColor: 'transparent',
    // gridBorderWidth: 0,
  };

  //private symbol
  const _$1 = getThemeSymbol();

  function getProp(obj, superObj, names, defNames) {
    return (getChainSafe(obj, ...names) ||
      getChainSafe(superObj, ...names) ||
      (defNames && getChainSafe(obj, ...defNames)) ||
      (defNames && getChainSafe(superObj, ...defNames)));
  }

  class Theme {
    constructor(obj, superTheme) {
      this._checkbox = null;
      this._radioButton = null;
      this._button = null;
      this._header = null;
      this._switch = null;
      this._tree = null;
      this[_$1] = {
        obj,
        superTheme: superTheme
      };
    }

    get underlayBackgroundColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['underlayBackgroundColor']);
    }

    // font
    get font() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['font']);
    }

    get frozenRowsFont() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['frozenRowsFont']);
    }

    // color
    get color() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['color']);
    }

    get frozenRowsColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['frozenRowsColor'], ['color']);
    }

    // background
    get defaultBgColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['defaultBgColor']);
    }

    get frozenRowsBgColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['frozenRowsBgColor'], ['defaultBgColor']);
    }

    get focusBgColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['focusBgColor']);
    }

    get selectionBgColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['selectionBgColor'], ['defaultBgColor']);
    }

    get selectionDragBgColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['selectionDragBgColor'], ['selectionBgColor']);
    }

    get highlightBgColor() {
      if (this.hasProperty(['highlightBgColor'])) {
        const { obj, superTheme } = this[_$1];
        return getProp(obj, superTheme, ['highlightBgColor']);
      }
      return (args) => {
        const color = args.row < args.grid.frozenRowCount
          ? this.frozenRowsBgColor
          : this.defaultBgColor;
        if (typeof color === 'function') {
          return color(args);
        }
        return color;
      };
    }

    // border
    get borderColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['borderColor']);
    }

    get frozenRowsBorderColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['frozenRowsBorderColor'], ['borderColor']);
    }

    get highlightBorderColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['highlightBorderColor'], ['borderColor']);
    }

    // grid border
    get gridBorderColor() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['gridBorderColor']);
    }

    get gridBorderWidth() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['gridBorderWidth']);
    }

    // size
    get defaultRowHeight() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['defaultRowHeight']);
    }

    get defaultColWidth() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['defaultColWidth']);
    }

    get highlightBorderWidth() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return getProp(obj, superTheme, ['highlightBorderWidth']);
    }

    // other
    get checkbox() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return (this._checkbox ||
        (this._checkbox = {
          get uncheckBgColor() {
            return getProp(obj, superTheme, ['checkbox', 'uncheckBgColor'], ['defaultBgColor']);
          },
          get checkBgColor() {
            return getProp(obj, superTheme, ['checkbox', 'checkBgColor'], ['color']);
          },
          get borderColor() {
            return getProp(obj, superTheme, ['checkbox', 'borderColor']);
          }
        }));
    }

    get radioButton() {
      const { obj, superTheme } = this[_$1];
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
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
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
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return (this._header ||
        (this._header = {
          get sortArrowColor() {
            return getProp(obj, superTheme, ['header', 'sortArrowColor']);
          }
        }));
    }

    get switch() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return (this._switch ||
        (this._switch = {
          get uncheckBgColor() {
            return getProp(obj, superTheme, ['switch', 'uncheckBgColor'], ['defaultBgColor']);
          },
          get checkBgColor() {
            return getProp(obj, superTheme, ['switch', 'checkBgColor'], ['color']);
          },
          get borderColor() {
            return getProp(obj, superTheme, ['switch', 'borderColor']);
          }
        }));
    }

    get tree() {
      const obj = this[_$1].obj;
      const superTheme = this[_$1].superTheme;
      return (this._tree ||
        (this._tree = {
          get lineColor() {
            return getProp(obj, superTheme, ['tree', 'lineColor']);
          },
          get buttonColor() {
            return getProp(obj, superTheme, ['tree', 'buttonColor'], ['color']);
          },
          get buttonBgColor() {
            return getProp(obj, superTheme, ['tree', 'buttonBgColor'], ['defaultBgColor']);
          },
          get buttonBorderColor() {
            return getProp(obj, superTheme, ['tree', 'buttonBorderColor']);
          },
          get linkColor() {
            return getProp(obj, superTheme, ['tree', 'linkColor']);
          }
        }));
    }

    hasProperty(names) {
      const { obj, superTheme } = this[_$1];
      return hasThemeProperty(obj, names) || hasThemeProperty(superTheme, names);
    }

    extends(obj) {
      return new Theme(obj, this);
    }
  }

  function hasThemeProperty(obj, names) {
    if (obj instanceof Theme) {
      return obj.hasProperty(names);
    } else {
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

  const BASIC = new Theme(basicTheme);
  const MATERIAL_DESIGN = new Theme(materialDesignTheme);
  const builtin = {
    BASIC,
    MATERIAL_DESIGN
  };
  let defTheme = MATERIAL_DESIGN;
  const theme$1 = { Theme };

  function of$1(value) {
    if (!value) {
      return null;
    }
    if (typeof value === 'string') {
      const t = getIgnoreCase(getChoices(), value);
      if (t) {
        return t;
      }
      return null;
    }
    if (value instanceof Theme) {
      return value;
    }
    return new Theme(value);
  }

  function getDefault() {
    return defTheme;
  }

  function setDefault(defaultTheme) {
    defTheme = of$1(defaultTheme) || defTheme;
  }

  function getChoices() {
    return extend$1(builtin, themes$1);
  }

  const themes = {
    BASIC,
    MATERIAL_DESIGN,
    theme: theme$1,
    of: of$1,
    getDefault,
    setDefault,
    getChoices
  };

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
    return (0 <= r &&
      r <= 255 &&
      0 <= g &&
      g <= 255 &&
      0 <= b &&
      b <= 255 &&
      0 <= a &&
      a <= 1);
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

  function calcElapsedColor(startColor, endColor, elapsedTime) {
    const startColorRGB = colorToRGB(startColor);
    const endColorRGB = colorToRGB(endColor);
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
    return `rgb(${ getRGB('r') }, ${ getRGB('g') }, ${ getRGB('b') })`;
  }

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
        } else {
          if (preColor) {
            ctx.strokeStyle = preColor;
            ctx.stroke();
          }
        }
      }
      const pColor = borderColors[borderColors.length - 1];
      if (pColor) {
        ctx.strokeStyle = pColor;
        ctx.stroke();
      }
    }

    if (borderColors[0] === borderColors[1] &&
      borderColors[0] === borderColors[2] &&
      borderColors[0] === borderColors[3]) {
      if (borderColors[0]) {
        ctx.strokeStyle = borderColors[0];
        ctx.strokeRect(left, top, width, height);
      }
    } else {
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
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width
    };
    ctx.save();
    try {
      ctx.beginPath();
      ctx.rect(rect.left, rect.top, rect.width, rect.height);
      // clip
      ctx.clip();
      // 文字
      const pos = calcBasePosition(ctx, rect, {
        offset,
        padding
      });
      ctx.fillText(text, pos.x, pos.y);
    } finally {
      ctx.restore();
    }
  }

  function drawInlineImageRect(ctx, image, srcLeft, srcTop, srcWidth, srcHeight, destWidth, destHeight, left, top, width, height, { offset = 2, padding } = {}) {
    const rect = {
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width
    };
    ctx.save();
    try {
      ctx.beginPath();
      ctx.rect(rect.left, rect.top, rect.width, rect.height);
      // clip
      ctx.clip();
      // 文字
      const pos = calcStartPosition(ctx, rect, destWidth, destHeight, {
        offset,
        padding
      });
      ctx.drawImage(image, srcLeft, srcTop, srcWidth || destWidth, srcHeight || destHeight, pos.x, pos.y, destWidth, destHeight);
    } finally {
      ctx.restore();
    }
  }

  /**
   * Returns an object containing the width of the checkbox.
   * @param ctx - canvas context
   * @returns Object containing the width of the checkbox
   */
  function measureCheckbox(ctx) {
    return {
      width: getFontSize(ctx, null).width
    };
  }

  /**
   * Returns an object containing the width of the radio button.
   * @param ctx - canvas context
   * @returns Object containing the width of the radio button
   */
  function measureRadioButton(ctx) {
    return {
      width: getFontSize(ctx, null).width
    };
  }

  /**
   * draw Checkbox
   * @param ctx - canvas context
   * @param x - The x coordinate where to start drawing the checkbox (relative to the canvas)
   * @param y - The y coordinate where to start drawing the checkbox (relative to the canvas)
   * @param check - checkbox check status
   * @param option - option
   * @returns
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
    } finally {
      ctx.restore();
    }
  }

  /**
   * draw Radio button
   * @param ctx - canvas context
   * @param x - The x coordinate where to start drawing the radio button (relative to the canvas)
   * @param y - The y coordinate where to start drawing the radio button (relative to the canvas)
   * @param check - radio button check status
   * @param option - option
   * @returns
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
    } finally {
      ctx.restore();
    }
  }

  /**
   * draw Switch Button
   * @param ctx - canvas context
   * @param x - The x coordinate where to start drawing the switch (relative to the canvas)
   * @param y - The y coordinate where to start drawing the switch (relative to the canvas)
   * @param check - switch check status
   * @param option - option
   * @returns
   */
  function drawSwitchBtn(ctx, x, y, check, animElapsedTime, { uncheckBgColor = '#FFF', checkBgColor = '#3BCD4F', borderColor = '#D9D9D9', btnSize = { width: 52, height: 32 } } = {}) {
    animElapsedTime =
      animElapsedTime > 1 ? 1 : animElapsedTime < 0 ? 0 : animElapsedTime;
    const borderWidth = btnSize.height * 0.078125;
    ctx.save();
    try {
      ctx.fillStyle = check ? checkBgColor : borderColor;
      const bX = ceil(x) - 1;
      const bY = ceil(y) - 1;
      const bW = ceil(btnSize.width + 1);
      const bH = ceil(btnSize.height + 1);
      fillRoundRect(ctx, bX, bY, bW, bH, bH / 2);
      const scale = check ? 1 - animElapsedTime : animElapsedTime;
      ctx.fillStyle = uncheckBgColor;
      const cW = (bW - borderWidth * 2) * scale;
      const cH = (bH - borderWidth * 2) * scale;
      const cX = bX + bW / 2 - cW / 2;
      const cY = bY + bH / 2 - cH / 2;
      fillRoundRect(ctx, cX, cY, cW, cH, cH / 2);
      const offsetScale = check ? animElapsedTime : 1 - animElapsedTime;
      ctx.shadowColor = borderColor;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      const sW = bH - borderWidth * 2;
      const sH = sW;
      const sX = bX + borderWidth + (bW - borderWidth * 2 - sW) * offsetScale;
      const sY = bY + borderWidth;
      fillRoundRect(ctx, sX, sY, sW, sH, sH / 2);
    } finally {
      ctx.restore();
    }
  }

  function drawSwitchButton(ctx, x, y, check, animElapsedTime, {
    uncheckBgColor = '#FFF',
    checkBgColor = '#008CD6',
    borderColor = '#BFBFBF',
    btnSize = { width: 44, height: 22 },
    textOn = '是',
    textOff = '否'
  } = {}) {
    animElapsedTime =
      animElapsedTime > 1 ? 1 : animElapsedTime < 0 ? 0 : animElapsedTime;
    const borderWidth = (btnSize.height * 2) / 22;
    const fontSize = (btnSize.height * 12) / 22;
    const textMargin = (btnSize.width - btnSize.height + borderWidth) / 2 + borderWidth;
    ctx.save();
    try {
      let backgroundFillStyle;
      let trueFillStyle;
      let falseFillStyle;
      if (0 < animElapsedTime && animElapsedTime < 1) {
        backgroundFillStyle = check
          ? calcElapsedColor(borderColor, checkBgColor, animElapsedTime)
          : calcElapsedColor(checkBgColor, borderColor, animElapsedTime);
        trueFillStyle = check
          ? calcElapsedColor(borderColor, uncheckBgColor, animElapsedTime)
          : calcElapsedColor(uncheckBgColor, borderColor, animElapsedTime);
        falseFillStyle = check
          ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
          : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
      } else {
        backgroundFillStyle = check ? checkBgColor : borderColor;
        trueFillStyle = check ? uncheckBgColor : borderColor;
        falseFillStyle = check ? checkBgColor : uncheckBgColor;
      }
      const bX = x;
      const bY = y;
      const bW = btnSize.width;
      const bH = btnSize.height;
      ctx.fillStyle = backgroundFillStyle;
      fillRoundRect(ctx, bX, bY, bW, bH, bH / 2);
      const offsetScale = check ? animElapsedTime : 1 - animElapsedTime;
      const sW = bH - borderWidth * 2;
      const sH = sW;
      const sX = bX + borderWidth + (bW - borderWidth * 2 - sW) * offsetScale;
      const sY = bY + borderWidth;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${ fontSize }px sans-serif`;
      const lW = sX + sW / 2 - bX;
      ctx.save();
      try {
        ctx.beginPath();
        ctx.rect(bX, bY, lW, bH);
        ctx.clip();
        ctx.fillStyle = trueFillStyle;
        ctx.fillText(textOn, bX + textMargin, bY + bH / 2);
      } finally {
        ctx.restore();
      }
      const rW = bW - lW;
      ctx.save();
      try {
        ctx.beginPath();
        ctx.rect(bX + lW, bY, rW, bH);
        ctx.clip();
        ctx.fillStyle = falseFillStyle;
        ctx.fillText(textOff, bX + bW - textMargin, bY + bH / 2);
      } finally {
        ctx.restore();
      }
      ctx.fillStyle = uncheckBgColor;
      fillRoundRect(ctx, sX, sY, sW, sH, sH / 2);
    } finally {
      ctx.restore();
    }
  }

  function drawButton(ctx, left, top, width, height, option = {}) {
    const { backgroundColor = '#FFF', bgColor = backgroundColor, radius = 4, shadow = {} } = option;
    ctx.save();
    try {
      ctx.fillStyle = bgColor;
      if (shadow) {
        const { color = 'rgba(0, 0, 0, 0.24)', blur = 1, offsetX = 0, offsetY = 2, offset: { x: ox = offsetX, y: oy = offsetY } = {} } = shadow;
        ctx.shadowColor = color;
        ctx.shadowBlur = blur; // 模糊
        ctx.shadowOffsetX = ox;
        ctx.shadowOffsetY = oy;
      }
      fillRoundRect(ctx, ceil(left), ceil(top), ceil(width), ceil(height), radius);
    } finally {
      ctx.restore();
    }
  }

  /**
   * canvasHelper
   */
  const canvasHelper = {
    drawButton,
    drawCheckbox,
    drawInlineImageRect,
    drawRadioButton,
    drawSwitchButton,
    drawSwitchBtn,
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

  /**
   * tools
   */
  const tools = { canvasHelper };

  let seqId$2 = -1;

  function newEmptyHeaderData() {
    return {
      id: seqId$2--,
      define: {},
      headerType: headers.type.of(null) // default
    };
  }

  function newEmptyColumnData() {
    return {
      id: seqId$2--,
      define: {},
      columnType: columns.type.of(null),
      style: null
    };
  }

  class EmptyDataCache {
    constructor() {
      this.headers = [];
      this.columns = [];
    }

    getHeader(col, row) {
      const rows = this.headers[row] || (this.headers[row] = []);
      return rows[col] || (rows[col] = newEmptyHeaderData());
    }

    getBody(col, row) {
      const rows = this.columns[row] || (this.columns[row] = []);
      return rows[col] || (rows[col] = newEmptyColumnData());
    }
  }

  let seqId$1 = 0;

  class SimpleHeaderLayoutMap {
    constructor(header) {
      this.bodyRowCount = 1;
      this._emptyDataCache = new EmptyDataCache();
      this._columns = [];
      this._headerCellIds = [];
      this._headerObjects = this._addHeaders(0, header, []);
      this._headerObjectMap = this._headerObjects.reduce((o, e) => {
        o[e.id] = e;
        return o;
      }, {});
      this._setupHeaderSpan();
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
      throw new Error(`can not found body layout @id=${ id }`);
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
      } else {
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
        const id = seqId$1++;
        const cell = {
          id,
          caption: hd.caption,
          field: hd.headerField || hd.field,
          style: hd.headerStyle,
          headerType: headers.type.ofCell(hd),
          action: headers.action.ofCell(hd),
          define: hd,
          icon: hd.headerIcon,
          tooltip: hd.headerTooltip,
          tooltipType: hd.headerTooltipType,
          iconTooltip: hd.headerIconTooltip
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
        } else {
          const colDef = hd;
          this._columns.push({
            id: seqId$1++,
            field: colDef.field,
            width: colDef.width,
            minWidth: colDef.minWidth,
            maxWidth: colDef.maxWidth,
            icon: colDef.icon,
            message: colDef.message,
            columnType: columns.type.of(colDef.columnType),
            action: columns.action.of(colDef.action),
            style: colDef.style,
            define: colDef,
            contentHidden: colDef.contentHidden,
            disableResize: colDef.disableResize,
            tooltip: colDef.tooltip,
            tooltipType: colDef.tooltipType
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

    _setupHeaderSpan() {
      const processed = {};
      for (let row = 0; row < this._headerCellIds.length; row++) {
        const cols = this._headerCellIds[row];
        for (let col = 0; col < cols.length; col++) {
          const cellId = cols[col];
          if (!processed[cellId]) {
            processed[cellId] = true;
            const cell = this._headerObjectMap[cellId];
            let headerRowSpan;
            if ('headerRowSpan' in cell.define) {
              window.console.warn('\'headerRowSpan\' is deprecated, please use \'rowSpan\' instead');
              headerRowSpan = cell.define['headerRowSpan'];
            }
            let headerColSpan;
            if ('headerColSpan' in cell.define) {
              window.console.warn('\'headerColSpan\' is deprecated, please use \'colSpan\' instead');
              headerColSpan = cell.define['headerColSpan'];
            }
            const rowSpan = Number(cell.define.rowSpan || headerRowSpan || 1);
            const colSpan = Number(cell.define.colSpan || headerColSpan || 1);
            if (rowSpan > 1 || colSpan > 1) {
              for (let i = row; i < row + rowSpan; i++) {
                for (let j = col; j < col + colSpan; j++) {
                  this._headerCellIds[i][j] = cellId;
                }
              }
            }
          }
        }
      }
    }
  }

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
    constructor(layout, transform) {
      this.objects = [];
      this.objectGrid = [];
      this.objectMap = {};
      this.columnCount = 0;
      this.columnWidths = [];
      layout.forEach((rowLayout, row) => {
        let col = 0;
        rowLayout.forEach((cell) => {
          var _a, _b;
          const id = seqId++;
          const obj = transform(cell, id);
          this.objects.push(obj);
          this.objectMap[id] = obj;
          col = this._findStartCell(col, row);
          const rowSpan = Number((_a = cell.rowSpan) !== null && _a !== void 0 ? _a : 1);
          const colSpan = Number((_b = cell.colSpan) !== null && _b !== void 0 ? _b : 1);
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
        if (cell.width != null ||
          cell.maxWidth != null ||
          cell.minWidth != null) {
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
    constructor(layout) {
      this._columnWidths = [];
      this._emptyDataCache = new EmptyDataCache();
      const hbLayout = normalizeLayout(layout);
      const header = (this._header = new LayoutObjectGrid(hbLayout.header, (hd, id) => {
        return {
          id,
          caption: hd.caption,
          field: hd.headerField || hd.field,
          style: hd.headerStyle,
          headerType: headers.type.ofCell(hd),
          action: headers.action.ofCell(hd),
          define: hd,
          icon: hd.headerIcon,
          tooltip: hd.headerTooltip,
          tooltipType: hd.headerTooltipType,
          iconTooltip: hd.headerIconTooltip
        };
      }));
      const body = (this._body = new LayoutObjectGrid(hbLayout.body, (colDef, id) => {
        return {
          id,
          field: colDef.field,
          width: colDef.width,
          minWidth: colDef.minWidth,
          maxWidth: colDef.maxWidth,
          icon: colDef.icon,
          message: colDef.message,
          columnType: columns.type.of(colDef.columnType),
          action: columns.action.of(colDef.action),
          style: colDef.style,
          define: colDef,
          contentHidden: colDef.contentHidden,
          disableResize: colDef.disableResize,
          tooltip: colDef.tooltip,
          tooltipType: colDef.tooltipType
        };
      }));
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
      var _a, _b, _c, _d;
      if (this.headerRowCount <= row) {
        const bodyRow = row - this.headerRowCount;
        const bodyLayoutRow = bodyRow % this.bodyRowCount;
        return (_b = (_a = this._body.objectGrid[bodyLayoutRow]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b.id;
      }
      //in header
      return (_d = (_c = this._header.objectGrid[row]) === null || _c === void 0 ? void 0 : _c[col]) === null || _d === void 0 ? void 0 : _d.id;
    }

    getHeader(col, row) {
      const id = this.getCellId(col, row);
      return (this._header.objectMap[id] ||
        this._emptyDataCache.getHeader(col, row));
    }

    getBody(col, row) {
      const id = this.getCellId(col, row);
      return (this._body.objectMap[id] ||
        this._emptyDataCache.getBody(col, row));
    }

    getBodyLayoutRangeById(id) {
      var _a;
      for (let row = 0; row < this.bodyRowCount; row++) {
        const objectGridRow = this._body.objectGrid[row];
        if (!objectGridRow) {
          continue;
        }
        for (let col = 0; col < this.colCount; col++) {
          if (id === ((_a = objectGridRow[col]) === null || _a === void 0 ? void 0 : _a.id)) {
            return this._getCellRange(this._body, col, row, 0);
          }
        }
      }
      throw new Error(`can not found body layout @id=${ id }`);
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
      } else {
        const bodyRow = row - this.headerRowCount;
        return Math.floor(bodyRow / this.bodyRowCount);
      }
    }

    getRecordStartRowByRecordIndex(index) {
      return this.headerRowCount + index * this.bodyRowCount;
    }

    _getCellRange(layout, col, layoutRow, offsetRow) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      const result = {
        start: { col, row: layoutRow + offsetRow },
        end: { col, row: layoutRow + offsetRow }
      };
      const { objectGrid } = layout;
      const id = (_b = (_a = objectGrid[layoutRow]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b.id;
      if (id == null) {
        return result;
      }
      for (let c = col - 1; c >= 0; c--) {
        if (id !== ((_d = (_c = objectGrid[layoutRow]) === null || _c === void 0 ? void 0 : _c[c]) === null || _d === void 0 ? void 0 : _d.id)) {
          break;
        }
        result.start.col = c;
      }
      for (let c = col + 1; c < layout.columnCount; c++) {
        if (id !== ((_f = (_e = objectGrid[layoutRow]) === null || _e === void 0 ? void 0 : _e[c]) === null || _f === void 0 ? void 0 : _f.id)) {
          break;
        }
        result.end.col = c;
      }
      for (let r = layoutRow - 1; r >= 0; r--) {
        if (id !== ((_h = (_g = objectGrid[r]) === null || _g === void 0 ? void 0 : _g[col]) === null || _h === void 0 ? void 0 : _h.id)) {
          break;
        }
        result.start.row = r + offsetRow;
      }
      for (let r = layoutRow + 1; r < layout.rowCount; r++) {
        if (id !== ((_k = (_j = objectGrid[r]) === null || _j === void 0 ? void 0 : _j[col]) === null || _k === void 0 ? void 0 : _k.id)) {
          break;
        }
        result.end.row = r + offsetRow;
      }
      return result;
    }
  }

  class LayoutMap {
    constructor(layoutMap) {
      this._layoutMap = layoutMap;
    }

    get headerRowCount() {
      return this.hiddenHeader ? 0 : this._layoutMap.headerRowCount;
    }

    get bodyRowCount() {
      return this._layoutMap.bodyRowCount;
    }

    get colCount() {
      return this._layoutMap.colCount;
    }

    get columnWidths() {
      return this._layoutMap.columnWidths;
    }

    get headerObjects() {
      return this._layoutMap.headerObjects;
    }

    get columnObjects() {
      return this._layoutMap.columnObjects;
    }

    getHeader(col, row) {
      if (this.hiddenHeader) {
        row += this._layoutMap.headerRowCount;
      }
      return this._layoutMap.getHeader(col, row);
    }

    getBody(col, row) {
      if (this.hiddenHeader) {
        row += this._layoutMap.headerRowCount;
      }
      return this._layoutMap.getBody(col, row);
    }

    getCellId(col, row) {
      if (this.hiddenHeader) {
        row += this._layoutMap.headerRowCount;
      }
      return this._layoutMap.getCellId(col, row);
    }

    getCellRange(col, row) {
      if (this.hiddenHeader) {
        row += this._layoutMap.headerRowCount;
      }
      const range = this._layoutMap.getCellRange(col, row);
      if (this.hiddenHeader) {
        range.start.row -= this._layoutMap.headerRowCount;
        range.end.row -= this._layoutMap.headerRowCount;
      }
      return range;
    }

    getBodyLayoutRangeById(id) {
      const range = this._layoutMap.getBodyLayoutRangeById(id);
      return range;
    }

    getRecordIndexByRow(row) {
      if (this.hiddenHeader) {
        row += this._layoutMap.headerRowCount;
      }
      return this._layoutMap.getRecordIndexByRow(row);
    }

    getRecordStartRowByRecordIndex(index) {
      let row = this._layoutMap.getRecordStartRowByRecordIndex(index);
      if (this.hiddenHeader) {
        row -= this._layoutMap.headerRowCount;
      }
      return row;
    }
  }

  const LG_EVENT_TYPE = Object.assign(Object.assign({}, DG_EVENT_TYPE), {
    CHANGED_HEADER_VALUE: 'changed_header_value',
    CHANGED_VALUE: 'changed_value',
    CELL_RANGE: 'cell_range',
    CELL_VALUE: 'cell_value'
  });

  class BaseMessage {
    constructor(grid) {
      this._grid = grid;
    }

    dispose() {
      this.detachMessageElement();
      if (this._messageElement) {
        this._messageElement.dispose();
      }
      delete this._messageElement;
    }

    drawCellMessageInternal(message, context, style, helper, grid, info) {
      // nothing
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
      messageElement.detach();
    }

    drawCellMessage(message, context, style, helper, grid, info) {
      this.drawCellMessageInternal(message, context, style, helper, grid, info);
    }

    _getMessageElement() {
      return (this._messageElement ||
        (this._messageElement = this.createMessageElementInternal()));
    }
  }

  var messageElementCss = '.kaka-grid__message-element {\n  position: absolute;\n  margin-top: -2px;\n  box-sizing: border-box;\n  border-radius: 0 0 3px 3px;\n  background-color: rgba(250, 250, 250, 0.85);\n  padding: 8px 2px;\n  pointer-events: none;\n  user-select: none;\n  border-top: solid 1px rgba(0, 0, 0, 0.87);\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.kaka-grid__message-element--hidden {\n  display: none;\n}\n\n.kaka-grid__message-element--shown {\n  display: block;\n}\n\n.kaka-grid__message-element__message {\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  display: block;\n  width: 100%;\n}\n';

  const CLASSNAME_ME = 'kaka-grid__message-element';
  const MESSAGE_CLASSNAME_ME = `${ CLASSNAME_ME }__message`;
  const HIDDEN_CLASSNAME_ME = `${ CLASSNAME_ME }--hidden`;
  const SHOWN_CLASSNAME_ME = `${ CLASSNAME_ME }--shown`;

  function createMessageDomElement() {
    style$2.inject('messageElement', messageElementCss);
    const rootElement = createElement('div', {
      classList: [CLASSNAME_ME, HIDDEN_CLASSNAME_ME]
    });
    const messageElement = createElement('span', {
      classList: [MESSAGE_CLASSNAME_ME]
    });
    rootElement.appendChild(messageElement);
    return rootElement;
  }

  class MessageElement {
    constructor() {
      this._handler = new EventHandler();
      const rootElement = (this._rootElement = createMessageDomElement());
      this._messageElement = rootElement.querySelector(`.${ MESSAGE_CLASSNAME_ME }`);
    }

    dispose() {
      this.detach();
      this._handler.dispose();
    }

    attach(grid, col, row, message) {
      const rootElement = this._rootElement;
      const messageElement = this._messageElement;
      rootElement.classList.remove(SHOWN_CLASSNAME_ME);
      rootElement.classList.add(HIDDEN_CLASSNAME_ME);
      if (this._attachCell(grid, col, row)) {
        rootElement.classList.add(SHOWN_CLASSNAME_ME);
        rootElement.classList.remove(HIDDEN_CLASSNAME_ME);
        messageElement.textContent = message.message;
      } else {
        this._detach();
      }
    }

    move(grid, col, row) {
      const rootElement = this._rootElement;
      if (rootElement && this._attachCell(grid, col, row)) {
        rootElement.classList.add(SHOWN_CLASSNAME_ME);
        rootElement.classList.remove(HIDDEN_CLASSNAME_ME);
      } else {
        this._detach();
      }
    }

    detach() {
      this._detach();
    }

    _detach() {
      const rootElement = this._rootElement;
      if (rootElement && rootElement.parentElement) {
        rootElement.parentElement.removeChild(rootElement);
        rootElement.classList.remove(SHOWN_CLASSNAME_ME);
        rootElement.classList.add(HIDDEN_CLASSNAME_ME);
      }
    }

    _attachCell(grid, col, row) {
      const rootElement = this._rootElement;
      const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      const top = rect.bottom;
      const left = rect.left;
      const width = rect.width;
      const frozenRowCount = grid.frozenRowCount;
      const frozenColCount = grid.frozenColCount;
      if (row >= frozenRowCount && frozenRowCount > 0) {
        const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1));
        if (top < frozenRect.bottom) {
          return false; // 超出范围
        }
      } else {
        if (top < 0) {
          return false; // 超出范围
        }
      }
      if (col >= frozenColCount && frozenColCount > 0) {
        const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row));
        if (left < frozenRect.right) {
          return false; // 超出范围
        }
      } else {
        if (left < 0) {
          return false; // 超出范围
        }
      }
      const offsetHeight = element.offsetHeight;
      const offsetWidth = element.offsetWidth;
      if (offsetHeight < top) {
        return false; // 超出范围
      }
      if (offsetWidth < left) {
        return false; // 超出范围
      }
      rootElement.style.top = `${ top.toFixed() }px`;
      rootElement.style.left = `${ left.toFixed() }px`;
      rootElement.style.width = `${ width.toFixed() }px`;
      if (rootElement.parentElement !== element) {
        element.appendChild(rootElement);
      }
      return true;
    }
  }

  var errorMessageElementCss = '.kaka-grid__error-message-element {\n  border-top: solid 1px #ff1744;\n  color: #ff1744;\n}\n';

  const CLASSNAME_EME = 'kaka-grid__error-message-element';
  const MESSAGE_CLASSNAME_EME = `${ CLASSNAME_EME }__message`;

  class ErrorMessageElement extends MessageElement {
    constructor() {
      super();
      style$2.inject('errorMessageElement', errorMessageElementCss);
      this._rootElement.classList.add(CLASSNAME_EME);
      this._messageElement.classList.add(MESSAGE_CLASSNAME_EME);
    }
  }

  function drawExclamationMarkBox(context, style, helper) {
    const bgColor = style.bgColor;
    const color = style.color;
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
    helper.fillRectWithState(new Rect(left, top, width, (height / 5) * 3), context, { fillColor });
    helper.fillRectWithState(new Rect(left, top + (height / 5) * 4, width, height / 5), context, { fillColor });
  }

  function drawInformationMarkBox(context, style, helper) {
    const bgColor = style.bgColor;
    const color = style.color;
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
    helper.fillRectWithState(new Rect(left, top, width, height / 5), context, {
      fillColor
    });
    helper.fillRectWithState(new Rect(left, top + (height / 5) * 2, width, (height / 5) * 3), context, { fillColor });
  }

  const RED_A100 = '#ff8a80';

  class ErrorMessage extends BaseMessage {
    createMessageElementInternal() {
      return new ErrorMessageElement();
    }

    drawCellMessageInternal(message, context, style, helper, grid, info) {
      const bgColor = style.bgColor;
      const { select } = context.getSelection();
      if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
        !grid.hasFocusGrid()) {
        helper.drawBorderWithClip(context, (ctx) => {
          drawExclamationMarkBox(context, {
            bgColor: RED_A100,
            color: bgColor
          }, helper);
        });
      }
    }
  }

  const GREY_L2 = '#e0e0e0';

  class InfoMessage extends BaseMessage {
    createMessageElementInternal() {
      return new MessageElement();
    }

    drawCellMessageInternal(_message, context, style, helper, grid, _info) {
      const { bgColor } = style;
      const { select } = context.getSelection();
      if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
        !grid.hasFocusGrid()) {
        helper.drawBorderWithClip(context, (_ctx) => {
          drawInformationMarkBox(context, {
            bgColor: GREY_L2,
            color: bgColor
          }, helper);
        });
      }
    }
  }

  var warningMessageElementCss = '.kaka-grid__warning-message-element {\n  border-top: solid 1px #dd2c00;\n  color: #dd2c00;\n}\n';

  const CLASSNAME_WME = 'kaka-grid__warning-message-element';
  const MESSAGE_CLASSNAME_WME = `${ CLASSNAME_WME }__message`;

  class WarningMessageElement extends MessageElement {
    constructor() {
      super();
      style$2.inject('warningMessageElement', warningMessageElementCss);
      this._rootElement.classList.add(CLASSNAME_WME);
      this._messageElement.classList.add(MESSAGE_CLASSNAME_WME);
    }
  }

  const DEEP_ORANGE_A100 = '#ff9e80';

  class WarningMessage extends BaseMessage {
    createMessageElementInternal() {
      return new WarningMessageElement();
    }

    drawCellMessageInternal(_message, context, style, helper, grid, _info) {
      const { bgColor } = style;
      const { select } = context.getSelection();
      if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
        !grid.hasFocusGrid()) {
        helper.drawBorderWithClip(context, (ctx) => {
          drawExclamationMarkBox(context, {
            bgColor: DEEP_ORANGE_A100,
            color: bgColor
          }, helper);
        });
      }
    }
  }

  const EMPTY_MESSAGE = {
    type: 'error',
    message: null
  };
  const MESSAGE_INSTANCE_FACTORY = {
    error(grid) {
      return new ErrorMessage(grid);
    },
    info(grid) {
      return new InfoMessage(grid);
    },
    warning(grid) {
      return new WarningMessage(grid);
    }
  };

  function normalizeMessage(message) {
    if (!message || isPromise(message)) {
      return EMPTY_MESSAGE;
    }
    if (typeof message === 'string') {
      return {
        message,
        original: message,
        type: 'error'
      };
    }
    const type = message.type || 'error';
    if (type && type in MESSAGE_INSTANCE_FACTORY) {
      return {
        type: type.toLowerCase(),
        message: `${ message.message }`,
        original: message
      };
    }
    return {
      type: 'error',
      message: `${ message }`,
      original: message
    };
  }

  function hasMessage(message) {
    return !!normalizeMessage(message).message;
  }

  class MessageHandler {
    constructor(grid, getMessage) {
      this._attachInfo = null;
      this._grid = grid;
      this._messageInstances = {};
      this._bindGridEvent(grid, getMessage);
    }

    dispose() {
      var _a;
      const messageInstances = this._messageInstances;
      for (const k in messageInstances) {
        (_a = messageInstances[k]) === null || _a === void 0 ? void 0 : _a.dispose();
      }
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
        const message = getMessage(sel.col, sel.row);
        if (!hasMessage(message)) {
          this._detach();
        } else {
          this._attach(sel.col, sel.row, message);
        }
      };
      grid.listen(LG_EVENT_TYPE.SELECTED_CELL, (e) => {
        if (!e.selected) {
          return;
        }
        if (e.before.col === e.col && e.before.row === e.row) {
          return;
        }
        onSelectMessage(e);
      });
      grid.listen(LG_EVENT_TYPE.SCROLL, () => {
        const sel = grid.selection.select;
        this._move(sel.col, sel.row);
      });
      grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, (e) => {
        const sel = grid.selection.select;
        if (sel.col !== e.col || sel.row !== e.row) {
          return;
        }
        onSelectMessage(e);
      });
      grid.listen(LG_EVENT_TYPE.FOCUS_GRID, (_e) => {
        const sel = grid.selection.select;
        onSelectMessage(sel);
      });
      grid.listen(LG_EVENT_TYPE.BLUR_GRID, (_e) => {
        this._detach();
      });
    }

    _getMessageInstanceOfMessage(message) {
      const messageInstances = this._messageInstances;
      const type = normalizeMessage(message).type;
      return (messageInstances[type] ||
        (messageInstances[type] = MESSAGE_INSTANCE_FACTORY[type](this._grid)));
    }
  }

  const icons$1 = {};

  const parser$1 = new DOMParser();
  const ELEMENT_NODE$1 = 1;

  function findElement(el, test) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const child = el.childNodes[i];
      if (child.nodeType !== ELEMENT_NODE$1) {
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
    constructor(svgCode) {
      const document = parser$1.parseFromString(svgCode, 'image/svg+xml');
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
      return (this._glyphs[glyphName] ||
        (this._glyphs[glyphName] = this.findElement((child) => child.getAttribute('glyph-name') === glyphName)));
    }

    findGlyphByUnicode(unicode) {
      return (this._glyphUnis[unicode] ||
        (this._glyphUnis[unicode] = this.findElement((child) => child.getAttribute('unicode') === unicode)));
    }

    walkAllGlyph(callback) {
      const walkGlyph = (el, fn) => {
        for (let i = 0; i < el.childNodes.length; i++) {
          const child = el.childNodes[i];
          if (child.nodeType !== ELEMENT_NODE$1) {
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
          } else {
            walkGlyph(child, fn);
          }
        }
      };
      walkGlyph(this.svg, callback);
    }
  }

  const ELEMENT_NODE = 1;

  function polygonToPath(polygon) {
    const points = polygon.getAttribute('points');
    return `M${ points }z`;
  }

  function polylineToPath(polyline) {
    const points = polyline.getAttribute('points');
    return `M${ points }`;
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
    let paths = `M${ cx + r } ${ cy }`;
    for (let index = 1; index <= SEGMENTS; index++) {
      const theta = index * ANGLE;
      paths += `Q${ controlX(theta) + cx } ${ controlY(theta) + cy } ${ anchorX(theta) + cx } ${ anchorY(theta) + cy }`;
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
        window.console.warn(`unsupported:${ el.tagName }`, `@ ${ el.innerHTML }`);
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
    const svg = new Svg(svgCode);

    function findGlyph() {
      if (opt.glyphName) {
        return svg.findGlyph(opt.glyphName);
      } else if (opt.unicode) {
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
    const svg = new Svg(svgCode).svg;
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
    } else {
      return svgToJSON(svgCode);
    }
  };

  var add = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"/></svg>';

  var edit = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/></svg>';

  var arrowDownward = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="#010101" d="M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z"/></svg>';

  var arrowUpward = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"/></svg>';

  var star = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

  var starBorder = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>';

  var starHalf = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>';

  const builtins = {
    add: svgToIcon(add),
    arrowDownward: svgToIcon(arrowDownward),
    arrowUpward: svgToIcon(arrowUpward),
    edit: svgToIcon(edit),
    star: svgToIcon(star),
    starBorder: svgToIcon(starBorder),
    starHalf: svgToIcon(starHalf)
  };
  const svgIcons = {
    get() {
      return extend$1(builtins, icons$1);
    }
  };

  function mag(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
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
      ctx.lineTo(x2, y2);
      return;
    }
    phi *= Math.PI / 180.0;
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const xPrime = rotClockwise(midPoint([x1, y1], [x2, y2]), phi); // F.6.5.1
    const xPrime2 = pointMul(xPrime, xPrime);
    let rx2 = Math.pow(rx, 2);
    let ry2 = Math.pow(ry, 2);
    const lambda = Math.sqrt(xPrime2[0] / rx2 + xPrime2[1] / ry2);
    if (lambda > 1) {
      rx *= lambda;
      ry *= lambda;
      rx2 = Math.pow(rx, 2);
      ry2 = Math.pow(ry, 2);
    }
    let factor = Math.sqrt(Math.abs(rx2 * ry2 - rx2 * xPrime2[1] - ry2 * xPrime2[0]) /
      (rx2 * xPrime2[1] + ry2 * xPrime2[0]));
    if (fA === fS) {
      factor *= -1.0;
    }
    const cPrime = scale(factor, [(rx * xPrime[1]) / ry, (-ry * xPrime[0]) / rx]); // F.6.5.2
    const c = sum(rotCounterClockwise(cPrime, phi), meanVec([x1, y1], [x2, y2])); // F.6.5.3
    const x1UnitVector = [
      (xPrime[0] - cPrime[0]) / rx,
      (xPrime[1] - cPrime[1]) / ry
    ];
    const x2UnitVector = [
      (-1.0 * xPrime[0] - cPrime[0]) / rx,
      (-1.0 * xPrime[1] - cPrime[1]) / ry
    ];
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
          } else {
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
    if (cmd.toUpperCase() === 'M' ||
      cmd.toUpperCase() === 'L' ||
      cmd.toUpperCase() === 'T') {
      builder.command(cmd, argsProvider.next(), argsProvider.next());
      return cmd === 'M' ? 'L' : cmd === 'm' ? 'l' : cmd;
    } else if (cmd.toUpperCase() === 'H' || cmd.toUpperCase() === 'V') {
      builder.command(cmd, argsProvider.next());
      return cmd;
    } else if (cmd.toUpperCase() === 'Z') {
      builder.command(cmd);
      return cmd;
    } else if (cmd.toUpperCase() === 'C') {
      builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
      return cmd;
    } else if (cmd.toUpperCase() === 'S' || cmd.toUpperCase() === 'Q') {
      builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
      return cmd;
    } else if (cmd.toUpperCase() === 'A') {
      builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
      return cmd;
    } else {
      // https://developer.mozilla.org/ja/docs/Web/SVG/Tutorial/Paths
      console.warn(`unsupported:${ cmd }`);
    }
    return null;
  }

  class PathCommandsParser {
    constructor() {
      this._ops = [];
      this._commands = new PathCommands(this);
      const buildPush = (op) => (...args) => {
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
            subsequentCommand =
              command(this, subsequentCommand, argsProvider) || 'Z';
          } else {
            subsequentCommand =
              command(this, cmd, tokens) || 'Z';
          }
        }
      } catch (e) {
        console.log(`Error: ${ d }`);
        throw e;
      }
      return ops;
    }
  }

  const parser = new PathCommandsParser();

  class Path2DShim {
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
      } else if (arg.hasOwnProperty('_ops')) {
        this._ops = [...arg._ops];
      } else {
        throw new Error(`Error: ${ typeof arg } is not a valid argument to Path`);
      }
    }

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
  }

  const { CanvasRenderingContext2D } = window;
  const originalFill = CanvasRenderingContext2D.prototype.fill;
  CanvasRenderingContext2D.prototype.fill = function (...args) {
    if (args[0] instanceof Path2DShim) {
      const path = args[0];
      this.beginPath();
      path._ops.forEach((op) => {
        const fn = this[op.op];
        fn.apply(this, op.args);
      });
      originalFill.apply(this, Array.prototype.slice.call(args, 1));
    } else {
      originalFill.apply(this, args);
    }
  };

  function getPath2D() {
    if (typeof Path2D !== 'undefined' && !browser.Edge) {
      return Path2D;
    } else {
      return Path2DShim;
    }
  }

  const path2DManager = {
    fill(module, ctx, x, y, w, h) {
      ctx.save();
      try {
        const width = module.width;
        const height = module.height;
        const upsideDown = module.ud;
        const offsetX = module.x || 0;
        const offsetY = module.y || 0;
        w = w || width;
        h = h || height;
        const xRate = w / width;
        const yRate = h / (upsideDown ? -height : height);
        x = x || 0;
        y = upsideDown ? (y || 0) + -height * yRate : y || 0;
        ctx.translate(x, y);
        ctx.scale(xRate, yRate);
        if (offsetX !== 0 || offsetY !== 0) {
          ctx.translate(offsetX, offsetY);
        }
        const _Path2D = getPath2D();
        module.path2d = module.path2d || new _Path2D(module.d);
        ctx.fill(module.path2d);
      } finally {
        ctx.restore();
      }
    },
    getPath2D
  };

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
        beforeWidth -= getWidth(ctx, c);
        if (beforeWidth <= width) {
          break;
        }
      }
    } else if (beforeWidth < width) {
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
      after: afterContent ? new Inline(afterContent) : null,
      before: beforeContent ? new Inline(beforeContent) : null
    };
  }

  class Inline {
    constructor(content) {
      this._content = isDef(content) ? String(content) : '';
    }

    width(obj) {
      return getWidth(obj.ctx, this._content);
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

    onReady(_callback) {
    }

    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
      canvasHelper.fillTextRect(ctx, this._content, rect.left, rect.top, rect.width, rect.height, {
        offset: offset + 1,
        padding: {
          bottom: offsetBottom,
          left: offsetLeft,
          right: offsetRight,
          top: offsetTop
        }
      });
    }

    canBreak() {
      return !!this._content;
    }

    splitIndex(index) {
      const content = this._content;
      const itr = str.genChars(content);
      const chars = [];
      let ret = itr.next();
      for (let i = 0; i < index && ret !== null; i++, ret = itr.next()) {
        chars.push(ret);
      }
      const beforeContent = chars.join('');
      const afterContent = content.slice(beforeContent.length);
      return {
        after: afterContent ? new Inline(afterContent) : null,
        before: beforeContent ? new Inline(beforeContent) : null
      };
    }

    breakWord(ctx, width) {
      const content = this._content;
      const allWidth = this.width({ ctx });
      const candidate = Math.floor((this._content.length * width) / allWidth);
      const itr = str.genWords(content);
      return breakWidth(ctx, content, itr, candidate, width);
    }

    breakAll(ctx, width) {
      const content = this._content;
      const allWidth = this.width({ ctx });
      const candidate = Math.floor((this._content.length * width) / allWidth);
      const itr = str.genChars(content);
      return breakWidth(ctx, content, itr, candidate, width);
    }

    toString() {
      return this._content;
    }
  }

  class InlineDrawer extends Inline {
    constructor({
                  draw, width,
                  // height,
                  color
                }) {
      super();
      this._draw = draw;
      this._width = width;
      // this._height = height
      this._color = color;
    }

    width(_arg) {
      return this._width;
    }

    font() {
      return null;
    }

    color() {
      var _a;
      return (_a = this._color) !== null && _a !== void 0 ? _a : null;
    }

    canDraw() {
      return true;
    }

    onReady(_callback) {
    }

    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
      this._draw({
        ctx,
        canvasHelper,
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

  //see https://github.com/typekit/webfontloader
  function computeStyle(font) {
    return [
      {
        display: 'block',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: 'auto',
        height: 'auto',
        margin: '0',
        padding: '0',
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
    constructor(font, testStr) {
      const e = document.createElement('span');
      e.setAttribute('aria-hidden', 'true');
      e.textContent = testStr || 'BESbswy';
      computeStyle(font).forEach((style) => {
        for (const k in style) {
          const key = k;
          e.style[key] = style[key];
        }
      });
      document.body.appendChild(e);
      this._el = e;
    }

    getWidth() {
      return this._el.offsetWidth;
    }

    remove() {
      document.body.removeChild(this._el);
    }
  }

  //see https://github.com/typekit/webfontloader
  const LastResortFonts = {
    SERIF: 'serif',
    SANS_SERIF: 'sans-serif'
  };
  const watchRunners = {};

  class FontWatchRunner {
    constructor(font, testStr) {
      this.activeCallbacks = [];
      this.inactiveCallbacks = [];
      this.status = null;
      this.lastResortWidths_ = {};
      this.fontRulerA_ = new FontRuler(`${ font },${ LastResortFonts.SERIF }`, testStr);
      this.fontRulerB_ = new FontRuler(`${ font },${ LastResortFonts.SANS_SERIF }`, testStr);
      const lastResortRulerA = new FontRuler(`4px ${ LastResortFonts.SERIF }`, testStr);
      const lastResortRulerB = new FontRuler(`4px ${ LastResortFonts.SANS_SERIF }`, testStr);
      //start
      this.lastResortWidths_[LastResortFonts.SERIF] = lastResortRulerA.getWidth();
      this.lastResortWidths_[LastResortFonts.SANS_SERIF] = lastResortRulerB.getWidth();
      lastResortRulerA.remove();
      lastResortRulerB.remove();
      this.started_ = Date.now();
      this.check_();
    }

    static load(font, testStr, activeCallback, inactiveCallback) {
      const c = watchRunners[font] || (watchRunners[font] = {});
      testStr += '';
      let runner;
      if (c[testStr]) {
        runner = c[testStr];
      } else {
        runner = c[testStr] = new FontWatchRunner(font, testStr);
      }
      runner.then(activeCallback, inactiveCallback);
    }

    then(activeCallback, inactiveCallback) {
      if (this.status) {
        if (this.status !== 'ng') {
          activeCallback();
        } else {
          inactiveCallback();
        }
      } else {
        this.activeCallbacks.push(activeCallback);
        this.inactiveCallbacks.push(inactiveCallback);
      }
    }

    check_() {
      const widthA = this.fontRulerA_.getWidth();
      const widthB = this.fontRulerB_.getWidth();
      if (this.isFallbackFont_(widthA, widthB) ||
        this.isLastResortFont_(widthA, widthB)) {
        if (Date.now() - this.started_ >= 3000) {
          // timeout
          if (this.isLastResortFont_(widthA, widthB)) {
            this.finish_(this.activeCallbacks);
            this.status = 'ok';
          } else {
            this.finish_(this.inactiveCallbacks);
            this.status = 'ng';
          }
        } else {
          setTimeout(() => {
            this.check_();
          }, 50);
        }
      } else {
        this.finish_(this.activeCallbacks);
        this.status = 'ok';
      }
    }

    isFallbackFont_(a, b) {
      return (this.widthMatches_(a, LastResortFonts.SERIF) &&
        this.widthMatches_(b, LastResortFonts.SANS_SERIF));
    }

    widthsMatchLastResortWidths_(a, b) {
      for (const font in LastResortFonts) {
        if (LastResortFonts.hasOwnProperty(font)) {
          if (this.widthMatches_(a, LastResortFonts[font]) &&
            this.widthMatches_(b, LastResortFonts[font])) {
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
      HAS_WEBKIT_FALLBACK_BUG =
        !!match &&
        (parseInt(match[1], 10) < 536 ||
          (parseInt(match[1], 10) === 536 && parseInt(match[2], 10) <= 11));
    }
    return HAS_WEBKIT_FALLBACK_BUG;
  }

  const loads = {
    all: false
  };
  let load;
  let check;
  if (isNode$1) {
    load = (font, testStr, callback) => {
      callback();
    };
    check = () => {
      return false;
    };
  } else {
    const legacy = !document.fonts;
    load = legacy
      ? (font, testStr, callback) => {
        // for legacy(IE)
        if (loads[`${ font } @ ${ testStr }`]) {
          callback();
          return;
        }
        FontWatchRunner.load(font, testStr, () => {
          loads[`${ font } @ ${ testStr }`] = true;
          callback();
        }, () => {
          loads[`${ font } @ ${ testStr }`] = true;
          callback();
        });
      }
      : (font, testStr, callback) => {
        if (loads.all || loads[font]) {
          callback();
          return;
        }
        document.fonts.ready.then(() => {
          loads.all = true;
        });
        document.fonts.load(font).then(() => {
          loads[font] = true;
          callback();
        });
      };
    check = legacy
      ? (font, testStr) => {
        // for legacy(IE)
        if (loads[`${ font } @ ${ testStr }`]) {
          return true;
        }
        load(font, testStr, () => {
          // nothing
        });
        return false;
      }
      : (font, testStr) => {
        if (loads.all || loads[font]) {
          return true;
        }
        if (!document.fonts.check(font)) {
          load(font, testStr, () => {
            // nothing
          });
          return false;
        }
        return true;
      };
  }
  var fonts = {
    check,
    load
  };

  class InlineIcon extends Inline {
    constructor(icon) {
      super();
      this._icon = icon || {};
    }

    width({ ctx }) {
      const icon = this._icon;
      if (icon.width) {
        return icon.width;
      }
      if (icon.font && fonts.check(icon.font, icon.content || '')) {
        ctx.save();
        ctx.canvas.style.letterSpacing = 'normal';
        try {
          ctx.font = icon.font || ctx.font;
          return ctx.measureText(icon.content || '').width;
        } finally {
          ctx.canvas.style.letterSpacing = '';
          ctx.restore();
        }
      }
      return 0; // unknown
    }

    font() {
      var _a;
      return (_a = this._icon.font) !== null && _a !== void 0 ? _a : null;
    }

    color() {
      var _a;
      return (_a = this._icon.color) !== null && _a !== void 0 ? _a : null;
    }

    canDraw() {
      const icon = this._icon;
      return icon.font ? fonts.check(icon.font, icon.content || '') : true;
    }

    onReady(callback) {
      const icon = this._icon;
      if (icon.font && !fonts.check(icon.font, icon.content || '')) {
        fonts.load(icon.font, icon.content || '', callback);
      }
    }

    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
      const icon = this._icon;
      if (icon.content) {
        ctx.canvas.style.letterSpacing = 'normal';
        try {
          ctx.font = ctx.font; // To apply letterSpacing, we need to reset it.
          canvasHelper.fillTextRect(ctx, icon.content, rect.left, rect.top, rect.width, rect.height, {
            offset: offset + 1,
            padding: {
              bottom: offsetBottom,
              left: offsetLeft,
              right: offsetRight,
              top: offsetTop
            }
          });
        } finally {
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

  class InlineImage extends Inline {
    constructor({ src, width, height, imageLeft, imageTop, imageWidth, imageHeight }) {
      super();
      this._inlineImgPromise = null;
      this._inlineImg = null;
      this._src = src;
      this._width = width;
      this._height = height;
      this._imageLeft = imageLeft;
      this._imageTop = imageTop;
      this._imageWidth = imageWidth;
      this._imageHeight = imageHeight;
      this._onloaded = [];
      if (isPromise(src)) {
        src.then((s) => {
          this._src = s;
          this._loadImage(s);
        });
      } else {
        this._loadImage(src);
      }
    }

    width(_arg) {
      var _a, _b;
      return this._width || ((_b = (_a = this._inlineImg) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0);
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
      if (isPromise(this._src) || isPromise(this._inlineImgPromise)) {
        this._onloaded.push(() => callback());
      }
    }

    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
      const img = this._inlineImg;
      canvasHelper.drawInlineImageRect(ctx, img, this._imageLeft || 0, this._imageTop || 0, this._imageWidth || img.width, this._imageHeight || img.height, this._width || img.width, this._height || img.height, rect.left, rect.top, rect.width, rect.height, {
        offset: offset + 1,
        padding: {
          bottom: offsetBottom,
          left: offsetLeft,
          right: offsetRight,
          top: offsetTop
        }
      });
    }

    canBreak() {
      return false;
    }

    toString() {
      return '';
    }

    _loadImage(src) {
      const img = (this._inlineImgPromise = getCacheOrLoad('InlineImage', 50, src));
      if (isPromise(img)) {
        img.then((i) => {
          this._inlineImg = i;
          this._onloaded.forEach((fn) => fn());
        });
      } else {
        this._inlineImg = img;
      }
    }
  }

  class InlinePath2D extends Inline {
    constructor({ path, width, height, color }) {
      super();
      // Path2D的Polyfill不会反映在IE中，除非是这个时间
      const Path2D = path2DManager.getPath2D();
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
      var _a;
      return (_a = this._color) !== null && _a !== void 0 ? _a : null;
    }

    canDraw() {
      return true;
    }

    onReady(_callback) {
    }

    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
      offset++;
      const padding = {
        bottom: offsetBottom,
        left: offsetLeft,
        right: offsetRight,
        top: offsetTop
      };
      ctx.save();
      try {
        ctx.beginPath();
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        // clip
        ctx.clip();
        const pos = calcStartPosition(ctx, rect, this._width, this._height, {
          offset,
          padding
        });
        ctx.translate(pos.x, pos.y);
        ctx.fill(this._path);
      } finally {
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

  function buildSvgDataUrl(svg) {
    const data = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg);
    const url = `data:image/svg+xml;charset=utf-8,${ encodeURIComponent(data) }`; // svg -> base64
    return url;
  }

  function getSvgElement(svg) {
    let el;
    if (typeof svg === 'string') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const nodes = doc.children || doc.childNodes;
      el = nodes[0];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] instanceof SVGElement) {
          el = nodes[i];
          break;
        }
      }
    } else {
      el = svg;
    }
    return el;
  }

  class InlineSvg extends InlineImage {
    constructor({ svg, width, height }) {
      var _a, _b;
      const svgElem = then(svg, getSvgElement);
      const elmWidth = !isPromise(svgElem)
        ? (_a = svgElem.getAttribute('width')) !== null && _a !== void 0 ? _a : undefined
        : undefined;
      const elmHeight = !isPromise(svgElem)
        ? (_b = svgElem.getAttribute('height')) !== null && _b !== void 0 ? _b : undefined
        : undefined;
      const context = {
        full: 0,
        em: 0
      };
      const numElmWidth = elmWidth != null ? toPx(elmWidth, context) : undefined;
      const numElmHeight = elmHeight != null ? toPx(elmHeight, context) : undefined;
      super({
        src: then(svg, buildSvgDataUrl),
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

  function drawRegisteredIcon(ctx, icon, drawWidth, drawHeight, left, top, width, height, { offset = 2, padding } = {}) {
    const rect = {
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width
    };
    ctx.save();
    try {
      ctx.beginPath();
      ctx.rect(rect.left, rect.top, rect.width, rect.height);
      // clip
      ctx.clip();
      const pos = calcStartPosition(ctx, rect, drawWidth, drawHeight, {
        offset,
        padding
      });
      path2DManager.fill(icon, ctx, pos.x, pos.y, drawWidth, drawHeight);
    } finally {
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
    if (icon instanceof Inline) {
      return icon;
    }
    if (!icon) {
      return null;
    }
    if (isIconConstructorOption(icon)) {
      return new InlineIcon(icon);
    }
    if (isInlineImageConstructorOption(icon)) {
      return new InlineImage({
        height: icon.width,
        src: icon.src,
        width: icon.width
      });
    }
    if (icon.svg) {
      return new InlineSvg({
        height: icon.width,
        svg: icon.svg,
        width: icon.width
      });
    }
    if (isInlineSvgConstructorOption(icon)) {
      return new InlinePath2D({
        color: icon.color,
        height: icon.width,
        path: icon.path,
        width: icon.width
      });
    }
    const regedIcons = svgIcons.get();
    if (icon.name && regedIcons[icon.name]) {
      const regedIcon = regedIcons[icon.name];
      const width = icon.width || Math.max(regedIcon.width, regedIcon.height);
      return new InlineDrawer({
        draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
          drawRegisteredIcon(ctx, regedIcon, width, width, rect.left, rect.top, rect.width, rect.height, {
            offset: offset + 1,
            padding: {
              bottom: offsetBottom,
              left: offsetLeft,
              right: offsetRight,
              top: offsetTop
            }
          });
        },
        color: icon.color,
        height: width,
        width
      });
    }
    return new InlineIcon(icon);
  }

  function of(content) {
    if (!isDef(content)) {
      return null;
    }
    if (content instanceof Inline) {
      return content;
    }
    return new Inline(content);
  }

  function buildInlines$1(icons, inline) {
    const result = [];
    if (icons) {
      result.push(...icons.map((icon) => iconOf(icon)).filter(isDef));
    }
    if (Array.isArray(inline)
      // && inline.filter(il => il instanceof Inline).length <- ?
    ) {
      result.push(...inline.map((il) => of(il)).filter(isDef));
    } else {
      const il = of(inline);
      if (il) {
        result.push(il);
      }
    }
    return result;
  }

  function string(inline) {
    return buildInlines$1(undefined, inline).join('');
  }

  function getThemeColor(grid, ...names) {
    const gridThemeColor = getChainSafe(grid.theme, ...names);
    if (!isDef(gridThemeColor)) {
      // use default theme
      return getChainSafe(themes.getDefault(), ...names);
    }
    if (typeof gridThemeColor !== 'function') {
      return gridThemeColor;
    }
    let defaultThemeColor;
    return ((args) => {
      const color = gridThemeColor(args);
      if (isDef(color)) {
        // use grid theme
        return color;
      }
      // use default theme
      defaultThemeColor =
        defaultThemeColor || getChainSafe(themes.getDefault(), ...names);
      return getOrApply(defaultThemeColor, args);
    });
  }

  class ThemeResolver {
    constructor(grid) {
      this._checkbox = null;
      this._radioButton = null;
      this._button = null;
      this._header = null;
      this._switch = null;
      this._tree = null;
      this._grid = grid;
    }

    getThemeColor(...name) {
      return getThemeColor(this._grid, ...name);
    }

    get underlayBackgroundColor() {
      return getThemeColor(this._grid, 'underlayBackgroundColor');
    }

    // font
    get font() {
      return getThemeColor(this._grid, 'font');
    }

    get frozenRowsFont() {
      return getThemeColor(this._grid, 'frozenRowsFont');
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

    get focusBgColor() {
      return getThemeColor(this._grid, 'focusBgColor');
    }

    get selectionBgColor() {
      return getThemeColor(this._grid, 'selectionBgColor');
    }

    get highlightBgColor() {
      return getThemeColor(this._grid, 'highlightBgColor');
    }

    get selectionDragBgColor() {
      return getThemeColor(this._grid, 'selectionDragBgColor');
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

    // grid border
    get gridBorderColor() {
      return getThemeColor(this._grid, 'gridBorderColor');
    }

    get gridBorderWidth() {
      return getThemeColor(this._grid, 'gridBorderWidth');
    }

    // size
    get defaultRowHeight() {
      return getThemeColor(this._grid, 'defaultRowHeight');
    }

    get defaultColWidth() {
      return getThemeColor(this._grid, 'defaultColWidth');
    }

    get highlightBorderWidth() {
      return getThemeColor(this._grid, 'highlightBorderWidth');
    }

    // other
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

    get switch() {
      const grid = this._grid;
      return (this._switch ||
        (this._switch = {
          get uncheckBgColor() {
            return getThemeColor(grid, 'switch', 'uncheckBgColor');
          },
          get checkBgColor() {
            return getThemeColor(grid, 'switch', 'checkBgColor');
          },
          get borderColor() {
            return getThemeColor(grid, 'switch', 'borderColor');
          }
        }));
    }

    get tree() {
      const grid = this._grid;
      return (this._tree ||
        (this._tree = {
          get lineColor() {
            return getThemeColor(grid, 'tree', 'lineColor');
          },
          get buttonColor() {
            return getThemeColor(grid, 'tree', 'buttonColor');
          },
          get buttonBgColor() {
            return getThemeColor(grid, 'tree', 'buttonBgColor');
          },
          get buttonBorderColor() {
            return getThemeColor(grid, 'tree', 'buttonBorderColor');
          },
          get linkColor() {
            return getThemeColor(grid, 'tree', 'linkColor');
          }
        }));
    }
  }

  var SwitchStyle;
  (function (SwitchStyle) {
    SwitchStyle[SwitchStyle['default'] = 0] = 'default';
    SwitchStyle[SwitchStyle['iPhone'] = 1] = 'iPhone';
  })(SwitchStyle || (SwitchStyle = {}));
  const SWITCH_STYLE = SwitchStyle.default;
  const INLINE_ELLIPSIS = of('\u2026');

  function invalidateCell(context, grid) {
    grid.invalidateCell(context.col, context.row);
  }

  function getColor(color, col, row, grid, context) {
    return getOrApply(color, {
      col,
      context,
      grid,
      row
    });
  }

  function getFont(font, col, row, grid, context) {
    if (font == null) {
      return undefined;
    }
    return getOrApply(font, {
      col,
      row,
      grid,
      context
    });
  }

  function testFontLoad(font, value, context, grid) {
    if (font) {
      if (!fonts.check(font, value)) {
        fonts.load(font, value, () => invalidateCell(context, grid));
        return false;
      }
    }
    return true;
  }

  function getGridThemeColor(grid, theme, col, row, color) {
    if (!color) {
      ({ color } = theme);
      // header color
      const isFrozenCell = grid.isFrozenCell(col, row);
      if (isFrozenCell && isFrozenCell.row) {
        color = theme.frozenRowsColor;
      }
    }
    return color;
  }

  function getGridThemeFont(grid, theme, col, row, font) {
    if (!font) {
      ({ font } = theme);
      // header color
      const isFrozenCell = grid.isFrozenCell(col, row);
      if (isFrozenCell && isFrozenCell.row) {
        font = theme.frozenRowsFont;
      }
    }
    return font;
  }

  function drawInlines(ctx, inlines, rect, offset, offsetTop, offsetBottom, col, row, grid) {
    function drawInline(inline, offsetLeft, offsetRight) {
      if (inline.canDraw()) {
        ctx.save();
        try {
          ctx.fillStyle = getColor(inline.color() || ctx.fillStyle, col, row, grid, ctx);
          ctx.font = inline.font() || ctx.font;
          inline.draw({
            canvasHelper,
            ctx,
            offset,
            offsetBottom,
            offsetLeft,
            offsetRight,
            offsetTop,
            rect
          });
        } finally {
          ctx.restore();
        }
      } else {
        inline.onReady(() => grid.invalidateCell(col, row));
        // noop
      }
    }

    if (inlines.length === 1) {
      // 长度为1时，不需要计算宽度
      const inline = inlines[0];
      drawInline(inline, 0, 0);
    } else if (inlines.length > 1) {
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
    return buildInlines$1(icons, isDef(inline) ? inline : '');
  }

  function inlineToString(inline) {
    return string(inline);
  }

  function getOverflowInline(textOverflow) {
    if (!isAllowOverflow(textOverflow) || textOverflow === 'ellipsis') {
      return INLINE_ELLIPSIS;
    }
    textOverflow = textOverflow.trim();
    if (textOverflow.length === 1) {
      return of(textOverflow[0]);
    }
    return INLINE_ELLIPSIS;
  }

  function isAllowOverflow(textOverflow) {
    return !!(textOverflow &&
      textOverflow !== 'clip' &&
      typeof textOverflow === 'string');
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
        afterInlines: [],
        beforeInlines: inlines,
        overflow: false
      };
    }
    const index = indexData.index;
    const remWidth = indexData.remWidth;
    const inline = inlines[index];
    const beforeInlines = inlines.slice(0, index);
    const afterInlines = [];
    if (inline.canBreak()) {
      const breakWord = inline.breakWord(ctx, remWidth);
      let before = breakWord.before;
      let after = breakWord.after;
      if (!before && !beforeInlines.length) {
        ({ before, after } = inline.breakAll(ctx, remWidth));
      }
      if (!before && !beforeInlines.length) {
        ({ before, after } = inline.splitIndex(1));
      }
      if (before) {
        beforeInlines.push(before);
      }
      if (after) {
        afterInlines.push(after);
      }
      afterInlines.push(...inlines.slice(index + 1));
    } else {
      if (!beforeInlines.length) {
        // Always return one char
        beforeInlines.push(inline);
      }
      afterInlines.push(...inlines.slice(beforeInlines.length));
    }
    return {
      afterInlines,
      beforeInlines,
      overflow: true
    };
  }

  function truncateInlines(ctx, inlines, width, offset, option) {
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
    const remWidth = width - lineWidth - ellipsisWidth - offset - 1;
    const result = inlines.slice(0, index);
    if (inline.canBreak()) {
      const before = inline.breakAll(ctx, remWidth).before;
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
    // 文字style
    ctx.fillStyle = getColor(color || ctx.fillStyle, col, row, grid, ctx);
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font || ctx.font;
    let inlines = buildInlines(icons, inline);
    if (isAllowOverflow(textOverflow) &&
      isOverflowInlines(ctx, inlines, rect.width)) {
      const { inlines: truncInlines, overflow } = truncateInlines(ctx, inlines, rect.width, offset, textOverflow);
      inlines = truncInlines;
      grid.setCellOverflowText(col, row, overflow && inlineToString(inline));
    } else {
      grid.setCellOverflowText(col, row, false);
    }
    drawInlines(ctx, inlines, rect, offset, 0, 0, col, row, grid);
  }

  function _multiInlineRect(grid, ctx, multiInlines, rect, col, row, { offset, color, textAlign, textBaseline, font, lineHeight, autoWrapText, lineClamp, textOverflow, icons }) {
    // 文字style
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
      const width = rect.width;
      buildedMultiInlines = [];
      const procLineClamp = lineClamp > 0
        ? (inlines, hasNext) => {
          if (buildedMultiInlines.length + 1 >= lineClamp) {
            if (inlines.length === 0 && hasNext) {
              buildedMultiInlines.push([getOverflowInline(textOverflow)]);
              grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
            } else {
              const tis = truncateInlines(ctx, inlines, width, offset, textOverflow);
              const truncInlines = tis.inlines;
              const overflow = tis.overflow;
              buildedMultiInlines.push(hasNext && !overflow
                ? truncInlines.concat([getOverflowInline(textOverflow)])
                : truncInlines);
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
            const { inlines: truncInlines, overflow } = truncateInlines(ctx, inlines, width, offset, textOverflow);
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
    } else {
      grid.setCellOverflowText(col, row, false);
      buildedMultiInlines = multiInlines.map((inline, lineRow) => buildInlines(lineRow === 0 ? icons : undefined, inline));
    }
    let paddingTop = 0;
    let paddingBottom = lineHeight * (buildedMultiInlines.length - 1);
    if (ctx.textBaseline === 'top' || ctx.textBaseline === 'hanging') {
      const em = getFontSize(ctx, ctx.font).height;
      const pad = (lineHeight - em) / 2;
      paddingTop += pad;
      paddingBottom -= pad;
    } else if (ctx.textBaseline === 'bottom' ||
      ctx.textBaseline === 'alphabetic' ||
      ctx.textBaseline === 'ideographic') {
      const em = getFontSize(ctx, ctx.font).height;
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

  function gridDrawCheckbox(ctx, rect, col, row, check, helper, {
    animElapsedTime = 1,
    uncheckBgColor = helper.theme.checkbox.uncheckBgColor,
    checkBgColor = helper.theme.checkbox.checkBgColor,
    borderColor = helper.theme.checkbox.borderColor,
    textAlign = 'center',
    textBaseline = 'middle'
  } = {}, positionOpt = {}) {
    const boxWidth = canvasHelper.measureCheckbox(ctx).width;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const pos = calcStartPosition(ctx, rect, boxWidth + 1 /*分割线+1*/, boxWidth + 1 /*分割线+1*/, positionOpt);
    uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
    checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
    borderColor = helper.getColor(borderColor, col, row, ctx);
    if (0 < animElapsedTime && animElapsedTime < 1) {
      uncheckBgColor = check
        ? uncheckBgColor
        : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
      checkBgColor = check
        ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
        : checkBgColor;
    }
    canvasHelper.drawCheckbox(ctx, pos.x, pos.y, check ? animElapsedTime : false, {
      borderColor,
      checkBgColor,
      uncheckBgColor
    });
  }

  function gridDrawRadioButton(ctx, rect, col, row, check, helper, {
    animElapsedTime = 1,
    checkColor = helper.theme.radioButton.checkColor,
    uncheckBorderColor = helper.theme.radioButton.uncheckBorderColor,
    checkBorderColor = helper.theme.radioButton.checkBorderColor,
    uncheckBgColor = helper.theme.radioButton.uncheckBgColor,
    checkBgColor = helper.theme.radioButton.checkBgColor,
    textAlign = 'center',
    textBaseline = 'middle'
  }, positionOpt = {}) {
    const boxWidth = canvasHelper.measureRadioButton(ctx).width;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const pos = calcStartPosition(ctx, rect, boxWidth + 1 /*罫線分+1*/, boxWidth + 1 /*罫線分+1*/, positionOpt);
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
      bgColor = check
        ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
        : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
    }
    canvasHelper.drawRadioButton(ctx, pos.x, pos.y, check ? animElapsedTime : 1 - animElapsedTime, {
      checkColor,
      borderColor,
      bgColor
    });
  }

  function getSwitchBtnSize(rect, ctx, textOn, textOff) {
    if (SWITCH_STYLE === SwitchStyle.default) {
      const font = ctx.font;
      ctx.font = '12px sans-serif';
      const w = Math.max(ctx.measureText(textOn || '是').width, ctx.measureText(textOff || '否').width) - 12;
      ctx.font = font;
      return {
        height: 22,
        width: 44 + w
      };
    } else {
      const height = rect.height - rect.height / 4;
      const width = height * 1.625;
      return {
        height,
        width
      };
    }
  }

  function gridDrawSwitchBtn(ctx, rect, col, row, check, helper, info = {}, positionOpt = {}) {
    const animElapsedTime = info.animElapsedTime === undefined ? 1 : info.animElapsedTime;
    let uncheckBgColor = info.uncheckBgColor || helper.theme.switch.uncheckBgColor;
    let checkBgColor = info.checkBgColor || helper.theme.switch.checkBgColor;
    let borderColor = info.borderColor || helper.theme.switch.borderColor;
    const textAlign = info.textAlign || 'center';
    const textBaseline = info.textBaseline || 'middle';
    const textOn = info.textOn;
    const textOff = info.textOff;
    const btnSize = getSwitchBtnSize(rect, ctx, textOn, textOff);
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const pos = calcStartPosition(ctx, rect, btnSize.width + 1 /*分割线+1*/, btnSize.height + 1 /*分割线+1*/, positionOpt);
    uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
    checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
    borderColor = helper.getColor(borderColor, col, row, ctx);
    borderColor = style$3.toBoxArray(borderColor).find((v) => v);
    const draw = SWITCH_STYLE === SwitchStyle.default
      ? canvasHelper.drawSwitchButton
      : canvasHelper.drawSwitchBtn;
    draw(ctx, pos.x, pos.y, check, animElapsedTime, {
      borderColor,
      checkBgColor,
      uncheckBgColor,
      btnSize,
      textOn,
      textOff
    });
  }

  function strokeRect(ctx, color, left, top, width, height) {
    if (!Array.isArray(color)) {
      if (color) {
        ctx.strokeStyle = color;
        ctx.strokeRect(left, top, width, height);
      }
    } else {
      const borderColors = style$3.toBoxArray(color);
      canvasHelper.strokeColorsRect(ctx, borderColors, left, top, width, height);
    }
  }

  class GridCanvasHelper {
    constructor(grid) {
      this._grid = grid;
      this._theme = new ThemeResolver(grid);
    }

    createCalculator(context, font) {
      return {
        calcWidth(width) {
          return toPx(width, {
            get full() {
              const rect = context.getRect();
              return rect.width;
            },
            get em() {
              return getFontSize(context.getContext(), font).width;
            }
          });
        },
        calcHeight(height) {
          return toPx(height, {
            get full() {
              const rect = context.getRect();
              return rect.height;
            },
            get em() {
              return getFontSize(context.getContext(), font).height;
            }
          });
        }
      };
    }

    getColor(color, col, row, ctx) {
      return getColor(color, col, row, this._grid, ctx);
    }

    toBoxArray(obj) {
      return style$3.toBoxArray(obj);
    }

    toBoxPixelArray(value, context, font) {
      if (typeof value === 'string' || Array.isArray(value)) {
        const calculator = this.createCalculator(context, font);
        const box = style$3.toBoxArray(value);
        return [
          calculator.calcHeight(box[0]),
          calculator.calcWidth(box[1]),
          calculator.calcHeight(box[2]),
          calculator.calcWidth(box[3])
        ];
      }
      return style$3.toBoxArray(value);
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
      if (ctx) {
        ctx.save();
        try {
          ctx.beginPath();
          ctx.rect(drawRect.left, drawRect.top, drawRect.width, drawRect.height);
          // clip
          ctx.clip();
          draw(ctx);
        } finally {
          ctx.restore();
        }
      }
    }

    drawBorderWithClip(context, draw) {
      const drawRect = context.getDrawRect();
      if (!drawRect) {
        return;
      }
      const rect = context.getRect();
      const ctx = context.getContext();
      if (ctx) {
        ctx.save();
        try {
          ctx.lineCap = 'square';
          // 对于划线clip
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
        } finally {
          ctx.restore();
        }
      }
    }

    getTextRect(text, context, { padding, offset = 2, textAlign = 'left', textBaseline = 'middle', font, textOverflow = 'clip', icons } = {}) {
      let rect = context.getRect();
      const drawRect = context.getDrawRect();
      const ctx = context.getContext();
      const { col, row } = context;
      font = getGridThemeFont(this._grid, this.theme, col, row, font);
      if (drawRect && ctx) {
        ctx.save();
        try {
          font = getFont(font, context.col, context.row, this._grid, ctx);
          if (padding) {
            const paddingNums = this.toBoxPixelArray(padding, context, font);
            const left = rect.left + paddingNums[3];
            const top = rect.top + paddingNums[0];
            const width = rect.width - paddingNums[1] - paddingNums[3];
            const height = rect.height - paddingNums[0] - paddingNums[2];
            rect = new Rect(left, top, width, height);
          }
          // 文字style
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = font || ctx.font;
          let inlines = buildInlines(icons, text);
          if (isAllowOverflow(textOverflow) &&
            isOverflowInlines(ctx, inlines, rect.width)) {
            const truncInlines = truncateInlines(ctx, inlines, rect.width, offset, textOverflow).inlines;
            inlines = truncInlines;
          }
          const inlineWidths = inlines.map((inline) => (inline.width({ ctx }) || 0) - 0);
          const offsetBottom = 0;
          const offsetTop = 0;
          let offsetRight = inlineWidths.length > 0 ? inlineWidths.reduce((a, b) => a + b) : 0;
          let offsetLeft = 0;
          let rectLeft = rect.right;
          let rectTop = rect.bottom;
          let rectRight = 0;
          let rectBottom = 0;
          inlines.forEach((inline, index) => {
            const inlineWidth = inlineWidths[index];
            offsetRight -= inlineWidth;
            ctx.font = inline.font() || ctx.font;
            const inlineHeight = getFontSize(ctx, ctx.font).height;
            const pos = calcStartPosition(ctx, {
              bottom: rect.top + rect.height,
              height: rect.height,
              left: rect.left,
              right: rect.left + rect.width,
              top: rect.top,
              width: rect.width
            }, inlineWidth, inlineHeight, {
              offset: offset + 1,
              padding: {
                bottom: offsetBottom,
                left: offsetLeft,
                right: offsetRight,
                top: offsetTop
              }
            });
            rectLeft = Math.floor(Math.min(rectLeft, pos.x));
            rectTop = Math.floor(Math.min(rectTop, pos.y));
            rectRight = Math.ceil(Math.max(rectRight, pos.x + inlineWidth));
            rectBottom = Math.ceil(Math.max(rectBottom, pos.y + inlineHeight));
            offsetLeft += inlineWidth;
          });
          rect = new Rect(Math.min(rectLeft, rectRight), Math.min(rectTop, rectBottom), Math.abs(rectRight - rectLeft), Math.abs(rectBottom - rectTop));
        } finally {
          ctx.restore();
        }
      }
      return rect;
    }

    text(text, context, { padding, offset = 2, color, textAlign = 'left', textBaseline = 'middle', font, textOverflow = 'clip', icons } = {}) {
      let rect = context.getRect();
      const { col, row } = context;
      color = getGridThemeColor(this._grid, this.theme, col, row, color);
      font = getGridThemeFont(this._grid, this.theme, col, row, font);
      this.drawWithClip(context, (ctx) => {
        font = getFont(font, context.col, context.row, this._grid, ctx);
        if (padding) {
          const paddingNums = this.toBoxPixelArray(padding, context, font);
          const left = rect.left + paddingNums[3];
          const top = rect.top + paddingNums[0];
          const width = rect.width - paddingNums[1] - paddingNums[3];
          const height = rect.height - paddingNums[0] - paddingNums[2];
          rect = new Rect(left, top, width, height);
        }
        _inlineRect(this._grid, ctx, text, rect, col, row, {
          color,
          font,
          icons,
          offset,
          textAlign,
          textBaseline,
          textOverflow
        });
      });
    }

    multilineText(multilines, context, {
      padding,
      offset = 2,
      color,
      textAlign = 'left',
      textBaseline = 'middle',
      font,
      lineHeight = '1em',
      autoWrapText = false,
      lineClamp = 0,
      textOverflow = 'clip',
      icons
    } = {}) {
      let rect = context.getRect();
      const { col, row } = context;
      color = getGridThemeColor(this._grid, this.theme, col, row, color);
      font = getGridThemeFont(this._grid, this.theme, col, row, font);
      this.drawWithClip(context, (ctx) => {
        font = getFont(font, context.col, context.row, this._grid, ctx);
        if (padding) {
          const paddingNums = this.toBoxPixelArray(padding, context, font);
          const left = rect.left + paddingNums[3];
          const top = rect.top + paddingNums[0];
          const width = rect.width - paddingNums[1] - paddingNums[3];
          const height = rect.height - paddingNums[0] - paddingNums[2];
          rect = new Rect(left, top, width, height);
        }
        const calculator = this.createCalculator(context, font);
        lineHeight = calculator.calcHeight(lineHeight);
        _multiInlineRect(this._grid, ctx, multilines, rect, col, row, {
          autoWrapText,
          color,
          font,
          icons,
          lineClamp,
          lineHeight,
          offset,
          textAlign,
          textBaseline,
          textOverflow
        });
      });
    }

    fillText(text, x, y, context, { color, textAlign = 'left', textBaseline = 'top', font } = {}) {
      const { col, row } = context;
      color = getGridThemeColor(this._grid, this.theme, col, row, color);
      font = getGridThemeFont(this._grid, this.theme, col, row, font);
      const ctx = context.getContext();
      ctx.save();
      try {
        font = getFont(font, context.col, context.row, this._grid, ctx);
        ctx.fillStyle = getColor(color, col, row, this._grid, ctx);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font || ctx.font;
        ctx.fillText(text, x, y);
      } finally {
        ctx.restore();
      }
    }

    clearCell(context) {
      const rect = context.getRect();
      this.drawWithClip(context, (ctx) => {
        ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
      });
    }

    fillCell(context, { fillColor = this.theme.defaultBgColor, selectionColor } = {}) {
      const rect = context.getRect();
      this.drawWithClip(context, (ctx) => {
        const col = context.col;
        const row = context.row;
        ctx.fillStyle = getColor(fillColor, col, row, this._grid, ctx);
        ctx.beginPath();
        ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        ctx.fill();
        if (selectionColor) {
          ctx.fillStyle = getColor(selectionColor, col, row, this._grid, ctx);
          ctx.fill();
        }
      });
    }

    fillCellWithState(context, option = {}) {
      option.fillColor = this.getFillColorState(context, option);
      if (option.isEditing) {
        delete option.selectionColor;
        delete option.isEditing;
      } else {
        option.selectionColor = this.getSelectionColorState(context, option);
      }
      this.fillCell(context, option);
    }

    fillRect(rect, context, { fillColor = this.theme.defaultBgColor, selectionColor } = {}) {
      const ctx = context.getContext();
      ctx.save();
      try {
        const col = context.col;
        const row = context.row;
        ctx.fillStyle = getColor(fillColor, col, row, this._grid, ctx);
        ctx.beginPath();
        ctx.rect(rect.left, rect.top, rect.width, rect.height);
        ctx.fill();
        if (selectionColor) {
          ctx.fillStyle = getColor(selectionColor, col, row, this._grid, ctx);
          ctx.fill();
        }
      } finally {
        ctx.restore();
      }
    }

    fillRectWithState(rect, context, option = {}) {
      option.fillColor = this.getFillColorState(context, option);
      option.selectionColor = this.getSelectionColorState(context, option);
      this.fillRect(rect, context, option);
    }

    getSelectionColorState(context, option = {}) {
      const sel = context.getSelection();
      const { col, row } = context;
      if (option.selectionColor) {
        return option.selectionColor;
      } else if (sel.dragged) {
        return this.theme.selectionDragBgColor;
      } else if (!cellInRange(context.range, sel.select.col, sel.select.row) &&
        cellInRange(sel.range, col, row)) {
        return this.theme.selectionBgColor;
      } else if (cellInRange(context.range, sel.select.col, sel.select.row) &&
        cellInRange(sel.range, col, row)) {
        return this.theme.focusBgColor;
      } else {
        return undefined;
      }
    }

    getFillColorState(context, option = {}) {
      const sel = context.getSelection();
      const { col, row } = context;
      if (!cellInRange(context.range, sel.select.col, sel.select.row) &&
        cellInRange(sel.range, col, row)) {
        return this.theme.selectionBgColor;
      }
      if (option.fillColor) {
        return option.fillColor;
      }
      if (cellInRange(context.range, sel.select.col, sel.select.row)) {
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
        const col = context.col;
        const row = context.row;
        let left = rect.left;
        let top = rect.top;
        let width = rect.width;
        let height = rect.height;
        if (col === 0) {
          left += lineWidth;
          width -= lineWidth;
        }
        if (row === 0) {
          top += lineWidth;
          height -= lineWidth;
        }
        const borderColors = getColor(borderColor, col, row, this._grid, ctx);
        if (lineWidth === 1) {
          ctx.lineWidth = 1;
          strokeRect(ctx, borderColors, left - 0.5, top - 0.5, width, height);
        } else if (lineWidth === 2) {
          ctx.lineWidth = 2;
          strokeRect(ctx, borderColors, left, top, width - 1, height - 1);
        } else {
          ctx.lineWidth = lineWidth;
          const startOffset = lineWidth / 2 - 1;
          strokeRect(ctx, borderColors, left + startOffset, top + startOffset, width - lineWidth + 1, height - lineWidth + 1);
        }
      });
    }

    borderSelection(context, option = {}) {
      const col = context.col;
      const row = context.row;
      const border = context.getSelection().border;
      const rect = context.getRect();
      const drawRect = context.getDrawRect() || rect;
      // header color
      const isFrozenCell = this._grid.isFrozenCell(col, row);
      if (isFrozenCell && isFrozenCell.row) {
        option.borderColor = this.theme.frozenRowsBorderColor;
      }
      option.lineWidth = 1;
      this.border(context, option);
      // 编辑中不绘制选择边框
      if (option.isEditing) {
        return;
      }
      let highlightBorderWidth = 1;
      if (option.highlightBorderWidth !== undefined) {
        highlightBorderWidth = option.highlightBorderWidth;
      }
      // 画边框
      if (border.top || border.right || border.bottom || border.left) {
        this.drawBorderWithClip(context, (ctx) => {
          const borderColor = getColor(this.theme.highlightBorderColor, col, row, this._grid, ctx);
          const borderColors = style$3.toBoxArray(borderColor);
          ctx.lineWidth = highlightBorderWidth;
          if (ctx.lineWidth > 0) {
            const offset = ctx.lineWidth / 2;
            if (row === 0) {
              rect.top += offset;
            }
            if (col === 0) {
              rect.left += offset;
            }
            if (border.top) {
              ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
              ctx.beginPath();
              ctx.moveTo(rect.left, rect.top);
              ctx.lineTo(rect.right - offset, rect.top);
              ctx.stroke();
            }
            if (border.right) {
              ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
              ctx.beginPath();
              ctx.moveTo(rect.right - offset, rect.top);
              ctx.lineTo(rect.right - offset, rect.bottom - offset);
              ctx.stroke();
            }
            if (border.bottom) {
              ctx.strokeStyle = borderColors[2] || ctx.strokeStyle;
              ctx.beginPath();
              ctx.moveTo(rect.right - offset, rect.bottom - offset);
              ctx.lineTo(rect.left, rect.bottom - offset);
              ctx.stroke();
            }
            if (border.left) {
              ctx.strokeStyle = borderColors[3] || ctx.strokeStyle;
              ctx.beginPath();
              ctx.moveTo(rect.left, rect.bottom - offset);
              ctx.lineTo(rect.left, rect.top);
              ctx.stroke();
            }
          }
          if (border.right && border.bottom && this._grid.canDragSelection) {
            // 右下角拖动点（斜杠）
            // const x = drawRect.right
            // const y = drawRect.bottom
            // ctx.lineWidth = 1
            // ctx.strokeStyle =
            //   borderColors[1] || borderColors[2] || ctx.strokeStyle
            // ctx.beginPath()
            // ctx.moveTo(x - 8, y - 3)
            // ctx.lineTo(x - 3, y - 8)
            // ctx.moveTo(x - 5, y - 3)
            // ctx.lineTo(x - 3, y - 5)
            // ctx.stroke()
            // 右下角拖动点（加号）
            const x = drawRect.right;
            const y = drawRect.bottom;
            ctx.lineWidth = 0;
            ctx.fillStyle = calcElapsedColor((borderColors[1] || ctx.strokeStyle), (borderColors[1] || ctx.strokeStyle), 0.5);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 11);
            ctx.lineTo(x - 11, y);
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.getColor(option.bgColor || this.theme.defaultBgColor, col, row, ctx);
            ctx.beginPath();
            ctx.moveTo(x - 3.5, y - 5);
            ctx.lineTo(x - 3.5, y - 2);
            ctx.moveTo(x - 5, y - 3.5);
            ctx.lineTo(x - 2, y - 3.5);
            ctx.stroke();
          }
        });
      }
      // 额外处理
      const range = this._grid.selection.range;
      if (range.start.row <= row &&
        range.end.row >= row &&
        range.end.col === col - 1) {
        // 左边被选中
        this.drawBorderWithClip(context, (ctx) => {
          const borderColor = getColor(this.theme.highlightBorderColor, col - 1, row, this._grid, ctx);
          const borderColors = style$3.toBoxArray(borderColor);
          ctx.lineWidth = 1;
          ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
          ctx.beginPath();
          ctx.moveTo(rect.left - 0.5, rect.top);
          ctx.lineTo(rect.left - 0.5, rect.bottom);
          ctx.stroke();
        });
      } else if (range.start.col <= col &&
        range.end.col >= col &&
        range.end.row === row - 1) {
        // 顶部被选中
        this.drawBorderWithClip(context, (ctx) => {
          const borderColor = getColor(this.theme.highlightBorderColor, col, row - 1, this._grid, ctx);
          const borderColors = style$3.toBoxArray(borderColor);
          ctx.lineWidth = 1;
          ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
          ctx.beginPath();
          ctx.moveTo(rect.left, rect.top - 0.5);
          ctx.lineTo(rect.right, rect.top - 0.5);
          ctx.stroke();
        });
      }
    }

    // public borderWithState(
    //   context: CellContext,
    //   option: { borderColor?: ColorsPropertyDefine; lineWidth?: number } = {}
    // ): void {
    //   const rect = context.getRect()
    //   const state = context.getSelectState()
    //   const { col, row } = context
    //   // 划线
    //   if (state.selected) {
    //     option.borderColor = this.theme.highlightBorderColor
    //     option.lineWidth = 2
    //     this.border(context, option)
    //   } else {
    //     // header color
    //     const isFrozenCell = this._grid.isFrozenCell(col, row)
    //     if (isFrozenCell && isFrozenCell.row) {
    //       option.borderColor = this.theme.frozenRowsBorderColor
    //     }
    //     option.lineWidth = 1
    //     this.border(context, option)
    //     // 额外处理
    //     const sel = this._grid.selection.select
    //     if (sel.col + 1 === col && sel.row === row) {
    //       // 左边被选中
    //       this.drawBorderWithClip(context, ctx => {
    //         const borderColors = style.toBoxArray(
    //           getColor(
    //             this.theme.highlightBorderColor,
    //             sel.col,
    //             sel.row,
    //             this._grid,
    //             ctx
    //           )
    //         )
    //         ctx.lineWidth = 1
    //         ctx.strokeStyle = borderColors[1] || ctx.strokeStyle
    //         ctx.beginPath()
    //         ctx.moveTo(rect.left - 0.5, rect.top)
    //         ctx.lineTo(rect.left - 0.5, rect.bottom)
    //         ctx.stroke()
    //       })
    //     } else if (sel.col === col && sel.row + 1 === row) {
    //       // 顶部被选中
    //       this.drawBorderWithClip(context, ctx => {
    //         const borderColors = style.toBoxArray(
    //           getColor(
    //             this.theme.highlightBorderColor,
    //             sel.col,
    //             sel.row,
    //             this._grid,
    //             ctx
    //           )
    //         )
    //         ctx.lineWidth = 1
    //         ctx.strokeStyle = borderColors[0] || ctx.strokeStyle
    //         ctx.beginPath()
    //         ctx.moveTo(rect.left, rect.top - 0.5)
    //         ctx.lineTo(rect.right, rect.top - 0.5)
    //         ctx.stroke()
    //       })
    //     }
    //   }
    // }
    buildCheckBoxInline(check, context, option = {}) {
      const self = this;
      const boxWidth = canvasHelper.measureCheckbox(context.getContext()).width;

      function draw(info) {
        const col = context.col;
        const row = context.row;
        gridDrawCheckbox(info.ctx, info.rect, col, row, check, self, option, {
          offset: info.offset + 1,
          padding: {
            bottom: info.offsetBottom,
            left: info.offsetLeft + 1,
            right: info.offsetRight,
            top: info.offsetTop
          }
        });
      }

      return new InlineDrawer({
        color: undefined,
        draw,
        height: boxWidth + 1,
        width: boxWidth + 3
      });
    }

    buildSwitchBtnInline(check, context, option = {}) {
      const self = this;
      const btnSize = getSwitchBtnSize(context.getRect(), context.getContext(), option.textOn, option.textOff);

      function draw(info) {
        const col = context.col;
        const row = context.row;
        gridDrawSwitchBtn(info.ctx, info.rect, col, row, check, self, option, {
          offset: info.offset + 1,
          padding: {
            bottom: info.offsetBottom,
            left: info.offsetLeft + 1,
            right: info.offsetRight,
            top: info.offsetTop
          }
        });
      }

      return new InlineDrawer({
        color: undefined,
        draw,
        height: btnSize.height + 1,
        width: btnSize.width + 3
      });
    }

    checkbox(check, context, option = {}) {
      this.drawWithClip(context, (ctx) => {
        const { col, row } = context;
        gridDrawCheckbox(ctx, context.getRect(), col, row, check, this, option);
      });
    }

    radioButton(check, context, option = {}) {
      this.drawWithClip(context, (ctx) => {
        const { col, row } = context;
        gridDrawRadioButton(ctx, context.getRect(), col, row, check, this, option);
      });
    }

    switch(check, context, option = {}) {
      this.drawWithClip(context, (ctx) => {
        const col = context.col;
        const row = context.row;
        gridDrawSwitchBtn(ctx, context.getRect(), col, row, check, this, option);
      });
    }

    button(caption, context, {
      bgColor = this.theme.button.bgColor,
      padding,
      offset = 2,
      color = this.theme.button.color,
      textAlign = 'center',
      textBaseline = 'middle',
      shadow,
      font,
      textOverflow = 'clip',
      icons
    } = {}) {
      const rect = context.getRect();
      this.drawWithClip(context, (ctx) => {
        font = getFont(font, context.col, context.row, this._grid, ctx);
        const col = context.col;
        const row = context.row;
        const paddingNums = this.toBoxPixelArray(padding || rect.height / 8, context, font);
        const left = rect.left + paddingNums[3];
        const top = rect.top + paddingNums[0];
        const width = rect.width - paddingNums[1] - paddingNums[3];
        const height = rect.height - paddingNums[0] - paddingNums[2];
        bgColor = getColor(bgColor, context.col, context.row, this._grid, ctx);
        canvasHelper.drawButton(ctx, left, top, width, height, {
          bgColor,
          // offset,
          radius: rect.height / 8,
          shadow
        });
        _inlineRect(this._grid, ctx, caption, new Rect(left, top, width, height), col, row, {
          color,
          font,
          icons,
          offset,
          textAlign,
          textBaseline,
          textOverflow
        });
      });
    }

    testFontLoad(font, value, context) {
      return testFontLoad(font, value, context, this._grid);
    }

    tree(text, context, {
      font,
      offset = 2,
      color,
      lineColor = this.theme.tree.lineColor,
      buttonColor = this.theme.tree.buttonColor,
      buttonBgColor = this.theme.tree.buttonBgColor,
      buttonBorderColor = this.theme.tree.buttonBorderColor,
      icons,
      padding,
      textAlign = 'left',
      textBaseline = 'middle',
      textOverflow = 'clip',
      treeInfo,
      treeNodeSpace = 0,
      isMultilineText = false,
      autoWrapText = false,
      lineHeight = '1em',
      lineClamp = 0
    } = {}) {
      let rect = context.getRect();
      const col = context.col;
      const row = context.row;
      color = getGridThemeColor(this._grid, this.theme, col, row, color);
      font = getGridThemeFont(this._grid, this.theme, col, row, font);
      this.drawWithClip(context, (ctx) => {
        let xOffset = rect.left;
        let lineNodeSpace = 0;
        if (treeInfo) {
          const info = treeInfo;
          const nodeRadius = 5;
          const rectTop = rect.top;
          const rectMiddle = rectTop + rect.height / 2;
          const rectBottom = rectTop + rect.height;
          lineNodeSpace = treeNodeSpace;
          ctx.strokeStyle = this.getColor(lineColor, col, row, ctx);
          ctx.beginPath();
          for (let i = 0; i < info.level; i++) {
            xOffset += lineNodeSpace;
            const isLastLevel = i === info.level - 1;
            const isLastRecord = info.levelLast[i];
            if (isLastLevel || !isLastRecord) {
              ctx.moveTo(xOffset, rectTop);
              if (isLastRecord) {
                ctx.lineTo(xOffset, rectMiddle);
              } else {
                ctx.lineTo(xOffset, rectBottom);
              }
              if (isLastLevel) {
                ctx.moveTo(xOffset, rectMiddle);
                ctx.lineTo(xOffset + lineNodeSpace - nodeRadius, rectMiddle);
              }
            }
          }
          ctx.stroke();
          if (!info.isLeaf) {
            ctx.beginPath();
            ctx.strokeStyle = this.getColor(buttonBorderColor, col, row, ctx);
            ctx.moveTo(xOffset + lineNodeSpace + nodeRadius, rectMiddle);
            ctx.arc(xOffset + lineNodeSpace, rectMiddle, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = this.getColor(buttonBgColor, col, row, ctx);
            ctx.fill();
            ctx.stroke();
            if (info.expanded) {
              ctx.beginPath();
              ctx.strokeStyle = this.getColor(lineColor, col, row, ctx);
              ctx.moveTo(xOffset + lineNodeSpace, rectMiddle + nodeRadius);
              ctx.lineTo(xOffset + lineNodeSpace, rectBottom);
              ctx.stroke();
            }
            // 减号
            const symbolRadius = nodeRadius - 2;
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.getColor(buttonColor, col, row, ctx);
            ctx.moveTo(xOffset + lineNodeSpace - symbolRadius, rectMiddle);
            ctx.lineTo(xOffset + lineNodeSpace + symbolRadius, rectMiddle);
            if (!info.expanded) {
              // 加号
              ctx.moveTo(xOffset + lineNodeSpace, rectMiddle - symbolRadius);
              ctx.lineTo(xOffset + lineNodeSpace, rectMiddle + symbolRadius);
            }
            ctx.stroke();
          }
        }
        rect.left = xOffset + lineNodeSpace * 2;
        font = getFont(font, context.col, context.row, this._grid, ctx);
        if (padding) {
          const paddingNums = this.toBoxPixelArray(padding, context, font);
          const left = rect.left + paddingNums[3];
          const top = rect.top + paddingNums[0];
          const width = rect.width - paddingNums[1] - paddingNums[3];
          const height = rect.height - paddingNums[0] - paddingNums[2];
          rect = new Rect(left, top, width, height);
        }
        if (!isMultilineText) {
          _inlineRect(this._grid, ctx, text, rect, col, row, {
            color,
            font,
            icons,
            offset,
            textAlign,
            textBaseline,
            textOverflow
          });
        } else {
          text = isDef(text) ? text + '' : '';
          const multiInlines = text
            .replace(/\r?\n/g, '\n')
            .replace(/\r/g, '\n')
            .split('\n');
          const calculator = this.createCalculator(context, font);
          lineHeight = calculator.calcHeight(lineHeight);
          _multiInlineRect(this._grid, ctx, multiInlines, rect, col, row, {
            autoWrapText,
            color,
            font,
            icons,
            lineClamp,
            lineHeight,
            offset,
            textAlign,
            textBaseline,
            textOverflow
          });
        }
      });
    }

    attachArea(rect, context) {
      this.drawWithClip(context, (ctx) => {
        const sel = context.getSelection();
        const { col, row } = context;
        if (!cellInRange(sel.range, col, row)) {
          ctx.setLineDash([4, 4]);
        }
        ctx.strokeStyle = '#D9D9D9';
        ctx.lineWidth = 1;
        const r = 2;
        const x = rect.left;
        const y = rect.top;
        const width = rect.width;
        const height = rect.height;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + r, r);
        ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
        ctx.arcTo(x, y + height, x, y + height - r, r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.stroke();
      });
    }
  }

  class BaseTooltip {
    constructor(grid) {
      this._grid = grid;
    }

    dispose() {
      this.detachTooltipElement();
      if (this._tooltipElement) {
        this._tooltipElement.dispose();
      }
      delete this._tooltipElement;
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
      tooltipElement.detach();
    }

    _getTooltipElement() {
      return (this._tooltipElement ||
        (this._tooltipElement = this.createTooltipElementInternal()));
    }
  }

  var tooltipElementCss = '@keyframes kaka-grid__tooltip-element--shown-animation {\n  0% {\n    opacity: 0;\n    transform: scale(0.8) translateX(-60%);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateX(-50%);\n  }\n}\n\n.kaka-grid__tooltip-element {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 3px;\n  /* background-color: #232f34; */\n  background-color: #fff;\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 3px #ccc;\n  padding: 8px;\n  pointer-events: none;\n  user-select: none;\n  color: #333;\n}\n\n.kaka-grid__tooltip-element--hidden {\n  opacity: 0;\n  transform: translateX(-50%);\n  /* transition: opacity 75ms linear; */\n}\n\n.kaka-grid__tooltip-element--shown {\n  opacity: 1;\n  transform: translateX(-50%);\n  animation: kaka-grid__tooltip-element--shown-animation 150ms ease-out;\n}\n\n.kaka-grid__tooltip-element__content {\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  width: 100%;\n  display: block;\n  /* white-space: pre-wrap; */\n  margin: 0;\n  box-sizing: border-box;\n}\n';

  const CLASS_NAME = 'kaka-grid__tooltip-element';
  const CONTENT_CLASS_NAME = `${ CLASS_NAME }__content`;
  const HIDDEN_CLASS_NAME = `${ CLASS_NAME }--hidden`;
  const SHOWN_CLASS_NAME = `${ CLASS_NAME }--shown`;

  class TooltipElement {
    constructor() {
      this._handler = new EventHandler();
      this._rootElement = this.createTooltipDomElement();
      this._messageElement = this.createTooltipMessageElement(this._rootElement, CONTENT_CLASS_NAME);
    }

    dispose() {
      this.detach();
      const rootElement = this._rootElement;
      if (rootElement.parentElement) {
        rootElement.parentElement.removeChild(rootElement);
      }
      this._handler.dispose();
      this._messageElement = null;
    }

    attach(grid, col, row, content) {
      const rootElement = this._rootElement;
      const messageElement = this._messageElement;
      rootElement.classList.remove(SHOWN_CLASS_NAME);
      rootElement.classList.add(HIDDEN_CLASS_NAME);
      if (messageElement) {
        this.doSetContent(messageElement, content);
      }
      if (this._attachCell(grid, col, row)) {
        rootElement.classList.add(SHOWN_CLASS_NAME);
        rootElement.classList.remove(HIDDEN_CLASS_NAME);
      } else {
        this._detach();
      }
    }

    move(grid, col, row) {
      const rootElement = this._rootElement;
      if (this._attachCell(grid, col, row)) {
        rootElement.classList.add(SHOWN_CLASS_NAME);
        rootElement.classList.remove(HIDDEN_CLASS_NAME);
      } else {
        this._detach();
      }
    }

    detach() {
      this._detach();
    }

    createTooltipDomElement() {
      style$2.inject('tooltipElement', tooltipElementCss);
      const rootElement = createElement('div', {
        classList: [CLASS_NAME, HIDDEN_CLASS_NAME]
      });
      return rootElement;
    }

    createTooltipMessageElement(rootElement, cls) {
      const messageElement = createElement('pre', { classList: [cls] });
      rootElement.appendChild(messageElement);
      return messageElement;
    }

    doSetContent(element, content) {
      element.textContent = content;
    }

    _detach() {
      const rootElement = this._rootElement;
      if (rootElement.parentElement) {
        // rootElement.parentElement.removeChild(rootElement);
        rootElement.classList.remove(SHOWN_CLASS_NAME);
        rootElement.classList.add(HIDDEN_CLASS_NAME);
      }
    }

    _attachCell(grid, col, row) {
      const rootElement = this._rootElement;
      const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
      const top = rect.top;
      const right = rect.right;
      const bottom = rect.bottom;
      const left = rect.left;
      const width = rect.width;
      const frozenRowCount = grid.frozenRowCount;
      const frozenColCount = grid.frozenColCount;
      if (row >= frozenRowCount && frozenRowCount > 0) {
        const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1));
        if (bottom < frozenRect.bottom) {
          return false; // 超出范围
        }
      } else {
        if (bottom < 0) {
          return false; // 超出范围
        }
      }
      if (col >= frozenColCount && frozenColCount > 0) {
        const { rect: frozenRect } = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row));
        if (right < frozenRect.right) {
          return false; // 超出范围
        }
      } else {
        if (right < 0) {
          return false; // 超出范围
        }
      }
      const offsetHeight = element.offsetHeight;
      const offsetWidth = element.offsetWidth;
      if (offsetHeight < top) {
        return false; // 超出范围
      }
      if (offsetWidth < left) {
        return false; // 超出范围
      }
      const rootTop = bottom;
      const rootLeft = left + width / 2;
      rootElement.style.top = `${ rootTop.toFixed() }px`;
      rootElement.style.left = `${ rootLeft.toFixed() }px`;
      rootElement.style.minWidth = `${ width.toFixed() }px`;
      if (rootElement.parentElement !== element) {
        element.appendChild(rootElement);
      }
      const rootHeight = rootElement.offsetHeight;
      const rootWidth = rootElement.offsetWidth;
      // 上下越界
      if (rootHeight > offsetHeight) {
        // 高度越界
        rootElement.style.top = '0px';
      } else {
        if (rootTop + rootHeight > offsetHeight) {
          // 底部越界
          if (top <= offsetHeight - bottom) {
            // 下边缘
            const bTop = offsetHeight - rootHeight;
            rootElement.style.top = `${ bTop.toFixed() }px`;
          } else if (top - rootHeight < 0) {
            // 上边缘
            rootElement.style.top = '0px';
          } else {
            // 上
            const tTop = top - rootHeight;
            rootElement.style.top = `${ tTop.toFixed() }px`;
          }
        }
      }
      // 左右越界
      if (rootLeft - rootWidth / 2 < 0) {
        // 左
        const lLeft = rootWidth / 2;
        rootElement.style.left = `${ lLeft.toFixed() }px`;
      } else if (rootLeft + rootWidth / 2 > offsetWidth) {
        // 右
        const rLeft = offsetWidth - rootWidth / 2;
        rootElement.style.left = `${ rLeft.toFixed() }px`;
      }
      return true;
    }
  }

  class Tooltip extends BaseTooltip {
    createTooltipElementInternal() {
      return new TooltipElement();
    }
  }

  class HtmlTooltipElement extends TooltipElement {
    createTooltipMessageElement(rootElement, cls) {
      const messageElement = createElement('div', { classList: [cls] });
      rootElement.appendChild(messageElement);
      return messageElement;
    }

    doSetContent(element, content) {
      element.innerHTML = content;
    }
  }

  class HtmlTooltip extends BaseTooltip {
    createTooltipElementInternal() {
      return new HtmlTooltipElement();
    }
  }

  const TOOLTIP_INSTANCE_FACTORY = {
    'overflow-html': (grid) => {
      return new HtmlTooltip(grid);
    },
    'overflow-text': (grid) => {
      return new Tooltip(grid);
    }
  };

  function getTooltipInstanceInfo(grid, col, row) {
    // overflow text tooltip
    const overflowText = grid.getCellOverflowText(col, row);
    if (overflowText) {
      const overflowType = grid.getCellOverflowType(col, row);
      return {
        content: overflowText,
        type: overflowType || 'overflow-text'
      };
    }
    return null;
  }

  class TooltipHandler {
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
      if (!info || !cellInRange(info.range, col, row)) {
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
      return cellInRange(info.range, col, row);
    }

    _bindGridEvent(grid) {
      grid.listen(LG_EVENT_TYPE.MOUSEOVER_CELL, (e) => {
        if (e.related) {
          if (this._isAttachCell(e.col, e.row)) {
            return;
          }
        }
        this._attach(e.col, e.row);
      });
      grid.listen(LG_EVENT_TYPE.MOUSEOUT_CELL, (e) => {
        if (e.related) {
          if (this._isAttachCell(e.related.col, e.related.row)) {
            return;
          }
        }
        this._detach();
      });
      grid.listen(LG_EVENT_TYPE.SELECTED_CELL, (e) => {
        if (this._isAttachCell(e.col, e.row)) {
          this._detach();
        }
      });
      grid.listen(LG_EVENT_TYPE.SCROLL, () => {
        const info = this._attachInfo;
        if (!info) {
          return;
        }
        this._move(info.range.start.col, info.range.start.row);
      });
      grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, (e) => {
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
      const type = info.type;
      const instance = tooltipInstances[type] ||
        (tooltipInstances[type] = TOOLTIP_INSTANCE_FACTORY[type](grid));
      return {
        instance,
        type,
        content: info.content
      };
    }
  }

  const _ = getListGridSymbol();

  // private methods
  function _arrayEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  }

  function _getCellValues(grid, startCol, endCol, row) {
    const values = [];
    if (startCol <= endCol) {
      for (let col = startCol; col <= endCol; col++) {
        values.push(_getCellValue(grid, col, row));
      }
    } else {
      for (let col = startCol; col >= endCol; col--) {
        values.push(_getCellValue(grid, col, row));
      }
    }
    return values;
  }

  function _getBodyCellRange(grid, col, row) {
    let cellRange = null;
    const { spanBodyOptions, layoutMap } = grid[_];
    if (spanBodyOptions && row >= layoutMap.headerRowCount) {
      let startRow = row;
      let endRow = row;
      const { startCol, endCol } = spanBodyOptions;
      if ((startCol <= col && col <= endCol) ||
        (endCol <= col && col <= startCol)) {
        const values = _getCellValues(grid, startCol, col, row);
        while (startRow > layoutMap.headerRowCount) {
          const pValues = _getCellValues(grid, startCol, col, startRow - 1);
          if (_arrayEqual(values, pValues)) {
            startRow--;
          } else {
            break;
          }
        }
        while (endRow < grid.rowCount) {
          const nValues = _getCellValues(grid, startCol, col, endRow + 1);
          if (_arrayEqual(values, nValues)) {
            endRow++;
          } else {
            break;
          }
        }
      }
      cellRange = {
        start: {
          col,
          row: Math.min(startRow, endRow)
        },
        end: {
          col,
          row: Math.max(startRow, endRow)
        }
      };
    }
    return cellRange;
  }

  function _getCellRange(grid, col, row) {
    const { layoutMap } = grid[_];
    let cellRange = layoutMap.getCellRange(col, row);
    const bodyCellRange = _getBodyCellRange(grid, col, row);
    if (bodyCellRange) {
      cellRange = cellMerge(cellRange, bodyCellRange);
    }
    const p = {
      get col() {
        return col;
      },
      get row() {
        return row;
      },
      cellRange
    };
    grid.fireListeners(LG_EVENT_TYPE.CELL_RANGE, p);
    return p.cellRange;
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
      return Rect.bounds(left, top, right, bottom);
    });
    context.range = _getCellRange(grid, col, row); // !!! TODO
  }

  function _getCellValue(grid, col, row) {
    let cellValue;
    if (row < grid[_].layoutMap.headerRowCount) {
      const { caption } = grid[_].layoutMap.getHeader(col, row);
      cellValue = typeof caption === 'function' ? caption() : caption;
    } else {
      const { field } = grid[_].layoutMap.getBody(col, row);
      cellValue = _getField(grid, field, row);
    }
    const p = {
      get col() {
        return col;
      },
      get row() {
        return row;
      },
      cellValue
    };
    grid.fireListeners(LG_EVENT_TYPE.CELL_VALUE, p);
    return p.cellValue;
  }

  function _setCellValue(grid, col, row, value) {
    if (row < grid[_].layoutMap.headerRowCount) {
      // nop
      return false;
    } else {
      const { field } = grid[_].layoutMap.getBody(col, row);
      if (field == null) {
        return false;
      }
      const index = _getRecordIndexByRow(grid, row);
      return grid[_].dataSource.setField(index, field, value);
    }
  }

  function _getContentHidden(grid, col, row) {
    let contentHidden = false;
    if (row >= grid[_].layoutMap.headerRowCount) {
      const column = grid[_].layoutMap.getBody(col, row);
      if (column && column.contentHidden) {
        contentHidden = getOrApply(column.contentHidden, grid.getRowRecord(row));
      }
    }
    return contentHidden;
  }

  function _getCellMessage(grid, col, row) {
    if (row < grid[_].layoutMap.headerRowCount) {
      return null;
    } else {
      const column = grid[_].layoutMap.getBody(col, row);
      if (!column || !column.message) {
        return null;
      }
      return _getField(grid, column.message, row);
    }
  }

  function _getHeaderField(grid, field) {
    if (typeof field === 'function') {
      return field(grid.headerValues);
    } else {
      return grid.headerValues.get(field);
    }
  }

  function _hasHeaderField(grid, field) {
    let has = false;
    grid[_].layoutMap.headerObjects.forEach((cell) => {
      if (cell.field === field) {
        has = true;
      }
    });
    return has;
  }

  function _getCellIcon1(grid, icon) {
    if (Array.isArray(icon)) {
      return icon.map((i) => _getCellIcon1(grid, i));
    }
    if (!obj.isObject(icon) || typeof icon === 'function') {
      return _getHeaderField(grid, icon);
    }
    const retIcon = {};
    const iconOpt = icon;
    icons$2.iconPropKeys.forEach((k) => {
      if (iconOpt[k]) {
        const f = _getHeaderField(grid, iconOpt[k]);
        if (isDef(f)) {
          retIcon[k] = f;
        } else {
          if (!_hasHeaderField(grid, iconOpt[k])) {
            retIcon[k] = iconOpt[k];
          }
        }
      }
    });
    return retIcon;
  }

  function _getHeaderIcon(grid, col, row) {
    const icon = grid[_].layoutMap.getHeader(col, row).icon;
    if (icon == null) {
      return null;
    }
    return _getCellIcon1(grid, icon);
  }

  function _getCellIcon0(grid, icon, row) {
    if (Array.isArray(icon)) {
      return icon.map((i) => _getCellIcon0(grid, i, row));
    }
    if (!obj.isObject(icon) || typeof icon === 'function') {
      return _getField(grid, icon, row);
    }
    const retIcon = {};
    const iconOpt = icon;
    icons$2.iconPropKeys.forEach((k) => {
      if (iconOpt[k]) {
        const f = _getField(grid, iconOpt[k], row);
        if (isDef(f)) {
          retIcon[k] = f;
        } else {
          if (!_hasField(grid, iconOpt[k], row)) {
            retIcon[k] = iconOpt[k];
          }
        }
      }
    });
    return retIcon;
  }

  function _getCellIcon(grid, col, row) {
    const icon = grid[_].layoutMap.getBody(col, row).icon;
    if (icon == null) {
      return null;
    }
    return _getCellIcon0(grid, icon, row);
  }

  function _getHeaderIconTooltip(grid, col, row) {
    let tooltip = '';
    if (row < grid[_].layoutMap.headerRowCount) {
      const header = grid[_].layoutMap.getHeader(col, row);
      if (header && header.iconTooltip) {
        tooltip = getOrApply(header.iconTooltip, {
          cell: { col, row },
          field: grid.getHeaderField(col, row)
        });
      }
    }
    return tooltip;
  }

  function _getField(grid, field, row) {
    if (!isDef(field)) {
      return null;
    }
    if (row < grid[_].layoutMap.headerRowCount) {
      return null;
    } else {
      const index = _getRecordIndexByRow(grid, row);
      return grid[_].dataSource.getField(index, field);
    }
  }

  function _hasField(grid, field, row) {
    if (!isDef(field)) {
      return false;
    }
    if (row < grid[_].layoutMap.headerRowCount) {
      return false;
    } else {
      const index = _getRecordIndexByRow(grid, row);
      return grid[_].dataSource.hasField(index, field);
    }
  }

  function _onDrawValue(grid, cellValue, context, { col, row }, style, draw) {
    const helper = grid[_].gridCanvasHelper;
    const isEditing = !!getInlineEditingState(grid).cellRange;
    const drawCellBg = ({ bgColor } = {}) => {
      const fillOpt = {
        fillColor: bgColor,
        isEditing
      };
      // 绘制整个cell
      helper.fillCellWithState(context, fillOpt);
    };
    const drawCellBorder = ({ bgColor } = {}) => {
      if (context.col === grid.frozenColCount - 1) {
        // 固定列规则
        const rect = context.getRect();
        helper.drawWithClip(context, (ctx) => {
          const borderColor = context.row >= grid.frozenRowCount
            ? helper.theme.borderColor
            : helper.theme.frozenRowsBorderColor;
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
      helper.borderSelection(context, {
        bgColor,
        isEditing,
        highlightBorderWidth: toPx(grid.highlightBorderWidth, grid[_].calcWidthContext)
      }); // !!! TODO
      // _borderWithState(grid, helper, context)
    };
    const clearCellBase = () => {
      helper.clearCell(context);
    };
    const drawCellBase = ({ bgColor } = {}) => {
      drawCellBg({ bgColor });
      drawCellBorder({ bgColor });
    };
    const info = {
      getRecord: () => grid.getRowRecord(row),
      getIcon: () => _getCellIcon(grid, col, row),
      getMessage: () => _getCellMessage(grid, col, row),
      messageHandler: grid[_].messageHandler,
      style,
      clearCellBase,
      drawCellBase,
      drawCellBg,
      drawCellBorder,
      getCell: () => ({ col, row }),
      getHeaderIcon: () => _getHeaderIcon(grid, col, row),
      getHeaderIconTooltip: () => _getHeaderIconTooltip(grid, col, row),
      getContentHidden: () => _getContentHidden(grid, col, row)
    };
    return draw(cellValue, info, context, grid);
  }

  // function _borderWithState<T>(
  //   grid: ListGrid<T>,
  //   helper: GridCanvasHelper<T>,
  //   context: CellContext
  // ): void {
  //   const { col, row } = context;
  //   const sel = grid.selection.select;
  //   const { layoutMap } = grid[_];
  //   const rect = context.getRect();
  //   const option: { borderColor?: ColorsPropertyDefine; lineWidth?: number } = {};
  //   const selRecordIndex = layoutMap.getRecordIndexByRow(sel.row);
  //   const selId = layoutMap.getCellId(sel.col, sel.row);
  //   function isSelectCell(col: number, row: number): boolean {
  //     if (col === sel.col && row === sel.row) {
  //       return true;
  //     }
  //     return (
  //       selId != null &&
  //       layoutMap.getCellId(col, row) === selId &&
  //       layoutMap.getRecordIndexByRow(row) === selRecordIndex
  //     );
  //   }
  //   // 边线
  //   if (isSelectCell(col, row)) {
  //     option.borderColor = helper.theme.highlightBorderColor;
  //     option.lineWidth = 2;
  //     helper.border(context, option);
  //   } else {
  //     option.lineWidth = 1;
  //     // header color
  //     const isFrozenCell = grid.isFrozenCell(col, row);
  //     if (isFrozenCell?.row) {
  //       option.borderColor = helper.theme.frozenRowsBorderColor;
  //     }
  //     helper.border(context, option);
  //     // 额外处理
  //     if (col > 0 && isSelectCell(col - 1, row)) {
  //       // 右边被选中
  //       helper.drawBorderWithClip(context, ctx => {
  //         const borderColors = helper.toBoxArray(
  //           helper.getColor(
  //             helper.theme.highlightBorderColor,
  //             sel.col,
  //             sel.row,
  //             ctx
  //           )
  //         );
  //         if (borderColors[1]) {
  //           ctx.lineWidth = 1;
  //           ctx.strokeStyle = borderColors[1];
  //           ctx.beginPath();
  //           ctx.moveTo(rect.left - 0.5, rect.top);
  //           ctx.lineTo(rect.left - 0.5, rect.bottom);
  //           ctx.stroke();
  //         }
  //       });
  //     } else if (row > 0 && isSelectCell(col, row - 1)) {
  //       // 顶部被选中
  //       helper.drawBorderWithClip(context, ctx => {
  //         const borderColors = helper.toBoxArray(
  //           helper.getColor(
  //             helper.theme.highlightBorderColor,
  //             sel.col,
  //             sel.row,
  //             ctx
  //           )
  //         );
  //         if (borderColors[0]) {
  //           ctx.lineWidth = 1;
  //           ctx.strokeStyle = borderColors[0];
  //           ctx.beginPath();
  //           ctx.moveTo(rect.left, rect.top - 0.5);
  //           ctx.lineTo(rect.right, rect.top - 0.5);
  //           ctx.stroke();
  //         }
  //       });
  //     }
  //   }
  // }
  function _refreshHeader(grid) {
    var _a;
    const protectedSpace = grid[_];
    if (protectedSpace.headerEvents) {
      protectedSpace.headerEvents.forEach((id) => grid.unlisten(id));
    }
    const headerEvents = (protectedSpace.headerEvents = []);
    headerEvents.forEach((id) => grid.unlisten(id));
    let layoutMap;
    if (protectedSpace.layout &&
      (!Array.isArray(protectedSpace.layout) || protectedSpace.layout.length > 0)) {
      layoutMap = protectedSpace.layoutMap = new LayoutMap(new MultiLayoutMap(protectedSpace.layout));
    } else {
      layoutMap = protectedSpace.layoutMap = new LayoutMap(new SimpleHeaderLayoutMap((_a = protectedSpace.header) !== null && _a !== void 0 ? _a : []));
    }
    layoutMap.hiddenHeader = protectedSpace.hiddenHeader;
    if (!grid.hiddenHeader) {
      layoutMap.headerObjects.forEach((cell) => {
        const ids = cell.headerType.bindGridEvent(grid, cell.id);
        headerEvents.push(...ids);
        if (cell.style) {
          if (cell.style instanceof BaseStyle) {
            const id = cell.style.listen(BaseStyle.EVENT_TYPE.CHANGE_STYLE, () => {
              grid.invalidate();
            });
            headerEvents.push(id);
          }
        }
        if (cell.action) {
          if (cell.action instanceof BaseAction) {
            const ids = cell.action.bindGridEvent(grid, cell.id);
            headerEvents.push(...ids);
          }
        }
      });
    }
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
        if (col.style instanceof columns.style.BaseStyle) {
          const id = col.style.listen(columns.style.EVENT_TYPE.CHANGE_STYLE, () => {
            grid.invalidate();
          });
          headerEvents.push(id);
        }
      }
    });
    for (let col = 0; col < layoutMap.columnWidths.length; col++) {
      const column = layoutMap.columnWidths[col];
      const { width, minWidth, maxWidth, disableResize } = column;
      if (width && (width > 0 || typeof width === 'string')) {
        grid.setColWidth(col, width);
      }
      if (minWidth && (minWidth > 0 || typeof minWidth === 'string')) {
        grid.setMinColWidth(col, minWidth);
      }
      if (maxWidth && (maxWidth > 0 || typeof maxWidth === 'string')) {
        grid.setMaxColWidth(col, maxWidth);
      }
      if (typeof disableResize === 'boolean') {
        grid.setColDisableResize(col, disableResize);
      }
    }
    if (!grid.hiddenHeader) {
      const headerRowHeight = grid[_].headerRowHeight;
      for (let row = 0; row < layoutMap.headerRowCount; row++) {
        const height = Array.isArray(headerRowHeight)
          ? headerRowHeight[row]
          : headerRowHeight;
        if (height && height > 0) {
          grid.setRowHeight(row, height);
        }
      }
    }
    grid.colCount = layoutMap.colCount;
    _refreshRowCount(grid);
    grid.frozenRowCount = layoutMap.headerRowCount;
  }

  function _refreshRowCount(grid) {
    const { layoutMap } = grid[_];
    grid.rowCount =
      grid[_].dataSource.length * layoutMap.bodyRowCount +
      layoutMap.headerRowCount;
  }

  function _tryWithUpdateDataSource(grid, fn) {
    if (grid[_].dataSourceEventIds) {
      grid[_].dataSourceEventIds.forEach((id) => grid[_].handler.off(id));
    }
    fn(grid);
    grid[_].dataSourceEventIds = [
      grid[_].handler.on(grid[_].dataSource, DataSource.EVENT_TYPE.UPDATED_LENGTH, () => {
        _refreshRowCount(grid);
        grid.selection.fireSelectedEvent();
        grid.invalidate();
      }),
      grid[_].handler.on(grid[_].dataSource, DataSource.EVENT_TYPE.UPDATED_ORDER, () => {
        grid.selection.fireSelectedEvent();
        grid.invalidate();
      }),
      grid[_].handler.on(grid[_].dataSource, DataSource.EVENT_TYPE.REFRESH_DATA, () => {
        grid.selection.fireSelectedEvent();
        grid.invalidate();
      })
    ];
  }

  function _setRecords(grid, records = []) {
    _tryWithUpdateDataSource(grid, () => {
      grid[_].records = records;
      const newDataSource = (grid[_].dataSource = CachedDataSource.ofArray(records));
      grid.addDisposable(newDataSource);
    });
  }

  function _setDataSource(grid, dataSource) {
    _tryWithUpdateDataSource(grid, () => {
      if (dataSource) {
        if (dataSource instanceof DataSource) {
          grid[_].dataSource = dataSource;
        } else {
          const newDataSource = (grid[_].dataSource = new CachedDataSource(dataSource));
          grid.addDisposable(newDataSource);
        }
      } else {
        grid[_].dataSource = DataSource.EMPTY;
      }
      grid[_].records = null;
    });
  }

  function _getRecordIndexByRow(grid, row) {
    const { layoutMap } = grid[_];
    return layoutMap.getRecordIndexByRow(row);
  }

  function _onRangePaste(text, test = () => true) {
    var _a;
    const { layoutMap } = this[_];
    const selectionRange = this.selection.range;
    const { start } = this.getCellRange(selectionRange.start.col, selectionRange.start.row);
    const { end } = this.getCellRange(selectionRange.end.col, selectionRange.end.row);
    const values = parsePasteRangeBoxValues(text);
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
        if (!hasEditable && ((_a = body.action) === null || _a === void 0 ? void 0 : _a.editable)) {
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
        if (!duplicate[id] && (action === null || action === void 0 ? void 0 : action.editable)) {
          duplicate[id] = true;
          const col = start.col + offsetCol;
          const row = start.row + offsetRow;
          const cellValue = values.getCellValue(valuesCol, valuesRow);
          then(this.getRowRecord(row), (record) => {
            then(_getCellValue(this, col, row), (oldValue) => {
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
    var _a;
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
        if (!hasEditable && ((_a = body.action) === null || _a === void 0 ? void 0 : _a.editable)) {
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
        if (!duplicate[id] && (action === null || action === void 0 ? void 0 : action.editable)) {
          duplicate[id] = true;
          const col = start.col + offsetCol;
          const row = start.row + offsetRow;
          then(this.getRowRecord(row), (_record) => {
            then(_getCellValue(this, col, row), (_oldValue) => {
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

  /**
   * ListGrid
   */
  class ListGrid extends DrawGrid {
    /**
     * constructor
     * @param options - Constructor options
     */
    constructor(options = {}) {
      var _a, _b;
      super(omit(options, ['colCount', 'rowCount', 'frozenRowCount']));
      this[_] = {};
      const protectedSpace = this[_];
      protectedSpace.disabled = options.disabled || false;
      protectedSpace.readOnly = options.readonly || false;
      protectedSpace.header = options.header || [];
      protectedSpace.layout = options.layout || [];
      protectedSpace.headerRowHeight = options.headerRowHeight || [];
      protectedSpace.hiddenHeader = !!options.hiddenHeader;
      protectedSpace.spanBodyOptions = options.spanBodyOptions || undefined;
      protectedSpace.handler = new EventHandler();
      protectedSpace.sortState = {
        col: -1,
        order: undefined,
        row: -1
      };
      protectedSpace.gridCanvasHelper = new GridCanvasHelper(this);
      protectedSpace.theme = themes.of(options.theme);
      protectedSpace.messageHandler = new MessageHandler(this, (col, row) => _getCellMessage(this, col, row));
      protectedSpace.tooltipHandler = new TooltipHandler(this);
      if (options.dataSource) {
        _setDataSource(this, options.dataSource);
      } else {
        _setRecords(this, options.records);
      }
      protectedSpace.allowRangePaste = (_a = options.allowRangePaste) !== null && _a !== void 0 ? _a : false;
      _refreshHeader(this);
      this.selection.fireSelectedEvent();
      this.invalidate();
      if (!isDef(options.monitorResize) || options.monitorResize === true) {
        if ((_b = window.mussel) === null || _b === void 0 ? void 0 : _b.EventInterceptor) {
          protectedSpace.handler.on(this.getElement(), 'sizechange', () => this.resize());
        } else {
          protectedSpace.handler.on(window, 'resize', () => this.resize());
        }
      }
    }

    static get EVENT_TYPE() {
      return LG_EVENT_TYPE;
    }

    /**
     * Dispose the grid instance.
     * @returns
     */
    dispose() {
      const protectedSpace = this[_];
      protectedSpace.handler.dispose();
      protectedSpace.messageHandler.dispose();
      protectedSpace.tooltipHandler.dispose();
      super.dispose();
    }

    /**
     * Define of the header with the given data.
     * <pre>
     * column options
     * -----
     * caption: header caption
     * field: field name
     * width: column width
     * minWidth: column min width
     * maxWidth: column max width
     * disableResize: column disable resize
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
    get header() {
      return this[_].header;
    }

    set header(header) {
      this[_].header = header;
      _refreshHeader(this);
      const oldRange = this.selection.range;
      const newRange = this.updateSelectionRange(this.selection.range);
      if (oldRange.start.col !== newRange.start.col ||
        oldRange.end.col !== newRange.end.col ||
        oldRange.start.row !== newRange.start.row ||
        oldRange.end.row !== newRange.end.row) {
        this.selection._forceUpdateRange();
        this.selection.fireSelectedEvent();
      }
    }

    /**
     * The define of the layout.
     */
    get layout() {
      return this[_].layout;
    }

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
     * Records.
     */
    get records() {
      return this[_].records || null;
    }

    set records(records) {
      if (records == null) {
        return;
      }
      _setRecords(this, records);
      _refreshRowCount(this);
      this.invalidate();
    }

    /**
     * Data source.
     */
    get dataSource() {
      return this[_].dataSource;
    }

    set dataSource(dataSource) {
      _setDataSource(this, dataSource);
      _refreshRowCount(this);
      this.invalidate();
    }

    /**
     * Theme.
     */
    get theme() {
      return this[_].theme;
    }

    set theme(theme) {
      this[_].theme = themes.of(theme);
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
     * Sort state.
     */
    get sortState() {
      return this[_].sortState;
    }

    set sortState(sortState) {
      const oldState = this.sortState;
      let oldField;
      if (oldState.col >= 0 && oldState.row >= 0) {
        oldField = this.getHeaderField(oldState.col, oldState.row);
      }
      const newState = (this[_].sortState = isDef(sortState)
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
      if (isDef(oldField) && oldField !== newField) {
        this.setHeaderValue(oldState.col, oldState.row, undefined);
      }
      if (isDef(newField)) {
        this.setHeaderValue(newState.col, newState.row, newState.order);
      }
    }

    /**
     * Header values.
     */
    get headerValues() {
      return this[_].headerValues || (this[_].headerValues = new Map());
    }

    set headerValues(headerValues) {
      this[_].headerValues = headerValues || new Map();
    }

    /**
     * Whether to hide the column header.
     */
    get hiddenHeader() {
      return this[_].hiddenHeader;
    }

    set hiddenHeader(hidden) {
      this[_].hiddenHeader = hidden;
      _refreshHeader(this);
      this.invalidate();
    }

    /**
     * Disabled.
     */
    get disabled() {
      return this[_].disabled;
    }

    set disabled(disabled) {
      this[_].disabled = disabled;
    }

    /**
     * Read Only.
     */
    get readOnly() {
      return this[_].readOnly;
    }

    set readOnly(readOnly) {
      this[_].readOnly = readOnly;
    }

    get readonly() {
      window.console.warn('\'readonly\' is deprecated, please use \'readOnly\' instead');
      return this.readOnly;
    }

    set readonly(readOnly) {
      window.console.warn('\'readonly\' is deprecated, please use \'readOnly\' instead');
      this.readOnly = readOnly;
    }

    /**
     * Span Body
     */
    get spanBodyOptions() {
      var _a;
      return (_a = this[_].spanBodyOptions) !== null && _a !== void 0 ? _a : null;
    }

    set spanBodyOptions(spanBodyOptions) {
      this[_].spanBodyOptions = spanBodyOptions !== null && spanBodyOptions !== void 0 ? spanBodyOptions : undefined;
    }

    /**
     * Get the field of the given column index.
     * @param col - The column index.
     * @param row - The row index.
     * @returns The field object.
     */
    getField(col, row) {
      return this[_].layoutMap.getBody(col, row !== null && row !== void 0 ? row : this[_].layoutMap.headerRowCount).field;
    }

    /**
     * Get the column define of the given column index.
     * @param col - The column index.
     * @param row - The row index.
     * @returns The column define object.
     */
    getColumnDefine(col, row) {
      return this[_].layoutMap.getBody(col, row !== null && row !== void 0 ? row : this[_].layoutMap.headerRowCount).define;
    }

    getColumnType(col, row) {
      return this[_].layoutMap.getBody(col, row).columnType;
    }

    /**
     * Get the header field of the given header cell.
     * @param col - The column index.
     * @param row - The header row index.
     * @returns The field object.
     */
    getHeaderField(col, row) {
      const hd = this[_].layoutMap.getHeader(col, row);
      return hd.field;
    }

    /**
     * Get the header define of the given header cell.
     * @param col - The column index.
     * @param row - The header row index.
     * @returns The header define object.
     */
    getHeaderDefine(col, row) {
      const hd = this[_].layoutMap.getHeader(col, row);
      return hd.define;
    }

    /**
     * Get the column of the given column index.
     * @param col - The column index.
     * @returns The field object.
     */
    getColumn(col, row) {
      return this[_].layoutMap.getBody(col, row || 0);
    }

    /**
     * Get the record of the given row index.
     * @param row - The row index.
     * @returns The record.
     */
    getRowRecord(row) {
      if (row < this[_].layoutMap.headerRowCount) {
        return undefined;
      } else {
        return this[_].dataSource.get(_getRecordIndexByRow(this, row));
      }
    }

    /**
     * Get the record index of the given row index.
     * @param row -  The row index.
     * @returns The record index.
     */
    getRecordIndexByRow(row) {
      return _getRecordIndexByRow(this, row);
    }

    /**
     * Get the record index of the given row index.
     * @param row - The row index.
     * @returns The record index.
     */
    getRowRecordIndex(row) {
      window.console.warn('\'getRowRecordIndex\' is deprecated, please use \'getRecordIndexByRow\' instead');
      return this.getRecordIndexByRow(row);
    }

    /**
     * Gets the row index starting at the given record index.
     * @param index - The record index.
     */
    getRecordStartRowByRecordIndex(index) {
      return this[_].layoutMap.getRecordStartRowByRecordIndex(index);
    }

    /**
     * Get the column index of the given field.
     * @param field - The field.
     * @returns The column index.
     */
    getColumnIndexByField(field) {
      var _a;
      const range = this.getCellRangeByField(field, 0);
      return (_a = range === null || range === void 0 ? void 0 : range.start.col) !== null && _a !== void 0 ? _a : null;
    }

    /**
     * Get the column index of the given field.
     * @param field - The field.
     * @param index - The record index
     * @returns The column index.
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
     * @param field - The field.
     * @param index - The record index
     * @returns
     */
    focusGridCell(field, index) {
      var _a;
      const { start: { col: startCol, row: startRow }, end: { col: endCol, row: endRow } } = this.selection.range;
      const newFocus = (_a = this.getCellRangeByField(field, index)) === null || _a === void 0 ? void 0 : _a.start;
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
     * @param field - The field.
     * @param index - The record index
     * @returns
     */
    makeVisibleGridCell(field, index) {
      var _a, _b, _c;
      const cell = (_a = this.getCellRangeByField(field, index)) === null || _a === void 0 ? void 0 : _a.start;
      this.makeVisibleCell((_b = cell === null || cell === void 0 ? void 0 : cell.col) !== null && _b !== void 0 ? _b : 0, (_c = cell === null || cell === void 0 ? void 0 : cell.row) !== null && _c !== void 0 ? _c : this[_].layoutMap.headerRowCount);
    }

    /**
     * Select cell range
     */
    selectCellRange(startCol, startRow, endCol, endRow) {
      this.focusCell(startCol, startRow);
      this.selection.range = createCellRange(startCol, startRow, endCol, endRow);
      const { start: { col: newStartCol, row: newStartRow }, end: { col: newEndCol, row: newEndRow } } = this.selection.range;
      this.invalidateGridRect(newStartCol, newStartRow, newEndCol, newEndRow);
    }

    getGridCanvasHelper() {
      return this[_].gridCanvasHelper;
    }

    /**
     * Get cell range information for a given cell.
     * @param col - column index of the cell
     * @param row - row index of the cell
     * @returns cell range info
     */
    getCellRange(col, row) {
      return _getCellRange(this, col, row);
    }

    /**
     * Get header range information for a given cell.
     * @param col - column index of the cell
     * @param row - row index of the cell
     * @returns cell range info
     */
    getHeaderCellRange(col, row) {
      window.console.warn('\'getHeaderCellRange\' is deprecated, please use \'getCellRange\' instead');
      return this.getCellRange(col, row);
    }

    getCopyCellValue(col, row, range) {
      var _a;
      const cellRange = _getCellRange(this, col, row);
      const startCol = range
        ? Math.max(range.start.col, cellRange.start.col)
        : cellRange.start.col;
      const startRow = range
        ? Math.max(range.start.row, cellRange.start.row)
        : cellRange.start.row;
      if (startCol !== col || startRow !== row) {
        return '';
      }
      const { layoutMap } = this[_];
      let value = _getCellValue(this, col, row);
      if (row >= layoutMap.headerRowCount) {
        const columnType = layoutMap.getBody(col, row).columnType;
        value = (_a = columnType.getCopyCellValue(value, this, { col, row })) !== null && _a !== void 0 ? _a : value;
        value = columnType.convertCopyValue(value, { col, row }, this);
      }
      return value;
    }

    onDrawCell(col, row, context) {
      const { layoutMap } = this[_];
      let draw;
      let style;
      if (row < layoutMap.headerRowCount) {
        const hd = layoutMap.getHeader(col, row);
        draw = hd.headerType.onDrawCell;
        ({ style } = hd);
      } else {
        const column = layoutMap.getBody(col, row);
        draw = column.columnType.onDrawCell;
        ({ style } = column);
      }
      _updateRect(this, col, row, context);
      const cellValue = _getCellValue(this, col, row);
      return _onDrawValue(this, cellValue, context, {
        col,
        row
      }, style, draw);
    }

    doGetCellValue(col, row, valueCallback) {
      if (row < this[_].layoutMap.headerRowCount) {
        // nop
        return false;
      } else {
        const value = _getCellValue(this, col, row);
        if (isPromise(value)) {
          // 在延迟期间被忽略
          return false;
        }
        valueCallback(value);
      }
      return true;
    }

    doChangeValue(col, row, changeValueCallback) {
      if (row < this[_].layoutMap.headerRowCount) {
        // nop
        return false;
      } else {
        const record = this.getRowRecord(row);
        if (isPromise(record)) {
          // 在延迟期间被忽略
          return false;
        }
        const before = _getCellValue(this, col, row);
        if (isPromise(before)) {
          // 在延迟期间被忽略
          return false;
        }
        const after = changeValueCallback(before);
        if (after === undefined) {
          return false;
        }
        return then(_setCellValue(this, col, row, after), (ret) => {
          if (ret) {
            const { field } = this[_].layoutMap.getBody(col, row);
            this.fireListeners(LG_EVENT_TYPE.CHANGED_VALUE, {
              col,
              row,
              field: field,
              record: record,
              value: after,
              oldValue: before
            });
          }
          return ret;
        });
      }
    }

    doSetPasteValue(text, test) {
      _onRangePaste.call(this, text, test);
    }

    getHeaderValue(col, row) {
      const field = this.getHeaderField(col, row);
      return this.headerValues.get(field);
    }

    setHeaderValue(col, row, newValue) {
      const field = this.getHeaderField(col, row);
      const oldValue = this.headerValues.get(field);
      this.headerValues.set(field, newValue);
      this.fireListeners(LG_EVENT_TYPE.CHANGED_HEADER_VALUE, {
        col,
        field,
        oldValue,
        row,
        value: newValue
      });
    }

    getLayoutCellId(col, row) {
      return this[_].layoutMap.getCellId(col, row);
    }

    completeEdit() {
      this.focus();
    }

    bindEventsInternal() {
      this.listen(LG_EVENT_TYPE.SELECTED_CELL, (e) => {
        if (e.selected) {
          const beforeRange = _getCellRange(this, e.before.col, e.before.row);
          const { start: { col: beforeStartCol, row: beforeStartRow }, end: { col: beforeEndCol, row: beforeEndRow } } = beforeRange;
          if (beforeStartCol !== beforeEndCol ||
            beforeStartRow !== beforeEndRow) {
            this.invalidateGridRect(beforeStartCol, beforeStartRow, beforeEndCol, beforeEndRow);
          }
          const range = _getCellRange(this, e.col, e.row);
          const { start: { col: startCol, row: startRow }, end: { col: endCol, row: endRow } } = range;
          if (startCol !== endCol || startRow !== endRow) {
            this.invalidateGridRect(startCol, startRow, endCol, endRow);
          }
        }
      });
      this.listen(LG_EVENT_TYPE.PASTE_CELL, (e) => {
        if (!this[_].allowRangePaste) {
          return;
        }
        const { start, end } = this.selection.range;
        if (!e.multi && cellEquals(start, end)) {
          return;
        }
        const { layoutMap } = this[_];
        if (start.row < layoutMap.headerRowCount) {
          return;
        }
        event.cancel(e.event);
        _onRangePaste.call(this, e.normalizeValue);
      });
      this.listen(LG_EVENT_TYPE.DELETE_CELL, (e) => {
        const { start } = this.selection.range;
        const { layoutMap } = this[_];
        if (start.row < layoutMap.headerRowCount) {
          return;
        }
        event.cancel(e.event);
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

    getAttachCellsAreaInternal(range) {
      const rect = super.getAttachCellsAreaInternal(range);
      const { start: { col, row } } = this.getCellRange(range.start.col, range.start.row);
      if (row >= this[_].layoutMap.headerRowCount) {
        const column = this[_].layoutMap.getBody(col, row);
        column.columnType.reviseAttachCellsArea(rect, row, this);
      }
      return rect;
    }

    getAttachCellsPaddingInternal(range) {
      const padding = super.getAttachCellsPaddingInternal(range);
      const { start: { col, row } } = this.getCellRange(range.start.col, range.start.row);
      if (row >= this[_].layoutMap.headerRowCount) {
        const column = this[_].layoutMap.getBody(col, row);
        column.columnType.reviseAttachCellsPadding(padding, row, this);
      }
      return padding;
    }

    getFocusRectInternal(col, row) {
      const rect = super.getFocusRectInternal(col, row);
      if (this[_] && row >= this[_].layoutMap.headerRowCount) {
        const column = this[_].layoutMap.getBody(col, row);
        column.columnType.reviseFocusRect(rect, row, this);
      }
      return rect;
    }

    getCellOverflowTextInternal(cell) {
      const col = cell.col;
      const row = cell.row;
      let text = '';
      if (row >= this[_].layoutMap.headerRowCount) {
        const column = this[_].layoutMap.getBody(col, row);
        const tooltip = column.tooltip;
        const record = this.getRowRecord(row);
        if (record) {
          if (typeof tooltip === 'function') {
            text = tooltip.call(this, record);
          } else if (typeof tooltip === 'string') {
            text = record[tooltip];
          }
        }
      } else {
        const hd = this[_].layoutMap.getHeader(col, row);
        if (hd) {
          const tooltip = hd.tooltip;
          if (typeof tooltip === 'function') {
            text = tooltip.call(this, {
              cell: { col, row },
              field: this.getHeaderField(col, row)
            });
          } else if (typeof tooltip === 'string') {
            text = tooltip;
          }
        }
      }
      return text || '';
    }

    getCellOverflowTypeInternal(cell) {
      const col = cell.col;
      const row = cell.row;
      let type = '';
      if (row >= this[_].layoutMap.headerRowCount) {
        const column = this[_].layoutMap.getBody(col, row);
        const tooltipType = column.tooltipType;
        const record = this.getRowRecord(row);
        if (record) {
          if (typeof tooltipType === 'function') {
            type = tooltipType.call(this, record);
          } else if (typeof tooltipType === 'string') {
            type = tooltipType;
          }
        }
      } else {
        const hd = this[_].layoutMap.getHeader(col, row);
        if (hd) {
          const tooltipType = hd.tooltipType;
          if (typeof tooltipType === 'function') {
            type = tooltipType.call(this, {
              cell: { col, row },
              field: this.getHeaderField(col, row)
            });
          } else if (typeof tooltipType === 'string') {
            type = tooltipType;
          }
        }
      }
      return type || '';
    }

    getDefaultRowHeight() {
      return ((this[_] && this[_].gridCanvasHelper.theme.defaultRowHeight) ||
        super.getDefaultRowHeight());
    }

    getDefaultColWidth() {
      return ((this[_] && this[_].gridCanvasHelper.theme.defaultColWidth) ||
        super.getDefaultColWidth());
    }

    getHighlightBorderWidth() {
      return ((this[_] && this[_].gridCanvasHelper.theme.highlightBorderWidth) ||
        super.getHighlightBorderWidth());
    }

    updateSelectionRange(range) {
      const oldStartCol = range.start.col;
      const oldStartRow = range.start.row;
      const oldEndCol = range.end.col;
      const oldEndRow = range.end.row;
      const startCol = Math.min(range.start.col, range.end.col);
      const startRow = Math.min(range.start.row, range.end.row);
      const endCol = Math.max(range.start.col, range.end.col);
      const endRow = Math.max(range.start.row, range.end.row);
      let newStartCol = startCol;
      let newStartRow = startRow;
      let newEndCol = endCol;
      let newEndRow = endRow;
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const r = this.getCellRange(col, row);
          newStartCol = Math.min(r.start.col, newStartCol);
          newStartRow = Math.min(r.start.row, newStartRow);
          newEndCol = Math.max(r.end.col, newEndCol);
          newEndRow = Math.max(r.end.row, newEndRow);
        }
      }
      if (newStartCol < startCol) {
        if (range.start.col > range.end.col) {
          range.end.col = newStartCol;
        } else {
          range.start.col = newStartCol;
        }
      }
      if (newStartRow < startRow) {
        if (range.start.row > range.end.row) {
          range.end.row = newStartRow;
        } else {
          range.start.row = newStartRow;
        }
      }
      if (newEndCol > endCol) {
        if (range.start.col > range.end.col) {
          range.start.col = newEndCol;
        } else {
          range.end.col = newEndCol;
        }
      }
      if (newEndRow > endRow) {
        if (range.start.row > range.end.row) {
          range.start.row = newEndRow;
        } else {
          range.end.row = newEndRow;
        }
      }
      if (oldStartCol !== range.start.col ||
        oldStartRow !== range.start.row ||
        oldEndCol !== range.end.col ||
        oldEndRow !== range.end.row) {
        range = this.updateSelectionRange(range);
      }
      return range;
    }

    getDefaultFont() {
      return this[_].gridCanvasHelper.theme.font;
    }

    getDefaultUnderlayBackgroundColor() {
      return this[_].gridCanvasHelper.theme.underlayBackgroundColor;
    }

    getDefaultBorderColor() {
      return this[_].gridCanvasHelper.theme.gridBorderColor;
    }

    getDefaultBorderWidth() {
      return this[_].gridCanvasHelper.theme.gridBorderWidth;
    }

    fireListeners(type, ...event) {
      return super.fireListeners(type, ...event);
    }
  }

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
      return registerPlugin(themes$1, name, theme);
    } else {
      return themes$1[name];
    }
  }

  function icon(name, icon) {
    if (icon != null) {
      return registerPlugin(icons$1, name, icon);
    } else {
      return icons$1[name];
    }
  }

  function icons(icons) {
    return registerPlugins(icons$1, icons);
  }

  const register = {
    theme,
    icon,
    icons
  };

  /**
   * Kaka Grid
   */
  const _kakaGrid = {
    version: '2.3.14',
    core: core,
    tools: tools,
    // impl Grids
    ListGrid: ListGrid,
    // objects
    columns: columns,
    data: data,
    headers: headers,
    themes: themes,
    // helper
    GridCanvasHelper: GridCanvasHelper,
    get icons() {
      return svgIcons.get();
    },
    template: str.template,
    // plugin registers
    register: register,
    // all grids
    grids
  };
  var kakaGrid;
  (function (kakaGrid) {
    kakaGrid.version = _kakaGrid.version;

    class ListGrid extends _kakaGrid.ListGrid {
    }

    kakaGrid.ListGrid = ListGrid;
    kakaGrid.core = _kakaGrid.core;
    kakaGrid.tools = _kakaGrid.tools;
    kakaGrid.columns = _kakaGrid.columns;
    kakaGrid.data = _kakaGrid.data;
    kakaGrid.headers = _kakaGrid.headers;
    kakaGrid.themes = _kakaGrid.themes;
    kakaGrid.GridCanvasHelper = _kakaGrid.GridCanvasHelper;
    kakaGrid.icons = _kakaGrid.icons;
    kakaGrid.template = _kakaGrid.template;
    kakaGrid.register = _kakaGrid.register;
    kakaGrid.grids = _kakaGrid.grids;
  })(kakaGrid || (kakaGrid = {}));
  var kakaGrid$1 = kakaGrid;

  return kakaGrid$1;

})));
//# sourceMappingURL=kakaGrid.js.map
