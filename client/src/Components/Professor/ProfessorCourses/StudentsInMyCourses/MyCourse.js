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
  CircularProgress,
} from "@material-ui/core"
import MaterialTable from "material-table"
import { PatchedPagination } from "./PatchedPagination"

const MyCourse = () => {
  const { level, code } = useParams()
  const { students, downloadExcel } = useMyCoursesLogic(level, code)

  const columns = [
    { title: "Student Name", field: "studentName" },
    { title: "Student Id", field: "studentId" },
    { title: "Student National Id", field: "studentNationalId" },
    { title: "Student Level", field: "studentLevel" },
  ]

  
  if (students !== undefined) {
    return (
      <>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center">
              My Students in {code}
            </Typography>
            <Paper>
              <Grid>
                <MaterialTable
                  // options={{ paging: false }}
                  options={{
                    tableLayout: "fixed",
                  }}
                  components={{
                    Pagination: PatchedPagination,
                  }}
                  title="student details"
                  columns={columns}
                  data={students}
                  actions={[
                    {
                      icon: () => <Button>Export</Button>,
                      tooltip: "Export to Excel",
                      onClick: () => downloadExcel(),
                      isFreeAction: true,
                    },
                  ]}
                />
                {/* <TableContainer component={Paper} >
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
                </TableContainer> */}
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
