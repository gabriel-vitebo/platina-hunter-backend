import { AchievementRepository } from '../repositories/achievements-repository'
import { ProgressRepository } from '../repositories/progress-repository'
import { UsersRepository } from '../repositories/users-repository'

interface MarkAnAchievementAsDoneUseCaseRequest {
  gameId: string
  userId: string
  achievementId: string
}

interface MarkAnAchievementAsDoneUseCaseResponse {
  achievement: {
    title: string
    isItLost: boolean
    description?: string
    done: boolean
  }
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

    const achievementDone = progress.achievementsDone.find((item) => item.id === achievement.id)
    let done: boolean


    if (achievementDone) {
      progress.undoneAchievement(achievement)
      done = false
    } else {
      progress.doneAchievement(achievement)
      done = true
    }

    await this.progressRepository.save(progress)

    return {
      achievement: {
        title: achievement.title,
        isItLost: achievement.isItLost,
        description: achievement.description || '',
        done: done
      }
    }

  }
}
