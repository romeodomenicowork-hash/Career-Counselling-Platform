import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
    isLoading: false,
    coursesDatas: [],
}

export const CoursesDataRequest = createAsyncThunk('coursesDatas/CoursesDataRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}getCourseData`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const courseSlice = createSlice({
  name: 'coursesDatas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.coursesDatas = action?.payload?.coursesDatas?.coursesData ? action?.payload?.coursesDatas?.coursesData : state?.coursesDatas;
    })
    builder.addCase(CoursesDataRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(CoursesDataRequest.fulfilled, (state, action) => {
      state.coursesDatas = action.payload
      state.isLoading = false
    })
    builder.addCase(CoursesDataRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})



export default courseSlice.reducer
