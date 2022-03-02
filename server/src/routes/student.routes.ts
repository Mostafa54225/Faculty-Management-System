import { Router } from 'express'
import { addStudent, addStudents, getStudentById, getStudents, getStudentByAddress, putStudentAddress, deleteStudent, getStudentsByLevel, registerCourses, getregisteredCourses} from '../controllers/student.controller'
const router = Router()


router.post("/AddAccount", addStudent)
router.post("/AddAccounts", addStudents)

router.post("/putStudentAddress/:id", putStudentAddress)

router.get("/:id", getStudentById)
router.get("/", getStudents)
router.delete("/delete/:id", deleteStudent)

router.get("/getStudents/:level", getStudentsByLevel)

router.post("/registerCourses/:NID", registerCourses)
router.get("/getRegisteredCourses/:id", getregisteredCourses)

router.get("/getStudentByAddress/:address", getStudentByAddress)



export default router