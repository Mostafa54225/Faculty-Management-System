import { Router } from 'express'
import { registerCourse, getRegisteredCoursesforStudent, getStudentSubjects, getAllStudentsRegisteredInCourse } from '../controllers/registration.controllers'
const router = Router()
router.post("/registerCourses", registerCourse)

router.get("/getRegisteredCoursesforStudent", getRegisteredCoursesforStudent)
router.get("/getStudentSubjects/:studentId", getStudentSubjects)
router.get("/getAllStudentsRegisteredInCourse/:courseCode", getAllStudentsRegisteredInCourse)
export default router