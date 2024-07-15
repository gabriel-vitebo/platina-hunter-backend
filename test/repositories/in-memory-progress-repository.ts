import { ProgressRepository } from "@/domain/platina/application/repositories/progress-repository";
import { Progress } from "@/domain/platina/enterprise/entities/progress";

export class InMemoryProgressRepository implements ProgressRepository {
  public items: Progress[] = []

  async findById(userId: string, gameId: string) {
    const progress = this.items.find((item) =>
      item.user.id.toString() === userId &&
      item.game.id.toString() === gameId
    )

    if (!progress) {
      return null
    }

    return progress
  }

  async create(progress: Progress) {
    this.items.push(progress)
  }

  async save(progress: Progress) {
    const itemIndex = this.items.findIndex((item) => item.id === progress.id)
    if (itemIndex >= 0) {
      this.items[itemIndex] = progress
    } else {
      this.items.push(progress)
    }
  }
}