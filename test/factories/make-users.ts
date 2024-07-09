import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/platina/enterprise/entities/user";
import { faker } from '@faker-js/faker'

export function makeUsers(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
) {
  const users = User.create({
    name: faker.person.firstName(),
    games: [],
    ...override
  }, id)

  return users
}