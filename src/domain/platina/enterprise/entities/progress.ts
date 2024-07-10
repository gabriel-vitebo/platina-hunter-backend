import { Entity } from '@/core/entities/entity'
import { Game } from './game'
import { User } from './user'
import { Achievement } from './achievement'

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

    if (!achievementIndex) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsUndone.splice(achievementIndex, 1)
    this.props.achievementsDone.push(achieved)
  }

  undoneAchievement(achievement: Achievement) {
    const achievementIndex = this.props.achievementsUndone.findIndex((item) => item.id === achievement.id)

    if (!achievementIndex) {
      throw new Error('Achievement not found')
    }

    const [achieved] = this.props.achievementsDone.splice(achievementIndex, 1)
    this.props.achievementsUndone.push(achieved)
  }
}
