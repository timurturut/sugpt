import { useState } from "react";

function InputBox({ onSendMessage, loading }) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  }

  function handleKeyDown(event) {
    // console.log(event.key)
    if (event.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="flex justify-center p-4 min-h-20">
      <div className="flex items-center w-1/2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
          className="flex-1 bg-transparent border-none outline-none text-gray-700 text-base"
        />
        <button
          onClick={handleSend}
          className="rounded-full bg-gray-200 hover:bg-gray-300 p-2 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />

            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default InputBox;
