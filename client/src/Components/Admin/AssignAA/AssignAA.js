import React, { useEffect, useState } from "react"
import {
  CircularProgress,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core"

import Axios from "axios"
import useAssignAAs from "./AssignAALogic"
import useRoles from '../../utils/handleRoles'
import AdminOnly from "../AdminOnly"

function AssignAA() {

  const [professors, setProfessors] = useState([])

  
  useEffect(() => {
    ;(async () => {
      let professors = await Axios.get("http://localhost:3001/professors")
      
      setProfessors(professors.data)
    })()
  }, [])

  // const { currentAccount, role } = useRoles()

  // const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))

  const {assignAAs} = useAssignAAs(professors)


  // if (role !== 'admin') {
  //   return <AdminOnly />
  // }

  return (
    <>
    <Grid container spacing={1} justifyContent="center" alignItems="center" direction="column">
      <Grid item>
      <Typography variant="h5" align="center">Assign Academic Advisors</Typography>
        <Box m={1}>
          <Button
            onClick={assignAAs}
            variant="contained"
            style={{ backgroundColor: "green", color: "floralwhite" }}
          >
            Assign
          </Button>
        </Box>
      </Grid>
    </Grid>
      
      <Box m={1}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Professor Name</TableCell>
                    <TableCell align="right">Numebr of students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {professors.map((prof, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        Dr.{prof.professorName}
                      </TableCell>
                      <TableCell align="right">
                        {/* {prof.studentsForAA.length} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AssignAA
