import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CompetitionType } from "./enums/CompetitionType";

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boardId!: number;

  @Column()
  categoryId!: number;

  @Column()
  name!: string;

  @Column()
  date!: Date;

  @Column()
  competitiorA!: string;

  @Column()
  competitiorB!: string;

  @Column({
    type: "enum",
    enum: CompetitionType,
  })
  type!: CompetitionType;
}
