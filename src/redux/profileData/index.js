import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
    isLoading: false,
    profile: {},
}

export const profileDataRequest = createAsyncThunk('profile/profileDataRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}getEmployerData`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.profile = action?.payload?.profile?.profileData ? action?.payload?.profile?.profileData : state?.profile;
    })
    builder.addCase(profileDataRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(profileDataRequest.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isLoading = false
    })
    builder.addCase(profileDataRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})



export default profileSlice.reducer
