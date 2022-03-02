import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "./Courses";
import { Student } from "./Student";


@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id!: number;


  @ManyToOne(type => Student, student => student.studentCourses)
  @JoinColumn([{name: "studentId", referencedColumnName: "id"}])
  student!: Student;

  @ManyToOne(type => Courses, course => course.studentCourses)
  @JoinColumn([{name: "courseId", referencedColumnName: "id"}])
  course!: Courses

  @Column({default: 'Peding'})
  courseStatus!: string

  @Column()
  midTermGrade!: number;

  @Column()
  collegeId!: number;
}