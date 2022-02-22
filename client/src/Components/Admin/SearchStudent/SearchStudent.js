import React, { useState } from 'react' 

import { Box, Grid, TextField, Typography, Paper, CircularProgress, Chip, Button } from '@material-ui/core'

import useSearchStudents from './SearchStudentLogic'
import useRoles from '../../utils/handleRoles'
import AdminOnly from '../AdminOnly'
import history from '../../../history'
import { Link } from 'react-router-dom'
function SearchStudent() {
  // const { currentAccount, role } = useRoles()
  // const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))
  // const [role, setRole] = useState(localStorage.getItem("role"))

  const {
    onStudentSearchKeyChange,
    isFound, 
    studentView, 
    studentDetails, 
    studentInfos, 
    isLoading,
    studentHistoryRegisteredCourses
  } = useSearchStudents()

  const [viewStudentInfo, setViewStudentInfo] = useState(false)
  const [s, setS] = useState(undefined)


  
  const onViewStudent = () => {
    if(viewStudentInfo) {
      return (
        <Box flex="display" alignContent="center" justifyItems="center" m={3}>
          <Grid container justifyContent="center">
            <Grid item>
              <Paper>
                <Box p={1}>
                  <Box mt={-1} mb={1}>
                    <Typography align="center">Student Info</Typography>
                  </Box>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Typography>ID or NID: {"\t"}</Typography>
                    </Grid>
                    <Grid item>
                      <TextField type="number" size={"small"} onChange={onStudentSearchKeyChange}></TextField>
                    </Grid>
                    <Grid item>
                      <button 
                      id="search"
                      onClick={async (e) => {
                        await studentDetails()
                        // await this.studentCourses()
                      }}
                      className="btn btn-primary">Search</button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }

  
  const viewStudentDetails = () => {
    if(studentView) {
      return( 
        <Box flex="display" alignContent="center" justifyContent="center" m={3}>
          <Grid container justifyContent="center">
            <Grid item>
              <Paper>
                <Box p={7}>
                  <Box mt={-3} mb={3}>
                    <Typography variant={"h5"} align="center">Student Info</Typography>
                  </Box>
                  <Box m={1}>
                    <b>Student Address:</b> {"\t"+studentInfos.studentAddress}
                  </Box>
                  <Box m={1}>
                    <b>Name: </b>{"\t"+studentInfos.studentName}
                  </Box>
                  <Box m={1}>
                    <b>Student Code: </b>{"\t"+studentInfos.studentId}
                  </Box>
                  <Box m={1}>
                    <b>National ID:</b> {"\t"+studentInfos.studentNationalId}
                  </Box>
                  <Box m={1}>
                    <b>Number:</b> {"\t"+studentInfos.number}
                  </Box>
                  <Box m={1}>
                    <b>Email:</b> {"\t"+studentInfos.studentEmail}
                  </Box>
                  <Box m={1}>
                    <b>Level:</b> {"\t"+studentInfos.studentLevel}
                  </Box>
                  <Box m={1}>
                    <b>Total Hours:</b> {"\t"+studentInfos.studentTotalHours}
                  </Box>
                  <Box m={1}>
                    <b>GPA: </b>{"\t"+studentInfos.studentGPA}
                  </Box>
                  <Box m={1}>
                  
                  <Link 
                      id="search"
                      to={{pathname: `/studentHistory/${studentInfos.studentAddress !== '' ? studentInfos.studentAddress : "0x00"}`}}
                      target="_blank"
                      className="btn btn-primary">Click to see the history</Link>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )
    }
    return null
  }

  
  const studentNotFound = () => {
    if(!isFound) {
      return (
        <Box flex="display" alignContent="center" justifyContent="center" m={3}>
          <Grid container justifyContent="center">
            <Grid item>
              <Paper>
                <Box p={7}>
                  <Box mt={-3} mb={3}>
                    <Typography variant={"h5"} align="center">Student Info</Typography>
                  </Box>
                  <Box m={1}>
                    <Typography>Student Not Found</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }

  const load = () => {
    if(isLoading) {
      return (
        <Box m={2}>
          <Grid container justifyContent="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      )
    }
  }

  
    // if(role !== 'admin') {
    //   return <AdminOnly />
    // }
    return (
      <>
        <Box m={1}>
          <Box m={3}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item>
                <Chip variant="outlined" label="Search Student" onClick={() => {
                  setViewStudentInfo(true)
                }}></Chip>
              </Grid>
            </Grid>
          </Box>
          {onViewStudent()}
          {viewStudentDetails()}
          {studentNotFound()}
          {load()}
        </Box>
      </>
    )
  }




// class SearchStudent extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentAccount: '',
//       ownableContract: undefined,
//       studentContract: undefined,
//       isAdmin: false,
//       viewStudentInfo: false,
//       searchKey: '',
//       studentView: false,
//       load: false,
//       isFound: true, 
//       studentDetails: undefined
//     }
//   }
//   async componentDidMount() {
//     let [accounts, ownableInstance, studentInstance] = await InitializeWeb3()
//     this.setState({currentAccount: accounts[0], ownableContract: ownableInstance, studentContract: studentInstance})
//     const isAdmin = await this.state.ownableContract.methods.isAdmin(this.state.currentAccount).call()
//     this.setState({isAdmin})
//   }

//   onStudentSearchKeyChange = e => this.setState({searchKey: e.target.value})

//   studentDetails = async (id) => {
//     this.setState({load: true})
    

//     let result = await Axios.get("/students/" + parseInt(this.state.searchKey))
//     this.setState({studentDetails: result.data})
      
//     if(this.state.studentDetails === '') this.setState({isFound: false, studentView: false})
//     else this.setState({studentView: true, isFound: true})
//     this.setState({load: false})
//   }
  
  


//   studentCourses = async () => {
//     // this.setState({load: true})
//     // const result = await getStudentSubjects(this.state.studentContract, this.state.studentInfo.NationalID)
//     // if(result === null) this.setState({isFound: true, studentView: false})
//     // else console.log(result)
//     // this.setState({load: false})
//   }




//   onViewStudent = () => {
//     if(this.state.viewStudentInfo) {
//       return (
//         <Box flex="display" alignContent="center" justifyItems="center" m={3}>
//           <Grid container justifyContent="center">
//             <Grid item>
//               <Paper>
//                 <Box p={1}>
//                   <Box mt={-1} mb={1}>
//                     <Typography align="center">Student Info</Typography>
//                   </Box>
//                   <Grid container justifyContent="center" spacing={2}>
//                     <Grid item>
//                       <Typography>ID or NID: {"\t"}</Typography>
//                     </Grid>
//                     <Grid item>
//                       <TextField size={"small"} onChange={this.onStudentSearchKeyChange}></TextField>
//                     </Grid>
//                     <Grid item>
//                       <button 
//                       id="search"
//                       onClick={async (e) => {
//                         await this.studentDetails(e.target.id)
//                         await this.studentCourses()
//                       }}
//                       className="btn btn-primary">Search</button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       )
//     }
//   }

//   viewStudentDetails = () => {
//     if(this.state.studentView) {
//       return( 
//         <Box flex="display" alignContent="center" justifyContent="center" m={3}>
//           <Grid container justifyContent="center">
//             <Grid item>
//               <Paper>
//                 <Box p={7}>
//                   <Box mt={-3} mb={3}>
//                     <Typography variant={"h5"} align="center">Student Info</Typography>
//                   </Box>
//                   <Box m={1}>
//                     <b>Student Address:</b> {"\t"+this.state.studentDetails.studentAddress}
//                   </Box>
//                   <Box m={1}>
//                     <b>Name: </b>{"\t"+this.state.studentDetails.studentName}
//                   </Box>
//                   <Box m={1}>
//                     <b>Student Code: </b>{"\t"+this.state.studentDetails.studentId}
//                   </Box>
//                   <Box m={1}>
//                     <b>National ID:</b> {"\t"+this.state.studentDetails.studentNationalID}
//                   </Box>
//                   <Box m={1}>
//                     <b>Number:</b> {"\t"+this.state.studentDetails.number}
//                   </Box>
//                   <Box m={1}>
//                     <b>Email:</b> {"\t"+this.state.studentDetails.studentEmail}
//                   </Box>
//                   <Box m={1}>
//                     <b>Level:</b> {"\t"+this.state.studentDetails.studentLevel}
//                   </Box>
//                   <Box m={1}>
//                     <b>Total Hours:</b> {"\t"+this.state.studentDetails.studentTotalHours}
//                   </Box>
//                   <Box m={1}>
//                     <b>GPA: </b>{"\t"+this.state.studentDetails.studentGPA}
//                   </Box>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       )
//     }
//     return null
//   }

  
//   studentNotFound = () => {
//     if(!this.state.isFound) {
//       return (
//         <Box flex="display" alignContent="center" justifyContent="center" m={3}>
//           <Grid container justifyContent="center">
//             <Grid item>
//               <Paper>
//                 <Box p={7}>
//                   <Box mt={-3} mb={3}>
//                     <Typography variant={"h5"} align="center">Student Info</Typography>
//                   </Box>
//                   <Box m={1}>
//                     <Typography>Student Not Found</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       )
//     }
//   }

//   isLoading = () => {
//     if(this.state.load) {
//       return (
//         <Box m={2}>
//           <Grid container justifyContent="center">
//             <Grid item>
//               <CircularProgress />
//             </Grid>
//           </Grid>
//         </Box>
//       )
//     }
//   }

//   render() {
//     if(!this.state.isAdmin) {
//       return(
//         <CircularProgress />
//       )
//     }
//     return (
//       <>
//         <Box m={1}>
//           <Box m={3}>
//             <Grid container justifyContent="center" spacing={3}>
//               <Grid item>
//                 <Chip variant="outlined" label="Search Student" onClick={() => {
//                   this.setState({viewStudentInfo: true})
//                 }}></Chip>
//               </Grid>
//             </Grid>
//           </Box>
//           {this.onViewStudent()}
//           {this.viewStudentDetails()}
//           {this.studentNotFound()}
//           {this.isLoading()}
//         </Box>
//       </>
//     )
//   }
// }

export default SearchStudent