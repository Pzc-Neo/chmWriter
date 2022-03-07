export const convertToRelationData = function (itemList) {
  const result = []
  itemList.forEach(item => {
    const newItem = {
      id: item.id,
      name: item.title,
      des: item.description,
      SymbolSize: item?.symbol_size || 70
    }
    result.push(newItem)
  })
  return result
}

export const convertToRelationLink = function (itemList) {
  const standard = 10
  const maxLen = getMaxStrLen(itemList)
  const countMap = countLine(itemList)
  const result = []
  itemList.forEach(item => {
    const itemLen = item.relation.length
    const mapKey = item.source_id + item.target_id
    const newItem = {
      id: mapKey,
      source: item.source_id,
      target: item.target_id,
      name: item.relation,
      // 可以映射成连接线的长度
      value1: standard / ((itemLen / maxLen) * standard),
      lineStyle: {
        width: 2,
        curveness: countMap[mapKey] === 1 ? 0 : 0.5
      }
    }
    console.log(newItem)
    result.push(newItem)
  })
  return result
}

function getMaxStrLen(sourceList) {
  let maxLen = 1
  sourceList.forEach(item => {
    const itemLen = item.relation.length
    if (itemLen > maxLen) {
      maxLen = itemLen
    }
  })
  return maxLen
}

/**
 * count line between two node
 * @param {Object} itemList
 * @returns Object
 */
function countLine(itemList) {
  const resultMap = {}
  itemList.forEach(item => {
    let temp = item.source_id + item.target_id
    addToMap(temp)
    temp = item.target_id + item.source_id
    addToMap(temp)
  })
  function addToMap(item) {
    if (item in resultMap) {
      resultMap[item] += 1
    } else {
      resultMap[item] = 1
    }
  }
  return resultMap
}
