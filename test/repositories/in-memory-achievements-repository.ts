import { AchievementsRepository } from "@/domain/platina/application/repositories/achievements-repository";
import { Achievements } from "@/domain/platina/enterprise/entities/achievements";

export class InMemoryAchievementsRepository implements AchievementsRepository {
  public items: Achievements[] = []

  async create(achievements: Achievements) {
    this.items.push(achievements)
  }

}