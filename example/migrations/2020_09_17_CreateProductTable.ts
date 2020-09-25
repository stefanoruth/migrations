import { Schema } from '../../src'

export default function () {
    return Schema.create('users', table => {
        table.id()
        table.string('email')
    })
}
