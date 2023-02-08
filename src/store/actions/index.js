export const networkSelect = (payload) => {
    return {
        type: 'SELECT',
        payload: payload
    }
}
export const insertImage = (payload) => {
    return {
        type: 'INSERT_IMAGE',
        payload: payload
    }
}
export const loadingStatus = (payload) => {
    console.log(payload)
    return {
        type: 'LOADING_STATUS',
        payload: payload
    }
}
export const successStatus = (payload) => {
    return {
        type: 'SUCCESS_STATUS',
        payload: payload
    }
}