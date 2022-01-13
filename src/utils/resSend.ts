const fs = require("fs");

export const resSendData = (res: any, data: any) => {
  res.status(200).json({
    success: true,
    error: null,
    data: data,
    message: "data request successfully",
  });
};

export const createResponse = (
  data: any,
  message = null,
  error = false,
  token = null
) => {
  return {
    error,
    data,
    message,
    token,
  };
};

export const resSendError = (res: any, error: any) => {
  res.status(404).json({
    success: false,
    error: error.message,
    data: null,
    message: "database request failed!",
  });
};

export const resSendNotFound = (res: any) => {
  res.status(404).json({ message: "database collection not found" });
};
export const resSendMessage = (res: any, data: any, message: any) => {
  res.status(200).json({
    success: true,
    error: null,
    data: data,
    message: message,
  });
};

export const removeTmp = (path: string) => {
  fs.unlink(path, (err: any) => {
    if (err) throw err;
  });
};
