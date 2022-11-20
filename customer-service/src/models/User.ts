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

export async function createTestUser(){
  const user = await UserModel.exists({ email: "test@test.com" });
  if(!user){
    await UserModel.create({
      email: "test@test.com",
      balance: 0
    })
  }else{
    console.log('# skipping test user creation')
  }
}

export default UserModel;
