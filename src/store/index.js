import {configureStore} from "@reduxjs/toolkit";

const defaultState = {
    status: ''
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                ...state,
                status: 'send'
            }
        default:
            return state
    }
}

export const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production'
})