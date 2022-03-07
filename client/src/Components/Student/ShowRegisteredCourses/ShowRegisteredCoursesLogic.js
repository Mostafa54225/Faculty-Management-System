import { useState, useEffect } from "react"
import Axios from "axios"

const useShowRegisteredCoursesLogic = (studentDetails) => {
  const [registeredCourses, setRegisteredCourses] = useState([])
  const [courseFinalGrade, setCourseFinalGrade] = useState(undefined)
  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      if (mounted) {
        // let r = await Axios.get("/api/getAddressTransactions/" + currentAccount)
        // if (r.data.length === 0) {
        //   r = await Axios.get("/api/address/" + currentAccount)
        // }
        // const length = r.data.length
        // const courses = r.data[length - 1].outputs.data.courses
        try {
          if(studentDetails !== undefined){
            
            let result = await Axios.get(`http://localhost:3001/registeration/getStudentSubjects/${studentDetails.studentId}`)
            if(result.data !== []) {
              if(result.data.registeredCourses !== null) {
                 
                setRegisteredCourses(result.data)
              }
            }
          }
          
        } catch(error) {
          console.log(error)
        }
      }
    }
    fetchData()
    return () => (mounted = false)
  }, [studentDetails])


  const getCourseFinalGrade = async (courseCode) => {
    setCourseFinalGrade(undefined)
    try {
      const blocks = await Axios.get("/api/blocks")
      let tDetails = null
      blocks.data.map(block => {
        block.data.map(transaction => {
          if(transaction.outputs.transactionType === "finalGrades" && transaction.outputs.data[0].courseCode === courseCode) {
            tDetails = transaction.outputs.data
          }
        })
      })
      if(tDetails !== null) {
        const s = (tDetails.find((t) => t.studentId === studentDetails.studentId)).finalGrade
        setCourseFinalGrade(s)
      }
    } catch(error) {
      console.log(error)
    }
  }
  return { registeredCourses, getCourseFinalGrade, courseFinalGrade }
}

export default useShowRegisteredCoursesLogic
