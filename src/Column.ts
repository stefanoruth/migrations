export type ColumnType = 'string' | 'integer' | 'boolean' | 'json' | 'bigInteger' | 'uuid' | 'dateTimeTz'

export interface ColumnOptions {
    nullable?: boolean
    length?: number
    comment?: string
    default?: string | number | null | boolean
    autoIncrement?: boolean
    unsigned?: boolean
    uniqueIndex?: boolean
    primaryIndex?: boolean
}

export interface Column extends ColumnOptions {
    name: string
    type: ColumnType
}

export class ColumnModifier {
    constructor(protected column: Column) {}

    comment(value: string) {
        this.column.comment = value

        return this
    }

    default(value: string) {
        this.column.default = value

        return this
    }

    nullable(value = true) {
        this.column.nullable = value

        return this
    }

    unsigned(value = true) {
        this.column.unsigned = value

        return this
    }

    autoIncrement() {
        this.column.autoIncrement = true

        return this
    }

    unique() {
        this.column.uniqueIndex = true

        return this
    }

    primay() {
        this.column.primaryIndex = true

        return this
    }
}
