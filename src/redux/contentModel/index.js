import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  occupationDetails: {}
}

export const fetchOccupationDetails = createAsyncThunk(
  'occupation/fetchOccupationDetails',
  async (onetsoc_code) => {
    const response = await axios.get(`${baseURL}OccupationDetails?onetsoc_code=${onetsoc_code}`);
    return response.data;
  }
);

const occupationSlice = createSlice({
  name: 'occupation',
  initialState,
    reducers: {},
  extraReducers: (builder) => {

             builder.addCase(HYDRATE, (state, action) => {
              state.occupationDetails = action?.payload?.occupationDetails?.contentModel ? action.payload.occupationDetails.contentModel : state?.occupationDetails;
            })
            builder.addCase(fetchOccupationDetails.pending, state => {
              state.isLoading = true
            })
            builder.addCase(fetchOccupationDetails.fulfilled, (state, action) => {
              state.occupationDetails = action.payload
              state.isLoading = false
            })
            builder.addCase(fetchOccupationDetails.rejected, (state, action) => {
              state.isLoading = false
            })
  },
});

export default occupationSlice.reducer
// export const selectOccupationDetails = (state) => state.occupation.occupationDetails;

// export default occupationSlice.reducer;