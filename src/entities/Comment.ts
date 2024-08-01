import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  postId!: number;

  @Column()
  content!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
