import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import Swal from 'sweetalert2'
import CustomPopup from '../CustomPopup'


function Dairy({ cow, setCow }) {

  const [name, setName] = useState('')
  const [health, setHealth] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [image, setImage] = useState(null)

  const [selectedCowId, setSelectedCowId] = useState('');

  const handleSelectedChange = (e) => {
    setSelectedCowId(e.target.value);
  };

  // first convert the string to a number 
  const selectedCow = cow.find((cow) => cow.id === Number(selectedCowId)) || {};

  const handleNameChange = (e) => {
    selectedCow.name = e.target.value;
    setName(e.target.value);
  }
  const handleHealthChange = (e) => {
    selectedCow.health = e.target.value;
    setHealth(e.target.value);
  }
  const handleAgeChange = (e) => {
    selectedCow.age = e.target.value;
    setAge(e.target.value);
  }

  const handleBreedChange = (e) => {
    selectedCow.breed = e.target.value;
    setBreed(e.target.value);
  }
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };


  const [admins, setAdmins] = useState([]);
  // Get admins
  useEffect(() => {
    fetch('http://localhost:3000/admins')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch admins');
        }
        return res.json();
      })
      .then((data) => {
        setAdmins(data);

      })
      .catch((error) => {
        console.error(error);
        // Handle the error state or display an error message
      });
  }, []);


  const user = JSON.parse(sessionStorage.getItem('user'));
  const adminId = user.id;
  const admin = admins.find((admin) => admin.id === user.id) || {};
  const ownedCows = cow.filter((cow) => cow.admin_id === admin.id);


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('breed', breed)
    data.append('health', health)
    data.append('age', age)
    data.append('admin_id', adminId)
    data.append('image', image)

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

  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };


  // ===================== UPDATE COW =====================

  const updateImage = () => {
    const formData = new FormData();
    formData.append('image', image);

    fetch(`http://localhost:3000/cows/${selectedCow.id}`, {
      method: 'PATCH',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.image_url || '');

        setCow((prevCows) => {
          const updatedCows = prevCows.map((cow) =>
            cow.id === selectedCow ? { ...cow, image_url: data.image_url } : cow
          );
          return updatedCows;
        });
      })
      .catch((error) => { console.error(error); });
  };

  const updateFields = () => {
    const data = JSON.stringify({ name: selectedCow.name, health: selectedCow.health, age: selectedCow.age, breed: selectedCow.breed });
    fetch(`http://localhost:3000/cows/${selectedCow.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setCow((prevCows) => {
          const updatedCows = prevCows.map((cow) =>
            cow.id === selectedCow.id ? { ...cow, name: data.name, health: data.health, age: data.age, breed: data.breed } : cow
          );
          return updatedCows;
        });
      })
      .catch((error) => { console.error(error); });
  };

  const handleUpdateCow = () => {
    updateImage();
    updateFields();
    // window.location.reload();
  };





  return (
    <>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
      >
        <div className="flex flex-row flex-wrap justify-center ">
          <form
            onSubmit={handleUpdateCow}
            className="flex flex-col bg-white rounded-lg ">
            <p className="text-3xl font-bold text-center">Update Cow</p>
            <div className="">
              <label htmlFor="" className="block font-medium text-gray-600">Cow Name</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                value={selectedCow.name}
                onChange={handleNameChange}
                type="text" id="Cow Name" name="Cow Name" placeholder="Cow Name" required />
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className=" sm:w-1/2">
                <label htmlFor="" className="block font-medium text-gray-600">Cow Health</label>
                <select className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  value={selectedCow.health}
                  onChange={handleHealthChange}
                  type="text" id="Cow Health" name="Cow Health" placeholder="Cow Health" required >
                  <option value="Healthy">Healthy</option>
                  <option value="Sick">Sick</option>
                </select>

              </div>
              <div className="sm:w-1/2">
                <label htmlFor="" className="block font-medium text-gray-600">Cow Age</label>
                <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  value={selectedCow.age}
                  onChange={handleAgeChange}
                  type="number" id="Cow Age" name="Cow Age" placeholder="Cow Age" required />
              </div>
            </div>

            <div className="flex items-start flex-col">
              <label htmlFor="image" className="  cursor-pointer">
                Cow Image

                <img src={selectedCow.image_url} alt="" className="w-20 h-20 object-cover " />
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                name="image"
                id="image"
                className="hidden"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block  font-medium text-gray-600">Cow Breed</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                value={selectedCow.breed}
                onChange={handleBreedChange}
                type="text" id="Cow Breed" name="Cow Breed" placeholder="Cow Breed" required />
            </div>
            <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Update Cow
            </button>
          </form>
        </div>
      </CustomPopup>

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
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Update Cow</p>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Name</label>
              <div className="flex flex-col gap-2">
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
                <button
                  onClick={() => setVisibility(true)}
                  className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dairy





