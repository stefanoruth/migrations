export interface Driver {
    query(sql: string): Promise<any>
    connect(): Promise<void>
    disconnect(): Promise<void>
}
