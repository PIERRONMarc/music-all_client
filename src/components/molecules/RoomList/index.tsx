import RoomItem from '../../atoms/RoomItem';
import './index.scss';

interface RoomListProps {
    roomNames: string[]
}

function RoomList(props: RoomListProps) {
    return (
        <div data-testid='room-list'>
            <h2 className='room-list__title'>Join a room</h2>
            {props.roomNames.length
                ? props.roomNames.map((roomName: string, key: number) => (
                    <RoomItem roomName={roomName} key={key} />
                  ))
                : <p className='room-list__empty'>There is no room at the moment.</p>
            }
        </div>
    );
}

export default RoomList;