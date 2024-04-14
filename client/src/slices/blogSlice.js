import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogServices from "../services/blogs";

const initialState = {
  blogs: [],
  blog: {},
  total: 0,
  currentPage: 1,
  limit: 90,
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
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload) => {
    const res = await BlogServices.create(payload);
    return res.data;
  }
);
export const getBySlug = createAsyncThunk("blogs/getBySlug", async (slug) => {
  const res = await BlogServices.getBySlug(slug);
  return res.data;
});

export const removeBlog = createAsyncThunk("blogs/removeBlog", async (slug) => {
  const res = await BlogServices.removeBlog(slug);
  return res.data;
});

export const changeStatus = createAsyncThunk(
  "blogs/changeStatus",
  async (slug) => {
    const res = await BlogServices.changeStatus(slug);
    return res.data;
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ slug, payload }) => {
    const res = await BlogServices.updateBlog(slug, payload);
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
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(getBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false;
        const remaining = state.blogs.filter(
          (blog) => blog?.slug !== action.meta.arg
        );
        state.blogs = remaining;
      })
      .addCase(removeBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const existing = state.blogs.find(
          (blog) => blog.slug === action.payload.data.slug
        );
        existing.status = action.payload.data.status;
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
