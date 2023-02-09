import {configureStore} from "@reduxjs/toolkit";


const networksList = [
    {
        name: 'stable diffusion v1.4',
        url: 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict',
    },
    {
        name: 'stable diffusion v2',
        url: "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict",
    },
    {
        name: 'photorealistic-fuen',
        url: "https://nonexistentusername-claudfuen-photorealistic-fuen-v1.hf.space/run/predict",
    },
    {
        name: 'analog-diffusion',
        url: "https://nonexistentusername-wavymulder-analog-diffusion.hf.space/run/predict",
    },
    {
        name: 'stable-diffusion-v1-5',
        url: "https://nonexistentusername-runwayml-stable-diffusion-v1-5.hf.space/run/predict",
    },
    {
        name: 'prompthero-openjourney',
        url: "https://nonexistentusername-prompthero-openjourney.hf.space/run/predict",
    },
    // {
    //     name: '',
    //     url: "",
    // },
]

const getNetworks = (networksList) => {

    class Network {
        constructor(name, url, isActive, id) {
            this.id = id
            this.name = name
            this.url = url
            this.isActive = isActive
        }

        isActive = false;
        image = ''
        status = ''
    }

    return networksList.map((network, idx) => {
        const isActive = idx === 0
        return new Network(network.name, network.url, isActive, idx)
    })
}

const defaultState = {
    networks: getNetworks(networksList),
}


const getDefaultState = (defaultState) => {
    return ({
        ...defaultState,
        selectedApi: defaultState.networks.find(network => network.isActive).url,
        selectedApiId: defaultState.networks.find(network => network.isActive).id
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
                selectedApi: state.networks[+action.payload].url,
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
        case "ERROR_STATUS":
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

export const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production'
})