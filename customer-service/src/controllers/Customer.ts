import { Response, Request } from 'express';
import BillingService from '../services/Billing';
import isEmpty from 'lodash/isEmpty';
import { isNumber, isString } from 'lodash';
import UserModel from '../models/User';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import TransactionModel from '../models/Transaction';


export const Deposit = async (req: Request, res: Response) => {
  try {
    const { amount, email } = req.body;

  if(!isString(amount)){
    return res.status(400).json({ message: 'Amount must be of Type string', status: 400 })
  }  
  if(!isString(email)){
    return res.status(400).json({ message: 'Email must be of Type string', status: 400 })
  }  

  const customer = await UserModel.findOne({ email: email.toLowerCase() })
   if(!customer){
    return res.json({ status: 400, message: 'Invalid or unregistered Email address' }).status(400)
   }
  
   var customerId = customer._id.toString()
  
    console.log(req.body)
    const data = await BillingService.newDeposit(customerId, amount);
    if(data.status !== 200){
      return res.status(400).json({ status: 400, message: data.message });
    }
    res.status(200).json({ status: 200, message: data.message});
  } catch (error) {
    logger.error(error.message)
    console.log(error)
    res.status(500).json({ status: 500, message: 'Something went wrong, please try again', error: error.message });
  }
};

export const ViewBalance = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if(!isString(email)){
      return res.status(400).json({ message: 'Email must be of Type string', status: 400 })
    }  

    const user = await UserModel.findOne({ email: email.toLowerCase() })

    if(!user){
      return res.json({ status: 400, message: 'Invalid or unregistered Email address' }).status(400)
     }

    res.json({ data: { balance: user.balance }, status: 200 }).status(200)

  } catch (error) {
    logger.error(error.message)
    console.log(error)
    res.status(500).json({ status: 500, message: 'Something went wrong, please try again', error: error.message });
  }
}

export const ViewTransactions = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if(!isString(email)){
      return res.status(400).json({ message: 'Email must be of Type string', status: 400 })
    }  

    const user = await UserModel.findOne({ email: email.toLowerCase() })

    if(!user){
      return res.json({ status: 400, message: 'Invalid or unregistered Email address' }).status(400)
    }


    const transactions = await TransactionModel.find({ customerId: user._id })
    console.log(transactions)


    res.json({ transactions, status: 200 }).status(200)

  } catch (error) {
    logger.error(error.message)
    console.log(error)
    res.status(500).json({ status: 500, message: 'Something went wrong, please try again', error: error.message });
  }
}


