import { Request, Response } from "express";
import { Any, createQueryBuilder, getRepository, SimpleConsoleLogger } from "typeorm";
import { Professor } from "../entities/Professor";
import { Registration } from "../entities/Registration";
import { Student } from "../entities/Student";


export const addProfessor = async(req: Request, res: Response) => {
  const { professorName, professorAddress, professorDepartment, professorNationalId } = req.body;
  console.log(professorAddress)
  let newProfessor = getRepository(Professor).create({
    professorName: professorName,
    professorAddress: professorAddress,
    professorDepartment: professorDepartment,
    professorNationalId: professorNationalId,
  })

  try {
    await getRepository(Professor).save(newProfessor)
    res.status(200).send(newProfessor)    
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}


export const putProfessorAddress = async(req: Request, res: Response) => {
  try {
    getRepository(Professor).createQueryBuilder().update(Professor)
    .set({professorAddress: req.body.professorAddress})
    .where({professorNationalId: req.params.id}).execute();
    
    res.sendStatus(200)
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
}


export const getProfessors = async(req: Request, res: Response) => {
  try {
    const professors = await getRepository(Professor).find();
    res.status(200).send(professors)
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}

export const getProfessorByAddress = async(req: Request, res: Response) => {
  try {
    const professors = await getRepository(Professor).findOne({professorAddress: req.params.professorAddress})
    res.status(200).send(professors)
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}
export const assignProfessorToStudents = async(req: Request, res: Response) => {

  const professorNationalId  = req.params.professorNationalId
  const professor = await getRepository(Professor).findOne({ professorNationalId: professorNationalId })
  
  // console.log(professor?.studentsForAA)
  try {
    if(professor) {
      professor.studentsForAA = req.body.students
      await getRepository(Professor).save(professor)
      res.status(200).send(professor)
    } else {
      res.status(400).send("Professor not found")
    }
  }
  catch(error) {
    res.status(400).send(error);
    console.log(error)
  }
}

export const assignProfessorToCourses = async (req: Request, res: Response) => {
  const professorNationalId  = req.params.professorNationalId
  const professor = await getRepository(Professor).findOne({ professorNationalId: professorNationalId })
  
  // console.log(professor?.studentsForAA)
  try {
    if(professor) {
      professor.courses = req.body.courses
      await getRepository(Professor).save(professor)
      res.status(200).send(professor)
    } else {
      res.status(400).send("Professor not found")
    }
  }
  catch(error) {
    res.status(400).send(error);
    console.log(error)
  }
}

interface StudentsAA {
  
}
export const viewStudentsAARelationship = async(req: Request, res: Response) => {
  try{
    const professor = await getRepository(Professor).createQueryBuilder("professor").leftJoinAndSelect("professor.studentsForAA", "student").getMany();
    let prof = professor.filter(prof => prof.professorNationalId == req.params.professorNationalId)
    const c = []
    for(let i = 0; i < prof[0].studentsForAA.length; i++) {
      const registeredCourses = 
        await getRepository(Registration).
        createQueryBuilder("registration").
        leftJoinAndSelect("registration.course", "course")
        .where("registration.collegeId = :studentId", { studentId: prof[0].studentsForAA[i].studentId })
        .getMany()
        c.push(registeredCourses)
    }
    const students = prof[0].studentsForAA
    res.send({
      students,
      c
    })
  } catch(error) {
    res.sendStatus(400).send(error)
  }
}

export const putMidTermGradeForStudents = async(req: Request, res: Response) => {
  const { studentId, courseCode, midTermGrade } = req.body
  for(let i = 0; i < req.body.studentId.length; i++) {
    try {
      await getRepository(Registration).createQueryBuilder()
      .update(Registration)
      .set({midTermGrade: midTermGrade[i]})
      .where("collegeId = :studentId AND courseCode = :courseCode", { studentId: studentId[i], courseCode: courseCode })
      .execute()
    } catch(error) {
      res.status(400).send(error)
    }
  }
  res.sendStatus(200)
}

export const viewCoursesRelationship = async(req: Request, res: Response) => {
  try {
    const professor = await getRepository(Professor).createQueryBuilder("professor").leftJoinAndSelect("professor.courses", "course").getMany();
    let prof = professor.filter(prof => prof.professorNationalId == req.params.professorNationalId)
    res.json(prof)
  } catch(error) {
    res.sendStatus(400).send(error)
  }
}


interface Course {
  code: string,
  courseStatus: string,
}

// export const getAllStudentsRegisteredCourse = async (req: Request, res: Response) => {
  
//   const students = await getRepository(Student).find({ where: [
//     {studentLevel: parseInt(req.params.level)}
//   ], order: {studentId: "ASC"} })
//   let s = []
//   for (let i = 0  ; i < students.length ; i++){
//     if(students[i].registeredCourses != null){
//       const courses = JSON.parse(students[i].registeredCourses)
//       if(courses.filter((course: Course) => course.code === req.params.courseId).length > 0) {
//         s.push(students[i])
//       }
//     }
//   }
//   res.json(s)
// }




export const setCourseStatus = async(req: Request, res: Response) => {
  try{
    const professor = await getRepository(Professor).createQueryBuilder("professor").leftJoinAndSelect("professor.studentsForAA", "student").getMany();
    let prof = professor.find(prof => prof.professorNationalId == req.params.professorNationalId)
    if(prof) {
      let student = prof.studentsForAA.find(student => student.studentId == parseInt(req.body.studentId))
      if(student){
        
        const registeredCourses = 
        await getRepository(Registration).
        createQueryBuilder("registration").
        leftJoinAndSelect("registration.course", "course")
        .where("registration.collegeId = :studentId", { studentId: req.body.studentId })
        .getMany()
        registeredCourses.forEach(course => {
          if(course.course.code == req.body.courseCode) {
            course.courseStatus = req.body.courseStatus
          }
        })
        getRepository(Registration).save(registeredCourses)
        // let courses = JSON.parse(student.registeredCourses)
        // courses.forEach((course: Course) => {
        //   if(course.code == req.body.courseCode) {
        //     course.courseStatus = req.body.courseStatus
        //   }
        // })
        // let stringifyCourses = JSON.stringify(courses)
        // getRepository(Student).createQueryBuilder().update(Student).set({registeredCourses: stringifyCourses})
        // .where("studentId = :studentId", {studentId: student.studentId}).execute()

        res.sendStatus(200)
      }

    } else {
      res.sendStatus(400).send("Professor not found")
    }
  } catch(error) {
    res.sendStatus(400).send(error)
  }
}


