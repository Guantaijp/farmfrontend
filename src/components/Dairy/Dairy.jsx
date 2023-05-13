import React from 'react'
import Footer from '../Footer'

function Dairy() {
  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Add Cow</p>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Name</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                type="text" id="Cow Name" name="Cow Name" placeholder="Cow Name" required />
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Health</label>
                <select className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  id="Cow Health" name="Cow Health" required>
                  <option value="">Select Cow Health</option>
                  <option value="healthy">Healthy</option>
                  <option value="unhealthy">Unhealthy</option>
                </select>
              </div>
              <div className="mb-5 sm:w-1/2">
                <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Age</label>
                <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                  type="text" id="Cow Age" name="Cow Age" placeholder="Cow Age" required />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Image</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                type="file" id="Cow Image" name="Cow Image" placeholder="Cow Image" required />
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 font-medium text-gray-600">Cow Breed</label>
              <input className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
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
              <select className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                id="Cow Name" name="Cow Name" required>
                <option value="">Select Cow Name</option>
                <option value="cow1">Cow 1</option>
                <option value="cow2">Cow 2</option>
                <option value="cow3">Cow 3</option>
                <option value="cow4">Cow 4</option>
                <option value="cow5">Cow 5</option>
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





