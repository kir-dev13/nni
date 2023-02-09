import cn from "classnames";
import Spinner from "../ui/Spinner/Spinner";
import Tick from "../ui/Tick/Tick";
import './Networks.scss'
import {useDispatch, useSelector} from "react-redux";
import {networkSelect} from "../../store/actions";
import Error from "../ui/Error/Error";

const Networks = () => {
    const dispatch = useDispatch()
    const networks = useSelector(state => state.networks)
    // const selectedApi = useSelector(state => state.selectedApi)

    const onSelect = (e) => {
        console.log(e.currentTarget)
        dispatch(networkSelect(e.currentTarget.getAttribute('data-id')))
    }

    return (
        <>
            <div className={'network-container'}>
                <ul className={'network-list'}>
                    {networks.map(network => {
                        console.log(network.status)
                        let status = null
                        switch (network.status) {
                            case 'loading':
                                status = <Spinner/>
                                break;
                            case 'success':
                                status = <Tick/>
                                break;
                            case 'error':
                                status = <Error/>
                                break;
                            default:
                        }
                        return (
                            <li data-id={network.id} onClick={onSelect} className={cn('network-item',
                                {'network-item_active': network.isActive})}
                                key={network.id}>{network.name} <span className={'network-item-status'}>{status}</span>
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

export default Networks