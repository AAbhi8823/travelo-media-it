//controllers for preminum
// Project: travelo-preminum-it
const preminum_model = require("../models/premium.model");
const express_validator = require("express-validator");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const login_validator =
  require("../middleware/jwt.auth.middleware").authentication;

const apiResponse = require("../responses/apiResponses");

//create preminum service
exports.add_premium = [
  //login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }

      const {
        service_name,
        service_description,
        service_image,
        service_duration,
        isLive,
      } = req.body;
       
      const new_preminum = new preminum_model({
        service_name: service_name,
        service_description: service_description,
        service_image: service_image,
        plan: req.body.plan,
        service_duration: service_duration,
        isLive: isLive,
      });
    

      let premium_created = await new_preminum.save();
      return apiResponse.successResponseWithData(
        res,
        "Preminum service created successfully",
        premium_created
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update preminum service

exports.update_premium = [
  //login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }

      const {
        service_name,
        service_description,
        service_image,
        service_duration,
        isLive,
      } = req.body;

      let premium_updated = await preminum_model.findByIdAndUpdate(
        req.params.premium_id,
        {
          service_name: service_name,
          service_description: service_description,
          service_image: service_image,
          plan: req.body.plan,
          service_duration: service_duration,
          isLive: isLive,
        },
        { new: true }
      );

      return apiResponse.successResponseWithData(
        res,
        "Preminum service updated successfully",
        premium_updated
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update plan only
exports.update_plan = [
  //login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }

      const { plan } = req.body;

      let premium_updated = await preminum_model.findByIdAndUpdate(
        req.params.premium_id,
        {
          plan: req.body.plan,
        },
        { new: true }
      );

      return apiResponse.successResponseWithData(
        res,
        "Preminum service updated successfully",
        premium_updated
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];






//get premium by id

exports.get_premium_by_id = [

  //login_validator,
  async (req, res) => {
    try {
      const premium = await preminum_model.findById(req.params.premium_id,);
      return apiResponse.successResponseWithData(
        res,
        "Preminum service found successfully",
        premium
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];



//get all preminum services
exports.get_all_premium = [
  //login_validator,
  async (req, res) => {
    try {
      const premium = await preminum_model.find();
      return apiResponse.successResponseWithData(
        res,
        "Preminum services found successfully",
        premium
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
]; 


