import HomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import Hero from "../../molecules/Hero/Hero";
import RoomList from "../../molecules/RoomList/RoomList";
import { ReactComponent as Mello} from '../../../assets/icons/mello.svg';
import React, {useEffect, useState} from "react";
import RoomService from "../../../services/Api/RoomService";
import Room from "../../../interfaces/Room";

function HomePage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isRoomListLoading, setIsRoomListLoading] = useState<boolean>(true);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [hasRoomListFailedWhileLoading, setHasRoomListFailedWhileLoading] = useState<boolean>(false);

    const getAllRooms = async () => {
        setHasRoomListFailedWhileLoading(false);
        setIsRoomListLoading(true);

        RoomService.getAll(currentPage)
            .then(data => {
                setRooms(data.rooms);
                setPageCount(data.pageCount);
                setIsRoomListLoading(false);
                setHasRoomListFailedWhileLoading(false);
            })
            .catch(() => setHasRoomListFailedWhileLoading(true));
    }

    useEffect(() => {
        getAllRooms();
    }, [])

    return (
        <HomeTemplate
            hero={<Hero />}
            roomList={<RoomList
                rooms={rooms}
                onPageChange={(selectedItem) => {
                    setCurrentPage(selectedItem.selected + 1);
                    getAllRooms();
                }}
                pageCount={pageCount}
                currentPage={currentPage}
                isLoading={isRoomListLoading}
                hasFailedWhileLoading={hasRoomListFailedWhileLoading}
                onRetry={getAllRooms}
            />}
            mello={<Mello />}
        />
    );
}

export default HomePage;