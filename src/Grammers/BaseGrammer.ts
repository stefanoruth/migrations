import { Blueprint } from '../Blueprint'
import { Column, ColumnOptions, ColumnType } from '../Column'

export type FieldTypes = { [k in ColumnType]: string | ((column: Column) => string) }

export type Modifiers = { [k in keyof ColumnOptions]: (column: Column) => string }

export abstract class BaseGrammer {
    protected abstract fieldTypes: FieldTypes
    protected abstract modifiers: Modifiers
    protected charset: string | null = null
    protected collation: string | null = null

    setOptions(options: { charset?: string; collation?: string }) {
        if (options.charset) {
            this.charset = options.charset
        }

        if (options.collation) {
            this.collation = options.collation
        }

        return this
    }

    getColumns(blueprint: Blueprint) {
        const columns: string[] = []

        for (const column of blueprint.columns) {
            columns.push(this.addColumn(column))
        }

        return columns
    }

    addColumn(column: Column) {
        let sql = `${this.wrapColumn(column.name)} ${this.getType(column)}`

        for (const key of Object.keys(this.modifiers)) {
            const modifier = (this.modifiers as any)[key]
            if (typeof modifier !== 'undefined') {
                sql += modifier(column)
            }
        }

        return sql
    }

    getType(column: Column): string {
        const type = this.fieldTypes[column.type]

        if (typeof type === 'string') {
            return type
        }

        return type(column)
    }

    toSql(blueprint: Blueprint): string[] {
        if (blueprint.type === 'create') {
            return this.compileCreate(blueprint)
        } else if (blueprint.type === 'alter') {
            return this.compileAlter(blueprint)
        } else if (blueprint.type === 'drop') {
            return this.compileDrop(blueprint)
        } else if (blueprint.type === 'rename') {
            return this.compileRename(blueprint)
        } else if (blueprint.type === 'dropIfExists') {
            return this.compileDropIfExists(blueprint)
        }

        throw new Error('Not able to produce any sql')
    }

    abstract wrapTable(name: string): string

    abstract wrapColumn(name: string): string

    /**
     * Compile a create table command.
     */
    compileCreate(blueprint: Blueprint): string[] {
        return [
            this.compileCreateEncoding(
                `create table ${this.wrapTable(blueprint.name)} (${this.getColumns(blueprint).join(', ')})`
            ),
        ]
    }

    /**
     * Compiles alter table commands.
     */
    compileAlter(blueprint: Blueprint): string[] {
        return [
            `alter table ${this.wrapTable(blueprint.name)} ${this.getColumns(blueprint)
                .map(column => `add ${column}`)
                .join(', ')}`,
        ]
    }

    /**
     * Compile a drop table command.
     */
    compileDrop(blueprint: Blueprint): string[] {
        throw new Error(`Grammer doesn't support drop table`)
    }

    /**
     * Compile a drop if table exists command.
     */
    compileDropIfExists(blueprint: Blueprint): string[] {
        throw new Error(`Grammer doesn't support drop table if exists`)
    }

    /**
     * Compile a rename table command.
     */
    compileRename(blueprint: Blueprint): string[] {
        throw new Error(`Grammer doesn't support rename table`)
    }

    /**
     * Append the character set specifications to a command.
     */
    compileCreateEncoding(sql: string) {
        if (this.charset) {
            sql += ` default character set ${this.charset}`
        }

        if (this.collation) {
            sql += ` collate '${this.collation}'`
        }

        return sql
    }
}
