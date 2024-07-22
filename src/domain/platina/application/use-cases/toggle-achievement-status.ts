import { AchievementRepository } from '../repositories/achievements-repository'
import { ProgressRepository } from '../repositories/progress-repository'
import { UsersRepository } from '../repositories/users-repository'

interface ToggleAchievementStatusUseCaseRequest {
  gameId: string
  userId: string
  achievementId: string
}

interface ToggleAchievementStatusUseCaseResponse {
  achievement: {
    title: string
    isItLost: boolean
    description?: string
    isDone: boolean
  }
}

export class ToggleAchievementStatusUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private achievementRepository: AchievementRepository,
    private progressRepository: ProgressRepository,
  ) { }

  async execute({
    gameId,
    userId,
    achievementId
  }: ToggleAchievementStatusUseCaseRequest): Promise<ToggleAchievementStatusUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    const achievement = await this.achievementRepository.findById(achievementId)
    if (!achievement) {
      throw new Error('Achievement not found!')
    }

    let progress = await this.progressRepository.findById(userId, gameId)
    if (!progress) {
      throw new Error('progress not found!')
    }

    progress.toggleAchievement(achievement)

    await this.progressRepository.save(progress)

    return {
      achievement: {
        title: achievement.title,
        isItLost: achievement.isItLost,
        description: achievement.description || '',
        isDone: progress.isDone(achievement)
      }
    }
  }
}
