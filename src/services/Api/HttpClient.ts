import axios, {AxiosResponse} from "axios";

class HttpClient {

    private static headers: {[key: string]: string} = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    private static async request (
        method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
        route: string,
        body?: {[key: string]: any},
        queryParams?: {[key: string]: any}
    ): Promise<AxiosResponse>  {
        const data = body ? body : {};
        const url = process.env.REACT_APP_API_BASE_URL + route + HttpClient.mapQueryParams(queryParams)
        const requestObj = { url, headers: HttpClient.headers, method, data };

        try {
            return await axios.request(requestObj);
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                throw error.response.data;
            } else if (axios.isAxiosError(error) && error.response) {
                throw error.response;
            } else {
                throw error;
            }
        }
    };

    private static mapQueryParams(queryParams?: {[key: string]: any}) {
        return queryParams
            ? '?' + Object.keys(queryParams).map(function (key) {
                return key + '=' + queryParams[key]
            }).join('&')
            : ""
    }

    public static async get(route: string, queryParams?: {[key: string]: any}) {
        return await HttpClient.request('GET', route, undefined, queryParams);
    }

    public static async put(route: string, body?: {[key: string]: any}, queryParams?: {[key: string]: any}) {
        return await HttpClient.request('PUT', route, queryParams, body);
    }

    public static async post(route: string, body?: {[key: string]: any}, queryParams?: {[key: string]: any}) {
        return await HttpClient.request('POST', route, queryParams, body);
    }

    public static async delete(route: string, queryParams?: {[key: string]: any}) {
        return await HttpClient.request('POST', route, queryParams);
    }

    public static async patch(route: string, body?: {[key: string]: any}, queryParams?: {[key: string]: any}) {
        return await HttpClient.request('PATCH', route, queryParams, body);
    }
}

export default HttpClient;