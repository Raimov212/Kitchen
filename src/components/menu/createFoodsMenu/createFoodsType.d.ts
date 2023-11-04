import { Dispatch, SetStateAction } from "react";

export interface FoodCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export type FoodCategoryTypeData = {
  endTime: string;
  startTime: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  categoryId: string | undefined;
  status: string;
  foodType: string;
  photoUrl: string;
  price: number;
  kkal: number;
};

export type FoodCategoryType = {
  // createFoodsCategoryState: FoodCategoryTypeData[];
  // setCreateFoodsCategoryState: Dispatch<SetStateAction<FoodCategoryTypeData[]>>;
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
  id: string | undefined;
};
