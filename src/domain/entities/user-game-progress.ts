import { Game } from "./game";

export class UserGameProgress {
  public game: Game

  constructor(game: Game) {
    this.game = game
  }
}