import { GamesRepository } from '../repositories/games-repository'

interface GameDetailsUseCaseRequest {
  gameId: string
}

interface GameDetailsUseCaseResponse {
  game: {
    id: string,
    title: string,
    achievementsCount: number
  }
}

export class GameDetailsUseCase {
  constructor(private gameRepository: GamesRepository) { }

  async execute({ gameId }: GameDetailsUseCaseRequest): Promise<GameDetailsUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)
    if (!game) {
      throw new Error('Game not found!')
    }

    return {
      game: {
        id: game.id.toString(),
        title: game.title,
        achievementsCount: game.achievements.length,
      }
    }
  }
}
