import { InMemoryGamesRepository } from 'test/repositories/in-memory-games-repository'
import { makeGame } from 'test/factories/make-game'
import { DeleteGameUseCase } from '../delete-game'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: DeleteGameUseCase

describe('Delete Game', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new DeleteGameUseCase(inMemoryGamesRepository)
  })

  it('should be able to delete a game', async () => {
    const newGame = makeGame(
      {
        userId: new UniqueEntityId('user-1'),
      },
      {},
      1,
      new UniqueEntityId('game-1'),
    )

    await inMemoryGamesRepository.create(newGame)

    await sut.execute({
      userId: 'user-1',
      gameId: 'game-1',
    })

    expect(inMemoryGamesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a game from another user', async () => {
    const newGame = makeGame(
      {
        userId: new UniqueEntityId('user-1'),
      },
      {},
      1,
      new UniqueEntityId('game-1'),
    )

    await inMemoryGamesRepository.create(newGame)

    expect(() => {
      return sut.execute({
        userId: 'user-2',
        gameId: 'game-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
