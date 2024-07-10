import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { FetchAllGamesUseCase } from "../fetch-all-games";
import { makeGame } from "test/factories/make-game";

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: FetchAllGamesUseCase

describe('Fetch All Games', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new FetchAllGamesUseCase(inMemoryGamesRepository)
  })

  it('should be able to fetch all games', async () => {
    await inMemoryGamesRepository.create(
      makeGame({ title: 'Elden Ring' })
    )
    await inMemoryGamesRepository.create(
      makeGame({ title: 'assassins creed' })
    )
    await inMemoryGamesRepository.create(
      makeGame({ title: 'detroit become human' })
    )

    const { games } = await sut.execute({
      page: 1
    })

    expect(games).toEqual([
      expect.objectContaining({ title: 'assassins creed' }),
      expect.objectContaining({ title: 'detroit become human' }),
      expect.objectContaining({ title: 'Elden Ring' })
    ])
  })

  it('should be able to fetch paginated all games', async () => {
    for (let i: number = 1; i <= 22; i++) {
      await inMemoryGamesRepository.create(makeGame())
    }

    const { games } = await sut.execute({
      page: 2
    })

    expect(games).toHaveLength(2)
  })
})