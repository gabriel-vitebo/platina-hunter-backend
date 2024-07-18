import { FetchAllUserGamesUseCase } from "../fetch-all-user-games";
import { makeGame } from "test/factories/make-game";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeUsers } from "test/factories/make-users";
import { AddGameToLibraryUseCase } from "../add-game-to-library";
import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let addGameToLibraryUseCase: AddGameToLibraryUseCase;
let sut: FetchAllUserGamesUseCase

describe('Fetch All Games', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryGamesRepository = new InMemoryGamesRepository();
    inMemoryProgressRepository = new InMemoryProgressRepository();
    sut = new FetchAllUserGamesUseCase(inMemoryUsersRepository)
    addGameToLibraryUseCase = new AddGameToLibraryUseCase(
      inMemoryUsersRepository,
      inMemoryGamesRepository,
      inMemoryProgressRepository
    );
  })

  it('should be able to fetch all user games', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'))
    inMemoryUsersRepository.create(user)

    for (let i: number = 1; i <= 4; i++) {
      const game = makeGame({ userId: new UniqueEntityId('user-1') })
      inMemoryGamesRepository.create(game)
      await addGameToLibraryUseCase.execute({
        gameId: game.id.toString(),
        userId: user.id.toString()
      })
    }

    const anotherGame = makeGame({ userId: new UniqueEntityId('user-2') })
    inMemoryGamesRepository.create(anotherGame)

    const { games } = await sut.execute({
      userId: user.id.toString(),
      page: 1
    })

    expect(games).toHaveLength(4)
  })

  it('should be able to fetch paginated all user games', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'));
    inMemoryUsersRepository.create(user);

    for (let i = 1; i <= 22; i++) {
      const game = makeGame({ userId: new UniqueEntityId('user-1') });
      inMemoryGamesRepository.create(game);
      await addGameToLibraryUseCase.execute({
        gameId: game.id.toString(),
        userId: user.id.toString()
      });
    }

    const { games } = await sut.execute({
      userId: 'user-1',
      page: 2
    })

    expect(games).toHaveLength(2)
  })
})