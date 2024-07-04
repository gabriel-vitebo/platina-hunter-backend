import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'

interface RegisterGameUseCaseRequest {
  userId: string
  title: string
  numberOfAchievements: number
}

interface RegisterGameUseCaseResponse {
  game: Game
}

export class RegisterGameUseCase {
  constructor(private gameRepository: GamesRepository) { }

  async execute({
    userId,
    title,
    numberOfAchievements,
  }: RegisterGameUseCaseRequest): Promise<RegisterGameUseCaseResponse> {
    const game = Game.create({
      userId: new UniqueEntityId(userId),
      title,
      numberOfAchievements,
    })

    await this.gameRepository.create(game)

    return {
      game,
    }
  }
}
