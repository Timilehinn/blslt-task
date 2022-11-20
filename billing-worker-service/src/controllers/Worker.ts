import { channel } from "../server";
import TransactionModel from "../models/Transaction";
import UserModel from "../models/User";
import mongoose from "mongoose";


export function StartProcess(){
  console.log('worker process reached')
  channel.consume("deposit", async (data: any)=>{
    const trnxData = JSON.parse(data.content.toString())
    await new Promise((resolve) => setTimeout(resolve, 100))
    await UserModel.updateOne({ _id: new mongoose.Types.ObjectId(trnxData.customerId) }, { $inc: { balance: trnxData.amount } });
    const newTrnx = await TransactionModel.updateOne({ trnxId: trnxData.trnxId }, { $set: { status: 'SUCCESSFUL' }}, { new: true })
    // send updated transaction info to frontend ...
    console.log('Newly processed transaction details: ', newTrnx)
    
    console.log(trnxData, ' --transaction data for worker')
    channel.ack(data)
  })
}

