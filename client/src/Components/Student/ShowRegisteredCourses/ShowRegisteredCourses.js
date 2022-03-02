import React, { useState } from "react"
import {
  Grid,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
  Typography,
} from "@material-ui/core"
import useShowRegisteredCoursesLogic from "./ShowRegisteredCoursesLogic"
import useRoles from "../../utils/handleRoles"
import useStudentHomeLogic from '../StudentHome/StudentHomeLogic'

function ShowRegisteredCourses() {
  
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  const { studentDetails } = useStudentHomeLogic(currentAccount)


  
  const { registeredCourses } = useShowRegisteredCoursesLogic(studentDetails)
  
  if (registeredCourses.length !== 0) {
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
                        <TableCell align="center">Course Code</TableCell>
                        <TableCell align="center">Course Name</TableCell>
                        <TableCell align="center">Credit Hours</TableCell>
                        <TableCell align="center">
                          Academic Advising Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {}
                    <TableBody>
                      {registeredCourses.map((course) => (
                        <TableRow key={course.course.code}>
                          <TableCell component="th" scope="row" >
                            {course.course.code}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {course.course.name}
                          </TableCell>
                          <TableCell align="center">
                            {course.course.courseHours}
                          </TableCell>
                          <TableCell align="center">
                            {course.courseStatus}
                          </TableCell>
                        </TableRow>
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
  return <Typography variant="h4" align="center">No registered courses yet.</Typography>
}

export default ShowRegisteredCourses
