import { useState, useEffect } from "react"
import Axios from "axios"

const useShowRegisteredCoursesLogic = (studentDetails) => {
  const [registeredCourses, setRegisteredCourses] = useState([])
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
            console.log(studentDetails.studentId)
            let result = await Axios.get(`http://localhost:3001/registeration/getStudentSubjects/${studentDetails.studentId}`)
            if(result.data !== []) {
              if(result.data.registeredCourses !== null) {
                console.log(result.data)
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

  return { registeredCourses }
}

export default useShowRegisteredCoursesLogic
