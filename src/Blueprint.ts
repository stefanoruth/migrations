import { Command, CommandOptions, CommandType, IndexType } from './BlueprintCommand'
import { ColumnModifier, Column, ColumnType, ColumnOptions } from './Column'

export class Blueprint {
    public readonly columns: Column[] = []
    public readonly commands: Command[] = []
    public engine: string | undefined
    public collation: string | undefined
    public isTemporary = false

    constructor(public readonly table: string) {}

    /**
     * Commands
     */
    private addCommand(name: CommandType, options?: CommandOptions) {
        const command: Command = {
            name,
            ...options,
        }

        this.commands.push(command)

        return command
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

    /**
     * Tables
     */
    create() {
        return this.addCommand('create')
    }

    temporary() {
        this.isTemporary = true
    }

    drop() {
        return this.addCommand('drop')
    }

    dropIfExists() {
        return this.addCommand('dropIfExists')
    }

    rename(name: string) {}

    /**
     * Indexes
     */

    dropPrimary(columns: string | string[]) {
        return this.dropIndexCommand('dropPrimary', 'primary', columns)
    }

    dropUnique(columns: string | string[]) {
        return this.dropIndexCommand('dropUnique', 'unique', columns)
    }

    dropIndex(columns: string | string[]) {
        return this.dropIndexCommand('dropIndex', 'index', columns)
    }

    dropSpatialIndex(columns: string | string[]) {
        return this.dropIndexCommand('dropSpatialIndex', 'spatialIndex', columns)
    }

    dropForeign(columns: string | string[]) {
        return this.dropIndexCommand('dropForeign', 'foreign', columns)
    }

    renameIndex(from: string, to: string) {
        return this.addCommand('renameIndex', { from, to })
    }

    primary(columns: string | string[]) {
        return this.indexCommand('primary', columns)
    }

    unique(columns: string | string[]) {
        return this.indexCommand('unique', columns)
    }

    index(columns: string | string[]) {
        return this.indexCommand('index', columns)
    }

    spatialIndex(columns: string | string[]) {
        return this.indexCommand('spatialIndex', columns)
    }

    private createIndexName(type: IndexType, columns: string[]) {
        return `${this.table}_${columns.join('_')}_${type}`.toLowerCase()
    }

    private dropIndexCommand(name: CommandType, type: IndexType, columns: string | string[]) {
        columns = Array.isArray(columns) ? columns : [columns]

        const index = this.createIndexName(type, columns)

        return this.addCommand(name, { columns, index })
    }

    private indexCommand(name: IndexType, columns: string | string[]) {
        columns = Array.isArray(columns) ? columns : [columns]

        const index = this.createIndexName(name, columns)

        return this.addCommand(name, { columns, index })
    }

    /**
     * Column
     */

    dropColumn(columns: string | string[]) {
        columns = Array.isArray(columns) ? columns : [columns]

        return this.addCommand('dropColumn', { columns })
    }

    renameColumn(from: string, to: string) {
        return this.addCommand('renameColumn', { from, to })
    }

    /**
     * Fluent Columns
     */

    id(column = 'id') {
        return this.addColumn(column, 'bigInteger', { autoIncrement: true, unsigned: true, primaryIndex: true })
    }

    char(column: string, length = 100) {
        return this.addColumn(column, 'char', { length })
    }

    string(column: string, length = 100) {
        return this.addColumn(column, 'string', { length })
    }

    text(column: string) {
        return this.addColumn(column, 'text')
    }

    mediumText(column: string) {
        return this.addColumn(column, 'mediumText')
    }

    longText(column: string) {
        return this.addColumn(column, 'longText')
    }

    integer(column: string) {
        return this.addColumn(column, 'integer')
    }

    tinyInteger(column: string) {
        return this.addColumn(column, 'tinyInteger')
    }

    smallInteger(column: string) {
        return this.addColumn(column, 'smallInteger')
    }

    mediumInteger(column: string) {
        return this.addColumn(column, 'mediumInteger')
    }

    bigInteger(column: string) {
        return this.addColumn(column, 'bigInteger')
    }

    float(column: string, total = 8, places = 2) {
        return this.addColumn(column, 'float', { total, places })
    }

    double(column: string, total?: number, places?: number) {
        return this.addColumn(column, 'double', { total, places })
    }

    decimal(column: string, total = 8, places = 2) {
        return this.addColumn(column, 'decimal', { total, places })
    }

    boolean(column: string) {
        return this.addColumn(column, 'boolean')
    }

    enum(column: string, allowed: string[]) {
        return this.addColumn(column, 'enum', { allowed })
    }

    json(column: string) {
        return this.addColumn(column, 'json')
    }

    jsonb(column: string) {
        return this.addColumn(column, 'jsonb')
    }

    date(column: string) {
        return this.addColumn(column, 'date')
    }

    dateTime(column: string) {
        return this.addColumn(column, 'dateTime')
    }

    dateTimeTz(column: string) {
        return this.addColumn(column, 'dateTimeTz')
    }

    time(column: string) {
        return this.addColumn(column, 'time')
    }

    timeTz(column: string) {
        return this.addColumn(column, 'timeTz')
    }

    timestamp(column: string) {
        return this.addColumn(column, 'timestamp')
    }

    timestampTz(column: string) {
        return this.addColumn(column, 'timestampTz')
    }

    year(column: string) {
        return this.addColumn(column, 'year')
    }

    binary(column: string) {
        return this.addColumn(column, 'binary')
    }

    uuid(column: string) {
        return this.addColumn(column, 'uuid')
    }

    ipAddress(column: string) {
        return this.addColumn(column, 'ipAddress')
    }

    macAddress(column: string) {
        return this.addColumn(column, 'macAddress')
    }

    geometry(column: string) {
        return this.addColumn(column, 'geometry')
    }
}
