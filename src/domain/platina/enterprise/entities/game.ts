import { Slug } from './value-object/slug'
import { DateReformed } from './value-object/dateReformed'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Achievement } from './achievement'

export interface GameProps {
  userId: UniqueEntityId
  title: string
  achievements: Achievement[]
  slug: Slug
  createdAt: DateReformed
  updateAt?: DateReformed
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

  private update() {
    this.props.updateAt = DateReformed.create(new Date())
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.update()
  }

  set achievements(achievements: Achievement[]) {
    this.props.achievements = achievements
    this.update()
  }

  static create(
    props: Optional<GameProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const game = new Game(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? DateReformed.create(new Date()),
      },
      id,
    )

    return game
  }
}
