import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import EditModal from "./EditModal";

// Base API URL
import api from "../../axiosInstance";

// Common error handler
const handleError = (message, error) => {
  console.error(message, error);
  toast.error(message);
};

// Reusable button component
const ActionButton = ({ onClick, isAdd, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1 px-3 py-1.5 ${
      isAdd
        ? "bg-green-50 text-green-600 hover:bg-green-100"
        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
    } rounded-md text-sm cursor-pointer`}
  >
    {isAdd ? <FaPlusCircle size={14} /> : <FaEdit size={14} />}
    {children}
  </button>
);

// Field component
const InfoField = ({ label, value, field, onEdit, isPhone }) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="block text-sm text-gray-500">{label}</label>
      <p className="text-base font-medium text-gray-800">
        {field === "password"
          ? "********"
          : value || "Please enter your mobile"}
      </p>
    </div>
    <ActionButton onClick={() => onEdit(field)} isAdd={isPhone && !value}>
      {isPhone && !value ? "Add" : "Edit"}
    </ActionButton>
  </div>
);

export default function UserInfo() {
  const [user, setUser] = useState(null);
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
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        handleError("Failed to get user info.", error);
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
      const response = await api.patch(`/users/update-${editField}`, payload);

      if (response.status === 200) {
        setUser((prev) => ({ ...prev, [editField]: inputValue }));
        setShowModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      handleError(`Failed to update ${editField}`, error);
    }
  };

  if (!user) {
    return <div className="p-6">Loading user info...</div>;
  }

  const fields = [
    { label: "Full Name", field: "name", value: user.name },
    { label: "Email", field: "email", value: user.email },
    {
      label: "Primary Phone",
      field: "phone",
      value: user.phone,
      isPhone: true,
    },
    { label: "Password", field: "password", value: null },
  ];

  return (
    <div className="p-6 space-y-6">
      {fields.map((fieldData) => (
        <InfoField key={fieldData.field} {...fieldData} onEdit={openModal} />
      ))}

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
