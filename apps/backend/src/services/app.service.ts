import * as utils from '@core/utils';

export type GetHelloResponse = {
  status: number;
  message: string;
};
export const getHello = () => {
  const message = `Testing usage of function from @core/utils in this app: ${utils.arrayIsEmpty.name}([1]) -> ${utils.arrayIsEmpty([1])}`;
  return { status: 200, message };
};
