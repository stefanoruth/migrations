export abstract class Migration {
    public abstract async run(): Promise<void>
}
