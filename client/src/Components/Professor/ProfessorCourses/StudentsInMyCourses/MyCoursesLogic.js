import Axios from "axios"
import { useState, useEffect } from 'react'


const useMyCoursesLogic = (level, code) => {

  const [students, setStudents] = useState(undefined)


  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (isMounted) {
        const students = await Axios.get(`http://localhost:3001/professors/getMyStudents/${level}/${code}`)
        setStudents(students.data)
      }
    }
    fetchData()
    return () => isMounted = false

  }, [level, code])
  return {
    students
  }
}

export default useMyCoursesLogic