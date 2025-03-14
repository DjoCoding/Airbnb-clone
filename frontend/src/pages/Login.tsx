import { motion } from "framer-motion"
import {  useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { TLoginForm, TLoginFormError } from "../types"
import Loading from "../components/Loading"
import useAuth from "../hooks/auth/useAuth"
import { LoginFormSchema } from "../schemas"

const containerVariants = {
    hidden: {
        opacity: 0,
        y: -100
    }, 
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
}

const redirectionVariants = {
    hidden: {
        opacity: 0,
    }, 
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: 0.4
        }
    }
}

export default function Login() {
    const { actions: { login }, isLoading, isLoggedIn, err } = useAuth();
    const [formData, setFormData] = useState<TLoginForm>({
        email: "",
        password: ""
    });

    const [error, setError] = useState<TLoginFormError>({
        email: undefined, 
        password: undefined,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    }

    const handleClick = async () => {
        const result = LoginFormSchema.safeParse(formData);
        if(result.success) {
            setError({
                email: undefined, 
                password: undefined
            });
            return await login(formData);
        }

        const errors = result.error.format();

        setError({
            email: errors.email?._errors[0] || undefined,
            password: errors.password?._errors[0]|| undefined 
        });
    }

    if(isLoading) {
        return <Loading />
    }

    if(isLoggedIn) {
        return <Navigate to="/" />
    }

    return(
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grow flex justify-center items-center"
        >
            <div className="flex flex-col w-full justify-center items-center mb-15">
                <h1 className="text-center text-5xl font-bold mb-10">Login</h1>
                <p className="text-red-700 text-xl mb-3">{err && (err?.response?.data?.data?.message || "Internal server error")}</p>
                <form className="flex flex-col gap-3 w-[70%] items-center justify-center">
                    <div>
                        <input onChange={handleChange} value={formData.email} type="email" placeholder="you@gmail.com" required id="email" name="email" className="primary" />
                        <p className="ml-3 text-sm capitalize text-red-700">
                            { error.email  }               
                        </p>
                    </div>

                    <div>
                        <input className="primary" onChange={handleChange} value={formData.password} type="password" placeholder="password" required id="password" name="password" />
                        <p className="ml-3 text-sm capitalize text-red-700">
                            { error.password }               
                        </p>
                    </div>
                    <button onClick={handleClick} type="button" className="primary w-full lg:w-[500px]">Login</button>
                    <motion.div
                        variants={redirectionVariants}
                        className="mt-1"
                    >
                        Don't have an account yet? <Link className="text-[var(--red)]" to="/register">Register</Link>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    )
}