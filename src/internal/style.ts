/**
 * 计算滚动条宽度
 * @return {number}
 */
function getScrollBarWidth(): number {
	const dummy = document.createElement('div')
	const { style } = dummy
	style.position = 'absolute'
	style.height = '9999px'
	style.width = 'calc(100vw - 100%)'
	style.opacity = '0'
	dummy.textContent = 'x'
	document.body.appendChild(dummy)
	const { width } = (document.defaultView || window).getComputedStyle(dummy, '')
	document.body.removeChild(dummy)
	return parseInt(width, 10)
}

let SCROLLBAR_SIZE: number
import './style.css'

/**
 * 滚动条相关初始化
 */
function initDocumentInternal(): void {
	SCROLLBAR_SIZE = getScrollBarWidth() || 10
	const style = document.createElement('style')
	style.setAttribute('type', 'text/css')
	style.setAttribute('data-name', 'cheetah-grid')
	style.innerHTML = `
.data-grid .grid-scrollable {
	overflow: scroll;
}
.data-grid .grid-scroll-end-point {
	width: ${ SCROLLBAR_SIZE }px;
	height: ${ SCROLLBAR_SIZE }px;
}
.data-grid > canvas {
	width: -webkit-calc(100% - ${ SCROLLBAR_SIZE }px);
	width: calc(100% - ${ SCROLLBAR_SIZE }px);
	height: -webkit-calc(100% - ${ SCROLLBAR_SIZE }px);
	height: calc(100% - ${ SCROLLBAR_SIZE }px);
}
		`
	document.head.appendChild(style)
}

let initDocumentVar = initDocumentInternal

export function initDocument(): void {
	initDocumentVar()
	initDocumentVar = Function.prototype as () => void
}

export function getScrollBarSize(): number {
	return SCROLLBAR_SIZE
}
