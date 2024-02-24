import { HttpStatusCode } from '../enums/HttpStatusCode';

type DataError = { message: string };

export type ResponseWithToken = {
  token: string;
};


interface ServiceResponseError {
  status: HttpStatusCode;
  data: DataError;
}

interface ServiceResponse<T> {
  status: HttpStatusCode;
  data: T;
}

export type IServiceResponse<T> = ServiceResponse<T> | ServiceResponseError;
