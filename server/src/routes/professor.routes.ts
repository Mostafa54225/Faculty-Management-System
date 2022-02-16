import { Router } from 'express'
import { addProfessor, assignProfessorToStudents, getProfessorByAddress, getProfessors, putProfessorAddress, setCourseStatus, viewStudentsAARelationship } from '../controllers/professor.controllers'

const router = Router()


router.get("/", getProfessors)
router.post("/AddAccount", addProfessor)
router.post("/AA/putStudents/:professorNationalId", assignProfessorToStudents)

router.get("/AA/viewStudentsForAA/:professorNationalId", viewStudentsAARelationship)

router.post("/AA/setCourseStatus/:professorNationalId", setCourseStatus)

router.post("/putProfessorAddress/:id", putProfessorAddress)

router.get("/getProfessor/:professorAddress", getProfessorByAddress)

export default router