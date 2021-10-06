const scrollBarCss = `/**
 * core styles
 */
.data-grid .grid-scrollable {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: scroll;
}

.data-grid .grid-scroll-end-point {
  opacity: 0;
  position: relative;
}

.data-grid {
  position: relative;
  width: 100%;
  height: 100%;
}

.data-grid > canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.data-grid .grid-focus-control {
  position: relative !important;
  width: 1px;
  height: 1px;
  opacity: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  pointer-events: none;
  max-width: 0;
  max-height: 0;
  float: none !important;
}

.data-grid input.grid-focus-control::-ms-clear {
  visibility: hidden;
}

.data-grid input.grid-focus-control.composition {
  opacity: 1;
  max-width: none;
  max-height: none;
}
`

/**
 * 计算滚动条宽度
 * @return {number}
 */
// function getScrollBarWidth_backup(): number {
//     const dummy = document.createElement('div')
//     const { style } = dummy
//     style.position = 'absolute'
//     style.height = '9999px'
//     style.width = 'calc(100vw - 100%)'
//     style.opacity = '0'
//     dummy.textContent = 'x'
//     document.body.appendChild(dummy)
//     const { width } = (document.defaultView || window).getComputedStyle(dummy, '')
//     document.body.removeChild(dummy)
//     return parseInt(width, 10)
// }
/**
 * 计算滚动条宽度
 * @return {number}
 */
function getScrollBarWidth() {
    // https://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
    const inner = document.createElement('p')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    outer.style.position = 'absolute'
    outer.style.top = '0px'
    outer.style.left = '0px'
    outer.style.visibility = 'hidden'
    outer.style.width = '200px'
    outer.style.height = '150px'
    outer.style.overflow = 'hidden'
    outer.appendChild(inner)

    document.body.appendChild(outer)
    const w1 = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let w2 = inner.offsetWidth
    if (w1 === w2) {
        w2 = outer.clientWidth
    }

    document.body.removeChild(outer)

    return w1 - w2
}

let SCROLLBAR_SIZE: number = 0


/**
 * 滚动条相关初始化
 */
function initDocumentInternal(): void {
    let css = scrollBarCss
    SCROLLBAR_SIZE = getScrollBarWidth() || 10
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('data-name', 'data-grid')
    style.setAttribute('id', 'data-grid')

    css += `
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
        } `
    style.innerHTML = css
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
