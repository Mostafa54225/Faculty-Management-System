import Axios from 'axios'
import { useEffect, useState } from 'react'
import { fromTimeStampToDate, toTimeStamp } from '../../utils/HandleDates'
import { handleCourses } from './handleCourses'
import showNotification from '../../utils/ShowNotifications'


const useRegisterCourse = (currentAccount) => {

  const [isLoad, setIsLoad] = useState(false)


  const [startRegistrationTime, setRegisterationStart]  = useState(undefined)
  const [endRegistrationTime, setRegisterationEnd] = useState(undefined)
  const [semesterType, setSemesterType] = useState(undefined)
  const [courses, setCourses] = useState(undefined)
  
  const [passedCourses, setPassedCourses] = useState(['MA111', 'HU111', "HU112", 'IT111', 'MA113'])
  const [failedCourses, setFailedCourses] = useState(['ST121'])

  const [openCourses, setOpenCourses] = useState([])

  const [chosenCourses, setChosenCourses] = useState([])
  const [coursesCode, setCoursesCode] = useState([])

  const [studentDetails, setStudentDetails] = useState(undefined)
  
  useEffect(() => {
    let ismounted = true
    
    const fetchData = async () => {
      if (ismounted) {
        const result = await Axios.get('http://localhost:3001/semester/getSemesterDetails')
        setSemesterType(parseInt(result.data.semesterType))
        setRegisterationStart(fromTimeStampToDate(result.data.registrationStart))
        setRegisterationEnd(fromTimeStampToDate(result.data.registrationEnd))

        let sDetails = await Axios.get("http://localhost:3001/students/getStudentByAddress/" + currentAccount)
        setStudentDetails(sDetails.data)
        

      }
    }
    fetchData()
    return () => ismounted = false
  }, [currentAccount])

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (isMounted) {
        if(checkRegistrationTime(startRegistrationTime, endRegistrationTime)) {
          const ipfsHashCourses = await Axios.get('/api/getIPFSLinkCourses')
          
          const result = await Axios.get(`http://localhost:3001/courses/getCourses`)
          
          const courses = result.data
          for(let i = 0; i < courses.length; i++) {
            courses[i].prerequisite = JSON.parse(courses[i].prerequisite)
          }
          setCourses(courses)
          console.log(courses)
          setIsLoad(true)
          
          let openedCourses = handleCourses(courses, 1, semesterType, passedCourses, failedCourses)
  
          await getStudentRegisteredCourses()

          setOpenCourses(openedCourses)

          setIsLoad(false)
        }
      }
    }
    fetchData()
    return () => isMounted = false
  }, [startRegistrationTime, endRegistrationTime])

  const checkRegistrationTime = (s, e) => {
    s = toTimeStamp(s)
    e = toTimeStamp(e)
    const currentDate = new Date()
    const strDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
    var timeStampDate = Date.parse(strDate) / 1000

    if(timeStampDate <= e && timeStampDate >= s){
      return true
    }
    return false
  }

  const handleChecbox = (event) => {
    const checkedArr = [];
    let value;
    if (event.target.type !== 'checkbox') {
      value = event.target.value;
    } else {
      const checkeds = document.getElementsByTagName('input');
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          checkedArr.push(JSON.parse(checkeds[i].value))
        }
      }
      value = checkedArr;
    }
    setChosenCourses(value)
  }



  
  const registerCourse = async () => {
    // if(this.state.registeredCourses.length !== 0 && chosenCourses.length === 0) {
    if(chosenCourses.length === 0) {
      showNotification("Note", "You've to change the courses to register again", "info")
    }else {
      let courses = chosenCourses

      let arrCourseHours = []

      for(let i = 0; i < courses.length; i++) {
        arrCourseHours.push(courses[i].courseHours)
      }

      let totalHours = arrCourseHours.reduce((pSum, a) => pSum + a, 0)
      
      // // to do => with GPA
      if(courses.length < 3 || courses.length >= 7) {
        showNotification("Error", "Select between 3 and 6 subjects!", "danger")
      } else {
      
        try {

          courses = courses.map(function(course) {
            return {
              ...course,
              courseStatus: "Pending"
            }
          })
          
          Promise.all([
            await Axios.post('/api/transact', {
              courses
            }),
            await Axios.post("http://localhost:3001/students/registerCourses/" + studentDetails.studentNationalId, {
              registeredCourses: JSON.stringify(courses)
            }),
            await Axios.get("/api/mine-transactions")
          ])
          
          showNotification("Success", "You've registered successfully!", "success")
        } catch(error) {
          showNotification("Error", "There's somthing wrong", "danger")
          console.log(error)
        }
      }
    }
  }

  const getStudentRegisteredCourses = async () => {
    let registeredCourses = await Axios.get('/api/getAddressTransactions/' + currentAccount) 
    if(registeredCourses.data.length === 0) {
      registeredCourses =  await Axios.get('/api/address/' + currentAccount)
    }
    if(registeredCourses.data.length !== 0) {
      const length = registeredCourses.data.length
      const courses =  registeredCourses.data[length - 1].outputs.data.courses
      
      let codes = []
      for(let i = 0; i < courses.length; i++) {
          codes.push(courses[i].code)
        }
        setCoursesCode(codes)
    }
    return registeredCourses
  }

  return {
    startRegistrationTime,
    endRegistrationTime,
    semesterType,
    checkRegistrationTime,
    openCourses,
    handleChecbox,
    registerCourse,
    coursesCode,
    isLoad
  }
}

export default useRegisterCourse