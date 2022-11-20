import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String
    },
    name: {
      type: Schema.Types.String
    },
    balance: {
      type: Schema.Types.Number,
      default: 0
    },
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
