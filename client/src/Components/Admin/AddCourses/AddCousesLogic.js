import React, { useEffect, useState } from "react"
import Axios from "axios"
import showNotification from "../../utils/ShowNotifications"
import ipfs from "../../utils/ipfs"
import * as XLSX from "xlsx"

const CID = require("cids")

const useAddCourses = (currentAccount) => {
  const [buffer, setBuffer] = useState("")
  const [ipfsCourses, setIpfsCourses] = useState(undefined)
  const [iscoursesUploaded, setIsCoursesUploaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      if (isMounted) {
        try {
          const courses = await Axios.get("http://localhost:3001/courses/getCourses")
          if(courses.data.length !== 0) setIsCoursesUploaded(true)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [])

  // const captureFile = (e) => {
  //   e.stopPropagation()
  //   e.preventDefault()
  //   const file = e.target.files[0]
  //   let reader = new window.FileReader()
  //   reader.readAsArrayBuffer(file)
  //   reader.onloadend = () => convertToBuffer(reader)
  // }
  // const convertToBuffer = async (reader) => {
  //   const buffer = Buffer.from(reader.result)
  //   setBuffer(buffer)
  // }

  const captureFile = (file) => {
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
      let arrCode = []
      let arrNames = []
      let arrCourseHours = []
      let arrPrerequisites = []
      let arrDepartment = []
      let arrSection = []
      let arrType = []
      let arrLevel = []
      let arrTerm = []
      let arrProfessorId = []

      console.log(data)
      for (let i = 0; i < data.length; i++) {
        arrCode.push(Object.values(data[i])[0])
        arrNames.push(Object.values(data[i])[1])
        arrCourseHours.push(Object.values(data[i])[2])
        arrPrerequisites.push(Object.values(data[i])[3])
        arrDepartment.push(Object.values(data[i])[4])
        arrSection.push(Object.values(data[i])[5])
        arrType.push(Object.values(data[i])[6])
        arrLevel.push(Object.values(data[i])[7])
        arrTerm.push(Object.values(data[i])[8])
        arrProfessorId.push(Object.values(data[i])[9])
      }
      addCourseSheet(arrCode, arrNames, arrCourseHours, arrPrerequisites, arrDepartment, arrSection, arrType, arrLevel, arrTerm, arrProfessorId)
    })
  }


  const addCourseSheet = async (arrCode, arrNames, arrCourseHours, arrPrerequisites, arrDepartment, arrSection, arrType, arrLevel, arrTerm, arrProfessorId) => {
    try {
      await Axios.post("http://localhost:3001/courses/addCourses", {
        code: arrCode,
        name: arrNames,
        courseHours: arrCourseHours,
        prerequisite: arrPrerequisites,
        department: arrDepartment,
        section: arrSection,
        type: arrType,
        level: arrLevel,
        term: arrTerm,
        professorId: arrProfessorId
      })

      showNotification("Success", "Courses Added Successfully", "success")
      setIsCoursesUploaded(true)

    } catch(error) {
      console.log(error)
      showNotification("Error", "Courses Not Added!", "danger")
      setIsCoursesUploaded(false)
    }
  }

  const setIpfsHashCourses = async () => {
    // try {
    //   let hashV0 = await ipfs.add(buffer)
    //   let hashV1 = new CID(hashV0[0].path).toV1().toString("base32")

    //   await Axios.post("/api/setIPFSLinkCourses", {
    //     ipfsLinkCourses: hashV1,
    //     address: currentAccount,
    //   })
    //   showNotification("Success", "File Added to IPFS Successfully", "success")
    // } catch (error) {
    //   // showNotification("Error", "File Not Added", "Danger")
    //   console.log(error)
    // }
  }


  return { captureFile, iscoursesUploaded }
}

export default useAddCourses
