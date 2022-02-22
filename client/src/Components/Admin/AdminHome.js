import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom"

import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core"

const useStyles = makeStyles({
  button: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  },
}})
function AdminHome(props) {
  const classes = useStyles()


  // const { currentAccount, role } = useRoles()
  // const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))

  // if(role === 'admin') {
    return (
      <>
        <Typography variant="h3" align="center">
          Admin Page
        </Typography>
        <Box m={1}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box mt={1}>
              <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/AddAccount`,
                  }}
                >
                  Add Account
                </Button>
              </Box>
            </Grid>
  
            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/Semester`,
                  }}
                >
                  Semester
                </Button>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/AddCourses`,
                  }}
                >
                  Add Courses
                </Button>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/AssignAAs`,
                  }}
                >
                  Assing Students To AA
                </Button>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/SearchStudent`,
                  }}
                >
                  Search Students
                </Button>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={{
                    pathname: `${window.location.pathname}/DeleteStudent`,
                  }}
                >
                  Delete Students
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  // }
  
}

// class AdminHome extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentAccount: '',
//       ownableContract: undefined,
//       studentContract: undefined,
//       isAdmin: false
//     }
//   }
//   async componentDidMount() {
//     let [accounts, ownableInstance, studentInstance] = await InitializeWeb3()
//     this.setState({currentAccount: accounts[0], ownableContract: ownableInstance, studentContract: studentInstance})
//     const isAdmin = await this.state.ownableContract.methods.isAdmin(this.state.currentAccount).call()
//     this.setState({isAdmin})
//   }

//   render() {
//     if(this.state.isAdmin) {
//       return (
//         <>
//           <Typography variant="h3">Admin Page</Typography>
//           <Box m={1}>
//             <Grid container justifyContent="center" spacing={2}>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/AddAccount`}}>Add Account</Button>
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/Semester`}}>Semester</Button>
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/SearchStudent`}}>Search Student</Button>
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/DeleteStudent`}}>Delete Student</Button>
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/AddCourses`}}>Add Courses</Button>
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box mt={1}>
//                 <Button variant="contained" color="primary" component={Link} to={{pathname: `${this.props.match.path}/AssignAA`}}>Assign Academic Advisors</Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </>
//       )
//     }
//     return (
//       <CircularProgress />
//     )

//   }
// }

export default AdminHome
