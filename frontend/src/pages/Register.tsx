import { motion } from "framer-motion"
import { useState } from "react";
import { Link } from "react-router-dom"
import { TRegisterForm } from "../types";


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



export default function Register() {
    const [formData, setFormData] = useState<TRegisterForm>({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    }

    const handleClick = () => {
        console.log("register user");
    }
    
    return(
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grow flex justify-center items-center">
            <div className="flex flex-col mb-15 items-center justify-center">
                <h1 className="text-center text-5xl font-bold mb-10">Register</h1>
                <form className="flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-2">
                        <input className="primary" onChange={handleChange} value={formData.firstname} type="text" name="firstname" id="firstname" placeholder="first name" required />
                        <input className="primary" onChange={handleChange} value={formData.lastname} type="text" name="lastname" id="lastname" placeholder="last name" required />
                    </div>
                    <div className="flex gap-2">
                        <input className="primary" onChange={handleChange} value={formData.email} type="email" name="email" id="email" placeholder="you@gmail.com" required />
                        <input className="primary" onChange={handleChange} value={formData.password} type="password" name="password" id="password" required placeholder="password" />
                    </div>
                    <button onClick={handleClick} className="primary w-full lg:w-[500px]" type="button">
                        Register
                    </button>
                    <motion.div
                        className="mt-1"
                        variants={redirectionVariants}
                    >
                        Already has an account? <Link to="/login" className="text-[var(--red)]">Login</Link>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    )
}