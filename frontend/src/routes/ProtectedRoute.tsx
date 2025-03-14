import { Navigate } from "react-router-dom"
import useAuth from "../hooks/auth/useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { actions: { fetchUser }, isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        if(isLoggedIn) { return; }
        fetchUser();
    })

    if(isLoading || isLoggedIn === null) {
        return <Loading />
    }

    if(isLoggedIn) {
        return (
            <>
                { children }
            </>
        )
    }

    return <Navigate to="/login" />
}