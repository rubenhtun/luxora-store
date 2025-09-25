import React from "react";
import { FaTimes } from "react-icons/fa";

export default function EditModal({ field, value, onClose, onSave, onChange }) {
  console.log("EditModal rendered with:", { field, value });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaTimes size={18} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {`Edit ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        </h3>
        <input
          type={field === "password" ? "password" : "text"}
          value={value}
          onChange={onChange}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
