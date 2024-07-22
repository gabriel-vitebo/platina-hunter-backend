import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { GameDetailsUseCase } from "../game-details";
import { makeGame } from "test/factories/make-game";
import { Slug } from "../../../enterprise/entities/value-object/slug";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Game } from "@/domain/platina/enterprise/entities/game";
import { title } from "process";
import { Achievement } from "@/domain/platina/enterprise/entities/achievement";

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: GameDetailsUseCase

describe('Game Details', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new GameDetailsUseCase(inMemoryGamesRepository)
  })

  it('should be able to get a game details', async () => {
    const newGame = makeGame({
      slug: Slug.create('example-game')
    }, {}, 4, new UniqueEntityId('game-1'))

    await inMemoryGamesRepository.create(newGame)

    const { game } = await sut.execute({
      gameId: newGame.id.toString()
    })

    expect(game.id).toBeTruthy()
    expect(game.title).toEqual(newGame.title)
    expect(game.achievementsCount).toEqual(4)
  })
})