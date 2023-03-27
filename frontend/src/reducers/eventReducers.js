// Reducer -> Function that takes in our current state and it takes an action of what we wanna do to the state

import { 
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,

    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,

    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_CREATE_RESET,

    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_RESET,

} from '../constants/eventConstants'

export const eventListReducer = (state = {events:[]}, action) => {
    switch(action.type){
        case EVENT_LIST_REQUEST:
            // Returning object, Empty array kept as we're still loading data
            return {loading:true, events:[]} 
        
        case EVENT_LIST_SUCCESS:
            return {loading:false, 
                    events: action.payload.events, 
                    page: action.payload.page, 
                    pages: action.payload.pages
            }

        case EVENT_LIST_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const eventDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case EVENT_DELETE_REQUEST:
            return {loading:true} 
        
        case EVENT_DELETE_SUCCESS:
            return {loading:false, success:true}

        case EVENT_DELETE_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const eventCreateReducer = (state = {}, action) => {
    switch(action.type){
        case EVENT_CREATE_REQUEST:
            return {loading: true} 
        
        case EVENT_CREATE_SUCCESS:
            return {loading: false, success: true, event: action.payload}

        case EVENT_CREATE_FAIL:
            // Adding error attribute and response from payload
            return {loading:false, error: action.payload}
        
        case EVENT_CREATE_RESET:
            return {} 
        
        default:
            return state
    }
}

export const eventUpdateReducer = (state = {event:{}}, action) => {
    switch(action.type){
        case EVENT_UPDATE_REQUEST:
            return {loading: true} 
        
        case EVENT_UPDATE_SUCCESS:
            return {loading: false, success: true, event: action.payload}

        case EVENT_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        
        case EVENT_UPDATE_RESET:
            return {event: {}} 
        
        default:
            return state
    }
}

