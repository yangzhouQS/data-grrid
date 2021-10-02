// import * as action from './header/action'
// import * as style from './header/style'
// import * as type from './header/type'

import { ACTIONS, BaseAction, BaseActionOption, SortHeaderAction, CheckHeaderAction, of as headerActionOf, ofCell as headerActionOfCell, ImmutableHeaderActions } from './header/action';
import {
  BaseStyle,
  // BaseStdStyle,
  // BaseCheckStyle,
  Style,
  SortHeaderStyle,
  CheckHeaderStyle,
  // SwitchHeaderStyle,
  MultilineTextHeaderStyle,
  of as headerStyleOf
} from './header/style';
import {
  TYPES,
  BaseHeader,
  // BaseCheckHeader,
  Header,
  SortHeader,
  CheckHeader,
  // SwitchHeader,
  MultilineTextHeader,
  of as headerTypeOf,
  ofCell as headerTypeOfCell
} from './header/type';

const action = {
  ACTIONS: ACTIONS as ImmutableHeaderActions,
  BaseAction,
  // BaseCheckAction,
  SortHeaderAction,
  CheckHeaderAction,
  // SwitchHeaderAction,
  of: headerActionOf,
  ofCell: headerActionOfCell
};
const style = {
  BaseStyle,
  // BaseStdStyle,
  // BaseCheckStyle,
  Style,
  SortHeaderStyle,
  CheckHeaderStyle,
  // SwitchHeaderStyle,
  MultilineTextHeaderStyle,
  of: headerStyleOf
};
const type = {
  TYPES,
  BaseHeader,
  // BaseCheckHeader,
  Header,
  SortHeader,
  CheckHeader,
  // SwitchHeader,
  MultilineTextHeader,
  of: headerTypeOf,
  ofCell: headerTypeOfCell
};
/**
 * header classes
 */
export const headers = { action, type, style };
