import { useState, useEffect } from 'react';
import Axios from 'axios'

const useStudentHomeLogic = (currentAccount) => {

  const [studentDetails, setStudentDetails] = useState(undefined)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      if(mounted) {
        let result = await Axios.get("http://localhost:3001/students/getStudentByAddress/" + currentAccount)
        setStudentDetails(result.data)
        localStorage.setItem("studentDetails", JSON.stringify(result.data))
      }
    }
    fetchData()
    return () => (mounted = false)
  }, [currentAccount])


  return { studentDetails }
}

export default useStudentHomeLogic