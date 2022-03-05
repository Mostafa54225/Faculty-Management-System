import { Router } from 'express'
import { putControlAddress, addControlAccount, getControlData } from '../controllers/control.controllers'

const router = Router()

router.post("/addControlAccount", addControlAccount)
router.put("/putControlAddress/:id", putControlAddress)
router.get("/getControlData/:address", getControlData)
export default router