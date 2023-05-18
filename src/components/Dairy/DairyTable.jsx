import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import moment from "moment";

function DairyTable({ cow, admins, setAdmins }) {

    // filter a date that is greater than the current date
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        // Compare year, month, and day components
        const isSameDay = currentDate.getDate() === selectedDate.getDate();
        const isSameMonth = currentDate.getMonth() === selectedDate.getMonth();
        const isSameYear = currentDate.getFullYear() === selectedDate.getFullYear();

        // Exclude if the selected date is the current day
        if (isSameDay && isSameMonth && isSameYear) {
            return true;
        }

        return currentDate.getTime() <= selectedDate.getTime();
    };

    const [kg, setKg] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCowId, setSelectedCowId] = useState(cow.cow_id);

    function handleSelectedChange(e) {
        setSelectedCowId(e.target.value);
    }

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    function handleKgChange(e) {
        setKg(e.target.value);
    }

    function handleMilkSubmit(e) {

        const dateWithoutTime = moment(selectedDate).startOf('day')
        const formattedDate = dateWithoutTime.format('YYYY-MM-DD')  

        e.preventDefault();
        const milk = {
            cow_id: selectedCowId,
            amount: kg,
            date: formattedDate,
        };
        fetch('http://localhost:3000/milk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(milk),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to create milk');
                }
                return res.json();
            })
            .then((data) => { 
               
                if (data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                    });
                }
                else if (data.message) {
                   
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: data.message,
                    });
            
                }
                window.location.reload();
                setKg("");
                setSelectedDate(new Date());
                setSelectedCowId("");
            })

            .catch((error) => {
                console.error(error);
                // Handle the error state or display an error message
            }
            );
    }


    // get the milk data of the current day for the current admin
    const [milk, setMilk] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/milks')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch milk');
                }
                return res.json();
            })
            .then((data) => {
                setMilk(data);
            })
            .catch((error) => {
                console.error(error);
                // Handle the error state or display an error message
            });
    }, []);
    

    const user = JSON.parse(sessionStorage.getItem('user'));
    const admin = admins.find((admin) => admin.id === user.id) || {};
    const ownedCows = cow.filter((cow) => cow.admin_id === admin.id);   
    
// Ensure milk is defined and initialized as an empty array if it's undefined
const milkData = milk || [];

// Get the milk data of the current day for the current admin
const todayMilk = milkData.filter((milk) => milk.date === moment(new Date()).format('YYYY-MM-DD') && ownedCows.find((cow) => cow.id === milk.cow_id));

// console.log(todayMilk);





    return (
        <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
            <div className="flex flex-row flex-wrap m-4 justify-center gap-5 mt-12">
                <form className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
                    <p className="text-3xl font-bold text-center">Dairy Table</p>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Cow Image</th>
                                <th className="px-4 py-2">Cow Name</th>
                                <th className="px-4 py-2">Cow Health</th>
                                <th className="px-4 py-2">Cow Breed</th>
                                <th className="px-4 py-2">Milk Kgs</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayMilk.map((milk) => (
                                <tr key={milk.id}>
                                    <td className="border px-4 py-2">
                                        <img
                                            src={ownedCows.find((cow) => cow.id === milk.cow_id).image_url}
                                            alt="cow"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ownedCows.find((cow) => cow.id === milk.cow_id).name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ownedCows.find((cow) => cow.id === milk.cow_id).health}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ownedCows.find((cow) => cow.id === milk.cow_id).breed}
                                    </td>
                                    <td className="border px-4 py-2">{milk.amount}</td>
                                    <td className="border px-4 py-2">{milk.date}</td>
                                </tr>
                            ))}

                         
                        </tbody>
                    </table>

                </form>
            </div>
            {/* input milk per day */}
            <div className="flex flex-row flex-wrap m-4 mt-10  mb-10 justify-center gap-5">
                <div className="flex flex-col bg-white p-5 rounded-lg items-center">
                    <form
                        onSubmit={handleMilkSubmit}
                        className="flex flex-col bg-white rounded-lg">
                        <p className="text-3xl font-bold text-center">Input Milk Per Day</p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <div className="mb-5 sm:w-1/2">
                                <label htmlFor="" className="block font-medium text-gray-600">Cow Name</label>
                                <select
                                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                   value={selectedCowId}
                                   onChange={handleSelectedChange}
                                >
                                    <option value="">-- Select --</option>
                                    {ownedCows.map((dairy) => (
                                        <option key={dairy.cow_id} value={dairy.id}>{dairy.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-5 sm:w-1/2">
                                <label htmlFor="" className="block font-medium text-gray-600">Milk Kgs</label>
                                <input
                                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                    type="number"
                                    id="Kgs"
                                    name="Kgs"
                                    value={kg}
                                    onChange={handleKgChange}
                                    placeholder="Kgs"
                                    required
                                />
                            </div>
                            <div className="mb-5 sm:w-1/2">
                                <label htmlFor="" className="block font-medium text-gray-600">Date</label>
                                <DatePicker
                                    className='border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black'
                                    showTimeSelect
                                filterDate={filterPassedTime}
                                selected={selectedDate}
                                onChange={handleDateChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center"> {/* Container for button alignment */}
                            <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>



            <Footer />
        </div>
    )
}

export default DairyTable
