import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";
import { Registration } from "./Registration";

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
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


  @OneToMany(type => Registration, registration => registration.course)
  studentCourses!: Registration[]
}