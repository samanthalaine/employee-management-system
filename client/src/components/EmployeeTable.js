import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function EmployeeTable() {
const [employeeList, setEmployeeList] = useState([])


  const getEmployees = async () => {
    await axios.get("http://localhost:3001/employees").then((res) => {
      setEmployeeList(res.data);
    });
  };

  
  return (
    <div class="flex flex-col">
      

      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
          shadow
          overflow-hidden
          border-b border-gray-200
          sm:rounded-lg
        "
          >
              <button
        class="shadow bg-purple-500  ml-12 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={getEmployees}
      >
        Show Employees
      </button>
            <table class="min-w-full divide-y">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                  >
                    Wage
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              {employeeList.map((employee) => (
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{employee.age}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{employee.country}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${employee.wage}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;