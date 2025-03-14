import { create } from "zustand"
import { IPlace } from "../../types";
import api from "../../config/api";

type PlaceFetcherState = {
    place: IPlace | null;
    places: IPlace[];
    err: any;
    isLoading: boolean;

    actions: {
        fetchPlace: (id: string) => Promise<void>;
        fetchPlacesOfUser: (userID: string) => Promise<void>;
        fetchPlaces: () => Promise<void>;
    }
}

const usePlaceFetcher = create<PlaceFetcherState>((set, get) => ({
    place: null,
    places: [],
    err: null,
    isLoading: false,

    actions: {
        fetchPlace: async (id) => {
            set({
                isLoading: true
            });

            try {
                const res = await api.get(`/places/${id}`);
                const { place } = res.data.data;
                set({
                    place
                });
            } catch(err) {
                set({
                    err
                })
            } finally {
                set({
                    isLoading: false
                })
            }
        },
        fetchPlacesOfUser: async (userID) => {
            set({
                isLoading: true
            });

            try {
                const res = await api.get(`/users/${userID}/places`);
                const { places } = res.data.data;
                set({
                    places
                });
            } catch(err) {
                set({ 
                    err
                })
            } finally {
                set({
                    isLoading: false
                });
            }
        },
        fetchPlaces: async() => {
            set({
                isLoading: true
            });

            try {
                const res = await api.get("/places");
                const { places } = res.data.data;
                console.log(places);
                set({
                    places
                });
            } catch(err) {
                set({
                    err
                });
            } finally {
                set({
                    isLoading: false
                });
            }
        }
    }
}));

export default usePlaceFetcher;