import useCreatePlaceForm from "../../../../hooks/place/useCreatePlaceForm"

export default function Description() {
    const { data: { description }, errors, actions: { setDataField } } = useCreatePlaceForm();
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setDataField("description", value);
    }

    return(
        <div className="gap-6 flex flex-col py-2 px-2 grow">
            <h1 className="py-2 text-4xl font-bold text-gray-500">Describe the place</h1>
            <textarea onChange={handleChange} value={description} className="outline-0 px-2 py-2 text-xl text-gray-700 border w-full h-full rounded-xl border-gray-300"/>
            {
                errors.description &&
                <p className="text-lg text-red-500">{ errors.description }</p>
            }
        </div>
    )
}