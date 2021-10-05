import { isPromise } from '../internal/utils'
import { DataSource } from './DataSource'
import { MaybePromiseOrUndef } from '../ts-types'

type TExpandedKeys = number[] | string[]

interface ITreeDataSourceOptions<T> {
  keyField: string
  parentKeyField: string
  expandedKeys?: TExpandedKeys
  hasChildren?: (rec?: T | null) => boolean
  getChildren?: (
    rec?: T | null,
    all?: boolean
  ) =>
    | T[]
    | Promise<
        | T[]
        | {
            records: T[]
            expandedKeys?: TExpandedKeys
          }
      >
}

export interface ITreeInfo {
  expanded: boolean
  isLast: boolean
  isLeaf: boolean
  key: any
  level: number
  levelLast: boolean[]
  parentKey: any
}

interface IRecordMap<T> {
  [key: string]: T
  [key: number]: T
}

interface IRecordsMap<T> {
  [key: string]: T[]
  [key: number]: T[]
}

interface ILevelMap {
  [key: string]: number
  [key: number]: number
}

interface ILastMap {
  [key: string]: boolean
  [key: number]: boolean
}

interface IExpandMap {
  [key: string]: boolean
  [key: number]: boolean
}

function _initLevel<T>(ds: any, record: T, level: number) {
	const key = (record as any)[ds.options.keyField]
	ds._levelMap[key] = level
	const children = ds._pIdMap[key] || []
	for (const child of children) {
		_initLevel(ds, child, level + 1)
	}
}

function _initLast<T>(ds: any, records: T[]) {
	if (records && records.length > 0) {
		const key = (records as any)[records.length - 1][ds.options.keyField]
		ds._lastMap[key] = true
	}
}

function _expandAll<T>(ds: any, record: T) {
	const key = (record as any)[ds.options.keyField]
	const children = ds._pIdMap[key] || []
	if (children.length > 0) {
		ds._expandMap[key] = true
		for (const r of children) {
			_expandAll(ds, r)
		}
	}
}

function _getExpandRecords<T>(ds: any, record: T): T[] {
	let records = []
	const key = (record as any)[ds.options.keyField]
	if (ds._expandMap[key]) {
		const children = ds._pIdMap[key] || []
		for (const r of children) {
			records.push(r)
			records = records.concat(_getExpandRecords(ds, r))
		}
	}
	return records
}

function _getCollapseRecordCount(ds: any, index: number) {
	const record = ds._records[index]
	const key = record[ds.options.keyField]
	const level = ds._levelMap[key]
	let count = 0
	for (let i = index + 1; i < ds._records.length; i++) {
		const r = ds._records[i]
		const k = r[ds.options.keyField]
		if (level < ds._levelMap[k]) {
			count++
		} else {
			break
		}
	}
	return count
}

function _expand<T>(
		ds: any,
		record: T | null,
		all: boolean,
		silent: number,
		callback?: (ds: any, record: T | null, all: boolean, silent: number) => void
) {
	if (record) {
		const index = ds._records.indexOf(record)
		const key = (record as any)[ds._options.keyField]
		if (ds._pIdMap[key]) {
			if (!ds._expandMap[key]) {
				if (all) {
					_expandAll(ds, record)
				} else {
					ds._expandMap[key] = true
				}
				ds._records.splice(index + 1, 0, ..._getExpandRecords(ds, record))
			} else if (all) {
				_expandAll(ds, record)
				ds._records.splice(
						index + 1,
						_getCollapseRecordCount(ds, index),
						..._getExpandRecords(ds, record)
				)
			}
			if (silent === 0) {
				ds.length = ds._records.length
			}
		} else if (callback) {
			callback(ds, record, all, silent)
		}
	}
}

function _collapseAll<T>(ds: any, record: T) {
	const key = (record as any)[ds.options.keyField]
	delete ds._expandMap[key]
	const children = ds._pIdMap[key] || []
	for (const r of children) {
		_collapseAll(ds, r)
	}
}

function _parentKey(ds: any, key: any) {
	const record = ds._idMap[key]
	const parentKey = record[ds.options.parentKeyField]
	return parentKey
}

