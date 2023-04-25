const express = require('express');
const {User}= require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const userRouter= express.Router();

userRouter.post("/api/register",(req,res) => {
    const {name,email,password} = req.body;

    try {
        bcrypt.hash(password,5,async(err,hashed_password)=>{
            if(err) {
                console.log(err);
            }
            else{
                const user = new User({name,email,password:hashed_password});
                await user.save();
                res.status(201).send({"msg":"Registration successful"})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Registration Failed"})
    }
});

userRouter.post("/api/login",async(req, res)=>{
    const {email,password} = req.body;

    try {
        const user= await User.find({email});
    const hashed_password= user[0].password;

    
    if(user.length>0){
        bcrypt.compare(password,hashed_password,(err,result)=>{
            if(result){
                const token = jwt.sign({userID:user[0]._id},'tushar');
                res.status(201).send({"Token":token,"msg":"Login done"});

            }
            else{
                res.send({"msg":"wrong Credentials"})
            }
        })
    }
    else{
        res.send({"msg":"wrong Credentials"})
    }
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"login Failed"})
    }
    
})



module.exports={
    userRouter
}