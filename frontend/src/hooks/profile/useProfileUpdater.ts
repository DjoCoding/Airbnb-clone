import { create } from "zustand"
import api from "../../config/api";
import useAuth from "../auth/useAuth";

interface ProfileUpdaterState {
    err: any;
    isLoading: boolean;
    updateField: (field: string, value: string, token: string) => Promise<void>;
    clearError: () => void;
}

const useProfileUpdater = create<ProfileUpdaterState>((set) => ({
    isLoading: false,
    err: null,
    
    clearError: () => {
        set({ err: null });
    },

    updateField: async (field, value, token) => {
        set({ isLoading: true });

        try {
            const body =  { [field]: value };
            const res = await api.patch("/users", body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { user } = res.data.data;
            useAuth.setState({
                user
            })
        } catch(err) {
            set({ err });
        } finally {
            set({ isLoading: false });
        }
    }
}))

export default useProfileUpdater;