import { Migrator } from './Migrator'
import path from 'path'

const migrationsDir = path.join(__dirname, '../example/migrations')

console.log({ migrationsDir })

const migrator = new Migrator(migrationsDir)

migrator.getMigrations()
