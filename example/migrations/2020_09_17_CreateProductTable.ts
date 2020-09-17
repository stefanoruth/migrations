import { Migration, Schema } from '../../src'

export default function () {
    Schema.create('users', blueprint => {
        // blueprint.integer('id')
        // blueprint.string('email')
    })
}
