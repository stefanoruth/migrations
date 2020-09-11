import { TableBuilder } from './TableBuilder'
import { Column } from './Column'

let columns: Column[]
let table: TableBuilder

beforeEach(() => {
    columns = []
    table = new TableBuilder(columns)
})

describe('TableBuilder', () => {
    test('Column: id', () => {
        table.id()

        expect(columns[0]).toEqual({
            name: 'id',
            type: 'bigInteger',
            primaryIndex: true,
            autoIncrement: true,
            unsigned: true,
        })
    })

    test('Simple users table', () => {
        table.uuid('id')
        table.string('email').unique()
        table.string('password').nullable()

        expect(columns).toEqual([
            { name: 'id', type: 'uuid' },
            { name: 'email', type: 'string', length: 100, uniqueIndex: true },
            { name: 'password', type: 'string', length: 100, nullable: true },
        ])
    })
})
