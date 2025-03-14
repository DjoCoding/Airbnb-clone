import {z} from "zod"
import { LoginFormSchema, RegisterFormSchema, CreatePlaceFormSchema } from "./schemas"


export type TLoginForm = z.infer<typeof LoginFormSchema>;
export type TLoginFormError = Partial<TLoginForm>;

export type TRegisterForm = z.infer<typeof RegisterFormSchema>;
export type TRegisterFormError = Partial<TRegisterForm>;

export type CreateNewPlaceFormData = z.infer<typeof CreatePlaceFormSchema>;

export interface IPlace {
    id: string;
    ownerID: string;
    title: string;
    city: string;
    description: string;
    pictures: string[];
    price: number;
    from: string;
    to: string;
    numberOfGuests : number;
    createdAt: Date;
}

export interface IUser {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: string;
}