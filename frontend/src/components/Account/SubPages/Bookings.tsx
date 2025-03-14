import { useEffect, useState } from "react"
import { IPlace } from "../../../types"
import { motion } from "framer-motion"
import useBookingFetcher from "../../../hooks/reservation/useBookingsFetcher";
import toast from "react-hot-toast";
import Loading from "../../Loading";
import { useFetcher } from "react-router-dom";

const containerVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
};

export default function Bookings() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { 
        places,
        error,
        isLoading,
        actions: { fetchBookings }
    } = useBookingFetcher()

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        if(!error) { return; }
        console.log(error);
        toast.error("error");
    }, [error]);
    

    if(isLoading) {
        return <Loading />
    }


    return(
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
        >
            {
                places.map(place => {
                    return(
                        <motion.div
                            className="cursor-pointer bg-white rounded-xl flex flex-col justify-center gap-4 hover:scale-101 h-full transition duration-300"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            variants={containerVariants}
                        >
                            <div className="shadow-lg shadow-gray-600 rounded-xl flex flex-col justify-between">
                                <div>
                                    <img
                                        className="rounded-xl w-full rounded-b-sm aspect-video"
                                        src={place.pictures[0]}
                                        alt="place main picture"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="px-2 pb-2 flex flex-col py-2">
                                <div>
                                    <p className="text-lg font-[500]">{place.title}</p>
                                    <div
                                    className="text-sm font-[400]"
                                    >
                                        <p className={`${!isHovered && "truncate"} text-gray-500`}>
                                        { place.description }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
                })
            }
        </motion.div>
    )
}