import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import RoomList from "./RoomList";

test('render a room list', () => {
    render(<RoomList
        rooms={[{
                id: 'ef26763f9d274480964bcb1be7b97e1d',
                name: 'Red rocks'
            },
            {
                id: 'ef26763f9d274480964bcb1be7b97e1f',
                name: 'Madison Square Garden'
            }
        ]}
        pageCount={0}
        onPageChange={() => {}}
        currentPage={1}
    />);

    expect(screen.getByText('Red rocks')).toBeInTheDocument();
    expect(screen.getByText('Madison Square Garden')).toBeInTheDocument();
});

test('empty room list display message', () => {
    render(<RoomList
        rooms={[]}
        pageCount={0}
        onPageChange={() => {}}
        currentPage={1}
    />);

    expect(screen.getByText('There is no room at the moment.')).toBeInTheDocument();
});

test('pagination not displayed if there is only one page', () => {
    render(<RoomList
        rooms={[{
                id: 'ef26763f9d274480964bcb1be7b97e1d',
                name: 'Red rocks'
            },
            {
                id: 'ef26763f9d274480964bcb1be7b97e1f',
                name: 'Madison Square Garden'
            }
        ]}
        pageCount={1}
        onPageChange={() => {}}
        currentPage={1}
    />);

    expect(screen.queryByRole('button', {name: 'Previous page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Page 1 is your current page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Next page'})).not.toBeInTheDocument();
});

test('display pagination when more than one page and go trough page', () => {
    const onPageChange = jest.fn();
    render(<RoomList
        rooms={[{
                id: 'ef26763f9d274480964bcb1be7b97e1d',
                name: 'Red rocks'
            },
            {
                id: 'ef26763f9d274480964bcb1be7b97e1f',
                name: 'Madison Square Garden'
            }
        ]}
        pageCount={4}
        onPageChange={onPageChange}
        currentPage={1}
    />);

    const nextPageButton = screen.getByRole('button', {name: 'Next page'});
    expect(nextPageButton).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Page 1 is your current page'})).toBeInTheDocument();

    fireEvent.click(nextPageButton);
    expect(screen.getByRole('button', {name: 'Page 2 is your current page'})).toBeInTheDocument();
    expect(onPageChange).toBeCalled();
});

test('previous button pagination not displayed when current page is first page', () => {
    render(<RoomList
        rooms={[{
                id: 'ef26763f9d274480964bcb1be7b97e1d',
                name: 'Red rocks'
            },
            {
                id: 'ef26763f9d274480964bcb1be7b97e1f',
                name: 'Madison Square Garden'
            }
        ]}
        pageCount={4}
        onPageChange={() => {}}
        currentPage={1}
    />);

    expect(screen.getByRole('button', {name: 'Previous page'})).toHaveClass("pagination__previous--hidden");
})

test('next button pagination not displayed when current page is last page', () => {
    render(<RoomList
        rooms={[{
                id: 'ef26763f9d274480964bcb1be7b97e1d',
                name: 'Red rocks'
            },
            {
                id: 'ef26763f9d274480964bcb1be7b97e1f',
                name: 'Madison Square Garden'
            }
        ]}
        pageCount={4}
        onPageChange={() => {}}
        currentPage={4}
    />);

    expect(screen.getByRole('button', {name: 'Next page'})).toHaveClass("pagination__next--hidden");
})

test('correct display when is loading', () => {
    render(<RoomList
        rooms={[{
            id: 'ef26763f9d274480964bcb1be7b97e1d',
            name: 'Red rocks'
        }]}
        pageCount={0}
        onPageChange={() => {}}
        currentPage={1}
        isLoading={true}
    />);

    expect(screen.getByRole('loader', {name: 'Loading room list'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Previous page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Page 1 is your current page'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Next page'})).not.toBeInTheDocument();
    expect(screen.queryByText('There is no room at the moment.')).not.toBeInTheDocument();
    expect(screen.queryByText('Red rocks')).not.toBeInTheDocument();
})

test('correct display when component has failed while loading', () => {
    render(<RoomList
        rooms={[]}
        pageCount={0}
        onPageChange={() => {}}
        currentPage={1}
        isLoading={false}
        hasFailedWhileLoading={true}
    />);

    expect(screen.getByText('Oh no, something went wrong !')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Try again'})).toBeInTheDocument();
})