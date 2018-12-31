import { Connect } from './cat/cat';
import { Injectable } from '@angular/core';
import { INote } from '../pages/customer-note/customer-note';
import { Events } from 'ionic-angular';

@Injectable()
export class CustomerProvider {
    customers = []

    constructor(
        private events: Events,
        private connect: Connect
    ) { 

    }

    async getCustomers() {
        const result = await this.connect.run({ route: "customer", method: "get"})
        this.customers = result;
    }
}

