import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const allMotorcycles = await this._service.read();
    return res.status(200).json(allMotorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);
    return res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const updated = await this._service.update(id, req.body);
    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const deleted = await this._service.delete(id);
    return res.status(204).json(deleted);
  }
}

export default MotorcycleController;
