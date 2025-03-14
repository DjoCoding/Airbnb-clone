import { create } from "zustand";
import api from "../../config/api";


type PlaceDeleterState = {
    isLoading: boolean;
    err: any;
    success: boolean | null;
    actions: {
        remove: (id: string, token: string) => Promise<void>; 
    }
}

const usePlaceDeleter = create<PlaceDeleterState>((set) => ({
    isLoading: false,
    err: null,
    success: null,
    actions: {
        remove: async (id, token) => {
            set({ isLoading: true });
            try {
                await api.delete(`places/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                set({
                    success: true
                });
            } catch(err) {
                set({ err });
            } finally {
                set({ isLoading: false });
            }
        }
    }
}));

export default usePlaceDeleter;