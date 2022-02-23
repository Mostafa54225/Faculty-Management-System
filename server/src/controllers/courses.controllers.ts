import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Courses } from "../entities/Courses";
import { Professor } from "../entities/Professor";


export const addCourses = async(req: Request, res: Response) => {
  for(let i = 0; i < req.body.code.length; i++) {
    let course = getRepository(Courses).create({
      code: req.body.code[i],
      name: req.body.name[i],
      courseHours: req.body.courseHours[i],
      prerequisite: req.body.prerequisite[i],
      department: req.body.department[i],
      section: req.body.section[i],
      type: req.body.type[i],
      level: req.body.level[i],
      term: req.body.term[i]
    })
    try {
      await getRepository(Courses).save(course)
      await assignProfessorToCourses(req.body.professorId[i], course)
    } catch(error) {
      res.status(400).send(error)
      console.log(error)
    }
  }
  res.sendStatus(200)

}
async function assignProfessorToCourses (professorId: number, course: Courses) {
  
  // const professor = await getRepository(Professor).findOne({ id: professorId })
  const professor = await getRepository(Professor).createQueryBuilder("professor").leftJoinAndSelect("professor.courses", "course").getMany();
  let prof = professor.filter(prof => prof.id == professorId)
  try {
    if(prof) {
      prof[0].courses.push(course)
      await getRepository(Professor).save(prof[0])
    }
  }
  catch(error) {
    console.log(error)
  }
}



export const getCourses = async(req: Request, res: Response) => {
  try{
    const courses = await getRepository(Courses).find()
    res.json(courses)
  } catch(error) {
    res.status(400).send(error)
  }
}