import Header from "../components/Header"
import { Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <div className="min-h-screen overflow-x-hidden px-4 py-3 flex flex-col h-screen">
            <Header />
            <Outlet />
        </div>
    )
}