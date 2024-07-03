import { expect, test } from 'vitest'
import { MarkAchievementsAsDoneUseCase } from './mark-achievements-as-done'

test('mark achievements as done', () => {
  const markAchievements = new MarkAchievementsAsDoneUseCase()

  const achievements = markAchievements.execute({
    gameId: '1',
    userId: '2',
    achievementId: '3',
    done: true
  })

  expect(achievements.done).toEqual(true)
})