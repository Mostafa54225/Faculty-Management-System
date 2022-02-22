import React from "react"
import { Navigate } from "react-router-dom"
import {
  Grid,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
} from "@material-ui/core"
import useRoles from "../utils/handleRoles"
import useLoginLogic from "./LoginLogic"

function Login() {
  const { currentAccount, role } = useRoles()
  
  const {
    redirect,
    redirectAdmin,
    roleName,
    onNationalIDChange,
    onPasswordChange,
    activateAccount,
  } = useLoginLogic(currentAccount)

  if (redirect) {
    // if (roleName === "student") return <Navigate to="/StudentHome" />
    // else if (roleName === "professor") return <Navigate to="/ProfessorHome" />
    return <Navigate to="/" />
  }

  if (redirectAdmin) return <Navigate to="/AdminHome" />
  
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4">Login Page</Typography>
        <Paper>
          <Box m={2} p={5} alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
            ></Box>
            <Box>
              <TextField
                label="National ID"
                type="text"
                style={{ width: "400px" }}
                onChange={onNationalIDChange}
              ></TextField>
            </Box>
            <Box>
              <TextField
                label="password"
                type="password"
                style={{ width: "400px" }}
                onChange={onPasswordChange}
              ></TextField>
            </Box>
            <Box m={3}>
              <Button
                variant="contained"
                onClick={activateAccount}
                style={{ backgroundColor: "green", color: "floralwhite" }}
                type="button"
              >
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
