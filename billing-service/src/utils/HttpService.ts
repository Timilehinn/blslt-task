import axios, {
  AxiosBasicCredentials,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';

export default class HttpService {
  static async Call(
    endpoint: string,
    method: string,
    data?: object,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ): Promise<AxiosResponse<any>> {
    let Response: any;
    let Request: any;
    let Config = headers;

    switch (method) {
      case 'POST':
        Request = await axios
          .post(endpoint, data, { headers, auth })
          .then((res) => res);
        Response = Request;
        break;
      case 'GET':
        Request = await axios
          .get(endpoint, { headers, auth })
          .then((res) => res);
        Response = Request;
        break;
      case 'PATCH':
        Request = await axios
          .patch(endpoint, data, { headers, auth })
          .then((res) => res);
        Response = Request;
        break;
      case 'DELETE':
        Request = await axios
          .delete(endpoint, { headers, auth })
          .then((res) => res);
        Response = Request;

      default:
        break;
    }
    return Response;
  }
}
