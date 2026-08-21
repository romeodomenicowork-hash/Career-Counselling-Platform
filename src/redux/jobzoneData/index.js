import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
    isLoading: false,
    jobzone: [],
}

export const jobzoneDataRequest = createAsyncThunk('jobzone/jobzoneDataRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}intrestJobzone`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const jobzoneSlice = createSlice({
  name: 'jobzone',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.jobzone = action?.payload?.jobzone?.jobzoneData ? action?.payload?.jobzone?.jobzoneData : state?.jobzone;
    })
    builder.addCase(jobzoneDataRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(jobzoneDataRequest.fulfilled, (state, action) => {
      state.jobzone = action.payload
      state.isLoading = false
    })
    builder.addCase(jobzoneDataRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})



export default jobzoneSlice.reducer
