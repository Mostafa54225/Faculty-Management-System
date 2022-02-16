import { Router } from 'express'

import { setSemesterDetails, getSemesterDetails } from '../controllers/semester.controller'

const router = Router()

router.get("/getSemesterDetails", getSemesterDetails)
router.post("/setSemesterDetails", setSemesterDetails)

export default router