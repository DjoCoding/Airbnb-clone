import { useEffect } from "react";
import useCreatePlaceForm from "../../../hooks/place/useCreatePlaceForm";
import CityAndDescription from "./CreatePlaceForm/CityAndDescription"
import Extra from "./CreatePlaceForm/Extra";
import Form from "./CreatePlaceForm/Form";
import Pictures from "./CreatePlaceForm/Pictures";
import toast from "react-hot-toast";
import { IPlace } from "../../../types";

interface CancelButtonProps {
    onClick: () => void;
}

function CancelButton({ onClick }: CancelButtonProps) {
    return(
        <button onClick={onClick} type="button" className="text-gray-500 hover:text-black cursor-pointer px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    )
}

interface StepProps {
    number: number;
    value: string;
    isCurrent: boolean;
    isDone: boolean;
}

function Step({ isCurrent, number, value, isDone }: StepProps) {
    return(
        <div className={`flex flex-col gap-1 items-center justify-center`}>
            <div className={`${isCurrent ? "bg-[var(--red)]" : "bg-gray-500"} ${isDone && "bg-green-500"} flex items-center justify-center text-lg rounded-[50%] size-8 p-2 text-white`}>
                { number }
            </div>
            <div className={`w-1 h-4 border-l-2 ${isCurrent ? "border-[var(--red)]" : "border-gray-500"}`}></div>
            <p className={`capitalize ${isCurrent ? "text-[var(--red)]" : "text-gray-500"} ${isDone && "text-green-500"}`}>{value}</p>
        </div>
    )
}

function Stepper() {
    const { controller: { values, current } } = useCreatePlaceForm();

    const steps: React.ReactNode[] = [];
    for(let i = 0; i < values.length; ++i) {
        steps.push(
            <Step number={i+1} value={values[i]} isCurrent={current === i} isDone={current > i}/>
        )

        if(i == values.length - 1) continue;
        
        steps.push(
            <div className={`${i < current ? "border-green-500" : "border-gray-500"} w-10 border-t-2`}>
            </div>
        )
    }

    return(
        <div className="px-10 py-2">
            <div className="py-2 flex items-center justify-around">
                {
                    steps
                }
            </div>
        </div>
    )
}

function NextButton() {
    const { actions: { next } } = useCreatePlaceForm();

    return(
        <button className="capitalize px-2 py-2 primary flex items-center justify-center gap-2" type="button" onClick={() => next()}>
            next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
        </button>
    )
}

function BackButton() {
    const { actions: { back } } = useCreatePlaceForm();

    return(
        <button className="capitalize px-2 py-2 primary flex items-center justify-center gap-2" type="button" onClick={() => back()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            back
        </button>
    )
}

function SubmitButton() {
    const { actions: { submit } } = useCreatePlaceForm();

    return(
        <button className="capitalize primary px-4 py-2" type="button" onClick={() => submit()}>
            submit
        </button>
    )
}

function Footer() {
    const { state: { hasNext, hasBack, canSubmit } } = useCreatePlaceForm();

    return(
        <div className="px-5 py-4 flex justify-between items-center">
            { !hasBack() ? <div></div> : <BackButton /> }
            { !hasNext() ? <div></div> : <NextButton /> }
            { canSubmit() && <SubmitButton />}    
        </div>
    )
}

interface CreatePlaceFormProps {
    closeForm: () => void;
}

export default function CreatePlaceForm({ closeForm }: CreatePlaceFormProps) {
    const {
        actions: { setControllerField, reset },
        success, error
    } = useCreatePlaceForm();

    useEffect(() => {
        setControllerField("forms", [<CityAndDescription />, <Pictures />, <Extra />]);
        setControllerField("values", ["city-desc", "pictures", "extra"]);
    }, []);

    useEffect(() => {
        if(!success) { return; }
        toast.success("Place saved successfully");
        closeForm();
    }, [success]);

    useEffect(() => {
        if(!error) { return; }
        toast.error("Failed to save the place");
    }, [error]);

    return(
        <div className="w-full min-h-full xl:w-[1200px] mx-auto px-8 flex py-15 flex-col gap-8 max-sm:mb-20 mb-5">
            <div className="z-999 flex grow w-full flex-col rounded-2xl bg-white shadow-2xl shadow-gray-500">
                <div className="flex justify-end px-5 py-4">
                    <CancelButton onClick={() => { reset(); closeForm() }} />   
                </div>
                <Stepper />
                <Form />
                <Footer />
            </div>
        </div>
    )
}