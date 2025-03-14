import {z} from "zod"

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password length should be above 8")
});

export const RegisterFormSchema = z.object({
    firstname: z.string().min(3, "firstname length should be above 3").max(20, "firstname length should be below 20"),
    lastname: z.string().min(3, "lastname length should be above 3").max(20, "lastname length should be below 20"),
    email: z.string().email(),
    password: z.string().min(8, "password length should be above 8")
});

export const ExtraFormSchema = z.object({
    title: z.string().nonempty("Place title is required"),
    price: z.number().positive("Place price should be positive"),
    availability: z.object({
        from: z.date(),
        to: z.date(),
    }),
    numberOfGuests: z.number().positive()
});

export const CityAndDescriptionFormSchema = z.object({
    city: z.string().nonempty("City name is required"),
    description: z.string().optional()
})


const PictureSchema = z.instanceof(File);
export const PicturesFormSchema = z.object({
    pictures: z.array(PictureSchema)
});

export const CreatePlaceFormSchema = CityAndDescriptionFormSchema.merge(
    ExtraFormSchema.merge(PicturesFormSchema)
);