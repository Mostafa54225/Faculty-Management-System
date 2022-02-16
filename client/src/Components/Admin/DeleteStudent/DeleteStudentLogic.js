import { useState } from "react"
import showNotification from "../../utils/ShowNotifications"
import Axios from "axios"

const useDeleteStudent = (currentAccount) => {
  const [nationalIDStudent, setNationalIDStudent] = useState("")

  const onNationalIDStudentChange = (e) => setNationalIDStudent(e.target.value)

  const deleteStudent = async () => {
    try {
      let result = await Axios.get("http://localhost:3001/students/" + nationalIDStudent)

      const sa = result.data.studentAddress
      
      Axios.all([
        Axios.delete("http://localhost:3001/students/delete/" + nationalIDStudent),

        Axios.post("/api/deleteStudent", {
          studentAddress: sa,
          address: currentAccount
        }),
        Axios.post("http://localhost:3001/roles/deleteRole", {idRole: nationalIDStudent})
      ])

      
      
      showNotification("Success", "Student Deleted Successfully", "success")

    } catch (error) {
      showNotification("Error", "Student Not Deleted!", "danger")
      console.log(error)
    }
  }

  return { onNationalIDStudentChange, deleteStudent }
}

export default useDeleteStudent
