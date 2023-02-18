const SELECT = 'SELECT'
const INSERT_IMAGE = 'INSERT_IMAGE'
const LOADING_STATUS = 'LOADING_STATUS'
const SUCCESS_STATUS = 'SUCCESS_STATUS'
const ERROR_STATUS = "ERROR_STATUS"

export const networkSelect = (payload) => {
    return {
        type: SELECT,
        payload: payload
    }
}
export const insertImage = (payload) => {
    return {
        type: INSERT_IMAGE,
        payload: payload
    }
}
export const loadingStatus = (payload) => {
    return {
        type: LOADING_STATUS,
        payload: payload
    }
}
export const successStatus = (payload) => {
    return {
        type: SUCCESS_STATUS,
        payload: payload
    }
}
export const errorStatus = (payload) => {
    return {
        type: ERROR_STATUS,
        payload: payload
    }
}
