import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  idRole!: string;    // national id for students / or 1 for professors 2 for another role

  @Column({unique: true})
  password!: string;

  @Column()
  roleName!: string;
}
