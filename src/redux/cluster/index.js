import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  cluster: []
}

export const clusterRequest = createAsyncThunk('cluster/clusterRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}careerCluster`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setCluster: (state, action) => {
      state.cluster = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.cluster = action?.payload?.cluster?.cluster ? action.payload.cluster.cluster : state?.cluster;
    })
    builder.addCase(clusterRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(clusterRequest.fulfilled, (state, action) => {
      state.cluster = action.payload
      state.isLoading = false
    })
    builder.addCase(clusterRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setCluster } = clusterSlice.actions

export default clusterSlice.reducer
