export interface Column {
    nullable?: boolean
    length?: number
    default?: string | null | number
    name: string
    type: string
    autoIncrement?: boolean | number
    comment?: string
}
