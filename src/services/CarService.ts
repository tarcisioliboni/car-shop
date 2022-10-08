import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ICar, zCarSchema } from '../interfaces/ICar';

class CarService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = zCarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const created = await this._cars.create(parsed.data);
    return created;
  }
}

export default CarService;
