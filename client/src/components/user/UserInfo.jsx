import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaPlusCircle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// Base API URL
import { baseURL } from "../../config";

export default function UserInfo() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
    phone: null,
  };
  console.log(user);

  // State to control showing/hiding the modal
  const [showModal, setShowModal] = useState(false);

  // State for phone number input
  const [phoneInput, setPhoneInput] = useState("");

  // Handle saving (adding or updating) mobile phone number
  const handleSavePhone = async () => {
    if (!phoneInput) {
      toast.error("Phone number cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken"); // if using localStorage

      const response = await axios.patch(
        `${baseURL}/users/update-phone`,
        { phone: phoneInput }, // send as object
        { headers: { Authorization: `Bearer ${token}` } } // if JWT is needed
      );

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setShowModal(false);
        localStorage.setItem("user", JSON.stringify(updatedUser)); // update local storage
        toast.success(response.data.message);
        setPhoneInput("");
      }
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  };

  // ======================= Render User Info UI =======================
  return (
    <div className="p-6 space-y-6">
      {/* Name */}
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="full name" className="block text-sm text-gray-500">
            Full Name
          </label>
          <p className="text-base font-medium text-gray-800">{user.name}</p>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer">
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Email */}
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-500">
            Email
          </label>
          <p className="text-base font-medium text-gray-800">{user.email}</p>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer">
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Phone */}
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-500">
            Primary Phone
          </label>
          <p className="text-base font-medium text-gray-800">
            {user.phone ? user.phone : "Please enter your mobile"}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
          <label htmlFor="password" className="block text-sm text-gray-500">
            Password
          </label>
          <p className="text-base font-medium text-gray-800">********</p>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm cursor-pointer">
          <FaEdit size={14} /> Edit
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {user.phone ? "Edit Phone Number" : "Add Phone Number"}
            </h3>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhone}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
