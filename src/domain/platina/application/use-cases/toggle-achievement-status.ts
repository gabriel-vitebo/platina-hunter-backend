import { UniqueEntityId } from '@/core/entities/unique-entity-id'
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
    const game = user.findGameById(new UniqueEntityId(gameId))
    const userAchievement = game.findUserAchievementById(new UniqueEntityId(achievementId))

    return {
      achievement: {
        title: userAchievement.achievement.title,
        isItLost: userAchievement.achievement.isItLost,
        description: userAchievement.achievement.description || '',
        isDone: userAchievement.isDone
      }
    }
  }
}
