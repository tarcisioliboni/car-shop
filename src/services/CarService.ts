import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ICar, zCarSchema } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = zCarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const created = await this._cars.create(parsed.data);
    return created;
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._cars.read();
    if (!allCars) throw Error(ErrorTypes.ObjectNotFound);
    return allCars;
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._cars.readOne(id);
    if (!car) throw Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar> {
    const parsed = zCarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const updated = await this._cars.update(id, obj);
    if (!updated) throw Error(ErrorTypes.ObjectNotFound);
    return updated;
  }

  public async delete(id: string): Promise<ICar> {
    const deleted = await this._cars.delete(id);
    if (!deleted) throw Error(ErrorTypes.ObjectNotFound);
    return deleted;
  }
}

export default CarService;
