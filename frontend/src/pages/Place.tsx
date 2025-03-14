import { useParams } from "react-router-dom"
import usePlaceFetcher from "../hooks/place/usePlaceFetcher";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import useUserFetcher from "../hooks/user/useUserFetcher";
import { formatDate, getDay, getDifferenceInDays, getMonthAsNumberString, getYear } from "../helpers/date";
import { IPlace, IUser } from "../types";
import usePage from "../hooks/page/usePage";
import useReserver from "../hooks/reservation/useReserver";
import useAuth from "../hooks/auth/useAuth";

export default function Place() {
    const { id } = useParams();
    
    const { actions: { fetchPlace }, err: placeFetchingError, place, isLoading: placeLoading } = usePlaceFetcher();
    const { fetchedUser, err: userFetchingError, isLoading: userLoading, actions: { fetchUser } } = useUserFetcher();
    const { actions: { setPlace } } = usePage();   

    let from: Date | null = null;
    let to: Date | null = null;

    useEffect(() => {
        fetchPlace(id as string);
        return () => {
            setPlace(null);
        }
    }, []);

    useEffect(() => {
        if(!place) { return; }
        setPlace(place);
        fetchUser(place.ownerID);
    }, [place]);

    useEffect(() => {
        if(!placeFetchingError) { return; }
        toast.error("failed to fetch the place");
    }, [placeFetchingError]);

    useEffect(() => {
        if(!userFetchingError) { return; }
        toast.error("failed to fetch the hosting user");
    }, [userFetchingError]);

    if(placeLoading || userLoading || !place || !fetchedUser) {
        return <Loading />
    }

    from = new Date(place.from);
    to = new Date(place.to);

    return(
        <div className="p-4 mx-auto w-full xl:w-[1200px] grow flex flex-col gap-3">
            <Header title={place.title} />
            <Pictures pictures={place.pictures} />
            <Content user={fetchedUser} place={place} from={from} to={to} />
        </div>
    )
}

interface ContentProps {
    user: IUser;
    from: Date;
    to: Date;
    place: IPlace;
}

function Content({ user, place, from, to }: ContentProps) {
    return(
        <div className="grid grid-cols-[5fr_3fr] gap-x-4">
            <AboutPlace place={place} user={user} from={from} to={to} />
            <ReservationCard place={place} from={from} to={to} />
        </div>
    )
}

interface HeaderProps {
    title: string;
}

function Header({ title }: HeaderProps) {
    return(
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-medium text-gray-700">
                { title }
            </h1>
        </div>
    )
}


interface PicturesProps {
    pictures: string[];
}

function Pictures({ pictures }: PicturesProps) {
    return(
        <div className="flex gap-2">
            <div className="flex-1 h-[500px]">
                <img className="w-full object-cover rounded-l-xl aspect-square" src={pictures[0]} alt="main place picture"/>
            </div>
            <RightPictures pictures={pictures} />
        </div>
    )
}


function RightPictures({ pictures }: { pictures: string[] }) {
    if(pictures.length <= 3) {
        return(
            <div className="flex-1">
                <img src={pictures[1]} alt="" className="aspect-square w-full object-cover rounded-r-xl"/>
            </div>
        )
    }

    if(pictures.length === 4) {
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2">
            <img src={pictures[1]} alt="" className="aspect-square w-full object-cover"/>
            <img src={pictures[2]} alt="" className="aspect-square w-full object-cover rounded-r-xl"/>
        </div>
    }

    return(
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2">
            <img src={pictures[1]} alt="" className="aspect-square w-full object-cover"/>
            <img src={pictures[2]} alt="" className="aspect-square w-full object-cover rounded-tr-xl"/>
            <img src={pictures[3]} alt="" className="aspect-square w-full object-cover"/>
            <img src={pictures[4]} alt="" className="aspect-square w-full object-cover rounded-bt-xl"/>
        </div>
    )
}

interface AboutPlaceProps {
    place: IPlace;
    user: IUser;
    from: Date;
    to: Date;
}

