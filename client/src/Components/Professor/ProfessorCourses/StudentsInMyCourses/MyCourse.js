import React, { useState } from "react"
import useMyCoursesLogic from "./MyCoursesLogic"
import { useParams } from "react-router-dom"

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
  CircularProgress
} from "@material-ui/core"

const MyCourse = () => {
  const {level, code} = useParams()
  const { students } = useMyCoursesLogic(level, code)
  console.log(students)

  if(students !== undefined){
    return (
      <>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              My Students in {code}
            </Typography>
            <Paper>
              <Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell align="center">Student Id</TableCell>
                        <TableCell align="center">Student National Id</TableCell>
                        <TableCell align="center">Student Level</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.studentId}>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.studentName}</TableCell>
                          <TableCell>{student.studentNationalId}</TableCell>
                          <TableCell>{student.studentLevel}</TableCell>
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
  return <CircularProgress />

}

export default MyCourse