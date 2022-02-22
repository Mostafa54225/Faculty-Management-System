import { Router } from 'express'
import { addCourses, getCourses } from '../controllers/courses.controllers'

const router = Router()

router.post("/addCourses", addCourses)
router.get("/getCourses", getCourses)

export default router