function _rebuildTree(ds: any, silent: number) {
	// 构建显示记录列表
	ds._levelMap = {} // 级别索引列表
	ds._lastMap = {} // 是否末节点列表
	ds._rootRecords = [] // 根记录对象列表
	ds._records = [] // 显示记录列表
	for (const parentKey in ds._pIdMap) {
		if (ds._pIdMap.hasOwnProperty(parentKey)) {
			const records = ds._pIdMap[parentKey]
			if (ds._idMap[parentKey]) {
				_initLast(ds, records)
			} else {
				for (const item of records) {
					_initLevel(ds, item, 0)
					ds._rootRecords.push(item)
					ds._records.push(item)
					ds._records.push(..._getExpandRecords(ds, item))
				}
			}
		}
	}
	_initLast(ds, ds._rootRecords)

	// 清理展开信息
	for (const key in ds._expandMap) {
		if (!ds._pIdMap[key]) {
			delete ds._expandMap[key]
		}
	}

	if (silent === 0) {
		ds.length = ds._records.length
	}
}

function _lazyLoadRecords<T>(
		ds: any,
		records: T[],
		expandedKeys: TExpandedKeys | null,
		silent: number
) {
	let hasNewRecords = false
	for (const record of records) {
		const key = (record as any)[ds._options.keyField]
		if (!ds._idMap[key]) {
			hasNewRecords = true
			const pKey = (record as any)[ds._options.parentKeyField]
			ds._idMap[key] = record
			ds._pIdMap[pKey] = ds._pIdMap[pKey] || []
			ds._pIdMap[pKey].push(record)
			if (
				expandedKeys &&
        Array.isArray(expandedKeys) &&
        (expandedKeys as (string | number)[]).indexOf(key) >= 0
			) {
				ds._expandMap[key] = true
			}
		}
	}
	if (hasNewRecords) {
		_rebuildTree(ds, silent)
	}
}

function _lazyLoadChildren<T>(
		ds: any,
		record: T | null,
		all: boolean,
		silent: number,
		callback?: (ds: any, record: T | null, all: boolean, silent: number) => void
) {
	if (
		ds._options.hasChildren &&
    ds._options.getChildren &&
    ds._options.hasChildren(record)
	) {
		const records = ds._options.getChildren(record, all)
		if (isPromise(records)) {
			records.then((recs) => {
				const rs = Array.isArray(recs) ? recs : recs.records
				const expandedKeys = Array.isArray(recs) ? undefined : recs.expandedKeys
				_lazyLoadRecords(ds, rs, expandedKeys, silent)
				if (callback) {
					callback(ds, record, all, silent)
				}
			})
		} else {
			_lazyLoadRecords(ds, records, null, silent)
			if (callback) {
				callback(ds, record, all, silent)
			}
		}
	}
}

/**
 * grid data source for tree
 */
export class TreeDataSource<T> extends DataSource<T> {
	public static get EVENT_TYPE() {
		return DataSource.EVENT_TYPE
	}

  private _dataSource: DataSource<T>

  private _options: ITreeDataSourceOptions<T>

  private _expandMap: IExpandMap

  private _idMap: IRecordMap<T> = {}

  private _pIdMap: IRecordsMap<T> = {}

  private _levelMap: ILevelMap = {}

  private _lastMap: ILastMap = {}

  private _rootRecords: T[] = []

  private _records: T[] = []

  private _updateLengthSilentCounter: number = 0

  public constructor(
  		dataSource: DataSource<T>,
  		options: ITreeDataSourceOptions<T>
  ) {
  	super(dataSource)
  	this._dataSource = dataSource

  	this._options = options

  	this._expandMap = {}
  	for (const key of options.expandedKeys || []) {
  		this._expandMap[key] = true
  	}

  	this.refreshInternal()
  }

  public get options() {
  	return this._options
  }

  public get expandedKeys() {
  	return Object.keys(this._expandMap)
  }

  protected getOriginal(index: number): MaybePromiseOrUndef<T> {
  	return this._records[index]
  }

  public getTreeInfo(index: number): ITreeInfo | undefined {
  	const record = this.getOriginal(index)
  	if (record) {
  		const key = (record as any)[this._options.keyField]
  		const parentKey = _parentKey(this, key)
  		const expanded = !!this._expandMap[key]
  		let isLeaf = !this._pIdMap[key]
  		const isLast = !!this._lastMap[key]
  		const level = this._levelMap[key]

  		const levelLast = []
  		let k = key
  		for (let i = 0; i < level; i++) {
  			levelLast.unshift(!!this._lastMap[k])
  			k = _parentKey(this, k)
  		}

  		if (isLeaf && this._options.hasChildren) {
  			isLeaf = !this._options.hasChildren(record as T)
  		}

  		return {
  			expanded,
  			isLast,
  			isLeaf,
  			key,
  			level,
  			levelLast,
  			parentKey,
  		}
  	} else {
  		return undefined
  	}
  }

