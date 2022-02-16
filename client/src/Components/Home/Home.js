import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import useRoles from "../utils/handleRoles"
import { Button, Typography, Box, Grid } from "@material-ui/core"

function Home() {
  
  const location = useLocation()
  const { currentAccount, role } = useRoles()
  console.log(localStorage.getItem('role'))
  console.log(role)  
  // console.log(location.state)
  if (role === "admin") {
    return (
      <Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Box>
              <Typography variant="h3">Welcome</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                component={Link}
                to={{ pathname: `/AdminHome` }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }

  if (role === "student") {
    return (
      <Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Box>
              <Typography variant="h3">Welcome</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                component={Link}
                to={{ pathname: `/StudentHome` }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
  if(role === "professor") {
    return (
      <Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Box>
              <Typography variant="h3">Welcome</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                component={Link}
                to={{ pathname: `/ProfessorHome` }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Box>
            <Typography variant="h3">Welcome</Typography>
            <Button
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to={{ pathname: `/login` }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
  // return <CircularProgress />
}

export default Home
