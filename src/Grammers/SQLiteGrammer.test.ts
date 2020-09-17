import { Blueprint } from '../Blueprint'
import { SQLiteGrammer } from './SQLiteGrammer'

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
        })
    })
})
