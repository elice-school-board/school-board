import { Request, Response } from 'express';
import AppDataSource from '../database/data-source';
import { Point } from '../entities/Point';
import { Between, Raw } from 'typeorm';

export class PointController {
    // 팀, 이벤트, 점수 생성
    static addPoints = async (req: Request, res: Response) => {
        const { teamNames, event, scores, date } = req.body;
        const pointRepository = AppDataSource.getRepository(Point);

        try {
            // 하나의 event에 해당하는 팀들, 점수들, 날짜 for문으로 하나씩 저장한다.
            let points = [];
            for (let i = 0; i < teamNames.length; i++) {
                const newPoint = pointRepository.create({
                    team: teamNames[i],
                    event: event,
                    score: scores[i],
                    date: date,
                });

                const point = await pointRepository.save(newPoint);
                points.push(point);
            }
            return res.status(200).json({ message: '점수 생성 성공', points });
        } catch (error) {
            res.status(500).json({ message: '점수 생성 실패' });
        }
    };

    // 팀, 이벤트, 점수 조회
    static getAllPoints = async (req: Request, res: Response) => {
        const year = req.query.year;
        const pointRepository = AppDataSource.getRepository(Point);

        // 점수판을 보여주는 기간 (해당 연도)
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
        try {
            // 기록한 팀 최신순대로 보여줌(나이 어린 팀이 처음온다)
            const scores = await pointRepository.find({
                where: {
                    date: Between(startDate, endDate),
                },
                order: { id: 'DESC' },
            });

            res.status(200).json(scores);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Grade Points를 조회하는데 실패했습니다.' });
        }
    };

    // 팀, 이벤트, 점수 수정
    static updatePoints = async (req: Request, res: Response) => {
        const { pointsId, teamNames, event, scores, date } = req.body;
        const pointRepository = AppDataSource.getRepository(Point);

        try {
            // 반복문을 통해 각각의 점수를 업데이트
            let updatedPoints = [];
            for (let i = 0; i < teamNames.length; i++) {
                const point = await pointRepository.findOne({ where: { id: pointsId[i] } });

                if (point) {
                    point.team = teamNames[i];
                    point.event = event;
                    point.score = scores[i];
                    point.date = date;
                    await pointRepository.save(point);
                    updatedPoints.push(point);
                } else {
                    res.status(404).json({ message: '점수를 찾을 수 없습니다.' });
                }
            }
            res.status(200).json(updatedPoints);

            res.status(200).json({ message: '점수가 성공적으로 업데이트되었습니다.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '점수 업데이트 실패' });
        }
    };

    // 팀, 이벤트, 점수 삭제
    static deletePoints = async (req: Request, res: Response) => {
        const { pointsId } = req.body;
        const pointRepository = AppDataSource.getRepository(Point);

        try {
            for (let i = 0; i < pointsId.length; i++) {
                const point = await pointRepository.findOne({ where: { id: pointsId[i] } });

                if (point) {
                    await pointRepository.delete(point);
                } else {
                    res.status(404).json({ message: '점수를 찾을 수 없습니다' });
                }
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: '점수 삭제 실패' });
        }
    };
}
