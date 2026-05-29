import { useState } from "react";
import { MessageCircle, X, Mail, Copy } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const TELEGRAM_LINK = "https://t.me/Crypto_world280o";
  const EMAIL = "codeazon415@gmail.com";

  const openChat = () => {
    setOpen(true);
    setUnread(0);
  };

  const goToTelegram = () => {
    window.open(TELEGRAM_LINK, "_blank");
  };

  // ✅ ADD EMAIL MESSAGE INTO CHAT
  const showEmailInChat = () => {
    const emailMsg = {
      sender: "bot",
      text: `📩 You can reach us at:\n\n${EMAIL}\n\nTap copy below 👇`,
      type: "email",
    };

    setMessages((prev) => [...prev, emailMsg]);
  };

  // ✅ COPY EMAIL
  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    let botResponse =
      "Thanks for your message! Use Telegram or Email support below.";

    if (
      input.toLowerCase().includes("hi") ||
      input.toLowerCase().includes("hello")
    ) {
      botResponse = "Hi 👋 How can we help you today?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={openChat}
        className="fixed right-4 bottom-[calc(3.0rem+env(safe-area-inset-bottom))] z-[9999] w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition"
      >
        <MessageCircle size={26} />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed right-2 sm:right-6 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[9999] max-w-full sm:w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Support Bot</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-2"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  className={`${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-gray-800 self-start"
                      : "bg-green-500 text-white self-end"
                  } px-3 py-2 rounded-xl max-w-[75%] whitespace-pre-line`}
                >
                  {msg.text}
                </div>

                {/* COPY BUTTON ONLY FOR EMAIL MESSAGE */}
                {msg.type === "email" && (
                  <button
                    onClick={copyEmail}
                    className="mt-1 flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    <Copy size={14} />
                    Copy email
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 flex gap-2">
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

          {/* SUPPORT OPTIONS */}
          <div className="p-4 border-t border-gray-200 flex flex-col gap-2">

            {/* Telegram */}
            <button
              onClick={goToTelegram}
              className="w-full bg-green-500 text-white rounded-full py-2 hover:bg-green-600 transition"
            >
              Chat on Telegram
            </button>

            {/* Email (now inside chat) */}
            <button
              onClick={showEmailInChat}
              className="w-full bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Show Email Support
            </button>

          </div>
        </div>
      )}
    </>
  );
}