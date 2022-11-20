import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    amount: {
      type: mongoose.Schema.Types.Number,
      defualt: 0
    },
    status: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: ['pending', 'successful', 'failed']
    },
    trnxId: {
      type: mongoose.Schema.Types.String,
    }
  },
  {
    timestamps: true
  }
);

const TransactionModel = mongoose.model('Transactions', TransactionSchema);

export default TransactionModel;
