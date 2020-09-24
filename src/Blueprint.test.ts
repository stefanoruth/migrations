import { Blueprint } from './Blueprint'

let table: Blueprint

beforeEach(() => {
    table = new Blueprint('foobar')
})

describe('Blueprint', () => {
    test('Table name', () => {
        expect(table.name).toBe('foobar')
    })

    test('Column: increments', () => {
        table.increments('id')

        expect(table.columns[0]).toEqual({
            name: 'id',
            type: 'integer',
            primaryIndex: true,
            autoIncrement: true,
            unsigned: true,
        })
    })

    test('Simple users table', () => {
        table.uuid('id')
        table.string('email').unique()
        table.string('password').nullable()

        expect(table.columns).toEqual([
            { name: 'id', type: 'uuid' },
            { name: 'email', type: 'string', length: 100, uniqueIndex: true },
            { name: 'password', type: 'string', length: 100, nullable: true },
        ])
    })
})
