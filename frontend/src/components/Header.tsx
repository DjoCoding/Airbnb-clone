import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../hooks/auth/useAuth";
import usePage from "../hooks/page/usePage";
import { IPlace } from "../types";
import { formatDate } from "../helpers/date";

export default function Header() {
    const { actions: { logout }, isLoggedIn } = useAuth();
    const { place } = usePage();
    const [opened, setOpened] = useState<boolean>(false);

    const closeMenu = () => {
        setOpened(false);
    }

    const toggleMenu = () => {
        setOpened(!opened);
    }

    const handleLogout = () => {
        closeMenu();
        logout();
    }

    return(
        <div className="w-full">
            <header className="py-4 container mx-auto flex justify-between items-center max-sm:hidden border-b-1 border-gray-300">
                <Logo />
                <PlaceInfo place={place} />
                <div className="px-2 py-2 flex items-center justify-center gap-3">
                    <p className="text-sm tracking-tight">Airbnb your home</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <div className="relative">
                        <div className="flex items-center justify-center gap-2 border rounded-full border-gray-400 px-2 py-1 duration-300 hover:shadow-sm hover:shadow-gray-600">
                            <button type="button" className="cursor-pointer hover:bg-gray-400 p-1 rounded-xl hover:text-white duration-100 transform" onClick={toggleMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <Link to={isLoggedIn ? "/account" : "/login"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 rounded-full bg-gray-400 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>  
                            </Link>
                        </div>  
                            {
                                opened 
                                &&
                                <div className="flex flex-col gap-1 absolute right-0 mt-2 min-w-[250px] z-999 bg-white rounded-xl border-1 border-gray-200 py-2">
                                        {
                                            isLoggedIn
                                            ?
                                            <>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300">
                                                    <Link to="/" className="block font-[arial] font-[550] text-[18px]" onClick={closeMenu}>Explore</Link>
                                                </div>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300">
                                                    <Link to="/" className="block font-[arial] font-[550] text-[18px]" onClick={closeMenu}>Wishlist</Link>
                                                </div>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300">
                                                    <Link to="/" className="block font-[arial] font-[550] text-[18px]" onClick={closeMenu}>Messages</Link>
                                                </div>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300" onClick={handleLogout}>
                                                    <p className="block font-[arial] font-[550] text-[18px]" onClick={handleLogout}>Logout</p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300">
                                                    <Link to="/login" className="block font-[arial] font-[550] text-[18px]" onClick={closeMenu}>Login</Link>
                                                </div>
                                                <div className="text-left cursor-pointer py-2 px-6 hover:bg-gray-300">
                                                    <Link to="/register" className="block font-[arial] font-[550] text-[18px]" onClick={closeMenu}>Sign up</Link>
                                                </div>
                                            </>   
                                        }
                                </div>
                        }       
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    )
}

function Footer() {
    return(
        <footer className="z-999 bg-white px-6 py-1 w-full absolute left-0 bottom-0 flex justify-between items-center sm:hidden">
            <Link to="/" className="flex flex-col gap-1 items-center justify-center text-[var(--red)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <p className="text-[15px] font-[arial]">Explore</p>
            </Link>
            <Link to="/" className="flex flex-col gap-1 items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <p className="text-[15px] font-[arial]">Wishlists</p>
            </Link>
            <Link to="/" className="flex flex-col gap-1 items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5  -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <p className="text-[15px] font-[arial]">Trips</p>
            </Link>
            <Link to="/" className="flex flex-col gap-1 items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <p className="text-[15px] font-[arial]">Messages</p>
            </Link>
            <Link to="/" className="flex flex-col gap-1 items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p className="text-[15px] font-[arial]">Profile</p>
            </Link>
        </footer>
    )
}

function Logo() {
    return(
        <div className="px-2 py-2">
            <Link to="./" className="flex justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90 text-[var(--red)] hover:animate-spin hover:fill-[var(--red)] hover:text-white transition duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span className="text-[var(--red)] font-bold text-xl">Airbnb</span>
            </Link>
        </div>
    )
}

interface PlaceInfoProps {
    place: IPlace | null;
}

const containerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        }
    }
}

function PlaceInfo({ place }: PlaceInfoProps) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const toggle = () => setIsOpened((prev) => !prev);

    const onOpen = (
        <div className="flex flex-col gap-4 bg-white" >
            <div className="flex gap-2 items-center justify-around">
                <p className="capitalize text-lg">stays</p>
                <p className="capitalize text-lg">experiences</p>
            </div>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-3 py-2 gap-2 transition-all border rounded-full flex  max-md:hidden border-gray-400 shadow-gray-300 shadow-md duration-300 hover:shadow-lg">
                <div className="cursor-pointer max-w-[200px] flex items-center">
                    <label className="flex flex-col px-2 py-1 gap-1">
                        <p className="text-sm">Where</p>
                        <input className="font-medium text-sm w-full" type="text" placeholder="Select destination" value=""/>
                    </label>
                </div>
                <div className="border-l border-gray-400"></div>
                <div className="flex">
                    <label className="flex flex-col gap-1 px-2 py-1 justify-center">
                        <p className="text-sm">check-in</p>
                        <input type="date" className="hidden font-medium text-sm w-fit"/>
                        <p className="text-sm opacity-65">Add date</p>
                    </label>
                    <div className="border-l border-gray-400"></div>
                    <label className="flex flex-col gap-1 px-2 py-1 justify-center">
                        <p className="text-sm">check-out</p>
                        <input type="date" className="hidden font-medium text-sm w-fit"/>
                        <p className="text-sm opacity-65">Add date</p>
                    </label>
                </div>
                <div className="border-l border-gray-400"></div>
                <div className="cursor-pointer flex items-center">
                    <label className="flex flex-col px-2 py-1 gap-1">
                        <p className="text-sm">Who</p>
                        <input className="font-medium text-sm" type="number" placeholder="Select guests" value="" />
                    </label>
                </div>
                <button type="button" className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rounded-full p-1 size-6 text-white bg-[var(--red)] ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>    
            </motion.div>
        </div>
    );

    const onClose = (
            <div className="px-3 py-2 gap-2 transition-all border rounded-full flex  max-md:hidden border-gray-400 shadow-gray-300 shadow-md duration-300 hover:shadow-lg">
                <div className="cursor-pointer max-w-[200px] flex items-center">
                    <p className="text-sm truncate">
                        {
                            place !== null ? place.city : "Anywhere"
                        }
                    </p>
                </div>
                <div className="border-l border-gray-400"></div>
                <div className="cursor-pointer flex items-center">
                    <p className="text-sm truncate">
                        {
                            place !== null
                            ?
                            `${formatDate(new Date(place.from))} - ${formatDate(new Date(place.to))}`
                            :
                            "Anyweek"
                        }
                    </p>
                </div>
                <div className="border-l border-gray-400"></div>
                <div className="cursor-pointer flex items-center">
                    <p className="text-sm truncate">
                        {
                            place !== null
                            ?
                            `${place.numberOfGuests} guests`
                            :
                            "Add guests"
                        }
                    </p>
                </div>
                <button type="button" className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rounded-full p-1 size-6 text-white bg-[var(--red)] ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
    )

   return(
        <>
            <div 
                onClick={toggle}
            >
                {
                    isOpened
                    ?
                    onOpen
                    :
                    onClose
               }
            </div>
        </>
   );
}