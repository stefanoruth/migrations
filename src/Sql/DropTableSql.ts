import { SqlBuilder } from './SqlBuilder'

export class DropTableSql extends SqlBuilder {
    constructor(tableName: string) {
        super(tableName, [])
    }

    build() {
        return ''
    }
}
