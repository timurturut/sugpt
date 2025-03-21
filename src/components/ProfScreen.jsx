import {useEffect, useState} from "react";
import {FaHome} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

import api from "../api/axiosConfig";


function ProfScreen({name}) {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState(["CS302", "CS305", "CS307", "CS404"]);
    const [activeLesson, setActiveLesson] = useState(null);
    const [documents, setDocuments] = useState([]);

    const handleDelete = async (index) => {
        const name = documents.at(index).name;
        try {
            const response = await api.delete("removeFileFromCourse", {
                data: {
                    course_code: activeLesson,
                    data: [name]
                }
            });
            setDocuments(documents.filter((_, i) => i !== index));

            console.log("File deleted successfully:", response.data);

        } catch (error) {
            console.error("Error deleting file:", error);
        }

    };


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        
        if (!file) return;
        
        const formData = new FormData();
        formData.append("files", file);
        formData.append("course_code", activeLesson);
        
        try {
            const response = await api.put("addFileToCourse", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            console.log("File uploaded successfully:", response.data);
            
            // If the upload is successful, update the documents state
            console.log(file.size);
            const newDocument = {
                name: file.name,
                size: file.size,
            };
            
            setDocuments((prevDocs) => [...prevDocs, newDocument]);
            
        } catch (error) {
            console.error("Error uploading file:", error);
        }

        event.target.value = "";
    }

    const handleLessonClick = (lesson) => {
        setActiveLesson(lesson);
    };

    useEffect(() => {
        async function getCourseFiles() {
            if (!activeLesson) return;

            try {
                const response = await api.get("getCourseFiles", {
                    params: {course_code: activeLesson},
                });

                setDocuments(response.data.files);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        }

        getCourseFiles();
    }, [activeLesson]);

    return (
        <div className="flex justify-center h-screen w-full gap-10">
            <div className="flex flex-col h-screen w-full items-center">
                <h1 className="text-4xl font-semibold mb-2">Welcome</h1>
                <p className="text-2xl font-semibold mb-2">Your Lessons</p>
                <div className="flex gap-2">
                    <FaHome
                        className="text-red text-3xl cursor-pointer hover:text-gray-200 mr-3"
                        onClick={() => navigate("/")}
                    />
                    {lessons.map((lesson) => (
                        <button
                            key={lesson}
                            onClick={() => handleLessonClick(lesson)}
                            className={`btn ${activeLesson === lesson ? "btn-active" : ""}`}
                        >
                            {lesson}
                        </button>
                    ))}
                </div>
                <div>

                </div>

                {/* Add File Button */}
                <div className="mt-4">
                    <label className="btn btn-primary cursor-pointer">
                        Add File
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>

                <p className="text-xl font-semibold mt-4">Documents</p>
                <div className="overflow-x-auto w-full mt-2">
                    <table className="table table-zebra w-[100%] text-lg table-auto">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th className="text-right pr-8">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {documents.map((doc, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{doc.name}</td>
                                <td>{(doc.size / (1024 * 1024)).toFixed(2)} MB</td>
                                <td className="text-right pr-8">
                                    <button
                                        className="btn btn-error btn-md"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {documents.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">
                                    No documents available
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProfScreen;
