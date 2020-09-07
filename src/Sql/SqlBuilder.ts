import { Column } from '../Columns'

export abstract class SqlBuilder {
    constructor(private tableName: string, private columns: Column[]) {}

    abstract build(): string
}
