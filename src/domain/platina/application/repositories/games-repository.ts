export interface GamesRepository {
  findById(gameId: string): Promise<void>
}
