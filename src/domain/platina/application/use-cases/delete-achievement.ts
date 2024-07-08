import { AchievementsRepository } from '../repositories/achievements-repository'

interface DeleteAchievementUseCaseRequest {
  gameId: string
  achievementsId: string
}

interface DeleteAchievementUseCaseResponse { }

export class DeleteAchievementUseCase {
  constructor(private achievementsRepository: AchievementsRepository) { }

  async execute({
    gameId,
    achievementsId
  }: DeleteAchievementUseCaseRequest): Promise<DeleteAchievementUseCaseResponse> {
    const achievements = await this.achievementsRepository.findById(achievementsId)

    if (!achievements) {
      throw new Error('Achievements Not Found!')
    }

    if (gameId !== achievements.gameId.toString()) {
      throw new Error('Not Allow!')
    }

    await this.achievementsRepository.delete(achievements)

    return {}
  }
}
