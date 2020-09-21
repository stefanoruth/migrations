import { Blueprint } from '../Blueprint'
import { MySQLGrammer } from './MySQLGrammer'

describe('MySQLGrammer', () => {
    const grammer = new MySQLGrammer()

    test('Basic create table', () => {
        const table = new Blueprint('users')
        table.create()
        table.increments('id')
        table.string('email')

        expect(grammer.toSql(table)).toEqual([
            "create table `users` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null) default character set utf8 collate 'utf8_unicode_ci'",
        ])
    })
})
