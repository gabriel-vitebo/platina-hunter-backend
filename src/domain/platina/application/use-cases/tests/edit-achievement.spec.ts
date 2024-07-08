import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeAchievements } from "test/factories/make-achievements";
import { EditAchievementUseCase } from "../edit-achievement";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let sut: EditAchievementUseCase

describe('Edit Achievement', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    sut = new EditAchievementUseCase(inMemoryAchievementsRepository)
  })

  it('should be able to edit a achievement', async () => {
    const newAchievement = makeAchievements({
      gameId: new UniqueEntityId('game-1')
    }, new UniqueEntityId('achievement-1'))

    await inMemoryAchievementsRepository.create(newAchievement)

    await sut.execute({
      gameId: newAchievement.gameId.toValue(),
      achievementId: newAchievement.id.toValue(),
      isItLost: true,
      description: 'Editando uma conquista teste'
    })

    expect(inMemoryAchievementsRepository.items[0]).toMatchObject({
      isItLost: true,
      description: 'Editando uma conquista teste'
    })
  })

  it('should not be able to edit a achievement from another user', async () => {
    const newAchievement = makeAchievements({
      gameId: new UniqueEntityId('game-1')
    }, new UniqueEntityId('achievement-1'))

    await inMemoryAchievementsRepository.create(newAchievement)

    expect(() => {
      return sut.execute({
        gameId: 'game-2',
        achievementId: newAchievement.id.toValue(),
        isItLost: true,
        description: 'Editando uma conquista teste'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})