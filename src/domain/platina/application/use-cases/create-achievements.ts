import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Achievements } from '../../enterprise/entities/achievements'
import { AchievementsRepository } from '../repositories/achievements-repository'

interface CreateAchievementsUseCaseRequest {
  gameId: string
  title: string
  isItLost: boolean
  description?: string
}

interface CreateAchievementsUseCaseResponse {
  achievement: Achievements
}

export class CreateAchievementUseCase {
  constructor(private achievementsRepository: AchievementsRepository) { }

  async execute({
    gameId,
    title,
    description,
    isItLost
  }: CreateAchievementsUseCaseRequest): Promise<CreateAchievementsUseCaseResponse> {
    const achievement = Achievements.create({
      gameId: new UniqueEntityId(gameId),
      title,
      description,
      isItLost
    })

    await this.achievementsRepository.create(achievement)

    return {
      achievement,
    }
  }
}
