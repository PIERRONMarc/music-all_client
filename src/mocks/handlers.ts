import { rest } from 'msw'

export const handlers = [
    rest.get(process.env.REACT_APP_API_BASE_URL + '/room', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                rooms: [{
                        id: '4b9f728a826647bc8633c2eacf3114ad',
                        name: 'Madison Square Garden'
                    },
                    {
                        id: '4b347776472347df8af13134bf83352f',
                        name: 'Red Rocks'
                    },
                    {
                        id: '47f5278cdefc4b748214d15bff6d15f7',
                        name: "L'Olympia"
                    }
                ],
                pageCount: 1
            }),
        )
    }),
]