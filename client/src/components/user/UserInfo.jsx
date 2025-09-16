import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import EditModal from "./EditModal";

// Base API URL
import { baseURL } from "../../config";

export default function UserInfo() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      name: "John Doe",
      email: "john@example.com",
      phone: null,
    }
  );

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState(""); // which field is being edited
  const [inputValue, setInputValue] = useState("");

  // Open modal for a specific field
  const openModal = (field) => {
    setEditField(field);
    setInputValue(user[field] || ""); // Bracket notation lets us access object properties dynamically
    setShowModal(true);
  };

  // Save changes for any field
  const handleSave = async () => {
    if (!inputValue) {
      toast.error(`${editField} cannot be empty`);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken"); // if using localStorage
      const payload = { [editField]: inputValue };

      // API endpoint may differ based on field, adjust if needed
      const response = await axios.patch(
        `${baseURL}/users/update-${editField}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(`Error updating ${editField}:`, error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Name */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm text-gray-500">Full Name</label>
          <p className="text-base font-medium text-gray-800">{user.name}</p>
        </div>
        <button
          onClick={() => openModal("name")}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer"
        >
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Email */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm text-gray-500">Email</label>
          <p className="text-base font-medium text-gray-800">{user.email}</p>
        </div>
        <button
          onClick={() => openModal("email")}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer"
        >
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Phone */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm text-gray-500">Primary Phone</label>
          <p className="text-base font-medium text-gray-800">
            {user.phone || "Please enter your mobile"}
          </p>
        </div>
        <button
          onClick={() => openModal("phone")}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 text-sm cursor-pointer"
        >
          {user.phone ? (
            <>
              <FaEdit size={14} /> Edit
            </>
          ) : (
            <>
              <FaPlusCircle size={14} /> Add
            </>
          )}
        </button>
      </div>

      {/* Password */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm text-gray-500">Password</label>
          <p className="text-base font-medium text-gray-800">********</p>
        </div>
        <button
          onClick={() => openModal("password")}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer"
        >
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditModal
          field={editField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
