import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, zMotorcycleSchema } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycles: IModel<IMotorcycle>) { }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = zMotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const created = await this._motorcycles.create(parsed.data);
    return created;
  }

  public async read(): Promise<IMotorcycle[]> {
    const allMotorcycles = await this._motorcycles.read();
    if (!allMotorcycles) throw Error(ErrorTypes.ObjectNotFound);
    return allMotorcycles;
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const Motorcycle = await this._motorcycles.readOne(id);
    if (!Motorcycle) throw Error(ErrorTypes.ObjectNotFound);
    return Motorcycle;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = zMotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const updated = await this._motorcycles.update(id, obj);
    if (!updated) throw Error(ErrorTypes.ObjectNotFound);
    return updated;
  }

  public async delete(id: string): Promise<IMotorcycle> {
    const deleted = await this._motorcycles.delete(id);
    if (!deleted) throw Error(ErrorTypes.ObjectNotFound);
    return deleted;
  }
}

export default MotorcycleService;
