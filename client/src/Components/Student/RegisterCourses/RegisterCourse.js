import {Box, CircularProgress, Grid, Paper, Typography, Checkbox, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Button,} from "@material-ui/core"
import React, { useState } from "react"

import useRoles from "../../utils/handleRoles"
import useRegisterCourse from "./RegisterCourseLogic"
function RegisterCourse() {
  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))

  const {
    startRegistrationTime,
    endRegistrationTime,
    semesterType,
    checkRegistrationTime,
    openCourses,
    handleChecbox,
    registerCourse,
    coursesCode,
    isLoad,
  } = useRegisterCourse(currentAccount)

  const isLoading = () => {
    if (isLoad) {
      return (
        <Box m={2}>
          <Grid container justifyContent="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      )
    }
  }

  const showRegistration = () => {
    if (openCourses.length !== 0) {
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
                          <TableCell>Course Name</TableCell>
                          <TableCell align="center">Course Hours</TableCell>
                          <TableCell align="center">Course Code</TableCell>
                          <TableCell align="center">Course Level</TableCell>
                          <TableCell align="center">Course Section</TableCell>
                          <TableCell align="center">Course Type</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {openCourses.map((course, index) => (
                          <TableRow key={course.code}>
                            <TableCell component="th" scope="row">
                              <Checkbox
                                key={index}
                                color="primary"
                                inputProps={{
                                  "aria-label": "select all desserts",
                                }}
                                onChange={handleChecbox}
                                id="input"
                                value={JSON.stringify(course)}
                                defaultChecked={coursesCode.includes(course.code)}
                              />
                              {course.name}
                            </TableCell>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {course.courseHours}
                            </TableCell>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {course.code}
                            </TableCell>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {course.level}
                            </TableCell>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {course.section === 0
                                ? "General Requirement"
                                : course.section === 1
                                ? "College Requirement"
                                : course.section === 2
                                ? "Department Requirement"
                                : null}
                            </TableCell>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {course.type === 1 ? "Compulsory" : "Optional"}
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

          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Box mt={2}>
                <Button
                  onClick={async () => {
                    await registerCourse()
                  }}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )
    }
  }

  // if (role === "student") {
    if (checkRegistrationTime(startRegistrationTime, endRegistrationTime)) {
      return (
        <>
          {/* <span>{this.state.studentDetails.name}</span> */}
          <Typography variant="h3" align="center">
            Registation Page
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Paper>
                <Box m={2} p={5} alignItems="center">
                  <Box>
                    <Typography>
                      Registration Start: {startRegistrationTime}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Registration End: {endRegistrationTime}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {isLoading()}
          {showRegistration()}
        </>
      )
    }
    return (
      <>
        {/* <span>{this.state.studentDetails.name}</span> */}
        <Typography variant="h3" align="center">Registation Page</Typography>
        <Typography variant="h4" align="center">You can't register courses now</Typography>
      </>
    )
  // }
}

export default RegisterCourse
