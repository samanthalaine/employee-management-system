import React, { useState, useMemo } from "react";
import axios from "axios";

function EmployeeForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const isValid = useMemo(() => {
    const ageNum = Number(age);
    const wageNum = Number(wage);
    return (
      name.trim() &&
      country.trim() &&
      position.trim() &&
      Number.isFinite(ageNum) && ageNum > 0 &&
      Number.isFinite(wageNum) && wageNum > 0
    );
  }, [name, age, country, position, wage]);

  const addEmployee = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValid) {
      setError("Please complete all fields with valid values.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/create`, {
        name: name.trim(),
        age: Number(age),
        country: country.trim(),
        position: position.trim(),
        wage: Number(wage),
      });

      setShowAlert(true);
      setName(""); setAge(""); setCountry(""); setPosition(""); setWage("");
      setTimeout(() => setShowAlert(false), 2500);
    } catch (err) {
      console.error(err);
      setError("Could not add employee. Please try again.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
        Add New Employee
      </h2>

      {showAlert && (
        <div
          className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded"
          role="status"
          aria-live="polite"
        >
          <strong className="font-semibold">Success:</strong>{" "}
          New employee was added.
        </div>
      )}

      {error && (
        <div
          className="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={addEmployee} className="space-y-4">
        {/* Mobile-first: labels above inputs. On md+, two columns for denser layout */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              autoComplete="country-name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              autoComplete="organization-title"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wage (annual)
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="Wage"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full sm:w-auto inline-flex justify-center items-center rounded-lg px-4 py-2 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isValid
                ? "bg-purple-600 hover:bg-purple-500 focus:ring-purple-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
