import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Semester {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  startSemesterDate!: number;

  @Column()
  endSemesterDate!: number;
  
  @Column()
  registrationStart!: number

  @Column()
  registrationEnd!: number

  @Column()
  semesterType!: string;
}