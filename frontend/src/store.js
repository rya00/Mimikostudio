import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { 
        productListReducer, 
        productDetailsReducer, 
        productDeleteReducer, 
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productTopRatedReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
        biddingListReducer,
        biddingDetailsReducer,
        biddingCreateReducer,
        biddingDeleteReducer,
        biddingUpdateReducer,
        biddingTopRatedReducer,
        productBidCreateReducer
} from './reducers/biddingReducers'
import { 
        eventListReducer,
        eventDetailsReducer,
        eventCreateReducer,
        eventDeleteReducer,
        eventUpdateReducer,
} from './reducers/eventReducers'
import { 
        userLoginReducer, 
        userRegisterReducer, 
        userDetailsReducer, 
        userUpdateProfileReducer, 
        userListReducer, 
        userDeleteReducer, 
        userUpdateReducer,
        passwordResetReducer,
} from './reducers/userReducers'
import { 
        orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer, 
        orderListMyReducer,
        orderListReducer, 
        orderDeliverReducer,
} from './reducers/orderReducers'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  // here we will be adding reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  eventDelete: eventDeleteReducer,
  eventCreate: eventCreateReducer,
  eventUpdate: eventUpdateReducer,

  biddingList: biddingListReducer,
  biddingDetails: biddingDetailsReducer,
  biddingDelete: biddingDeleteReducer,
  biddingCreate: biddingCreateReducer,
  biddingUpdate: biddingUpdateReducer,
  biddingTopRated: biddingTopRatedReducer,
  productBidCreate: productBidCreateReducer,

  cart: cartReducer,
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,  
  userUpdate: userUpdateReducer,
  passwordReset: passwordResetReducer,


  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []

// Taking data and loading it into state
const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {
    cartItems : cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {userInfo: userInfoFromStorage}
}

const store = configureStore({
  reducer,
  preloadedState:initialState,
  middleware: [thunk]
})

export default store;