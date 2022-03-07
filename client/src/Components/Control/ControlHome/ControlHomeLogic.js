import { useEffect, useState } from "react"
import axios from "axios"
const useControlHomeLogic = (currentAccount) => {
  const [controlLevel, setControlLevel] = useState(undefined)
  const [courses, setCourses] = useState(undefined)
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if(isMounted) {
        const response = await axios.get(`http://localhost:3001/control/getControlData/${currentAccount}`)
        const coursesResponse = await axios.get(`http://localhost:3001/courses/getCoursesByLevel/${response.data.controlLevel}/1`)
        setControlLevel(response.data.controlLevel)
        setCourses(coursesResponse.data)
      }
    }
    fetchData()
    return () => isMounted = false
  }, [currentAccount])

  const getControlCourses = async () => {
    
  }
  return {
    courses
  }
}

export default useControlHomeLogic