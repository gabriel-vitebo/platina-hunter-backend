import { randomUUID } from "crypto"

export class Game {
  public id: string
  public title: string
  public numberOfAchievements: number

  constructor(title: string, numberOfAchievements: number, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.numberOfAchievements = numberOfAchievements
  }
}