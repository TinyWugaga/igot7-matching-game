import { Client } from "@notionhq/client";

const defaultFilter = {
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
  constructor() {
    this._notion = new Client({ auth: process.env.NOTION_KEY });
  }

  async query(databaseId, { filter = defaultFilter, sorts } = {}) {
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
