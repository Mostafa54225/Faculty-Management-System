import { useEffect, useState } from "react"
import axios from "axios"
const useControlHomeLogic = (currentAccount) => {
  const [controlLevel, setControlLevel] = useState(undefined)
  const [courses, setCourses] = useState(undefined)
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if(isMounted) {
        const response = await axios.get(`http://localhost:3001/control/getControlData/${currentAccount}`)
        setControlLevel(response.data.controlLevel)
      }
    }
    fetchData()
    return () => isMounted = false
  }, [currentAccount])
  console.log(controlLevel)

  return {
    controlLevel
  }
}

export default useControlHomeLogic