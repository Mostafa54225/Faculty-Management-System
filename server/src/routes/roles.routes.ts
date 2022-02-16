import { Router } from 'express'

import { addRole, getRole, deleteRole, addRoles } from '../controllers/roles.controller'

const router = Router()

router.post('/addRole', addRole)
router.post('/getRole', getRole)
router.post('/deleteRole', deleteRole)
router.post('/addRoles', addRoles)
export default router