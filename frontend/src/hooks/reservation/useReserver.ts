import { create } from "zustand";
import api from "../../config/api";

type ReserverState = {
    err: any;
    success: boolean | null;
    isLoading: boolean;
    actions: {
        reserve: (placeID: string) => Promise<void>;
    }
}

const useReserver = create<ReserverState>((set, get) => ({
    err: null,
    success: null,
    isLoading: false,
    actions: {
        reserve: async (placeID: string,) => {
            set({
                isLoading: true
            });

            try {
                await api.post("/bookings", {
                    placeID
                });                
                set({
                    success: true
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
        }
    }
}))

export default useReserver;