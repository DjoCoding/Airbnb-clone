import { useParams } from "react-router-dom"
import AccountNav from "../components/Account/Nav";
import AccountSubPage from "../components/Account/SubPage";

export default function Account() {
    const { subpage } = useParams();
    
    return (
        <div className="w-full min-h-full xl:w-[1200px] h-full mx-auto px-8 mt-2 flex flex-col gap-8">
            <AccountNav subpage={subpage} />
            <AccountSubPage subpage={subpage} />
        </div>
    )
}