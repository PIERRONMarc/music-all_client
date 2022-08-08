import HttpClient from "./HttpClient";
import Room from "../../interfaces/Room";

interface getAllRoomsEndpoint {
    rooms: Room[],
    pageCount: number
}

class RoomService
{
    static async getAll(page = 1): Promise<getAllRoomsEndpoint> {
        const response = await HttpClient.get('/room', {page: page});
        return response.data;
    }
}

export default RoomService;