import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "ds9dpn3nn",
  api_key: "842873932927665",
  api_secret: "fL-QejBAMau7lLbPLFUWW2lRvTw",
});

const uploadOnCloudinary = async (localFilePath: any) => {
  try {
    //console.log('localFilePath', localFilePath);
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("responseresponse", response);
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    // console.log('response', response);
    return response;
  } catch (error) {
    console.log("error", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
