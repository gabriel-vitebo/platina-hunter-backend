import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Progress } from '../../enterprise/entities/progress'
import { UsersRepository } from '../repositories/users-repository'
import { ProgressRepository } from '../repositories/progress-repository'
import { UserAchievement } from '../../enterprise/entities/user-achievement'
import { GamesRepository } from '../repositories/games-repository'

interface AddGameToLibraryUseCaseRequest {
  gameId: string
  userId: string
}

interface AddGameToLibraryUseCaseResponse {}

export class AddGameToLibraryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private progressRepository: ProgressRepository,
    private gamesRepository: GamesRepository,
  ) {}

  async execute({
    gameId,
    userId,
  }: AddGameToLibraryUseCaseRequest): Promise<AddGameToLibraryUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    user.checkIfTheGameIsAlreadyAdded(new UniqueEntityId(gameId))

    const game = await this.gamesRepository.findById(gameId)

    if (!game) {
      throw new Error('Game not found!')
    }

    const userAchievements = game.achievements.map((item) => {
      return UserAchievement.create({
        achievement: item,
        isDone: false,
      })
    })

    const progress = Progress.create(
      {
        user,
        game,
        userAchievements,
      },
      new UniqueEntityId(),
    )

    user.gamesProgress.push(progress)

    await this.progressRepository.save(progress)
    await this.usersRepository.save(user)

    return {}
  }
}
