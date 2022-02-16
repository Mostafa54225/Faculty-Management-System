"use strict";

import { useState } from "react"
import Axios from "axios"
import showNotification from "../../utils/ShowNotifications"
import * as XLSX from "xlsx"

const useAddAccounts = () => {
  const [nameStudent, setNameStudent] = useState("")
  const [nationalIDStudent, setNationalIDStudent] = useState("")
  const [emailStudent, setEmailStudent] = useState("")

  const [professorNationalId, setProfessorNationalId] = useState("")
  const [professorName, setProfessorName] = useState("")
  const [professorDepartment, setProfessorDepartment] = useState(undefined)

  const onNameStudentChange = (e) => setNameStudent(e.target.value)
  const onNationalIDStudentChange = (e) => setNationalIDStudent(e.target.value)
  const onEmailStudentChange = (e) => setEmailStudent(e.target.value)

  const onProfessorNationalIdChange = (e) => setProfessorNationalId(e.target.value)
  const onProfessorNameChange = (e) => setProfessorName(e.target.value)
  const onProfessorDepartmentChange = (e) => setProfessorDepartment(e.target.value)

  const addStudent = async () => {
    let studentCode =
      Math.floor(Math.random() * nationalIDStudent) % 10000000000000
    try {
      Axios.all([
        await Axios.post("http://localhost:3001/roles/addRole", {
          idRole: nationalIDStudent,
          roleName: "student",
          password: studentCode
        }),
        await Axios.post("http://localhost:3001/students/AddAccount", {
          studentName: nameStudent,
          studentNationalID: nationalIDStudent,
          studentEmail: emailStudent,
          studentCode: studentCode,
        })
      ])
      
      showNotification("Success", "Student Added Successfully", "success")
    } catch (error) {
      console.log(error)
      showNotification("Error", "Student Not Added!", "danger")
    }
  }

  const readExcelFile = (file) => {
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
      let arrNames = []
      let arrNID = []
      let arrEmails = []
      let studentsCode = []
      for (let i = 0; i < data.length; i++) {
        arrNames.push(Object.values(data[i])[0])
        arrNID.push(Object.values(data[i])[1])
        arrEmails.push(Object.values(data[i])[2])
        studentsCode.push(
          Math.floor(Math.random() * Object.values(data[i])[1]) % 10000000000000
        )
      }
      addStudentSheet(arrNames, arrNID, arrEmails, studentsCode)
    })
  }

  const addStudentSheet = async (arrNames, arrNID, arrEmails, studentsCode) => {
    // console.log(studentsCode)
    try {
      console.log(arrNID)
      Axios.all([
        await Axios.post("http://localhost:3001/roles/addRoles", {
          idRole: arrNID,
          roleName: "student",
          password: studentsCode
        }),
        await Axios.post("http://localhost:3001/students/AddAccounts", {
          studentName: arrNames,
          studentNationalId: arrNID,
          studentEmail: arrEmails,
          studentCode: studentsCode,
        })
      ])
      showNotification("Success", "Students Added Successfully", "success")
    } catch (error) {
      console.log(error)
      showNotification("Error", "Student Not Added!", "danger")
    }
  }



   const addProffesor = async () => {
    try {
      let profPassword = Math.floor(Math.random() * professorNationalId) % 10000000000000
      Axios.all([
        await Axios.post("http://localhost:3001/roles/addRole", {
          idRole: professorNationalId,
          roleName: "professor",
          password: profPassword
        }),
        await Axios.post("http://localhost:3001/professors/AddAccount", {
          professorName: professorName,
          professorAddress: "0x00",
          professorDepartment: professorDepartment,
          professorNationalId: professorNationalId
        })
      ])
      

      showNotification("Success", "Professor Added Successfully", "success")
    } catch (error) {
      showNotification("Error", "Professor Not Added!", "danger")
      console.log(error)
    }
  }


  return {
    onNameStudentChange,
    onNationalIDStudentChange,
    onEmailStudentChange,
    addStudent,
    readExcelFile,
    onProfessorNationalIdChange,
    onProfessorNameChange,
    onProfessorDepartmentChange,
    addProffesor
  }
}

export default useAddAccounts
