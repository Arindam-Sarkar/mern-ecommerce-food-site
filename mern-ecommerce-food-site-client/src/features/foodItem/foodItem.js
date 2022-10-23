import { createSlice } from '@reduxjs/toolkit'

const readLocalStorageDataArray = (storageName) => {
  const arrayFromLocalStorage = localStorage.getItem(storageName)
  if (arrayFromLocalStorage && arrayFromLocalStorage.length) {
    return (JSON.parse(arrayFromLocalStorage))
  } else {
    return ([])
  }
}

const initialState = {
  foodItemData: readLocalStorageDataArray("foodItemData")
}

export const foodItemSlice = createSlice({
  name: 'foodItem',

  initialState,

  reducers: {
    addFoodItemData: (state, action) => {
      // Save new data in local storage
      const foodItemDataTmp = readLocalStorageDataArray("foodItemData")
      foodItemDataTmp.push(action.payload)
      localStorage.removeItem("foodItemData")
      localStorage.setItem("foodItemData", JSON.stringify(foodItemDataTmp))

      // Save new data in redux state
      state.foodItemData.push(action.payload)
    },

    removeFoodItemData: (state, action) => {
      // Save new data in local storage
      const foodItemDatard = readLocalStorageDataArray("foodItemData")
      const foodItemDataTmp = foodItemDatard.filter((item) => action.payload.itemId !== item.itemId)
      localStorage.removeItem("foodItemData")
      localStorage.setItem("foodItemData", JSON.stringify(foodItemDataTmp))

      // Save new data in redux state
      state.foodItemData = [...foodItemDataTmp]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFoodItemData, removeFoodItemData } = foodItemSlice.actions

export default foodItemSlice.reducer