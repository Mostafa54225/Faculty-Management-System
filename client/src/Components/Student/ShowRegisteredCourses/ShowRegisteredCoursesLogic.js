import { useState, useEffect } from "react"
import Axios from "axios"

const useShowRegisteredCoursesLogic = (currentAccount) => {
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
          let result = await Axios.get("http://localhost:3001/students/getStudentByAddress/" + currentAccount)
          if(result.data !== "") {
            if(result.data.registeredCourses !== null) {
              let regCourses = JSON.parse(result.data.registeredCourses)
              setRegisteredCourses(regCourses)
            }
          }
          
        } catch(error) {
          console.log(error)
        }
      }
    }
    fetchData()
    return () => (mounted = false)
  }, [currentAccount])

  return { registeredCourses }
}

export default useShowRegisteredCoursesLogic
