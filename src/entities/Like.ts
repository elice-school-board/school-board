import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  postId!: number;

  @Column()
  commentId!: number;

  @Column()
  createdAt!: Date;
}
