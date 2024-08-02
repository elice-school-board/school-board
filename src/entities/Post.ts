import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  boardId!: number;

  @Column({ nullable: true })
  categoryId?: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ default: 0 })
  likesCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  season?: string;

  @Column({ default: false })
  isFeatured!: boolean; // 스와이프에 올릴지 여부
}
