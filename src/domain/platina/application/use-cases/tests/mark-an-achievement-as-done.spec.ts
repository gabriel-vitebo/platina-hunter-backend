import { InMemoryAchievementsRepository } from "test/repositories/in-memory-achievements-repository";
import { makeGame } from "test/factories/make-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUsers } from "test/factories/make-users";
import { MarkAnAchievementAsDoneUseCase } from "../mark-an-achievement-as-done";
import { InMemoryProgressRepository } from "test/repositories/in-memory-progress-repository";
import { Progress } from "@/domain/platina/enterprise/entities/progress";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryProgressRepository: InMemoryProgressRepository
let sut: MarkAnAchievementAsDoneUseCase

describe('Mark An Achievement As Done', () => {
  beforeEach(() => {
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProgressRepository = new InMemoryProgressRepository()
    sut = new MarkAnAchievementAsDoneUseCase(
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

    const { achievementsDone } = await sut.execute({
      gameId: game.id.toString(),
      userId: user.id.toString(),
      achievementId: achievementId.toString(),
    })

    expect(achievementsDone).toHaveLength(1)
    expect(achievementsDone[0].title).toEqual(progress.achievementsDone[0].title)
  })
})