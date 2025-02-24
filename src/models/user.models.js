import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true,
        trim: true,
        index: true
       },
       email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
       },
       fullname: {
        type: String,
        required: true,
        trim: true
       },
       avatar: {
        type: String,
        default: 'default.jpg',
        required: true
       },
       coverImage: {
        type: String,
        default: 'cover-image.jpg',
        required: true
       },
       watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
       ],
       password: {
        type: String,
        required : [true , 'password is required']
       },
       refreshToken: {
        type: String,
        required: false
       }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save" , function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
             id: this._id 
        },
         process.env.ACCESS_TOKEN_SECRET,
        {
             expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
             id: this._id 
        },
         process.env.REFRESH_TOKEN_SECRET,
        {
             expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}
export const User = mongoose.model("User", userSchema);