import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'
import { UsersRepository } from '../repositories/users-repository'

interface AddGameToLibraryUseCaseRequest {
  gameId: string
  userId: string
}

interface AddGameToLibraryUseCaseResponse {
  game: Game
}

export class AddGameToLibraryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private gamesRepository: GamesRepository
  ) { }

  async execute({
    gameId,
    userId
  }: AddGameToLibraryUseCaseRequest): Promise<AddGameToLibraryUseCaseResponse> {
    const game = await this.gamesRepository.findById(gameId)

    if (!game) {
      throw new Error('Game not found!')
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    user.games.push(game.id.toString())

    await this.usersRepository.save(user)

    return {
      game
    }
  }
}
