import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AchievementsRepository } from "@/domain/platina/application/repositories/achievements-repository";
import { Achievements } from "@/domain/platina/enterprise/entities/achievements";

export class InMemoryAchievementsRepository implements AchievementsRepository {
  public items: Achievements[] = []

  async findById(achievementsId: string) {
    const achievement = this.items.find((item) => item.id.toString() === achievementsId)

    if (!achievement) {
      return null
    }

    return achievement
  }

  async findByGameId(gameId: string) {
    const achievements = this.items.filter((item) => item.gameId.toValue() === gameId)
    return achievements
  }

  async create(achievements: Achievements) {
    this.items.push(achievements)
  }

  async save(achievement: Achievements) {
    const itemIndex = this.items.findIndex((item) => item.id === achievement.id)

    this.items[itemIndex] = achievement
  }

  async delete(achievement: Achievements) {
    const itemIndex = this.items.findIndex((item) => item.id === achievement.id)

    this.items.splice(itemIndex, 1)
  }

}