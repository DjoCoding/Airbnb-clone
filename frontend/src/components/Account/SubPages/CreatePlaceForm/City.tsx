import AsyncSelect from "react-select/async"
import useCreatePlaceForm from "../../../../hooks/place/useCreatePlaceForm";

export default function City() {
    const { data: { city }, errors, actions: { setDataField } } = useCreatePlaceForm();

    const fetchCities = async (value: string) => {
        if(!value) { return []; }
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit10`
        )
        const data = await res.json();
        return data.map((city: any) => ({
            label: `${city.display_name}`,
            value: city.display_name
        }));
    }


    const handleChange = (value: any) => {
        setDataField("city", value.value);
    }

    return(
        <div className="gap-6 flex flex-col py-2 px-2">
            <h1 className="py-2 text-4xl font-bold text-gray-500">Choose city name</h1>
            <div className="mx-auto w-full max-w-[600px]">
                <AsyncSelect 
                    cacheOptions
                    loadOptions={fetchCities}
                    defaultOptions
                    onChange={handleChange}
                    placeholder="Type a city name..."
                    id="city"
                    value={{
                        label: city,
                        value: city
                    }}
                    defaultValue={{
                        label: "New york city",
                        value: "New york city"
                    }}
                />
                {
                    errors.city 
                    &&
                    <p className="text-lg text-red-500">{ errors.city }</p>
                }
            </div>
        </div>
    )
}