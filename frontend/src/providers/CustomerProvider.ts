import { Injectable } from '@angular/core';
import { INote } from '../pages/customer-note/customer-note';
import { Events } from 'ionic-angular';

@Injectable()
export class CustomerProvider {
    customers = [
        { name: "송은지PD", phone: "010-1111-2222", company: "구글"},
        { name: "김태헌PD", phone: "010-5555-5555", company: "페이스북"},
        { name: "송시우PD", phone: "010-8888-8888", company: "아마존"},
    ]

    constructor(
        public events: Events
    ) { 

    }

}

