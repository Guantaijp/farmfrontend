import React from "react";
import {useContext, useState} from 'react'
import {AuthContext} from './AuthContext'
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
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 ">
            <div className="flex flex-col items-center justify-center bg-white h-96 rounded-lg shadow-2xl w-1/3 mb-2">
                <h1 className="text-4xl mt-5 font-bold">Sign Up</h1>
                <p className="text-gray-500">Create an account</p>
                <form onSubmit={handleSubmit}className="flex flex-col items-center justify-center w-96 h-96">
                    <input value={name} onChange={(e) => setName(e.target.value)}type="text" placeholder="Name" className="border-2 border-gray-400 rounded-lg w-96 h-10 mt-5 mx-2"></input>
                    <input value={email}onChange={(e) => setEmail(e.target.value)}type="text" placeholder="Email" className="border-2 border-gray-400 rounded-lg w-96 h-10 mt-5"></input>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}type="text" placeholder="Phone Number" className="border-2 border-gray-400 rounded-lg w-96 h-10 mt-5"></input>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}type="text" placeholder="Password" className="border-2 border-gray-400 rounded-lg w-96 h-10 mt-5"></input>
                    <button className="px-9 py-3 mb-2 text-lg text-white bg-black rounded-full shadow-md hover:bg-gray-900">
                     Sign Up
                </button>
                {/* if you have an account can login */}
                 <Link
                    to="/login" className="text-blue-500">
                    <p className="text-gray-500 text-center">Already have an account?</p>
                    Login
                    </Link> 
             
                </form>
            </div>
        </div>

    )
}

export default Signup;