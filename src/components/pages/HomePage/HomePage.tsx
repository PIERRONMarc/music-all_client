import HomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import Hero from "../../molecules/Hero/Hero";
import RoomList from "../../molecules/RoomList/RoomList";
import { ReactComponent as Mello} from '../../../assets/icons/mello.svg';
import React, {useCallback, useEffect, useState} from "react";
import RoomService from "../../../services/Api/RoomService";
import Room from "../../../interfaces/Room";
import {AddRoomPayload, DeleteRoomPayload} from "../../../interfaces/EventSourceData";
import {
    CreateRoomsEventSource,
} from "../../../services/EventSource/RoomEventSource";

function HomePage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isRoomListLoading, setIsRoomListLoading] = useState<boolean>(true);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [hasRoomListFailedWhileLoading, setHasRoomListFailedWhileLoading] = useState<boolean>(false);

    const getRooms = useCallback(async () => {
        setHasRoomListFailedWhileLoading(false);
        setIsRoomListLoading(true);

        try {
            const data = await RoomService.getAll(currentPage);
            setRooms(data.rooms);
            setPageCount(data.pageCount);
            setIsRoomListLoading(false);
            setHasRoomListFailedWhileLoading(false);
        } catch (e) {
            setHasRoomListFailedWhileLoading(true)
        }
    }, [currentPage])

    const addRoom = (room: Room) => {
        setRooms((rooms: Room[]) => {
            const maxRoomsCount = 30;
            if (rooms.length < maxRoomsCount) {
                return [...rooms, room];
            }
            return [...rooms];
        })
    }

    const deleteRoom = (name: string) => {
        setRooms((rooms: Room[]) => {
            return rooms.filter((room: Room) => {
                return room.name !== name;
            });
        })
    }

    useEffect(() => {
        getRooms();

        const eventSource = CreateRoomsEventSource();

        eventSource.onmessage = event => {
            const data: AddRoomPayload | DeleteRoomPayload = JSON.parse(event.data);
            if (data.action === 'ADD_ROOM') addRoom(data.payload);
            if (data.action === 'DELETE_ROOM') deleteRoom(data.payload.name);
        };

        eventSource.onerror = () => eventSource.close();

        return () => eventSource.close();
    }, [getRooms])

    return (
        <HomeTemplate
            hero={<Hero />}
            roomList={<RoomList
                rooms={rooms}
                onPageChange={(selectedItem) => {
                    setCurrentPage(selectedItem.selected + 1);
                    getRooms();
                }}
                pageCount={pageCount}
                currentPage={currentPage}
                isLoading={isRoomListLoading}
                hasFailedWhileLoading={hasRoomListFailedWhileLoading}
                onRetry={getRooms}
            />}
            mello={<Mello />}
        />
    );
}

export default HomePage;