import React from "react"
import { useParams } from "react-router-dom"
import useCourseControlLogic from "./CourseControlLogic"

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
  CircularProgress,
  Box
} from "@material-ui/core"

const CourseControl = () => {
  const { courseCode } = useParams()
  const { students, captureFile, transactionGrade } = useCourseControlLogic(courseCode)
  
  if (students !== undefined) {
    return (
      <>
        {students.length > 0 ? (
          <Paper>
            <Box m={2} p={5} alignItems="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h6">Upload Final Grade File</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
                mb={2}
              >
                <input
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    captureFile(file, courseCode)
                  }}
                ></input>
              </Box>
            </Box>
          </Paper>
        ) : null}

        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              Students in {courseCode}
            </Typography>
            <Paper>
              <Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Studnet Id</TableCell>
                        <TableCell align="center">Midterm Grade</TableCell>
                        <TableCell align="center">Final Grade</TableCell>
                        {/* <TableCell align="center">View Course</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.collegeId}>
                          <TableCell>{student.collegeId}</TableCell>
                          <TableCell>{student.midTermGrade}</TableCell>
                          <TableCell>
                            {transactionGrade !== undefined 
                              ? transactionGrade.find((t) => t.studentId === student.collegeId).finalGrade
                              : null}
                            {/* {transactionGrade.outputs.data.find(
                              (output) => output.studentId === student.collegeId
                            ) ? (output.finalGrade): null} */}
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
  return <CircularProgress />
}

export default CourseControl
