import React, { useEffect, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaWallet,
  FaSignOutAlt,
  FaArrowLeft,
  FaShieldAlt,
  FaKey,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
function Profile() {
  const [user, setUser] = useState(null);
  const [showSecurity, setShowSecurity] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setNewPhoneNumber(parsedUser.phone_number || "");
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/logout");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill all password fields");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/${user.id}/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  };

  const handleChangePhone = async () => {
    if (!newPhoneNumber) {
      alert("Phone number is required");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/${user.id}/change-phone-number`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: newPhoneNumber,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedUser = {
          ...user,
          phone_number: newPhoneNumber,
        };

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        alert("Phone number updated successfully");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update phone number");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 px-4">
        <p className="text-center">
          No user data found. Please log in.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-200 mb-4 hover:text-green-400 transition text-sm sm:text-base"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
          <FaUser />
          My Profile
        </h2>

        <div className="space-y-4">
          <ProfileRow
            icon={<FaUser />}
            label="Full Name"
            value={user.full_name}
          />

          <ProfileRow
            icon={<FaEnvelope />}
            label="Email"
            value={user.email}
          />

          <ProfileRow
            icon={<FaPhone />}
            label="Phone Number"
            value={user.phone_number}
          />

          <ProfileRow
            icon={<FaGlobe />}
            label="Country"
            value={user.country}
          />

          <ProfileRow
            icon={<FaWallet />}
            label="Account Balance"
            value={`$${user.balance?.balance?.toFixed(2) || "0.00"}`}
            highlight
          />

          <div
            onClick={() => setShowSecurity(true)}
            className="flex items-center justify-between border-b border-gray-700 pb-3 cursor-pointer hover:text-green-400 transition"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <FaShieldAlt className="text-green-400" />
              <span>Security</span>
            </div>

            <span className="text-green-400 font-medium">
              Manage →
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {showSecurity && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-green-400">
                Security Settings
              </h3>

              <button
                onClick={() => setShowSecurity(false)}
                className="text-red-400 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <FaKey />
                Change Password
              </h4>

              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full p-3 rounded bg-gray-700 mb-3 outline-none text-sm sm:text-base"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full p-3 rounded bg-gray-700 mb-3 outline-none text-sm sm:text-base"
              />

              <button
                onClick={handleChangePassword}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-medium"
              >
                Update Password
              </button>
            </div>

            <div className="mb-8 border-t border-gray-700 pt-6">
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <FaPhone />
                Change Phone Number
              </h4>

              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) =>
                  setNewPhoneNumber(e.target.value)
                }
                className="w-full p-3 rounded bg-gray-700 mb-3 outline-none text-sm sm:text-base"
              />

              <button
                onClick={handleChangePhone}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-medium"
              >
                Update Phone Number
              </button>
            </div>

            <div className="mb-8 border-t border-gray-700 pt-6">
              <h4 className="font-semibold flex items-center gap-2">
                <FaLock />
                Passkeys
              </h4>

              <p className="text-gray-400 text-sm mt-2">
                Coming soon.
              </p>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="font-semibold flex items-center gap-2">
                <FaShieldAlt />
                Two-Factor Authentication
              </h4>

              <p className="text-gray-400 text-sm mt-2">
                Coming soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileRow({ icon, label, value, highlight }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-700 pb-3">
      <div className="flex items-center gap-3 text-gray-400">
        <span className="text-green-400">{icon}</span>
        <span>{label}</span>
      </div>

      <span
        className={`font-medium break-all text-left sm:text-right ${
          highlight
            ? "text-green-400 text-lg"
            : "text-gray-100"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

export default Profile;