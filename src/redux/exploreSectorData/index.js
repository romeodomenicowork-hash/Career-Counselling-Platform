import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  explore: []
}

export const exploreRequestData = createAsyncThunk(
  'explore/exploreRequestData',
  async (career_pathway) => {
    const response = await axios.get(`${baseURL}ExploreSector?title=${career_pathway}`);
    return response.data;
  }
);

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
    reducers: {},
  extraReducers: (builder) => {

             builder.addCase(HYDRATE, (state, action) => {
              state.explore = action?.payload?.explore?.exploreSectorData ? action.payload.explore.exploreSectorData : state?.explore;
            })
            builder.addCase(exploreRequestData.pending, state => {
              state.isLoading = true
            })
            builder.addCase(exploreRequestData.fulfilled, (state, action) => {
              state.explore = action.payload
              state.isLoading = false
            })
            builder.addCase(exploreRequestData.rejected, (state, action) => {
              state.isLoading = false
            })
  },
});

export default exploreSlice.reducer
// export const selectOccupationDetails = (state) => state.occupation.occupationDetails;

// export default occupationSlice.reducer;