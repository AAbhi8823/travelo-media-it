/**
 * Express application
 * @module app
 */

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes/api");
//const cors=require('cors');
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

//mongodb connection

mongoose.Promise = global.Promise;

/**
 * Connect to MongoDB
 * @function
 * @name connect
 * @param {string} process.env.MONGODB_URL - MongoDB connection URL
 * @param {object} options - MongoDB connection options
 * @param {boolean} options.useNewUrlParser - MongoDB new URL parser
 * @param {boolean} options.useUnifiedTopology - MongoDB new Server Discovery and Monitoring engine
 * @returns {Promise} - Promise representing the connection status
 * @throws {Error} - Throws an error if the connection fails
 */
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully DB Connected"))
  .catch((err) => console.log("DB Connection Error", err));

//import routes
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors());

//import routes

/**
 * Route middleware
 * @function
 * @name use
 * @param {string} path - Route path
 * @param {function} middleware - Middleware function
 */
app.use("/api/v1", routes);

/**
 * 404 Error handler
 * @function
 * @name all
 * @param {string} path - Route path
 * @param {function} middleware - Middleware function
 */
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `The URL  ${req.originalUrl} is not on this server`,
  });
});

/**
 * Start the server
 * @function
 * @name listen
 * @param {number} process.env.PORT - Port number
 * @param {function} callback - Callback function
 */
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
