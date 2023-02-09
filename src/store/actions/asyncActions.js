import {errorStatus, insertImage, loadingStatus, successStatus} from "./index";

const query = (apiUrl, prompt) => {

    return fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json"
            // Authorization: `Bearer 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`
        },
        method: "POST",
        body: JSON.stringify({
            data: [prompt]
        })
    })
}


export const fetchingApi = (apiUrl, prompt, selectedApiId) => {
    return dispatch => {
        dispatch(loadingStatus(selectedApiId))
        return query(apiUrl, prompt).then(response => {
            dispatch(successStatus(selectedApiId))
            return response.json()
        }).then(json => {
            dispatch(insertImage({
                image: json.data[0],
                id: selectedApiId
            }))
        }).catch(err => {
            console.log(err)
            dispatch(errorStatus(selectedApiId))
        })
    }
}

export const fecthingAllApi = (allApisArray, prompt) => {
    return dispatch => {
        allApisArray.forEach(item => {
            dispatch(loadingStatus(item.id))
            query(item.api, prompt).then(response => {
                    dispatch(successStatus(item.id))
                    return response.json()
                }
            ).then(json => {
                dispatch(insertImage({
                    image: json.data[0],
                    id: item.id
                }))
            }).catch(err => {
                console.log(err)
                dispatch(errorStatus(item.id))
            })
        })

    }
}