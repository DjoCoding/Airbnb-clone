import City from "./City";
import Description from "./Description";


export default function CityAndDescription() {
    return(
        <div className="px-10 py-5 grow flex flex-col gap-3">
            <City />
            <Description />
        </div>
    )
}