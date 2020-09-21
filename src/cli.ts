import { Migrator } from './Migrator'
import path from 'path'
import { runCommand } from './Command'

runCommand(async () => {
    const migrationsDir = path.join(__dirname, '../example/migrations')

    console.log({ migrationsDir })

    const migrator = new Migrator(migrationsDir)

    console.log(await migrator.getMigrations())
})
