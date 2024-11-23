import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const addressSchema = new Schema({
  street: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  zip_code: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
}, { _id: false }); 
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    profileName: {
      type: String,
      default: '',
      trim: true,
    },
    profile_url: {
      type: String,
      default: '',
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'customer'], 
      default: 'customer',
    },
    address: addressSchema,
    savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    refresh_token: {
      type: String,
    },
    provider:{
      type:String,
      enum: ['google', 'email'], 
      default: 'email',
    }
  },
  {
    timestamps: true, 
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
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

const User = mongoose.model('User', userSchema);
export default User;
