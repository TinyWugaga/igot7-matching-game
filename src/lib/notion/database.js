import { Client } from "@notionhq/client";


// TODO: fetch
const DB_ID = {
  cards: "bf4fb76b86974ddd978b1ab0af9f6516",
};

const defaultFilter = {
  or: [
    {
      property: 'name',
      title: {
        is_not_empty: true
      }
    },
  ]
}

class NotionDB {
  constructor(database = "") {
    this._notion = new Client({ auth: process.env.NOTION_KEY });
    this._databaseId = DB_ID[database];
  }

  async query({ 
    filter = defaultFilter,
    sorts
  } = {}) {
    try {
      return this._notion.databases.query({
        database_id: this._databaseId,
        filter,
        ...(sorts && { sorts } )
      });
    } catch (error) {
      throw error
    }
    
  }
}

export default NotionDB;
