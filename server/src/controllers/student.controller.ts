import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Professor } from '../entities/Professor'
import { Student } from '../entities/Student'

const nodemailer = require("nodemailer")



export const getStudentById = async (req: Request, res: Response) => {
    const student = await getRepository(Student).findOne({ where: [
      {studentNationalId: req.params.id},
      {studentId: req.params.id}
    ]})
    res.send(student)
}

export const getStudentByAddress = async (req: Request, res: Response) => {
  const student = await getRepository(Student).findOne({ where: [
    {studentAddress: req.params.address}
  ]})
  res.send(student)
}

export const getStudents = async (req: Request, res: Response) => {
    const students = await getRepository(Student).find()
    res.json(students)
}


export const addStudent = async (req: Request, res: Response) => {
  const newStudent = getRepository(Student).create({
    studentName: req.body.studentName,
    studentNationalId: req.body.studentNationalID,
    studentEmail: req.body.studentEmail,
    studentCode: req.body.studentCode
  })
  // newStudent.academicAdvisor = getRepository(Professor).create({})
  try {
    await getRepository(Student).save(newStudent)

    // sendMail(req.body.studentEmail, req.body.studentCode)
    sortStudents()

    res.status(200).send(newStudent)
    
  } catch(error) {
    res.status(400).send(error)
    console.log(error)
  }
  
}

export const addStudents = async (req: Request, res: Response) => {
  for(let i = 0; i < req.body.studentNationalId.length; i++) {
    let firstCharacterToUpper = req.body.studentName[i]
    firstCharacterToUpper = firstCharacterToUpper.replace(firstCharacterToUpper[0],firstCharacterToUpper[0].toUpperCase())
    let student = getRepository(Student).create({
      studentName: firstCharacterToUpper,
      studentNationalId: req.body.studentNationalId[i],
      studentEmail: req.body.studentEmail[i],
      studentCode: req.body.studentCode[i]
    })
    try {
      await getRepository(Student).save(student)
  
      // sendMail(req.body.studentEmail, req.body.studentCode)  
      
    } catch(error) {
      res.status(400).send(error)
      console.log(error)
    }
  }
  sortStudents()
  res.sendStatus(200)
}


export const putStudentAddress = async(req: Request, res: Response) => {
  try {
    getRepository(Student).createQueryBuilder().update(Student)
    .set({studentAddress: req.body.studentAddress})
    .where({studentNationalId: req.params.id}).execute();
    
    res.sendStatus(200)
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
  
}


export const deleteStudent = async (req: Request, res: Response) => {
  try {
    getRepository(Student).createQueryBuilder().delete().from(Student).where({studentNationalId: req.params.id}).execute();
    res.sendStatus(200)
  } catch(error) {
    res.sendStatus(400)
  }
}


export const assignStudentToAcademicAdvisor = async (req: Request, res: Response) => {
  const professor = await getRepository(Professor).findOne({ where: [
    {professorAddress: req.params.address}
  ]})
  try {
    getRepository(Student).createQueryBuilder().update(Student)
    .set({academicAdvisor: professor})
    .where({studentNationalId: req.params.id}).execute();
    
    res.sendStatus(200)
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
  
}




export const getStudentsByLevel = async (req: Request, res: Response) => {
  const students = await getRepository(Student).find({ where: [
    {studentLevel: req.params.level}
  ], order: {studentId: "ASC"} })
  res.send(students)
}



export const registerCourses = async (req: Request, res: Response) => {
  try {
    getRepository(Student).createQueryBuilder().update(Student)
    .set({registeredCourses: req.body.registeredCourses})
    .where({studentNationalId: req.params.NID}).execute();
    
    res.sendStatus(200)
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const getregisteredCourses = async (req: Request, res: Response) => {
  const student = await getRepository(Student).findOne({ where: [
    {studentNationalId: req.params.id},
    {studentId: req.params.id}
  ]})
  if(student){
    res.send(student.registeredCourses)
  }
    
}




async function sortStudents() {

  const d = new Date();
  let year = d.getFullYear();
  let year2 = d.getFullYear();
  year = year*10000

  let result = await getRepository(Student).find({ where:{studentYear: year2}, order: {studentName: "ASC"} })
  for (let i =0  ; i < result.length ; i++){
    year++
    var myquery = {studentNationalId : result[i].studentNationalId };
    getRepository(Student).createQueryBuilder().update(Student).set({studentId: year}).where(myquery).execute();
  }   
}


function sendMail(toMail: String, studentCode: String) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fcaihhelwan@gmail.com',
      pass: '542000Mm'
    }
  });
  
  const mailOptions = {
    from: 'fcaihhelwan@gmail.com',
    to: String(toMail),
    subject: 'Your code',
    text: String(studentCode)
  };
  
  transporter.sendMail(mailOptions, function(error: Error, res: Response){
    if(error) throw error
  });
}
