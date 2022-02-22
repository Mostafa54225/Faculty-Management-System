import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "./Courses";
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


  @OneToMany(type => Courses, course => course.professor)
  courses!: Array<Courses>
  

  // addStudentForAA(student: Student) {
  //   if(this.studentsForAA == null) {
  //     this.studentsForAA = new Array<Student>()
  //   }
  //   this.studentsForAA.push(student);
  // }


}