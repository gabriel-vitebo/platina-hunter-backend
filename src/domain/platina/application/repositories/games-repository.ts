import { Game } from '../../enterprise/entities/game'

export interface GamesRepository {
  create(game: Game): Promise<void>
}
