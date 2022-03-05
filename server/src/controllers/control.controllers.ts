import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Control } from "../entities/Control";


export const addControlAccount = async (req: Request, res: Response) => {
  const { controlLevel, controlAddress } = req.body;
  let newControl = getRepository(Control).create({
    controlLevel: controlLevel,
    controlAddress: controlAddress,
  });

  try {
    await getRepository(Control).save(newControl);
    res.status(200).send(newControl);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
}
export const putControlAddress = async (req: Request, res: Response) => {
  try{
    getRepository(Control).createQueryBuilder().update(Control)
    .set({controlAddress: req.body.controlAddress})
    .where({controlLevel: req.params.id}).execute();

    res.sendStatus(200)
  } catch(error){
    res.status(400).send(error);
    console.log(error)
  }
}

export const getControlData = async (req: Request, res: Response) => {
  try{
    const control = await getRepository(Control).findOne({
      where: {controlAddress: req.params.address}
    })
    res.status(200).send(control)
  } catch(error){
    res.status(400).send(error);
    console.log(error)
  }
}