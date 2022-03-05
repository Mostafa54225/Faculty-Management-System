import React, { useState } from "react"
import { Button } from "@material-ui/core"

import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Chip,
} from "@material-ui/core"
import useRoles from '../../utils/handleRoles'
import AdminOnly from "../AdminOnly"

import useAddAccounts from "./AddAccountLogic"
import { Navigate } from "react-router-dom"

function AddAccount() {
  
  const {
    onNameStudentChange,
    onNationalIDStudentChange,
    onEmailStudentChange,
    addStudent,
    readExcelFile,
    onProfessorNationalIdChange,
    onProfessorNameChange,
    onProfessorDepartmentChange,
    addProffesor,
    onControlIdChange,
    onControlLevelChange,
    addControl
  } = useAddAccounts()

  const [viewStudent, setViewStudent] = useState(false)
  const [viewProfessor, setViewProfessor] = useState(false)
  const [viewControl, setViewControl] = useState(false)
  // const { currentAccount, role } = useRoles()
  // const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))
  
  const viewS = () => {
    if (viewStudent) {
      return (
        <Grid container justifyContent="center">
          <Grid item>
            <Paper>
              <Box m={2} p={5} alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h5">Add Student</Typography>
                </Box>
                <Box>
                  <TextField
                    label="Student Name"
                    type="text"
                    style={{ width: "400px" }}
                    onChange={onNameStudentChange}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    label="Student Email"
                    type="email"
                    style={{ width: "400px" }}
                    onChange={onEmailStudentChange}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    label="Student National ID"
                    type="number"
                    style={{ width: "400px" }}
                    onChange={onNationalIDStudentChange}
                  ></TextField>
                </Box>
                <Box m={3}>
                  <Button
                    
                    style={{ width: "200px" }}
                    variant="contained"
                    onClick={addStudent}
                    style={{ backgroundColor: "green", color: "floralwhite" }}
                    type="button"
                  >
                    Add Student
                  </Button>
                </Box>
                <Typography align="center">OR</Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                  mb={2}
                >
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0]
                      readExcelFile(file)
                    }}
                    type="file"
                    label="Student Sheet"
                  ></input>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }

  const viewP = () => {
    if (viewProfessor) {
      return (
        <Grid container justifyContent="center">
          <Grid item>
            <Paper>
              <Box m={2} p={5} alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h5">Add Professors</Typography>
                </Box>
                <Box>
                  <TextField
                    label="Professor National Id"
                    type="text"
                    style={{ width: "400px" }}
                    onChange={onProfessorNationalIdChange}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    label="Professor Name"
                    type="text"
                    style={{ width: "400px" }}
                    onChange={onProfessorNameChange}
                  ></TextField>
                </Box>
                <Box>
                  <Box mt={2}>
                    <select className="form-select" 
                    onChange={onProfessorDepartmentChange}>
                      <option value="">Choose Department</option>
                      <option value="CS">CS</option>
                      <option value="IS">IS</option>
                      <option value="IT">IT</option>
                      <option value="AI">AI</option>
                    </select>
                  </Box>
                </Box>
                <Box m={3}>
                  <Button
                    variant="contained"
                    onClick={addProffesor}
                    style={{ backgroundColor: "green", color: "floralwhite" }}
                    type="button"
                  >
                    Add Professor
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }

  const viewC = () =>{
    if(viewControl) {
      return (
        <Grid container justifyContent="center">
          <Grid item>
            <Paper>
              <Box m={2} p={5} alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h5">Add Control</Typography>
                </Box>
                <Box>
                  <TextField
                    label="Control Level"
                    type="text"
                    style={{ width: "400px" }}
                    onChange={onControlLevelChange}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    label="Control Id"
                    type="text"
                    style={{ width: "400px" }}
                    onChange={onControlIdChange}
                  ></TextField>
                </Box>
                <Box m={3}>
                  <Button
                    variant="contained"
                    onClick={addControl}
                    style={{ backgroundColor: "green", color: "floralwhite" }}
                    type="button"
                  >
                    Add Control
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }
  return (
    <Box m={1}>
      <Box m={3}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Chip
              variant="outlined"
              label="Add Students Accounts"
              onClick={() => {
                setViewStudent(true)
                setViewControl(false)
                setViewProfessor(false)
              }}
            ></Chip>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              label="Add Professors Account"
              onClick={() => {
                setViewStudent(false)
                setViewControl(false)
                setViewProfessor(true)
              }}
            ></Chip>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              label="Add Control"
              onClick={() => {
                setViewStudent(false)
                setViewProfessor(false)
                setViewControl(true)
              }}
            ></Chip>
          </Grid>
        </Grid>
      </Box>
      {viewS()}
      {viewP()}
      {viewC()}
    </Box>
  )
}

export default AddAccount
