import { motion } from "framer-motion"
import { IPlace } from "../../../types";
import AddPlaceButton from "./Places/AddPlaceButton";
import Place from "./Places/Place";
import usePlaceFetcher from "../../../hooks/place/usePlaceFetcher";
import useAuth from "../../../hooks/auth/useAuth";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import usePlaceDeleter from "../../../hooks/place/usePlaceDeleter";
import CreatePlaceForm from "./CreatePlaceForm";

const containerVariants = {
    hidden: {
        opacity: 1,
    }, 
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Places() {
    const { user: { id: userID }, token } = useAuth();
    const [formOpened, setFormOpened] = useState<boolean>(false);
    
    const [places, setPlaces] = useState<IPlace[]>([]); 
    
    const { isLoading: isFetching, err: fetchErr, places: fetchedPlaces, actions: { fetchPlacesOfUser } } = usePlaceFetcher();
    const { isLoading: isDeleting, err: deleteErr, actions: { remove } } = usePlaceDeleter();
  
    useEffect(() => {
      fetchPlacesOfUser(userID);
    }, []);

    useEffect(() => {
        if(fetchedPlaces.length == 0) { return; }
        setPlaces(fetchedPlaces);
    }, [fetchedPlaces]);
  
    useEffect(() => {
        if(fetchErr) return console.log(fetchErr);
        if(deleteErr) return console.log(deleteErr);
    }, [fetchErr, deleteErr]);

    const handleDelete = async (id: string) => {
        try {
            await remove(id, token);
            const newPlaces = places.filter(place => place.id !== id);
            setPlaces(newPlaces);
        } catch(err) {
            return;
        }
    }


    const handleClick = () => {
        setFormOpened(true);
    }

    const closeForm = () => {
        setFormOpened(false);
    }

    if(isFetching || isDeleting) {
        return(
            <Loading />
        )
    }

  
    return(
        <div className={`px-2 py-2 flex flex-col justify-between items-center gap-10`}>
            {
                formOpened
                &&
                <div className="fixed inset-0 h-full w-full bg-black/50 z-99">
                    <CreatePlaceForm closeForm={closeForm} />
                </div>
            }
            <div className="flex">
                {
                    places.length > 0
                    &&
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid max-lg:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 gap-x-5 gap-y-10 overflow-y-auto px-5 py-5 rounded"
                    >
                        {
                            
                            places.map((place) => {
                                return(
                                    <Place key={place.id} place={place} onDelete={handleDelete} />
                                )
                            })
                        }
                    </motion.div>
                }
                {
                    places.length == 0
                    &&
                    <div className="flex items-center justify-center flex-col gap-5">
                        <p className="font-[550] font[Arial] text-gray-600 text-7xl flex items-center justify-center">
                            Add a place
                        </p>
                        <p className="font-[550] font[Arial] text-gray-600 text-7xl flex items-center justify-center">
                            and 
                        </p>
                        <p className="font-[550] font[Arial] text-gray-600 text-7xl flex items-center justify-center">
                            let people host it.
                        </p>
                    </div>
                }
            </div>
            <div className="container flex justify-end items-center">
                <AddPlaceButton onClick={handleClick}/>
            </div>
        </div>
    )
}