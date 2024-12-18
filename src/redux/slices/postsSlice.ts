import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, createPost, updatePost, deletePost, fetchPostsByUser } from '../../services/postService';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    surname: string;
  }
}

interface PostsState {
  items: Post[];
  currentPost: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  items: [],
  currentPost: null,
  status: 'idle'
};

export const getPosts = createAsyncThunk('posts/getPosts', async (params?: { author?: string; createdAt?: 'asc' | 'desc' }) => {
  return await fetchPosts(params);
});

export const getPostById = createAsyncThunk('posts/getPostById', async (id: string) => {
  return await fetchPostById(id);
});

export const getPostsByUserId = createAsyncThunk('posts/getPostsByUserId', async (userId: string) => {
  return await fetchPostsByUser(userId);
});

export const createNewPost = createAsyncThunk('posts/createPost', async ({ title, content, tags }: { title: string; content: string; tags?: string[] },) => {
 
  return await createPost({ title, content, tags },);
});

export const editPost = createAsyncThunk('posts/updatePost', async ({ id, title, content, tags }: { id: string; title?: string; content?: string; tags?: string[] },) => {

  return await updatePost(id, { title, content, tags },);
});

export const removePost = createAsyncThunk('posts/deletePost', async (id: string,) => {
  await deletePost(id,);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.items = action.payload; // data array from API
        state.status = 'idle';
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index > -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  }
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
