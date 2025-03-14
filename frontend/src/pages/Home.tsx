import { useEffect } from "react";
import useAuth from "../hooks/auth/useAuth";
import Loading from "../components/Loading";
import usePlaceFetcher from "../hooks/place/usePlaceFetcher";
import Place from "../components/Home/Place";

export default function Home() {
    const { actions: { fetchUser }, isLoading: isFetchingUser } = useAuth();
    const { places: fetchedPlaces, isLoading: isFetchingPlaces, actions: { fetchPlaces } } = usePlaceFetcher();

    useEffect(() => {
        fetchUser();
        fetchPlaces();
    }, []);

    if(isFetchingPlaces || isFetchingUser) {
        return <Loading />
    }

    return(
        <div className="my-10 w-full">
            <div className="max-sm:px-4 max-sm:py-2 px-30 py-10 w-full h-full mx-auto flex flex-wrap gap-x-10 gap-y-10">
                {
                    fetchedPlaces.map(place => {
                        return <Place key={place.id} place={place} />
                    })
                }
            </div>
        </div>
    );
}