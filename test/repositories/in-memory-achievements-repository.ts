import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AchievementsRepository } from "@/domain/platina/application/repositories/achievements-repository";
import { Achievements } from "@/domain/platina/enterprise/entities/achievements";

export class InMemoryAchievementsRepository implements AchievementsRepository {
  public items: Achievements[] = []


  async findByGameId(gameId: string) {
    const achievements = this.items.filter((item) => item.gameId.toValue() === gameId)
    return achievements
  }

  async create(achievements: Achievements) {
    this.items.push(achievements)
  }

}