import { Schema } from '../../src'

export default function () {
    return Schema.create('users', table => {
        table.integer('id')
        table.string('email')
    })
}
