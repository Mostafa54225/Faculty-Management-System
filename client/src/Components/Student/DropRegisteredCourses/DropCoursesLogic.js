import Axios from "axios"
import { useState } from "react"
import showNotification from "../../utils/ShowNotifications"
import useShowRegisteredCoursesLogic from "../ShowRegisteredCourses/ShowRegisteredCoursesLogic"
import useRoles from "../../utils/handleRoles"

const DropCoursesLogic = (registerCourses) => {
  const [editedCourses, setEditedCourses] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [courseCode, setCourseCode] = useState()

  const [studentDetails, setStudentDetails] = useState(
    JSON.parse(localStorage.getItem("studentDetails"))
  )

  const handleClick = (event) => {
    deleteCourse(courseCode)
    setOpen(!open)
  }

  const handleDialog = (e, code) => {
    setOpen(true)
    setCourseCode(code)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const deleteCourse = (code) => {
    if (registerCourses != undefined) {
      const courses = registerCourses
      const courseIndex = courses.findIndex((course) => course.code === code)
      courses.splice(courseIndex, 1)
      submitCourses(courses)
    }
  }

  const submitCourses = async (editedCourses) => {
    let courses = editedCourses

    let arrCourseHours = []

    for (let i = 0; i < courses.length; i++) {
      arrCourseHours.push(courses[i].courseHours)
    }

    // // to do => with GPA
    if (courses.length < 3 || courses.length >= 7) {
      showNotification("Error", "You Can't drop more than this", "danger")
    } else {
      try {
        Promise.all([
          await Axios.post("/api/transact", {
            courses,
            type: "dropCourses",
          }),
          await Axios.post(
            "http://localhost:3001/students/registerCourses/" +
              studentDetails.studentNationalId,
            {
              registeredCourses: JSON.stringify(courses),
            }
          ),
          await Axios.get("/api/mine-transactions")
        ])

        showNotification("Success", "You've dropped successfully!", "success")
      } catch (error) {
        showNotification("Error", "There's somthing wrong", "danger")
        console.log(error)
      }
    }
  }

  return { handleClick, handleDialog, handleClose, open }
}

export default DropCoursesLogic
