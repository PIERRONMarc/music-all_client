import React from "react";
import {render, screen} from "@testing-library/react";
import HomePage from "./HomePage";
import {server} from "../../../mocks/server";
import {rest} from "msw";

test('home page render without crashing', () => {
    render(<HomePage />);
});

test('should display room list error when request fail', async () => {
    server.use(
        rest.get('/room', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    );

    render(<HomePage />);

    const retryButton = await screen.findByRole('button', {name: 'Try again'})
    const errorMessage = await screen.findByText('Oh no, something went wrong !');

    expect(retryButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
})


test('should display empty room list when request return empty', async () => {
    server.use(
        rest.get('/room', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    rooms: [],
                    pageCount: 1
                })
            )
        }),
    );

    render(<HomePage />);

    const emptyMessage = await screen.findByText('There is no room at the moment.');

    expect(emptyMessage).toBeInTheDocument();
})

test('should display rooms and pagination when request succeed', async () => {
    server.use(
        rest.get('/room', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    rooms: [{
                        id: '5ca5ac4e327341ddb8a9b26f9f032b8d',
                        name: 'Red rocks'
                    }],
                    pageCount: 2
                })
            )
        }),
    );

    render(<HomePage />);

    const roomName = await screen.findByText('Red rocks');
    const currentPage = await screen.findByRole('button', {name: 'Page 1 is your current page'});
    const nexPageButton = await screen.findByRole('button', {name: 'Next page'});

    expect(roomName).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
    expect(nexPageButton).toBeInTheDocument();
})