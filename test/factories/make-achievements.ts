import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Achievements, AchievementsProps } from "@/domain/platina/enterprise/entities/achievements";

export function makeAchievements(
  override: Partial<AchievementsProps> = {}
) {
  const achievements = Achievements.create({
    gameId: new UniqueEntityId(),
    title: 'Example Achievements',
    isItLost: false,
    ...override
  })

  return achievements
}