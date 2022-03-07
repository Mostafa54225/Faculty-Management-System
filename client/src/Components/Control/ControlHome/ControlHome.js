import React, { useState } from "react"
import useControlHomeLogic from "./ControlHomeLogic"
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
  CircularProgress,
} from "@material-ui/core"
import { Link } from 'react-router-dom'

const ControlHome = () => {
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )

  const { courses } = useControlHomeLogic(currentAccount)

  if (courses !== undefined) {
    return (
      <>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              Control Courses
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
                        <TableCell align="center">View Course</TableCell>
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
                                  pathname: `${window.location.pathname}/${course.code}`,
                                }}
                                target="_blank"
                              >View Course</Button>
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
  } else return <CircularProgress />
}
export default ControlHome
