import { Entity } from '@/core/entities/entity'
import { Game } from './game'
import { User } from './user'
import { Achievement } from './achievement'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ProgressProps {
  game: Game
  user: User
  achievementsDone: Achievement[]
  achievementsPending: Achievement[]
}

export class Progress extends Entity<ProgressProps> {
  get game() {
    return this.props.game
  }

  get user() {
    return this.props.user
  }

  get achievementsDone() {
    return this.props.achievementsDone
  }

  get achievementsPending() {
    return this.props.achievementsPending
  }

  set achievementsDone(achievementsDone: Achievement[]) {
    this.props.achievementsDone = achievementsDone
  }

  set achievementsPending(achievementsPending: Achievement[]) {
    this.props.achievementsPending = achievementsPending
  }

  doneAchievement(achievement: Achievement) {
    const achievementIndex = this.props.achievementsPending.findIndex((item) => item.id === achievement.id)

    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsPending.splice(achievementIndex, 1)
    this.props.achievementsDone.push(achieved)
  }

  undoAchievement(achievement: Achievement) {
    const achievementIndex = this.props.achievementsDone.findIndex((item) => item.id === achievement.id)

    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsDone.splice(achievementIndex, 1)
    this.props.achievementsPending.push(achieved)
  }

  toggleAchievement(achievement: Achievement) {
    const achievementDone = this.achievementsDone.find((item) => item.id === achievement.id)

    if (achievementDone) {
      this.undoAchievement(achievement)
    } else {
      this.doneAchievement(achievement)
    }
  }

  isDone(achievement: Achievement) {
    const achievementDone = this.achievementsDone.find((item) => item.id === achievement.id)

    return Boolean(achievementDone)
  }

  calculateThePercentageOfAchievements() {
    const totalAchievements = this.props.achievementsDone.length + this.props.achievementsPending.length

    if (totalAchievements === 0) {
      return 0
    }

    const percentage = this.props.achievementsDone.length / totalAchievements
    return percentage
  }

  static create(
    props: Optional<ProgressProps, 'achievementsDone' | 'achievementsPending'>,
    id?: UniqueEntityId,
  ) {
    const progress = new Progress(
      {
        ...props,
        achievementsDone: [...(props.achievementsDone ?? [])],
        achievementsPending: [...(props.achievementsPending ?? [])],
      },
      id,
    )

    return progress
  }
}
