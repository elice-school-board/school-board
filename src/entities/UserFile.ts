import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    fileId: number;
}
