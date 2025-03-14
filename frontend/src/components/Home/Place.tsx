import { Link } from "react-router-dom";
import { months } from "../../constants";
import { IPlace } from "../../types";

interface PlaceProps {
    place: IPlace;
}

function formatDate(date: string) {
    return date.split("T")[0].split("-").filter((_, index) => index !== 0).join("-");
}

function formatDates(a: string, b: string) {
    const monthOfA = parseInt(a.split("-")[0]);
    const monthOfB = parseInt(b.split("-")[0]);
    
    const dayOfA = parseInt(a.split("-")[1]);
    const dayOfB = parseInt(b.split("-")[1]);


    if(monthOfA === monthOfB) { return `${months[monthOfA - 1]} ${dayOfA} - ${dayOfB}`}
    return `${months[monthOfA - 1]} ${dayOfA} - ${months[monthOfB - 1]} ${dayOfB}`;
}


export default function Place({ place }: PlaceProps) {
    const from = formatDate(place.from);
    const to = formatDate(place.to);

    return (
        <div className="px-2 flex flex-col gap-2 w-[277px] cursor-pointer rounded-2xl transition duration-300 hover:scale-105">
            <Link to={`/places/${place.id}`}>
                <div className="flex flex-col gap-1">
                    <img src={place.pictures[0]} alt="picture place" className="border border-gray-200 h-[264px] object-cover rounded-2xl w-full aspect-video" />
                    <div>
                        <p className="text-sm font-[sans-serif] font-semibold">{ place.city }</p>
                        <p className="text-sm font-[sans-serif] font-normal text-gray-600">{ formatDates(from, to) }</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-[sans-serif] font-medium">
                        {
                            place.price
                        }$ Night
                    </p>
                </div>
            </Link>
        </div>
    )
}