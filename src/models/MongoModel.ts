import { isValidObjectId, Model } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
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

  public async read():Promise<T[]> {
    const getAll = await this._model.find();
    return getAll;
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const car = await this._model.findById(id);
    return car;
  }
}

export default MongoModel;