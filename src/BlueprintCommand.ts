export type IndexType = 'primary' | 'unique' | 'spatialIndex' | 'foreign' | 'index'

export type CommandType =
    | IndexType
    | 'dropUnique'
    | 'dropIndex'
    | 'dropSpatialIndex'
    | 'dropPrimary'
    | 'dropForeign'
    | 'renameIndex'
    | 'rename'
    | 'create'
    | 'drop'
    | 'dropIfExists'
    | 'dropColumn'
    | 'renameColumn'

export interface CommandOptions {
    columns?: string[]
    from?: string
    to?: string
    index?: string
}

export interface Command extends CommandOptions {
    name: CommandType
}
