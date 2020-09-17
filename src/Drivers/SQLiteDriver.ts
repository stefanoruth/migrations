import sqlite from 'sqlite3'
import { Driver } from './Driver'

export class SQLiteDriver implements Driver {
    private client?: sqlite.Database

    constructor(private filename: string) {}

    async query(sql: string): Promise<sqlite.RunResult> {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                throw new Error('SQLite client is not connected yet.')
            }

            this.client.run(sql, (res: sqlite.RunResult, err: Error | null) => {
                console.log({ sql, res, err })
                if (err) {
                    return reject(err)
                }
                return resolve(res)
            })
        })
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client = new sqlite.Database(this.filename, err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }

    async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return resolve()
            }

            this.client.close(err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }
}
