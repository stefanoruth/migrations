import sqlite from 'sqlite3'

export class SQLiteDriver {
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

    async isHealthy(): Promise<boolean> {
        return this.query('SELECT COUNT(*) FROM sqlite_master')
            .then(res => {
                if (res === null) {
                    return false
                }
                return true
            })
            .catch(err => {
                return false
            })
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.client = new sqlite.Database(this.filename, err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }

    async close() {
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
