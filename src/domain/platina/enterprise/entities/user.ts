import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Game } from './game'

export interface UserProps {
  name: string
  games: Game[]
  createdAt: Date
  updateAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get games() {
    return this.props.games
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set games(games: Game[]) {
    this.props.games = games
    this.touch()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
