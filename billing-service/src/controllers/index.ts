import { randomUUID } from 'crypto';
import { Response, Request } from 'express';
import { channel, connection } from '../server'
import TransactionModel from '../models/Transaction';
import { isEmpty, isString } from 'lodash'
import { parse } from 'path';

export const NewDepositTransaction = async (req: Request, res: Response) => {
  try {
    console.log('billing service reached')
    const { amount, customerId } = req.body;
       // field validation
       const validateFields = () => {
        let valid = true;
        if (isEmpty(amount) || isEmpty(customerId)) {
          valid = false;
        }
        return valid
      };
    
      const isValid = validateFields();
    
      if(!isValid){
        console.log('is not valid', req.body)
        return res.status(400).json({ message: '1 or more invalid fields', status: 400 })
      }
    
      if(!isString(amount)){
        return res.status(400).json({ message: 'Amount must be of Type string', status: 400 })
      }  
      if(!isString(customerId)){
        return res.status(400).json({ message: 'CustomerId must be of Type string', status: 400 })
      }  


    const transInfo = { customerId, amount: parseFloat(amount), trnxId: randomUUID()}
    console.log(transInfo, ' -- trans info')
    await TransactionModel.create(transInfo);
    await channel.sendToQueue("deposit", Buffer.from(JSON.stringify(transInfo)));
    res.status(200).json({ status: 200, message: 'Transaction is being processed...' });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: 500, message: error.message });
  }
};

