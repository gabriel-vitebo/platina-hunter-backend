import { Game } from "../../enterprise/entities/game";
import { GamesRepository } from "../repositories/games-repository";
import { RegisterGameUseCase } from "./register-game";

const fakeGameRepository: GamesRepository = {
  create: async (game: Game) => { }
}

test('register a new game', async () => {
  const registerGame = new RegisterGameUseCase(fakeGameRepository)

  const { game } = await registerGame.execute({
    userId: '1',
    title: 'Jogo Teste',
    numberOfAchievements: 3
  })

  expect(game.id).toBeTruthy()
})