import { RestoreDataType, categoriesType, FoodsType } from "./restoreSliceType";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiToken from "../../api/token";

export const getAllCategoriesApi = createAsyncThunk(
  "getAllCategories",
  async (token, { rejectWithValue }) => {
    console.log("token", token);
    const resp = await apiToken.get("/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.status < 200 || resp.status >= 300) {
      return rejectWithValue(resp.data);
    }

    return resp.data;
  }
);

// type RequestState = "pending" | "fulfilled" | "reject";

const initialState: RestoreDataType = {
  token: "",
  restoreList: [] || null,
  foodList: [] || null,
  categoriesAll: [],
  foodsAll: [],
  isLoading: false,
  error: "",
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
    getAllFoods: (state, action: PayloadAction<FoodsType>) => {
      state.foodsAll = [...state.foodsAll, action.payload];
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getAllCategoriesApi.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(
  //     getAllCategoriesApi.fulfilled,
  //     (state, action: PayloadAction<categoriesType[]>) => {
  //       (state.isLoading = false),
  //         (state.categoriesAll = action.payload),
  //         (state.error = "");
  //     }
  //   );
  //   builder.addCase(getAllCategoriesApi.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.categoriesAll = [];
  //     state.error = action.error.message || "Something went wrong";
  //   });
  // },
});

export const { tokenFunction, getAllFoods, getAllCategories } =
  restoreSlice.actions;
export default restoreSlice.reducer;
