import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUsers } from "test/factories/make-users";
import { ProgressDetailsUseCase } from "../progress-details";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";
import { Progress } from "@/domain/platina/enterprise/entities/progress";
import { ToggleAchievementStatusUseCase } from "../toggle-achievement-status";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryProgressRepository: InMemoryProgressRepository

let toggleAchievementStatusUseCase: ToggleAchievementStatusUseCase
let sut: ProgressDetailsUseCase

describe('Progress Details', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()

    toggleAchievementStatusUseCase = new ToggleAchievementStatusUseCase(
      inMemoryUsersRepository,
      inMemoryAchievementsRepository,
      inMemoryProgressRepository
    )
    sut = new ProgressDetailsUseCase(
      inMemoryProgressRepository
    )
  })

  it('should be able to get a progress details', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'))
    await inMemoryUsersRepository.create(user)
    const game = makeGame({}, {}, 4, new UniqueEntityId('game-1'))

    for (const achievement of game.achievements) {
      await inMemoryAchievementsRepository.create(achievement)
    }

    const userProgress = Progress.create({
      user,
      game,
      achievementsDone: [],
      achievementsPending: game.achievements
    }, new UniqueEntityId())

    await inMemoryProgressRepository.create(userProgress)

    const { progress } = await sut.execute({
      userId: user.id.toString(),
      gameId: game.id.toString(),
    })

    expect(progress).toBeTruthy()
    expect(progress.title).toEqual(userProgress.game.title)
  })

  it('should be able to get a progress percentage', async () => {
    const user = makeUsers({}, new UniqueEntityId('user-1'))
    await inMemoryUsersRepository.create(user)
    const game = makeGame({}, {}, 4, new UniqueEntityId('game-1'))

    for (const achievement of game.achievements) {
      await inMemoryAchievementsRepository.create(achievement)
    }

    const userProgress = Progress.create({
      user,
      game,
      achievementsDone: [],
      achievementsPending: game.achievements
    }, new UniqueEntityId())

    await inMemoryProgressRepository.create(userProgress)

    const achievementId = game.achievements[0].id

    await toggleAchievementStatusUseCase.execute({
      userId: user.id.toString(),
      gameId: game.id.toString(),
      achievementId: achievementId.toString()
    })

    const { progress } = await sut.execute({
      userId: user.id.toString(),
      gameId: game.id.toString(),
    })

    expect(progress).toBeTruthy()
    expect(progress.title).toEqual(userProgress.game.title)
    expect(progress.achievementsDone).toHaveLength(1)
    expect(userProgress.game.achievements).toHaveLength(4)
    expect(progress.percentage).toEqual(0.25)
  })
})