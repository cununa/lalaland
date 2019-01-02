"use strict";

const reservationModel = require("../model/reservation-model");
const customerModel = require("../model/customer-model");
const ObjectID = require('mongodb').ObjectID

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
    // company,
    // customerName,
    // customerPhone,
    startDate,
    startTime,
    endDate,
    endTime,
    withdrawDate,
    withdrawTime,
    userId: _id,
    customerId: new ObjectID(customerId),
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
  const reservations = await reservationModel.aggregate([
    { $match : { userId: _id.toString() } },
    { $lookup:
       {
         from: 'customer',
         localField: 'customerId',
         foreignField: '_id',
         as: 'customerDetails'
       }
     }
    ]).sort({ startDate: 1, startTime: 1 });

    const refinedReservations = reservations.map((reservation) => {
      const { customerDetails } = reservation;
      let customerName;
      let customerPhone;
      let company;
      if (customerDetails.length === 0) {
        // 고객은 삭제된 상태여서 정보가 없습니다.
        customerName = "삭제된 고객 입니다";  
        customerPhone = "삭제된 고객 입니다";  
        company = "삭제된 고객 입니다";  
      } else {
        customerName = customerDetails[0].name;  
        customerPhone = customerDetails[0].phone;  
        company = customerDetails[0].company;  
      }
      
      delete reservation.customerDetails;
      reservation.customerName = customerName;
      reservation.customerPhone = customerPhone
      reservation.company = company
      return reservation
    })
  
  res.json(refinedReservations);
};

exports.getCustomerReservation = async (req, res) => {
  const { _id } = req.user;
  const { customerId } = req.params;

  const customerReservations = await reservationModel.aggregate([
    { $match : { userId: _id.toString(), customerId: ObjectID(customerId), isRemovedReservation: false }},
    { $lookup:
      {
        from: 'customer',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customerDetails'
      }
    }
  ]).sort({ startDate: 1, startTime: 1 });

  const refinedcustomerReservations = customerReservations.map((reservation) => {
    const { customerDetails } = reservation;
    let customerName;
    let customerPhone;
    let company;

    if (customerDetails.length === 0) {
      customerName = "삭제된 고객 입니다";  
      customerPhone = "삭제된 고객 입니다";  
      company = "삭제된 고객 입니다";  
    } else {
      customerName = customerDetails[0].name;  
      customerPhone = customerDetails[0].phone;  
      company = customerDetails[0].company;  
    }

    delete reservation.customerDetails;
    reservation.customerName = customerName;
    reservation.customerPhone = customerPhone
    reservation.company = company
    return reservation
  })

  const customer = await customerModel.find({ _id: customerId });
  const data = { customer: customer[0], reservations: refinedcustomerReservations }
  res.json(data);
};

exports.updateReservation = async (req, res) => {
    const {
        _id,
      title,
      content,
      reservationHolderName,
      reservationHolderPhone,
      isCustomerInfoSameAsReservationHolder,
      space,
      customerId,
      company,
      customerName,
      customerPhone,
      startDate, 
      startTime, 
      endDate, 
      endTime,
      withdrawDate,
      withdrawTime,
    } = req.body;
    const customerResult = await customerModel.findOneAndUpdate(
      { _id: customerId },
      {
        name: customerName,
        phone: customerPhone,
        company
      },
      { upsert: true, new: true }
  )
    const reservationResult = await reservationModel.findOneAndUpdate(
      { _id },
      {
        title,
        content,
        reservationHolderName,
        reservationHolderPhone,
        isCustomerInfoSameAsReservationHolder,
        space,
        startDate, 
        startTime, 
        endDate, 
        endTime,
        withdrawDate,
        withdrawTime,
      },
      { upsert: true, new: true }
    );

    const finalResult = {
      _id,
      title: reservationResult.title,
      content: reservationResult.content,
      reservationHolderName: reservationResult.reservationHolderName,
      reservationHolderPhone: reservationResult.reservationHolderPhone,
      isCustomerInfoSameAsReservationHolder: reservationResult.isCustomerInfoSameAsReservationHolder,
      space: reservationResult.space,
      customerId,
      company: customerResult.company,
      customerName: customerResult.name,
      customerPhone: customerResult.phone,
      startDate: reservationResult.startDate, 
      startTime: reservationResult.startTime, 
      endDate: reservationResult.endDate, 
      endTime: reservationResult.endTime,
      withdrawDate: reservationResult.withdrawDate,
      withdrawTime: reservationResult.withdrawTime,
    }

    res.json(finalResult);
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
