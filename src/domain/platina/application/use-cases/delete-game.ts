import { GamesRepository } from '../repositories/games-repository'

interface DeleteGameUseCaseRequest {
  userId: string
  gameId: string
}

interface DeleteGameUseCaseResponse {}

export class DeleteGameUseCase {
  constructor(private gameRepository: GamesRepository) {}

  async execute({
    userId,
    gameId,
  }: DeleteGameUseCaseRequest): Promise<DeleteGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      throw new Error('Game Not Found!')
    }

    if (userId !== game.userId.toString()) {
      throw new Error('Not Allow!')
    }

    await this.gameRepository.delete(game)

    return {}
  }
}
