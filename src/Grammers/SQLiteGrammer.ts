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
    }

    protected modifiers: Modifiers = ['nullable', 'default', 'primaryIndex', 'autoIncrement']

    compileAlter(blueprint: Blueprint) {
        return blueprint.columns.map(column => {
            return `alter table ${this.wrapTable(blueprint.name)} add column ${this.addColumn(column)}`
        })
    }

    compileDrop(blueprint: Blueprint): string {
        return `drop table ${this.wrapTable(blueprint.name)}`
    }

    compileDropIfExists(blueprint: Blueprint): string {
        return `drop table if exists ${this.wrapTable(blueprint.name)}`
    }

    compileRename(blueprint: Blueprint): string {
        throw new Error(`SQLite doesn't support renameColumn`)
    }

    wrapTable(name: string) {
        return `"${name}"`
    }

    wrapColumn(name: string) {
        return `"${name}"`
    }
}
