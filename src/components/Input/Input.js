import classNames from "classnames";

import {useState} from "react";

import './Input.scss'

import {useDispatch, useSelector} from "react-redux";
import {fecthingAllApi, fetchingApi} from "../../store/actions/asyncActions";


const Input = () => {
    const selectedApi = useSelector(state => state.selectedApi)
    const allApisArray = useSelector(state => state.networks.map(network => ({api: network.url, id: network.id})))
    const selectedApiId = useSelector(state => state.selectedApiId)
    const dispatch = useDispatch()

    const [str, setStr] = useState('')
    const [sendAllApi, setSendAllApi] = useState((false))
    const onInput = (e) => {
        setStr(e.target.value)
    }
    const handleCheckbox = () => {
        setSendAllApi(() => !sendAllApi)
    }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch({type: 'SEND'})
    //     const current = selectedApi
    //     query(selectedApi, str).then(res => {
    //         // changeImage(res)
    //         setNetworks(() => {
    //             console.log(networks)
    //             return (
    //                 networks.map(network => {
    //                     console.log(network)
    //                     return network.url === current ? {
    //                         ...network,
    //                         image: res.data
    //                     } : network
    //                 })
    //             )
    //         })
    //
    //     }).then(() => console.log(networks)).catch(e => {
    //         console.log('eee: ' + e)
    //     })
    // }
    const onSubmit = (e) => {
        e.preventDefault()
        sendAllApi ? dispatch(fecthingAllApi(allApisArray, str)) : dispatch(fetchingApi(selectedApi, str, selectedApiId))
    }

    return (
        <>

            <form className="form prompt">
                <textarea className='textarea' value={str} type="text" onChange={onInput}/>
                <span className={'all_api-checkbox'} onClick={handleCheckbox}><input type="checkbox"
                                                                                     checked={sendAllApi}/>Во все сети</span>
                <button onClick={onSubmit} className='sendPromptBtn'>отправить запрос</button>
                {/*{loading ? <Spinner/> : null}*/}
                {/*{error ? <span>какая-то ошибка от сервера. попробуйте ещё раз или поменяйте нейросеть</span> : null}*/}
            </form>

        </>

    )
}

export default Input