import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Competition } from './Competition';

@Entity('competitors')
export class Competitor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Competition, competition => competition.competitors)
    competition: Competition;

    @Column({ nullable: true })
    score: number;
}
