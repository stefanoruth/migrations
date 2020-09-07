import { CreateTableSql, AlterTableSql, DropTableSql } from './Sql'
import { Column } from './Columns'

export class Blueprint {
    constructor(private table: string, private type: 'create' | 'alter' | 'drop') {}

    private columns: Column[] = []

    // private add(column: Column) {
    //     this.columns.push(column)

    //     return column
    // }

    // integer(columnName: string) {
    //     return this.add(new Column(columnName))
    // }

    // string(columnName: string, length: number = 100) {
    //     return this.add(new Column(columnName).length(length))
    // }

    // timestampTz(columnName: string) {
    //     return this.add(new Column(columnName))
    // }

    toSQL(): string {
        if (this.type === 'create') {
            return new CreateTableSql(this.table, this.columns).build()
        }

        if (this.type === 'alter') {
            return new AlterTableSql(this.table, this.columns).build()
        }

        if (this.type === 'drop') {
            return new DropTableSql(this.table).build()
        }

        throw new Error(`Unknown type "${this.type}"`)
    }
}
