import classNames from "classnames";

import {useState} from "react";
import {query} from "../../services/fetchNeural";

import './Input.scss'
import Spinner from "../Spinner/Spinner";

const networks = [
    {
        name: 'stable diffusion v1.4',
        url: 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict'
    },
    {
        name: 'stable diffusion v2',
        url: "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict"
    },
    {
        name: 'photorealistic-fuen',
        url: "https://nonexistentusername-claudfuen-photorealistic-fuen-v1.hf.space/run/predict"
    },
    {
        name: 'analog-diffusion',
        url: "https://nonexistentusername-wavymulder-analog-diffusion.hf.space/run/predict"
    }
]

const Input = ({changeImage}) => {


    const [str, setStr] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedApi, setSelectedApi] = useState(networks[0].url)

    const onInput = (e) => {
        setStr(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        query(selectedApi, str).then(res => {
            console.log('ТРИТАТТАТТАТАТА!!! ')
            console.log(res)
            changeImage(res)
            setLoading(false)
        }).catch(e => {
            console.log('eee: ' + e)
            setLoading(false)
            setError(true)
        })
    }

    const onSelect = (e) => {
        e.target.classList.add('network-item_active')
        setSelectedApi(() => e.target.getAttribute('data-url'))
    }

    return (
        <>

            <form className="form prompt">

                {/*            <select onChange={onSelect} defaultValue={selectedApi} name="network" className="select">
                {networks.map((item, idx) => {
                    return (
                        <option key={idx} value={item.url}>{item.name}</option>
                    )
                })}

            </select>*/}
                <textarea className='textarea' value={str} type="text" onChange={onInput}/>
                <button disabled={loading} className='sendPromptBtn' onClick={onSubmit}>отправить запрос</button>
                {loading ? <Spinner/> : null}
                {error ? <span>какая-то ошибка от сервера. попробуйте ещё раз или поменяйте нейросеть</span> : null}
            </form>
            <div className={'network-container'}>
                <ul className={'network-list'}>
                    {networks.map((item, idx) => {
                        const itemClass = classNames('network-item', {
                            'network-item_active': item.url === selectedApi
                        })
                        return (
                            <li onClick={onSelect} data-url={item.url} className={itemClass} key={idx}

                                // value={item.url}
                            >{item.name}</li>
                        )
                    })}

                </ul>
            </div>
        </>

    )
}

export default Input