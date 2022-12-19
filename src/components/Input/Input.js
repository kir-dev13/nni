import {useState} from "react";
import {query} from "../../services/fetchNeural";

import './Input.scss'

const Input = ({changeImage}) => {

    const [str, setStr] = useState('')

    const onInput = (e) => {
        setStr(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        query(str).then(res => {
            console.log(res)
            changeImage(res)
        })
    }

    return (
        <form>
            <textarea className='textarea' value={str} type="text" onChange={onInput}/>
            <button className='sendPromptBtn' onClick={onSubmit}>отправить запрос</button>
        </form>

    )
}

export default Input