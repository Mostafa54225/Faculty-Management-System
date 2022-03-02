import { Router } from 'express'
import { addProfessor, putMidTermGradeForStudents, assignProfessorToStudents, getProfessorByAddress, getProfessors, putProfessorAddress, setCourseStatus, viewCoursesRelationship, viewStudentsAARelationship } from '../controllers/professor.controllers'

const router = Router()


router.get("/", getProfessors)
router.post("/AddAccount", addProfessor)
router.post("/AA/putStudents/:professorNationalId", assignProfessorToStudents)

router.get("/AA/viewStudentsForAA/:professorNationalId", viewStudentsAARelationship)
router.get("/viewCourses/:professorNationalId", viewCoursesRelationship)

router.post("/AA/setCourseStatus/:professorNationalId", setCourseStatus)

router.post("/putProfessorAddress/:id", putProfessorAddress)

router.get("/getProfessor/:professorAddress", getProfessorByAddress)

// router.get("/getMyStudents/:level/:courseId", getAllStudentsRegisteredCourse)
router.put("/putStudentsMidTermGrade", putMidTermGradeForStudents)
export default router