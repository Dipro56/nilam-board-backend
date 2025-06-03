import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import User from "../user/user.model";

const generateAccessAndRefereshTokens = async (
  userId: string
): Promise<{ accessToken: string }> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Username  & password both required"));
  }

  const allUser = await User.find();
  console.log("allUser", allUser);

  const existedUser = await User.findOne({ username: username });
  console.log("existedUser", existedUser);

  if (existedUser) {
    // const user = await User.findOne({ username: username });
    // console.log('user', user);
    const { accessToken } = await generateAccessAndRefereshTokens(
      existedUser._id.toString()
    );
    const loggedInUser = await User.findById(existedUser._id).select(
      "-createdAt -updatedAt -__v"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return (
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
            },
            "User logged in Successfully"
          )
        )
    );
  } else {
    return res.status(400).json(new ApiResponse(400, {}, "User not found"));
  }
});

export { login };
