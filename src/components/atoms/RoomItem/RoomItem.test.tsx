import React from 'react';
import { render, screen } from '@testing-library/react';
import RoomItem from "./RoomItem";

test('render a room item', () => {
    render(<RoomItem roomName='Red rocks' />);

    expect(screen.getByRole('heading')).toHaveTextContent('Red rocks');
    expect(screen.getByTitle('join icon')).toBeInTheDocument();
});