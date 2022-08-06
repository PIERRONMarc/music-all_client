import React from 'react';
import {render, screen} from '@testing-library/react';
import RoomList from "./RoomList";

test('render a room list', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} pageCount={0} onPageChange={() => {}} currentPage={1} />);

    expect(screen.getByText('Red rocks')).toBeInTheDocument();
    expect(screen.getByText('Madison Square Garden')).toBeInTheDocument();
});

test('empty room list display message', () => {
    render(<RoomList roomNames={[]} pageCount={0} onPageChange={() => {}} currentPage={1} />);

    expect(screen.getByText('There is no room at the moment.')).toBeInTheDocument();
});

test('pagination not displayed if there is only one page', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} pageCount={1} onPageChange={() => {}} currentPage={1} />);

    expect(screen.queryByRole('button', {name: 'Previous page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Page 1 is your current page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Next page'})).not.toBeInTheDocument();
});

test('display pagination when more than one page', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} pageCount={4} onPageChange={() => {}} currentPage={1} />);

    expect(screen.getByRole('button', {name: 'Page 1 is your current page'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Next page'})).toBeInTheDocument();
});

test('previous button pagination not displayed when current page is first page', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} pageCount={4} onPageChange={() => {}} currentPage={1} />);

    expect(screen.getByRole('button', {name: 'Previous page'})).toHaveClass("pagination__previous--hidden");
})
test('next button pagination not displayed when current page is last page', () => {
    render(<RoomList roomNames={['Red rocks', 'Madison Square Garden']} pageCount={4} onPageChange={() => {}} currentPage={4} />);

    expect(screen.getByRole('button', {name: 'Next page'})).toHaveClass("pagination__next--hidden");
})
