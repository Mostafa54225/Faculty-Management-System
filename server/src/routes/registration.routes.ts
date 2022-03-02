import { Router } from 'express'
import { registerCourse, getRegisteredCoursesforStudent, getStudentSubjects } from '../controllers/registration.controllers'
const router = Router()
router.post("/registerCourses", registerCourse)

router.get("/getRegisteredCoursesforStudent", getRegisteredCoursesforStudent)
router.get("/getStudentSubjects/:studentId", getStudentSubjects)
export default router