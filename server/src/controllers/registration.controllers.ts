import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Courses } from "../entities/Courses";
import { Student } from "../entities/Student";
import { Registration } from "../entities/Registration";

const deleteStudentIdRows = async (req: Request, res: Response, studentId: number) => {
  const registrationRepository = getRepository(Registration);
  const registration = await registrationRepository.find({
    where: { collegeId: studentId  },
  });
  if (registration) {
    for(let i = 0; i < registration.length; i++) {
      await registrationRepository.delete(registration[i].id);
    }
  }
  // res.sendStatus(200);
}
export const registerCourse = async(req: Request, res: Response) => {
  const { registeredCourses, studentId } = req.body
  await deleteStudentIdRows(req, res, req.body.studentId);
  
  try{
    for(let i = 0; i < registeredCourses.length; i++) {
      
      const course = await getRepository(Courses).findOne({ code: registeredCourses[i].code })
      const student = await getRepository(Student).findOne({ studentId: studentId })
      const registration = getRepository(Registration).create({
        student: student,
        course: course,
        collegeId: studentId
      })
      await getRepository(Registration).save(registration)
    }
    res.sendStatus(200)
  } catch(error) {
    res.status(400).send(error)
  }
}

export const getStudentSubjects = async(req: Request, res: Response) => {
  const studentId = parseInt(req.params.studentId)
  try{
    // const student = await getRepository(Student).findOne({ studentId: studentId })
    // const registrations = await getRepository(Registration).find({ student: student })
    const registrations = await getRepository(Registration).createQueryBuilder("registration").leftJoinAndSelect("registration.course", "course").where("registration.collegeId = :studentId", { studentId: studentId }).getMany()
    res.send(registrations)
    // const courses = await getRepository(Courses).find()
    
    // const registeredCourses = []
    // for(let i = 0; i < registrations.length; i++) {
    //   for(let j = 0; j < courses.length; j++) {
    //     if(registrations[i].id === courses[j].id) {
    //       registeredCourses.push(courses[j])
    //     }
    //   }
    // }
    // res.send(registeredCourses)
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