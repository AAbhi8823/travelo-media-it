//bpo solutions controllers

const website_model = require("../models/website.model");
const express_validator = require("express-validator");
const apiResponse = require("../responses/apiResponses");
const { check, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const { sanitize } = require("express-validator");
const { body } = require("express-validator");

//add bpo_solutions in a website

exports.add_bpo_solutions = [
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

      const { bpo_solutions } = req.body;

      const website = await website_model.findById(req.params.web_id);
      console.log("line 30", website);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      website.bpo_solutions.push(...bpo_solutions);
      const bpo_solutions_added = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "BPO Solutions Added Successfully",
        bpo_solutions_added
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update bpo_solutions in a website

exports.update_bpo_solutions = [
  //login_validator,
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

      const { bpo_solutions } = req.body;

      const website = await website_model.findById(req.params.web_id);

      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      // bpo_solutions is an array of objects find by id and update
      const bpoIndex = website.bpo_solutions.findIndex(
        (bpo) => bpo._id == req.params.bpo_id
      );
      if (bpoIndex === -1) {
        return apiResponse.notFoundResponse(res, "BPO Solutions Not Found");
      }

     
      website.bpo_solutions[bpoIndex].name = bpo_solutions[0].name;
      website.bpo_solutions[bpoIndex].description =
        bpo_solutions[0].description;
      website.bpo_solutions[bpoIndex].image = bpo_solutions[0].image;
      website.bpo_solutions[bpoIndex].bpo_sub_solutions =
        bpo_solutions[0].bpo_sub_solutions;

      const bpo_solutions_updated = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "BPO Solutions Updated Successfully",
        bpo_solutions_updated.bpo_solutions[bpoIndex]
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//get all bpo_solutions in a website

exports.get_all_bpo_solutions = [
  //login_validator,
  async (req, res) => {
    try {
      const website = await website_model.findOne({ _id: req.params.web_id });
      console.log("line 30", website);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }

      const bpo_solutions = website.bpo_solutions;
      return apiResponse.successResponseWithData(
        res,
        "BPO Solutions Found Successfully",
        bpo_solutions
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//get bpo_solutions by id

exports.get_bpo_solutions = [

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
    
            const website = await website_model.findById(req.params.web_id);
            if (!website) {
            return apiResponse.notFoundResponse(res, "Website Not Found");
            }
    
            const bpo_solutions = website.bpo_solutions.find(
            (bpo) => bpo._id == req.params.bpo_id
            );
            return apiResponse.successResponseWithData(
            res,
            "BPO Solutions Found Successfully",
            bpo_solutions
            );
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err.message);
        }
        }
];

//delete bpo_solutions by id

exports.delete_bpo_solutions = [

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
    
            const website = await website_model.findById(req.params.web_id);
            if (!website) {
            return apiResponse.notFoundResponse(res, "Website Not Found");
            }
    
            const bpoIndex = website.bpo_solutions.findIndex(
            (bpo) => bpo._id == req.params.bpo_id
            );
            if (bpoIndex === -1) {
            return apiResponse.notFoundResponse(res, "BPO Solutions Not Found");
            }
    
            website.bpo_solutions.splice(bpoIndex, 1);
            const bpo_solutions_deleted = await website.save();
            return apiResponse.successResponseWithData(
            res,
            "BPO Solutions Deleted Successfully",
            //bpo_solutions_deleted
            );
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err.message);
        }
        }
];