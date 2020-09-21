import { Blueprint } from '../Blueprint'
import { Column, ColumnOptions, ColumnType } from '../Column'

export type FieldTypes = { [k in ColumnType]: string }

export type Modifiers = (keyof ColumnOptions)[]

export abstract class BaseGrammer {
    protected abstract fieldTypes: FieldTypes
    protected abstract modifiers: Modifiers

    getColumns(blueprint: Blueprint) {
        const columns: string[] = []

        for (const column of blueprint.columns) {
            columns.push(this.addColumn(column))
        }

        return columns
    }

    addColumn(column: Column) {
        let sql = `${this.wrapColumn(column.name)} ${this.getType(column.type)}`

        for (const modifier of this.modifiers) {
            if (modifier === 'nullable') {
                sql += this.modifyNullable(column.nullable)
            } else if (modifier === 'primaryIndex') {
                sql += this.modifyPrimary(column.primaryIndex)
            } else if (modifier === 'autoIncrement') {
                sql += this.modifyAutoIncrement(column.autoIncrement)
            }
        }

        return sql
    }

    getType(type: ColumnType): string {
        return this.fieldTypes[type]
    }

    toSql(blueprint: Blueprint): string[] {
        if (blueprint.type === 'create') {
            return [this.compileCreate(blueprint)]
        } else if (blueprint.type === 'alter') {
            return this.compileAlter(blueprint)
        } else if (blueprint.type === 'drop') {
            return [this.compileDrop(blueprint)]
        } else if (blueprint.type === 'rename') {
            return [this.compileDrop(blueprint)]
        } else if (blueprint.type === 'dropIfExists') {
            return [this.compileDropIfExists(blueprint)]
        }

        throw new Error('Not able to produce any sql')
    }

    abstract wrapTable(name: string): string

    abstract wrapColumn(name: string): string

    /**
     * Compile a create table command.
     */
    compileCreate(blueprint: Blueprint): string {
        return `create table ${this.wrapTable(blueprint.name)} (${this.getColumns(blueprint).join(', ')})`
    }

    /**
     * Compiles alter table commands.
     */
    compileAlter(blueprint: Blueprint): string[] {
        throw new Error(`Grammer doesn't support alter table`)
    }

    /**
     * Compile a drop table command.
     */
    compileDrop(blueprint: Blueprint): string {
        throw new Error(`Grammer doesn't support drop table`)
    }

    /**
     * Compile a drop if table exists command.
     */
    compileDropIfExists(blueprint: Blueprint): string {
        throw new Error(`Grammer doesn't support drop table if exists`)
    }

    /**
     * Compile a rename table command.
     */
    compileRename(blueprint: Blueprint): string {
        throw new Error(`Grammer doesn't support rename table`)
    }

    modifyNullable(value: boolean | undefined) {
        if (value === true) {
            return ''
        }

        return ' not null'
    }

    modifyPrimary(value: boolean | undefined) {
        if (value === true) {
            return ' primary key'
        }

        return ''
    }

    modifyAutoIncrement(value: boolean | undefined) {
        if (value === true) {
            return ' autoincrement'
        }

        return ''
    }
}
