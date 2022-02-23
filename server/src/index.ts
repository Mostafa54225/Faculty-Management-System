import express from 'express'
import cors from "cors";
import { createConnection } from "typeorm";

import studentRoutes from './routes/student.routes'
import professorRouter from './routes/professor.routes'
import semesterRouter from './routes/semester.routes'
import rolesRouter from './routes/roles.routes'
import coursesRouter from './routes/courses.routes'
import registrationRouter from './routes/registration.routes'

createConnection().then(connection => {
  
  const app = express()

  app.use(cors())

  app.use(express.json())

  app.use('/students', studentRoutes)
  app.use('/professors', professorRouter)
  app.use('/semester', semesterRouter)
  app.use('/roles', rolesRouter)
  app.use('/courses', coursesRouter)
  app.use("/registeration", registrationRouter)
  app.listen(3001, () => {
    console.log("Server is running on port 3001")
  })
})
