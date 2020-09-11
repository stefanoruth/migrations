import path from 'path'
import fs from 'fs'

export class TestDatabase {
    getFilepath() {
        const databasePath = path.join(__dirname, './database.sqlite')

        return databasePath
    }

    setup() {
        fs.writeFileSync(this.getFilepath(), '')
    }

    exists() {
        return fs.existsSync(this.getFilepath())
    }

    teardown() {
        fs.unlinkSync(this.getFilepath())
    }
}
