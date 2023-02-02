// Reducer -> Function that takes in our current state and it takes an action of what we wanna do to the state

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = {products:[]}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            // Returning object, Empty array kept as we're still loading data
            return {loading:true, products:[]} 
        
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload}

        case PRODUCT_LIST_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state

    }

}

export const productDetailsReducer = (state = {product:{reviews: []} }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state} 
        
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload}

        case PRODUCT_DETAILS_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state

    }

}