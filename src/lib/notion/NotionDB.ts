import { Client } from "@notionhq/client";

import { convertFilter } from "@/lib/apis";

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

class NotionDB {
  _notion;

  constructor() {
    this._notion = new Client({ auth: process.env.NOTION_KEY });
  }

  /* @ts-ignore */
  async query(databaseId = '', options) {
    const { filter = defaultFilter, sorts } = options
    try {
      return this._notion.databases.query({
        database_id: databaseId,
        filter,
        ...(sorts && { sorts }),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default NotionDB;
