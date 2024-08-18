import { Request, Response } from 'express';
import AppDataSource from '../database/data-source';
import { Coach } from '../entities/Coach';

export class CoachController {
    static craeteCoach = async (req: Request, res: Response) => {
        const { categoryId, year, season, name, description } = req.body;

        // 유효성 검사
        if (!categoryId || !year || !season || !name || !description) {
            return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }

        try {
            const coachRepository = AppDataSource.getRepository(Coach);

            const newCoach = coachRepository.create({
                categoryId,
                year,
                season,
                name,
                description,
            });

            await coachRepository.save(newCoach);

            res.status(201).json({ message: '코치가 성공적으로 생성되었습니다.', coach: newCoach });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '코치 생성 실패' });
        }
    };

    // 코치 조회 (특정 연도와 시즌에 해당하는 코치 조회)
    static getCoach = async (req: Request, res: Response) => {
        const { categoryId, year, season } = req.body;

        const coachRepository = AppDataSource.getRepository(Coach);

        try {
            if (!year || isNaN(Number(year))) {
                return res.status(400).json({ message: '유효한 연도를 입력하세요.' });
            }

            const coach = await coachRepository.findOne({ where: { categoryId, year, season } });

            if (!coach) {
                return res.status(404).json({ message: '해당 코치를 찾을 수 없습니다.' });
            }

            res.status(200).json(coach);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '코치 조회 실패' });
        }
    };

    static updateCoach = async (req: Request, res: Response) => {
        const { id } = req.params; // 코치 아이디
        const { categoryId, year, season, name, description } = req.body;

        const coachRepository = AppDataSource.getRepository(Coach);

        try {
            const coach = await coachRepository.findOne({ where: { id: Number(id) } });

            if (coach) {
                coach.categoryId = categoryId;
                coach.year = year;
                coach.season = season;
                coach.name = name;
                coach.description = description;
            } else {
                res.status(404).json({ message: '코치를 찾을 수 없습니다' });
            }

            await coachRepository.save(coach);

            res.status(200).json({ message: '코치 정보가 업데이트되었습니다.', coach });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '코치 업데이트 실패' });
        }
    };

    static deleteCoach = async (req: Request, res: Response) => {
        const { id } = req.params;

        const coachRepository = AppDataSource.getRepository(Coach);

        try {
            const coach = await coachRepository.findOne({ where: { id: Number(id) } });

            if (!coach) {
                return res.status(404).json({ message: '코치를 찾을 수 없습니다.' });
            }

            await coachRepository.remove(coach);

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '코치 삭제 실패' });
        }
    };
}
