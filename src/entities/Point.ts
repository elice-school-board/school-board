import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team: string;

  @Column()
  event: string;

  @Column()
  score: Date;
}
