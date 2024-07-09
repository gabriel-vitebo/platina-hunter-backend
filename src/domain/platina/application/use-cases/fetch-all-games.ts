import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Achievements } from '../../enterprise/entities/achievements'
import { AchievementsRepository } from '../repositories/achievements-repository'
import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'

interface FetchAllGamesUseCaseRequest {
  page: number
}

interface FetchAllGamesUseCaseResponse {
  games: Game[]
}

export class FetchAllGamesUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute({ page }: FetchAllGamesUseCaseRequest): Promise<FetchAllGamesUseCaseResponse> {
    const games = await this.gamesRepository.findMany({ page })

    return {
      games,
    }
  }
}
