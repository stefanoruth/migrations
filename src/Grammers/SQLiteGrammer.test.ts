import { Blueprint } from '../Blueprint'
import { SQLiteGrammer } from './SQLiteGrammer'
import { SQLiteDriver } from '../Drivers'

let db: SQLiteDriver

beforeEach(() => {
    console.log(process.cwd())
    // db = new SQLiteDriver('./example/database.sqlite')
    db = new SQLiteDriver(':memory:')
})

afterEach(async () => {
    await db.close()
})

describe('SQLiteGrammer', () => {
    describe('Creates', () => {
        test('Create table with id and email', async () => {
            const blueprint: Blueprint = {
                table: 'users',
                columns: [
                    { name: 'id', type: 'integer' },
                    { name: 'email', type: 'string' },
                ],
            }

            const driver = new SQLiteGrammer()

            expect(driver.compileCreate(blueprint)).toBe('CREATE TABLE users (id integer, email varchar)')
            expect(driver.compileCreate(blueprint)).toBe('CREATE TABLE users (id integer, email varchar)')

            console.log(await db.query(driver.compileCreate(blueprint)))

            console.log(await db.query(driver.compileColumnListing('users')))

            console.log(await db.query(driver.compileTableList()))

            // expect(result).toBe('')
        })
    })
})
