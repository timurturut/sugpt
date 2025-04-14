import {useState} from "react";
import api from "../api/axiosConfig";

function AdminScreen() {

    const [addCourse, setAddCourse] = useState("")
    const [courseName, setCourseName] = useState("")
    const [mail, setMail] = useState("")
    const [deleteCourse, setDeleteCourse] = useState("")
    const [infoCourse, setInfoCourse] = useState("")
    const [infoData, setInfoData] = useState()

    function addCourseButton() {
        api.post("addCourse", {
            courseCode: addCourse,
            courseName: courseName,
            instructor: mail
        }).then()
    }

    function deleteCourseButton() {
        api.delete("deleteCourse", {courseCode: deleteCourse}).then()
    }

    function getInfoCourseButton() {
        api.get("getPersonnelFromCourse", {
            params: {
                courseCode: infoCourse
            }
        }).then()
    }


    return (
        <>
            <div className="flex justify-center h-screen w-full gap-10">
                <div className="flex flex-col h-screen w-full items-center">
                    <h1 className="text-4xl font-semibold mb-2">Welcome</h1>
                    <div className={"flex flex-row gap-2"}>
                        <button className={"btn btn-success"}
                                onClick={() => document.getElementById('my_modal_1').showModal()}>Add Course
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <form method="dialog" className={"flex flex-col"}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className={"flex flex-col gap-2 mb-2"}>
                                        <input value={addCourse} onChange={(e) => setAddCourse(e.target.value)}
                                               type="text" placeholder="Course Code"
                                               className="input input-bordered w-full max-w-xs"/>
                                        <input value={courseName} onChange={(e) => setCourseName(e.target.value)}
                                               type="text" placeholder="Course Name"
                                               className="input input-bordered w-full max-w-xs"/>
                                        <input value={mail} onChange={(e) => setMail(e.target.value)} type="text"
                                               placeholder="Instructor Name"
                                               className="input input-bordered w-full max-w-xs"/>
                                    </div>
                                    <div className={"flex"}>
                                        <button onClick={addCourseButton} className="btn btn-success mr-auto">Add
                                            Course
                                        </button>
                                        <button className="btn">Close</button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                        <button className={"btn btn-error"}
                                onClick={() => document.getElementById('my_modal_2').showModal()}>Delete Course
                        </button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <form method="dialog" className={"flex flex-col gap-2"}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <input value={deleteCourse} onChange={(e) => setDeleteCourse(e.target.value)}
                                           type="text" placeholder="Course Code"
                                           className="input input-bordered w-full max-w-xs"/>
                                    <div className={"flex"}>
                                        <button onClick={deleteCourseButton} className="btn btn-error mr-auto">Delete
                                            Course
                                        </button>
                                        <button className="btn">Close</button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                    <div className={"flex flex-row mt-4 gap-2"}>
                        <input value={infoCourse} onChange={(e) => setInfoCourse(e.target.value)} type="text"
                               placeholder="Course Code" className="input input-bordered w-full max-w-xs"/>
                        <button onClick={getInfoCourseButton} className={"btn btn-info"}>Get info</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminScreen