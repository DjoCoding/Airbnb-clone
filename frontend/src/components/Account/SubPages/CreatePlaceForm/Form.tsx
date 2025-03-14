import useCreatePlaceForm from "../../../../hooks/place/useCreatePlaceForm"

export default function Form() {
    const { controller: { forms, current } } = useCreatePlaceForm();
    return(
        <div className="flex grow px-2">
            { forms[current] }
        </div>
    )
}