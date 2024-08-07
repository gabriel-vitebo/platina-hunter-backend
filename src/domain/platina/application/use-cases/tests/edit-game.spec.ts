import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { makeGame } from "test/factories/make-game";
import { EditGameUseCase } from "../edit-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: EditGameUseCase

describe('Edit Game', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new EditGameUseCase(inMemoryGamesRepository)
  })

  it('should be able to edit a game', async () => {
    const newGame = makeGame({
      userId: new UniqueEntityId('user-1')
    })

    await inMemoryGamesRepository.create(newGame)

    await sut.execute({
      userId: 'user-1',
      gameId: newGame.id.toValue(),
      title: 'Jogo Teste',
      achievements: [
        {
          id: newGame.achievements[0].id.toString(),
          title: 'Updated Conquista um',
          description: 'Updated Description um',
          isItLost: false
        }
      ]
    })

    expect(inMemoryGamesRepository.items[0]).toMatchObject({
      title: 'Jogo Teste',
      achievements: [
        {
          title: 'Updated Conquista um',
          description: 'Updated Description um',
          isItLost: false
        }
      ]
    })
  })

  it('should not be able to edit a game from another user', async () => {
    const newGame = makeGame({
      userId: new UniqueEntityId('user-1')
    }, {}, 1, new UniqueEntityId('game-1'))

    await inMemoryGamesRepository.create(newGame)

    expect(() => {
      return sut.execute({
        userId: 'user-2',
        gameId: newGame.id.toValue(),
        title: 'Jogo Teste',
        achievements: [
          {
            id: newGame.achievements[0].id.toString(),
            title: newGame.achievements[0].title,
            description: newGame.achievements[0].description,
            isItLost: newGame.achievements[0].isItLost,
          }
        ]
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit a achievement that not exist', async () => {
    const newGame = makeGame()

    await inMemoryGamesRepository.create(newGame)

    expect(() => {
      return sut.execute({
        userId: newGame.userId.toValue(),
        gameId: newGame.id.toValue(),
        title: 'Jogo Teste',
        achievements: [
          {
            id: 'non-exist-id',
            title: newGame.achievements[0].title,
            description: newGame.achievements[0].description,
            isItLost: newGame.achievements[0].isItLost,
          }
        ]
      })
    }).rejects.toBeInstanceOf(Error)
  })
})