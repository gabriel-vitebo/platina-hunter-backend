import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { ProgressRepository } from '../repositories/progress-repository'

interface ProgressDetailsUseCaseRequest {
  userId: string
  gameId: string
}

interface ProgressDetailsUseCaseResponse {
  progress: {
    id: string,
    title: string,
    percentage: number,
    achievements: Array<{
      title: string,
      description?: string,
      isItLost: boolean,
      isDone: boolean
    }>,
  }
}

export class ProgressDetailsUseCase {
  constructor(private progressRepository: ProgressRepository) { }

  async execute({ userId, gameId }: ProgressDetailsUseCaseRequest): Promise<ProgressDetailsUseCaseResponse> {
    const progress = await this.progressRepository.findById(userId, gameId)
    if (!progress) {
      throw new Error('Progress Not Found!')
    }

    const achievements = progress.getAllAchievements()
    const percentage = progress.calculateThePercentageOfAchievements()

    return {
      progress: {
        id: progress.id.toString(),
        title: progress.game.title,
        percentage,
        achievements: achievements.map((item) => ({
          title: item.achievement.title,
          description: item.achievement.description,
          isItLost: item.achievement.isItLost,
          isDone: item.isDone
        })),
      }
    }
  }
}
