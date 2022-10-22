import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foodItemData: []
}

export const foodItemSlice = createSlice({
  name: 'foodItem',

  initialState,

  reducers: {
    addFoodItemData: (state, action) => {
      state.foodItemData.push(action.payload)
    },
    removeFoodItemData: (state, action) => {


      let foodItemDataTmp = state.foodItemData.filter((item) => {
        return (item.itemId !== action.payload.itemId)
      })

      state.foodItemData += action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFoodItemData, removeFoodItemData } = foodItemSlice.actions

export default foodItemSlice.reducer