"use strict";

const reservationModel = require("../model/reservation-model");
const customerModel = require("../model/customer-model");

exports.createReservation = async (req, res) => {
  const {
    title,
    content,
    reservationHolderName,
    reservationHolderPhone,
    isCustomerInfoSameAsReservationHolder,
    space,
    company,
    customerName,
    customerPhone,
    startDate,
    startTime,
    endDate,
    endTime,
    withdrawDate,
    withdrawTime
  } = req.body;
  const { _id } = req.user;

  const checkIfCustomerAlreadyExisted = await customerModel.findOne({
    $and: [{ userId: _id }, { name: customerName }, { phone: customerPhone }]
  });

  let customerId;
  if (checkIfCustomerAlreadyExisted) {
    customerId = checkIfCustomerAlreadyExisted._id;
  } else {
    const customerResult = await customerModel.create({
      userId: _id,
      name: customerName,
      phone: customerPhone,
      company
    });
    customerId = customerResult._id;
  }

  const data = {
    title,
    content,
    reservationHolderName,
    reservationHolderPhone,
    isCustomerInfoSameAsReservationHolder,
    space,
    company,
    customerName,
    customerPhone,
    startDate,
    startTime,
    endDate,
    endTime,
    withdrawDate,
    withdrawTime,
    userId: _id,
    customerId,
    isRemovedReservation: false,
    downPayment: false,
    intermediatePayment: false,
    finalPayment: false
  };
  const reservationResult = await reservationModel.create(data);
  const customersCount = await customerModel.countDocuments({ userId: _id });
  const reservationsCount = await reservationModel.countDocuments({
    userId: _id,
    isRemovedReservation: false
  });

  const finalResultData = {
    _id: reservationResult._id,
    title,
    content,
    reservationHolderName,
    reservationHolderPhone,
    isCustomerInfoSameAsReservationHolder,
    space,
    company,
    customerName,
    customerPhone,
    startDate,
    startTime,
    endDate,
    endTime,
    withdrawDate,
    withdrawTime,
    userId: reservationResult.userId,
    customerId,
    reservationsCount,
    customersCount,
    isRemovedReservation: false,
    downPayment: false,
    intermediatePayment: false,
    finalPayment: false
  };

  res.json(finalResultData);
};

exports.getReservation = async (req, res) => {
  const { _id } = req.user;
  const reservations = await reservationModel.find({
    userId: _id
  });
  res.json(reservations);
};

exports.getCustomerReservation = async (req, res) => {
  const { _id } = req.user;
  const { customerId } = req.params;
  const customerReservations = await reservationModel.find({
    userId: _id,
    customerId,
    isRemovedReservation: false
  });
  res.json(customerReservations);
};

exports.updateReservation = async (req, res) => {
  //   console.log("updateReservation body", req.body);
  //   const {
  //     title,
  //     content,
  //     reservationId,
  //     reservationHolderName,
  //     reservationHolderPhone,
  //     isCustomerInfoSameAsReservationHolder,
  //     space,
  //     company,
  //     customerName,
  //     customerPhone,
  //     startDate,
  //     startTime,
  //     endDate,
  //     endTime,
  //     withdrawDate,
  //     withdrawTime
  //   } = req.body;
  //   const result = await reservationModel.findOneAndUpdate(
  //     { _id: reservationId },
  //     {
  //       title,
  //       content,
  //       reservationHolderName,
  //       reservationHolderPhone,
  //       isCustomerInfoSameAsReservationHolder,
  //       space,
  //       company,
  //       customerName,
  //       customerPhone,
  //       startDate,
  //       startTime,
  //       endDate,
  //       endTime,
  //       withdrawDate,
  //       withdrawTime
  //     },
  //     { upsert: true, new: true }
  //   );
  //   res.json(result);
};

exports.updatePaymentPhase = async (req, res) => {
  const {
    reservationId,
    downPayment,
    intermediatePayment,
    finalPayment
  } = req.body;
  const updateResult = await reservationModel.findOneAndUpdate(
    { _id: reservationId },
    {
      downPayment: downPayment === "true" ? true : false,
      intermediatePayment: intermediatePayment === "true" ? true : false,
      finalPayment: finalPayment === "true" ? true : false
    }
  );
  res.json({ downPayment, intermediatePayment, finalPayment });
};

exports.deleteReservation = async (req, res) => {
  const { _id } = req.user;
  const { reservationId } = req.params;
  const deleteResult = await reservationModel.findOneAndUpdate(
    { _id: reservationId },
    { isRemovedReservation: true }
  );
  const removedReservationsCount = await reservationModel.countDocuments({
    userId: _id,
    isRemovedReservation: true
  });
  res.json(removedReservationsCount);
};

exports.deleteRemovedReservation = async (req, res) => {
  const { _id } = req.user;
  const { reservationId } = req.params;
  const deleteResult = await reservationModel.deleteOne({ _id: reservationId });
  const removedReservationsCount = await reservationModel.countDocuments({
    userId: _id,
    isRemovedReservation: true
  });
  const data = {
    n: deleteResult.n,
    ok: deleteResult.ok,
    removedReservationsCount
  };
  res.json(data);
};
