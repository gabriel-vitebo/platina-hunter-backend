import { Achievement } from "../../enterprise/entities/achievement";

export interface AchievementRepository {
  findById(achievementId: string): Promise<Achievement | null>
  findByGameId(gameId: string): Promise<Achievement[]>
  create(achievement: Achievement): Promise<void>
  save(achievement: Achievement): Promise<void>
  delete(achievement: Achievement): Promise<void>
}
