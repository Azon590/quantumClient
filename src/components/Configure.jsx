import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Configure() {
  const navigate = useNavigate();
  const { botName } = useParams();
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user logged in");
      return;
    }

    setUser(storedUser);

    // Load existing config for this bot
    const savedConfigs =
      JSON.parse(localStorage.getItem("botConfigs")) || {};

    if (savedConfigs[botName]) {
      setAmount(savedConfigs[botName].amount);
    }
  }, [botName]);

  // Handle amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow clearing the field
    if (value === "") {
      setAmount("");
      setError("");
      return;
    }

    const num = Number(value);

    setAmount(value);

    if (num < 50) {
      setError("Minimum investment amount is $50.");
    } else if (num > 10000) {
      setError("Maximum investment amount is $10,000.");
    } else {
      setError("");
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const investAmount = parseFloat(amount);
    const currentBalance = parseFloat(user.balance.balance);

    // Validation
    if (isNaN(investAmount)) {
      setError("Please enter a valid investment amount.");
      return;
    }

    if (investAmount < 50) {
      setError("Minimum investment amount is $50.");
      return;
    }

    if (investAmount > 10000) {
      setError("Maximum investment amount is $10,000.");
      return;
    }

    if (investAmount > currentBalance) {
      setError("Insufficient balance.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users/${user.id}/balance`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: -investAmount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update balance.");
        return;
      }

      // Update localStorage user
      const updatedUser = {
        ...user,
        balance: {
          ...user.balance,
          balance: parseFloat(data.balance),
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Save bot configuration
      const existingConfigs =
        JSON.parse(localStorage.getItem("botConfigs")) || {};

      existingConfigs[botName] = {
        amount: investAmount,
      };

      localStorage.setItem(
        "botConfigs",
        JSON.stringify(existingConfigs)
      );

      navigate("/bot");
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving configuration.");
    }
  };

  if (!user && error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-green-400 font-semibold text-lg mb-4">
          Configure {botName}
        </h2>

        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">
            Select Asset
          </label>

          <select className="w-full bg-gray-700 text-white px-3 py-2 rounded">
            <option>Bitcoin (BTC)</option>
            <option>Ethereum (ETH)</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="text-gray-400 text-sm mb-1 block">
            Investment Amount per Trade (USD)
          </label>

          <input
            type="number"
            min={50}
            max={10000}
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
            placeholder="100"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <p className="text-xs text-green-400 mb-2">
          Minimum: $50 • Maximum: $10,000
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-3">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/bot")}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-green-400 text-gray-900 py-2 rounded font-semibold hover:bg-green-500"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}