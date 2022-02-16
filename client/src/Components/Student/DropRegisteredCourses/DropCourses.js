import React from "react"
import {
  CircularProgress,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core"
import { useState } from "react"
import useShowRegisteredCoursesLogic from "../ShowRegisteredCourses/ShowRegisteredCoursesLogic"
import useDropCourses from "./DropCoursesLogic"
import useRoles from "../../utils/handleRoles"
import useRegisterCourse from "../RegisterCourses/RegisterCourseLogic"

function DropCourse() {
  //   const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )

  const { registeredCourses } = useShowRegisteredCoursesLogic(currentAccount)
  const { handleClick, handleDialog, handleClose, open } =
    useDropCourses(registeredCourses)

  const { checkRegistrationTime, startRegistrationTime, endRegistrationTime } =
    useRegisterCourse()

  const showRegistedCourse = () => {
    return (
      <>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              Drop Page
            </Typography>
            <Paper>
              <Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Course Code</TableCell>
                        <TableCell align="center">Course Name</TableCell>
                        <TableCell align="center">Credit Hours</TableCell>
                        <TableCell align="center">Drop</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {registeredCourses.map((course) => (
                        <TableRow key={course.code}>
                          <TableCell component="th" scope="row">
                            {course.code}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {course.name}
                          </TableCell>
                          <TableCell align="center">
                            {course.courseHours}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              onClick={(e) => handleDialog(e, course.code)}
                            >
                              Drop Course
                            </Button>

                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Are you sure?"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  This course will be permanently dropped
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button
                                  type="button"
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => handleClick(e)}
                                >
                                  Drop Course
                                </Button>
                              </DialogActions>
                            </Dialog>
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
  if (registeredCourses !== undefined && (startRegistrationTime !== undefined || endRegistrationTime !== undefined)) {
    return (
      <>
        {!checkRegistrationTime(startRegistrationTime, endRegistrationTime) ? (
          showRegistedCourse()
        ) : (
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Typography variant="h3" align="center">
                You Can't Drop Courses Yet
              </Typography>
            </Grid>
          </Grid>
        )}
      </>
    )
  }
  return <CircularProgress />
}

export default DropCourse
