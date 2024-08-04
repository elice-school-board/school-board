import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleType } from './enums/RoleType';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({
        type: 'enum',
        enum: RoleType,
    })
    @Column()
    role: RoleType;

    @Column({ name: 'email_token', nullable: true })
    emailToken: string;

    @Column({ name: 'email_token_expiry', type: 'timestamp', nullable: true })
    emailTokenExpiry: Date;

    @Column({ name: 'reset_password_token', nullable: true })
    resetPasswordToken: string;

    @Column({ name: 'reset_password_expiry', type: 'timestamp', nullable: true })
    resetPasswordExpiry: Date;

    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string;
}
