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
  id: string;
  restoreName: string;
  data: foodListType[];
}

export interface categoriesType {
  id: string;
  name: string;
  status: string;
  photoUrl: string;
  startTime: string;
  endTime: string;
}

export interface FoodsType {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  status: string;
  foodType: string;
}

export interface RestoreDataType {
  token: string;
  restoreList: DataType[];
  foodList: foodListType[];
  categoriesAll: categoriesType[];
  foodsAll: foodsType[];
  isLoading: boolean;
  error: string | undefined;
}
