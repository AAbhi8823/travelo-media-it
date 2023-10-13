//contact us cotrollers

const website_model=require('../models/website.model')
const apiResponse = require("../responses/apiResponses");
const { validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { sanitize } = require('express-validator');
const { body } = require('express-validator');


///add contact us 

exports.add_contact_us=[
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }

            const { name, email, subject, phone, message,web_id } = req.body;
            console.log(req.body.subject)
            if(!req.body.web_id){
                return res.status(400).json({
                    success:false,
                    message:"Please provide web_id"
                })
            }
            const website = await website_model.findById(req.body.web_id);
            if (!website) {
                return apiResponse.notFoundResponse(res, "Website Not Found");
            }
            
           website.contact_us.unshift(req.body);
           const contact_us_added=  await website.save();
            return apiResponse.successResponseWithData(res, "Contact Us Added Successfully", contact_us_added);
            
           
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err.message);
        }
    }

]

//get contact us by id  

exports.get_contact_us_by_id=[
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }

            
            const website = await website_model.findById(req.params.web_id);
            if (!website) {
                return apiResponse.notFoundResponse(res, "Website Not Found");
            }
            
           const contact_us=  website.contact_us.find(contact_us => contact_us._id == req.params.contact_us_id);
            return apiResponse.successResponseWithData(res, "Contact Us Found Successfully", contact_us);
            
           
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err.message);
        }
    }

]

//get all contact us

exports.get_all_contact_us=[
    async (req, res) => {
        try {
            const website = await website_model.findById(req.params.web_id);
            if (!website) {
                return apiResponse.notFoundResponse(res, "Website Not Found");
            }
            
           const contact_us=  website.contact_us;
            return apiResponse.successResponseWithData(res, "Contact Us Found Successfully", contact_us);
            
           
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err.message);
        }
    }

]


