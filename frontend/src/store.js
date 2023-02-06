import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  // here we will be adding reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: {cartItems : cartItemsFromStorage}
}

const store = configureStore({
  reducer,
  initialState,
})

export default store;