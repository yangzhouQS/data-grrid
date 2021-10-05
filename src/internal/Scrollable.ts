import { getScrollBarSize } from './style'
import { EventHandler } from './EventHandler'
import { browser } from './utils'

const MAX_SCROLL = browser.heightLimit - 1000

export class Scrollable {
    private _handler: EventHandler
    private _scrollable: HTMLDivElement
    private _height: number
    private _width: number
    private _endPointElement: HTMLDivElement
    private _p = 1

    constructor() {
        this._handler = new EventHandler()

        this._scrollable = document.createElement('div')
        this._scrollable.classList.add('grid-scrollable')
        this._height = 0
        this._width = 0

        this._endPointElement = document.createElement('div')
        this._endPointElement.classList.add('grid-scroll-end-point')
        this._update()
        this._scrollable.appendChild(this._endPointElement)
    }

    calcTop(top: number): number {
        const relativeTop = top - this.scrollTop
        return this._scrollable.scrollTop + relativeTop
    }

    getElement(): HTMLDivElement {
        return this._scrollable
    }

    setScrollSize(width: number, height: number): void {
        this._width = width
        this._height = height
        this._update()
    }

    get scrollWidth(): number {
        return this._width
    }

    set scrollWidth(width: number) {
        this._width = width
        this._update()
    }

    get scrollHeight(): number {
        return this._height
    }

    set scrollHeight(height: number) {
        this._height = height
        this._update()
    }

    get scrollLeft(): number {
        return Math.max(Math.ceil(this._scrollable.scrollLeft), 0)
    }

    set scrollLeft(scrollLeft: number) {
        this._scrollable.scrollLeft = scrollLeft
    }

    get scrollTop(): number {
        return Math.max(Math.ceil(this._scrollable.scrollTop / this._p), 0)
    }

    set scrollTop(scrollTop: number) {
        this._scrollable.scrollTop = scrollTop * this._p
    }

    onScroll(fn: (evt: Event) => void): void {
        this._handler.on(this._scrollable, 'scroll', fn)
    }

    dispose(): void {
        this._handler.dispose()
    }

    private _update(): void {
        let domHeight
        if (this._height > MAX_SCROLL) {
            const sbSize = getScrollBarSize()
            const { offsetHeight } = this._scrollable
            const vScrollRange = MAX_SCROLL - offsetHeight + sbSize
            const rScrollRange = this._height - offsetHeight + sbSize
            this._p = vScrollRange / rScrollRange
            domHeight = MAX_SCROLL
        } else {
            this._p = 1
            domHeight = this._height
        }

        const doWidth = this._width
        // TODO: windows 下横纵滚动条都存在时，显示多余空白问题

        this._endPointElement.style.top = `${ domHeight.toFixed() }px`
        this._endPointElement.style.left = `${ doWidth.toFixed() }px`
        // TODO 不让滚动条位置超出范围

    }
}
