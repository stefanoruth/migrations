import { TableBuilder } from './TableBuilder'

type SchemaCallback = (table: TableBuilder) => void

export class Schema {
    static create(tableName: string, callback: SchemaCallback) {}

    static table(tableName: string, callback: SchemaCallback) {}

    static drop(tableName: string, callback: SchemaCallback) {}

    static rename(from: string, to: string) {}
}
