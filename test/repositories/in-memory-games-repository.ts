import { GamesRepository } from "@/domain/platina/application/repositories/games-repository";
import { Game } from "@/domain/platina/enterprise/entities/game";

export class InMemoryGamesRepository implements GamesRepository {
  public items: Game[] = []

  async create(game: Game) {
    this.items.push(game)
  }

}