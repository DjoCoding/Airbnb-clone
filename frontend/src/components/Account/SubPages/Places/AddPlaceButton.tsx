interface AddPlaceButtonProps {
    onClick: () => void;
}

export default function AddPlaceButton({ onClick }: AddPlaceButtonProps) {     
    return(
        <button onClick={onClick} type="button" className="border px-4 py-2 rounded-xl outline-0 border-gray-300 text-white bg-[var(--red)] text-xl hover:scale-105 focus:scale-95 transition duration-300 cursor-pointer">
            Add place
        </button>
    )
}