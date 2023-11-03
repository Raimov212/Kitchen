import { Dispatch, SetStateAction } from "react";

export interface FoodItemListAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export type FoodItemListTypeData = {
  categoryNameUz: string;
  categoryNameUzbekRu: string;
  categoryNameEng: string;
  file?: File | null;
};

export type FoodItemListType = {
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
};
