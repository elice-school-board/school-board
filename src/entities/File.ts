import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  postId!: number;

  @Column()
  conmmentId!: number;

  @Column()
  url!: string;

  @Column()
  type!: string;
}
