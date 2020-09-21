import { Column } from './Column'
import { Blueprint } from './Blueprint'
import { getDatabase } from './Database'

type SchemaCallback = (table: Blueprint) => void

export class Schema {
    static async create(tableName: string, callback: SchemaCallback) {
        const table = new Blueprint(tableName)

        callback(table)

        const db = await getDatabase()

        return db.createTable(table)
    }

    static async table(tableName: string, callback: SchemaCallback) {
        const table = new Blueprint(tableName)

        callback(table)

        const db = await getDatabase()

        return db.alterTable(table)
    }

    static async drop(tableName: string, callback: SchemaCallback) {
        const table = new Blueprint(tableName)

        callback(table)

        const db = await getDatabase()

        return db.dropTable(table)
    }

    static async rename(from: string, to: string) {}
}
