import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ title, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.category(title);
      toast.success("Category added successfully!");
      navigate("/admin/product-category");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async ({ slug, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCategory(slug);
      toast.success("Category deleted successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategoreis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.categories();
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.singleCategory(slug);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const categoryUpdate = createAsyncThunk(
  "category/categoryUpdate",
  async ({ slug, title, navigate, toast }, { rejectWithValue }) => {
    try {
      // console.log(title);
      const response = await api.updateCategory(slug, title);
      // console.log(response);
      toast.success("Category update successfully");
      navigate("/admin/product-category");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(categoryUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(categoryUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(categoryUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(categoryDelete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(categoryDelete.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { slug },
        } = action.meta;

        if (slug) {
          state.categories = state.categories.filter((c) => c.slug !== slug);
        }
      })
      .addCase(categoryDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default categorySlice.reducer;
