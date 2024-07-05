import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Achievements, AchievementsProps } from "@/domain/platina/enterprise/entities/achievements";
import { faker } from "@faker-js/faker";
export function makeAchievements(
  override: Partial<AchievementsProps> = {},
  id?: UniqueEntityId
) {
  const achievements = Achievements.create({
    gameId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    isItLost: false,
    ...override
  }, id)

  return achievements
}