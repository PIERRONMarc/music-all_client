import React from 'react';
import { render, screen } from '@testing-library/react';
import RoomList from "./index";

test('render a room list', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} />);

    expect(screen.getByText('Red rocks')).toBeInTheDocument();
    expect(screen.getByText('Madison Square Garden')).toBeInTheDocument();
});

test('room list is empty', () => {
    render(<RoomList roomNames={[]} />);

    expect(screen.getByText('There is no room at the moment.')).toBeInTheDocument();
});