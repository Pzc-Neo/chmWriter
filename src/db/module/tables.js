export const tableChapter = {
  tableName: 'chapters',
  fields: `(
    id            TEXT PRIMARY KEY
                       UNIQUE
                       NOT NULL,
    group_id      TEXT,
    title         TEXT,
    created       TIME,
    updated       TIME,
    content       TEXT,
    language      INT,
    words         INT,
    target_words  INT,
    type          INT,
    status        INT,
    is_export     INT,
    note_content  TEXT,
    foreshadowing TEXT,
    rate          INT,
    sign,
    other         TEXT,
    sort          INT
)`
}

export const tableChapterGroup = {
  tableName: 'chapter_groups',
  fields: `(
    id          TEXT    PRIMARY KEY
                        UNIQUE
                        NOT NULL,
    title       TEXT,
    pid         TEXT,
    is_open     BOOLEAN,
    is_export   BOOLEAN,
    create_date TIME,
    update_date TIME,
    sort        INT
);
`
}
