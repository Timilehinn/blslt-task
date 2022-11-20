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
      default: 'PENDING',
      enum: ['PENDING', 'SUCCESSFULL', 'FAILED']
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
