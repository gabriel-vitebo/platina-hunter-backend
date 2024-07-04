import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Achievements } from "../../enterprise/entities/achievements";

export interface AchievementsRepository {
  findByGameId(gameId: UniqueEntityId): Promise<Achievements[]>
  create(achievement: Achievements): Promise<void>
}
