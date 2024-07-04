import { Game } from '../../enterprise/entities/game'

export interface GamesRepository {
  findBySlug(slug: string): Promise<Game | null>
  create(game: Game): Promise<void>
}
