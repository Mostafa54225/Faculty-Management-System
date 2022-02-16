import { useState } from "react"
import Axios from "axios"
import showNotification from '../utils/ShowNotifications'

const useLoginLogic = (currentAccount) => {
  const [nationalID, setNationalID] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const [redirectAdmin, setRedirectAdmin] = useState(false)
  const [roleName, setRoleName] = useState("")

  const onNationalIDChange = (e) => setNationalID(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const setDataToLocalStorage = (data) => {
    localStorage.setItem("currentAccount", data.publicKey)
    localStorage.setItem("role", data.role)
  }

  const activateAccount = async () => {
    if (parseInt(nationalID) === 1) {
      await Axios.post("/api/makeRole", {
        address: currentAccount,
        roleName: "admin",
      })
      setDataToLocalStorage({ publicKey: currentAccount, role: "admin" })
      setRedirectAdmin(true)
    } else {
      try {
        let result = await Axios.post("http://localhost:3001/roles/getRole", {
          idRole: parseInt(nationalID),
          password: parseInt(password),
        })
        if (result.data !== undefined) {
          setRoleName(result.data.roleName)
          await Axios.post("/api/makeRole", {
            address: currentAccount,
            roleName: result.data.roleName,
          })

          setDataToLocalStorage({ publicKey: currentAccount, role: result.data.roleName })

          if (result.data.roleName === "student") {
            await Axios.post(
              "http://localhost:3001/students/putStudentAddress/" + nationalID,
              {
                studentAddress: currentAccount,
              }
            )
          }
          if(result.data.roleName === "professor"){
            await Axios.post(
              "http://localhost:3001/professors/putProfessorAddress/" + nationalID, 
              {
                professorAddress: currentAccount,
              }
            )
          }
          setRedirect(true)
        }
      } catch (error) {
        showNotification("Error", "Account Not Activated", "danger")
        console.log(error)
      }
    }
  }

  return {
    redirect,
    redirectAdmin,
    roleName,
    onNationalIDChange,
    onPasswordChange,
    activateAccount
  }
}

export default useLoginLogic