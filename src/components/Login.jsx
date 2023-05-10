import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'

function Login() {

    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#F3F4F6' }}>
            <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold  text-center">Login</h1>
                <p className="text-gray-500 mb-3 text-center">Login to your account</p>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-600">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-blue-400"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 font-medium text-gray-600">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-blue-400"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Login
                </button>
                <p className="text-gray-600 text-center mt-5">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </form>
        </div>
    )
}
export default Login;

// <div class="flex justify-center items-center h-screen">
//   <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
//     <h1 class="text-3xl font-bold mb-4">Login</h1>
//     <form class="space-y-4">
//       <div>
//         <label class="block font-bold mb-2" for="email">Email</label>
//         <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email" />
//       </div>
//       <div>
//         <label class="block font-bold mb-2" for="password">Password</label>
//         <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="Password" />
//       </div>
//       <div>
//         <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">Login</button>
//       </div>
//       <div class="text-center">
//         <span class="text-gray-500">Don't have an account?</span>
//         <a href="/signup" class="text-blue-500">Sign Up</a>
//       </div>
//     </form>
//   </div>
// </div>
