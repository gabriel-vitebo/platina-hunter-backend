import { randomUUID } from "crypto"

export class Achievements {
  public id: string
  public done: boolean

  constructor(done: boolean, id?: string) {
    this.id = id ?? randomUUID()
    this.done = done
  }
}