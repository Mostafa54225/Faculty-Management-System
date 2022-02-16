import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";


@Entity() 
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  professorName!: string

  @Column()
  professorAddress!: string

  @Column()
  professorDepartment!: string

  @Column()
  professorNationalId!: string

  @OneToMany(type => Student, student => student.academicAdvisor)
  studentsForAA!: Array<Student> 

  // addStudentForAA(student: Student) {
  //   if(this.studentsForAA == null) {
  //     this.studentsForAA = new Array<Student>()
  //   }
  //   this.studentsForAA.push(student);
  // }


}