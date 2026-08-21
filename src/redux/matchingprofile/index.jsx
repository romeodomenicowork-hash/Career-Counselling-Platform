import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
    isLoading: false,
    matchingProfile: {},
}

export const matchProfileDataRequest = createAsyncThunk('matchingProfile/matchProfileDataRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}matchProfile`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const matchProfileSlice = createSlice({
  name: 'matchingProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.matchingProfile = action?.payload?.matchingProfile?.matchingprofile ? action?.payload?.matchingProfile?.matchingprofile : state?.matchingProfile;
    })
    builder.addCase(matchProfileDataRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(matchProfileDataRequest.fulfilled, (state, action) => {
      state.matchingProfile = action.payload
      state.isLoading = false
    })
    builder.addCase(matchProfileDataRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})



export default matchProfileSlice.reducer
