//bpo solutions controllers 

const bpo_solutions_model = require("../models/website.model");
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

            const website = await bpo_solutions_model.findById(req.params.web_id);
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

            const website = await bpo_solutions_model.findById(req.params.web_id);

            if (!website) {
                return apiResponse.notFoundResponse(res, "Website Not Found");
            }

            const bpo_solutions_updated = await bpo_solutions_model.findByIdAndUpdate(
                req.params.web_id,
                { $set: { bpo_solutions: bpo_solutions } },
                { new: true }
            );
            return apiResponse.successResponseWithData(
                res,
                "BPO Solutions Updated Successfully",
                bpo_solutions_updated
            );
        } catch (err) {
            return apiResponse.ErrorResponse(res, err.message);
        }
    },
];


   