import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AchievementsProps {
  gameId: string
  title: string
  isItLost: boolean
  description?: string
}

export class Achievements extends Entity<AchievementsProps> {
  get gameId() {
    return this.props.gameId
  }

  get title() {
    return this.props.title
  }

  get isItLost() {
    return this.props.isItLost
  }

  get description() {
    return this.props.description || ''
  }

  set title(title: string) {
    this.props.title = title
  }

  set description(description: string) {
    this.props.description = description
  }

  set isItLost(isItLost: boolean) {
    this.props.isItLost = isItLost
  }

  static create(props: AchievementsProps, id?: UniqueEntityId) {
    const achievements = new Achievements(props, id)

    return achievements
  }
}
