import React from 'react';
import {render, screen} from "@testing-library/react";
import Hero from "../../molecules/Hero";
import HomeTemplate from "./index";
import RoomList from "../../molecules/RoomList";
import { ReactComponent as Mello} from '../../../assets/icons/mello.svg';

test('render a Hero', () => {
    render(<HomeTemplate
        hero={<Hero />}
        roomList={<RoomList roomNames={['Red rocks']} onPageChange={()=> {}} pageCount={0} currentPage={0} />}
        mello={<Mello />}
    />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('room-list')).toBeInTheDocument();
    expect(screen.getByTestId('mello')).toBeInTheDocument();
});