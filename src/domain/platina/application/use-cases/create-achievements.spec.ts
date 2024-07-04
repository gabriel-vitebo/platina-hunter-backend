import { CreateAchievementUseCase } from "./create-achievements";
import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";

let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let sut: CreateAchievementUseCase

describe('Create Achievements', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    sut = new CreateAchievementUseCase(inMemoryAchievementsRepository)
  })

  it('should be able to create achievement', async () => {

    const { achievement } = await sut.execute({
      gameId: '1',
      title: 'Conquista Teste',
      description: 'Descrição de uma conquista teste',
      isItLost: false
    })

    expect(achievement.id).toBeTruthy()
    expect(inMemoryAchievementsRepository.items[0].id).toEqual(achievement.id)
  })
})