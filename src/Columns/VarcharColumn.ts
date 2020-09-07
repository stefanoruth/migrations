import { BaseColumn } from './BaseColumn'

export class VarcharColumn extends BaseColumn {
    constructor(name: string, length = 100) {
        super(name, 'varchar')

        this.length(length)
    }

    length(length: number) {
        this.column.length = length

        return this
    }
}
