import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  const forexPairs = [
    { pair: "EUR/USD", price: "1.1724", change: "0.05%" },
    { pair: "GBP/USD", price: "1.3449", change: "0.22%" },
    { pair: "USD/JPY", price: "147.154", change: "0.09%" },
    { pair: "AUD/USD", price: "0.6599", change: "0.21%" },
    { pair: "USD/CAD", price: "1.3958", change: "0.18%" },
    { pair: "USD/CHF", price: "0.8456", change: "0.15%" },
    { pair: "EUR/GBP", price: "0.8721", change: "0.12%" },
    { pair: "NZD/USD", price: "0.6123", change: "0.34%" },
  ];

  const cryptos = [
    { name: "BTC", price: "$67,234.50", change: "2.34%" },
    { name: "ETH", price: "$3,456.78", change: "1.23%" },
    { name: "SOL", price: "$145.92", change: "5.67%" },
    { name: "BNB", price: "$589.34", change: "1.89%" },
    { name: "XRP", price: "$0.62", change: "0.56%" },
    { name: "ADA", price: "$0.57", change: "3.45%" },
    { name: "DOGE", price: "$0.12", change: "2.11%" },
    { name: "AVAX", price: "$34.56", change: "2.34%" },
  ];

  const reviews = [
    {
      name: "James K.",
      role: "Crypto Investor",
      review:
        "Eccoearn completely changed how I trade. The automation is smooth and I’ve seen consistent growth.",
    },
    {
      name: "Sarah W.",
      role: "Forex Trader",
      review:
        "The platform is fast and reliable. I love how easy it is to manage both crypto and forex in one place.",
    },
    {
      name: "Brian M.",
      role: "Beginner Trader",
      review:
        "As a beginner, this platform made trading simple. The UI is clean and easy to understand.",
    },
    {
      name: "Linda A.",
      role: "Investor",
      review:
        "The AI trading features are impressive. It feels like having a smart assistant managing my trades 24/7.",
    },
    {
      name: "David O.",
      role: "Crypto Enthusiast",
      review:
        "Withdrawals and deposits are smooth. The platform feels professional and trustworthy.",
    },
    {
      name: "Nancy J.",
      role: "Day Trader",
      review:
        "Best trading dashboard I’ve used so far. Everything is fast and responsive.",
    },
  ];

  return (
    <div className="bg-slate-900 text-white">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">Quantum</h1>
        <div className="space-x-6">
          <button
            onClick={() => navigate("/auth")}
            className="text-gray-300 hover:text-white"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* FOREX TICKER */}
      <section className="overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="ticker whitespace-nowrap flex animate-ticker">
          {[...forexPairs, ...forexPairs].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-4 px-6 py-4 text-sm"
            >
              <p className="font-semibold">{item.pair}</p>
              <p>{item.price}</p>
              <p
                className={
                  parseFloat(item.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HERO */}
      <section className="text-center py-24 px-6 bg-slate-950">
        <img src="/eco background.jpeg" alt="back" />
        <h2 className="text-5xl font-bold mb-6">Grow Your Wealth Faster</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          Our platform uses AI-driven trading tech to maximize your return on investment (ROI)—trusted by investors worldwide.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-500"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="border border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-800"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-10 px-8 py-20 bg-slate-900">
        {[
          {
            title: "Smarter Trading Gateway",
            text:
              "Experience hands-free Crypto trading with cutting-edge automation built for consistent gains.",
          },
          {
            title: "Advanced AI Trading",
            text:
              "Join thousands of traders achieving 300% to 700% returns through sophisticated trading algorithms.",
          },
          {
            title: "Turn Idle Funds Into Powerful Earning Tools",
            text:
              "AI-powered strategies working 24/7 to grow your capital effortlessly.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-950 p-8 rounded-xl border border-slate-800"
          >
            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
            <p className="text-gray-400 mb-6">{item.text}</p>
          </div>
        ))}
      </section>

      {/* CRYPTO TICKER */}
      <section className="overflow-hidden border-y border-slate-800 bg-slate-950">
        <div className="ticker whitespace-nowrap flex animate-ticker">
          {[...cryptos, ...cryptos].map((coin, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-4 px-6 py-4 text-sm"
            >
              <p className="font-semibold">{coin.name}</p>
              <p>{coin.price}</p>
              <p
                className={
                  parseFloat(coin.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {coin.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-8 py-24 text-center bg-slate-900">
        <h2 className="text-4xl font-bold mb-6">Why Choose Eccoearn?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          Experience the ultimate trading platform with cutting-edge features designed for your success.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Lightning Fast", text: "AI-powered algorithms execute trades in milliseconds." },
            { title: "Bank-Level Security", text: "Enterprise-grade encryption protects your funds and data." },
            { title: "24/7 Trading", text: "Automated systems work around the clock for you." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-950 p-8 rounded-xl border border-slate-800"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-slate-950">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
        <p className="mb-10">
          Join thousands of traders multiplying their portfolios with Eccoearn.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500"
        >
          Create Free Account
        </button>
      </section>

      {/* ⭐ REVIEWS (IMPROVED - ADDED AVATARS + POLISH) */}
      <section className="px-8 py-24 bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Users Say
        </h2>

        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Thousands of traders trust Eccoearn for reliable automated trading and consistent performance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => {
            const initials = r.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={i}
                className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition duration-300"
              >
                {/* STARS */}
                <div className="text-yellow-400 mb-3">
                  ★★★★★
                </div>

                {/* REVIEW */}
                <p className="text-gray-300 mb-5 italic">
                  "{r.review}"
                </p>

                {/* USER */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                    {initials}
                  </div>

                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-400">{r.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 border-t border-slate-800 bg-slate-900">
        © 2020 Quantum. All rights reserved.
      </footer>
    </div>
  );
}