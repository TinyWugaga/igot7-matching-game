import { Client } from "@notionhq/client";

import { convertFilter, convertSorts } from "@/lib/apis";

const defaultFilter: ReturnType<typeof convertFilter> = {
  or: [
    {
      property: "id",
      title: {
        is_not_empty: true,
      },
    },
  ],
};

const defaultSorts: ReturnType<typeof convertSorts> = [
  {
    property: "id",
    direction: "descending",
  }
];

class NotionDB {
  _notion;

  constructor() {
    this._notion = new Client({ auth: process.env.NOTION_KEY });
  }

  async query(databaseId = '', { filter = defaultFilter, sorts = defaultSorts } = {}) {
    try {
      return this._notion.databases.query({
        database_id: databaseId,
        /* @ts-ignore */
        filter,
        ...(sorts && { sorts }),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default NotionDB;
