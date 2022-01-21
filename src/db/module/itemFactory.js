import { nanoid } from 'nanoid'

export const ChapterGroupFactory = function (title, pid, sort) {
  const date = Date.now()
  return {
    tableName: 'chapter_groups',
    data: {
      id: nanoid(),
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
      id: nanoid(),
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

export const getItemFactory = function (type) {
  switch (type) {
    case 'chapter_groups':
      return ChapterGroupFactory
    case 'chapters':
      return ChapterFactory
    default:
      break
  }
}
