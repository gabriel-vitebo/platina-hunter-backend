import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AddGameToLibraryUseCase } from "../add-game-to-library";
import { makeUsers } from "test/factories/make-users";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";

let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let sut: AddGameToLibraryUseCase

describe('Add game to Library', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    sut = new AddGameToLibraryUseCase(
      inMemoryUsersRepository,
      inMemoryGamesRepository,
      inMemoryProgressRepository
    )
  })

  it('should be able to add a game to library', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      let game = makeGame({}, {}, i, new UniqueEntityId(`game-${i}`))

      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString()
      })

      const progress = await inMemoryProgressRepository.findById(user.id.toString(), game.id.toString());

      expect(progress).toBeDefined();
      expect(progress?.achievementsPending).toHaveLength(game.achievements.length);
      expect(progress?.achievementsDone).toHaveLength(0);
    }

    expect(inMemoryUsersRepository.items[0].games).toHaveLength(4)
  })

  it('should be possible add game from other user to library', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-2'))
    await inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      let game = makeGame({}, {}, 1, new UniqueEntityId(`game-${i}`))

      await inMemoryGamesRepository.create(game)

      await sut.execute({
        userId: user.id.toString(),
        gameId: game.id.toString()
      })
    }

    expect(inMemoryUsersRepository.items[0].games).toHaveLength(4)
  })
})