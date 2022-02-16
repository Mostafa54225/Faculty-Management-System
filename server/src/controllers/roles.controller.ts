import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Roles } from "../entities/Roles";


export const addRole = async(req: Request, res: Response) => {
  const { roleName, password, idRole } = req.body;
  let newRole = getRepository(Roles).create({
    idRole: idRole,
    roleName: roleName,
    password: password,
  })

  try {
    await getRepository(Roles).save(newRole)
    res.status(200).send(newRole)    
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}

export const addRoles = async(req: Request, res: Response) => {
  for(let i = 0; i < req.body.idRole.length; i++) {
    let newRole = getRepository(Roles).create({
      idRole: req.body.idRole[i],
      roleName: req.body.roleName,
      password: req.body.password[i],
    })
    try {
      await getRepository(Roles).save(newRole)
    } catch(error) {
      res.status(400).send(error)
      console.log(error)
    }
  }
  res.sendStatus(200)
}

export const getRole = async(req: Request, res: Response) => {
  try {
    const role = await getRepository(Roles).findOne({
      where: [
        { idRole: req.body.idRole, password: req.body.password }
      ]
    })
    if(role === undefined)
      res.sendStatus(404)
    res.send(role)
  } catch(error) {
    res.sendStatus(404)
  }
}

export const deleteRole = async(req: Request, res: Response) => {
  try {
    getRepository(Roles).createQueryBuilder().delete().from(Roles).where({idRole: req.body.idRole}).execute();
    res.sendStatus(200)  
  } catch (error) {
    res.sendStatus(404)
  }
  
}