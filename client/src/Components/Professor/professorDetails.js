import { useState, useEffect } from 'react'
import axios from 'axios'
const useProfessorDetails = (professorAddress) => {
  const [professorDetails, setProfessorDetails] = useState(undefined)
  useEffect(() => {
    let isMounted = true 

    const fetchData = async () => {
      if(isMounted) {
        if(professorAddress !== undefined) {
          const url = "http://localhost:3001/professors/getProfessor/" + professorAddress
          try{
            const response = await axios.get(url)
            setProfessorDetails(response.data)
          } catch(error) {
            console.log(error)
          }
        }
      }
    }
    fetchData()
    return isMounted = false
  }, [professorAddress])
  return { professorDetails }
}

export default useProfessorDetails