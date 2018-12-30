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
    customerId
  };
  const reservationResult = await reservationModel.create(data);
  const customersCount = await customerModel.countDocuments({ userId: _id });
  const reservationsCount = await reservationModel.countDocuments({
    userId: _id
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
    customersCount
  };

  res.json(finalResultData);
};

exports.getReservation = async (req, res) => {
  const { _id } = req.user;
  const reservations = await reservationModel.find({ userId: _id });
  res.json(reservations);
};

exports.getCustomerReservation = async (req, res) => {
  const { _id } = req.user;
  const { customerId } = req.params;
  const customerReservations = await reservationModel.find({
    userId: _id,
    customerId
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

exports.deleteReservation = async (req, res) => {
//   console.log("deleteReservation body", req.params);
//   const { id } = req.params;
//   const result = await reservationModel.deleteOne({ _id: id });
//   res.json(result);
};
