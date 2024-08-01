import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  boardId!: number;

  @Column()
  categoryId!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  Season!: Date;
}
