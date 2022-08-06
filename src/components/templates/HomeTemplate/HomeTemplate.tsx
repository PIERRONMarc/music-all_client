import React from "react";
import './HomeTemplate.scss';

interface HomeTemplateProps {
    hero: React.ReactNode
    roomList: React.ReactNode,
    mello: React.ReactNode
}

function HomeTemplate(props: HomeTemplateProps) {
    return (
        <div className="home">
            <div className="hero__section">
                <div className="hero__wrapper">
                    {props.hero}
                </div>
                <div className="hero__mello" data-testid="mello">
                    {props.mello}
                </div>
            </div>
            <div className="room-list__section">
                {props.roomList}
            </div>
        </div>
    );
}

export default HomeTemplate;