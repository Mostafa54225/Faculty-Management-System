import { useState } from 'react'
import Axios from 'axios'

const useSearchStudents = () => {

  const [searchKey, setSearchKey] = useState(0)
  const [isFound, setIsFound] = useState(true)
  const [studentView, setStudentView] = useState(false)
  const [studentInfos, setStudentInfos] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)


  const onStudentSearchKeyChange = e => setSearchKey(e.target.value)

  const studentDetails = async () => {
    setIsLoading(true)
    

    let result = await Axios.get("http://localhost:3001/students/" + searchKey)
    setStudentInfos(result.data)
      
    if(result.data === '') {
      setIsFound(false)
      setStudentView(false)
    }
    else{
      setIsFound(true)
      setStudentView(true)
    } 
    setIsLoading(false)
  }

  const studentHistoryRegisteredCourses = async (studentAddress) => {
    // let result = await Axios.get("/api/getAddressTransactions/" + studentAddress)
    // if (result.data.length === 0) {
    const result = await Axios.get("/api/address/" + studentAddress)
    // }
    const courses = result.data
    return courses
  }

  return { onStudentSearchKeyChange, isFound, studentView, studentDetails, studentInfos, isLoading, studentHistoryRegisteredCourses}
}

export default useSearchStudents