import Axios from "axios"
import { useEffect, useState } from "react"
import { fromTimeStampToDate, toTimeStamp } from "../../utils/HandleDates"
// import showNotification from "../../ShowNotifications"

const useSemester = () => {

  const [startSemester, setStartSemester] = useState('')
  const [endSemester, setEndSemester] = useState('')
  const [registrationStart, setRegistrationStart] = useState('')
  const [registrationEnd, setRegistrationEnd] = useState('')
  useEffect(() => {
    let mounted = true
    const fetchDates = async () => {
      if(mounted) {
        const response = await Axios.get(`http://localhost:3001/semester/getSemesterDetails`)
        setStartSemester(fromTimeStampToDate(response.data.startSemesterDate))
        setEndSemester(fromTimeStampToDate(response.data.endSemesterDate))
        setRegistrationStart(fromTimeStampToDate(response.data.registrationStart))
        setRegistrationEnd(fromTimeStampToDate(response.data.registrationEnd))
      }
    }
    fetchDates()

    return () => (mounted = false)
  },)

  
  
  const [startSemesterDate, setStartSemesterDate] = useState(undefined)
  const [endSemesterDate, setEndSemesterDate] = useState(undefined)
  const [
    daysForStartRegistrationBeforeStartSemester,
    setDaysForStartRegistrationBeforeStartSemester,
  ] = useState(undefined)
  const [
    daysForEndRegistationAfterStartRegistration,
    setDaysForEndRegistationAfterStartRegistration,
  ] = useState(undefined)
  const [semesterType, setSemesterType] = useState(undefined)



  const onStartDateSemesterChange = (e) => setStartSemesterDate(e.target.value)
  const onEndDateSemesterChange = (e) => setEndSemesterDate(e.target.value)
  const onDaysForStartRegisterBeofreStartSemester = (e) =>
    setDaysForStartRegistrationBeforeStartSemester(e.target.value)
  const onDaysForEndRegistationAfterStartRegistration = (e) =>
    setDaysForEndRegistationAfterStartRegistration(e.target.value)
  const onSemesterTypeChange = (e) => setSemesterType(e.target.value)

  const setSemesterDetails = async () => {


    const startSDate = toTimeStamp(startSemesterDate)
    const endSDate = toTimeStamp(endSemesterDate)
    
    try {
      await Axios.post("http://localhost:3001/semester/setSemesterDetails", {
        startSDate: startSDate,
        endSDate: endSDate,
        daysForStartRegistrationBeforeStartSemester: daysForStartRegistrationBeforeStartSemester,
        daysForEndRegistationAfterStartRegistration: daysForEndRegistationAfterStartRegistration,
        semesterType: semesterType,
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    onStartDateSemesterChange,
    onEndDateSemesterChange,
    onDaysForStartRegisterBeofreStartSemester,
    onDaysForEndRegistationAfterStartRegistration,
    onSemesterTypeChange,
    setSemesterDetails,
    startSemester,
    endSemester,
    registrationStart,
    registrationEnd
  }
}

export default useSemester
