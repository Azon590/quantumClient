import { useState } from "react";
import { MessageCircle, X, Mail, Copy, Phone } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const TELEGRAM_LINK = "https://t.me/Crypto_world280o";
  const EMAIL = "crypteliomai@gmail.com";

  const UK_SUPPORT = "+447988582160";
  const USA_SUPPORT = "+12135853810";

  const openChat = () => {
    setOpen(true);
    setUnread(0);

    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text:
            "👋 Welcome to Crypteliom AI Support!\n\nChoose a support option below:\n📞 UK Text Support\n📞 USA Text Support\n📨 Email Support\n💬 Telegram Support",
        },
      ]);
    }
  };

  const goToTelegram = () => {
    window.open(TELEGRAM_LINK, "_blank");
  };

  const showEmailInChat = () => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: `📨 Email Support\n\n${EMAIL}\n\nTap copy below 👇`,
        type: "email",
      },
    ]);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✅ Email copied successfully!",
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const showPhoneSupport = (country, number) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: `📞 ${country} Support\n\nReach us here:\n${number}`,
      },
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const msg = input.toLowerCase();
    setInput("");

    let botResponse =
      "Thanks for your message! Please use support options below for faster help.";

    if (msg.includes("hi") || msg.includes("hello")) {
      botResponse = "👋 Hi there! How can we help you today?";
    }

    if (msg.includes("email")) {
      botResponse = `📨 Our email is:\n${EMAIL}`;
    }

    if (msg.includes("phone") || msg.includes("text")) {
      botResponse = `📞 UK: ${UK_SUPPORT}\n📞 USA: ${USA_SUPPORT}`;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);
    }, 400);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={openChat}
        className="fixed right-4 bottom-6 z-[9999] w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition"
      >
        <MessageCircle size={26} />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed right-4 bottom-24
            z-[9999]
            w-[92vw] sm:w-80
            max-h-[80vh]
            bg-white
            rounded-xl
            shadow-2xl
            flex flex-col
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Crypteliom AI Support</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl whitespace-pre-line break-words overflow-hidden w-fit max-w-[85%] sm:max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}

                  {/* Copy email button */}
                  {msg.type === "email" && (
                    <button
                      onClick={copyEmail}
                      className="mt-1 text-xs text-blue-600 flex items-center gap-1 hover:underline"
                    >
                      <Copy size={14} />
                      Copy email
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>

          {/* Support Buttons */}
          <div className="p-3 border-t flex flex-col gap-2">

            <button
              onClick={goToTelegram}
              className="w-full bg-green-500 text-white rounded-full py-2 hover:bg-green-600 transition"
            >
              💬 Telegram Support
            </button>

            <button
              onClick={showEmailInChat}
              className="w-full bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Email Support
            </button>

            <button
              onClick={() => showPhoneSupport("UK", UK_SUPPORT)}
              className="w-full bg-purple-500 text-white rounded-full py-2 hover:bg-purple-600 transition flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              UK Text Support
            </button>

            <button
              onClick={() => showPhoneSupport("USA", USA_SUPPORT)}
              className="w-full bg-indigo-500 text-white rounded-full py-2 hover:bg-indigo-600 transition flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              USA Text Support
            </button>

          </div>
        </div>
      )}
    </>
  );
}