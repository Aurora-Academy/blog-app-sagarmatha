import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogServices from "../services/blogs";

const initialState = {
  blogs: [],
  total: 0,
  currentPage: 1,
  limit: 20,
  error: "",
  loading: false,
};

export const listBlogs = createAsyncThunk(
  "blogs/listBlogs",
  async ({ limit, page }) => {
    const res = await BlogServices.list(limit, page);
    return res.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
      })
      .addCase(listBlogs.pending, (state) => {
        state.loading = true;
        state.blogs = [];
        state.total = 0;
      })
      .addCase(listBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
