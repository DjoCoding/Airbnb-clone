import { create } from "zustand";
import { IPlace } from "../../types";
import useAuth from "../auth/useAuth";
import api from "../../config/api";
import { promise } from "zod";

export type Booking = {
    placeID: string;
    ownerID: string;
    createdAt: string;
}

type BookingsFetcherState = {
    places: IPlace[];
    
    isLoading: boolean;
    error: any;

    actions: {
        fetchBookings: () => Promise<void>;
    }
}

const useBookingFetcher = create<BookingsFetcherState>((set, get) => ({
    places: [],

    isLoading: false,
    error: null,

    actions: {
        fetchBookings: async () => {
            const token = useAuth.getState().token;
            if(!token) { return; }
            
            set({
                isLoading: true,
                error: null
            });

            try {
                const res = await api.get("/bookings", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const bookings: Booking[] = res.data.data.bookings;
                
                const promises = bookings.map(booking => {
                    return new Promise<IPlace>((resolve, reject) => {
                        api.get(`/places/${booking.placeID}`)
                        .then((res) => {
                            return resolve(res.data.data.place)
                        })
                        .catch(err => reject(err))
                    })
                });

                const places = await Promise.all(promises);
                set({
                    places
                })
            } catch(err) {
                set({
                    error: err
                })
            } finally {
                set({
                    isLoading: false
                })
            }
        } 
    }
}));

export default useBookingFetcher;
