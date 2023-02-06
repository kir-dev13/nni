import classNames from "classnames";

import {useState} from "react";
import {query} from "../../services/fetchNeural";

import './Input.scss'
import Spinner from "../Spinner/Spinner";
import {logDOM} from "@testing-library/react";
import {useDispatch} from "react-redux";


const Input = ({networks, setNetworks, changeImage}) => {

    const dispatch = useDispatch()

    const [str, setStr] = useState('')
    const [selectedApi, setSelectedApi] = useState(networks.filter((network) => network.isActive)[0].url)
    const onInput = (e) => {
        setStr(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch({type: 'SEND'})
        const current = selectedApi
        query(selectedApi, str).then(res => {
            // changeImage(res)
            setNetworks(() => {
                console.log(networks)
                return (
                    networks.map(network => {
                        console.log(network)
                        return network.url === current ? {
                            ...network,
                            image: res.data
                        } : network
                    })
                )
            })

        }).then(() => console.log(networks)).catch(e => {
            console.log('eee: ' + e)
        })
    }

    const onSelect = (e) => {
        console.table('SELECT:', networks.filter(n => n.isActive)[0].name)
        console.table(e.target.getAttribute('data-id'))
        setNetworks(() => {
            return (
                networks.map(network => {
                    return network.id === +e.target.getAttribute('data-id') ? {
                        ...network,
                        isActive: true
                    } : {...network, isActive: false}
                })
            )
        })
        setSelectedApi(() => e.target.getAttribute('data-url'))
    }

    return (
        <>

            <form className="form prompt">
                <textarea className='textarea' value={str} type="text" onChange={onInput}/>
                <button className='sendPromptBtn' onClick={onSubmit}>отправить запрос</button>
                {/*{loading ? <Spinner/> : null}*/}
                {/*{error ? <span>какая-то ошибка от сервера. попробуйте ещё раз или поменяйте нейросеть</span> : null}*/}
            </form>
            <div className={'network-container'}>
                <ul className={'network-list'}>
                    {networks.map((item, idx) => {
                        const itemClass = classNames('network-item', {
                            'network-item_active': item.isActive
                        })
                        return (
                            <li onClick={onSelect} data-url={item.url} data-id={item.id} className={itemClass} key={idx}

                                // value={item.url}
                            >{item.name}</li>
                        )
                    })}

                </ul>
            </div>
            <div className={'tabContent'}>
                {networks.map(network => network.isActive && network.image ?
                    <img key={network.id} src={network.image}/> : null)}
            </div>
        </>

    )
}

export default Input