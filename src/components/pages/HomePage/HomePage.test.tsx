import React from "react";
import {act, render, screen} from "@testing-library/react";
import HomePage from "./HomePage";
import {server} from "../../../mocks/server";
import {rest} from "msw";
import * as RoomEventSource from "../../../services/EventSource/RoomEventSource";
// @ts-ignore
import EventSource from 'eventsource';

beforeEach(() => {
    server.use(
        rest.get(
            `http://example.com/room`,
            (_, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.set('Connection', 'keep-alive'),
                    ctx.set('Content-Type', 'text/event-stream'),
                    ctx.body(`data: {"action":""}\n\n`)
                )
            }
        )
    );

    const CreateRoomsEventSource = jest.spyOn(RoomEventSource, 'CreateRoomsEventSource');
    CreateRoomsEventSource.mockReturnValue(new EventSource('http://example.com/room'));
})

it('should display room list error when request fail', async () => {
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

it('should display empty room list when request return empty', async () => {
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

it('should display rooms and pagination when request succeed', async () => {
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

it('should add a room when receiving ADD_ROOM SSE', async () => {
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
        rest.get(
            `http://example.com/room`,
            (_, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.set('Connection', 'keep-alive'),
                    ctx.set('Content-Type', 'text/event-stream'),
                    ctx.body(`data: {"action":"ADD_ROOM","payload":{"id":"4d73b153a011356ab58b59c172a5d511","name":"Red Rocks"}}\n\n`)
                )
            }
        )
    );

    const CreateRoomsEventSource = jest.spyOn(RoomEventSource, 'CreateRoomsEventSource');
    CreateRoomsEventSource.mockReturnValue(new EventSource('http://example.com/room'));


    render(<HomePage />);

    expect(await screen.findByText('Red Rocks')).toBeInTheDocument();
})

it('should remove a room when receiving DELETE_ROOM SSE', async () => {
    server.use(
        rest.get('/room', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    rooms: [{
                        name: 'Red Rocks',
                        id: '4d73b153a011356ab58b59c172a5d511'
                    }],
                    pageCount: 1
                })
            )
        }),
        rest.get(
            `http://example.com/room`,
            (_, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.set('Connection', 'keep-alive'),
                    ctx.set('Content-Type', 'text/event-stream'),
                    ctx.body(`data: {"action":"DELETE_ROOM","payload":{"id":"4d73b153a011356ab58b59c172a5d511","name":"Red Rocks"}}\n\n`)
                )
            }
        )
    );

    const CreateRoomsEventSource = jest.spyOn(RoomEventSource, 'CreateRoomsEventSource');
    CreateRoomsEventSource.mockReturnValue(new EventSource('http://example.com/room'));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
        render(<HomePage />);
    });

    expect(screen.queryByText('Red Rocks')).not.toBeInTheDocument();
})

afterEach(() => {
    jest.clearAllMocks();
})