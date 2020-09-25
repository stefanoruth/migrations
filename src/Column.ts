export type ColumnType =
    | 'integer'
    | 'bigInteger'
    | 'char'
    | 'string'
    | 'text'
    | 'mediumText'
    | 'longText'
    | 'tinyInteger'
    | 'smallInteger'
    | 'mediumInteger'
    | 'float'
    | 'double'
    | 'decimal'
    | 'boolean'
    | 'enum'
    | 'json'
    | 'jsonb'
    | 'date'
    | 'dateTime'
    | 'dateTimeTz'
    | 'time'
    | 'timeTz'
    | 'timestamp'
    | 'timestampTz'
    | 'year'
    | 'binary'
    | 'uuid'
    | 'ipAddress'
    | 'macAddress'
    | 'geometry'

export interface ColumnOptions {
    nullable?: boolean
    length?: number
    comment?: string
    default?: string | number | null | boolean
    autoIncrement?: boolean
    unsigned?: boolean
    uniqueIndex?: boolean
    primaryIndex?: boolean
    change?: boolean
    total?: number
    places?: number
    useCurrent?: boolean
    allowed?: string[]
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

    change() {
        this.column.change = true

        return this
    }
}
