import cn from "classnames";
import Spinner from "../Spinner/Spinner";
import './Networks.scss'
import {useDispatch, useSelector} from "react-redux";
import {networkSelect} from "../../store/actions";

const Networks = () => {
    const dispatch = useDispatch()
    const networks = useSelector(state => state.networks)
    // const selectedApi = useSelector(state => state.selectedApi)

    const onSelect = (e) => {
        dispatch(networkSelect(e.target.getAttribute('data-id')))
    }

    return (
        <>
            <div className={'network-container'}>
                <ul className={'network-list'}>
                    {networks.map(network => {
                        console.log(network.status)
                        let initial = null
                        switch (network.status) {
                            case 'loading':
                                initial = <Spinner/>
                                break;
                            case 'success':
                                initial = 'ok'
                                break;
                            case 'error':
                                initial = 'error'
                                break;
                            default:
                        }
                        return (
                            <li data-id={network.id} onClick={onSelect} className={cn('network-item',
                                {'network-item_active': network.isActive})}
                                key={network.id}>{network.name} {initial}</li>
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

export default Networks