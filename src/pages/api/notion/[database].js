import NotionDB from "@/lib/notion/database.js";

export default async function handler(req, res) {
  const { database } = req.query;
  const { filter, sort } = req.body;

  try {
    const notionDB = new NotionDB(database);
    const response = await notionDB.query();

    res.status(200).json(response.results);
  } catch (error) {
    res.status(500).json(error);
  }
}
