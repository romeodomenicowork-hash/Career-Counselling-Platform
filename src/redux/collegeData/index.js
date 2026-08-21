import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  college: []
}

export const collegeDataRequest = createAsyncThunk('college/collegeDataRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}getInstituteData`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    setCollege: (state, action) => {
      state.college = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.college = action?.payload?.college?.collegeData ? action?.payload?.college?.collegeData : state?.college;
    })
    builder.addCase(collegeDataRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(collegeDataRequest.fulfilled, (state, action) => {
      state.college = action.payload
      state.isLoading = false
    })
    builder.addCase(collegeDataRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setCollege } = collegeSlice.actions

export default collegeSlice.reducer
