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

  const getStudentTranscript = async (studentId) => {
    try {
      let courses = []
      const blocks = await Axios.get("/api/blocks")
      blocks.data.map(block => {
        block.data.map(transaction => {
          if(transaction.outputs.transactionType === "finalGrades") {
            transaction.outputs.data.map((course) => {
              if(course.studentId === studentId) {
                const index = courses.findIndex((c) => c.courseCode === transaction.outputs.data[0].courseCode)
                if(index !== -1) {
                  courses = courses.filter((obj) => obj.courseCode !== transaction.outputs.data[0].courseCode)
                }  
                courses.push({
                  courseCode: transaction.outputs.data[0].courseCode,
                  studentId: course.studentId,
                  finalGrade: course.finalGrade
                })
              }
            })
          }
        })
      })
      console.log(courses)
      // if(tDetails !== null) {
      //   const s = (tDetails.find((t) => t.studentId === studentDetails.studentId)).finalGrade
      //   setCourseFinalGrade(s)
      // }
    } catch(error) {
      console.log(error)
    }
  }



  return { students, setCourseStatus, getStudentTranscript }
}



export default useAcademicAdvisor
