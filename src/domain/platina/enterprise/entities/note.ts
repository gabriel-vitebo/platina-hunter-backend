import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DateReformed } from './value-object/dateReformed'

export interface NoteProps {
  content: string
  createdAt: DateReformed
  updateAt?: DateReformed
}

export class Note extends Entity<NoteProps> {
  get content() {
    return this.props.content
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

  set content(content: string) {
    this.props.content = content
    this.update()
  }

  static create(props: Optional<NoteProps, 'createdAt'>, id?: UniqueEntityId) {
    const note = new Note(
      {
        ...props,
        createdAt: props.createdAt ?? DateReformed.create(new Date()),
      },
      id,
    )

    return note
  }
}
