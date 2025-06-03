import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../modules/user/user.model";

export const verifyJWT = asyncHandler(async (req: any, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user;
    if (decodedToken?._id) {
      user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken -createdAt -updatedAt -__v"
      );
    } else {
      user = await User.find({ phone: decodedToken?.phone });
    }

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    console.log("authverifyuser", user);

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyAdmin = asyncHandler(async (req: any, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -createdAt -updatedAt -__v"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    } else if (user?.role !== "admin") {
      throw new ApiError(403, "User is not an admin");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
