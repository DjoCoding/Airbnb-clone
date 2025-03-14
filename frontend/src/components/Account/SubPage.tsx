import NotFound from "../NotFound";
import Bookings from "./SubPages/Bookings";
import Places from "./SubPages/Places";
import Profile from "./SubPages/Profile";

interface SubPage {
    subpage?: string;
}

export default function SubPage({ subpage }: SubPage) {
    if(!subpage) return <Profile />
    if(subpage === "profile") return <Profile />
    if(subpage == "places") return <Places />
    if(subpage == "bookings") return <Bookings />
    return <NotFound />
}