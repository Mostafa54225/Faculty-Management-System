import { useEffect, useState } from "react"
import showNotification from '../../utils/ShowNotifications'
import Axios from 'axios'

const useAssignAAs = (professors) => {

  const [students, setStudents] = useState([])
  useEffect(() => {
    const url = "http://localhost:3001/students/getStudents/" + 1 // 1 for student's level
    const fetchData = async () => {
      try{
        const response = await Axios.get(url)
        setStudents(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const assignAAs = async () => {
    let studentsNumber = students.length
    let profsNumber = professors.length
    let numberOfStudentsForEachAA = Math.floor(studentsNumber / profsNumber)
    let remainder = studentsNumber % profsNumber
    let from = 0
    let to = numberOfStudentsForEachAA
    for(let i = 0; i < profsNumber; i++) {
      let arr = students.slice(from, to)
      let arr2 = []

      for(let j = 0; j < arr.length; j++) {
        // arr2.push({
        //   "studentID": arr[j].studentId,
        //   "studentName": arr[j].studentName,
        //   "studentRegisteredCourses":[]
        // })
        arr2.push(arr[j])
      }
      console.log(arr2)

      Axios.post("http://localhost:3001/professors/AA/putStudents/" + professors[i].professorNationalId, {
        students: arr2
      }).then(() => {
        showNotification("Success", `${arr2.length} Students Added Successfully to DR.${professors[i].professorName}`, "success")
        
      }).catch((error) => {
        showNotification("Error", `Students Not Added to DR.${professors[i].professorName}`, "danger")
        console.log(error)
      })

      from = to
      to = to + numberOfStudentsForEachAA
      if(to + remainder === studentsNumber) {
        to = to + remainder
      }
    }
  }

  return {assignAAs}
}

export default useAssignAAs