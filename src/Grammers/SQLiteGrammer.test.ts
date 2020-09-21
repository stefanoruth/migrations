import { Blueprint } from '../Blueprint'
import { SQLiteGrammer } from './SQLiteGrammer'

describe('SQLiteGrammer', () => {
    const grammer = new SQLiteGrammer()

    test('Create basic table', () => {
        const table = new Blueprint('users')

        table.create()
        table.increments('id')
        table.string('email')

        expect(grammer.toSql(table)).toEqual([
            'create table "users" ("id" integer not null primary key autoincrement, "email" varchar not null)',
        ])
    })

    test('Alter basic table', () => {
        const table = new Blueprint('users')

        table.increments('id')
        table.string('email')

        expect(grammer.toSql(table)).toEqual([
            'alter table "users" add column "id" integer not null primary key autoincrement',
            'alter table "users" add column "email" varchar not null',
        ])
    })

    test('Drop table', () => {
        const table = new Blueprint('users')
        table.drop()

        expect(grammer.toSql(table)).toEqual(['drop table "users"'])
    })

    test('Drop table if exists', () => {
        const table = new Blueprint('users')
        table.dropIfExists()

        expect(grammer.toSql(table)).toEqual(['drop table if exists "users"'])
    })
})
