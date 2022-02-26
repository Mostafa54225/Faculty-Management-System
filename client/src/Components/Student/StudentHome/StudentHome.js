import {
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  makeStyles
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useRegisterCourse from "../RegisterCourses/RegisterCourseLogic"
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
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )
  const classes = useStyles()
  const { checkRegistrationTime, startRegistrationTime, endRegistrationTime, } = useRegisterCourse(currentAccount)
  // const { currentAccount, role } = useRoles()
  useEffect(() => {
    if(document.getElementById("register-course-button") !== null){
      if(checkRegistrationTime(startRegistrationTime, endRegistrationTime)){
        document.getElementById("register-course-button").style.display = "block"
        document.getElementById("drop-courses-button").style.display = "none"
      } else {
        document.getElementById("drop-courses-button").style.display = "block"
        document.getElementById("register-course-button").style.display = "none"
      } 
    }
  })
  
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
                  id="register-course-button"
                  className={classes.button}
                  component={Link}
                  disabled={!checkRegistrationTime(startRegistrationTime, endRegistrationTime)}
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
                  id="drop-courses-button"
                  className={classes.button}
                  component={Link}
                  disabled={checkRegistrationTime(startRegistrationTime, endRegistrationTime)}
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
