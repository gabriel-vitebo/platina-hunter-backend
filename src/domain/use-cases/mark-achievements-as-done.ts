import { Achievements } from "../entities/achievements"

interface MarkAchievementsAsDoneUseCaseRequest {
  userId: string
  gameId: string
  achievementId: string
  done: boolean
}

export class MarkAchievementsAsDoneUseCase {
  execute({ userId, gameId, achievementId, done }: MarkAchievementsAsDoneUseCaseRequest) {
    const addAchievements = new Achievements(done)

    return addAchievements
  }
}