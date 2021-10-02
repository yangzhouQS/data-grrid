const parser = new DOMParser();
const ELEMENT_NODE = 1;

function findElement(el: Element, test: (child: Element) => boolean): Element | null {
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (child.nodeType !== ELEMENT_NODE) {
      continue;
    }
    if (test(child as Element)) {
      return child as Element;
    }
    const r = findElement(child as Element, test);
    if (r) {
      return r;
    }
  }
  return null;
}

class Svg {
  private _svg: HTMLElement;
  private _glyphs: { [key: string]: Element };
  private _glyphUnis: { [key: string]: Element };
  private _fontFace: Element | null | undefined;
  private _font: Element | null | undefined;
  public constructor(svgCode: string) {
    const document = parser.parseFromString(svgCode, 'image/svg+xml');
    this._svg = document.documentElement as HTMLElement;
    this._glyphs = {};
    this._glyphUnis = {};
  }
  public get svg() {
    return this._svg;
  }
  public get fontFaceElement() {
    if (!this._fontFace) {
      this._fontFace = this.findElement((child) => child.tagName.toLowerCase() === 'font-face');
    }
    return this._fontFace;
  }
  public get fontElement() {
    if (!this._font) {
      this._font = this.findElement((child) => child.tagName.toLowerCase() === 'font');
    }
    return this._font;
  }
  public findElement(test: (child: Element) => boolean): Element {
    return findElement(this.svg, test) as Element;
  }
  public findGlyph(glyphName: string) {
    return this._glyphs[glyphName] || (this._glyphs[glyphName] = this.findElement((child) => child.getAttribute('glyph-name') === glyphName));
  }
  public findGlyphByUnicode(unicode: string) {
    return this._glyphUnis[unicode] || (this._glyphUnis[unicode] = this.findElement((child) => child.getAttribute('unicode') === unicode));
  }
  public walkAllGlyph(callback: (child: Element) => void) {
    const walkGlyph = (el: Element, fn: (child: Element) => void) => {
      for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i] as Element;
        if (child.nodeType !== ELEMENT_NODE) {
          continue;
        }
        const unicode = child.getAttribute('unicode');
        if (unicode && child.getAttribute('d')) {
          if (!this._glyphUnis[unicode]) {
            this._glyphUnis[unicode] = child;
          }
          const glyphName = child.getAttribute('glyph-name');
          if (glyphName && !this._glyphs[glyphName]) {
            this._glyphs[glyphName] = child;
          }
          fn(child);
        } else {
          walkGlyph(child, fn);
        }
      }
    };
    walkGlyph(this.svg, callback);
  }
}

export default Svg;
