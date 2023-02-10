import classNames from "classnames";

import {useState} from "react";

import './InputForm.scss'

import {useDispatch, useSelector} from "react-redux";
import {fecthingAllApis, fetchingApi} from "../../store/actions/asyncActions";


const InputForm = () => {
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

    const onSubmit = (e) => {
        e.preventDefault()
        sendAllApi ? dispatch(fecthingAllApis(allApisArray, str)) : dispatch(fetchingApi(selectedApi, str, selectedApiId))
    }

    return (
        <>

            <form className="form prompt">
                <textarea placeholder={'запрос только на английском'} className='textarea' value={str} type="text"
                          onChange={onInput}/>
                <span className={'all_api-checkbox'} onClick={handleCheckbox}><input type="checkbox"
                                                                                     onChange={handleCheckbox}
                                                                                     checked={sendAllApi}/>Во все сети</span>
                <button onClick={onSubmit} className='sendPromptBtn'>отправить запрос</button>
            </form>

        </>

    )
}

export default InputForm