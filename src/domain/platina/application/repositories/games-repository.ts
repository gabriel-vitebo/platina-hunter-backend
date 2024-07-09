import { PaginationParams } from '@/core/repositories/pagination-params'
import { Game } from '../../enterprise/entities/game'

export interface GamesRepository {
  findById(id: string): Promise<Game | null>
  findBySlug(slug: string): Promise<Game | null>
  findMany(params: PaginationParams): Promise<Game[]>
  create(game: Game): Promise<void>
  save(game: Game): Promise<void>
  delete(game: Game): Promise<void>
}
