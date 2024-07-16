import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUsers } from "test/factories/make-users";
import { ToggleAchievementStatusUseCase } from "../toggle-achievement-status";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";
import { Progress } from "@/domain/platina/enterprise/entities/progress";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let sut: ToggleAchievementStatusUseCase

describe('Mark An Achievement As Done', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    sut = new ToggleAchievementStatusUseCase(
      inMemoryUsersRepository,
      inMemoryAchievementsRepository,
      inMemoryProgressRepository
    )
  })

  it('should be able to mark a achievement as done', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)
    const game = makeGame({}, {}, 2)

    for (const achievement of game.achievements) {
      await inMemoryAchievementsRepository.create(achievement)
    }
    const achievementId = game.achievements[0].id

    const progress = Progress.create({
      user,
      game,
      achievementsDone: [],
      achievementsUndone: game.achievements
    }, new UniqueEntityId())

    await inMemoryProgressRepository.create(progress)

    const { achievement } = await sut.execute({
      gameId: game.id.toString(),
      userId: user.id.toString(),
      achievementId: achievementId.toString(),
    })

    expect(achievement).toBeTruthy()
    expect(achievement.title).toEqual(progress.achievementsDone[0].title)
    expect(achievement.done).toBe(true)
  })

  it('should be able to unmark an achievement as done', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)
    const game = makeGame({}, {}, 2)

    for (const achievement of game.achievements) {
      await inMemoryAchievementsRepository.create(achievement)
    }
    const achievementId = game.achievements[0].id

    const progress = Progress.create({
      user,
      game,
      achievementsDone: [game.achievements[0]],
      achievementsUndone: game.achievements.slice(1)
    }, new UniqueEntityId())

    await inMemoryProgressRepository.create(progress)

    const { achievement } = await sut.execute({
      gameId: game.id.toString(),
      userId: user.id.toString(),
      achievementId: achievementId.toString(),
    })

    expect(achievement).toBeTruthy()
    expect(achievement.title).toEqual(game.achievements[0].title)
    expect(progress.achievementsDone).toHaveLength(0)
    expect(progress.achievementsUndone).toHaveLength(2)
    expect(achievement.done).toBe(false)
  })
})