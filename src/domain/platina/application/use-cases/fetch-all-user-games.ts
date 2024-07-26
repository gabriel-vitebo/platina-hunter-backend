import { UsersRepository } from '../repositories/users-repository'

interface FetchAllUserGamesUseCaseRequest {
  userId: string
  page: number
}

interface FetchAllUserGamesUseCaseResponse {
  games: {
    title: string
    achievementsCount: number
  }[]
}

export class FetchAllUserGamesUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    page,
  }: FetchAllUserGamesUseCaseRequest): Promise<FetchAllUserGamesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User Not Found!')
    }

    const gameList = user.games.slice((page - 1) * 20, page * 20)

    return {
      games: gameList.map((game) => ({
        title: game.title,
        achievementsCount: game.achievements.length,
      })),
    }
  }
}
