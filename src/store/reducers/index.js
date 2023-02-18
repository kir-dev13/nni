import {ERROR_STATUS, INSERT_IMAGE, LOADING_STATUS, SELECT, SUCCESS_STATUS} from "../actions";
import {defaultState} from "../index";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SELECT:
            return {
                ...state,
                networks: state.networks.map(network => network.id === +action.payload ? {
                    ...network,
                    isActive: true
                } : {...network, isActive: false}),
                selectedApi: state.networks[+action.payload].url,
                selectedApiId: +action.payload
            }
        case INSERT_IMAGE:
            return {
                ...state,
                networks: state.networks.map(network => {
                    if (network.id === action.payload.id) {
                        return {
                            ...network,
                            image: action.payload.image
                        }
                    } else {
                        return network
                    }
                })

            }
        case LOADING_STATUS:
            return {
                ...state,
                networks: state.networks.map(network => network.id === action.payload ? {
                    ...network,
                    status: 'loading'
                } : {...network})
            }
        case SUCCESS_STATUS:
            return {
                ...state,
                networks: state.networks.map(network => network.id === action.payload ? {
                    ...network,
                    status: 'success'
                } : {...network})
            }
        case ERROR_STATUS:
            return {
                ...state,
                networks: state.networks.map(network => network.id === action.payload ? {
                    ...network,
                    status: 'error'
                } : {...network})
            }
        default:
            return state
    }
}