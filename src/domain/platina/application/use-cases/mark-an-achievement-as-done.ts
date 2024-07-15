import { AchievementRepository } from '../repositories/achievements-repository'
import { ProgressRepository } from '../repositories/progress-repository'
import { UsersRepository } from '../repositories/users-repository'

interface MarkAnAchievementAsDoneUseCaseRequest {
  gameId: string
  userId: string
  achievementId: string
}

interface MarkAnAchievementAsDoneUseCaseResponse {
  achievementsDone: [{
    title: string
    isItLost: boolean
    description?: string
  }]
}

export class MarkAnAchievementAsDoneUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private achievementRepository: AchievementRepository,
    private progressRepository: ProgressRepository,
  ) { }

  async execute({
    gameId,
    userId,
    achievementId
  }: MarkAnAchievementAsDoneUseCaseRequest): Promise<MarkAnAchievementAsDoneUseCaseResponse> {
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

    progress.doneAchievement(achievement)
    await this.progressRepository.save(progress)

    return {
      achievementsDone: [{
        title: achievement.title,
        isItLost: achievement.isItLost,
        description: achievement.description || ''
      }]
    }

  }
}
