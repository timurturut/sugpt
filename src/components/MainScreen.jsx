import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import Message from "./Message";
import InputBox from "./InputBox";

function MainScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [chat, setChat] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function getChatContent() {
      try {
        const response = await axios.get(
          "http://localhost:5000/getChatContent",
          {
            params: {
              chat_id: chat,
            },
          }
        );

        setMessages(response.data.chat.messages);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    
    if(chat) { 
      getChatContent(); 
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleNewMessage(userMessage) {
    console.log(`Chat ID : ${chat}`);
    console.log(`User Message: ${userMessage}`);

    setLoading(true);
    const newMessages = [
      ...messages,
      { message_content: userMessage, sender: "user", sources: null },
    ];
    setMessages(newMessages);

    const data = {
      term: "F24-25",
      course: course,
      question: userMessage,
      user_id: "674b169e502419ebf6cfb296",
      chat_id: chat,
    };



    await axios.post("http://localhost:5000/", data).then((response) => {
      console.log(response);

      const data = response.data;
      const fieldValue = data.model_response;
      setMessages([
        ...newMessages,
        {
          message_content:
            fieldValue,
          sender: "chatbot",
          sources: data.sources,
        },
      ]);
      
      console.log("----query sonucu----");
      console.log(data);
      console.log("----query sonucu----");
      // console.log(data.sources);
            
      // 
      
      setChat(data.chat_id);
      console.log(`set Chat ID as: ${chat}`);
      
    });

    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex">
      <SideBar setCourse={setCourse} setChat={setChat} setMessages={setMessages} />

      <div className="flex flex-col w-3/4 justify-end">
        <div className="flex flex-col flex-grow w-full overflow-y-auto items-center">
          <div className="flex flex-col w-3/4 overflow-y-visible">
            { 
              messages.map((msg, index) => (
                
              <Message
                key={index}
                text={msg.message_content}
                sender={msg.sender}
                sources={msg.sources}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {course ? (
          <InputBox onSendMessage={handleNewMessage} loading={loading} />
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-gray-500 text-2xl italic mb-6">
              Please Select a Course
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainScreen;
