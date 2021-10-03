import dataGrid from '../src/main'

console.log(dataGrid)
//
const records = [
	{ id: 1, name: 'liuMing', age: 26 },
	{ id: 2, name: 'tom', age: 18 },
	{ id: 3, name: 'sam', age: 34 },
	{ id: 4, name: 'lisa', age: 12 }
]
const grid = new dataGrid.ListGrid({
	parentElement: document.getElementById('app'),
	header: [
		{ field: 'id', caption: 'ID', width: 100 },
		{ field: 'name', caption: '名称', width: 200 },
		{ field: 'age', caption: '年龄', width: 200 }
	],
	frozenColCount: 1
})
grid.records = records
