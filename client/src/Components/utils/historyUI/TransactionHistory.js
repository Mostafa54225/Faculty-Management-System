import React, { useEffect, useState, useRef } from "react"
import "./TransactionHistoryUI.css"
import useTransactionHistoryLogic from './TransactionHistoryLogic'
import { MdCheckCircle } from "react-icons/md"

import useSearchStudents from "../../Admin/SearchStudent/SearchStudentLogic"
import { useParams } from "react-router-dom"
import { CircularProgress, Typography, Button, Grid, Paper, Box } from "@material-ui/core"


function TransactionHistory() {
  const params = useParams()
  const myContainer = useRef(new Array())

  const { studentHistoryRegisteredCourses } = useSearchStudents()
  const { studentHistory, studentDetails, printDocument } = useTransactionHistoryLogic(params.studentAddress, studentHistoryRegisteredCourses)


  if (params.studentAddress === "0x00") {
    return (
      <Typography align="center" variant="h5">
        Student Not Activated yet
      </Typography>
    )
  }

  if (studentHistory === "No history") {
    return (
      <Typography align="center" variant="h5">
        No history for this student
      </Typography>
    )
  }
  if (studentHistory.length !== 0 && studentDetails !== undefined) {
    return (
      <>
        <Typography variant="h4" align="center">
          Number of transactions: {studentHistory.length}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <Paper>
              <Box p={2} m={2} alignItems="center">
                <Typography variant="h5" align="center">Student Details</Typography>
                <Typography variant="h6"> Student Address: </Typography> <p style={{fontSize: '0.8em'}}>{studentDetails.studentAddress}</p>                
                <Typography variant="h6"> Student Name: {studentDetails.studentName} </Typography> 
                <Typography variant="h6"> Student National Id: {studentDetails.studentNationalId} </Typography>
                <Typography variant="h6"> Student Level: {studentDetails.studentLevel} </Typography>
                <Typography variant="h6"> Student Email: {studentDetails.studentEmail} </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => printDocument(myContainer)}>
              Download as PDF
            </Button>
          </Grid>
        </Grid>
        
        {studentHistory.map((transaction, index) => (
          <div
            className="card"
            id="card"
            key={index}
            ref={(element) => myContainer.current.push(element)}
          >
            <div className="upper-container">
              <div className="sign-container">
                <MdCheckCircle size={"5.5em"} color={"white"} />
                <div className="fa-duotone fa-circle-check"> </div>
              </div>
            </div>

            <div className="lower-container">
              <div className="Hash">
                <h5 className="field"> Hash: </h5>{" "}
                <h5
                  className="hashValue"
                  id="HashValue"
                  onClick={() => {
                    document.execCommand("Copy")
                  }}
                >
                  {" "}
                  {transaction.hash}{" "}
                </h5>
                <hr></hr>
              </div>

              <div className="Address">
                <h5 className="field"> Address: </h5>{" "}
                <p className="value" style={{ fontSize: ".8em" }}>
                  {" "}
                  {transaction.input.address}
                </p>
              </div>
              <hr></hr>

              <div className="Signature">
                <h5 className="field"> Signature </h5>
                <div className="r">
                  {" "}
                  <h5 className="field"> r: </h5>{" "}
                  <h5 className="value"> {transaction.input.signature.r} </h5>{" "}
                </div>
                <div className="s">
                  {" "}
                  <h5 className="field"> s: </h5>{" "}
                  <h5 className="value"> {transaction.input.signature.s} </h5>{" "}
                </div>
              </div>
              <hr></hr>
              <div className="Time">
                <h5 className="field"> Time: </h5>{" "}
                <h5 className="value"> {transaction.input.timestamp} </h5>
              </div>
              <hr></hr>
              <div className="Data">
                <h5 className="field"> Courses: </h5>{" "}
                <h5 className="value">
                  {transaction.outputs.data.courses.map((course, index) => (
                    <div key={index}>{course.name}</div>
                  ))}{" "}
                </h5>
              </div>
            </div>
          </div>
        ))}{" "}
      </>
    )
  }
  return <CircularProgress />
}

export default TransactionHistory
