import './Hero.scss';
import Button from '../../atoms/Button/Button';
import { ReactComponent as OnlineMedia} from '../../../assets/icons/online-media.svg';

function Hero() {
    return (
        <div className="hero" data-testid="hero">
            <div>
                <h1 className="hero__title">Music'<span className="hero__title--accent">all</span></h1>
                <p className="hero__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra ut purus et blandit. Proin sit amet justo vulputate, dictum enim non, finibus lacus.
                </p>
                <Button>Create my room</Button>
            </div>
            <OnlineMedia className="hero__online-media-icon" />
        </div>
    );
}

export default Hero;