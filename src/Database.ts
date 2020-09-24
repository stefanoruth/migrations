import { Blueprint } from './Blueprint'
import { Driver, FakeDriver, SQLiteDriver } from './Drivers'
import { BaseGrammer, SQLiteGrammer } from './Grammers'

export class Database {
    private grammer: BaseGrammer
    private driver: Driver

    constructor() {
        this.driver = new FakeDriver()
        this.grammer = new SQLiteGrammer()
    }

    async createTable(table: Blueprint) {
        const sqlQueries = this.grammer.compileCreate(table)

        for (const sql of sqlQueries) {
            await this.driver.query(sql)
        }
    }

    async alterTable(table: Blueprint) {}

    async dropTable(table: Blueprint) {}
}

let activeConnection: Database | null = null

export const getDatabase = async () => {
    if (!activeConnection) {
        activeConnection = new Database()
    }

    return activeConnection
}
