import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
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

  @Column({ nullable: true })
  scoreA?: number;

  @Column({ nullable: true })
  scoreB?: number;

  @Column({ nullable: false })
  awards!: string;

  @Column({ nullable: true })
  result?: string;
}
