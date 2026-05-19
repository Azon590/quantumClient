import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./Navbar"

const dummyUsers = [
  { id: 1, name: "Alex M.", coin: "USDT", price: 150, limit: "5,000 - 50,000 KES", orders: 120, completion: 98 },
  { id: 2, name: "Brian K.", coin: "BTC", price: 9000000, limit: "10,000 - 200,000 KES", orders: 45, completion: 95 },
  { id: 3, name: "Sarah W.", coin: "USDT", price: 152, limit: "2,000 - 30,000 KES", orders: 210, completion: 99 },
  { id: 4, name: "David O.", coin: "ETH", price: 480000, limit: "20,000 - 500,000 KES", orders: 80, completion: 96 },
  { id: 5, name: "John M.", coin: "USDT", price: 149, limit: "1,000 - 100,000 KES", orders: 300, completion: 97 },
  { id: 6, name: "Linda A.", coin: "BTC", price: 9100000, limit: "15,000 - 300,000 KES", orders: 65, completion: 94 },
  { id: 7, name: "Kevin P.", coin: "USDT", price: 151, limit: "3,000 - 80,000 KES", orders: 150, completion: 98 },
  { id: 8, name: "Grace N.", coin: "ETH", price: 475000, limit: "10,000 - 250,000 KES", orders: 90, completion: 97 },
  { id: 9, name: "Mark T.", coin: "USDT", price: 150, limit: "5,000 - 120,000 KES", orders: 170, completion: 96 },
  { id: 10, name: "Nancy J.", coin: "BTC", price: 9050000, limit: "25,000 - 400,000 KES", orders: 55, completion: 95 },
];

function getAvatarColor(name) {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

function P2p() {
  const navigate = useNavigate();
  const [selectedCoin, setSelectedCoin] = useState("ALL");

  const filteredUsers =
    selectedCoin === "ALL"
      ? dummyUsers
      : dummyUsers.filter((u) => u.coin === selectedCoin);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
        <DashboardNavbar />
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        P2P Crypto Marketplace
      </h1>

      <p className="text-center text-gray-400 mt-2 mb-6">
        Buy & Sell Crypto locally with zero fees. Safe and secure P2P exchange
      </p>

      {/* FILTER */}
      <div className="flex justify-center gap-3 mb-6">
        {["ALL", "USDT", "BTC", "ETH"].map((coin) => (
          <button
            key={coin}
            onClick={() => setSelectedCoin(coin)}
            className={`px-4 py-2 rounded-lg ${
              selectedCoin === coin ? "bg-green-500" : "bg-gray-800"
            }`}
          >
            {coin}
          </button>
        ))}
      </div>

      {/* LISTINGS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-gray-900 p-5 rounded-xl border border-gray-800"
          >

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getAvatarColor(
                  user.name
                )}`}
              >
                {user.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <div className="text-xs text-gray-400 flex gap-2">
                  <span>Orders: {user.orders}</span>
                  <span>•</span>
                  <span className="text-green-400">
                    {user.completion}% completion
                  </span>
                </div>
              </div>
            </div>

            {/* MPESA */}
            <div className="mb-3">
              <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
                MPesa Available
              </span>
            </div>

            {/* DETAILS */}
            <p className="text-gray-400">
              Selling: <span className="text-white">{user.coin}</span>
            </p>

            <p className="mt-2 text-green-400 font-bold">
              Price: {user.price.toLocaleString()} KES
            </p>

            <p className="text-sm text-gray-400">
              Limit: {user.limit}
            </p>

            {/* BUY BUTTON */}
            <button
              onClick={() => navigate("/p2p_payment", { state: user })}
              className="mt-4 w-full bg-green-500 py-2 rounded-lg hover:bg-green-600"
            >
              Buy {user.coin}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default P2p;