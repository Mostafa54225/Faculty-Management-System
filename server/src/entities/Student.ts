import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Professor } from './Professor'
import { Registration } from './Registration'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  studentName!: string

  @Column({unique: true})
  studentNationalId!: string

  @Column()
  studentEmail!: string

  @Column()
  studentCode!: string

  @Column({default: 0})
  studentGPA!: number

  @Column({default: 0})
  studentId!: number

  @Column({default: 0})
  studentTotalHours!: number

  @Column({default: 1})
  studentLevel!: number

  @Column({default: new Date().getFullYear()})
  studentYear!: number

  
  @Column({default: ""})
  studentAddress!: string

  @Column({nullable: true})
  academicAdvisorId!: number


  @ManyToOne(type => Professor, professor => professor.studentsForAA, {
    cascade: ['insert', 'update'],
  })
  academicAdvisor!: Professor

  @OneToMany(type => Registration, registration => registration.student)
  studentCourses!: Registration[]
  
}

