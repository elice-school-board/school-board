import { Request, Response } from 'express';
import AppDataSource from '../database/data-source';
import { Competition } from '../entities/Competition';
import moment from 'moment-timezone';
import { config } from './config/config';
import { Competitor } from '../entities/Competitor';

export class CompetitionController {
    // 대회 정보 생성
    static createCompetition = async (req: Request, res: Response) => {
        const userId = req.user.userId;
        const { boardId, categoryId, name, date, competitors, type, award, result } = req.body;
        const competitionRepository = AppDataSource.getRepository(Competition);
        const competitorRepository = AppDataSource.getRepository(Competitor);

        const newCompetition = competitionRepository.create({
            userId,
            boardId,
            categoryId,
            name,
            date: new Date(date),
            type,
            award,
            result,
        });

        try {
            await competitionRepository.save(newCompetition);

            // Competitors 데이터 생성
            if (competitors && competitors.length > 0) {
                const newCompetitors = competitors.map((competitor: any) => {
                    return competitorRepository.create({
                        competition: newCompetition,
                        score: competitor.score,
                    });
                });

                await competitorRepository.save(newCompetitors);
            }
            res.status(201).json(newCompetition);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: '대회 정보 생성 실패' });
        }
    };

    // 모든 대회 정보 조회
    static getCompetitionsOnScoreBoard = async (req: Request, res: Response) => {
        const competitionRepository = AppDataSource.getRepository(Competition);
        try {
            const competitions = await competitionRepository.find({
                order: { date: 'DESC' },
                relations: ['competitors'], // Competitors 데이터를 함께 조회
            });

            const localTimeCompetitions = competitions.map(competition => ({
                ...competition,
                date: moment.tz(competition.date, config.timezone).format('YYYY-MM-DD'),
            }));

            res.status(200).json(localTimeCompetitions);
        } catch (error) {
            res.status(500).json({ message: '대회 정보 조회 실패' });
        }
    };

    // 특정 대회 정보 조회
    static getCompetitionById = async (req: Request, res: Response) => {
        const competitionId = Number(req.params.id);
        const competitionRepository = AppDataSource.getRepository(Competition);

        try {
            const competition = await competitionRepository.findOne({
                where: { id: competitionId },
                relations: ['competitors'], // Competitors 데이터를 함께 조회
            });

            if (competition) {
                const localTimeCompetition = {
                    ...competition,
                    date: moment.tz(competition?.date, config.timezone).format('YYYY-MM-DD'),
                };

                res.status(200).json(localTimeCompetition);
            } else {
                res.status(404).json({ message: '대회 정보를 찾을 수 없습니다.' });
            }
        } catch (error) {
            res.status(500).json({ message: '대회 정보 조회 실패' });
        }
    };

    // 대회 정보 수정
    static updateCompetition = async (req: Request, res: Response) => {
        const competitionId = Number(req.params.id);
        const { name, date, competitors, type, award, result } = req.body;
        const competitionRepository = AppDataSource.getRepository(Competition);
        const competitorRepository = AppDataSource.getRepository(Competitor);

        try {
            const competition = await competitionRepository.findOne({
                where: { id: competitionId },
                relations: ['competitors'],
            });

            if (competition) {
                competition.name = name;
                competition.date = new Date(date);
                competition.type = type;
                competition.competitors = competitors;
                competition.award = award;
                competition.result = result;

                await competitionRepository.save(competition);

                // 기존 Competitors 삭제 후 새로 생성
                if (competitors && competitors.length > 0) {
                    await competitorRepository.delete({ competition: competition });

                    const newCompetitors = competitors.map((competitor: any) => {
                        return competitorRepository.create({
                            competition: competition,
                            score: competitor.score,
                        });
                    });

                    await competitorRepository.save(newCompetitors);
                }
                res.status(200).json(competition);
            } else {
                res.status(404).json({ message: '대회 정보을 찾을 수 없습니다' });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: '대회 정보 수정 실패' });
        }
    };

    // 대회 정보 삭제
    static deleteCompetition = async (req: Request, res: Response) => {
        const competitionId = Number(req.params.id);
        const competitionRepository = AppDataSource.getRepository(Competition);
        const competitorRepository = AppDataSource.getRepository(Competitor);

        try {
            const competition = await competitionRepository.findOne({
                where: { id: competitionId },
                relations: ['competitors'],
            });

            if (competition) {
                await competitorRepository.delete({ competition: competition });
                await competitionRepository.remove(competition);
                res.status(204).send();
            } else {
                res.status(404).json({ message: '대회 정보을 찾을 수 없습니다' });
            }
        } catch (error) {
            res.status(500).json({ message: '대회 정보 삭제 실패' });
        }
    };
}
