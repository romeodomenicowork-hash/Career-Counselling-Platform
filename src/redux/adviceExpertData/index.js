import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  advice: []
}

export const adviceRequestData = createAsyncThunk(
  'advice/adviceRequestData',
  async (career_pathway) => {
    const response = await axios.get(`${baseURL}ExpertAdvice?title=${career_pathway}`);
    return response.data;
  }
);

const adviceSlice = createSlice({
  name: 'advice',
  initialState,
    reducers: {},
  extraReducers: (builder) => {

             builder.addCase(HYDRATE, (state, action) => {
              state.advice = action?.payload?.advice?.adviceExpertData ? action.payload.advice.adviceExpertData : state?.advice;
            })
            builder.addCase(adviceRequestData.pending, state => {
              state.isLoading = true
            })
            builder.addCase(adviceRequestData.fulfilled, (state, action) => {
              state.advice = action.payload
              state.isLoading = false
            })
            builder.addCase(adviceRequestData.rejected, (state, action) => {
              state.isLoading = false
            })
  },
});

export default adviceSlice.reducer
// export const selectOccupationDetails = (state) => state.occupation.occupationDetails;

// export default occupationSlice.reducer;