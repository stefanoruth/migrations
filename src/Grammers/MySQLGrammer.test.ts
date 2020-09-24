import { Blueprint } from '../Blueprint'
import { MySQLGrammer } from './MySQLGrammer'

let grammer: MySQLGrammer

beforeEach(() => {
    grammer = new MySQLGrammer()
})

describe('MySQLGrammer', () => {
    test('Basic create table', () => {
        const table = new Blueprint('users')
        table.create()
        table.increments('id')
        table.string('email', 255)

        grammer.setOptions({ charset: 'utf8', collation: 'utf8_unicode_ci' })

        expect(grammer.toSql(table)).toEqual([
            "create table `users` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null) default character set utf8 collate 'utf8_unicode_ci'",
        ])
    })

    test('Basic alter table', () => {
        const table = new Blueprint('users')

        table.increments('id')
        table.string('email', 255)

        expect(grammer.toSql(table)).toEqual([
            'alter table `users` add `id` int unsigned not null auto_increment primary key, add `email` varchar(255) not null',
        ])
    })
})
