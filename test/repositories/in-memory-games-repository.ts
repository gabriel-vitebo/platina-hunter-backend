import { GamesRepository } from "@/domain/platina/application/repositories/games-repository";
import { Game } from "@/domain/platina/enterprise/entities/game";

export class InMemoryGamesRepository implements GamesRepository {
  public items: Game[] = []

  async findBySlug(slug: string) {
    const game = this.items.find((item) => item.slug.value === slug)

    if (!game) {
      return null
    }

    return game
  }

  async create(game: Game) {
    this.items.push(game)
  }

}