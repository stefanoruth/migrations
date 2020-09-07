import { Blueprint } from './Blueprint'

type SchemaCallback = (table: Blueprint) => void

export class Schema {
    static create(tableName: string, callback: SchemaCallback) {}

    static table(tableName: string, callback: SchemaCallback) {}

    static drop(tableName: string, callback: SchemaCallback) {}

    static rename(from: string, to: string) {}
}
