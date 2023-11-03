import { DataType } from "../../data/data";

export interface foodListType {
  reduce(
    arg0: (acc: number, item: foodListType) => number,
    arg1: number
  ): number;
  id: string;
  foodName: string;
  price: number;
  quantity: number;
}

export interface restoreListType {
  // map(
  //   arg0: (item: {
  //     id: string | undefined;
  //     data: foodListType[];
  //   }) => false | import("react/jsx-runtime").JSX.Element[]
  // ): import("react").ReactNode;
  id: string;
  restoreName: string;
  data: foodListType[];
}

export interface RestoreDataType {
  token: string;
  restoreList: DataType[];
  foodList: foodListType[];
}
