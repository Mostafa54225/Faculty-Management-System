import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import useRoles from "../utils/handleRoles"
import { Button, Typography, Box, Grid, makeStyles } from "@material-ui/core"


const useStyles = makeStyles({
  button: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  },
}})

function Home() {
  const classes = useStyles()

  const location = useLocation()
  // const { currentAccount, role } = useRoles()
  const [role, setRole] = useState(localStorage.getItem('role'))
  
  if (role === "admin") {
    return (
      <Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Box mt={1}>
              <Typography variant="h3">Welcome</Typography>
              <Button
                type="button"
                variant="contained"
                className={classes.button}
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
