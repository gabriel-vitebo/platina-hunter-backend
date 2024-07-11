import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'

interface FetchAllGamesUseCaseRequest {
  page: number
}

interface FetchAllGamesUseCaseResponse {
  games: {
    title: string
  }[]
}

export class FetchAllGamesUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute({ page }: FetchAllGamesUseCaseRequest): Promise<FetchAllGamesUseCaseResponse> {
    const games = await this.gamesRepository.findMany({ page })

    return {
      games: games.map((game) => ({
        title: game.title
      }))
    }
  }
}
