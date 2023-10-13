
const user_model = require("../models/user.model");
const apiResponse = require("../responses/apiResponses");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login_validator=require("../middleware/jwt.auth.middleware").authentication;
const express_validator = require("express-validator");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

/**
 * Create a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object with the new user data
 */
exports.create_user = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json([{ status: false, errors: errors.array() }]);
    }
    const { name, phone, email, password } = req.body;
    const user = await user_model.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const new_user = new user_model({
      name,
      phone,
      email,
      password: hashed_password,
    });

    await new_user.save();
    new_user.password = undefined;
    return apiResponse.successResponseWithData(
      res,
      "User created successfully",
      new_user
    );
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

/**
 * Login a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object with the JWT token
 */
exports.login_user = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json([{ status: false, errors: errors.array() }]);
    }
    const { email, password } = req.body;
    const user = await user_model.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const payload = {
      user: {
        _id: user.id.toString(),
        isAdmin: user.isAdmin,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY },
      (err, token) => {
        if (err) throw err;
        res.setHeader("Authorization", token);
        return apiResponse.successResponseWithToken(
          res,
          "User logged in successfully",
          token
        );
      }
    );
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

//create user logout api
exports.logout_user = async (req, res) => {
  try {
    res.setHeader("Authorization", "");
    return apiResponse.successResponse(res, "User logged out successfully");
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};



/**
 * Update a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object with the updated user data
 */
exports.update_user = [
  login_validator,
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json([{ status: false, errors: errors.array() }]);
    }
    const { name, phone, email } = req.body;
    const user = await user_model.findOne({ _id: req.params.user_id });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not exists" }] });
    }

    const updated_user = await user_model
      .findByIdAndUpdate(
        { _id: req.params.user_id },
        {
          name,
          phone,
          email,
        },
        { new: true }
      )
      .select("-password");
    return apiResponse.successResponseWithData(
      res,
      "User updated successfully",
      updated_user
    );
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
}
];

/**
 * Get a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object with the user data
 */
exports.get_user =[ 
  login_validator,
  async (req, res) => {
  try {
    const user = await user_model.findOne({ _id: req.params.user_id });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not exists" }] });
    }
    user.password = undefined;
    return apiResponse.successResponseWithData(res, "User found", user);
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
}
]