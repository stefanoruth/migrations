import { ColumnModifier, Column, ColumnType, ColumnOptions } from './Column'

export type BlueprintAction = 'create' | 'alter' | 'drop' | 'rename' | 'dropIfExists'

export class Blueprint {
    public readonly columns: Column[]
    private action: BlueprintAction = 'alter'
    private _rename?: string

    constructor(public readonly name: string, columns: Column[] = []) {
        this.columns = columns
    }

    private addColumn(name: string, type: ColumnType, params: ColumnOptions = {}) {
        const column: Column = {
            name,
            type,
            ...params,
        }

        this.columns.push(column)

        return new ColumnModifier(column)
    }

    public get newTableName() {
        if (this._rename) {
            return this._rename
        }

        throw new Error(`No new name for the table has been set`)
    }

    public get type() {
        return this.action
    }

    create() {
        this.action = 'create'
    }

    drop() {
        this.action = 'drop'
    }

    rename(name: string) {
        this.action = 'rename'
        this._rename = name
    }

    dropIfExists() {
        this.action = 'dropIfExists'
    }

    increments(column: string) {
        return this.addColumn(column, 'integer', { autoIncrement: true, unsigned: true, primaryIndex: true })
    }

    bigIncrements(column: string) {
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

    getAddedColumn() {}
}
