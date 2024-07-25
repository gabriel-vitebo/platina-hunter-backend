import { Entity } from '@/core/entities/entity'
import { Game } from './game'
import { User } from './user'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UserAchievement } from './user-achievement'

export interface ProgressProps {
  game: Game
  user: User
  userAchievements: UserAchievement[]
}

export class Progress extends Entity<ProgressProps> {
  get game() {
    return this.props.game
  }

  get user() {
    return this.props.user
  }

  get userAchievements() {
    return this.props.userAchievements
  }

  set userAchievements(userAchievements: UserAchievement[]) {
    this.props.userAchievements = userAchievements
  }

  getAchievementsDone() {
    return this.props.userAchievements.filter(item => item.isDone)
  }

  getUndoAchievements() {
    return this.props.userAchievements.filter(item => !item.isDone)
  }

  getAllAchievements() {
    return this.props.userAchievements
  }

  calculateThePercentageOfAchievements() {
    const percentage = this.getAchievementsDone().length / this.getUndoAchievements().length
    return percentage
  }

  findUserAchievementById(achievementId: UniqueEntityId) {
    const userAchievement = this.userAchievements.find(item => item.id === achievementId)

    if (!userAchievement) {
      throw new Error('achievement not found!')
    }

    return userAchievement

  }

  static create(
    props: Optional<ProgressProps, 'userAchievements'>,
    id?: UniqueEntityId,
  ) {
    const progress = new Progress(
      {
        ...props,
        userAchievements: [...(props.userAchievements ?? [])]
      },
      id,
    )

    return progress
  }
}
