import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";
import { RegisterGameUseCase } from "../register-game";
import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";

let inMemoryGamesRepository: InMemoryGamesRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let sut: RegisterGameUseCase

describe('Register new Game', () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository()
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    sut = new RegisterGameUseCase(inMemoryGamesRepository, inMemoryAchievementsRepository)
  })

  it('should be able to register a new game', async () => {
    const { title, achievementsCount } = await sut.execute({
      userId: '1',
      title: 'Jogo Teste',
      achievements: [
        {
          title: 'Primeira Conquista Teste',
          isItLost: false,
          description: 'Descrição dessa primeira conquista teste',
        },
        {
          title: 'Segunda Conquista Teste',
          isItLost: false,
          description: 'Descrição dessa segunda conquista teste',
        },
        {
          title: 'Terceira Conquista Teste',
          isItLost: true,
          description: 'Descrição dessa terceira conquista teste',
        },
      ]
    })

    expect(inMemoryGamesRepository.items[0].title).toEqual(title)
    expect(achievementsCount).toEqual(3)
    expect(inMemoryAchievementsRepository.items).toHaveLength(3)
  })

  it('should not be able to register a new game without achievements', async () => {
    expect(async () => {
      await sut.execute({
        userId: '1',
        title: 'Jogo Teste',
        achievements: []
      })
    }).rejects.toBeInstanceOf(Error)
  })
})