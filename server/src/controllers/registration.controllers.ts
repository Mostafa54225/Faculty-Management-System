import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Courses } from "../entities/Courses";
import { Student } from "../entities/Student";
import { Registration } from "../entities/Registration";


export const registerCourse = async(req: Request, res: Response) => {
  console.log(req.body.code)
  try{
    for(let i = 0; i < req.body.code.length; i++) {
      const course = await getRepository(Courses).findOne({ code: req.body.code[i] })
      const student = await getRepository(Student).findOne({ studentId: req.body.studentId })
      const registration = await getRepository(Registration).create({
        course: course,
        student: student
      })
      await getRepository(Registration).save(registration)
    }
    res.sendStatus(200)
  } catch(error) {
    res.status(400).send(error)
  }
}

export const getRegisteredCoursesforStudent = async(req: Request, res: Response) => {
  try{
    const student = await getRepository(Student).findOne({ studentId: req.body.studentId })
    
    const registeredCourses = await getRepository(Registration).find({ student: student })
    console.log(registeredCourses)
    res.json(registeredCourses)
  } catch(error) {
    res.status(400).send(error)
  }
}