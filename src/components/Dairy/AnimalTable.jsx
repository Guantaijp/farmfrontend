import React from 'react'
import Footer from '../Footer'


function AnimalTable() {
  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Dairy Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Total milk sold(kgs)</th>
                  <th className="px-4 py-2">Milk Total price(ksh)</th>
                  <th className="px-4 py-2">other incomes</th>
                  <th className="px-4 py-2">cost used</th>
                  <th className="px-4 py-2">profit/loss</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">5</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">12</td>
                  <td className="border px-4 py-2">13</td>
                  <td className="border px-4 py-2">14</td>
                  <td className="border px-4 py-2">15</td>
                </tr>
              </tbody>
            </table>

          </form>
        </div>
        {/* Update with a selector where i can selsct a  cow*/}
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Cost Table</p>
            {/* table with Items, Cost Date */}
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Cost</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">3</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">6</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9</td>
                </tr>
              </tbody>
            </table>
          </form>

          <form className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Sells Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Sell</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">3</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">6</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        {/* input Sell and Cost  */}

        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
        <div className="flex flex-col bg-white p-5 rounded-lg items-center">
            <form className="flex flex-col bg-white rounded-lg">
              <p className="text-3xl font-bold text-center">Input Cost</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Item</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Item"
                    name="Item"
                    placeholder="Item"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Cost Price</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="cost"
                    name="cost"
                    placeholder="cost"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Date</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Date"
                    name="Date"
                    placeholder="Date"
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

          <div className="flex flex-col bg-white p-5 rounded-lg items-center">
            <form className="flex flex-col bg-white rounded-lg">
              <p className="text-3xl font-bold text-center">Input Sell</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Item</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Item"
                    name="Item"
                    placeholder="Item"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Sell Price</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Sell"
                    name="Sell"
                    placeholder="Sell"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Date</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Date"
                    name="Date"
                    placeholder="Date"
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
        <Footer />

      </div>

    </>
  );

}

export default AnimalTable


