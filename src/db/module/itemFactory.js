/**
 * Every factory return a object that can use by `Vue.property.$db.insert`
 * example:
 *     const item = new ChapterGroupFactory('','root', 0)
 *     this.$db.insert(item)
 * Boolean value: do not use `true/false`, sqlite3 dosn't suport. use `1/0` instead.
 */

import { randomStr } from '@/util/base'

export const DataGroupFactory = function (title, pid, sort) {
  const date = Date.now()
  return {
    tableName: 'data_groups',
    data: {
      id: randomStr(),
      title: title,
      description: '',
      pid: pid,
      is_expand: 1,
      created: date,
      updated: date,
      sort: sort
    }
  }
}

export const DataFactory = function (title, groupId, sort) {
  const date = Date.now()
  return {
    tableName: 'datas',
    data: {
      id: randomStr(),
      group_id: groupId,
      title: title,
      source: 1,
      content: '',
      other: '',
      words: 0,
      created: date,
      updated: date,
      note: '',
      language: 0,
      sort: sort
    }
  }
}

export const ChapterGroupFactory = function (title, pid, sort) {
  const date = Date.now()
  return {
    tableName: 'chapter_groups',
    data: {
      id: randomStr(),
      title: title,
      pid: pid || 'root',
      is_export: 1,
      created: date,
      updated: date,
      sort: sort
    }
  }
}

export const ChapterFactory = function (title, groupId, sort) {
  const date = Date.now()
  return {
    tableName: 'chapters',
    data: {
      id: randomStr(),
      group_id: groupId,
      title: title,
      created: date,
      updated: date,
      content: '',
      language: 0,
      words: 0,
      target_words: 3000,
      type: 0,
      status: 0,
      is_export: 1,
      note: '',
      foreshadowing: '',
      rate: 0,
      sign: '',
      other: '',
      sort: sort
    }
  }
}

export const WorldGroupFactory = function (title, pid, sort) {
  const date = Date.now()
  return {
    tableName: 'world_groups',
    data: {
      id: randomStr(),
      title: title,
      description: '',
      pid: pid || 'root',
      created: date,
      updated: date,
      is_show: 1,
      sort: sort
    }
  }
}

export const characterRelationFactory = function (item) {
  // const date = Date.now()
  return {
    tableName: 'character_relation',
    data: {
      ...item
      // id: source.id + target.id,
      // source_id: source.id,
      // target_id: target.id,
      // relation: relation,
      // created: date,
      // updated: date
    }
  }
}
export const getItemFactory = function (type) {
  switch (type) {
    case 'datas':
      return DataFactory
    case 'data_groups':
      return DataGroupFactory
    case 'chapter_groups':
      return ChapterGroupFactory
    case 'chapters':
      return ChapterFactory
    case 'world_groups':
      return WorldGroupFactory
    case 'character_relation':
      return characterRelationFactory
    default: {
      const err = new Error(`${type} Factory is not exit`)
      console.error(err)
      throw err
    }
  }
}
