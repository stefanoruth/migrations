import { Column } from './Column'

export class BaseColumn {
    protected column: Column

    constructor(name: string, type: string) {
        this.column = {
            name,
            type,
        }
    }

    comment(value: string) {
        this.column.comment = value

        return this
    }

    default(value: string | number | null) {
        this.column.default = value

        return this
    }

    nullable(value = true) {
        this.column.nullable = value

        return this
    }

    get(): Column {
        return this.column
    }
}
