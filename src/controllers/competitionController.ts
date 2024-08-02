import { Request, Response } from "express";
import AppDataSource from "../config/ormconfig";
import { Competition } from "../entities/Comptition";

export class CompetitionController {
  // 대회 정보 생성
  static createCompetition = async (req: Request, res: Response) => {
    const {
      userId,
      boardId,
      categoryId,
      name,
      date,
      competitorA,
      competitorB,
      type,
    } = req.body;
    const competitionRepository = AppDataSource.getRepository(Competition);

    const newCompetition = competitionRepository.create({
      userId,
      boardId,
      categoryId,
      name,
      date,
      competitorA,
      competitorB,
      type,
    });

    try {
      await competitionRepository.save(newCompetition);
      res.status(201).json(newCompetition);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "대회 정보 생성 실패" });
    }
  };

  // 모든 대회 정보 조회
  static getAllCompetitions = async (req: Request, res: Response) => {
    const competitionRepository = AppDataSource.getRepository(Competition);
    try {
      const competitions = await competitionRepository.find({
        order: { date: "DESC" },
      });

      res.status(200).json(competitions);
    } catch (error) {
      res.status(500).json({ message: "대회 정보 조회 실패" });
    }
  };

  // 특정 대회 정보 조회
  static getCompetitionById = async (req: Request, res: Response) => {
    const competitionId = parseInt(req.params.id);
    const competitionRepository = AppDataSource.getRepository(Competition);

    try {
      const competition = await competitionRepository.findOne({
        where: { id: competitionId },
      });

      res.status(200).json(competition);
    } catch (error) {
      res.status(500).json({ message: "대회 정보 조회 실패" });
    }
  };

  // 대회 정보 수정
  static updateCompetition = async (req: Request, res: Response) => {
    const competitionId = parseInt(req.params.id);
    const { name, date, competitorA, competitorB, type } = req.body;
    const competitionRepository = AppDataSource.getRepository(Competition);

    try {
      const competition = await competitionRepository.findOne({
        where: { id: competitionId },
      });
      if (competition) {
        competition.name = name;
        competition.date = date;
        competition.competitorA = competitorA;
        competition.competitorB = competitorB;
        competition.type = type;
        await competitionRepository.save(competition);

        res.status(200).json(competition);
      } else {
        res.status(404).json({ message: "대회 정보을 찾을 수 없습니다" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "대회 정보 수정 실패" });
    }
  };

  // 대회 정보 삭제
  static deleteCompetition = async (req: Request, res: Response) => {
    const competitionId = parseInt(req.params.id);
    const competitionRepository = AppDataSource.getRepository(Competition);

    try {
      const competition = await competitionRepository.findOne({
        where: { id: competitionId },
      });
      if (competition) {
        await competitionRepository.remove(competition);
        res.status(204).send();
      } else {
        res.status(404).json({ message: "대회 정보을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "대회 정보 삭제 실패" });
    }
  };
}