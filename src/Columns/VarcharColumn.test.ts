import { VarcharColumn } from './VarcharColumn'
import { Column } from './Column'

let column: VarcharColumn
let result: Column

beforeEach(() => {
    column = new VarcharColumn('email')
    result = { name: 'email', type: 'varchar' }
})

describe('VarcharColumn', () => {
    test('Length', () => {
        expect(column.length(100).get()).toEqual({ ...result, length: 100 })
        expect(column.length(255).get()).toEqual({ ...result, length: 255 })
    })
})
