import {
  FilterType,
  ConvertFilter,
  SortType,
  ConvertSorts,
} from "@/lib/notion/types";

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

export const convertFilter = (filter: FilterType): ConvertFilter => {
  const { compound, conditions } = filter;

  const getPropertyFilter = (conditionString: string) => {
    const condition = conditionString.split(".");
    condition.reverse();
    const property = condition.pop();
    const spreadCondition = condition
      .slice(2)
      .reduce<Record<string, object | string>>(
        (acc, key) => ({ [key]: acc }),
        { [condition[1]]: condition[0] }
      );

    return {
      property,
      ...spreadCondition,
    };
  };

  const filterGroup = conditions.map((condition) => {
    if (typeof condition === "object") {
      return convertFilter(condition as FilterType);
    } else {
      return getPropertyFilter(condition as string);
    }
  });

  return compound ? { [compound]: filterGroup } : { ...filterGroup[0] };
};

/*
    sorts: {
      sorts: [
        ['id', 'descending'],
      ]
    }
  
    =>
  
    "sorts": [
      {
        "property": "id",
        "direction": "descending"
      }
    ]
  */

export const convertSorts = ({ sorts }: { sorts: SortType }): ConvertSorts =>
  sorts.map((sort) => {
    const [property, direction] = sort;
    return { property, direction };
  });
