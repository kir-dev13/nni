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

            <div className={'image-container'}>
                <div className={'container'}>

                    <form className="form prompt">

                        <h1 style={{
                            color: 'white',
                            textShadow: '4px 4px 4px #000'
                        }}>Create unique</h1>
                        <textarea placeholder={'In english, please'} className='textarea' value={str}
                                  type="text"
                                  onChange={onInput}/>


                        <div className={'send-prompt-container'}>
                            <button onClick={onSubmit} className='sendPromptBtn'>Send</button>
                            <input className={'checkbox'} id={'all-api'} type="checkbox"
                                   onChange={handleCheckbox}
                                   checked={sendAllApi}/><label htmlFor={'all-api'} className={'all_api-checkbox'}
                        ><b>Send to all
                            models</b></label>
                        </div>
                    </form>

                </div>
            </div>


        </>

    )
}

export default InputForm