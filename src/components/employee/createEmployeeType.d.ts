import { Dispatch, SetStateAction } from "react";

export interface FoodCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export interface DataEmployee {
  [key: string]: string;
  id: string;
  name: string;
  surname: string;
  phone: string;
  photoUrl: string;
  role: string;
}

export type FoodCategoryTypeData = {
  name: string;
  surname: string;
  phone: string;
  password: string;
  photoUrl: string;
  role: string;
};

export interface DataEmployeeType {
  data: DataEmployee[] | undefined;
  openSettings: string;
  openDeleteModal: boolean;
  setOpenSettings: Dispatch<SetStateAction<string>>;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleClickDelete: (id: string) => Promise<void>;
}

export type FoodCategoryType = {
  createFoodsCategoryState: FoodCategoryTypeData;
  setCreateFoodsCategoryState: Dispatch<SetStateAction<FoodCategoryTypeData>>;
  setOpenCreateGoodsProps: Dispatch<SetStateAction<boolean>>;
  createUserForm: (e: { preventDefault: () => void }) => Promise<void>;
  statusCode: string;
  successStatus: string;
};
