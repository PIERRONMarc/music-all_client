import HomeTemplate from "../../templates/HomeTemplate";
import Hero from "../../molecules/Hero";
import RoomList from "../../molecules/RoomList";
import { ReactComponent as Mello} from '../../../assets/icons/mello.svg';

function HomePage() {
    return (
        <HomeTemplate
            hero={<Hero />}
            roomList={<RoomList roomNames={['Red rocks', 'U Arena', 'Madison Square Garden']} />}
            mello={<Mello />}
        />
    );
}

export default HomePage;