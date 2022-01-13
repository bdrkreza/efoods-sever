import { cloud_name } from "../config/config";
import { cloud_api_key, cloud_api_secret } from "./../config/config";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret,
});

export const UploadFile = {
  upload: async (
    image: string,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    let res = await cloudinary.uploader.upload(image, {
      folder: `efoods/${folder}`,
      transformation: { width, height, crop: "fill" },
      overwrite: true,
      invalidate: true,
    });
    return res;
  },
};
