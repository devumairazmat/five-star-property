import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const apiUrl = process.env.REACT_APP_API_URL + "api/users/";

// -----
// Login
// -----
export const login = createAsyncThunk("auth/login", async (args, thunkApi) => {
  try {
    const res = await axios.post(apiUrl + "login", args);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    }
  } catch (error) {
    console.log("complete error", error);
    console.log("error message:", message);
    const message =
      error.response.data.message || error.message || error.toString();
    thunkApi.rejectWithValue(message);
  }
});

// Register
// --------
export const register = createAsyncThunk(
  "auth/register",
  async (args, thunkApi) => {
    try {
      const res = await axios.post(apiUrl, args);
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data.user;
      }
    } catch (error) {
      console.log("complete error", error);
      console.log("error message:", message);
      const message =
        error.response.data.message || error.message || error.toString();
      thunkApi.rejectWithValue(message);
    }
  }
);

// ------
// Logout
// ------
export const logout = createAsyncThunk(
  "auth/logout",
  async (args, thunkApi) => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.log("complete error", error);
      console.log("error message:", message);
      const message =
        error.response.data.message || error.message || error.toString();
      thunkApi.rejectWithValue(message);
    }
  }
);

const Auth = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        toast.loading("signing up ..");
      })
      .addCase(register.fulfilled, (state, action) => {
        toast.dismiss();
        toast.success("successfully signed up ..");
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        toast.error("error: " + action.payload);
      });
  },
});

export default Auth.reducer;
