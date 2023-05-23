import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2';
import moment from "moment";

function TeaTable({ tea, setTea, admins }) {

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

  // ==== POST PICKED TEA ==== //
  const [kilo, setKilo] = useState("")
  const [pay, setPay] = useState("")
  const [pickDate, setPickDate] = useState("")

  const user = JSON.parse(sessionStorage.getItem('user'));
  const adminId = user.id;
  const admin = admins.find((admin) => admin.id === user.id) || {};
  const ownedFarm = tea.filter((farm) => farm.admin_id === admin.id);

  const [selectedFarmId, setSelectedFarmId] = useState('')

  const handleSelectedChange = (e) => {
    setSelectedFarmId(e.target.value)
  }

  const inputKiloHandler = (e) => {
    setKilo(e.target.value)
  }

  const inputPayHandler = (e) => {
    setPay(e.target.value)
  }



  const selectedFarm = tea.find((farm) => farm.id === Number(selectedFarmId)) || {}


  const submitPickedTea = async (e) => {
    e.preventDefault()

    const pickedTea = {
      kilo : kilo,
      price : pay,
      date : pickDate,
      admin_id : adminId,
      tea_id : selectedFarmId
    }

    fetch('http://127.0.0.1:3000/tea_picks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pickedTea),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Picked Tea Added Successfully',
          })
          setKilo("")
          setPay("")
          setPickDate("")
          setSelectedFarmId("")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }







  return (

    <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
      <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
        <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
          <p className="text-3xl font-bold text-center">Tea Farm Table</p>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Farm Image</th>
                <th className="px-4 py-2">Farm Name</th>
                <th className="px-4 py-2">Farm Location</th>
                <th className="px-4 py-2">Kgs Picked</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">1</td>
              </tr>

            </tbody>

          </table>

        </form>
      </div>
      <div className="flex flex-row flex-wrap m-4 justify-center gap-5">

        <div className="flex flex-col bg-white p-5 rounded-lg items-center">
          <form
           onSubmit={submitPickedTea}
            className="flex flex-col bg-white rounded-lg">
            <p className="text-3xl font-bold text-center">Input Tea Per Pick</p>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block font-medium text-gray-600">Farm Name</label>
                <select
                  className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  value={selectedFarmId}
                  onChange={handleSelectedChange}
                >
                  <option value="">-- Select --</option>
                  {ownedFarm.map((farm) => (
                    <option key={farm.tea_id} value={farm.id}>
                      {farm.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block font-medium text-gray-600">Man Power Pay</label>
                <input
                  className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  type="text"
                  id="Pay"
                  value={pay}
                  onChange={inputPayHandler}
                  name="Pay"
                  placeholder="Pay"
                  required
                />
              </div>
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block font-medium text-gray-600">Kgs Per Pick</label>
                <input
                  className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  type="number"
                  id="Kgs"
                  name="Kgs"
                  value={kilo}
                  onChange={inputKiloHandler}
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
                  selected={pickDate}
                  onChange={date => setPickDate(date)}
                  required  
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

    </div>
  )
}

export default TeaTable
