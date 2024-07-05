import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { FetchAchievementsUseCase } from "./fetch-achievements-by-game";
import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { makeGame } from "test/factories/make-game";
import { makeAchievements } from "test/factories/make-achievements";

let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryGamesRepository: InMemoryGamesRepository
let sut: FetchAchievementsUseCase

describe('Fetch all Achievements By Game', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new FetchAchievementsUseCase(inMemoryAchievementsRepository)
  })

  it('should be able to fetch all achievement by game', async () => {
    const newGame = makeGame()
    await inMemoryGamesRepository.create(newGame)

    for (let i: number = 1; i <= 4; i++) {
      let newAchievements = makeAchievements({
        gameId: newGame.id
      })

      await inMemoryAchievementsRepository.create(newAchievements)
    }

    const { achievements } = await sut.execute({
      gameId: newGame.id,
    })

    expect(achievements.length).toEqual(4)
    expect(inMemoryAchievementsRepository.items[0].title).toEqual(achievements[0].title)
  })
})