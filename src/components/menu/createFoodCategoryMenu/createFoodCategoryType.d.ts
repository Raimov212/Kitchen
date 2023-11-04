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
  status: string;
  photoUrl: string;
  startTime?: string;
  endTime?: string;
};

export type FoodCategoryType = {
  createFoodsCategoryState: FoodCategoryTypeData;
  setCreateFoodsCategoryState: Dispatch<SetStateAction<FoodCategoryTypeData>>;
  statusCode: string;
  successStatus: string;
  createUserForm: (e: { preventDefault: () => void }) => Promise<void>;
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
};
