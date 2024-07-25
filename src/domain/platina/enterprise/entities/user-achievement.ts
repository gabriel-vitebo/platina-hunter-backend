import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DateReformed } from './value-object/dateReformed'
import { Achievement } from './achievement'
import { Note } from './note'

export interface UserAchievementProps {
  achievement: Achievement
  isDone: boolean
  note?: Note
  createdAt: DateReformed
  updateAt?: DateReformed
}

export class UserAchievement extends Entity<UserAchievementProps> {
  get achievement() {
    return this.props.achievement
  }

  get isDone() {
    return this.props.isDone
  }

  get note() {
    return this.props.note || Note.create({
      content: ''
    })
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  private update() {
    this.props.updateAt = DateReformed.create(new Date())
  }

  set isDone(isDone: boolean) {
    this.props.isDone = isDone
    this.update()
  }

  toggleDone() {
    this.props.isDone = !this.props.isDone
  }

  static create(props: Optional<UserAchievementProps, 'createdAt'>, id?: UniqueEntityId) {
    const userAchievement = new UserAchievement(
      {
        ...props,

        createdAt: props.createdAt ?? DateReformed.create(new Date()),
      },
      id,
    )

    return userAchievement
  }
}
