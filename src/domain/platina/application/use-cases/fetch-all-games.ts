import { GamesRepository } from '../repositories/games-repository'

interface FetchAllGamesUseCaseRequest {
  page: number
}

interface FetchAllGamesUseCaseResponse {
  games: {
    title: string,
    achievementsCount: number
  }[]
}

export class FetchAllGamesUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute({ page }: FetchAllGamesUseCaseRequest): Promise<FetchAllGamesUseCaseResponse> {
    const games = await this.gamesRepository.findMany({ page })

    return {
      games: games.map((game) => ({
        title: game.title,
        achievementsCount: game.achievements.length
      }))
    }
  }
}
