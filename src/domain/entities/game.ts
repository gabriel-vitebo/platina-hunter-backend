import { Slug } from "./value-object/slug"
import { Entity } from "../../core/entities/entity"

interface GameProps {
  title: string
  numberOfAchievements: number
  slug: Slug
}

export class Game extends Entity<GameProps> {
}