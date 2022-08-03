import {ReactComponent as JoinIcon} from './../../../assets/icons/join.svg';
import {ReactComponent as SuperviserAccount} from './../../../assets/icons/supervisor-account.svg';
import './index.scss';

interface RoomItemProps {
    roomName: string
}

function RoomItem(props: RoomItemProps) {
    return (
        <div className='room-item'>
            <div className='room-item__name-wrapper'>
                <SuperviserAccount className='room-item__supervisor-account' />
                <h2 className='room-item__name'>{props.roomName}</h2>
            </div>
            <JoinIcon title="join icon" className='room-item__join'/>
        </div>
    )
}

export default RoomItem;