import { configureStore } from '@reduxjs/toolkit'

import foodItemReducer from '../features/foodItem/foodItem.js'

export const store = configureStore({
  reducer: {
    foodItem: foodItemReducer

  },
})