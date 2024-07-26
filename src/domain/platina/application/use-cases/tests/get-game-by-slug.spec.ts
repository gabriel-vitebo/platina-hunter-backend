import { InMemoryGamesRepository } from 'test/repositories/in-memory-games-repository'
import { GetGameBySlugUseCase } from '../get-game-by-slug'
import { makeGame } from 'test/factories/make-game'
import { Slug } from '../../../enterprise/entities/value-object/slug'

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: GetGameBySlugUseCase

describe('Get Game By Slug', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new GetGameBySlugUseCase(inMemoryGamesRepository)
  })

  it('should be able to get a game by slug', async () => {
    const newGame = makeGame(
      {
        slug: Slug.create('example-game'),
      },
      {},
      4,
    )

    await inMemoryGamesRepository.create(newGame)

    const { game } = await sut.execute({
      slug: 'example-game',
    })

    expect(game.id).toBeTruthy()
    expect(game.title).toEqual(newGame.title)
    expect(game.achievementsCount).toEqual(4)
  })
})
