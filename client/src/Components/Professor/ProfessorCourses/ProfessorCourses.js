import {
  Grid,
  Paper,
  Typography,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
} from "@material-ui/core"
import React, { useState } from "react"
import useProfessorCourses from "./ProfessorCoursesLogic"
import useProfessorDetails from "../professorDetails"
import { Link } from 'react-router-dom'

const ProfessorCourses = () => {
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )
  const { professorDetails } = useProfessorDetails(currentAccount)
  const { courses } = useProfessorCourses(professorDetails)

  
  const showCourses = () => {
    return (
      <>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              My Courses
            </Typography>
            <Paper>
              <Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="center">Course Code</TableCell>
                        <TableCell align="center">Course Hours</TableCell>
                        <TableCell align="center">View Students</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.code}>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.code}</TableCell>
                          <TableCell>{course.courseHours}</TableCell>
                          <TableCell>
                            <Button variant="outlined"
                              component={Link}
                              to={{
                                pathname: `${window.location.pathname}/${course.level}/${course.code}`,
                              }}
                              target="_blank"
                            >Show Student</Button>
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
  if (courses !== undefined) {
    return <>{showCourses()}</>
  } else {
    return (
      <>
        <Typography variant="h3" align="center">
          loading
        </Typography>
      </>
    )
  }
}

export default ProfessorCourses
