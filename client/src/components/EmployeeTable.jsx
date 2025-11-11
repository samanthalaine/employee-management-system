import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateEmployee from "./UpdateEmployee";

function EmployeeTable() {
  const [employeeList, setEmployeeList] = useState([]);

  //renders employees alphabetically (.localeCompareMethod)
useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        const sortedEmployees = response.data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setEmployeeList(sortedEmployees);

      } catch (err) {
        console.error("Error fetching employees:", err.message);
        if (err.response) {
            console.error("Server Response Data:", err.response.data);
        }
      }
    };
    getEmployees();
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/employees/${id}`);
    setEmployeeList(
      employeeList.filter((employee) => employee.employee_id !== id)
    );
  };

  return (
<>
  <br />
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold leading-tight text-gray-800 mb-4 sm:px-6 lg:px-8">
          Employee Directory
        </h2>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Country
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Wage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeList.map((employee) => (
                <tr key={employee.employee_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{employee.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $
                    {employee.wage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <UpdateEmployee employee={employee} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => deleteEmployee(employee.employee_id)}
                      className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</>
  );
}

export default EmployeeTable;
