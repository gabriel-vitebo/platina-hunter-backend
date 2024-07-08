import { Achievements } from '../../enterprise/entities/achievements'
import { AchievementsRepository } from '../repositories/achievements-repository'

interface EditAchievementUseCaseRequest {
  gameId: string
  achievementId: string
  isItLost: boolean
  description?: string
}

interface EditAchievementUseCaseResponse {
  achievement: Achievements
}

export class EditAchievementUseCase {
  constructor(private achievementsRepository: AchievementsRepository) { }

  async execute({
    gameId,
    achievementId,
    isItLost,
    description
  }: EditAchievementUseCaseRequest): Promise<EditAchievementUseCaseResponse> {
    const achievement = await this.achievementsRepository.findById(achievementId)

    if (!achievement) {
      throw new Error('Achievement Not Found!')
    }

    if (gameId !== achievement.gameId.toString()) {
      throw new Error('Not Allow!')
    }

    achievement.isItLost = isItLost
    achievement.description = description ?? achievement.description

    await this.achievementsRepository.save(achievement)

    return {
      achievement
    }
  }
}
