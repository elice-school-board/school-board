import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PlayerGameRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boardId!: number;

  @Column()
  categoryId!: number;

  @Column()
  date!: Date;

  @Column()
  name!: string;

  @Column()
  rank!: number;
}
