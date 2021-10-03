import dataGrid from '../src/main'
import './styles/index.css'

const records = [
	{
		id: 1,
		name: 'liuMing',
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
		{ field: 'id', caption: 'ID', width: 100 },
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
			width: 300,
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
		{ field: 'sex', caption: '性别', width: 300 },
		{ field: 'email', caption: '邮件', width: '10%' },
		{
			field: 'check',
			caption: 'check',
			width: 120,
			columnType: 'check',
			action: 'check'
		},
		{
			field: 'value',
			caption: '数字列',
			width: 180,
			columnType: new dataGrid.columns.type.NumberColumn({})
		},
		{
			caption: '操作',
			width: 200,
			columnType: new dataGrid.columns.type.ButtonColumn({
				caption: '点击',
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
			width: 120,
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
			width: 260,
			columnType: new dataGrid.columns.type.MenuColumn({ options }),
			style: {
				appearance: 'none'
			}
		}
		// {
		// field: 'aa',
		// caption: '操作',
		// width: 200,
		// columnType: new dataGrid.columns.type.ButtonColumn({
		// caption: 'show rec'
		// }),
		// action: new dataGrid.columns.action.ButtonAction({
		// action(rec) {
		// alert(JSON.stringify(rec))
		// }
		// })
		// }
	],
	headerRowHeight: 60, // header行高
	defaultRowHeight: 60,
	hiddenHeader: true,
	readonly: true,
	frozenColCount: 1
})
grid.records = records
