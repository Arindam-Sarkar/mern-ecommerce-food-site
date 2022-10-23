import { configureStore } from '@reduxjs/toolkit'

import foodItemReducer from '../features/foodItem/foodItem.js'
import userAuthReducer from '../features/userAuth/userAuth.js'

export const store = configureStore({
  reducer: {
    foodItem: foodItemReducer,
    userAuth: userAuthReducer
  },
})