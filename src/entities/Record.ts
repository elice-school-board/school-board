import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  competitionId!: number;

  @Column({ nullable: true })
  scoreA?: number;

  @Column({ nullable: true })
  scoreB?: number;

  @Column({ nullable: true })
  result?: string;
}
