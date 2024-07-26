import { InMemoryGamesRepository } from 'test/repositories/in-memory-games-repository'
import { makeGame } from 'test/factories/make-game'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AddGameToLibraryUseCase } from '../add-game-to-library'
import { makeUsers } from 'test/factories/make-users'
import { InMemoryProgressRepository } from 'test/repositories/in-memory-progress-repository'

let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let sut: AddGameToLibraryUseCase

describe('Add game to Library', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new AddGameToLibraryUseCase(
      inMemoryUsersRepository,
      inMemoryProgressRepository,
      inMemoryGamesRepository,
    )
  })

  it('should be able to add a game to library', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      const game = makeGame({}, {}, i, new UniqueEntityId(`game-${i}`))
      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString(),
      })

      const progress = await inMemoryProgressRepository.findById(
        user.id.toString(),
        game.id.toString(),
      )

      expect(progress).toBeDefined()
      expect(progress?.userAchievements).toHaveLength(game.achievements.length)
      expect(progress?.getAchievementsDone()).toHaveLength(0)
    }

    expect(inMemoryUsersRepository.items[0].gamesProgress).toHaveLength(4)
  })

  it('should be possible add game from other user to library', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-2'))
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      const game = makeGame({}, {}, 1, new UniqueEntityId(`game-${i}`))

      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString(),
      })
    }

    expect(inMemoryUsersRepository.items[0].gamesProgress).toHaveLength(4)
  })

  it('should not be possible to add a repeated game', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)

    const game = makeGame({}, {}, 1, new UniqueEntityId(`game-1`))
    await inMemoryGamesRepository.create(game)

    await sut.execute({
      userId: user.id.toString(),
      gameId: game.id.toString(),
    })

    await expect(async () => {
      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString(),
      })
    }).rejects.toThrow('Game already in library!')
  })
})
