import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AddGameToLibraryUseCase } from "../add-game-to-library";
import { makeUsers } from "test/factories/make-users";

let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AddGameToLibraryUseCase

describe('Add game to Library', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AddGameToLibraryUseCase(
      inMemoryUsersRepository,
      inMemoryGamesRepository
    )
  })

  it('should be able to add a game to library', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      let game = makeGame(
        {}, new UniqueEntityId(`game-${i}`)
      )

      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString()
      })
    }

    expect(inMemoryUsersRepository.items[0].games).toHaveLength(4)
  })

  it('should be possible add game from other user to library', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-2'))
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      let game = makeGame(
        {}, new UniqueEntityId(`game-${i}`)
      )

      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString()
      })
    }

    expect(inMemoryUsersRepository.items[0].games).toHaveLength(4)
  })
})