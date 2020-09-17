import fs from 'fs'
import path from 'path'

export class Migrator {
    constructor(private pathToMigrations: string) {}

    async getMigrations() {
        const files = fs
            .readdirSync(this.pathToMigrations)
            .map(file => ({ name: file, path: path.join(this.pathToMigrations, file), migration: null }))
            .sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }
                return 0
            })

        for (const file of files) {
            file.migration = await import(file.path).then(module => module.default)
        }

        return files
    }
}
