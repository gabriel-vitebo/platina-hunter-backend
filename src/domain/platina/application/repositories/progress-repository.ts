import { Progress } from '../../enterprise/entities/progress'

export interface ProgressRepository {
  findById(userId: string, gameId: string): Promise<Progress | null>
  create(progress: Progress): Promise<void>
  save(progress: Progress): Promise<void>
}
