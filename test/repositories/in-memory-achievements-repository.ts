import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AchievementsRepository } from "@/domain/platina/application/repositories/achievements-repository";
import { Achievements } from "@/domain/platina/enterprise/entities/achievements";

export class InMemoryAchievementsRepository implements AchievementsRepository {
  public items: Achievements[] = []

  async findByGameId(gameId: UniqueEntityId) {
    const achievements = this.items.filter((item) => item.gameId === gameId)

    return achievements
  }

  async create(achievements: Achievements) {
    this.items.push(achievements)
  }

}