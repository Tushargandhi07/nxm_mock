const express = require('express');
const {Flight}= require('../model/flight.model');
const flightRouter= express.Router();

flightRouter.get("/api/flights",async(req,res)=>{
    try {
        const flights= await Flight.find();
        res.status(200).send(flights);
    } catch (error) {
        res.status(401).send({"msg":"Error while getting flights"});
    }
});

flightRouter.get("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const flights= await Flight.findById(id);
        res.status(200).send(flights);
    } catch (error) {
        res.status(401).send({"msg":"Error while getting flights"});
    }
});


flightRouter.post("/api/flights",async(req,res)=>{
    try {
        const payload= req.body;
        const flight= new Flight(payload);
        await flight.save();
        res.status(201).send({'msg': 'flight saved successfully'}) ;

    } catch (error) {
        console.log(error)
        res.status(401).send({"msg":"Error while creating new flights."});
    }
});

flightRouter.patch("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const payload= req.body;
        const flight= await Flight.findByIdAndUpdate({_id:id}, payload);
        res.status(204).send({'msg': 'flight updated successfully'}) ;

    } catch (error) {
        console.log(error);
        res.status(401).send({"msg":"Error while updaing flight."});
    }
});

flightRouter.delete("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const flight= await Flight.findByIdAndDelete({_id:id});
        res.status(202).send({'msg': 'flight deleted successfully'}) ;

    } catch (error) {
        console.log(error);
        res.status(401).send({"msg":"Error while deleting flight."});
    }
});




module.exports={
    flightRouter
}