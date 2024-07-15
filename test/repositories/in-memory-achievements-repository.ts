import { AchievementRepository } from "@/domain/platina/application/repositories/achievements-repository";
import { Achievement } from "@/domain/platina/enterprise/entities/achievement";

export class InMemoryAchievementsRepository implements AchievementRepository {
  public items: Achievement[] = []

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

  async create(achievements: Achievement) {
    this.items.push(achievements)
  }

  async save(achievement: Achievement) {
    const itemIndex = this.items.findIndex((item) => item.id === achievement.id)

    this.items[itemIndex] = achievement
  }

  async delete(achievement: Achievement) {
    const itemIndex = this.items.findIndex((item) => item.id === achievement.id)

    this.items.splice(itemIndex, 1)
  }

}