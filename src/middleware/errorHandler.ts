import { NextFunction } from "express";
import { createResponse } from "../utils";
const _log = require("../utils/logger");

module.exports = function (err: any, req: any, res: any, next: NextFunction) {
  if (err) {
    let statusCode = 500;
    if (err.name == "ValidationError") {
      statusCode = 400;
    }
    const errorPaths = Object.keys(err.errors || {});
    const errorMessages = errorPaths.map(
      (path) => err.errors[path].properties.message
    );
    const errorMessage = errorMessages.join(", ") || err.message;
    _log(
      `Error: ${req.method} request from ${req.ip} on route ${req.path}`,
      "red"
    );

    res.status(statusCode).json(createResponse(null, errorMessage, true));
  }
};
