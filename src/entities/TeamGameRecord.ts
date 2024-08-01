import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TeamGameRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boardId!: number;

  @Column()
  categoryId!: number;

  @Column()
  date!: Date;

  @Column()
  teamA!: string;

  @Column()
  teamB!: string;

  @Column()
  scoreA!: number;

  @Column()
  scoreB!: number;

  @Column()
  result!: string;
}
