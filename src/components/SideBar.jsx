import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function SideBar({ setCourse, setChat }) {
  const [historyArr, setHistoryArr] = useState([
    {_id:1,title:"test"},
    {_id:2,title:"test"},
    {_id:3,title:"test"},
    {_id:4,title:"test"},
    {_id:5,title:"test"},

  ]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const courseOptions = [
    { value: "CS305", label: "CS305" },
    { value: "CS404", label: "CS404" },
    { value: "CS449", label: "CS449" },
    { value: "CS302", label: "CS302" },
    { value: "CS401", label: "CS401" },
    { value: "CS307", label: "CS307" },
    { value: "PSY203", label: "PSY203" },
    { value: "NS206", label: "NS206" },
    { value: "OPIM302", label: "OPIM302" },
    { value: "SPS303", label: "SPS303" },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get("http://localhost:5000/getUserChats", {
          params: {
            user_name: "efe.ballar",
          },
        });

        setHistoryArr(response.data.chats);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    getHistory();
  }, []);

  function handleCourseChange(option) {
    setSelectedCourse(option);
    setCourse(option.value);
  }

  function chatChange(id) {
    setChat(id);
    setSelectedHistory(id);
  }

  return (
    <div className="h-screen w-1/4 flex flex-col bg-blue-400 overflow-hidden">
      <h1 className="text-white text-4xl font-semibold drop-shadow-lg mb-4 ml-2">
        SuGPT
      </h1>
      <div className="flex flex-col items-center min-h-screen overflow-y-auto">
        <Select
          className="w-full max-w-xs mb-4"
          options={courseOptions}
          value={selectedCourse}
          onChange={handleCourseChange}
          placeholder="Select a course"
          isSearchable
        />
        <p className="text-white text-2xl font-semibold mb-2">History</p>
        {historyArr.length > 0 ? (
          historyArr.map(({ _id, title }) => (
            <div
              key={_id}
              className={`${
                _id === selectedHistory ? "bg-gray-300" : "bg-white"
              } cursor-pointer w-11/12 text-black p-2 rounded-lg shadow-md mb-2`}
              onClick={() => chatChange(_id)}
            >
              {title}
            </div>
          ))
        ) : (
          <p className="text-white italic">No history available</p>
        )}
      </div>
    </div>
  );
}

export default SideBar;
