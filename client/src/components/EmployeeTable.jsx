import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function EmployeeTable() {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Toggle mocks via env:
  // VITE_USE_MSW=true  -> mock in browser (relative URLs)
  // VITE_USE_MSW=false -> real API (VITE_API_URL must be set)
  const useMock = import.meta.env.VITE_USE_MSW === "true";
  const API_BASE = useMock ? "" : (import.meta.env.VITE_API_URL || "http://localhost:3001");

  // axios instance (fail fast instead of "pending forever")
  const http = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        timeout: 15000,
      }),
    [API_BASE]
  );

  useEffect(() => {
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await http.get("/employees", { signal: controller.signal });
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setEmployeeList(sorted);
      } catch (e) {
        if (axios.isCancel(e)) return;
        console.error("Error fetching employees:", e);
        setErr("Could not load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
    return () => controller.abort();
  }, [http]);

  const deleteEmployee = async (id) => {
    // optimistic update with rollback
    const prev = employeeList;
    setEmployeeList((list) => list.filter((e) => e.employee_id !== id));
    try {
      await http.delete(`/employees/${id}`);
    } catch (e) {
      console.error("Delete failed", e);
      setEmployeeList(prev);
      alert("Delete failed. Please try again.");
    }
  };

  const hasEmployees = employeeList.length > 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Employee Directory</h2>

      {loading && <div className="text-sm text-gray-500">Loading…</div>}
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      {!loading && !hasEmployees && <div className="text-sm text-gray-500">No employees found.</div>}

      {/* Mobile: Card list (default) */}
      <ul className="space-y-3 md:hidden">
        {employeeList.map((employee) => (
          <li
            key={employee.employee_id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">{employee.name}</p>
                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <div><span className="font-medium">Age: </span>{employee.age}</div>
                  <div className="truncate"><span className="font-medium">Country: </span><span className="truncate">{employee.country}</span></div>
                  <div className="col-span-2 truncate"><span className="font-medium">Position: </span><span className="truncate">{employee.position}</span></div>
                  <div><span className="font-medium">Wage: </span>{currency.format(Number(employee.wage || 0))}</div>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2">
                <UpdateEmployee employee={employee} />
                <DeleteEmployee employee={employee} onDeleteConfirm={deleteEmployee} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: Table (md+) */}
      <div className="hidden md:block">
        <div className="shadow overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Age", "Country", "Position", "Wage", "Actions"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeList.map((employee) => (
                <tr key={employee.employee_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{employee.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{employee.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {currency.format(Number(employee.wage || 0))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 space-x-2">
                    <UpdateEmployee employee={employee} />
                    <DeleteEmployee employee={employee} onDeleteConfirm={deleteEmployee} />
                  </td>
                </tr>
              ))}
              {!hasEmployees && !loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-sm text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
