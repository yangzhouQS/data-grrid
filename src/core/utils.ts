import { DrawGrid } from './DrawGrid'

let idStart = 666666;
/**
 * Generate unique id
 */
export function guid(): number {
	return idStart++;
}

let dpr = 1
if (typeof window !== 'undefined') {
	dpr = Math.max(window.devicePixelRatio
		|| (window.screen && (window.screen as any).deviceXDPI / (window.screen as any).logicalXDPI)
		|| 1, 1)
}

// retina 屏幕优化
export const devicePixelRatio = dpr;

/**
 * 创建画布设置大小
 * @param grid
 * @param parentElement
 * @param dpr
 */
export function createDom(grid: DrawGrid, parentElement: HTMLElement, dpr?: number): HTMLCanvasElement {
	const newDom = document.createElement('canvas')
	const width = _getSize(0, parentElement)
	const height = _getSize(1, parentElement)
	dpr = dpr || devicePixelRatio

	const newDomStyle = newDom.style
	if (newDomStyle) {  // In node or some other non-browser environment
		newDomStyle.position = 'absolute'
		newDomStyle.left = '0'
		newDomStyle.top = '0'
		newDomStyle.width = width + 'px'
		newDomStyle.height = height + 'px'

		newDom.setAttribute('data-grid-dom-id', '10086')
	}

	newDom.width = width * dpr
	newDom.height = height * dpr

	return newDom
}

function parseInt10(val: string): number {
	return parseInt(val, 10)
}

/**
 * 根据DOM获取元素宽度和高度
 * @param whIdx
 * @param root
 */
export function _getSize(whIdx: number, root: HTMLElement) {
	window['_rootDom'] = root
	const wh = [ 'width', 'height' ][whIdx] as 'width' | 'height'
	const cwh = [ 'offsetWidth', 'offsetHeight' ][whIdx] as 'offsetWidth' | 'offsetHeight'
	const plt = [ 'paddingLeft', 'paddingTop' ][whIdx] as 'paddingLeft' | 'paddingTop'
	const prb = [ 'paddingRight', 'paddingBottom' ][whIdx] as 'paddingRight' | 'paddingBottom'
	const stl = document.defaultView.getComputedStyle(root, null)
	return (
		(root[cwh] || parseInt10(stl[wh]) ||
			parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0)
	) | 0
}

/**
 * 创建画布容器
 * @param parentElement
 */
export function createRoot(parentElement: HTMLElement): HTMLElement {
	const rootStyle = parentElement.style
	if (rootStyle) {
		rootStyle['webkitTapHighlightColor'] = 'transparent'
		rootStyle.webkitUserSelect = 'none'
		rootStyle.userSelect = 'none';
		(rootStyle as any)['-webkit-touch-callout'] = 'none'
		parentElement.innerHTML = ''
	}
	const width = _getSize(0, parentElement)
	const height = _getSize(1, parentElement)
	const domRoot = document.createElement('div')
	domRoot.classList.add('data-grid')
	domRoot.style.cssText = [
		'position:relative',
		// IOS13 safari probably has a compositing bug (z order of the canvas and the consequent
		// dom does not act as expected) when some of the parent dom has
		// `-webkit-overflow-scrolling: touch;` and the webpage is longer than one screen and
		// the canvas is not at the top part of the page.
		// Check `https://bugs.webkit.org/show_bug.cgi?id=203681` for more details. We remove
		// this `overflow:hidden` to avoid the bug.
		// 'overflow:hidden',
		'width:' + width + 'px',
		'height:' + height + 'px',
		'padding:0',
		'margin:0',
		'border-width:0',
		// 'overflow:visible',
		// '-webkit-transform: translateZ(0)'
	].join(';') + ';'

	return domRoot
}

// function createRootElement(): HTMLElement {
// 	const element = document.createElement('div')
// 	element.classList.add('data-grid')
// 	return element
// }
