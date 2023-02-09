import cn from "classnames";
import Spinner from "../_ui/Spinner/Spinner";
import Tick from "../_ui/Tick/Tick";
import './NetworksTabs.scss'
import {useDispatch, useSelector} from "react-redux";
import {networkSelect} from "../../store/actions";
import Error from "../_ui/Error/Error";

const NetworksTabs = () => {
    const dispatch = useDispatch()
    const networks = useSelector(state => state.networks)

    const onSelect = (e) => {
        dispatch(networkSelect(e.currentTarget.getAttribute('data-id')))
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
            <div className={'network-container'}>
                <ul className={'network-list'}>
                    {networks.map(network => {
                        let viewStatus = getStatus(network.status)
                        return (
                            <li data-id={network.id} onClick={onSelect} className={cn('network-item',
                                {'network-item_active': network.isActive})}
                                key={network.id}>{network.name} <span
                                className={'network-item-status'}>{viewStatus}</span>
                            </li>
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

export default NetworksTabs