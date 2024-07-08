import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'

interface EditGameUseCaseRequest {
  userId: string
  gameId: string
  title: string
  numberOfAchievements: number
}

interface EditGameUseCaseResponse {
  game: Game
}

export class EditGameUseCase {
  constructor(private gameRepository: GamesRepository) { }

  async execute({
    userId,
    gameId,
    title,
    numberOfAchievements
  }: EditGameUseCaseRequest): Promise<EditGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      throw new Error('Game Not Found!')
    }

    if (userId !== game.userId.toString()) {
      throw new Error('Not Allow!')
    }

    game.title = title
    game.numberOfAchievements = numberOfAchievements

    await this.gameRepository.save(game)

    return {
      game
    }
  }
}