function AboutPlace({ place, user, from, to }: AboutPlaceProps) {
    return(
        <div className="flex flex-col py-2">
            <div className="py-5 flex flex-col gap-2 w-full border-b-2 border-b-gray-200">
                <p className="text-3xl font-medium text-gray-700">{ place.city }</p>
                <p className="text-lg font-normal text-gray-700">{ place.numberOfGuests } guests</p>
            </div>
            <div className="flex gap-3 py-5 border-b-2 border-b-gray-200">
                <div className="size-15">
                    <img className="rounded-[50%] w-full h-full object-cover" src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <p className="text-sm">Hosted by {user.firstname} {user.lastname}</p>
                    <p className="text-sm opacity-50">Super Hosting</p>
                </div>
            </div>
            <div className="py-5 w-full border-b-2 border-b-gray-200">
                <p className="text-lg opacity-60 font-normal">
                    { place.description }
                </p>
            </div>
            <div className="py-5 w-full border-b-2 border-b-gray-200">
                <p className="text-2xl font-medium opacity-70">{ getDifferenceInDays(to, from) } nights in { place.city } </p>
                <p className="opacity-50">{ formatDate(from) } - { formatDate(to) }</p>
            </div>
        </div>
    )
}

interface ReservationCardProps {
    place: IPlace;
    from: Date;
    to: Date;
}

function ReservationCard({ place, from, to }: ReservationCardProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const { success, err, isLoading, actions: { reserve } } = useReserver();
    const { user: { id: userID } } = useAuth(); 

    useEffect(() => {
        if(!success) { return; }
        toast.success("place reservation made successfully");
    }, [success]);

    useEffect(() => {
        if(!err) { return; }
        toast.error("failed to reserve the place");
    }, [err]); 


    const handleReservationClick = async () => {
        await reserve(place.id);
        return setIsClicked(false);
    };

    if(isLoading) {
        return <Loading />
    }
    
    return(
        <div className="relative">
            <div className="py-4 px-4 mt-20 sticky top-0 left-0 w-full border border-gray-200 rounded-xl shadow shadow-gray-400 flex flex-col gap-4">
                <div className="py-3 flex items-center gap-2">
                    <p className="text-3xl font-medium">${ place.price }</p>
                    <p className="text-xl opacity-90">night</p>
                </div>
                <div className="py-2 px-2 border border-gray-200 rounded-xl flex justify-center items-center gap-4">
                    <div className="flex flex-col grow gap-2">
                        <div className="flex border-b border-b-gray-200">
                            <div className="flex-1 py-1 pl-2 flex flex-col">
                                <p className="uppercase text-sm font-semibold">check-in</p>
                                <p>{getMonthAsNumberString(from)}/{getDay(from)}/{getYear(from)}</p>
                            </div>
                            <div className="flex-1 py-1 pl-2 flex flex-col border-l border-l-gray-200">
                                <p className="uppercase text-sm font-semibold">check-out</p>
                                <p>{getMonthAsNumberString(to)}/{getDay(to)}/{getYear(to)}</p>
                            </div>
                        </div>
                        <div className="pl-2 py-1">
                            <p className="uppercase text-sm font-semibold">guests</p>
                            <p className="opacity-70">{ place.numberOfGuests } guest{ place.numberOfGuests > 1 && "s" }</p>
                        </div>
                    </div>
                </div>
                {
                    place.ownerID !== userID
                    &&
                    <div className="py-2 px-2 flex items-center justify-center w-full">
                        <button onClick={() => setIsClicked(true)} className="primary capitalize text-xl w-full font-medium" type="button">reserve</button>
                    </div>
                }
            </div>
            {
                isClicked
                &&
                <div className="fixed inset-0 bg-black/50 z-1000 flex items-center justify-center">
                    <div className="flex flex-col justify-between bg-white p-5 rounded-xl gap-10">
                        <p className="text-xl mr-4">Are you sure you want to make a reservation?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsClicked(false)} className="bg-gray-500 capitalize px-2 py-2 rounded-xl text-xl text-white">cancel</button>
                            <button onClick={handleReservationClick} className="primary capitalize w-fit">reserve</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
