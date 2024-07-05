import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Game, GameProps } from "@/domain/platina/enterprise/entities/game";
import { faker } from '@faker-js/faker'

export function makeGame(
  override: Partial<GameProps> = {},
  id?: UniqueEntityId
) {
  const game = Game.create({
    userId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    numberOfAchievements: faker.number.int({ min: 1, max: 50 }),
    ...override
  }, id)

  return game
}