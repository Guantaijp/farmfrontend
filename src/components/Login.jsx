import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'

function Login() {

    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 ">
            <div className="flex flex-col items-center justify-center bg-white h-96 rounded-lg shadow-2xl w-1/3 mb-2">
                <h1 className="text-4xl mt-9 font-bold">Login</h1>
                <p className="text-gray-500 mt-3">Welcome back</p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-96 h-96">
                    <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border-2 rounded-md border-gray-300 py-2 px-3" type="email" id="email" name="email" placeholder="Email" required />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 rounded-md border-gray-300 py-2 px-3" type="password" id="password" name="password" placeholder="Password" required />                    <button className="px-9 py-3 mb-2 mt-2 text-lg text-white bg-black rounded-full shadow-md hover:bg-gray-900">
                        Login
                    </button>
                    <Link
                        to="/signup" className="text-blue-500">
                        <p className="text-gray-500 text-center">Don't have an account?</p>
                        Sign Up</Link>
                    {/* <p className="text-gray-500">Don't have an account?</p> */}
                </form>
            </div>
        </div>

    )

}

export default Login;