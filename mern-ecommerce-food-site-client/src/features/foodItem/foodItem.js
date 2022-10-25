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
  foodItemData: readLocalStorageDataArray("foodItemData"),
  orderItemData: JSON.parse(localStorage.getItem("orderItemData")) || null
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
    },

    updateFoodItemData: (state, action) => {
      // Save new data in local storage
      const foodItemDatard = readLocalStorageDataArray("foodItemData")
      // const foodItemDataTmp = foodItemDatard.filter((item) => action.payload.itemId !== item.itemId)

      const foodItemDataTmp = foodItemDatard.map((item) => {
        if (action.payload.itemId === item.itemId) {
          return (action.payload)
        }
        else {
          return item
        }
      })

      localStorage.removeItem("foodItemData")
      localStorage.setItem("foodItemData", JSON.stringify(foodItemDataTmp))

      // Save new data in redux state
      state.foodItemData = [...foodItemDataTmp]
    },

    removeAllFoodItemData: (state, action) => {
      // Remove from local storage
      localStorage.removeItem("foodItemData")

      // Save new data in redux state
      state.foodItemData = []
    },

    addOrderItemData: (state, action) => {
      // Save new data in local storage
      localStorage.removeItem("orderItemData")
      localStorage.setItem("orderItemData", JSON.stringify(action.payload))

      // Save new data in redux state
      state.orderItemData = action.payload
    },

    removeOrderItemData: (state, action) => {
      // Remove local storage
      localStorage.removeItem("orderItemData")
      // Save new data in redux state
      state.orderItemData = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { addFoodItemData, removeFoodItemData, updateFoodItemData,
  removeAllFoodItemData, addOrderItemData, removeOrderItemData } = foodItemSlice.actions

export default foodItemSlice.reducer