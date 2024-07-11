import { DateReformed } from "./dateReformed"

describe('Reforme Date', () => {
  it('should be able reforme a date', async () => {
    const dateReformed = DateReformed.create(new Date(2024, 1, 15, 8, 0, 0))

    expect(dateReformed.value).toEqual('15/02/24')
  })
})