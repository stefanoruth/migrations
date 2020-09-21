import { Blueprint } from '../Blueprint'
import { BaseGrammer, FieldTypes, Modifiers } from './BaseGrammer'

export class MySQLGrammer extends BaseGrammer {
    protected fieldTypes: FieldTypes = {
        string: 'varchar(100)',
        integer: 'int',
        bigInteger: 'bigint',
        boolean: 'tinyint(1)',
        json: 'json',
        uuid: 'char(36)',
        dateTimeTz: 'datetime',
    }

    protected modifiers: Modifiers = ['nullable', 'default', 'primaryIndex', 'autoIncrement']

    wrapTable(name: string) {
        return '`' + name + '`'
    }

    wrapColumn(name: string) {
        return '`' + name + '`'
    }
}
