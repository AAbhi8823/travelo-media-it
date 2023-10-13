
/**
 * Controller functions for managing services in a website.
 * @module controllers/services.controllers.js
 */

const website_model = require("../models/website.model");
const express_validator = require("express-validator");
const { check, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const { sanitize } = require("express-validator");
const { body } = require("express-validator");
const { matchedData } = require("express-validator");
const { param } = require("express-validator");
const apiResponse = require("../responses/apiResponses");

/**
 * Add a new service to a website.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response object with success or error message.
 */
exports.add_service = [
    async (req, res) => {
        // function body
    },
];

/**
 * Update an existing service in a website.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response object with success or error message.
 */
exports.update_service = [
    async (req, res) => {
        // function body
    },
];

/**
 * Add a new sub-service to an existing service in a website.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response object with success or error message.
 */
exports.add_sub_service = [
    async (req, res) => {
        // function body
    },
];

/**
 * Get all services in a website.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response object with success or error message.
 */
exports.get_all_services = [
    async (req, res) => {
        // function body
    },
];

//add services

exports.add_service = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      const { service_name, sub_services, service_description, service_image } =
        req.body;
      const website = await website_model.findById(req.body.web_id);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }

      website.services.unshift(req.body.services);
      const service_added = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "Service Added Successfully",
        service_added
      );
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update services only

exports.update_service = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }

      if (Object.keys(req.body).length == 0) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          "Please provide service details"
        );
      }

      const website = await website_model.findById(req.body.web_id);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      const service = website.services.find(
        (service) => service._id == req.body.service_id
      );
      if (!service) {
        return apiResponse.notFoundResponse(res, "Service Not Found");
      }

      service.name = req.body.name;
      service.description = req.body.description;
      service.image_icon = req.body.image;
      const service_updated = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "Service Updated Successfully",
        service_updated
      );
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//add sub services

exports.add_sub_service = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      console.log(req.body);
      if (req.body.length == 0) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          "Please provide sub service details"
        );
      }

      const website = await website_model.findById(req.body.web_id);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      const service = website.services.find(
        (service) => service._id == req.body.service_id
      );
      if (!service) {
        return apiResponse.notFoundResponse(res, "Service Not Found");
      }

      const sub_services = {
        name: req.body.sub_services[0].name,
        description: req.body.sub_services[0].description,
        //image:req.body.sub_service_added[0].image
      };
      service.sub_services.unshift(sub_services);
      const sub_service_added = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "Sub Service Added Successfully",
        sub_service_added
      );
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//get all services

exports.get_all_services = [
  async (req, res) => {
    try {
      const website = await website_model.findOne({ _id: req.params.web_id });
      console.log(website);

      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      return apiResponse.successResponseWithData(
        res,
        "Services Found Successfully",
        website
      );
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

// exports.addServices = (req, res) => {
//     const website = new website_model(req.body);
//     website.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }

//         res.json({ data });
//     })
// }
