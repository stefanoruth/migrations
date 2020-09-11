import { ColumnType, Column } from '../Column'
import { Blueprint } from '../Blueprint'

export class SQLiteGrammer {
    protected fieldTypes: { [k in ColumnType]: string } = {
        string: 'varchar',
        integer: 'integer',
        bigInteger: 'interger',
        boolean: 'tinyint(1)',
        json: 'text',
        uuid: 'varchar',
        dateTimeTz: 'datetime',
    }

    /**
     * Compile the query to determine the list of columns.
     */
    compileTableExists(table: string) {
        return `SELECT * FROM sqlite_master WHERE type = 'table' AND name = ${table}`
    }

    /**
     * Compile the query to determine the list of columns.
     */
    compileColumnListing(table: string) {
        return `pragma table_info(${table})`
    }

    compileTableList() {
        return `SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'`
    }

    /**
     * Compile a create table command.
     */
    compileCreate(blueprint: Blueprint) {
        return `CREATE TABLE ${blueprint.table} (${this.getColumns(blueprint).join(', ')})`
    }

    getColumns(blueprint: Blueprint) {
        const columns: string[] = []

        for (const column of blueprint.columns) {
            const sql = `${column.name} ${this.getType(column.type)}`

            columns.push(sql)
        }

        return columns
    }

    getType(type: ColumnType): string {
        return this.fieldTypes[type]
    }
}
