import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeAchievements } from "test/factories/make-achievements";
import { DeleteAchievementUseCase } from "../delete-achievement";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let sut: DeleteAchievementUseCase

describe('Delete Achievement', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    sut = new DeleteAchievementUseCase(inMemoryAchievementsRepository)
  })

  it('should be able to delete a achievement', async () => {
    const newAchievement = makeAchievements({
      gameId: new UniqueEntityId('game-1')
    }, new UniqueEntityId('achievement-1'))

    await inMemoryAchievementsRepository.create(newAchievement)

    await sut.execute({
      gameId: 'game-1',
      achievementsId: 'achievement-1'
    })

    expect(inMemoryAchievementsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a achievement from another user', async () => {
    const newAchievement = makeAchievements({
      gameId: new UniqueEntityId('game-1')
    }, new UniqueEntityId('achievement-1'))

    await inMemoryAchievementsRepository.create(newAchievement)

    expect(() => {
      return sut.execute({
        gameId: 'game-2',
        achievementsId: 'achievement-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})