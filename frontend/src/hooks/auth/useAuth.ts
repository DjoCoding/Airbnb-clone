import { create } from "zustand";
import { IUser, TLoginForm } from "../../types";
import api from "../../config/api";

interface LoginResponse {
    data: {
        user: IUser;
        token: string;
    },
    status: string;
}

type AuthState = {
    user: IUser;
    token: string;
    isLoading: boolean;
    isLoggedIn: boolean | null;
    err: any;
    actions: {
        fetchUser(): Promise<void>;
        login(data: TLoginForm): Promise<void>;
        logout(): void;
    }
}


const useAuth = create<AuthState>((set, get) => ({
    user: {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        createdAt: ""
    },
    token: "",
    isLoading: false,
    isLoggedIn: null,
    err: null,

    actions: {
        fetchUser: async() => {
            if(get().isLoggedIn) { return; }
            
            const token = localStorage.getItem("booker-token");
            if(!token) { return; }
            
            const userAsString = localStorage.getItem("booker-user");
            if(!userAsString) {
               return; 
            }

            const user = JSON.parse(userAsString);
            if(!user) { return; }
            
            set({
                user,
                token,
                isLoggedIn: true
            });
        },

        login: async (data) => {
            set({ isLoading: true });

            try {
                const res = await api.post<LoginResponse>("/auth/login", data);
                console.log(res);
                const { token, user } = res.data.data;
                set({
                    token,
                    user,
                    isLoggedIn: true
                });
                localStorage.setItem("booker-user", JSON.stringify(user));
                localStorage.setItem("booker-token", token);
            } catch(err) {
                set({
                    err
                });
            } finally {
                set({ isLoading: false });
            }
        },

        logout: () => {
            localStorage.removeItem("booker-token");
            set({
                isLoggedIn: false,
                token: "",
                user: {
                    id: "",
                    email: "",
                    firstname: "",
                    lastname: "",
                    createdAt: ""
                }
            });
        }
    }
}))

export default useAuth;