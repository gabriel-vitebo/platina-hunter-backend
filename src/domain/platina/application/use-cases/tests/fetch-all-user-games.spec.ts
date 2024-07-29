import { FetchAllUserGamesUseCase } from '../fetch-all-user-games'
import { makeGame } from 'test/factories/make-game'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUsers } from 'test/factories/make-users'
import { InMemoryGamesRepository } from 'test/repositories/in-memory-games-repository'
import { InMemoryProgressRepository } from 'test/repositories/in-memory-progress-repository'
import { UserAchievement } from '@/domain/platina/enterprise/entities/user-achievement'
import { Progress } from '@/domain/platina/enterprise/entities/progress'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let sut: FetchAllUserGamesUseCase

describe('Fetch All  User Games', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryGamesRepository = new InMemoryGamesRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    sut = new FetchAllUserGamesUseCase(inMemoryUsersRepository)
  })

  it('should be able to fetch all user games', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'))
    inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      const game = makeGame({ userId: new UniqueEntityId('user-1') })
      await inMemoryGamesRepository.create(game)

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

      await inMemoryProgressRepository.create(progress)

      user.gamesProgress.push(progress)
      await inMemoryUsersRepository.save(user)
    }

    const anotherGame = makeGame({ userId: new UniqueEntityId('user-2') })
    inMemoryGamesRepository.create(anotherGame)

    const { games } = await sut.execute({
      userId: user.id.toString(),
      page: 1,
    })

    expect(games).toHaveLength(4)
  })

  it('should be able to fetch paginated all user games', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'))
    inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 22; i++) {
      const game = makeGame({ userId: new UniqueEntityId('user-1') })
      await inMemoryGamesRepository.create(game)

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

      await inMemoryProgressRepository.create(progress)

      user.gamesProgress.push(progress)
      await inMemoryUsersRepository.save(user)
    }

    const { games } = await sut.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(games).toHaveLength(2)
  })
})
