import { Blueprint } from '../Blueprint'
import { BaseGrammer, FieldTypes, Modifiers } from './BaseGrammer'

export class SQLiteGrammer extends BaseGrammer {
    protected fieldTypes: FieldTypes = {
        string: 'varchar',
        integer: 'integer',
        bigInteger: 'integer',
        boolean: 'tinyint(1)',
        json: 'text',
        uuid: 'varchar',
        dateTimeTz: 'datetime',
        char: 'varchar',
        text: 'text',
        mediumText: 'text',
        longText: 'text',
        tinyInteger: 'integer',
        smallInteger: 'integer',
        mediumInteger: 'integer',
        float: 'float',
        double: 'float',
        decimal: 'numeric',
        enum: column => `varchar check ("${column.name}" in ('${column.allowed?.join("', ")}'))`,
        jsonb: 'text',
        date: 'date',
        dateTime: 'datetime',
        time: 'time',
        timeTz: 'time',
        timestamp: column => (column.useCurrent ? 'datetime default CURRENT_TIMESTAMP' : 'datetime'),
        timestampTz: column => (column.useCurrent ? 'datetime default CURRENT_TIMESTAMP' : 'datetime'),
        year: 'integer',
        binary: 'blob',
        ipAddress: 'varchar',
        macAddress: 'varchar',
        geometry: 'geometry',
    }

    protected modifiers: Modifiers = {
        nullable: column => (column.nullable === true ? '' : ' not null'),
        primaryIndex: column => (column.primaryIndex === true ? ' primary key' : ''),
        autoIncrement: column => (column.autoIncrement === true ? ' autoincrement' : ''),
    }

    compileCreate(blueprint: Blueprint): string[] {
        return [
            this.compileCreateEncoding(
                `create table ${this.wrapTable(blueprint.table)} (${this.getColumns(blueprint).join(', ')})`
            ),
        ]
    }

    compileAlter(blueprint: Blueprint) {
        return blueprint.columns.map(column => {
            return `alter table ${this.wrapTable(blueprint.table)} add column ${this.addColumn(column)}`
        })
    }

    compileDrop(blueprint: Blueprint): string[] {
        return [`drop table ${this.wrapTable(blueprint.table)}`]
    }

    compileDropIfExists(blueprint: Blueprint): string[] {
        return [`drop table if exists ${this.wrapTable(blueprint.table)}`]
    }

    compileRename(blueprint: Blueprint): string[] {
        return []
        // return [`alter table ${this.wrapTable(blueprint.table)} rename to ${this.wrapTable(blueprint.newTableName)}`]
    }

    wrapTable(name: string) {
        return `"${name}"`
    }

    wrapColumn(name: string) {
        return `"${name}"`
    }
}
