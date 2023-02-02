import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

const reducer = combineReducers({
  // here we will be adding reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const store = configureStore({
  reducer,
})

export default store;