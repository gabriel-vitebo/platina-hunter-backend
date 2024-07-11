import { GamesRepository } from '../repositories/games-repository'

interface EditGameUseCaseRequest {
  userId: string
  gameId: string
  title: string
  achievements: Array<{
    id: string,
    title: string,
    description?: string,
    isItLost: boolean
  }>
}

interface EditGameUseCaseResponse {
  game: {
    title: string,
    achievements: Array<{
      title: string,
      description: string,
      isItLost: boolean
    }>
  }
}

export class EditGameUseCase {
  constructor(private gameRepository: GamesRepository) { }

  async execute({
    userId,
    gameId,
    title,
    achievements
  }: EditGameUseCaseRequest): Promise<EditGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      throw new Error('Game Not Found!')
    }

    if (userId !== game.userId.toString()) {
      throw new Error('Not Allow!')
    }

    game.title = title

    achievements.forEach((achievement) => {
      const existingAchievement = game.achievements.find(item => item.id.toString() === achievement.id)

      if (!existingAchievement) {
        throw new Error('Achievement not found!')
      }

      existingAchievement.title = achievement.title
      existingAchievement.description = achievement.description || existingAchievement.description
      existingAchievement.isItLost = achievement.isItLost

    })

    await this.gameRepository.save(game)

    return {
      game: {
        title: game.title,
        achievements: game.achievements.map((item) => ({
          title: item.title,
          description: item.description,
          isItLost: item.isItLost
        })),
      }
    }
  }
}
