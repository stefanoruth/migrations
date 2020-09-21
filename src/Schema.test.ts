import { Schema } from './Schema'

describe('Schema', () => {
    test('Create users table', () => {
        Schema.create('users', table => {
            table.increments('id')
            table.string('email').unique()
            table.string('password').nullable()
            table.dateTimeTz('created_at').default('now()')
            table.dateTimeTz('updated_at').default('now()')
            table.dateTimeTz('deleted_at').nullable()
        })
    })
})
