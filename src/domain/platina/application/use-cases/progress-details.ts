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
    achievementsDone: Array<{
      title: string,
      description?: string,
      isItLost: boolean
    }>,
    achievementsUndone: Array<{
      title: string,
      description?: string,
      isItLost: boolean
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

    const percentage = progress.calculateThePercentageOfAchievements()

    return {
      progress: {
        id: progress.id.toString(),
        title: progress.game.title,
        percentage,
        achievementsDone: progress.achievementsDone.map((item) => ({
          title: item.title,
          description: item.description,
          isItLost: item.isItLost
        })),
        achievementsUndone: progress.achievementsUndone.map((item) => ({
          title: item.title,
          description: item.description,
          isItLost: item.isItLost
        })),
      }
    }
  }
}
