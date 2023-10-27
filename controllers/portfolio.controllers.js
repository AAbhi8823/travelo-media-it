// portfolio controllers
const website_model = require("../models/website.model");
const express_validator = require("express-validator");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const login_validator =
  require("../middleware/jwt.auth.middleware").authentication;
const apiResponse = require("../responses/apiResponses");

//create portfolio

exports.add_portfolio = [
  //login_validator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json([{ status: false, errors: errors.array() }]);
      }

      const { name, meta_data_description, sub_description, description } =
        req.body;
      //check website exist or not
      const website = await website_model.findById(req.params.web_id);
      if (!website) {
        return apiResponse.ErrorResponse(res, "Website not found");
      }
      //create new portfolio
      const new_portfolio = {
        name,
        meta_data_description,
        sub_description,
        description,
      };
      //push portfolio to website
      website.portfolio.unshift(new_portfolio);
      const portfolio_created = await website.save();

      return apiResponse.successResponseWithData(
        res,
        "Portfolio created successfully",
        portfolio_created.portfolio
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

//update portfolio

exports.update_portfolio = [
    //login_validator,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res
                .status(400)
                .json([{ status: false, errors: errors.array() }]);
            }
            const { name, meta_data_description, sub_description, description } =
            req.body;
    
            const website = await website_model.findById(req.params.web_id);
            if (!website) {
            return apiResponse.ErrorResponse(res, "Website not found");
            }
    
            const portfolio = website.portfolio.find(
            (portfolio) => portfolio._id == req.params.portfolio_id
            );
            if (!portfolio) {
            return apiResponse.ErrorResponse(res, "Portfolio not found");
            }
    
            portfolio.name = name;
            portfolio.meta_data_description = meta_data_description;
            portfolio.sub_description = sub_description;
            portfolio.description = description;
    
            const portfolio_updated = await website.save();
    
            return apiResponse.successResponseWithData(
            res,
            "Portfolio updated successfully",
            portfolio_updated.portfolio
            );
        } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err.message);
        }
        },
    ];

   
