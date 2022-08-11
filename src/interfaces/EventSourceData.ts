export interface AddRoomPayload {
    action: 'ADD_ROOM',
    payload: {
        id: string
        name: string
    }
}

export interface DeleteRoomPayload {
    action: 'DELETE_ROOM',
    payload: {
        id: string
        name: string
    }
}