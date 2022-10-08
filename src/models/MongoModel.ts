import { Model } from 'mongoose';
// import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    const created = await this._model.create({ ...obj });
    return created;
  }
}

export default MongoModel;