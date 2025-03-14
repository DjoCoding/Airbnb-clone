import { create } from "zustand"
import { IUser } from "../../types";
import api from "../../config/api";

type UserState = {
    fetchedUser: IUser | null;

    isLoading: boolean;
    err: any;

    actions: {
        fetchUser: (id: string) => Promise<void>;
    }
}


const useUserFetcher = create<UserState>((set, get) => ({
    fetchedUser: null,

    isLoading: false,
    err: null,

    actions: {
        fetchUser: async(id: string) => {
            set({
                isLoading: true
            });


            try {
                const res = await api.get(`/users/${id}/profile`);
                const { user } = res.data.data;
                set({
                    fetchedUser: user
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
        }
    }
}))

export default useUserFetcher;