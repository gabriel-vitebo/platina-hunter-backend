import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  equals(otherId: UniqueEntityId): boolean {
    if (otherId instanceof UniqueEntityId) {
      return this.value === otherId.toValue()
    }
    return false
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
