import { Button, CircularProgress, IconButton } from "@material-ui/core"
import React, { useState } from "react"
import { Box, Grid, Paper, Typography, Collapse, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@material-ui/core'




import useRoles from '../../utils/handleRoles'
import useAcademicAdvisor from "./AcademicAdvisorLogic"

import { BiDownArrowCircle, BiUpArrowCircle } from 'react-icons/bi'
import { Link, Navigate } from "react-router-dom"
import useProfessorDetails from "../professorDetails"

function AcademicAdvisor() {

  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))
  
  const { professorDetails } = useProfessorDetails(currentAccount)
  
  const { students, setCourseStatus } = useAcademicAdvisor(professorDetails)

  if(students !== undefined && professorDetails !== undefined) {
    return (
      <>
      <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Paper>
              <Grid>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{width: '400px', fontWeight: 'bold'}}>Number Of Students: {students.length}</TableCell>
                      <TableCell align="right" style={{width: '400px', fontWeight: 'bold'}}>Student ID</TableCell>
                      <TableCell align="right" style={{width: '400px', fontWeight: 'bold'}}>Student Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {students.map((row) => (
                      <Row key={row.studentId} row={row} setCourseStatus={setCourseStatus} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Grid>
            </Paper>
          </Grid>
      </Grid>
      </>
    )
  }
  return <CircularProgress />
}



function Row(props) {
  const { row, setCourseStatus, getStudentRegisteredCourses } = props
  const [open, setOpen] = useState(false)
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{outline: 'none'}}
          >
            {open ? <BiUpArrowCircle  /> : <BiDownArrowCircle />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.studentId}</TableCell>
        <TableCell align="right">{row.studentName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Registered Courses
              </Typography>
              <Link
                variant="contained"
                target="_blank"
                className="btn btn-primary"
                to={{pathname: `/studentHistory/${row.studentAddress !== '' ? row.studentAddress : "0x00"}`, state: {studentId: row.studentId, studentName: row.studentName, studentAddress: row.studentAddress}}}
              >Student's History</Link>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Choose</TableCell>
                    <TableCell>Course Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.registeredCourses !== null ? row.registeredCourses.map((course) => (
                    <TableRow key={course.course.code}>
                      <TableCell component="th" scope="row">
                        {course.course.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {course.course.code}
                      </TableCell>
                      <TableCell>
                        <Button 
                        onClick={ async () => {
                          
                          setCourseStatus(course.course.code, row.studentId, "Passed")
                        }}
                        style={{ outline: 'none', margin: '5px', backgroundColor: "green", color: "floralwhite" }}
                        >Pass</Button>
                        <Button 
                        onClick={() => setCourseStatus(course.course.code, row.studentId, "Warning")}
                        style={{ outline: 'none', backgroundColor: "Red", color: "floralwhite" }}>Warn</Button>
                      </TableCell>
                      <TableCell>{course.courseStatus}</TableCell>
                    </TableRow>
                  )): null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default AcademicAdvisor
