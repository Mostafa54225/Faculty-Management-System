import { useState, useEffect } from "react"
import Axios from "axios"

const useProfessorCourses = (professorDetails) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let mounted = true
    const fetchCourses = async () => {
      if (mounted) {
        if (professorDetails !== undefined) {
          const url =
            "http://localhost:3001/professors/viewCourses/" +
            parseInt(professorDetails.professorNationalId)
          let result = await Axios.get(url)
          setCourses(result.data[0].courses)
        }
      }
    }
    fetchCourses()
    return () => (mounted = false)
  }, [professorDetails])

  return { courses }
}

export default useProfessorCourses
