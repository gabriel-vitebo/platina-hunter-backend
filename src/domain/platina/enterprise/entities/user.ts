import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DateReformed } from './value-object/dateReformed'
import { Progress } from './progress'

export interface UserProps {
  name: string
  games: Progress[]
  createdAt: DateReformed
  updateAt?: DateReformed
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
    this.props.updateAt = DateReformed.create(new Date())
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set games(games: Progress[]) {
    this.props.games = games
    this.touch()
  }

  findGameById(gameId: UniqueEntityId) {
    const game = this.games.find(item => item.id === gameId)

    if (!game) {
      throw new Error('game not found!')
    }

    return game

  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? DateReformed.create(new Date()),
      },
      id,
    )

    return user
  }
}
