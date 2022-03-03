import Axios from "axios"
import { useState, useEffect } from "react"
import XLSX from "xlsx"
import showNotification from "../../../utils/ShowNotifications"

const useMyCoursesLogic = (level, code) => {
  const [students, setStudents] = useState(undefined)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (isMounted) {
        const students = await Axios.get(
          `http://localhost:3001/registeration/getAllStudentsRegisteredInCourse/${code}`
        )
        setStudents(students.data)
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [level, code])

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(students)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "students.xlsx")
  }

  const captureFile = (file, code) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, { type: "buffer" })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }
      fileReader.onerror = (error) => reject(error)
    })
    promise.then((data) => {
      let arrStudentId = []
      let arrGrades = []
      for (let i = 0; i < data.length; i++) {
        arrStudentId.push(Object.values(data[i])[0])
        arrGrades.push(Object.values(data[i])[1])
      }
      console.log(arrGrades)
      uploadGrades(arrStudentId, arrGrades, code)
    })
  }

  const uploadGrades = async (arrStudentId, arrGrades, code) => {
    try {
      await Axios.put(
        "http://localhost:3001/professors/putStudentsMidTermGrade",
        {
          studentId: arrStudentId,
          midTermGrade: arrGrades,
          courseCode: code,
        }
      )
      showNotification("Success", "Grades uploaded successfully", "success")
    } catch (error) {
      showNotification("error", "Error", "Something went wrong")
    }
  }

  return {
    students,
    downloadExcel,
    captureFile,
  }
}

export default useMyCoursesLogic
