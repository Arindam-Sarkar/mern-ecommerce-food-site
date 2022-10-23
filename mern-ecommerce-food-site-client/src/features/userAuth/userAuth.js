import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userAuthData: JSON.parse(localStorage.getItem("userAuthData")) || null
}

export const userAuthSlice = createSlice({
  name: 'userAuth',

  initialState,

  reducers: {
    addUserAuthData: (state, action) => {
      localStorage.setItem("userAuthData", JSON.stringify(action.payload))
      state.userAuthData = action.payload
    },
    removeUserAuthData: (state, action) => {
      const blankObj = {}
      localStorage.setItem("userAuthData", JSON.stringify(blankObj))
      state.userAuthData = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUserAuthData, removeUserAuthData } = userAuthSlice.actions

export default userAuthSlice.reducer