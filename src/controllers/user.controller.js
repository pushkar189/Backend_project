import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req , res) => {
    // Register logic here
     res.status(200).json({
        message: "ok"
    })
})

export { 
    registerUser
}
