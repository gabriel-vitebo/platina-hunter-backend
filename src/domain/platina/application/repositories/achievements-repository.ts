import { Achievements } from "../../enterprise/entities/achievements";

export interface AchievementsRepository {
  create(achievement: Achievements): Promise<void>
}
