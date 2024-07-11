export class DateReformed {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(date: Date): DateReformed {
    const formattedDate = this.formatDate(date)
    return new DateReformed(formattedDate)
  }

  /**
   * Receives a data and normalize it as a dateReformed
   *
   * Example: "" => "an-example-title-game"
   *
   * @param text {string}
   */

  private static formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = String(date.getFullYear()).slice(-2) // Get last 2 digits of year
    return `${day}/${month}/${year}`
  }
}
