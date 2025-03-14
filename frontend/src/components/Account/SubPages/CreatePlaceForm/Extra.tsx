import useCreatePlaceForm from "../../../../hooks/place/useCreatePlaceForm";
import React from "react";

function PriceInput() {
    const { data: { price }, actions: { setDataField } } = useCreatePlaceForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numberValue = parseInt(value);
        if(numberValue < 0) { return; }
        setDataField("price", numberValue);
    }

    return(
        <div>
            <label htmlFor="price" className="w-full text-3xl capitalize font-black text-gray-700">price</label>
            <div className="px-2 py-2 flex justify-center items-center gap-2">
                <input onChange={handleChange} value={price.toString()} id="price" type="number" placeholder="100" className="text-xl"/>
            </div>
        </div>
    )
}

function Availability() {
    const { data: { availability }, actions: { setDataField } } = useCreatePlaceForm();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const date = new Date(value);
        setDataField(
            "availability", {
            ...availability,
            [name]: date
        });
    }

    
    return(
        <div>
            <label className="text-3xl capitalize font-black text-gray-700">Availability</label>
            <div className="px-2 py-2 flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="from" className="text-xl font-black text-gray-700">from</label>
                    <input name="from" onChange={handleChange} value={availability.from.toISOString().split("T")[0]} id="from" type="date" className="px-2 text-xl" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="to" className="text-xl font-black text-gray-700">to</label>
                    <input name="to" onChange={handleChange} value={availability.to.toISOString().split("T")[0]} id="to" type="date" className="px-2 text-xl"/>
                </div>
            </div>
        </div>
    )
}

function NumberOfGuests() {
    const { data: { numberOfGuests }, actions: { setDataField } } = useCreatePlaceForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numberValue = parseInt(value);
        if(numberValue < 0) { return; }
        setDataField("numberOfGuests", numberValue);
    }

    return(
        <div className="flex flex-col gap-4">
            <label htmlFor="numberOfGuests" className="w-full text-3xl capitalize font-black text-gray-700">Nmuber of guests</label>
            <div className="px-2 py-2 flex justify-center items-center">
                <input onChange={handleChange} value={numberOfGuests.toString()} id="numberOfGuests" type="number" placeholder="100" className="text-xl"/>
            </div>
        </div>
    )
}

function Title() {
    const { data: { title }, actions: { setDataField } } = useCreatePlaceForm();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDataField("title", value); 
    };

    return(
        <div>
            <label htmlFor="title" className="w-full text-3xl capitalize font-black text-gray-700">title</label>
            <div className="px-2 py-2 flex justify-center items-center gap-2">
                <input onChange={handleChange} value={title} id="title" type="text" className="text-xl primary"/>
            </div>
        </div>
    )
}




export default function Extra() {
    return(
        <div className="py-2 px-10 grow flex flex-col justify-around gap-5">
            <h1 className="py-2 text-4xl font-bold text-gray-500">More information</h1>
            <div className="grow flex flex-col justify-around gap-4">
                <Title />
                <PriceInput />
                <Availability />
                <NumberOfGuests />
            </div>
        </div>
    )
}