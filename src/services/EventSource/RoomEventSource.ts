export function CreateRoomsEventSource(): EventSource {
    const url = new URL(process.env.REACT_APP_SSE_BASE_URL ?? '');
    url.searchParams.append('topic', '/room');

    return new EventSource(url);
}