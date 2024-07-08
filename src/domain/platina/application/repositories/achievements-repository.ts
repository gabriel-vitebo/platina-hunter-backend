import { Achievements } from "../../enterprise/entities/achievements";

export interface AchievementsRepository {
  findById(achievementsId: string): Promise<Achievements | null>
  findByGameId(gameId: string): Promise<Achievements[]>
  create(achievement: Achievements): Promise<void>
  delete(achievement: Achievements): Promise<void>
}
