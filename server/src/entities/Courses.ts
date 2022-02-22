import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string

  @Column()
  name!: string

  @Column()
  courseHours!: number

  @Column()
  prerequisite!: string

  @Column()
  department!: number

  @Column()
  section!: number

  @Column()
  type!: number

  @Column()
  level!: number

  @Column()
  term!: number


  @Column({nullable: true})
  professorId!: number

  @ManyToOne(type => Professor, professor => professor.courses, {
    cascade: ['insert', 'update'],
  })
  professor!: Professor
}