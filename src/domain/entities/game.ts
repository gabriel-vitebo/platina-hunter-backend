import { randomUUID } from "node:crypto"
import { Slug } from "./value-object/slug"

interface GameProps {
  title: string
  numberOfAchievements: number
  slug: Slug
}

export class Game {
  public id: string
  public title: string
  public slug: Slug
  public numberOfAchievements: number

  constructor(props: GameProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.slug = props.slug
    this.numberOfAchievements = props.numberOfAchievements
  }

}