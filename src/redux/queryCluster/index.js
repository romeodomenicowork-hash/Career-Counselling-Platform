import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  queryClusterData: []
}

export const clusterQueryRequest = createAsyncThunk('cluster/clusterQueryRequest', async (url, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${url}`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const queryClusterSlice = createSlice({
  name: 'queryCluster',
  initialState,
  reducers: {
    setQueryClusterData: (state, action) => {
      state.queryClusterData = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.queryClusterData = action?.payload?.queryCluster?.queryClusterData ? action.payload.queryCluster.queryClusterData : state?.queryClusterData;
    })
    builder.addCase(clusterQueryRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(clusterQueryRequest.fulfilled, (state, action) => {
      state.queryClusterData = action.payload
      state.isLoading = false
    })
    builder.addCase(clusterQueryRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setQueryClusterData } = queryClusterSlice.actions

export default queryClusterSlice.reducer
