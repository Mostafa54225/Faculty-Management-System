import React, { useState } from 'react'
import { Button } from "@material-ui/core"


import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core"

import useRoles from '../../utils/handleRoles'
import useDeleteStudent from './DeleteStudentLogic'
import AdminOnly from "../AdminOnly"

function DeleteStudent() {
  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))
  
  const {onNationalIDStudentChange, deleteStudent} = useDeleteStudent(currentAccount)


  // if (role !== 'admin') {
  //   return <AdminOnly />
  // }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Paper>
          <Box m={2} p={5} alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h5">Delete Student</Typography>
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
                variant="contained"
                onClick={deleteStudent}
                style={{ backgroundColor: "green", color: "floralwhite" }}
                type="button"
              >
                Delete Student
              </Button>
            </Box>
            <Typography>OR</Typography>
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
                  this.readExcelFile(file)
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

export default DeleteStudent
