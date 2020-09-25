import { Blueprint } from './Blueprint'

describe('Blueprint', () => {
    test('Table name', () => {
        const table = new Blueprint('foo')

        expect(table.table).toBe('foo')
    })

    test('Simple users table', () => {
        const table = new Blueprint('foo')
        table.uuid('id')
        table.string('email').unique()
        table.string('password').nullable()

        expect(table.columns).toEqual([
            { name: 'id', type: 'uuid' },
            { name: 'email', type: 'string', length: 100, uniqueIndex: true },
            { name: 'password', type: 'string', length: 100, nullable: true },
        ])
    })

    describe('Index', () => {
        test('Unique name', () => {
            const table = new Blueprint('users')
            table.unique(['foo', 'bar'])

            expect(table.commands[0].index).toBe('users_foo_bar_unique')
        })

        test('Index name', () => {
            const table = new Blueprint('users')
            table.index('foo')

            expect(table.commands[0].index).toBe('users_foo_index')
        })

        test('Unique name', () => {
            const table = new Blueprint('geo')
            table.spatialIndex('coordinates')

            expect(table.commands[0].index).toBe('geo_coordinates_spatialindex')
        })
    })

    describe('Column', () => {
        test('Id', () => {
            const table = new Blueprint('foo')

            table.id()

            expect(table.columns[0]).toEqual({
                name: 'id',
                type: 'bigInteger',
                primaryIndex: true,
                autoIncrement: true,
                unsigned: true,
            })
        })
    })
})
