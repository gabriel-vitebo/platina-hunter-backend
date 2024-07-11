import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Achievement, AchievementProps } from "@/domain/platina/enterprise/entities/achievement";
import { Game, GameProps } from "@/domain/platina/enterprise/entities/game";
import { faker } from '@faker-js/faker';

export function makeGame(
  gameOverride: Partial<GameProps> = {},
  achievementOverride: Partial<AchievementProps> = {},
  amount: number = 1,
  id?: UniqueEntityId
) {

  const game = Game.create({
    userId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    achievements: [],
    ...gameOverride
  }, id);

  for (let i = 0; i < amount; i++) {
    const newAchievement = Achievement.create({
      gameId: game.id,
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      isItLost: false,
      ...achievementOverride
    }, id);

    game.achievements.push(newAchievement);
  }

  return game;
}
