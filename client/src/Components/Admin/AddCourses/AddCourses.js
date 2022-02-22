import React, { useState } from "react"
import { Typography, Grid, Box, Paper, Button } from "@material-ui/core"

import useAddCourses from "./AddCousesLogic"
import useRoles from "../../utils/handleRoles"
import AdminOnly from "../AdminOnly"
function AddCourses(props) {
  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )
  // const [role, setRole] = useState(localStorage.getItem("role"))

  const { captureFile, iscoursesUploaded } =
    useAddCourses(currentAccount)

   // if (role === "admin") {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <Paper>
            <Box m={2} p={5} alignItems="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h6">
                  Upload Courses File (JSON File)
                </Typography>
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
                    captureFile(file)
                  }}
                ></input>
              </Box>
              <Box m={3}>
                {/* <Button
                  variant="contained"
                  onClick={setIpfsHashCourses}
                  style={{ backgroundColor: "green", color: "floralwhite" }}
                  type="button"
                >
                  Upload
                </Button> */}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    <Grid container justifyContent="center">
      <Grid item>
          <Paper>
            <Box p={2} alignItems="center">
              <Box alignItems="center" justifyContent="center">
                <Typography variant="h6">
                  {iscoursesUploaded === false
                    ? "No Courses Uploaded"
                    : "Courses Uploaded" }
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
  // }
  // return <AdminOnly />
}
export default AddCourses
