import Axios from "axios"
import { useState, useEffect } from 'react'
import XLSX from "xlsx"


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

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(students)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "students.xlsx")
  }


  return {
    students,
    downloadExcel
  }
}

export default useMyCoursesLogic