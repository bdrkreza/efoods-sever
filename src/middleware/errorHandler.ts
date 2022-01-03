import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  console.log(error.message);
  res.status(404);
  next(error);
};

const notFoundServer = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 3000;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next(err);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next(err);
};

export { notFoundServer, notFound, errorHandler };
