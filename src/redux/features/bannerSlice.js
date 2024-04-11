import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
      const response = await api.banner(formData);
      toast.success("Banner added successfully!");
      navigate("/admin/banner");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.banners();
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.bannerDelete(id);
      toast.success("Banner deleted successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;

        if (id) {
          state.banners = state.banners.filter((c) => c._id !== id);
        }
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default bannerSlice.reducer;
