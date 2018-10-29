export default abstract class Command {
  protected constructor (public name: string) { }

  abstract run (): Promise<number> | number
}
