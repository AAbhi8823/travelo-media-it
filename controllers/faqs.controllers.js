// faqs controllers

const faqs_model = require("../models/website.model");
const apiResponse = require("../responses/apiResponses");
const express_validator = require("express-validator");
const login_validator=require("../middleware/jwt.auth.middleware").authentication;

 const { validationResult } = require("express-validator");
// const { matchedData } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const { sanitize } = require("express-validator");
// const { body } = require("express-validator");

//add faqs

exports.add_faqs = [
  express_validator.body("faqs").isArray().withMessage("faqs must be an array"),
  express_validator
    .body("faqs.*.category")
    .isString()
    .notEmpty()
    .withMessage("Category must be specified."),
  express_validator
    .body("faqs.*.query")
    .isArray()
    .withMessage("query must be an array"),
  express_validator
    .body("faqs.*.query.*.question")
    .isString()
    .notEmpty()
    .withMessage("Question must be specified."),
  express_validator
    .body("faqs.*.query.*.answer")
    .isString()
    .notEmpty()
    .withMessage("Answer must be specified."),

  async (req, res) => {
    try {
      const errors = express_validator.validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }

      const { faqs } = req.body;

      const website = await faqs_model.findById(req.params.web_id);
      if (!website) {
        return apiResponse.notFoundResponse(res, "Website Not Found");
      }
      
      website.faqs.push(...faqs);
      const faqs_added = await website.save();
      return apiResponse.successResponseWithData(
        res,
        "FAQs Added Successfully",
        faqs_added.faqs
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update faqs by id 
exports.update_faqs_by_id = [
    //login_validator,
    async (req, res) => {
      try {
        const errors = express_validator.validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            "Validation Error.",
            errors.array()
          );
        }

        console.log(req.body)
  
        const website = await faqs_model.findById(req.params.web_id);
  
        if (!website) {
          return apiResponse.notFoundResponse(res, "Website Not Found");
        }
  
        const { faqs } = req.body;
  
        // Find the FAQ by its ID within the website's "faqs" array
        const faqIndex = website.faqs.findIndex((faq) => faq._id == req.params.faqs_id);
  
        if (faqIndex === -1) {
          return apiResponse.notFoundResponse(res, "FAQ Not Found");
        }
  
        // Update the FAQ with the new values
        website.faqs[faqIndex].category = faqs[0].category;
        website.faqs[faqIndex].query = faqs[0].query;
  
        const faqsUpdated = await website.save();
  
        return apiResponse.successResponseWithData(
          res,
          "FAQ Updated Successfully",
          faqsUpdated.faqs[faqIndex]
        );
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    },
  ];
  
