import { node } from './node'
import { edge } from './edge'
import { blank } from './blank'

export const menuListFactory = function (type) {
  switch (type) {
    case 'node':
      return node.call(this)
    case 'edge':
      return edge.call(this)
    case 'graph':
      return blank.call(this)
    default:
      break
  }
}
