import {Button, Box, Grid, Typography, CircularProgress} from "@material-ui/core"
import React, { useState } from "react"
import { Link } from "react-router-dom"


import useRoles from '../../utils/handleRoles'
import useProfessorDetails from "../professorDetails"

function ProfessorHome(props) {
  // const { currentAccount, role } = useRoles()

  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))
  
  const { professorDetails } = useProfessorDetails(currentAccount)

  // console.log(professorDetails)

  if (professorDetails !== undefined) {
    return (
      <>
        <Typography variant="h3" align="center">Professor Page</Typography>
        <Typography variant="h4" align="center">Welcome DR.{professorDetails.professorName}</Typography>
        <Box m={1}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={{ pathname: `${window.location.pathname}/AcademicAdvisor` }}
                >
                  Academic Advisor
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={{ pathname: `${window.location.pathname}/MyCourses` }}
                >
                  My Courses
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }
  return <CircularProgress />
}

export default ProfessorHome
