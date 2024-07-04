import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { FetchAchievementsUseCase } from "./fetch-achievements-by-game";
import { Game } from "../../enterprise/entities/game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { Achievements } from "../../enterprise/entities/achievements";
import { i } from "vitest/dist/reporters-yx5ZTtEV";

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
    const gameId = new UniqueEntityId('game-1');

    const newGame = Game.create({
      userId: gameId,
      title: 'Example Game',
      numberOfAchievements: 2
    })

    await inMemoryGamesRepository.create(newGame)

    for (let i: number = 1; i <= 4; i++) {
      let newAchievements = Achievements.create({
        gameId: gameId,
        title: `Example Achievements ${i}`,
        isItLost: false,
      })
      console.log(newAchievements)
      await inMemoryAchievementsRepository.create(newAchievements)
    }

    const { achievements } = await sut.execute({
      gameId,
    })

    console.log(achievements.length)

    expect(achievements.length).toEqual(4)
    expect(inMemoryAchievementsRepository.items[0].title).toEqual(achievements[0].title)
  })
})