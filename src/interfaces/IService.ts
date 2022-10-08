import { ICar } from './ICar';

export interface IService<T> {
  create(obj: ICar): Promise<T>,
  read(): Promise<T[]>,
  readOne(id: string): Promise<T>,
}