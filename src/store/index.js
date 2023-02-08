import {configureStore} from "@reduxjs/toolkit";

class Network {
    constructor(name, url, id) {
        this.id = id
        this.name = name
        this.url = url
        this.isActive = false
        this.image = ''
        this.status = ''
    }
}

// const networksArray = [{
//     name: 'stable diffusion v1.4',
//     url: 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict',
// }, {
//     name: 'stable diffusion v2',
//     url: "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict",
// }]

const defaultState = {
    networks: [{
        id: 0,
        name: 'stable diffusion v1.4',
        url: 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict',
        image: '',
        isActive: true,
        status: null,
    },
        {
            id: 1,
            name: 'stable diffusion v2',
            url: "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict",
            image: '',
            isActive: false,
            status: null,
        },
        {
            id: 2,
            name: 'photorealistic-fuen',
            url: "https://nonexistentusername-claudfuen-photorealistic-fuen-v1.hf.space/run/predict",
            image: '',
            isActive: false,
            status: null,
        },
        {
            id: 3,
            name: 'analog-diffusion',
            url: "https://nonexistentusername-wavymulder-analog-diffusion.hf.space/run/predict",
            image: '',
            isActive: false,
            status: null,
        }]
}

const getDefaultState = (defaultState) => {
    return ({
        ...defaultState,
        // networks: networksArray.map((network, idx) => new Network( network.name, network.url, idx)),
        selectedApi: defaultState.networks.filter(network => network.isActive)[0].url,
        selectedApiId: defaultState.networks.filter(network => network.isActive)[0].id
    })
}

const reducer = (state = getDefaultState(defaultState), action) => {
    switch (action.type) {
        case 'SELECT':
            return {
                ...state,
                networks: state.networks.map(network => network.id === +action.payload ? {
                    ...network,
                    isActive: true
                } : {...network, isActive: false}),
                selectedApi: state.networks.filter(network => network.id === +action.payload)[0].url,
                selectedApiId: +action.payload
            }
        case 'INSERT_IMAGE':
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
        case 'LOADING_STATUS':
            return {
                ...state,
                networks: state.networks.map(network => network.id === action.payload ? {
                    ...network,
                    status: 'loading'
                } : {...network})
            }
        case 'SUCCESS_STATUS':
            return {
                ...state,
                networks: state.networks.map(network => network.id === action.payload ? {
                    ...network,
                    status: 'success'
                } : {...network})
            }
        default:
            return state
    }
}

export const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production'
})