import { Router } from 'express'
import { addCourses, getCourses, getCoursesByLevel } from '../controllers/courses.controllers'

const router = Router()

router.post("/addCourses", addCourses)
router.get("/getCourses", getCourses)
router.get("/getCoursesByLevel/:level/:term", getCoursesByLevel)

export default router