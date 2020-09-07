import { Migration } from '.'
import { Schema } from './Schema'

class UserMigration extends Migration {
    async run() {
        Schema.create('users', blueprint => {
            // blueprint.integer('id')
            // blueprint.string('email')
        })
    }
}
