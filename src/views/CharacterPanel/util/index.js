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
  const result = []
  itemList.forEach(item => {
    const newItem = {
      source: item.source_id,
      target: item.target_id,
      name: item.relation
    }
    result.push(newItem)
  })
  return result
}
