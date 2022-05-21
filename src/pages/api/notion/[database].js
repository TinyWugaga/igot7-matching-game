import NotionDB from "@/lib/notion/NotionDB";
import {
  DATABASE_NAME,
  DATABASE_GROUPS_ID,
  DATABASE_CARDS_ID,
} from "@/lib/notion/constants";

const DB_ID = {
  [DATABASE_NAME.GROUPS]: DATABASE_GROUPS_ID,
  [DATABASE_NAME.CARDS]: DATABASE_CARDS_ID,
};

/*
  filter: {
    compound: 'and',
    conditions: [
      'group_id.rollup.any.title.equals.' + groupId,
      {
        compound: 'and',
        conditions: [
          'name.title.is_not_empty.true',
          'name.title.contains.J',
        ],
      }
    ]
  }

  =>

  filter: {
    and: [
      {
        property: 'group_id',
        rollup: {
          any: {
            title: {
              equals: groupId
            }
          }
        }
      },
      {
        and: {
          {
            property: 'name',
            title: {
              is_not_empty: true
            }
          },
          {
            property: 'name',
            title: {
              contains: 'J'
            }
          }
        }
      }
    ]
  }
*/

const convertFilter = (filter) => {
  const { compound, conditions } = filter

  const getPropertyFilter = (conditionString) => {
    const condition = conditionString.split('.')
    condition.reverse()
    const property = condition.pop()
    
    return {
      property,
      ...condition.reduce((acc, key) => ({ [key]: acc }))
    }
  }

  const filterGroup = conditions.map(condition => {
    if(typeof condition === 'object') {
      return convertFilter(condition)
    } else {
      return getPropertyFilter(condition)
    }
  })

  return compound ? { [compound]: filterGroup } : { ...filterGroup[0] }
};

export default async function handler(req, res) {
  const { database, filter, sort } = req.query;

  const convertedFilter = filter && convertFilter(JSON.parse(filter))
  try {
    const notionDB = new NotionDB();
    const response = await notionDB.query(DB_ID[database], {
      filter: convertedFilter,
      sort,
    });

    res.status(200).json(response.results);
  } catch (error) {
    res.status(500).json(error);
  }
}
