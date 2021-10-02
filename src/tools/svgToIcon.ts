import Svg from './Svg'

const ELEMENT_NODE = 1

function polygonToPath(polygon: Element) {
	const points = polygon.getAttribute('points')
	return `M${ points }z`
}

function polylineToPath(polyline: Element) {
	const points = polyline.getAttribute('points')
	return `M${ points }`
}

function circleToPath(circle: Element) {
	const cx = Number(circle.getAttribute('cx'))
	const cy = Number(circle.getAttribute('cy'))
	const r = Number(circle.getAttribute('r'))

	// https://tyru.github.io/svg-circle-misc-algorithm/
	const SEGMENTS = 8
	const ANGLE = (2 * Math.PI) / SEGMENTS
	const anchorX = (theta: number) => r * Math.cos(theta)
	const anchorY = (theta: number) => r * Math.sin(theta)
	const controlX = (theta: number) => anchorX(theta) + r * Math.tan(ANGLE / 2) * Math.cos(theta - Math.PI / 2)
	const controlY = (theta: number) => anchorY(theta) + r * Math.tan(ANGLE / 2) * Math.sin(theta - Math.PI / 2)

	let paths = `M${ cx + r } ${ cy }`
	for (let index = 1; index <= SEGMENTS; index++) {
		const theta = index * ANGLE
		paths += `Q${ controlX(theta) + cx } ${ controlY(theta) + cy } ${ anchorX(theta) + cx } ${ anchorY(theta) + cy }`
	}
	return paths
}

function getD(path: Element) {
	const fill = path.getAttribute('fill')
	if (fill === 'none') {
		return ''
	}
	return (path.getAttribute('d') as string).replace(/[\n\r]/g, '')
}

function elementToPaths(el: Element) {
	let path = ''
	switch (el.tagName.toLowerCase()) {
	case 'path':
	case 'glyph':
		path = getD(el)
		break
	case 'circle':
		path = circleToPath(el)
		break
	case 'polygon':
		path = polygonToPath(el)
		break
	case 'polyline':
		path = polylineToPath(el)
		break
	case 'g':
		for (let i = 0; i < el.childNodes.length; i++) {
			const child = el.childNodes[i]
			if (child.nodeType !== ELEMENT_NODE) {
				continue
			}
			if (!(child as Element).getAttribute('fill')) {
				(child as Element).setAttribute('fill', el.getAttribute('fill') as string)
			}
			path += elementToPaths(child as Element)
		}
		break
	default:
		window.console.warn(`unsupported:${ el.tagName }`, `@ ${ el.innerHTML }`)
	}
	return path
}

function buildObject(
		obj: {
        offsetX?: number;
        offsetY?: number;
        width?: number;
        height?: number;
        d?: string;
        isGlyph?: boolean;
        html?: string;
    } = {}
) {
	const icon: {
        d: string;
        height: number;
        width: number;
        html: string;
        ud?: boolean; // upside Down
        offsetX?: number;
        offsetY?: number;
    } = {
    	d: obj.d || '',
    	html: obj.html || '',
    	height: obj.height || 0,
    	width: obj.width || 0
    }
	if (obj.isGlyph) {
		icon.ud = true
	}
	if (obj.offsetX !== undefined) {
		icon.offsetX = obj.offsetX
	}
	if (obj.offsetY !== undefined) {
		icon.offsetY = obj.offsetY
	}
	return icon
}

function glyphToJSON(
		svgCode: string,
		opt: {
        glyphName?: string;
        unicode?: string;
    }
) {
	const svg = new Svg(svgCode)

	function findGlyph(): any {
		if (opt.glyphName) {
			return svg.findGlyph(opt.glyphName)
		} else if (opt.unicode) {
			return svg.findGlyphByUnicode(opt.unicode)
		}
	}

	const fontFace = svg.fontFaceElement || {
		getAttribute(qualifiedName: string) {
			return null
		}
	}
	const font = svg.fontElement || {
		getAttribute(qualifiedName: string) {
			return null
		}
	}
	const glyph = findGlyph() as Element
	// 左下角的x坐标值，同y坐标值，右上角的x坐标值，同y坐标值
	// const bbox = (fontFace.getAttribute("bbox") || "").split(" ");
	// bbox.st = {
	// 	x: bbox[0] - 0,
	// 	y: bbox[1] - 0,
	// };
	// bbox.ed = {
	// 	x: bbox[2] - 0,
	// 	y: bbox[3] - 0,
	// };

	const fontHorizAdvX = Number(font.getAttribute('horiz-adv-x')) || 0
	const fontVertAdvX = Number(font.getAttribute('vert-adv-x')) || 0
	const horizAdvX = Number(glyph.getAttribute('horiz-adv-x')) || fontHorizAdvX || 0
	const vertAdvX = Number(glyph.getAttribute('vert-adv-x')) || fontVertAdvX || 0

	const unitsPerEm = Number(fontFace.getAttribute('units-per-em')) || 1000
	// const ascent = Number(fontFace.getAttribute("ascent")) || (unitsPerEm - vertAdvX);
	const descent = Number(fontFace.getAttribute('descent')) || vertAdvX

	let size = unitsPerEm
	const contentSize = {
		height: vertAdvX || unitsPerEm,
		width: horizAdvX || unitsPerEm
	}
	if (horizAdvX > size) {
		size = horizAdvX
	}
	if (vertAdvX > size) {
		size = vertAdvX
	}

	let offsetX = 0 // -bbox.st.x || 0;
	let offsetY = -descent
	offsetX += Math.round((size - contentSize.width) / 2)
	offsetY += Math.round((size - contentSize.height) / 2)

	const d = elementToPaths(glyph)

	return buildObject({
		d,
		height: size,
		html: glyph.outerHTML,
		isGlyph: true,
		offsetX,
		offsetY,
		width: size
	})
}

function svgToJSON(svgCode: string) {
	const { svg } = new Svg(svgCode)
	const viewBox = (svg.getAttribute('viewBox') || '').split(' ')
	const width = Number(svg.getAttribute('width') || viewBox[2]) || 0
	const height = Number(svg.getAttribute('height') || viewBox[3]) || 0
	const offsetX = 0 - Number(viewBox[0]) || 0
	const offsetY = 0 - Number(viewBox[1]) || 0

	let d = ''
	for (let i = 0; i < svg.childNodes.length; i++) {
		const el = svg.childNodes[i]
		if (el.nodeType !== ELEMENT_NODE) {
			continue
		}
		d += elementToPaths(el as Element)
	}
	return buildObject({
		d,
		height,
		html: svgCode,
		offsetX,
		offsetY,
		width
	})
}

const svgToIcon = (
		svgCode: string,
		opt: {
        glyphName?: string;
        unicode?: string;
    } = {}
) => {
	if (opt.glyphName || opt.unicode) {
		return glyphToJSON(svgCode, opt)
	} else {
		return svgToJSON(svgCode)
	}
}

export default svgToIcon
