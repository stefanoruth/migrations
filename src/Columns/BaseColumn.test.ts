import { VarcharColumn } from './VarcharColumn'
import { Column } from './Column'
import { BaseColumn } from './BaseColumn'

let column: BaseColumn
let result: Column

beforeEach(() => {
    column = new BaseColumn('column', 'type')
    result = { name: 'column', type: 'type' }
})

describe('BaseColumn', () => {
    test('No change', () => {
        expect(column.get()).toEqual(result)
    })

    test('Nullable', () => {
        expect(column.nullable().get()).toEqual({ ...result, nullable: true })
    })

    test('Default value', () => {
        expect(column.default('hey').get()).toEqual({ ...result, default: 'hey' })
    })

    test('Comment', () => {
        expect(column.comment('comment').get()).toEqual({ ...result, comment: 'comment' })
    })
})
