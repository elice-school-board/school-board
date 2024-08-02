import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { RoleType } from "./enums/RoleType";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: RoleType,
  })
  role: RoleType; // 권한
}
