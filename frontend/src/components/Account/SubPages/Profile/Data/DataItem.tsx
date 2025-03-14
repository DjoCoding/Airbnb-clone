import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useProfileUpdater from "../../../../../hooks/profile/useProfileUpdater";
import { z } from "zod";
import toast from "react-hot-toast";
import useAuth from "../../../../../hooks/auth/useAuth";
import AccountProfileSkeleton from "../DataSkeleton";

interface DataProps {
    name: "first name" | "last name" | "email" | "user since";
    field?: "firstname" | "lastname" | "email";
    value: string;
    isEditable: boolean;
}

function validate(field: string, value: string) {
    switch(field) {
        case "email":
            return z.string().email().safeParse(value);
        default:
            return z.string().min(3).max(20).safeParse(value);
    }
}

function validateInput(field: string, value: string, setValidationError: React.Dispatch<React.SetStateAction<string | null>>) {
    const result = validate(field, value);
    if(!result.success) {
        setValidationError(`Invalid value`)
        return null;
    }
    return result.data;
}

export default function DataItem({ name, field, value, isEditable }: DataProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [data, setData] = useState<string>(value);
    const [validationError, setValidationError] = useState<string | null>(null);
    const { updateField, isLoading, err, clearError } = useProfileUpdater();
    const { token } = useAuth();


    useEffect(() => {
        if(!err) { return; }
        console.log(err);
        toast.error(err.message);
        clearError();
    }, [err]);

    const toggleEdit = () => {
        if (edit) setData(value);
        setEdit(!edit);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationError(null);
        setData(e.target.value);
    };

    const handleSave = async () => {
        if (data === "") {
            setEdit(false);
            return setData(value);
        }
        
        if(data === value) {
            return setEdit(false); 
        }

        const v = validateInput(field as string, data, setValidationError);
        if(!v) { return; }

        setEdit(false);
        await updateField(field as string, v, token);
    };

    if(isLoading) {
        return <AccountProfileSkeleton />
    }

    return (
        <motion.div
            className="border-b border-b-gray-200 py-3 overflow-hidden"
            initial={{ height: "auto" }}
            animate={{ height: edit ? "auto" : "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="flex justify-between">
                <h2 className="capitalize font-semibold text-xl text-gray-700">{name}</h2>
                {isEditable && (
                    <button
                        type="button"
                        className="cursor-pointer underline"
                        onClick={toggleEdit}
                    >
                        {edit ? "Cancel" : "Edit"}
                    </button>
                )}
            </div>

            {!edit ? (
                <motion.p
                    className="text-gray-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {data}
                </motion.p>
            ) : (
                <motion.div
                    className="flex justify-center py-4 mt-2 items-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex flex-col gap-4">
                       <div>
                            <motion.input
                                type="text"
                                value={data}
                                onChange={handleChange}
                                className="border-2 border-gray-500 rounded-xl py-2 px-4 text-black text-xl w-fit"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                            <p className="text-red-400 text-sm">{validationError}</p>
                        </div> 
                        <button
                            type="button"
                            className="bg-gray-800 hover:bg-black hover:scale-105 focus:bg-black duration-100 transition text-white w-fit py-2 px-4 rounded text-xl cursor-pointer"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
