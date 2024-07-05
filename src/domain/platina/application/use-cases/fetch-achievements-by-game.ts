import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Achievements } from '../../enterprise/entities/achievements'
import { AchievementsRepository } from '../repositories/achievements-repository'

interface FetchAchievementsUseCaseRequest {
  gameId: UniqueEntityId
}

interface FetchAchievementsUseCaseResponse {
  achievements: Achievements[]
}

export class FetchAchievementsUseCase {
  constructor(private achievementsRepository: AchievementsRepository) { }

  async execute({ gameId }: FetchAchievementsUseCaseRequest): Promise<FetchAchievementsUseCaseResponse> {
    const achievements = await this.achievementsRepository.findByGameId(gameId)

    return {
      achievements,
    }
  }
}