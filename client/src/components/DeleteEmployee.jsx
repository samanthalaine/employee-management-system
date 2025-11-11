import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function DeleteEmployee({ employee, onDeleteConfirm }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const employeeName = useMemo(() => employee?.name ?? "this employee", [employee]);

  const open = () => setShowModal(true);

  const close = useCallback(() => {
    if (deleting) return; // prevent closing mid-delete
    setShowModal(false);
  }, [deleting]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await Promise.resolve(onDeleteConfirm(employee.employee_id)); 
      setShowModal(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-white font-semibold shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal container */}
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby="confirm-delete-desc"
          >

            <div
              className="w-full sm:w-auto sm:max-w-md bg-white shadow-xl
                         rounded-t-2xl sm:rounded-xl
                         max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex items-center justify-between px-4 py-3 sm:px-5 border-b">
                <h3 id="confirm-delete-title" className="text-lg sm:text-xl font-semibold text-gray-900">
                  Confirm Deletion
                </h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="rounded p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <span className="block text-2xl leading-none">×</span>
                </button>
              </div>

              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p id="confirm-delete-desc" className="text-gray-700">
                  Are you sure you want to permanently delete{" "}
                  <span className="font-semibold">{employeeName}</span>?
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 border-t">
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <button
                    type="button"
                    onClick={close}
                    disabled={deleting}
                    className="w-full sm:w-auto rounded-lg px-4 py-2 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full sm:w-auto rounded-lg px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-500 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60"
                  >
                    {deleting ? "Deleting…" : "Yes, Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
