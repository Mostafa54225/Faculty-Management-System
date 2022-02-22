import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./Components/Login/Login"
import Home from "./Components/Home/Home"
import AdminHome from "./Components/Admin/AdminHome"
import AddAccount from "./Components/Admin/AddAccount/AddAccount"
import Semester from "./Components/Admin/Semester/Semester"
import StudentHome from "./Components/Student/StudentHome/StudentHome"
import NotFound from "./Components/PageNotFound/NotFound"
import AddCourses from "./Components/Admin/AddCourses/AddCourses"
import ReactNotification from "react-notifications-component"
import SearchStudent from "./Components/Admin/SearchStudent/SearchStudent"
import DeleteStudent from "./Components/Admin/DeleteStudent/DeleteStudent"
import RegisterCourse from "./Components/Student/RegisterCourses/RegisterCourse"
import ShowRegisteredCourses from "./Components/Student/ShowRegisteredCourses/ShowRegisteredCourses"
import DropRegisteredCourse from "./Components/Student/DropRegisteredCourses/DropCourses"

import ProfessorHome from "./Components/Professor/ProfessorHome/ProfessorHome"
import AcademicAdvisor from "./Components/Professor/AcademicAdvisor/AcademicAdvisor"
import AssignAA from "./Components/Admin/AssignAA/AssignAA"
import axios from "axios"
import TransactionHistory from "./Components/utils/historyUI/TransactionHistory"

function App() {
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (isMounted) {
        const account = await axios.get("/api/public-key")
        const role = await axios.get("/api/role/" + account.data.publicKey)
        localStorage.setItem("role", role.data.role)
        localStorage.setItem("currentAccount", account.data.publicKey)
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [])

  return (
    <div className="App">
      <ReactNotification />

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/AdminHome"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AdminHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminHome/AddAccount"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AddAccount />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminHome/AddCourses"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AddCourses />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminHome/SearchStudent"
          element={
            localStorage.getItem("role") === "admin" ? (
              <SearchStudent />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route 
          path="/studentHistory/:studentAddress"
          element={
            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "professor") ? (
              <TransactionHistory />
            ) : (
            <Navigate to="/" />
            ) 
          } 
        />

        <Route
          path="/AdminHome/DeleteStudent"
          element={
            localStorage.getItem("role") === "admin" ? (
              <DeleteStudent />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminHome/AssignAAs"
          element={
            localStorage.getItem("role") === "admin" ? (
              <AssignAA />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminHome/Semester"
          element={
            localStorage.getItem("role") === "admin" ? (
              <Semester />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/StudentHome"
          element={
            localStorage.getItem("role") === "student" ? (
              <StudentHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/StudentHome/registerCourses"
          element={
            localStorage.getItem("role") === "student" ? (
              <RegisterCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/StudentHome/showRegisteredCourses"
          element={
            localStorage.getItem("role") === "student" ? (
              <ShowRegisteredCourses />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/StudentHome/dropRegisteredCourses"
          element={
            localStorage.getItem("role") === "student" ? (
              <DropRegisteredCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/ProfessorHome"
          element={
            localStorage.getItem("role") === "professor" ? (
              <ProfessorHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ProfessorHome/AcademicAdvisor"
          element={
            localStorage.getItem("role") === "professor" ? (
              <AcademicAdvisor />
            ) : (
              <Navigate to="/" />
            )
          }
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
