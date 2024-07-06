import { GamesRepository } from "@/domain/platina/application/repositories/games-repository";
import { Game } from "@/domain/platina/enterprise/entities/game";

export class InMemoryGamesRepository implements GamesRepository {
  public items: Game[] = []

  async findById(id: string) {
    const game = this.items.find((item) => item.id.toString() === id)

    if (!game) {
      return null
    }

    return game
  }

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

  async delete(game: Game) {
    const itemIndex = this.items.findIndex((item) => item.id === game.id)

    this.items.splice(itemIndex, 1)
  }

}