import { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf"
import domtoimage from "dom-to-image"
import axios from "axios"

const useTransactionHistoryLogic = (currentAccount, studentHistoryRegisteredCourses) => {

  const [studentHistory, setStudentHistory] = useState([])
  const [studentDetails, setStudentDetails] = useState(undefined)


  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (isMounted) {
        const result = await studentHistoryRegisteredCourses(
          currentAccount
        )
        if (result.length !== 0) setStudentHistory(result)
        else setStudentHistory("No history")
      }
    }
    fetchData()
    return (isMounted = false)
  }, [])


  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if(isMounted) {
        const response = await axios.get("http://localhost:3001/students/getStudentByAddress/" + currentAccount)
        setStudentDetails(response.data)
      }
    }
    fetchData()
    return (isMounted = false)
  }, [currentAccount])


  const printDocument = (myContainer) => {
    console.log(myContainer.current)
    const options = {
      hight: 1000,
      width: 1000,
      resolution: 100,
    }
    const pdf = new jsPDF("p", "mm", "a4")
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()
  
    for (let i = 0; i < myContainer.current.length; i++) {
      domtoimage.toPng(myContainer.current[i], options).then((imgData) => {
        pdf.addImage(imgData, "JPEG", -12, 0, width + 10, height)
        pdf.addPage()
        if (i == myContainer.current.length - 1) {
          pdf.deletePage(myContainer.current.length + 1)
          pdf.save("download.pdf")
        }
      })
    }
  }

  return { studentHistory, studentDetails, printDocument }

}

export default useTransactionHistoryLogic