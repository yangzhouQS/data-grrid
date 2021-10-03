import dataGrid from '../src/main'
import './styles/index.css'

const records = [
	{ id: 1, name: 'liuMing', age: 26, check: false, phone: '1008611', sex: '男', email: '263849722@qq.com' },
	{ id: 2, name: 'tom', age: 18, check: false, phone: '1008611', sex: '男', email: '263849722@qq.com' },
	{ id: 3, name: 'sam', age: 34, check: true, phone: '1008611', sex: '男', email: '263849722@qq.com' },
	{ id: 4, name: 'lisa', age: 12, check: true, phone: '1008611', sex: '男', email: '263849722@qq.com' }
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
			caption: '操作',
			width: 200,
			columnType: new dataGrid.columns.type.ButtonColumn({
				caption: '点击'
			}),
			action: new dataGrid.columns.action.ButtonAction({
				disabled: false
			})
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
	defaultRowHeight: 50,
	hiddenHeader: true,
	readonly: true,
	frozenColCount: 1
})
grid.records = records
