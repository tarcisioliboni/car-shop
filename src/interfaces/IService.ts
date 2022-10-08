import { ICar } from './ICar';

export interface IService<T> {
  create(_obj: ICar): Promise<T>,
}