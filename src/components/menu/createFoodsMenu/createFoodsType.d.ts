import { Dispatch, SetStateAction } from "react";

export interface FoodCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export type FoodCategoryTypeData = {
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
};

export type FoodCategoryType = {
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
  id: string | undefined;
};
