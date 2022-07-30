import NotionDB from "@/lib/notion/NotionDB";
import type { NextApiRequest, NextApiResponse } from 'next'

import { DATABASE_CONFIG } from "@/lib/notion/constants";
import { DataBaseName, DataBaseType } from "@/lib/notion/types";

import { convertFilter, convertSorts } from "@/lib/apis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { database, topic, filter = '', sorts = '' } = req.query;

  console.log({ query: req.query });
  const DB_ID = {
    ...DATABASE_CONFIG[topic as DataBaseName],
  };

  const convertedFilter = filter && convertFilter(JSON.parse(filter as string));
  const convertedSorts = sorts && convertSorts(JSON.parse(sorts as string));
  try {
    const notionDB = new NotionDB();
    const response = await notionDB.query(DB_ID[database as DataBaseType], {
      ...(convertedFilter && {filter: convertedFilter}),
      ...(convertedSorts && {sorts: convertedSorts}),
    });

    res.status(200).json(response.results);
  } catch (error) {
    res.status(500).json(error);
  }
}
