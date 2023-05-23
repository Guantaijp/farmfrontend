import React, { useState } from 'react'
import Footer from '../Footer'
import Swal from 'sweetalert2'
import CustomPopup from '../CustomPopup'


function TeaInput({ tea, setTea, admins }) {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = () => {
        setVisibility(false);
    };

    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')

    const [selectedFarmId, setSelectedFarmId] = useState('')

    const handleSelectedChange = (e) => {
        setSelectedFarmId(e.target.value)
    }

    const selectedFarm = tea.find((farm) => farm.id === Number(selectedFarmId)) || {}



    const handleNameChange = (e) => {
        selectedFarm.name = e.target.value
        setName(e.target.value)
    }
    const handleSizeChange = (e) => {
        selectedFarm.size = e.target.value
        setSize(e.target.value)
    }
    const handleLocationChange = (e) => {
        selectedFarm.location = e.target.value
        setLocation(e.target.value)
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }


    const user = JSON.parse(sessionStorage.getItem('user'));
    const adminId = user.id;
    const admin = admins.find((admin) => admin.id === user.id) || {};
    const ownedFarm = tea.filter((farm) => farm.admin_id === admin.id);

    // console.log (ownedFarm)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('size', size)
        formData.append('location', location)
        formData.append('image', image)
        formData.append('admin_id', adminId)

        fetch('http://127.0.0.1:3000/tea', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setName('')
                setSize('')
                setLocation('')
                setImage('')
                Swal.fire({
                    title: 'Success!',
                    text: 'Tea Farm Added Successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setTea([...tea, data])
            })
            .catch(err => console.log(err))
    }

    // ======= UPDATE TEA FARM =======

    const updateImage = () => {
        const formData = new FormData();
        formData.append('image', image);

        fetch(`http://localhost:3000/tea/${selectedFarm.id}`, {
            method: 'PATCH',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setTea((prevTea) => {
                    const updatedTea = prevTea.map((tea) =>
                        tea.id === selectedFarm ? { ...tea, image_url: data.image_url } : tea
                    );
                    return updatedTea;
                });
            })
            .catch((error) => { console.error(error); });
    };

    const updateFields = () => {
        const data = JSON.stringify({ name: selectedFarm.name, size: selectedFarm.size, location: selectedFarm.location });
        fetch(`http://localhost:3000/tea/${selectedFarm.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                setTea((prevTea) => {
                    const updatedTea = prevTea.map((tea) =>
                        tea.id === selectedFarm.id ? { ...tea, name: data.name, size: data.size, location: data.location } : tea
                    );
                    return updatedTea;
                });

            })
            .catch((error) => console.error(error));
    };

    const handleUpdateFarm = (e) => {
        e.preventDefault();
        updateFields();
        updateImage();
        window.location.reload();
    }




    return (
        <>
            <CustomPopup
                onClose={popupCloseHandler}
                show={visibility}
            >
                <div className="flex flex-row flex-wrap justify-center ">
                    <form
                        onSubmit={handleUpdateFarm}
                        className="flex flex-col bg-white rounded-lg ">
                        <p className="text-3xl font-bold text-center">Update Tea Farm</p>
                        <div className="">
                            <label htmlFor="" className="block font-medium text-gray-600">Farm Name</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                value={selectedFarm.name}
                                onChange={handleNameChange}
                                type="text" id="Farm Name" name="Farm Name" placeholder="Farm Name" required />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5">

                            <div className="sm:w-1/2">
                                <label htmlFor="" className="block font-medium text-gray-600">Farm Size</label>
                                <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                    value={selectedFarm.size}
                                    onChange={handleSizeChange}
                                    type="number" id="Farm Size" name="Farm Size" placeholder="Farm Size" required />
                            </div>
                        </div>

                        <div className="flex items-start flex-col">
                            <label htmlFor="image" className="  cursor-pointer">
                                Farm Image
                                <img src={selectedFarm.image_url} alt="" className="w-20 h-20 object-cover " />
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
                            <label htmlFor="" className="block  font-medium text-gray-600">Farm Location</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                value={selectedFarm.location}
                                onChange={handleLocationChange}
                                type="text" id="Farm Location" name="Farm Location" placeholder="Farm Location" required />
                        </div>
                        <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">Update Farm
                        </button>
                    </form>
                </div>
            </CustomPopup>

            <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
                <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
                        <p className="text-3xl font-bold text-center">Add Farm</p>
                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 font-medium text-gray-600">Farm Name</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                value={name}
                                onChange={handleNameChange}
                                type="text" id="Farm Name" name="Farm Name" placeholder="Farm Name" required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 font-medium text-gray-600">Farm Size</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                value={size}
                                onChange={handleSizeChange}
                                type="number" id="Farm Size" name="Farm Size" placeholder="Farm Size" required />
                        </div>
                        {/* </div> */}
                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 font-medium text-gray-600">Farm Image</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                onChange={handleImageChange}
                                type="file" id="Farm Image" name="Farm Image" placeholder="Farm Image" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 font-medium text-gray-600">Farm Location</label>
                            <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                                value={location}
                                onChange={handleLocationChange}
                                type="text" id="Farm Location" name="Farm Location" placeholder="Farm Location" required />
                        </div>
                        <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">Add Farm
                        </button>
                    </form>
                </div>
                {/* Update with a selector where i can selsct a  cow*/}
                <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
                    <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
                        <p className="text-3xl font-bold text-center">Update Farm</p>
                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 font-medium text-gray-600">Farm Name</label>
                            <div className="flex flex-col gap-2">
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

export default TeaInput
