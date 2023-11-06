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
  price: number;
  kkal: number;
};

export type FoodCategoryType = {
  createFoodsCategoryState: FoodCategoryTypeData;
  setCreateFoodsCategoryState: Dispatch<
    SetStateAction<createFoodsCategoryState>
  >;
  statusCode: string;
  successStatus: string;
  createUserForm: (e: { preventDefault: () => void }) => Promise<void>;
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
  id: string | undefined;
};
