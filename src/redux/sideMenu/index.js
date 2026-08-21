import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { baseURL } from '../request'

const initialState = {
  isLoading: false,
  sideMenu: {}
}

export const SideMenuRequest = createAsyncThunk('SideMenu/SideMenuRequest', async (_, thunkAPI) => {
  try {
    let response
    response = await axios.get(`${baseURL}careerExplore`).then(response => response.data)
    return response
  } catch (error) {
    return null
  }
})

export const menuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    setMenuData: (state, action) => {
      state.sideMenu = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.sideMenu = action?.payload?.sideMenu?.sideMenu ? action.payload.sideMenu.sideMenu : state?.sideMenu;
    })
    builder.addCase(SideMenuRequest.pending, state => {
      state.isLoading = true
    })
    builder.addCase(SideMenuRequest.fulfilled, (state, action) => {
      state.sideMenu = action.payload
      state.isLoading = false
    })
    builder.addCase(SideMenuRequest.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setMenuData } = menuSlice.actions

export default menuSlice.reducer
