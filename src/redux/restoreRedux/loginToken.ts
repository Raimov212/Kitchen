import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from "../../api/login";
// import { LoginContext } from "../../hook/contextAuth";
// import { useContext } from "react";

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (loginState, { rejectWithValue }) => {
    console.log("loginState", loginState);
    const resp = await loginApi.post("/auth/login/admin", loginState);
    if (resp.status < 200 || resp.status >= 300) {
      return rejectWithValue(resp.data);
    }

    return resp.data.token;
  }
);

interface loginType {
  isLoading: boolean;
  token: string;
  error: string;
}

const initialState: loginType = {
  isLoading: false,
  token: "",
  error: "",
};

const loginToken = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginAdmin.fulfilled,
      (state, action: PayloadAction<string>) => {
        (state.isLoading = false),
          (state.token = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(loginAdmin.rejected, (state) => {
      state.isLoading = false;
      state.token = "";
      state.error = "Login yokik parol xato";
    });
  },
});

export default loginToken.reducer;
