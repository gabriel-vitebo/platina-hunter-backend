import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUsers } from "test/factories/make-users";
import { ToggleAchievementStatusUseCase } from "../toggle-achievement-status";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";
import { Progress } from "@/domain/platina/enterprise/entities/progress";
import { UserAchievement } from "@/domain/platina/enterprise/entities/user-achievement";
import { InMemoryGamesRepository } from "test/repositories/in-memory-games-repository";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let inMemoryGameRepository: InMemoryGamesRepository
let sut: ToggleAchievementStatusUseCase

describe('Mark An Achievement As Done', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    inMemoryGameRepository = new InMemoryGamesRepository()
    sut = new ToggleAchievementStatusUseCase(
      inMemoryUsersRepository
    )
  })

  it.only('should be able to mark a achievement as done', async () => {
    const user = makeUsers()
    await inMemoryUsersRepository.create(user)
    const game = makeGame({}, {}, 2)

    await inMemoryGameRepository.create(game)

    for (const achievement of game.achievements) {
      await inMemoryAchievementsRepository.create(achievement)
    }
    const achievementId = game.achievements[0].id

    const userAchievements = game.achievements.map((item) => {
      return UserAchievement.create({
        achievement: item,
        isDone: false,
      })
    })

    const progress = Progress.create({
      user,
      game,
      userAchievements
    }, new UniqueEntityId())

    await inMemoryProgressRepository.create(progress)

    const { achievement } = await sut.execute({
      gameId: game.id.toString(),
      userId: user.id.toString(),
      achievementId: achievementId.toString(),
    })

    expect(achievement).toBeTruthy()
    expect(achievement.title).toEqual(progress.game.achievements[0].title)
    expect(achievement.isDone).toBe(true)
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
      achievementsPending: game.achievements.slice(1)
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
    expect(progress.achievementsPending).toHaveLength(2)
    expect(achievement.isDone).toBe(false)
  })
})