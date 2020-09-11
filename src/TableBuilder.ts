import { ColumnModifier, Column, ColumnType, ColumnOptions } from './Column'

export class TableBuilder {
    constructor(protected columns: Column[]) {}

    private addColumn(name: string, type: ColumnType, params: ColumnOptions = {}) {
        const column: Column = {
            name,
            type,
            ...params,
        }

        this.columns.push(column)

        return new ColumnModifier(column)
    }

    id(column = 'id') {
        return this.addColumn(column, 'bigInteger', { autoIncrement: true, unsigned: true, primaryIndex: true })
    }

    boolean(column: string) {
        return this.addColumn(column, 'boolean')
    }

    dateTimeTz(column: string) {
        return this.addColumn(column, 'dateTimeTz')
    }

    integer(column: string) {
        return this.addColumn(column, 'integer')
    }

    json(column: string) {
        return this.addColumn(column, 'json')
    }

    string(column: string, length = 100) {
        return this.addColumn(column, 'string', { length })
    }

    uuid(column: string) {
        return this.addColumn(column, 'uuid')
    }
}
