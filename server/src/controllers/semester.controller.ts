import { Request, Response } from "express";
import { Semester } from "../entities/Semester";
import { getRepository } from "typeorm";

export const setSemesterDetails = async(req: Request, res: Response) => {
  const { 
    startSDate,
    endSDate,
    daysForStartRegistrationBeforeStartSemester,
    daysForEndRegistationAfterStartRegistration,
    semesterType
  } = req.body
  let newSemester = getRepository(Semester).create({
    startSemesterDate: startSDate,
    endSemesterDate: endSDate,
    registrationStart: (startSDate - (daysForStartRegistrationBeforeStartSemester * 24 * 60 * 60)),
    registrationEnd: (startSDate + (daysForEndRegistationAfterStartRegistration * 24 * 60 * 60)),
    semesterType: semesterType
  })

  try {
    await getRepository(Semester).save(newSemester)
    res.status(200).send(newSemester)
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}

export const getSemesterDetails = async(req: Request, res: Response) => {
  try {
    const semester = await getRepository(Semester).findOne({
      order: {
        id: "DESC"
      }
    });
    res.status(200).send(semester)
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}