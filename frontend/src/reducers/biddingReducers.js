import { 
    BIDDING_LIST_REQUEST,
    BIDDING_LIST_SUCCESS,
    BIDDING_LIST_FAIL,

    BIDDING_DETAILS_REQUEST,
    BIDDING_DETAILS_SUCCESS,
    BIDDING_DETAILS_FAIL,

    BIDDING_DELETE_REQUEST,
    BIDDING_DELETE_SUCCESS,
    BIDDING_DELETE_FAIL,

    BIDDING_CREATE_REQUEST,
    BIDDING_CREATE_SUCCESS,
    BIDDING_CREATE_FAIL,
    BIDDING_CREATE_RESET,

    BIDDING_UPDATE_REQUEST,
    BIDDING_UPDATE_SUCCESS,
    BIDDING_UPDATE_FAIL,
    BIDDING_UPDATE_RESET,

    BIDDING_TOP_REQUEST,
    BIDDING_TOP_SUCCESS,
    BIDDING_TOP_FAIL,

    PRODUCT_CREATE_BID_REQUEST,
    PRODUCT_CREATE_BID_SUCCESS,
    PRODUCT_CREATE_BID_FAIL,
    PRODUCT_CREATE_BID_RESET,
 } from '../constants/biddingConstants'

export const biddingListReducer = (state = {bidding_products:[]}, action) => {
    switch(action.type){
        case BIDDING_LIST_REQUEST:
            // Returning object, Empty array kept as we're still loading data
            return {
                ...state,
                loading:true, 
                bidding_products:[]
            }; 
        
        case BIDDING_LIST_SUCCESS:
            return {loading:false, 
                    bidding_products: action.payload.bidding_products, 
                    page: action.payload.page, 
                    pages: action.payload.pages
            }

        case BIDDING_LIST_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state
    }

}

export const biddingDetailsReducer = (state = {bidding_product:[], bidding_count: 0}, action) => {
    switch(action.type){
        case BIDDING_DETAILS_REQUEST:
            return {loading:true, ...state, bidding_count: 0} 
        
        case BIDDING_DETAILS_SUCCESS:
            return {loading:false, bidding_product: action.payload, bidding_count: action.payload.bidding_count}

        case BIDDING_DETAILS_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state

    }
}

export const biddingDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case BIDDING_DELETE_REQUEST:
            return {loading:true} 
        
        case BIDDING_DELETE_SUCCESS:
            return {loading:false, success:true}

        case BIDDING_DELETE_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const biddingCreateReducer = (state = {}, action) => {
    switch(action.type){
        case BIDDING_CREATE_REQUEST:
            return {loading: true} 
        
        case BIDDING_CREATE_SUCCESS:
            return {loading: false, success: true, bidding_product: action.payload}

        case BIDDING_CREATE_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        case BIDDING_CREATE_RESET:
            return {} 
        
        default:
            return state
    }
}

export const biddingUpdateReducer = (state = {bidding_product:{}}, action) => {
    switch(action.type){
        case BIDDING_UPDATE_REQUEST:
            return {loading: true} 
        
        case BIDDING_UPDATE_SUCCESS:
            return {loading: false, success: true, bidding_product: action.payload}

        case BIDDING_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        
        case BIDDING_UPDATE_RESET:
            return {bidding_product: {}} 
        
        default:
            return state
    }
}

export const productBidCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_BID_REQUEST:
            return {loading: true} 
        
        case PRODUCT_CREATE_BID_SUCCESS:
            return {loading: false, success: true}

        case PRODUCT_CREATE_BID_FAIL:
            return {loading:false, error: action.payload}
        
        case PRODUCT_CREATE_BID_RESET:
            return {} 
        
        default:
            return state
    }
}

export const biddingTopRatedReducer = (state = {bidding_products:[]}, action) => {
    switch(action.type){
        case BIDDING_TOP_REQUEST:
            return {loading: true, bidding_products: []} 
        
        case BIDDING_TOP_SUCCESS:
            return {loading: false, bidding_products: action.payload}

        case BIDDING_TOP_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}