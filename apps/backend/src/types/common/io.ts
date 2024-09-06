import { FieldsRequested } from '@/services/crud.service';

export type FindManyDto<T> = {
  requestId: string;
  fields: FieldsRequested;
  args: T;
};

export type FindOneDto<T> = {
  requestId: string;
  fields: FieldsRequested;
  args: T;
};

export type UpdateDto<T> = {
  requestId: string;
  fields: FieldsRequested;
  args: T;
};

export type CreateDto<T> = {
  requestId: string;
  fields: FieldsRequested;
  args: T;
};
