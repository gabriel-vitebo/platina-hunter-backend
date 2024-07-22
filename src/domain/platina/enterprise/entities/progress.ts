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
  achievementsUndone: Achievement[]
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

  get achievementsUndone() {
    return this.props.achievementsUndone
  }

  set achievementsDone(achievementsDone: Achievement[]) {
    this.props.achievementsDone = achievementsDone
  }

  set achievementsUndone(achievementsUndone: Achievement[]) {
    this.props.achievementsUndone = achievementsUndone
  }

  doneAchievement(achievement: Achievement) {
    const achievementIndex = this.props.achievementsUndone.findIndex((item) => item.id === achievement.id)

    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsUndone.splice(achievementIndex, 1)
    this.props.achievementsDone.push(achieved)
  }

  undoneAchievement(achievement: Achievement) {
    const achievementIndex = this.props.achievementsDone.findIndex((item) => item.id === achievement.id)

    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsDone.splice(achievementIndex, 1)
    this.props.achievementsUndone.push(achieved)
  }

  toggleAchievement(achievement: Achievement) {
    const achievementDone = this.achievementsDone.find((item) => item.id === achievement.id)

    if (achievementDone) {
      this.undoneAchievement(achievement)
    } else {
      this.doneAchievement(achievement)
    }
  }

  isDone(achievement: Achievement) {
    const achievementDone = this.achievementsDone.find((item) => item.id === achievement.id)

    return Boolean(achievementDone)
  }

  calculateThePercentageOfAchievements() {
    const totalAchievements = this.props.achievementsDone.length + this.props.achievementsUndone.length

    if (totalAchievements === 0) {
      return 0
    }

    const percentage = this.props.achievementsDone.length / totalAchievements
    return percentage
  }

  static create(
    props: Optional<ProgressProps, 'achievementsDone' | 'achievementsUndone'>,
    id?: UniqueEntityId,
  ) {
    const progress = new Progress(
      {
        ...props,
        achievementsDone: [...(props.achievementsDone ?? [])],
        achievementsUndone: [...(props.achievementsUndone ?? [])],
      },
      id,
    )

    return progress
  }
}
