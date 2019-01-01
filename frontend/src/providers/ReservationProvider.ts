import { Connect } from "./cat/cat";
import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { CustomerProvider } from "./CustomerProvider";

export interface IReservation {
  _id?: string;
  title: string;
  content: string;
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
  isRemovedReservation: boolean;
  downPayment: boolean;
  intermediatePayment: boolean;
  finalPayment: boolean;
}

@Injectable()
export class ReservationProvider {
  reservations: IReservation[] = [];

  constructor(
    private events: Events,
    private connect: Connect,
    private customerProvider: CustomerProvider
  ) {
    this.initEvents();
  }

  private initEvents() {}

  async getReservations() {
    const result = await this.connect.run({
      route: "reservation",
      method: "get"
    });

    if (result.error) {
      return;
    }
    this.reservations = result;
  }

  async getCustomerReservations(customerId) {
    const result = await this.connect.run({
      route: `reservation/${customerId}`,
      method: "get"
    });
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
        reservationsCount,
        isRemovedReservation,
        downPayment,
        intermediatePayment,
        finalPayment
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
        withdrawTime,
        isRemovedReservation,
        downPayment,
        intermediatePayment,
        finalPayment
      });

      this.events.publish("reservation:reservationAdded", reservationsCount);
      this.customerProvider.customers.push({
        _id: customerId,
        name: customerName,
        phone: customerPhone,
        company
      });
      this.events.publish("customer:customerAdded", customersCount);
    }
  }

  async removeReservation(reservationId: string) {
    const result = await this.connect.run({
      route: `reservation/${reservationId}`,
      method: "delete"
    });
    if (result.code && result.message) {
      console.error("removeReservation 삭제하는데 실패.");
    } else {
      this.reservations = this.reservations.map((reservation: IReservation) => {
        if (reservation._id === reservationId) {
          reservation.isRemovedReservation = true;
          return reservation;
        }
        return reservation;
      });

      this.events.publish("reservation:reservationRemoved", result);
    }
  }

  async removeRemovedReservation(reservationId: string) {
    const result = await this.connect.run({
      route: `removed-reservation/${reservationId}`,
      method: "delete"
    });
    if (result.n === 1 && result.ok === 1) {
      this.reservations = this.reservations.filter(
        reservation => reservation._id !== reservationId
      );
      this.events.publish(
        "reservation:reservationRemoved",
        result.removedReservationsCount
      );
    } else {
      console.log("removeRemovedReservation 삭제하는데 실패.");
    }
  }
  updateReservation() {}

  async updatePaymentPhase(paymentPhases) {
    const result = await this.connect.run(
      {
        route: `update-reservation-payment`,
        method: "post"
      },
      paymentPhases
    );

    if (result.code && result.message) {
      console.error("updatePaymentPhase 업데이트 하는데 실패.");
    } else {
      this.reservations = this.reservations.map((reservation: IReservation) => {
        if (reservation._id === paymentPhases.reservationId) {
          reservation.downPayment = result.downpayment === 'true' ? true : false;
          reservation.intermediatePayment = result.intermediatePayment === 'true' ? true : false;
          reservation.finalPayment = result.finalPayment === 'true' ? true : false;
          return reservation;
        }
        return reservation;
      });

      return { downPayment: result.downPayment === 'true' ? true : false, intermediatePayment: result.intermediatePayment === 'true' ? true : false, finalPayment: result.finalPayment === 'true' ? true : false}
    }
  }
}
