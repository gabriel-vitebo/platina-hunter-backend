import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Game } from '../../enterprise/entities/game'
import { GamesRepository } from '../repositories/games-repository'
import { Achievement } from '../../enterprise/entities/achievement'
import { AchievementRepository } from '../repositories/achievements-repository'

interface RegisterGameUseCaseRequest {
  userId: string
  title: string
  achievements: {
    title: string
    isItLost: boolean
    description?: string
  }[]
}

interface RegisterGameUseCaseResponse {
  title: string
  achievementsCount: number
}

export class RegisterGameUseCase {
  constructor(
    private gameRepository: GamesRepository,
    private achievementRepository: AchievementRepository
  ) { }

  async execute({
    userId,
    title,
    achievements
  }: RegisterGameUseCaseRequest): Promise<RegisterGameUseCaseResponse> {
    if (achievements.length <= 0) {
      throw new Error('It is not allowed to create a game without achievements')
    }

    const game = Game.create({
      userId: new UniqueEntityId(userId),
      title,
      achievements: [],
    })

    await this.gameRepository.create(game)

    const achievementInstances = achievements.map(achievement =>
      Achievement.create({
        gameId: game.id,
        title: achievement.title,
        isItLost: achievement.isItLost,
        description: achievement.description
      })
    );

    for (const achievement of achievementInstances) {
      await this.achievementRepository.create(achievement)
    }

    game.achievements = achievementInstances

    await this.gameRepository.save(game)

    game.achievements.length
    game.title

    return {
      title: game.title,
      achievementsCount: game.achievements.length
    }
  }
}
