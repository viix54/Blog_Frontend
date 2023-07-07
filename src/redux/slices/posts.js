import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    const {data} = await axios.get('/posts');
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async()=>{
    const {data} = await axios.get('/tags');
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/RemovePost', async(id)=>await axios.delete(`/posts/${id}`))

const initialState = {
    posts:{
        items:[],
        status:'loading'
    },
    tags:{
        items:[],
        status:'loading'
    }
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducer:{},
    extraReducers:{
        // Получение статей
       [fetchPosts.pending]:(state)=>{
        state.posts.status = 'loading'
       },
       [fetchPosts.fulfilled]:(state,action)=>{
        state.posts.item = action.payload
        state.posts.status = 'loaded'
       } ,
       [fetchPosts.rejected]:(state,action)=>{
        state.posts.item = []
        state.posts.status = 'error'
       },
       // Получение тегов
       [fetchTags.pending]:(state)=>{
        state.tags.status = 'loading'
       },
       [fetchTags.fulfilled]:(state,action)=>{
        state.tags.item = action.payload
        state.tags.status = 'loaded'
       } ,
       [fetchTags.rejected]:(state,action)=>{
        state.tags.item = []
        state.tags.status = 'error'
       },
       // Удаление статьи
       [fetchRemovePost.pending]:(state,action)=>{
        // console.log(state.posts.item);
        state.posts.item = state.posts.item.filter((obj) => obj._id !== action.meta.arg);
       }
    }
})

export const postsReducer = postsSlice.reducer