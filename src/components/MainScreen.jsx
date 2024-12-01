import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

import axios from "axios";

function MainScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleNewMessage(userMessage) {
    setLoading(true)
    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);



    const data = {
      course: "CS307",
      query_text: userMessage,
      user_id: "fill_here",
      chat_id: "fill_here"
    }
    const completion = await axios.post("http://localhost:5000/course/query",data)
        .then(response => {
          const data = response.data;
          const fieldValue = data.response;
          console.log(fieldValue);
          setMessages([...newMessages, { text: fieldValue + "Sources (" + data.sources.join(", ") + ")", sender: "bot" }]);
    })
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen w-3/4 justify-end">
      <div className="flex flex-col flex-grow w-full overflow-y-auto items-center">
        <div className="flex flex-col w-3/4 overflow-y-visible ">
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <InputBox onSendMessage={handleNewMessage} loading={loading} />
    </div>
  );
}

export default MainScreen;
