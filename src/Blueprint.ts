import { Column } from './Column'

export interface Blueprint {
    table: string
    columns: Column[]
}
