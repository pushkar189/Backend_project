import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Corrected access to cookies
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
       
        if (!token) {
            throw new ApiError(401, "Unauthorized request"); // Fixed: Now throwing the error
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user and exclude sensitive fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid access token request");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token"); // Fixed: Passing error to middleware
    }
});
