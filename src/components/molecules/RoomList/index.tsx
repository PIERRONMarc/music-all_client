import RoomItem from '../../atoms/RoomItem';
import './index.scss';
import ReactPaginate from "react-paginate";
import React from 'react';

interface RoomListProps {
    roomNames: string[],
    onPageChange: (selectedItem: {selected: number}) => void
    pageCount:  number
    currentPage: number
}

function RoomList(props: RoomListProps) {
    return (
        <div data-testid='room-list' className="room-list">
            <h2 className='room-list__title'>Join a room</h2>
            {props.roomNames.length
                ? props.roomNames.map((roomName: string, key: number) => (
                    <React.Fragment key={key}>
                        <RoomItem roomName={roomName} key={key} />
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
        </div>
    );
}

export default RoomList;