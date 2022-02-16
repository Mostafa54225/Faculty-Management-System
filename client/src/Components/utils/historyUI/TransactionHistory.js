import React, { useEffect, useState } from "react"
import "./TransactionHistoryUI.css"
import { Md10K, MdCheckCircle } from "react-icons/md"
import { CopyToClipboard } from "react-copy-to-clipboard"
import useSearchStudents from "../../Admin/SearchStudent/SearchStudentLogic"
import { useParams } from "react-router-dom"
import { CircularProgress, Typography } from "@material-ui/core"

function TransactionHistory() {
  const params = useParams()
  const [studentHistory, setStudentHistory] = useState([])
  const { studentHistoryRegisteredCourses } = useSearchStudents()
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (isMounted) {
        const result = await studentHistoryRegisteredCourses(
          params.studentAddress
        )
        setStudentHistory(result)
      }
    }
    fetchData()
    return (isMounted = false)
  }, [])

  if(studentHistory.length !== 0) {
    return (
      <>
        <Typography variant="h4" align="center">Transactions No: {studentHistory.length}</Typography>
        {studentHistory.map((transaction, index) => (
          <div className="card" key={transaction.hash}>
            <div className="upper-container">
              <div className="sign-container">
                {/* <MdCheckCircle size={"5.5em"} color={"white"} /> */}
                <MdCheckCircle  size={'5.5em'} color={'white'}/>
                <div className="fa-duotone fa-circle-check"> </div>
              </div>
            </div>
  
            <div className="lower-container" key={index}>
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
                <h5 className="value"> {transaction.input.address} </h5>
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
                  {transaction.outputs.data.courses.map((course) => (
                    <div>{course.name}</div>
                  ))}{" "}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }
  return <CircularProgress />
}
export default TransactionHistory
