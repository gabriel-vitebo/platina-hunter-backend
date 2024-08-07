import { GamesRepository } from '../repositories/games-repository'

interface GetGameBySlugUseCaseRequest {
  slug: string
}

interface GetGameBySlugUseCaseResponse {
  game: {
    id: string,
    title: string,
    achievementsCount: number
  }
}

export class GetGameBySlugUseCase {
  constructor(private gameRepository: GamesRepository) { }

  async execute({ slug }: GetGameBySlugUseCaseRequest): Promise<GetGameBySlugUseCaseResponse> {
    const game = await this.gameRepository.findBySlug(slug)
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
