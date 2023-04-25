const express = require('express');
const {Flight}= require('../model/flight.model');
const {Booking}= require('../model/booking.model');
const bookingRouter= express.Router();

bookingRouter.post("/api/booking",async(req, res)=>{
    try {
        const {flightId} = req.body;
        const id= req.user

        const flight= await Flight.findById(flightId);
        if(flight){
            const validated= await Booking.findOne({flight:flightId, userID:id});

            if(validated){
                res.status(500).send({"msg":"Flight already booked by the user."});
            }
            else{
                await Booking.insertMany([{userID:id, flight:flightId}]);
                res.status(201).send({'mag':'Flight booked successfully.'})
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({'msg': error.message});
    }
})


module.exports={
    bookingRouter
}