  public getIndexByKey(key: number | string) {
  	return this._records.indexOf(this._idMap[key])
  }

  public expandAll() {
  	this._records.length = 0
  	for (const record of this._rootRecords) {
  		_expandAll(this, record)
  		this._records.push(record)
  		this._records.push(..._getExpandRecords(this, record))
  	}
  	this.length = this._records.length
  }

  public expand(index: number, all: boolean = false) {
  	const record = this.getOriginal(index)
  	_expand(this, record, all, this._updateLengthSilentCounter,
  			(ds1, record1, all1, silent1) => {
  				_lazyLoadChildren(ds1, record1, all1, silent1, (ds2, record2, all2, silent2) => {
  					_expand(ds2, record2, all2, silent2)
  				})
  			})
  }

  public expandToKey(key: number | string) {
  	// 根据指定的主键，展开到该记录，并返回索引值
  	const parentKeys = []
  	let value = key
  	let record = this._idMap[value]
  	while (record) {
  		value = (record as any)[this._options.parentKeyField]
  		record = this._idMap[value]
  		if (record) {
  			parentKeys.unshift(value)
  		}
  	}
  	this._updateLengthSilentCounter++
  	try {
  		for (const parentKey of parentKeys) {
  			this.expand(this._records.indexOf(this._idMap[parentKey]))
  		}
  	} finally {
  		this._updateLengthSilentCounter--
  		if (this._updateLengthSilentCounter === 0) {
  			this.length = this._records.length
  		}
  	}
  	return this.getIndexByKey(key)
  }

  public expandToLevel(level: number) {
  	// 展开到指定级别
  	const targets = []
  	if (level > 0) {
  		this._updateLengthSilentCounter++
  		try {
  			for (const key in this._levelMap) {
  				if (this._levelMap.hasOwnProperty(key)) {
  					if (
  						level === this._levelMap[key] ||
              (level > this._levelMap[key] && this._lastMap[key])
  					) {
  						targets.push(this.expandToKey(key))
  					}
  				}
  			}
  		} finally {
  			this._updateLengthSilentCounter--
  			if (this._updateLengthSilentCounter === 0) {
  				this.length = this._records.length
  			}
  		}
  	}
  	return targets
  }

  public collapseAll() {
  	this._records.length = 0
  	this._records.push(...this._rootRecords)
  	this._expandMap = {}
  	this.length = this._records.length
  }

  public collapse(index: number, all?: boolean) {
  	const record = this.getOriginal(index)
  	if (record) {
  		const key = (record as any)[this._options.keyField]
  		if (this._pIdMap[key]) {
  			if (this._expandMap[key]) {
  				if (all) {
  					_collapseAll(this, record)
  				} else {
  					delete this._expandMap[key]
  				}
  				this._records.splice(index + 1, _getCollapseRecordCount(this, index))
  				this.length = this._records.length
  			} else if (all) {
  				_collapseAll(this, record)
  			}
  		}
  	}
  }

  public toggle(index: number, all?: boolean) {
  	const record = this.getOriginal(index)
  	if (record) {
  		const key = (record as any)[this._options.keyField]
  		if (this._expandMap[key]) {
  			this.collapse(index, all)
  		} else {
  			this.expand(index, all)
  		}
  	}
  }

  get source(): any {
  	return this._dataSource.source
  }

  get dataSource(): DataSource<T> {
  	return this._dataSource
  }

  protected refreshInternal() {
  	// 构建 id 和 pId 与记录的对应关系
  	this._idMap = {}
  	this._pIdMap = {}
  	for (let i = 0; i < this._dataSource.length; i++) {
  		const key = this._dataSource.getField(i, this._options.keyField as any)
  		const parentKey = this._dataSource.getField(
  				i,
        this._options.parentKeyField as any
  		)
  		const record = this._dataSource.get(i)
  		this._idMap[key] = record as any
  		this._pIdMap[parentKey] = this._pIdMap[parentKey] || []
  		this._pIdMap[parentKey].push(record as any)
  	}

  	// 构建显示记录列表
  	_rebuildTree(this, this._updateLengthSilentCounter)

  	if (this.length === 0) {
  		_lazyLoadChildren(this, null, false, this._updateLengthSilentCounter)
  	}
  }
}
