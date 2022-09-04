import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL + "api/properties/";

export const addProperty = createAsyncThunk(
  "property/add",
  async (args, thunkApi) => {
    try {
      // sending image to firebase storage
      const imageId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      const fileRef = ref(storage, imageId);
      await uploadBytes(fileRef, args.photo);
      const image = await getDownloadURL(fileRef);

      // uploading to database
      const userId = thunkApi.getState().auth.user._id;
      const token = thunkApi.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        apiUrl + "create",
        {
          ...args.propertyData,
          image,
          imageId,
          userId,
        },
        config
      );
      console.log(res.data);
      if (res.data.status === 201) {
        thunkApi.fulfillWithValue(res.data);
      } else {
        thunkApi.rejectWithValue(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const Property = createSlice({
  name: "register",
  initialState: {
    properties: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProperty.pending, (state, action) => {
        toast.loading("Adding Property");
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        toast.dismiss();
        toast.success("Property Added");
      })
      .addCase(addProperty.rejected, (state, action) => {
        toast.dismiss();
        toast.error("Error Occoured");
      });
  },
});

export default Property.reducer;
