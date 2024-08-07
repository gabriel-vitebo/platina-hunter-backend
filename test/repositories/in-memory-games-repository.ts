import { PaginationParams } from "@/core/repositories/pagination-params";
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

  async findMany({ page }: PaginationParams) {
    const games = this.items
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice((page - 1) * 20, page * 20)

    return games
  }


  async create(game: Game) {
    const isEqual = this.items.find(item => {
      item.slug === game.slug
    })

    if (Boolean(isEqual)) {
      throw new Error('Not Allow!')
    }

    this.items.push(game)
  }

  async save(game: Game) {
    const itemIndex = this.items.findIndex((item) => item.id === game.id)

    this.items[itemIndex] = game
  }

  async delete(game: Game) {
    const itemIndex = this.items.findIndex((item) => item.id === game.id)

    this.items.splice(itemIndex, 1)
  }

}