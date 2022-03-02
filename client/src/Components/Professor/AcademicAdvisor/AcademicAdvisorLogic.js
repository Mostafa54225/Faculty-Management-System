import { useState, useEffect } from "react"
import Axios from "axios"
import showNotification from "../../utils/ShowNotifications"
const useAcademicAdvisor = (professorDetails) => {
  const [students, setStudents] = useState(undefined)


  useEffect(() => {
    let mounted = true
    const fetchStudents = async () => {
      if (mounted) {
        if (professorDetails !== undefined) {
          const url = "http://localhost:3001/professors/AA/viewStudentsForAA/" + parseInt(professorDetails.professorNationalId)
          let result = await Axios.get(url)
          result.data.map(
            (student) =>
              (student.registeredCourses = JSON.parse(
                student.registeredCourses
              ))
          )
          result.data.sort((a, b) => a.studentId - b.studentId)
          
          setStudents(result.data)
          
        }
      }
    }
    fetchStudents()
    return () => (mounted = false)
  }, [professorDetails])

  // set course status
  const setCourseStatus = async (courseCode, studentID, courseStatus) => {
    
    try {
      await Axios.post("http://localhost:3001/professors/AA/setCourseStatus/" + parseInt(professorDetails.professorNationalId), {
        studentId: studentID,
        courseCode: courseCode,
        courseStatus: courseStatus,
      })
      showNotification("success", "Course status updated", "success")
    } catch (error) {
      console.log(error)
      showNotification("Error", "Error updating course status", "danger")
    }
  }




  return { students, setCourseStatus }
}



export default useAcademicAdvisor
