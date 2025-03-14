import { create } from "zustand";
import { CreateNewPlaceFormData } from "../../types";
import { CityAndDescriptionFormSchema, CreatePlaceFormSchema, ExtraFormSchema, PicturesFormSchema } from "../../schemas";
import { ZodError } from "zod";
import api from "../../config/api";

export type CreatePlaceFormErrors = Partial<Record<keyof CreateNewPlaceFormData, string>>;

function getDate(days: number) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

type CreatePlaceFormState = {
    controller: {
        isLoading: boolean;
        forms: React.ReactNode[];
        current: number;
        values: string[];
    }

    data: CreateNewPlaceFormData,

    errors: CreatePlaceFormErrors,
    success: boolean | null;
    error: any;

    actions: {
        next: () => void;
        back: () => void;
        setDataField: (field: string, value: any) => void;
        setControllerField: (field: string, value: any) => void;
        validateStep: () => boolean;
        uploadPicture: (pic: File) => void;
        submit: () => Promise<void>;
        reset: () => void;
    }

    state: {
        hasNext: () => boolean;
        hasBack: () => boolean;
        canSubmit: () => boolean;
    }
}

const useCreatePlaceForm = create<CreatePlaceFormState>((set, get) => ({
    controller: {
        isLoading: false,
        forms: [],
        values: [],
        current: 0,
    },


    data: {
        title: "",
        city: "",
        description: "",
        pictures: [],
        price: 1,
        availability: {
            from: getDate(0), 
            to: getDate(3)
        },
        numberOfGuests: 1
    },

    errors: {},
    success: null,
    error: null,

    actions: {
        validateStep: () => {
            let schema = null;
            let data = null;

            switch(get().controller.current) {
                case 0:
                    schema = CityAndDescriptionFormSchema;
                    data = {
                        city: get().data.city,
                        description: get().data.description
                    };
                    break;
                case 1:
                    schema = PicturesFormSchema;
                    data = {
                        pictures: get().data.pictures
                    };
                    break;
                case 2: 
                    schema = ExtraFormSchema;
                    data = { 
                        title: get().data.title,
                        price: get().data.price,
                        availability: get().data.availability,
                        numberOfGuests: get().data.numberOfGuests
                    };
                    break;
            }

            if(!schema) { throw new Error("invalid current step"); }

            const result = schema.safeParse(data);
            if(result.success) { return true; }

            const { error } = result;

            const err = error.errors[0];

            const field = err.path[0] as keyof CreatePlaceFormErrors;
            const message = err.message;


            set({
                errors: {
                    ...get().errors,
                    [field]: message
                }
            });
            
            return false;
        },
        next: () => {
            if(!get().actions.validateStep()) { return; }

            if(get().state.hasNext()) { 
                set({
                    controller: {
                        ...get().controller,
                        current: get().controller.current + 1
                    }
                });
            }
        },
        back: () => {
            if(!get().actions.validateStep()) { return; }

            if(get().state.hasBack()) {
                set({
                    controller: {
                        ...get().controller,
                        current: get().controller.current - 1
                    }
                });
            }
        },
        setDataField: (field: string, value: any) => {
            set({
                data: {
                    ...get().data,
                    [field]: value
                }, 
                errors: {
                    [field]: ""
                }
            });
        },
        setControllerField: (field: string, value: any) => {
            set({
                controller: {
                    ...get().controller,
                    [field]: value
                }
            });
        },
        uploadPicture: (pic: File) => {
            const pictures = get().data.pictures;
            
            for(const picture of pictures) {
                if(pic.name == picture.name) return; 
            }

            set({
                data: {
                    ...get().data,
                    pictures: [
                        ...get().data.pictures,
                        pic
                   ]
                },
                errors: {
                    pictures: ""
                }
            })
        },
        submit: async () => {
            set({
                success: null,
                error: null
            });

            const handleError = (err: ZodError) => {
                const { errors } = err;
            
                const field = (errors[0].path as unknown) as keyof CreatePlaceFormErrors;
                const message = errors[0].message;
                
                set({
                    errors: {
                        ...get().errors,
                        [field]: message
                    }
                });
            };
            
            const save = async() => {
                set({
                    controller: {
                        ...get().controller,
                        isLoading: true
                    }
                });

                const formData = new FormData();
                const data = get().data;
                const { title, city, description, price, availability, numberOfGuests } = data;

                formData.append("title", title);
                formData.append("city", city);
                formData.append("description", description as string);
                formData.append("price", price.toString());
                formData.append("from", availability.from.toString());
                formData.append("to", availability.to.toString());
                formData.append("numberOfGuests", numberOfGuests.toString());

                for(const pic of data.pictures) {
                    formData.append("files", pic);
                }

                try {
                    await api.post("/places", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    
                    set({
                        success: true
                    });
                } catch(err) {
                    set({
                        error: err
                    });
                } finally {
                    set({
                        controller: {
                            ...get().controller,
                            isLoading: false,
                        }
                    })
                }
            }
            
            const data = get().data;
            const validationResult = CreatePlaceFormSchema.safeParse(data);
            if(!validationResult.success) {
                return handleError(validationResult.error);
            }

            await save();
        },
        reset: () => {
            set({
                controller: {
                    isLoading: false,
                    forms: [],
                    values: [],
                    current: 0,
                },
            
            
                data: {
                    title: "",
                    city: "",
                    description: "",
                    pictures: [],
                    price: 1,
                    availability: {
                        from: getDate(0), 
                        to: getDate(3)
                    },
                    numberOfGuests: 1
                }
            })
        },
    },

    state: {
        hasNext: () => {
            return get().controller.current < get().controller.forms.length - 1;
        },
        hasBack: () => {
            return get().controller.current > 0;
        },
        canSubmit: () => {
            return get().controller.current == get().controller.forms.length - 1;
        }
    }
}))

export default useCreatePlaceForm;