const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  provider:{
    type:String,
    enum: ['google', 'email'], 
    default: 'email',
  },
  role: {
    type: String,
    default: "user",
  },
}, {
  timestamps: true, 
});

userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
  if (this.provider === "email") {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  next();
});
userSchema.methods.isPasswordCorrect = async function (currentPassword) {
  if (!this.password) {
    throw new Error("Password is not set for this user");
  }
  return await bcrypt.compare(currentPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
module.exports = mongoose.model("User", userSchema);

