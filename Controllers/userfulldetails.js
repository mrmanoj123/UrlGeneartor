const express = require('express');
const cors = require('cors');

exports.getuserdetails = async(req,res)=>{
	const {fname,lname} = req.body;

    if(!fname || !lname){
        return res.status(400).json({
            statuis:200,
            message:"Invalid respond recevied",
        })
    }else{
        return res.status(200).json({
        status:200,
        message:`The full name is ,${fname} ${lname}`
    })
    }
}