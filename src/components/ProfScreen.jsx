import { useState } from "react";

function ProfScreen({name}) {
    const [lessons, setLessons] = useState();
    const [documents, setDocuments] = useState();

    return (
      <div className="flex justify-center h-screen w-full gap-10">
        <div className="flex flex-col h-screen w-full bg-blue-400 items-center">
            <h1 className="text-white text-4xl font-semibold mb-2">Welcome Kamer</h1>
            <p className="text-white text-2xl font-semibold mb-2">Lessons</p>
            <div className="flex gap-2">
                <button className="btn btn-info">CS201</button>
                <button className="btn">CS202</button>
                <button className="btn">CS203</button>
            </div>
            <p>Documents</p>
        </div>
      </div>
    );
  }
  
  export default ProfScreen;
  