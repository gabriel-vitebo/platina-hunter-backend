import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DateReformed } from './value-object/dateReformed'
import { Progress } from './progress'

export interface UserProps {
  name: string
  gamesProgress: Progress[]
  createdAt: DateReformed
  updateAt?: DateReformed
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get gamesProgress() {
    return this.props.gamesProgress
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

  set gamesProgress(gamesProgress: Progress[]) {
    this.props.gamesProgress = gamesProgress
    this.touch()
  }

  findGameById(gameId: UniqueEntityId) {
    const game = this.gamesProgress.find((item) => item.game.id === gameId)

    if (!game) {
      throw new Error('game not found!')
    }

    return game
  }

  checkIfTheGameIsAlreadyAdded(gameId: UniqueEntityId) {
    const game = this.gamesProgress.find((item) => item.game.id.equals(gameId))
    if (game) {
      throw new Error('Game already in library!')
    }
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        gamesProgress: props.gamesProgress ?? [],
        createdAt: props.createdAt ?? DateReformed.create(new Date()),
      },
      id,
    )

    return user
  }
}
