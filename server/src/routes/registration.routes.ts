import { Router } from 'express'
import { registerCourse, getRegisteredCoursesforStudent } from '../controllers/registration.controllers'
const router = Router()
router.post("/registerCourses", registerCourse)

router.get("/getRegisteredCoursesforStudent", getRegisteredCoursesforStudent)
export default router