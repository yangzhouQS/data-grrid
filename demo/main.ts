import * as dataGrid from '../src/main'
import './styles/index.css'
import { records } from './data.js'
import { TreeDataHelper } from './treeDataHelper/treeDataHelper'

const parentKey = TreeDataHelper.getParentKeySet(records, 'parentId')
const cachedDataSource = dataGrid.data.CachedDataSource.ofArray(records)
console.log(cachedDataSource)
const treeDataSource = new dataGrid.data.TreeDataSource(cachedDataSource, {
    keyField: 'id',
    parentKeyField: 'parentId',
    // expandedKeys: [30], // 默认展开的节点 keyField 值数组
    /*hasChildren: function (rec) { // <- 此方法会频繁触发
        // 返回当前记录（rec）是否有字节点
        return !rec.isCheck && parentKey.includes(rec.id)
    },*/
    // <- 此方法只有当rec有子节点且treeDataSource找不到子节点数据时才触发
    getChildren: function (rec, all) {
        // 返回当前记录（rec）的子节点记录数组
        // all为false表示只返回一级子节点；为true则表示返回全部的子节点
        if (!parentKey.includes(rec.id)) {
            return Promise.resolve([])
        }
    }
})

const grid = new dataGrid.ListGrid({
    parentElement: document.getElementById('app'),
    dataSource: treeDataSource,
    header: [
        {
            caption: '序号',
            width: 100,
            columnType: new dataGrid.columns.type.Column<any>({
                transformRecord({ value, displayValue, cell, grid }) {
                    return cell.row - grid.frozenRowCount + 1
                }
            }),
            style: {
                textAlign: 'center'
            }
        },
        {
            field: 'name',
            caption: '工号',
            width: 200,
            columnType: new dataGrid.columns.type.TreeColumn({
                canToggle: function (e) {
                    if (e.type !== 'over') {
                    }
                    return true
                },
                toggled: function (e) {
                    console.log('toggle')
                },
                multilineText: true
            })
        },
        {
            field: 'fullName',
            caption: '工号全称',
            width: 300
        },
        {
            field: 'ghState',
            caption: '施工状态',
            width: 80
        },
        {
            field: 'creatorName',
            caption: '创建人',
            width: 180
        },
        {
            field: 'createdAt',
            caption: '创建时间',
            width: 240
        }
    ],
    headerRowHeight: 40, // header行高
    defaultRowHeight: 50,
    // hiddenHeader: true,// 隐藏列头
    readonly: true,
    // frozenColCount: 1, // 固定列
    theme: {
        borderColor: '#e3e3e3',
        highlightBorderColor: '#2373c8',
        highlightBgColor: '#84de8e',
        selectionBgColor: '#c19797'
        // frozenRowsBorderColor: 'red'
    }
})

// grid.dataSource.expandAll() // 展开全部
