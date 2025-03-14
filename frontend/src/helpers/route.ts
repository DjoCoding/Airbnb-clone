const api = import.meta.env.VITE_API_URL;

export default function getRoute(endpoint: string) {
    const route =  `${api}/${endpoint}`;
    return route;
}