import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";

export default function UpdateEmployee({ employee }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(employee.name);
  const [age, setAge] = useState(String(employee.age ?? ""));
  const [country, setCountry] = useState(employee.country);
  const [position, setPosition] = useState(employee.position);
  const [wage, setWage] = useState(String(employee.wage ?? ""));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  // Simple validation
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

  // Open/close helpers
  const open = () => {
    setShowModal(true);
    setError("");
  };

  const close = useCallback(() => {
    setShowModal(false);
    // reset fields to original values on close
    setName(employee.name);
    setAge(String(employee.age ?? ""));
    setCountry(employee.country);
    setPosition(employee.position);
    setWage(String(employee.wage ?? ""));
    setSaving(false);
    setError("");
  }, [employee]);

  const editEmployee = async (e) => {
    e.preventDefault();
    if (!isValid || saving) return;
    setSaving(true);
    setError("");

    try {
      await axios.put(`${API_BASE_URL}/employees/${employee.employee_id}`, {
        name: name.trim(),
        age: Number(age),
        country: country.trim(),
        position: position.trim(),
        wage: Number(wage),
      });
      // Prefer lifting state up instead of reloading; for now, close + reload
      setShowModal(false);
      window.location = "/employeetable";
    } catch (err) {
      console.error(err);
      setError("Could not save changes. Please try again.");
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center rounded-lg bg-purple-600 px-3 py-2 text-white font-semibold shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Update
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={close}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Dialog: mobile sheet, centered on sm+ */}
            <div
              className="w-full sm:w-auto sm:max-w-2xl bg-white shadow-xl
                         rounded-t-2xl sm:rounded-xl
                         max-h-[90vh] overflow-hidden
                         translate-y-0"
              onClick={(e) => e.stopPropagation()} // prevent backdrop close
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Edit {employee.name}'s Details
                </h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="rounded p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span className="block text-2xl leading-none">×</span>
                </button>
              </div>

              <form onSubmit={editEmployee} className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                {error && (
                  <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Jane Doe"
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      step="1"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="30"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="United States"
                      required
                      autoComplete="country-name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Software Engineer"
                      required
                      autoComplete="organization-title"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Wage (annual)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      step="1"
                      value={wage}
                      onChange={(e) => setWage(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="55000"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <button
                    type="button"
                    onClick={close}
                    className="w-full sm:w-auto rounded-lg px-4 py-2 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid || saving}
                    className={`w-full sm:w-auto rounded-lg px-4 py-2 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${isValid && !saving ? "bg-purple-600 hover:bg-purple-500 focus:ring-purple-500" : "bg-purple-300 cursor-not-allowed"}`}
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
