import { Blueprint } from '../Blueprint'
import { BaseGrammer, FieldTypes, Modifiers } from './BaseGrammer'

export class MySQLGrammer extends BaseGrammer {
    protected fieldTypes: FieldTypes = {
        string: column => `varchar(${column.length})`,
        integer: 'int',
        bigInteger: 'bigint',
        boolean: 'tinyint(1)',
        json: 'json',
        uuid: 'char(36)',
        dateTimeTz: 'datetime',
    }

    protected modifiers: Modifiers = {
        unsigned: column => (column.unsigned === true ? ' unsigned' : ''),
        nullable: column => (column.nullable === true ? '' : ' not null'),
        autoIncrement: column => (column.autoIncrement === true ? ' auto_increment' : ''),
        primaryIndex: column => (column.primaryIndex === true ? ' primary key' : ''),
    }

    wrapTable(name: string) {
        return '`' + name + '`'
    }

    wrapColumn(name: string) {
        return '`' + name + '`'
    }

    modifyAutoIncrement(value: boolean | undefined) {
        if (value === true) {
            return ' auto_increment'
        }

        return ''
    }
}
