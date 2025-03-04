import { svgPathBbox } from 'svg-path-bbox'
import svgpath from 'svgpath'
import loadSimpleIcons from './load-simple-icons.js'

const simpleIcons = loadSimpleIcons()

function svg2base64(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg.trim()).toString(
    'base64',
  )}`
}

function getIconSize(iconKey) {
  if (!(iconKey in simpleIcons)) {
    return undefined
  }

  const [x0, y0, x1, y1] = svgPathBbox(simpleIcons[iconKey].path)
  return { width: x1 - x0, height: y1 - y0 }
}

function resetIconPosition(path) {
  const [offsetX, offsetY] = svgPathBbox(path)
  const pathReset = svgpath(path).translate(-offsetX, -offsetY).toString()
  return pathReset
}

export { svg2base64, getIconSize, resetIconPosition }
