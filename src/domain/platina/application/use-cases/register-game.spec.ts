import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { RegisterGameUseCase } from "./register-game";

let inMemoryGamesRepository: InMemoryGamesRepository
let sut: RegisterGameUseCase

describe('Register new Game', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    sut = new RegisterGameUseCase(inMemoryGamesRepository)
  })

  it('should be able to register a new game', async () => {

    const { game } = await sut.execute({
      userId: '1',
      title: 'Jogo Teste',
      numberOfAchievements: 3
    })

    expect(game.id).toBeTruthy()
    expect(inMemoryGamesRepository.items[0].id).toEqual(game.id)
  })
})