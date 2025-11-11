import React, { useState } from 'react';

export default function DeleteEmployee({ employee, onDeleteConfirm }) {
  const [showModal, setShowModal] = useState(false);
  
  const handleDelete = () => {
    onDeleteConfirm(employee.employee_id)
    setShowModal(false)
  }

  return (
    <>
      <button
        className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      
      {/* --- Confirmation Modal --- */}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t text-gray-500">
                  <h3 className="text-xl font-semibold">
                    Confirm Deletion
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-90 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-700 text-lg leading-relaxed">
                    Are you sure you want to permanently delete {employee.name}?
                  </p>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete} 
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}