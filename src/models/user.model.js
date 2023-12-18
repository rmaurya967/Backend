import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/150'
  },
  coverImage: {
    type: String,
  },
  watchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Video'
    }
  ],
  refreshToken: {
    type: String,
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
  },
    process.env.JWT_SECRET, // put this in env with same name
    {
      expiresIn: "1d", // put this in env with same name
    },
  )
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
  },
    process.env.REFRESH_TOKEN, // put this in env with same name
    {
      expiresIn: "10d", // put this in env with same name
    },
  )
};

export const User = mongoose.model("User", userSchema);