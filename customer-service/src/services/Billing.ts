import HttpService from '../utils/HttpService';

const baseUrl = 'http://billing-service:3002';


export default class BillingService {
  /**
   * 
   * @param customerId 
   * @param amount 
   * @returns 
   */
  static newDeposit = async (
    customerId: string,
    amount: string,
  ) => {
    try {
      let response = await HttpService.Call(
        `${baseUrl}/new-transaction`,
        'POST',
        {
          customerId,
          amount
        },
        {
          'Content-Type': 'application/json'
        },
      );
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };
}
