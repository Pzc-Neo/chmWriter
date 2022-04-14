import { Shape } from '@antv/x6'

const { Rect, Circle, Path, Polygon, Ellipse } = Shape
export const makeX6GraphList = function (graphList) {
  const resultList = []
  let x6Graph = null
  graphList.forEach(_graph => {
    switch (_graph.type) {
      case 'Rect':
        x6Graph = new Rect(_graph.data)
        break
      case 'Circle':
        x6Graph = new Circle(_graph.data)
        break
      case 'Path':
        x6Graph = new Path(_graph.data)
        break
      case 'Polygon':
        x6Graph = new Polygon(_graph.data)
        break
      case 'Ellipse':
        x6Graph = new Ellipse(_graph.data)
        break

      default:
        break
    }
    resultList.push(x6Graph)
  })
  return resultList
}

export const loadBasicGraph = function (stencil) {
  try {
    const basicGraph = require('./basicGraph.json')
    const x6GraphList = makeX6GraphList(basicGraph.graphList)
    stencil.load(x6GraphList, basicGraph.groupName)
  } catch (error) {}
}

export const loadGraph = function (stencil) {
  loadBasicGraph(stencil)
}
