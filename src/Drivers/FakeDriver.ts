import { Driver } from './Driver'

export class FakeDriver implements Driver {
    async query(sql: string) {
        //
    }

    async connect() {
        //
    }

    async disconnect() {
        //
    }
}
