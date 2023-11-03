import { RestoreDataType, categoriesType, foodsType } from "./restoreSliceType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RestoreDataType = {
  token: "",
  restoreList: [] || null,
  foodList: [] || null,
  categoriesAll: [],
  foodsAll: [],
};

const restoreSlice = createSlice({
  name: "restore",
  initialState,
  reducers: {
    tokenFunction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    getAllCategories: (state, action: PayloadAction<categoriesType>) => {
      state.categoriesAll.push(action.payload);
    },
    getAllFoods: (state, action: PayloadAction<foodsType>) => {
      state.foodsAll.push(action.payload);
    },
  },
});

export const { tokenFunction, getAllFoods, getAllCategories } =
  restoreSlice.actions;
export default restoreSlice.reducer;
