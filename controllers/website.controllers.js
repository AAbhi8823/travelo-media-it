// controller for website

const websit_model = require("../models/website.model");
const user_model = require("../models/user.model");
const express_validator = require("express-validator");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const login_validator =
  require("../middleware/jwt.auth.middleware").authentication;
const apiResponse = require("../responses/apiResponses");

//create website
exports.add_website = [
  login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }

      const {
        website_name,
        website_url,
        website_description,
        website_logo,
        website_fevicon,
        isLive,
      } = req.body;

      const new_website = new websit_model(req.body);
      await new_website.save();
      return apiResponse.successResponseWithData(
        res,
        "Website created successfully",
        new_website
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
//update website
exports.update_website = [
  // login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }
      const {
        website_name,
        website_url,
        website_description,
        website_logo,
        website_fevicon,
        isLive,
      } = req.body;

      const website = await websit_model.findById(req.params.web_id);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website not found");
      }
      const updated_website = await websit_model.findByIdAndUpdate(
        req.params.web_id,
        req.body,
        { new: true }
      );
      return apiResponse.successResponseWithData(
        res,
        "Website updated successfully",
        updated_website
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//get website

exports.get_website = [
  //login_validator,
  async (req, res) => {
    try {
      const website = await websit_model.find();
      return apiResponse.successResponseWithData(
        res,
        "Website fetched successfully.........Response From AWS! Hi Abhsihek teployement testing",
        website
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
