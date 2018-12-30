import { Connect } from "./cat/cat";
import { Injectable } from "@angular/core";
import { INote } from "../pages/customer-note/customer-note";
import { Events } from "ionic-angular";
import { CustomerProvider } from "./CustomerProvider";

export interface IReservation {
  _id?: string;
  title: string,
  content: string,
  reservationHolderName: string;
  reservationHolderPhone: string;
  isCustomerInfoSameAsReservationHolder: boolean;
  space: string;
  company: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  startDate: any;
  startTime: any;
  endDate: any;
  endTime: any;
  withdrawDate: any;
  withdrawTime: any;
}

@Injectable()
export class ReservationProvider {
  reservations: IReservation[] = [];

  constructor(private events: Events, private connect: Connect, private customerProvider: CustomerProvider) {
    this.initEvents();
  }

  private initEvents() {}

  async getReservations() {
    const result = await this.connect.run({ route: "reservation", method: "get"})
    this.reservations = result;
  }

  async getCustomerReservations(customerId) {
    const result = await this.connect.run({ route: `reservation/${customerId}`, method: "get"})
    return result;
  }

  async addReservation(data: IReservation) {
    const result = await this.connect.run(
      { route: "reservation", method: "put" },
      data
    );

    if (result.code && result.message) {
      console.error("send 에러", result);
    } else {
      const {
        _id,
        title,
        content,
        reservationHolderName,
        reservationHolderPhone,
        isCustomerInfoSameAsReservationHolder,
        space,
        company,
        customerId,
        customerName,
        customerPhone,
        startDate,
        startTime,
        endDate,
        endTime,
        withdrawDate,
        withdrawTime,
        customersCount,
        reservationsCount
      } = result;

      this.reservations.push({
        _id,
        title,
        content,
        reservationHolderName,
        reservationHolderPhone,
        isCustomerInfoSameAsReservationHolder,
        space,
        company,
        customerId,
        customerName,
        customerPhone,
        startDate,
        startTime,
        endDate,
        endTime,
        withdrawDate,
        withdrawTime
      });

      this.events.publish("reservation:reservationAdded", reservationsCount);
      this.customerProvider.customers.push({ _id: customerId, name: customerName, phone: customerPhone, company });
      this.events.publish("customer:customerAdded", customersCount);
    }
  }

  removeReservation() { }

  updateReservation() { }
}
