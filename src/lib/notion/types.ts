import { ReactElement } from "react";

export enum DataBaseName {
  GOT7 = "got7",
  XIAOGA = "xiaoga",
}

export enum DataBaseType {
  CARDS = "cards",
  GROUPS = "groups",
}

export type DataBaseConfig = Record<
  DataBaseName,
  Record<DataBaseType, string> & {
    resultComponent: ({
      isOpen,
      onClose,
      title,
      message,
    }: {
      isOpen: boolean;
      onClose: () =>void;
      title?: string;
      message?: string;
    }) => ReactElement;
    resultConfig: Record<string, string>;
  }
>;

export interface FilterType {
  compound?: "or" | "and";
  conditions: Array<string | FilterType>;
}

type PropertyFilter = Record<string, any>;

export type ConvertFilter =
  | {
      or: Array<
        | PropertyFilter
        | {
            or: Array<PropertyFilter>;
          }
        | {
            and: Array<PropertyFilter>;
          }
      >;
    }
  | {
      and: Array<
        | PropertyFilter
        | {
            or: Array<PropertyFilter>;
          }
        | {
            and: Array<PropertyFilter>;
          }
      >;
    }
  | PropertyFilter;

export type SortType = string[][];

export type ConvertSorts = {
  property: string;
  direction: string;
}[];
