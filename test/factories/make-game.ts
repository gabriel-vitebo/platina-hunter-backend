import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Game, GameProps } from "@/domain/platina/enterprise/entities/game";
import { Slug } from "@/domain/platina/enterprise/entities/value-object/slug";

export function makeGame(
  override: Partial<GameProps> = {}
) {
  const game = Game.create({
    userId: new UniqueEntityId(),
    title: 'Example Game',
    numberOfAchievements: 2,
    slug: Slug.create('example-game'),
    ...override
  })

  return game
}