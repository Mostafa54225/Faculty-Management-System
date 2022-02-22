import {
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  makeStyles
} from "@material-ui/core"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import useStudentHomeLogic from "./StudentHomeLogic"

const useStyles = makeStyles({
  button: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  },
}})

function StudentHome(props) {
  const classes = useStyles()

  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )
  // const [role, setRole] = useState(localStorage.getItem("role"))

  const { studentDetails } = useStudentHomeLogic(currentAccount)
  if (studentDetails !== undefined) {
    // if(role === 'student') {
    return (
      <>
        <Typography variant="h3" align="center">
          Welcome {studentDetails.studentName}{" "}
        </Typography>
        <Typography variant="h5" align="center">
          ID: {studentDetails.studentId}
        </Typography>
        <Typography align="center">Your Address: {currentAccount}</Typography>
        <Box m={1}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/registerCourses`,
                  }}
                >
                  Register Course
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/showRegisteredCourses`,
                  }}
                >
                  Show Registered Courses
                </Button>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/dropRegisteredCourses`,
                  }}
                >
                  Drop Courses
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    )
    // }
    // return <CircularProgress />
  }
  return <CircularProgress />
}

export default StudentHome
