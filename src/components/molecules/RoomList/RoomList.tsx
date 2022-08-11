import RoomItem from '../../atoms/RoomItem/RoomItem';
import './RoomList.scss';
import ReactPaginate from "react-paginate";
import React from 'react';
import {PulseLoader} from "react-spinners";
import Room from "../../../interfaces/Room";
import Button from "../../atoms/Button/Button";
import { ReactComponent as WarningIcon} from '../../../assets/icons/warning.svg';

interface RoomListProps {
    rooms: Room[],
    onPageChange: (selectedItem: {selected: number}) => void
    pageCount:  number
    currentPage: number
    isLoading?: boolean
    hasFailedWhileLoading?: boolean
    onRetry?: () => any
}

function RoomList(props: RoomListProps) {

    const { isLoading = false, hasFailedWhileLoading = false, onRetry = () => {} } = props;

    const getListWithPagination = () => {
        if (hasFailedWhileLoading) {
            return (
                <div className="error">
                    <WarningIcon className="error__icon" />
                    <p className="error__text">Oh no, something went wrong !</p>
                    <Button onClick={onRetry}>
                        Try again
                    </Button>
                </div>
            )
        }

        if (isLoading) {
            return <PulseLoader color="white" role="loader" aria-label="Loading room list" />
        }

        return (
            <>
                {props.rooms.length
                    ? props.rooms.map((room: Room, key: number) => (
                        <React.Fragment key={key}>
                            <RoomItem roomName={room.name} key={key} />
                        </React.Fragment>
                    ))
                    : <p className='room-list__empty'>There is no room at the moment.</p>
                }

                {props.pageCount > 1 &&
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={props.currentPage - 1}
                        nextLabel={props.currentPage + 1}
                        onPageChange={props.onPageChange}
                        pageRangeDisplayed={0}
                        marginPagesDisplayed={0}
                        pageCount={props.pageCount}
                        containerClassName="pagination__wrapper"
                        activeClassName="pagination__active"
                        nextLinkClassName={props.pageCount === props.currentPage ? "pagination__next--hidden" : "pagination__next"}
                        previousLinkClassName={props.currentPage === 1 ? "pagination__previous--hidden" : "pagination__previous"}
                    />
                }
            </>
        )
    }

    return (
        <div data-testid='room-list' className="room-list">
            <h2 className='room-list__title'>Join a room</h2>
            {getListWithPagination()}
        </div>
    );
}

export default RoomList;