import { Schema } from '../../src'

export default function () {
    return Schema.create('users', table => {
        table.integer('id')
        table.string('email')
        table.string('password').nullable()
        table.string('name').nullable()
    })
}
