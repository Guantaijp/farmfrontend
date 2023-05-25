import React from "react";
import {useContext, useState} from 'react'
import {AuthContext} from '../AuthContext'
import { Link } from "react-router-dom";

function Signup () {

    const {register} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
       if (name && email && phone && password) {
        register(name, email, phone, password)
       }
       else {
              alert('Please fill in all fields')
         }

    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#F3F4F6' }}>
        <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold  text-center">Sign Up</h1>
            <p className="text-gray-500 mb-3 text-center">Create an account</p>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium text-gray-600">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-black"
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium text-gray-600">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-black"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block mb-1 font-medium text-gray-600">Phone Number</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-black"
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium text-gray-600">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-black"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                />
            </div>
            <button
                className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Sign Up
            </button>
            <p className="text-gray-600 text-center mt-5">
            Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
            </p>
        </form>
    </div>
    )
}

export default Signup;