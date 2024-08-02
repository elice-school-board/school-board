import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompetitionType } from "./enums/CompetitionType";

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  boardId!: number;

  @Column()
  categoryId!: number;

  @Column()
  name!: string;

  @Column()
  date!: Date;

  @Column()
  competitorA!: string;

  @Column()
  competitorB!: string;

  @Column({
    type: "enum",
    enum: CompetitionType,
  })
  type!: CompetitionType;
}
