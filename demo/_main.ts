import * as dataGrid from '../src/main'
import './styles/index.css'

const records = [
  {
    id: 1,
    name: 'liuMing',
    imgSrc: 'baidu.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    percent: '80%',
    value2: 18,
    sel: '',
    age: 26,
    check: false,
    phone: '1008611',
    sex: '男',
    email: '263849722@qq.com',
    value: 1234567890
  },
  {
    id: 2,
    name: 'tom',
    imgSrc: 'baidu.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    percent: '80%',
    value2: 18,
    sel: '1',
    age: 18,
    check: false,
    phone: '1008611',
    sex: '男',
    email: '263849722@qq.com',
    value: 1234567890.12
  },
  {
    id: 3,
    name: 'sam',
    imgSrc: 'baidu.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    percent: '80%',
    value2: 18,
    sel: '2',
    age: 34,
    check: true,
    phone: '1008611',
    sex: '男',
    email: '263849722@qq.com',
    value: -1234567890.123
  },
  {
    id: 4,
    name: 'lisa',
    imgSrc: 'baidu.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    percent: '80%',
    value2: 18,
    sel: '3',
    age: 12,
    check: true,
    phone: '1008611',
    sex: '男',
    email: '263849722@qq.com',
    value: -1234567890.666666
  }
]
const lookupZones = [
  { 'id': 1, 'name': 'UTC+1', 'value': '1', 'label': 'UTC+1' }, {
    'id': 2,
    'name': 'UTC+2',
    'value': '2',
    'label': 'UTC+2'
  }, {
    'id': 3, 'name': 'UTC+3', 'value': '3', 'label': 'UTC+3'
  }, { 'id': 4, 'name': 'UTC+4', 'value': '4', 'label': 'UTC+4' }, {
    'id': 5,
    'name': 'UTC+5',
    'value': '5',
    'label': 'UTC+5'
  }, { 'id': 6, 'name': 'UTC+6', 'value': '6', 'label': 'UTC+6' }, {
    'id': 7, 'name': 'UTC+7', 'value': '7', 'label': 'UTC+7'
  }, { 'id': 8, 'name': 'UTC+8', 'value': '8', 'label': 'UTC+8' }, {
    'id': 9,
    'name': 'UTC+9',
    'value': '9',
    'label': 'UTC+9'
  }, {
    'id': 10, 'name': 'UTC+10', 'value': '10', 'label': 'UTC+10'
  }, { 'id': 11, 'name': 'UTC+11', 'value': '11', 'label': 'UTC+11' }, {
    'id': 12,
    'name': 'UTC+12',
    'value': '12',
    'label': 'UTC+12'
  }, {
    'id': -1, 'name': 'UTC-1', 'value': '-1', 'label': 'UTC-1'
  }, { 'id': -2, 'name': 'UTC-2', 'value': '-2', 'label': 'UTC-2' }, {
    'id': -3,
    'name': 'UTC-3',
    'value': '-3',
    'label': 'UTC-3'
  }, {
    'id': -4, 'name': 'UTC-4', 'value': '-4', 'label': 'UTC-4'
  }, { 'id': -5, 'name': 'UTC-5', 'value': '-5', 'label': 'UTC-5' }, {
    'id': -6,
    'name': 'UTC-6',
    'value': '-6',
    'label': 'UTC-6'
  }, {
    'id': -7, 'name': 'UTC-7', 'value': '-7', 'label': 'UTC-7'
  }, { 'id': -8, 'name': 'UTC-8', 'value': '-8', 'label': 'UTC-8' }, {
    'id': -9,
    'name': 'UTC-9',
    'value': '-9',
    'label': 'UTC-9'
  }, {
    'id': -10, 'name': 'UTC-10', 'value': '-10', 'label': 'UTC-10'
  }, { 'id': -11, 'name': 'UTC-11', 'value': '-11', 'label': 'UTC-11' }, {
    'id': -12,
    'name': 'UTC-12',
    'value': '-12',
    'label': 'UTC-12'
  }
]
const options = [
  { value: '', label: 'Empty' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' }
]
const grid = new dataGrid.ListGrid({
  parentElement: document.getElementById('app'),
  header: [
    {
      caption: '序号',
      width: 80,
      columnType: new dataGrid.columns.type.Column({
        transformRecord({ value, displayValue, cell, grid }) {
          return cell.row - grid.frozenRowCount + 1
        }
      }),
      style: {
        textAlign: 'center'
      }
    },
    { field: 'id', caption: 'ID', width: 100 },
    {
      caption: "图片",
      field: "imgSrc",
      width: 150,
      columnType: new dataGrid.columns.type.ImageColumn({
      })
    },
    {
      field: 'email',
      caption: 'OPTIONS',
      width: 280,
      columnType: new dataGrid.columns.type.MenuColumn({
        options: [ { value: '', label: 'Choose your option' }, ...lookupZones ]
      }),
      action: new dataGrid.columns.action.InlineMenuEditor({
        options: [ { value: '', label: 'Empty' }, ...lookupZones ]
      })
    },
    {
      caption: '基本信息',
      headerStyle: {
        textAlign: 'center'
      },
      columns: [
        { field: 'name', caption: '名称', width: 200 },
        { field: 'age', caption: '年龄', width: 200 }
      ]
    },
    {
      field: 'text',
      caption: 'text',
      width: 200,
      columnType: new dataGrid.columns.type.MultilineTextColumn({}),
      style: {
        autoWrapText: true, // 是否换行
        lineClamp: 2,
        lineHeight: 20,
        textOverflow: 'ellipsis'
      }
    },
    {
      field: 'percent',
      caption: 'percent',
      width: 200,
      columnType: new dataGrid.columns.type.PercentCompleteBarColumn()
    },
    {
      field: 'value2',
      caption: 'value(10-20)',
      width: 200,
      columnType: new dataGrid.columns.type.PercentCompleteBarColumn({
        min: 10,
        max: 20
      })
    },
    { field: 'sex', caption: '性别', width: 200 },
    { field: 'email', caption: '邮件', width: 200 },
    {
      field: 'check',
      caption: 'check',
      width: 200,
      columnType: 'check',
      action: 'check'
    },
    {
      field: 'value',
      caption: '数字列',
      width: 200,
      columnType: new dataGrid.columns.type.NumberColumn({})
    },
    {
      caption: '操作',
      width: 200,
      columnType: new dataGrid.columns.type.ButtonColumn<any>({
        caption: '点击'
      }),
      action: new dataGrid.columns.action.ButtonAction({
        disabled: false,
        action: (rec, info) => {
          console.log(rec, info)
        }
      })
    },
    {
      field: 'check',
      caption: 'check',
      width: 200,
      columnType: 'check',
      action: 'check',
      style: {
        bgColor: '#4fe231',
        borderColor: 'red',
        uncheckBgColor: '#0ee5a1',
        checkBgColor: 'rgb(255, 73, 72)',
        textAlign: 'end'
      }
    },
    {
      field: 'sel',
      caption: '下拉选择',
      width: 200,
      columnType: new dataGrid.columns.type.MenuColumn({ options }),
      style: {
        appearance: 'none'
      }
    }
  ],
  headerRowHeight: 40, // header行高
  defaultRowHeight: 50,
  // hiddenHeader: true,
  readonly: true,
  borderColor: '#444', // gird边框线颜色
  borderMode: 'none', // gridBorder模式
  // frozenColCount: 1, // 固定列
  /*theme: {
    // borderColor: 'green',
    // highlightBorderColor: '#c407ef',
    // highlightBgColor: '#84de8e',
    selectionBgColor: '#c19797',
    underlayBackgroundColor: '#00f178', // 未绘制区域背景
    // frozenRowsBorderColor: 'red'
  }*/
})
// grid.records = [ ...records, ...records, ...records, ...records, ...records ]
grid.records = [ ...records ]

