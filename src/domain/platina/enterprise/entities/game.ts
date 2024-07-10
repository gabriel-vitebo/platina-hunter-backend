import { Slug } from './value-object/slug'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Achievement } from './achievement'

export interface GameProps {
  userId: UniqueEntityId
  title: string
  achievements: Achievement[]
  slug: Slug
  createdAt: Date
  updateAt?: Date
}

export class Game extends Entity<GameProps> {
  get userId() {
    return this.props.userId
  }

  get title() {
    return this.props.title
  }

  get achievements() {
    return this.props.achievements
  }

  get slug() {
    return this.props.slug
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

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set achievements(achievements: Achievement[]) {
    this.props.achievements = achievements
    this.touch()
  }

  static create(
    props: Optional<GameProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const game = new Game(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return game
  }
}
