import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import Swal from 'sweetalert2'


function Dairy({ cow, setCow }) {

  const [name, setName] = useState('')
  const [health, setHealth] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [image, setImage] = useState(null)

  const handleNameChange = (e) => setName(e.target.value)
  const handleHealthChange = (e) => setHealth(e.target.value)
  const handleAgeChange = (e) => setAge(e.target.value)
  const handleBreedChange = (e) => setBreed(e.target.value)
  const handleImageChange = (event) => setImage(event.target.files[0]);


  const user = JSON.parse(sessionStorage.getItem('user'));
  const adminId = user.id;

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('breed', breed)
    data.append('health', health)
    data.append('age', age)
    data.append('admin_id', adminId)
    data.append('image', image)
    console.log(data)

    fetch('http://localhost:3000/cows', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setName('');
        setHealth('');
        setAge('');
        setBreed('');
        setImage(null);
        Swal.fire({
          icon: 'success',
          title: 'Cow Added Successfully',
          showConfirmButton: false,
          position: 'top-end',
          timer: 1500
        })
        setCow([...cow, data])
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
  }

  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Add Cow</p>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Name</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                value={name}
                onChange={handleNameChange}
                type="text" id="Cow Name" name="Cow Name" placeholder="Cow Name" required />
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Health</label>
                <select className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  value={health}
                  onChange={handleHealthChange}
                  type="text" id="Cow Health" name="Cow Health" placeholder="Cow Health" required >
                  <option value="Healthy">Healthy</option>
                  <option value="Sick">Sick</option>
                </select>

              </div>
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Age</label>
                <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  value={age}
                  onChange={handleAgeChange}
                  type="number" id="Cow Age" name="Cow Age" placeholder="Cow Age" required />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Image</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                onChange={handleImageChange}
                type="file" id="Cow Image" name="Cow Image" placeholder="Cow Image" required />
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Breed</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                value={breed}
                onChange={handleBreedChange}
                type="text" id="Cow Breed" name="Cow Breed" placeholder="Cow Breed" required />
            </div>
            <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Add Cow
            </button>
          </form>
        </div>
        {/* Update with a selector where i can selsct a  cow*/}
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Update Cow</p>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Name</label>
              <select className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black" >
                <option value="" >-- Select --</option>
                {cow.map((dairy) => (
                  <option
                    key={dairy.cow_id}
                    value={
                      cow.id
                    }>{dairy.name}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dairy





