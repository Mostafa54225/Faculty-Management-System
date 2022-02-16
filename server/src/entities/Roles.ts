import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idRole!: number;    // national id for students / or 1 for professors 2 for another role

  @Column()
  password!: number;

  @Column()
  roleName!: string;
}
