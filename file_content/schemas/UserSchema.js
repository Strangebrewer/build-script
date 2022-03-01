import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const tempPw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null);

const UserSchema = new Schema({
  acl: [{ type: String }],
  username: { type: String, required: true },
  normalizedUsername: { type: String, required: true },
  email: String,
  normalizedEmail: String,
  firstName: String,
  lastName: String,
  status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
  password: { type: String, required: true, default: tempPw },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
