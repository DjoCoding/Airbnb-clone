import { Link } from "react-router-dom";

interface NavProps {
    subpage?: string;
}

export default function Nav({ subpage }: NavProps) {
    return(
        <div className="py-3 flex items-center justify-center gap-8">
            <Link to="/account/profile" className={`flex gap-1 items-center justify-center rounded-2xl px-2 py-2  ${(!subpage || subpage === "profile") ? ("text-white bg-[var(--red)]") : ("bg-gray-300 text-black")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p>Profile</p>
            </Link>
            <Link to="/account/places" className={`flex gap-1 items-center justify-center rounded-2xl px-2 py-2 ${(subpage === "places") ? ("text-white bg-[var(--red)]") : ("bg-gray-300 text-black")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p>Places</p>
            </Link>
            <Link to="/account/bookings" className={`flex gap-1 items-center justify-center rounded-2xl px-2 py-2 ${(subpage === "bookings") ? ("text-white bg-[var(--red)]") : ("bg-gray-300 text-black")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p>Bookings</p>
            </Link>
        </div>
    )
}