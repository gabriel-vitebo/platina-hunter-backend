import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Progress } from '../../enterprise/entities/progress'
import { GamesRepository } from '../repositories/games-repository'
import { UsersRepository } from '../repositories/users-repository'
import { ProgressRepository } from '../repositories/progress-repository'
import { UserAchievement } from '../../enterprise/entities/user-achievement'

interface AddGameToLibraryUseCaseRequest {
  gameId: string
  userId: string
}

interface AddGameToLibraryUseCaseResponse { }

export class AddGameToLibraryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private gamesRepository: GamesRepository,
    private progressRepository: ProgressRepository
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

    user.games.push(game) //todo

    const userAchievements = game.achievements.map((item) => {
      return UserAchievement.create({
        achievement: item,
        isDone: false,
      })
    })

    const progress = Progress.create({
      user,
      game,
      userAchievements,
    }, new UniqueEntityId)

    await this.progressRepository.save(progress)

    return {}
  }
}
