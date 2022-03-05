import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Control {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  controlLevel!: number;

  @Column()
  controlAddress!: string;
}