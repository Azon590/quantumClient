import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const API_URL = import.meta.env.VITE_API_URL;

const countriesList = [
  { name: "Afghanistan", code: "+93", flag: "https://flagcdn.com/w20/af.png" },
  { name: "Albania", code: "+355", flag: "https://flagcdn.com/w20/al.png" },
  { name: "Algeria", code: "+213", flag: "https://flagcdn.com/w20/dz.png" },
  { name: "Andorra", code: "+376", flag: "https://flagcdn.com/w20/ad.png" },
  { name: "Angola", code: "+244", flag: "https://flagcdn.com/w20/ao.png" },
  { name: "Antigua and Barbuda", code: "+1", flag: "https://flagcdn.com/w20/ag.png" },
  { name: "Argentina", code: "+54", flag: "https://flagcdn.com/w20/ar.png" },
  { name: "Armenia", code: "+374", flag: "https://flagcdn.com/w20/am.png" },
  { name: "Australia", code: "+61", flag: "https://flagcdn.com/w20/au.png" },
  { name: "Austria", code: "+43", flag: "https://flagcdn.com/w20/at.png" },
  { name: "Azerbaijan", code: "+994", flag: "https://flagcdn.com/w20/az.png" },
  { name: "Bahamas", code: "+1", flag: "https://flagcdn.com/w20/bs.png" },
  { name: "Bahrain", code: "+973", flag: "https://flagcdn.com/w20/bh.png" },
  { name: "Bangladesh", code: "+880", flag: "https://flagcdn.com/w20/bd.png" },
  { name: "Barbados", code: "+1", flag: "https://flagcdn.com/w20/bb.png" },
  { name: "Belarus", code: "+375", flag: "https://flagcdn.com/w20/by.png" },
  { name: "Belgium", code: "+32", flag: "https://flagcdn.com/w20/be.png" },
  { name: "Belize", code: "+501", flag: "https://flagcdn.com/w20/bz.png" },
  { name: "Benin", code: "+229", flag: "https://flagcdn.com/w20/bj.png" },
  { name: "Bhutan", code: "+975", flag: "https://flagcdn.com/w20/bt.png" },
  { name: "Bolivia", code: "+591", flag: "https://flagcdn.com/w20/bo.png" },
  { name: "Bosnia and Herzegovina", code: "+387", flag: "https://flagcdn.com/w20/ba.png" },
  { name: "Botswana", code: "+267", flag: "https://flagcdn.com/w20/bw.png" },
  { name: "Brazil", code: "+55", flag: "https://flagcdn.com/w20/br.png" },
  { name: "Brunei", code: "+673", flag: "https://flagcdn.com/w20/bn.png" },
  { name: "Bulgaria", code: "+359", flag: "https://flagcdn.com/w20/bg.png" },
  { name: "Burkina Faso", code: "+226", flag: "https://flagcdn.com/w20/bf.png" },
  { name: "Burundi", code: "+257", flag: "https://flagcdn.com/w20/bi.png" },
  { name: "Cambodia", code: "+855", flag: "https://flagcdn.com/w20/kh.png" },
  { name: "Cameroon", code: "+237", flag: "https://flagcdn.com/w20/cm.png" },
  { name: "Canada", code: "+1", flag: "https://flagcdn.com/w20/ca.png" },
  { name: "Cape Verde", code: "+238", flag: "https://flagcdn.com/w20/cv.png" },
  { name: "Central African Republic", code: "+236", flag: "https://flagcdn.com/w20/cf.png" },
  { name: "Chad", code: "+235", flag: "https://flagcdn.com/w20/td.png" },
  { name: "Chile", code: "+56", flag: "https://flagcdn.com/w20/cl.png" },
  { name: "China", code: "+86", flag: "https://flagcdn.com/w20/cn.png" },
  { name: "Colombia", code: "+57", flag: "https://flagcdn.com/w20/co.png" },
  { name: "Comoros", code: "+269", flag: "https://flagcdn.com/w20/km.png" },
  { name: "Congo", code: "+242", flag: "https://flagcdn.com/w20/cg.png" },
  { name: "Costa Rica", code: "+506", flag: "https://flagcdn.com/w20/cr.png" },
  { name: "Croatia", code: "+385", flag: "https://flagcdn.com/w20/hr.png" },
  { name: "Cuba", code: "+53", flag: "https://flagcdn.com/w20/cu.png" },
  { name: "Cyprus", code: "+357", flag: "https://flagcdn.com/w20/cy.png" },
  { name: "Czech Republic", code: "+420", flag: "https://flagcdn.com/w20/cz.png" },
  { name: "Denmark", code: "+45", flag: "https://flagcdn.com/w20/dk.png" },
  { name: "Djibouti", code: "+253", flag: "https://flagcdn.com/w20/dj.png" },
  { name: "Dominica", code: "+1", flag: "https://flagcdn.com/w20/dm.png" },
  { name: "Dominican Republic", code: "+1", flag: "https://flagcdn.com/w20/do.png" },
  { name: "Ecuador", code: "+593", flag: "https://flagcdn.com/w20/ec.png" },
  { name: "Egypt", code: "+20", flag: "https://flagcdn.com/w20/eg.png" },
  { name: "El Salvador", code: "+503", flag: "https://flagcdn.com/w20/sv.png" },
  { name: "Equatorial Guinea", code: "+240", flag: "https://flagcdn.com/w20/gq.png" },
  { name: "Eritrea", code: "+291", flag: "https://flagcdn.com/w20/er.png" },
  { name: "Estonia", code: "+372", flag: "https://flagcdn.com/w20/ee.png" },
  { name: "Ethiopia", code: "+251", flag: "https://flagcdn.com/w20/et.png" },
  { name: "Fiji", code: "+679", flag: "https://flagcdn.com/w20/fj.png" },
  { name: "Finland", code: "+358", flag: "https://flagcdn.com/w20/fi.png" },
  { name: "France", code: "+33", flag: "https://flagcdn.com/w20/fr.png" },
  { name: "Gabon", code: "+241", flag: "https://flagcdn.com/w20/ga.png" },
  { name: "Gambia", code: "+220", flag: "https://flagcdn.com/w20/gm.png" },
  { name: "Georgia", code: "+995", flag: "https://flagcdn.com/w20/ge.png" },
  { name: "Germany", code: "+49", flag: "https://flagcdn.com/w20/de.png" },
  { name: "Ghana", code: "+233", flag: "https://flagcdn.com/w20/gh.png" },
  { name: "Greece", code: "+30", flag: "https://flagcdn.com/w20/gr.png" },
  { name: "Grenada", code: "+1", flag: "https://flagcdn.com/w20/gd.png" },
  { name: "Guatemala", code: "+502", flag: "https://flagcdn.com/w20/gt.png" },
  { name: "Guinea", code: "+224", flag: "https://flagcdn.com/w20/gn.png" },
  { name: "Guyana", code: "+592", flag: "https://flagcdn.com/w20/gy.png" },
  { name: "Haiti", code: "+509", flag: "https://flagcdn.com/w20/ht.png" },
  { name: "Honduras", code: "+504", flag: "https://flagcdn.com/w20/hn.png" },
  { name: "Hungary", code: "+36", flag: "https://flagcdn.com/w20/hu.png" },
  { name: "Iceland", code: "+354", flag: "https://flagcdn.com/w20/is.png" },
  { name: "India", code: "+91", flag: "https://flagcdn.com/w20/in.png" },
  { name: "Indonesia", code: "+62", flag: "https://flagcdn.com/w20/id.png" },
  { name: "Iran", code: "+98", flag: "https://flagcdn.com/w20/ir.png" },
  { name: "Iraq", code: "+964", flag: "https://flagcdn.com/w20/iq.png" },
  { name: "Ireland", code: "+353", flag: "https://flagcdn.com/w20/ie.png" },
  { name: "Israel", code: "+972", flag: "https://flagcdn.com/w20/il.png" },
  { name: "Italy", code: "+39", flag: "https://flagcdn.com/w20/it.png" },
  { name: "Jamaica", code: "+1", flag: "https://flagcdn.com/w20/jm.png" },
  { name: "Japan", code: "+81", flag: "https://flagcdn.com/w20/jp.png" },
  { name: "Jordan", code: "+962", flag: "https://flagcdn.com/w20/jo.png" },
  { name: "Kazakhstan", code: "+7", flag: "https://flagcdn.com/w20/kz.png" },
  { name: "Kenya", code: "+254", flag: "https://flagcdn.com/w20/ke.png" },
  { name: "Kiribati", code: "+686", flag: "https://flagcdn.com/w20/ki.png" },
  { name: "Kuwait", code: "+965", flag: "https://flagcdn.com/w20/kw.png" },
  { name: "Kyrgyzstan", code: "+996", flag: "https://flagcdn.com/w20/kg.png" },
  { name: "Laos", code: "+856", flag: "https://flagcdn.com/w20/la.png" },
  { name: "Latvia", code: "+371", flag: "https://flagcdn.com/w20/lv.png" },
  { name: "Lebanon", code: "+961", flag: "https://flagcdn.com/w20/lb.png" },
  { name: "Lesotho", code: "+266", flag: "https://flagcdn.com/w20/ls.png" },
  { name: "Liberia", code: "+231", flag: "https://flagcdn.com/w20/lr.png" },
  { name: "Libya", code: "+218", flag: "https://flagcdn.com/w20/ly.png" },
  { name: "Liechtenstein", code: "+423", flag: "https://flagcdn.com/w20/li.png" },
  { name: "Lithuania", code: "+370", flag: "https://flagcdn.com/w20/lt.png" },
  { name: "Luxembourg", code: "+352", flag: "https://flagcdn.com/w20/lu.png" },
  { name: "Madagascar", code: "+261", flag: "https://flagcdn.com/w20/mg.png" },
  { name: "Malawi", code: "+265", flag: "https://flagcdn.com/w20/mw.png" },
  { name: "Malaysia", code: "+60", flag: "https://flagcdn.com/w20/my.png" },
  { name: "Maldives", code: "+960", flag: "https://flagcdn.com/w20/mv.png" },
  { name: "Mali", code: "+223", flag: "https://flagcdn.com/w20/ml.png" },
  { name: "Malta", code: "+356", flag: "https://flagcdn.com/w20/mt.png" },
  { name: "Mauritania", code: "+222", flag: "https://flagcdn.com/w20/mr.png" },
  { name: "Mauritius", code: "+230", flag: "https://flagcdn.com/w20/mu.png" },
  { name: "Mexico", code: "+52", flag: "https://flagcdn.com/w20/mx.png" },
  { name: "Moldova", code: "+373", flag: "https://flagcdn.com/w20/md.png" },
  { name: "Monaco", code: "+377", flag: "https://flagcdn.com/w20/mc.png" },
  { name: "Mongolia", code: "+976", flag: "https://flagcdn.com/w20/mn.png" },
  { name: "Montenegro", code: "+382", flag: "https://flagcdn.com/w20/me.png" },
  { name: "Morocco", code: "+212", flag: "https://flagcdn.com/w20/ma.png" },
  { name: "Mozambique", code: "+258", flag: "https://flagcdn.com/w20/mz.png" },
  { name: "Myanmar", code: "+95", flag: "https://flagcdn.com/w20/mm.png" },
  { name: "Namibia", code: "+264", flag: "https://flagcdn.com/w20/na.png" },
  { name: "Nepal", code: "+977", flag: "https://flagcdn.com/w20/np.png" },
  { name: "Netherlands", code: "+31", flag: "https://flagcdn.com/w20/nl.png" },
  { name: "New Zealand", code: "+64", flag: "https://flagcdn.com/w20/nz.png" },
  { name: "Nicaragua", code: "+505", flag: "https://flagcdn.com/w20/ni.png" },
  { name: "Niger", code: "+227", flag: "https://flagcdn.com/w20/ne.png" },
  { name: "Nigeria", code: "+234", flag: "https://flagcdn.com/w20/ng.png" },
  { name: "North Korea", code: "+850", flag: "https://flagcdn.com/w20/kp.png" },
  { name: "North Macedonia", code: "+389", flag: "https://flagcdn.com/w20/mk.png" },
  { name: "Norway", code: "+47", flag: "https://flagcdn.com/w20/no.png" },
  { name: "Oman", code: "+968", flag: "https://flagcdn.com/w20/om.png" },
  { name: "Pakistan", code: "+92", flag: "https://flagcdn.com/w20/pk.png" },
  { name: "Panama", code: "+507", flag: "https://flagcdn.com/w20/pa.png" },
  { name: "Papua New Guinea", code: "+675", flag: "https://flagcdn.com/w20/pg.png" },
  { name: "Paraguay", code: "+595", flag: "https://flagcdn.com/w20/py.png" },
  { name: "Peru", code: "+51", flag: "https://flagcdn.com/w20/pe.png" },
  { name: "Philippines", code: "+63", flag: "https://flagcdn.com/w20/ph.png" },
  { name: "Poland", code: "+48", flag: "https://flagcdn.com/w20/pl.png" },
  { name: "Portugal", code: "+351", flag: "https://flagcdn.com/w20/pt.png" },
  { name: "Qatar", code: "+974", flag: "https://flagcdn.com/w20/qa.png" },
  { name: "Romania", code: "+40", flag: "https://flagcdn.com/w20/ro.png" },
  { name: "Russia", code: "+7", flag: "https://flagcdn.com/w20/ru.png" },
  { name: "Rwanda", code: "+250", flag: "https://flagcdn.com/w20/rw.png" },
  { name: "Saint Kitts and Nevis", code: "+1", flag: "https://flagcdn.com/w20/kn.png" },
  { name: "Saint Lucia", code: "+1", flag: "https://flagcdn.com/w20/lc.png" },
  { name: "Saint Vincent and the Grenadines", code: "+1", flag: "https://flagcdn.com/w20/vc.png" },
  { name: "Samoa", code: "+685", flag: "https://flagcdn.com/w20/ws.png" },
  { name: "San Marino", code: "+378", flag: "https://flagcdn.com/w20/sm.png" },
  { name: "Saudi Arabia", code: "+966", flag: "https://flagcdn.com/w20/sa.png" },
  { name: "Senegal", code: "+221", flag: "https://flagcdn.com/w20/sn.png" },
  { name: "Serbia", code: "+381", flag: "https://flagcdn.com/w20/rs.png" },
  { name: "Seychelles", code: "+248", flag: "https://flagcdn.com/w20/sc.png" },
  { name: "Sierra Leone", code: "+232", flag: "https://flagcdn.com/w20/sl.png" },
  { name: "Singapore", code: "+65", flag: "https://flagcdn.com/w20/sg.png" },
  { name: "Slovakia", code: "+421", flag: "https://flagcdn.com/w20/sk.png" },
  { name: "Slovenia", code: "+386", flag: "https://flagcdn.com/w20/si.png" },
  { name: "Solomon Islands", code: "+677", flag: "https://flagcdn.com/w20/sb.png" },
  { name: "Somalia", code: "+252", flag: "https://flagcdn.com/w20/so.png" },
  { name: "South Africa", code: "+27", flag: "https://flagcdn.com/w20/za.png" },
  { name: "South Korea", code: "+82", flag: "https://flagcdn.com/w20/kr.png" },
  { name: "South Sudan", code: "+211", flag: "https://flagcdn.com/w20/ss.png" },
  { name: "Spain", code: "+34", flag: "https://flagcdn.com/w20/es.png" },
  { name: "Sri Lanka", code: "+94", flag: "https://flagcdn.com/w20/lk.png" },
  { name: "Sudan", code: "+249", flag: "https://flagcdn.com/w20/sd.png" },
  { name: "Suriname", code: "+597", flag: "https://flagcdn.com/w20/sr.png" },
  { name: "Sweden", code: "+46", flag: "https://flagcdn.com/w20/se.png" },
  { name: "Switzerland", code: "+41", flag: "https://flagcdn.com/w20/ch.png" },
  { name: "Syria", code: "+963", flag: "https://flagcdn.com/w20/sy.png" },
  { name: "Taiwan", code: "+886", flag: "https://flagcdn.com/w20/tw.png" },
  { name: "Tajikistan", code: "+992", flag: "https://flagcdn.com/w20/tj.png" },
  { name: "Tanzania", code: "+255", flag: "https://flagcdn.com/w20/tz.png" },
  { name: "Thailand", code: "+66", flag: "https://flagcdn.com/w20/th.png" },
  { name: "Timor-Leste", code: "+670", flag: "https://flagcdn.com/w20/tl.png" },
  { name: "Togo", code: "+228", flag: "https://flagcdn.com/w20/tg.png" },
  { name: "Tonga", code: "+676", flag: "https://flagcdn.com/w20/to.png" },
  { name: "Trinidad and Tobago", code: "+1", flag: "https://flagcdn.com/w20/tt.png" },
  { name: "Tunisia", code: "+216", flag: "https://flagcdn.com/w20/tn.png" },
  { name: "Turkey", code: "+90", flag: "https://flagcdn.com/w20/tr.png" },
  { name: "Turkmenistan", code: "+993", flag: "https://flagcdn.com/w20/tm.png" },
  { name: "Uganda", code: "+256", flag: "https://flagcdn.com/w20/ug.png" },
  { name: "Ukraine", code: "+380", flag: "https://flagcdn.com/w20/ua.png" },
  { name: "United Arab Emirates", code: "+971", flag: "https://flagcdn.com/w20/ae.png" },
  { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/w20/gb.png" },
  { name: "United States", code: "+1", flag: "https://flagcdn.com/w20/us.png" },
  { name: "Uruguay", code: "+598", flag: "https://flagcdn.com/w20/uy.png" },
  { name: "Uzbekistan", code: "+998", flag: "https://flagcdn.com/w20/uz.png" },
  { name: "Vanuatu", code: "+678", flag: "https://flagcdn.com/w20/vu.png" },
  { name: "Vatican City", code: "+379", flag: "https://flagcdn.com/w20/va.png" },
  { name: "Venezuela", code: "+58", flag: "https://flagcdn.com/w20/ve.png" },
  { name: "Vietnam", code: "+84", flag: "https://flagcdn.com/w20/vn.png" },
  { name: "Yemen", code: "+967", flag: "https://flagcdn.com/w20/ye.png" },
  { name: "Zambia", code: "+260", flag: "https://flagcdn.com/w20/zm.png" },
  { name: "Zimbabwe", code: "+263", flag: "https://flagcdn.com/w20/zw.png" }
].sort((a, b) => a.name.localeCompare(b.name));

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

  /* ---------------- LOAD COUNTRIES ---------------- */
  useEffect(() => {
    setCountries(countriesList);

    const defaultCountry = 
      countriesList.find((c) => c.name === "United States") || countriesList[0];

    setSelectedCountry(defaultCountry);
  }, []);

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
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

  const verifyCode = () => {
    if (verificationCode === generatedCode) {
      setEmailVerified(true);
      setSuccess("Email verified successfully!");
      setError("");
    } else {
      setError("Invalid verification code");
    }
  };

  const generateRandomPassword = (length = 12) => {
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

    const newPassword = generateRandomPassword();

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        return;
      }

      await emailjs.send(
        "service_qgk7f8a",
        "template_hev3cqi",
        {
          user_name: "User",
          to_email: forgotEmail,
          verification_code: newPassword,
        },
        "9k-y_itAqOFm_eom9"
      );

      setSuccess("New password sent to your email!");
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotEmail("");
        setSuccess("");
      }, 2500);
    } catch (err) {
      setError("Failed to process password reset");
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
      country: selectedCountry?.name,
      phone_number: `${selectedCountry?.code}${signupForm.phone}`,
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

      // Reset form
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

        {/* FORGOT PASSWORD */}
        {activeTab === "login" && showForgotPassword && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h3 className="text-xl font-semibold text-white text-center">Reset Password</h3>
            <p className="text-gray-400 text-center text-sm">
              Enter your registered email and a new password will be sent to you.
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

        {/* SIGNUP FORM */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <input
              name="fullName"
              placeholder="Full Name"
              value={signupForm.fullName}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
            />

            <div className="space-y-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleSignupChange}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
                required
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

              {emailVerified && <p className="text-green-400 text-sm">✓ Email verified successfully</p>}
            </div>

            {/* Country + Phone Dropdown */}
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
                required
              />
            </div>

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg outline-none"
              required
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