import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthForm() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [activeTab, setActiveTab] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- FETCH COUNTRIES ---------------- */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,flags"
        );

        const data = await res.json();

        const formatted = data
          .map((c) => {
            if (!c.idd?.root || !c.idd?.suffixes) return null;

            return {
              name: c.name.common,
              code: c.idd.root + c.idd.suffixes[0],
              flag: c.flags.png,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);

        setSelectedCountry(
          formatted.find((c) => c.name === "United States") || formatted[0]
        );
      } catch {
        const fallback = [
          {
            name: "United States",
            code: "+1",
            flag: "https://flagcdn.com/w20/us.png",
          },
        ];

        setCountries(fallback);
        setSelectedCountry(fallback[0]);
      }
    };

    fetchCountries();
  }, []);

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleLoginChange = (e) =>
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  /* ---------------- SEND EMAIL VERIFICATION ---------------- */
  const sendVerificationCode = async () => {
    setError("");
    setSuccess("");

    if (!signupForm.email) {
      setError("Please enter your email");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedCode(code);
    setSendingCode(true);

    try {
      await emailjs.send(
        "service_qgk7f8a",
        "template_hev3cqi",
        {
          user_name: signupForm.fullName || "User",
          verification_code: code,
          to_email: signupForm.email,
        },
        "9k-y_itAqOFm_eom9"
      );

      setSuccess("Verification code sent successfully!");
    } catch (err) {
      console.log(err);
      setError("Failed to send verification code");
    } finally {
      setSendingCode(false);
    }
  };

  /* ---------------- VERIFY CODE ---------------- */
  const verifyCode = () => {
    if (verificationCode === generatedCode) {
      setEmailVerified(true);
      setSuccess("Email verified successfully!");
      setError("");
    } else {
      setEmailVerified(false);
      setError("Invalid verification code");
    }
  };

  /* ---------------- GENERATE RANDOM PASSWORD ---------------- */
  const generateRandomPassword = (length = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  /* ---------------- FORGOT PASSWORD ---------------- */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResetLoading(true);

    if (!forgotEmail) {
      setError("Please enter your email");
      setResetLoading(false);
      return;
    }

    const newPassword = generateRandomPassword(12);

    try {
      // 1. Update password on backend
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          password: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "User not found or reset failed");
        return;
      }

      // 2. Send new password via EmailJS
      await emailjs.send(
        "service_qgk7f8a",
        "template_hev3cqi",
        {
          user_name: "User",
          to_email: forgotEmail,
          verification_code: newPassword,   // This will show the new password in email
        },
        "9k-y_itAqOFm_eom9"
      );

      setSuccess("New password sent to your email successfully!");
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotEmail("");
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("Failed to process password reset. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  /* ---------------- LOGIN ---------------- */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.token) localStorage.setItem("token", data.token);

      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch {
      setError("Network error. Try again later.");
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!emailVerified) {
      setError("Please verify your email first");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      full_name: signupForm.fullName,
      email: signupForm.email,
      country: selectedCountry.name,
      phone_number: `${selectedCountry.code}${signupForm.phone}`,
      password: signupForm.password,
    };

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Signup successful! You can now login.");

      setSignupForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setVerificationCode("");
      setGeneratedCode("");
      setEmailVerified(false);
      setActiveTab("login");
    } catch {
      setError("Network error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome to Norvex Capital AI
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Your trusted platform for cryptocurrency trading
        </p>

        {/* TABS */}
        <div className="flex mb-6 bg-gray-800 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 text-white transition ${
              activeTab === "login" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("login");
              setShowForgotPassword(false);
            }}
          >
            Login
          </button>

          <button
            className={`flex-1 py-2 text-white transition ${
              activeTab === "signup" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* ALERTS */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* LOGIN FORM */}
        {activeTab === "login" && !showForgotPassword && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
            />

            <button className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-lg text-white font-semibold">
              Login
            </button>

            <p className="text-center text-gray-400 text-sm mt-3">
              Forgot your password?{" "}
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-green-400 hover:underline font-medium"
              >
                Click here
              </button>
            </p>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activeTab === "login" && showForgotPassword && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h3 className="text-xl font-semibold text-white text-center">Reset Password</h3>
            <p className="text-gray-400 text-center text-sm">
              Enter your registered email and a new password will be sent to you. Be sure to change it once you log in
            </p>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
            />

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-lg text-white font-semibold disabled:opacity-70"
            >
              {resetLoading ? "Processing..." : "Send New Password"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail("");
                }}
                className="text-green-400 hover:underline"
              >
                Back to Login
              </button>
            </p>
          </form>
        )}

        {/* SIGNUP FORM (unchanged) */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            {/* ... Your full signup form remains exactly the same ... */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={signupForm.fullName}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
            />

            <div className="space-y-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleSignupChange}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              />

              <button
                type="button"
                onClick={sendVerificationCode}
                disabled={sendingCode}
                className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg text-white"
              >
                {sendingCode ? "Sending Code..." : "Send Verification Code"}
              </button>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={verifyCode}
                  className="bg-green-500 hover:bg-green-600 px-4 rounded-lg text-white"
                >
                  Verify
                </button>
              </div>

              {emailVerified && (
                <p className="text-green-400 text-sm">✓ Email verified successfully</p>
              )}
            </div>

            <div className="flex gap-2 relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-32 flex items-center gap-2 px-3 py-3 rounded-lg bg-gray-800 text-white"
              >
                {selectedCountry && (
                  <>
                    <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-4 rounded" />
                    <span>{selectedCountry.code}</span>
                  </>
                )}
              </button>

              {openDropdown && (
                <div className="absolute top-14 left-0 w-64 max-h-60 overflow-y-auto bg-gray-900 rounded-lg shadow-lg z-20">
                  {countries.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c);
                        setOpenDropdown(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 cursor-pointer text-white"
                    >
                      <img src={c.flag} alt={c.name} className="w-5 h-4 rounded" />
                      <span className="flex-1 text-sm">{c.name}</span>
                      <span className="text-gray-400 text-sm">{c.code}</span>
                    </div>
                  ))}
                </div>
              )}

              <input
                name="phone"
                placeholder="Phone Number"
                value={signupForm.phone}
                onChange={handleSignupChange}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
              />
            </div>

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
            />

            <button className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-lg text-white font-semibold">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}