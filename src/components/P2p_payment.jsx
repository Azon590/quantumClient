import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function P2p_payment() {
  const { state: user } = useLocation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        No trade selected
      </div>
    );
  }

const handlePayment = () => {
  Swal.fire({
    icon: "info",
    title: "Payment Pending",
    text: "If you already paid, contact admin via chatbot for help.",
    confirmButtonColor: "#22c55e",
    confirmButtonText: "Continue",
    background: "#111827",
    color: "#ffffff",
  }).then(() => {
    navigate("/p2pMarket");
  });
};

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">

      <div className="bg-gray-900 w-full max-w-md p-6 rounded-xl border border-gray-800">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-4">
          MPesa Payment
        </h1>

        {/* SELLER INFO */}
        <div className="mb-5">
          <p className="text-gray-400">Buying from</p>
          <h2 className="text-xl font-semibold">{user.name}</h2>

          <p className="text-green-400 font-bold mt-2">
            Price: {user.price.toLocaleString()} KES
          </p>

          <p className="text-sm text-gray-400">
            Coin: {user.coin}
          </p>

          <p className="text-sm text-gray-400">
            Limit: {user.limit}
          </p>
        </div>

        {/* MPESA BOX */}
        <div className="bg-green-700 text-white text-center py-2 rounded-lg mb-4">
          MPesa Payment (Simulated STK Push)
        </div>

        {/* PHONE */}
        <input
          type="text"
          placeholder="MPesa Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg mb-3"
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount in KES"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg mb-4"
        />

        {/* BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 py-3 rounded-lg hover:bg-green-600"
        >
          Confirm Payment
        </button>

        {/* CANCEL */}
        <button
          onClick={() => navigate("/p2pmarket")}
          className="w-full mt-3 text-gray-400"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default P2p_payment;