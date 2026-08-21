import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  searchClusterData: [],
  searchInput: ""
}

export const searchClusterRequest = createAsyncThunk('searchCluster/searchClusterRequest', async (payload, thunkAPI) => {
  try {
    let response
    response = await axios.get(`https://erp.triz.co.in/allOccupation?title=${payload}`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const searchClusterSlice = createSlice({
  name: 'searchCluster',
  initialState,
  reducers: {
    setsearchClusterData: (state, action) => {
      state.searchClusterData = action.payload
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.searchClusterData = action?.payload?.searchCluster?.searchClusterData ? action.payload.searchCluster.searchClusterData : state?.searchClusterData;
    })
    builder.addCase(searchClusterRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(searchClusterRequest.fulfilled, (state, action) => {
      state.searchClusterData = action.payload
      state.isLoading = false
    })
    builder.addCase(searchClusterRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setsearchClusterData , setSearchInput} = searchClusterSlice.actions

export default searchClusterSlice.reducer
