import React, { useState } from 'react'
import { Box, Grid, Paper, TextField, Typography, Button, CircularProgress } from '@material-ui/core'

import useRoles from '../../utils/handleRoles'
import AdminOnly from '../AdminOnly'

import useSemester from './SemesterLogic'
function Semester() {

  // const { role } = useRoles()
  // const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))
  
  const {
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
  } = useSemester()


  // if(role !== 'admin') {
  //   return <AdminOnly />
  // }
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h3" align="center">Semester Page</Typography>
        <Paper>
          <Box m={2} p={5} alignItems="center">
            <Box>
              <TextField type="date" label="Start Date Semester" onChange={onStartDateSemesterChange} InputLabelProps={{shrink: true}}></TextField>
            </Box>
            <Box>
              <TextField type="date" label="End Date Semester" onChange={onEndDateSemesterChange} InputLabelProps={{shrink: true}}></TextField>
            </Box>
            <Box>
              <TextField type="number" label="Registration Start" onChange={onDaysForStartRegisterBeofreStartSemester}></TextField>
            </Box>
            <Box>
              <TextField type="number" label="Registration End " onChange={onDaysForEndRegistationAfterStartRegistration}></TextField>
            </Box>
            <Box>
            <select className="form-select"  onChange={onSemesterTypeChange}>
              <option value="">Please choose a Semester</option>
                <option value="1">Winter Semester</option>
                <option value="2">Fall Semester</option>
                <option value="3">Summer</option>
              </select>
            </Box>
            <Box m={2}>
              <Button onClick={setSemesterDetails} variant="contained" style={{backgroundColor:"green",color:"floralwhite"}}>Submit</Button>
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box m={2} p={3} alignItems={"center"}>
            <Box>
              <Typography>Note: <b>Registration Start</b> textfield to put the days you want to start the registration before the starting of the semester</Typography>
            </Box>
            <Box>
              <Typography>Note: <b>Registration End</b> textfield to put the days you want to end the registration after the starting of the Registration</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper>
          <Box m={2} p={3} alignItems="center">
            <Box>
              <Typography>Semester Start: {startSemester}</Typography>
              <Typography>Semester End: {endSemester}</Typography>
              <Typography>Registration Start: {registrationStart}</Typography>
              <Typography>Registration End: {registrationEnd}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Semester