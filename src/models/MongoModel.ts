import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
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

  public async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const updated = await this._model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return updated;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const deleted = await this._model.findByIdAndDelete({ _id: id });
    return deleted;
  }
}

export default MongoModel;