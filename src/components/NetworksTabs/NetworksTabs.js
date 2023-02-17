import cn from "classnames";
import Spinner from "../_ui/Spinner/Spinner";
import Tick from "../_ui/Tick/Tick";
import './NetworksTabs.scss'
import {useDispatch, useSelector} from "react-redux";
import {networkSelect} from "../../store/actions";
import Error from "../_ui/Error/Error";
import {useEffect, useRef} from "react";

const NetworksTabs = () => {
    const dispatch = useDispatch()
    const networks = useSelector(state => state.networks)
    const tabContainer = useRef(null)

    useEffect(() => {
        tabContainer.current.addEventListener('wheel', handleHorizontWheel)
        return () => {
            tabContainer.current.removeEventListener('wheel', handleHorizontWheel)
        }
    }, [])

    //** Handlers
    const handleSelect = (e) => {
        dispatch(networkSelect(e.currentTarget.getAttribute('data-id')))
    }

    const handleHorizontWheel = (e) => {
        e.preventDefault()
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 100;
        } else {
            e.currentTarget.scrollLeft -= 100;

        }
    }

    const getStatus = (networkStatus) => {
        switch (networkStatus) {
            case 'loading':
                return <Spinner/>
            case 'success':
                return <Tick/>
            case 'error':
                return <Error/>

            default:
                return null
        }
    }
    return (
        <>
            <div className={'container'}>
                <div ref={tabContainer} className={'network-container'}>
                    <ul className={'network-list'}>
                        {networks.map(network => {
                            let viewStatus = getStatus(network.status)
                            return (
                                <li data-id={network.id} onClick={handleSelect} className={cn('network-item',
                                    {'network-item_active': network.isActive})}
                                    key={network.id}>{network.name} <span
                                    className={'network-item-status'}>{viewStatus}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={'tabContent'}>
                {networks.map(network => network.isActive && network.image ?
                    <div key={network.id} className={'result-container'}>
                        <img key={network.id} src={network.image}/>
                    </div> : null)}
            </div>
        </>
    )
}

export default NetworksTabs