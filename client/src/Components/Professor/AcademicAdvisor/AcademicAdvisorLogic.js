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
          
          const arr = result.data.students.map((item, i) => Object.assign({}, item, { ["registeredCourses"]: result.data.c[i] }))
          
          arr.sort((a, b) => a.studentId - b.studentId)
          setStudents(arr)
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
