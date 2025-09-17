import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import EditModal from "./EditModal";

// Base API URL
import { baseURL } from "../../config";

export default function UserInfo() {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    // Define async function inside useEffect
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/me`, {
          withCredentials: true, // send HTTP-only cookie
        });

        if (response.data) {
          setUser(response.data);
        } else {
          toast.error("Failed to get user info.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Failed to get user info.");
      }
    };

    fetchUserInfo();
  }, []);

  // Save changes for any field
  const handleSave = async () => {
    if (!inputValue) {
      toast.error(`${editField} cannot be empty`);
      return;
    }

    try {
      const payload = { [editField]: inputValue };

      // API endpoint may differ based on field, adjust if needed
      const response = await axios.patch(
        `${baseURL}/users/update-${editField}`,
        payload,
        {
          withCredentials: true, // ensures HTTP-only cookie is sent
        }
      );

      if (response.status === 200) {
        setUser((prev) => ({ ...prev, [editField]: inputValue }));
        setShowModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(`Failed to update ${editField}`);
    }
  };

  if (!user) {
    return <div className="p-6">Loading user info...</div>;
  }

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
