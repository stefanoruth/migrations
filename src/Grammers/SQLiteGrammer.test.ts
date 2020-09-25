import { Blueprint } from '../Blueprint'
import { SQLiteGrammer } from './SQLiteGrammer'

describe('SQLiteGrammer', () => {
    const grammer = new SQLiteGrammer()

    test('Create basic table', () => {
        const table = new Blueprint('users')

        table.create()
        table.id()
        table.string('email')

        expect(grammer.toSql(table)).toEqual([
            'create table "users" ("id" integer not null primary key autoincrement, "email" varchar not null)',
        ])
    })

    test('Alter basic table', () => {
        const table = new Blueprint('users')

        table.id()
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

    test('Drop unique', () => {
        const table = new Blueprint('users')
        table.dropUnique('foo')

        // expect(grammer.toSql(table)).toEqual(['drop index "foo"'])
    })

    test('Drop index', () => {
        const table = new Blueprint('users')
        table.dropIndex('foo')

        // expect(grammer.toSql(table)).toEqual(['drop index "foo"'])
    })

    test('Drop column', () => {
        const table = new Blueprint('users')
        table.dropColumn('foo')

        // expect(() => grammer.toSql(table)).toThrow('Not supported')
    })

    test.todo('Drop spatial index')

    test('Rename table', () => {
        const table = new Blueprint('users')
        table.rename('foo')

        // expect(grammer.toSql(table)).toEqual(['alter table "users" rename to "foo"'])
    })

    test.todo('Rename index')
    test.todo('Adding primary key')
    test.todo('Adding foreign key')
    test.todo('Adding unique key')
    test.todo('Adding index')
    test.todo('Adding spatial index')
    test.todo('Adding fluent spatial index')
    test.todo('Adding raw index')
    test.todo('Adding incrementing id')

    test.todo('AddingSmallIncrementingID')
    test.todo('AddingMediumIncrementingID')
    test.todo('AddingID')
    test.todo('AddingForeignID')
    test.todo('AddingBigIncrementingID')
    test.todo('AddingString')
    test.todo('AddingText')
    test.todo('AddingBigInteger')
    test.todo('AddingInteger')
    test.todo('AddingMediumInteger')
    test.todo('AddingTinyInteger')
    test.todo('AddingSmallInteger')
    test.todo('AddingFloat')
    test.todo('AddingDouble')
    test.todo('AddingDecimal')
    test.todo('AddingBoolean')
    test.todo('AddingEnum')
    test.todo('AddingJson')
    test.todo('AddingJsonb')
    test.todo('AddingDate')
    test.todo('AddingYear')
    test.todo('AddingDateTime')
    test.todo('AddingDateTimeWithPrecision')
    test.todo('AddingDateTimeTz')
    test.todo('AddingDateTimeTzWithPrecision')
    test.todo('AddingTime')
    test.todo('AddingTimeWithPrecision')
    test.todo('AddingTimeTz')
    test.todo('AddingTimeTzWithPrecision')
    test.todo('AddingTimestamp')
    test.todo('AddingTimestampWithPrecision')
    test.todo('AddingTimestampTz')
    test.todo('AddingTimestampTzWithPrecision')
    test.todo('AddingTimestamps')
    test.todo('AddingTimestampsTz')
    test.todo('AddingRememberToken')
    test.todo('AddingBinary')
    test.todo('AddingUuid')
    test.todo('AddingForeignUuid')
    test.todo('AddingIpAddress')
    test.todo('AddingMacAddress')
    test.todo('AddingGeometry')
    test.todo('AddingPoint')
    test.todo('AddingLineString')
    test.todo('AddingPolygon')
    test.todo('AddingGeometryCollection')
    test.todo('AddingMultiPoint')
    test.todo('AddingMultiLineString')
    test.todo('AddingMultiPolygon')
    test.todo('AddingGeneratedColumn')
})
