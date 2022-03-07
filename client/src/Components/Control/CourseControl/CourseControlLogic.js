import axios from "axios";
import { useState, useEffect } from "react";
import XLSX from "xlsx"
import showNotification from "../../utils/ShowNotifications";
const useCourseControlLogic = (code) => {
  const [students, setStudents] = useState(undefined)
  const [transactionGrade, setTransactionGrade] = useState(undefined)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (isMounted) {
        const students = await axios.get(
          `http://localhost:3001/registeration/getAllStudentsRegisteredInCourse/${code}`
        )
        setStudents(students.data)
        await getFinalGradesTransaction(code)
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [code])


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
      let finalGrades = [{courseCode: code}]
      for (let i = 0; i < data.length; i++) {
        arrStudentId.push(Object.values(data[i])[0])
        arrGrades.push(Object.values(data[i])[1])
        const midTermGrade = findStudentById(Object.values(data[i])[0])
        let finalGrade = midTermGrade + Object.values(data[i])[1]
        
        finalGrades.push({studentId: Object.values(data[i])[0], finalGrade: finalGrade})
      }
      uploadFinalGrades(finalGrades)
    })
  }

  
  const findStudentById = (id) => {
    const student = students.find((student) => student.collegeId === id)
    return student.midTermGrade
  }

  const uploadFinalGrades = async (finalGrades) => {
    try{
      Promise.all([
        await axios.post("/api/transact", {
          data: finalGrades,
          type: "finalGrades"
        }),
        await axios.get("/api/mine-transactions")
      ])
      showNotification("Success", "Grades uploaded successfully", "success")
    } catch(error) {
      showNotification("Error", "Grades not uploaded", "danger")
    }
  }

  const getFinalGradesTransaction = async (code) => {
    try {
      const blocks = await axios.get("/api/blocks")
      blocks.data.map(block => {
        block.data.map(transaction => {
          if(transaction.outputs.transactionType === "finalGrades" && transaction.outputs.data[0].courseCode === code) {
            setTransactionGrade(transaction.outputs.data)
          }
        })
      })
    } catch(error) {
      console.log(error)
    }
  }


  return {
    students,
    captureFile,
    transactionGrade
  }
}

export default useCourseControlLogic;