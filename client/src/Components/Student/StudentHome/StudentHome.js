import {
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import useStudentHomeLogic from "./StudentHomeLogic"
import useRoles from "../../utils/handleRoles"

function StudentHome(props) {
  // const { currentAccount, role } = useRoles()
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("currentAccount")
  )
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
                  color="primary"
                  component={Link}
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
                  color="primary"
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
                  color="primary"
                  component={Link}
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

// class StudentHome extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentAccount: '',
//       studentContract: undefined,
//       studentName: '',
//       studentDetails: undefined,
//       isStudent: false,
//       studentNationalID: undefined,
//       studentNotFound: false
//     }
//   }

//   async componentDidMount() {
//     let {accounts, studentInstance } = await InitializeWeb3()
//     this.setState({
//       currentAccount: accounts[0],
//       studentContract: studentInstance,
//     })

//     const studentNationalID = await this.state.studentContract.methods.getStudentNationalID(this.state.currentAccount).call()
//     this.setState({studentNationalID})
//     const isStudent = await this.state.studentContract.methods.isStudent(this.state.currentAccount).call()
//     this.setState({isStudent})
//     if(this.state.isStudent) {
//       let result = await Axios.get("/students/" + this.state.studentNationalID)
//       if(result.data !== '')
//         this.setState({studentDetails: result.data})
//       else this.setState({studentNotFound: true})

//     }
//   }

//   render () {
//     if(this.state.studentDetails === undefined) {
//       return (
//         <CircularProgress />
//       )
//     }
//     if(!this.state.isStudent) {
//       return (
//         <h1>Invalid Address</h1>
//       )
//     }
//     if(this.state.studentNotFound) {
//       return (
//         <Redirect to="/login" />
//       )
//     }

//     return (
//       <>
//         <Typography variant="h3">Welcome {this.state.studentDetails.studentName}</Typography>
//         <Typography variant="h5">ID: {this.state.studentDetails.studentId}</Typography>
//         <span>{this.state.currentAccount}</span>
//         <Box m={1}>
//           <Grid container justifyContent="center" spacing={2}>
//             <Grid item>
//               <Box mt={1}>
//                 <Button
//                   // disabled={this.checkRegistrationTime ? true: false}
//                   type="button"
//                   variant="contained" color="primary"
//                   component={Link} to={{pathname: `${this.props.match.path}/registerCourses`}}
//                   >Register Course</Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </>
//     )
//   }
// }

export default StudentHome
