import { SQLiteDriver } from './SQLiteDriver'
import { TestDatabase } from './SQLiteTestDatabase'

let testDatabase = new TestDatabase()

beforeEach(() => {
    testDatabase.setup()
})

afterEach(() => {
    // testDatabase.teardown()
})

describe('SQLiteDriver', () => {
    test('I can connect to sqlite', async () => {
        const db = new SQLiteDriver(testDatabase.getFilepath())

        expect(testDatabase.exists()).toBe(true)

        await db.connect()

        expect(await db.isHealthy()).toBe(true)

        await db.close()
    })
})
