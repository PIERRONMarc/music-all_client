import HomeTemplate from "../../templates/HomeTemplate";
import Hero from "../../molecules/Hero";
import RoomList from "../../molecules/RoomList";
import { ReactComponent as Mello} from '../../../assets/icons/mello.svg';
import React, {useState} from "react";

function HomePage() {
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <HomeTemplate
            hero={<Hero />}
            roomList={<RoomList roomNames={[
                'Red rocks',
                'U Arena',
                'Madison Square Garden',
                'Red rocks',
                'U Arena',
                'Madison Square Garden',
                'Red rocks',
                'Red rocks',
                'Red rocks',
                'Red rocks',
                'Red rocks',
                'Red rocks',
                'U Arena',
                'Madison Square Garden',
                'Red rocks',
                'U Arena',
                'U Arena',
                'U Arena',
                'U Arena',
                'U Arena',
                ]}

                onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected + 1)}
                pageCount={4}
                currentPage={currentPage}
            />}
            mello={<Mello />}
        />
    );
}

export default HomePage;