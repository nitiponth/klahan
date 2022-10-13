export interface IBaseResponse<T> {
  id: null;
  result: Result<T>;
}

export interface Result<T> {
  type: string;
  data: T;
}
